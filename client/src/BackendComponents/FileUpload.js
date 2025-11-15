import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

const FileUpload = ({ contract, account }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const [loading, setLoading] = useState(false); // New loading state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return alert("Please select a file first!");

    try {
      setLoading(true); // Start loading

      const formData = new FormData();
      formData.append("file", file);

      // Upload file to Pinata
      const resFile = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            pinata_api_key: "7c73141872371e67223c",
            pinata_secret_api_key:
              "2f85c29686000e02d3dda586912b74601cfd9f6aa21d40975624504b9f518b77",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const cid = resFile.data.IpfsHash;

      // Store filename together with CID so frontend can detect file type later
      // Format: ipfs://<CID>||<original-filename>
      const storedValue = `ipfs://${cid}||${file.name}`;

      // Blockchain transaction
      const tx = await contract.add(account, storedValue);
      await tx.wait(); // Wait until transaction is mined

      alert("✅ File successfully uploaded!");
      setFileName("No file selected");
      setFile(null);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("❌ Unable to upload image to Pinata or blockchain");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    if (data) {
      setFile(data);
      setFileName(data.name);
    }
  };

  return (
    <div className="top">
      {loading && (
        <div className="loadingOverlay">
          <div className="loader"></div>
          <p>Uploading & Processing...</p>
        </div>
      )}

      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose File
        </label>
        <input
          disabled={!account || loading} 
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">File: {fileName}</span>
        <button type="submit" className="upload" disabled={!file || loading}>
          Upload File
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
