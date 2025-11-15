import { useState } from "react";
import "./Display.css";

const Display = ({ contract, account }) => {
  const [data, setData] = useState([]);

  const getdata = async () => {
    let dataArray;
    const otherAddress = document.querySelector(".address-input").value;

    try {
      dataArray = otherAddress
        ? await contract.display(otherAddress)
        : await contract.display(account);
    } catch (err) {
      alert("❌ You don't have access to view these images.");
      return;
    }

    if (!dataArray || dataArray.length === 0) {
      alert("⚠️ No image to display");
      return;
    }

    const gateways = [
      "https://ipfs.io/ipfs/",
      "https://cloudflare-ipfs.com/ipfs/",
      "https://gateway.pinata.cloud/ipfs/",
    ];

    const images = dataArray.map((item, index) => {
      // Preserve legacy items and detect optional filename metadata
      let raw = item;
      let filename = "";
      if (raw && raw.includes("||")) {
        const parts = raw.split("||");
        raw = parts[0];
        filename = parts.slice(1).join("||");
      }

      // get CID
      const cid = raw && raw.startsWith("ipfs://") ? raw.slice(7) : raw;
      const srcCandidates = gateways.map((g) => `${g}${cid}`);

      // If filename indicates PDF, render a PDF preview and link
      const ext = filename ? filename.split('.').pop().toLowerCase() : '';
      if (ext === 'pdf') {
        const pdfUrl = srcCandidates[0];
        return (
          <div key={index} className="doc-wrapper">
            {/* Make the whole preview clickable and open the PDF in a new tab */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="doc-full-link"
            >
              <div className="doc-preview">
                <iframe
                  src={pdfUrl}
                  title={filename || `pdf-${index}`}
                  className="doc-iframe"
                />
              </div>
              <span className="doc-link-text">{filename || 'View PDF'}</span>
            </a>
          </div>
        );
      }

      // Default: render as image (original behavior)
      const handleError = (e) => {
        const img = e.target;
        const current = srcCandidates.indexOf(img.src);
        const next = current + 1;
        if (next < srcCandidates.length) {
          img.src = srcCandidates[next];
        } else {
          // final fallback: show a lightweight inline SVG placeholder so layout is preserved
          const placeholder = `data:image/svg+xml;utf8,${encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='360'><rect fill='%23111111' width='100%' height='100%'/><text x='50%' y='50%' fill='%23ffffff' font-size='20' dominant-baseline='middle' text-anchor='middle'>Image unavailable</text></svg>`
          )}`;
          img.src = placeholder;
        }
      };

      return (
        <a
          href={srcCandidates[0]}
          key={index}
          target="_blank"
          rel="noreferrer"
          className="image-wrapper"
        >
          <img
            src={srcCandidates[0]}
            alt={filename || 'Uploaded'}
            className="image-item"
            onError={handleError}
          />
        </a>
      );
    });

    setData(images);
  };

  return (
    <>
      {/* Address + Button Container */}
      <div className="address-container">
        <input
          type="text"
          placeholder="Enter Address"
          className="address-input"
        />
        <button className="get-data-btn" onClick={getdata}>
          Get Data
        </button>
      </div>

      {/* Image Grid */}
      {data.length > 0 && <div className="image-list">{data}</div>}
    </>
  );
};

export default Display;
