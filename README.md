# MetaDrive

Decentralized file storage: upload files to IPFS and save references on Ethereum (Sepolia).

Live demo: https://meta-drive-one.vercel.app

Short features
- Upload files to IPFS and record references in a Solidity contract
- Connect via MetaMask (Sepolia network) and share files on-chain
- React frontend (client/) + Hardhat contracts (contracts/)

Quick start
1. Install deps:

```powershell
npm install
cd client
npm install
```

2. Deploy contract (Sepolia):

```powershell
npm run deploy:sepolia
```

3. Run frontend (dev) or build for hosting:

```powershell
# dev
npm start
# or build
npm run build
```

Security note
- Do not commit API keys. Move any pinning logic (Pinata/web3.storage) to a server-side endpoint instead of using client-side secrets.

Useful files
- Contract: [contracts/Upload.sol](contracts/Upload.sol)
- Frontend entry: [client/src/App.js](client/src/App.js)
- Upload logic: [client/src/BackendComponents/FileUpload.js](client/src/BackendComponents/FileUpload.js)

If you give me the deployed URL, I will update the `Live demo` link above.

---
Tiny and focused — tell me if you want this expanded (deploy steps, env examples, or a Vercel guide).

This project facilitates decentralized image upload and sharing on the blockchain using Solidity for the smart contract and React for the front-end interface. It enables users to securely upload images to IPFS (InterPlanetary File System) and share access with specified users through smart contract functionality.

Here is the video in English - [Decentralize Google Drive](https://youtu.be/M-KRLlHG_zs?si=rD7I-fH-P8kGiwwf)

Here is the video in Hindi - [Decentralize Google Drive](https://youtu.be/fghqq3-P3x0?si=CVMpHFTW3-fa3R3A)

## Features

- **Decentralized Storage:** Images are uploaded to IPFS, ensuring decentralized and immutable storage.
- **Smart Contract:** Utilizes Solidity smart contracts on the Ethereum blockchain for access control and ownership management.
- **Access Control:** Users can grant or revoke access to their uploaded images to specific individuals through the smart contract.

## Technologies Used

- **Solidity:** Smart contract development for ownership and access control.
- **React:** Front-end interface for uploading images and managing access.
- **IPFS:** Decentralized storage protocol for hosting uploaded images.

## Usage

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/decentralized-image-upload.git
   ```
2. Install dependencies for the hardhat:

   ```bash
   # Navigate to the root directory
   cd Dgdrive3.0
   # Install hardhat dependencies
   npm install
   ```
3. Compile the smart contract for artifacts:

   ```bash
   # Compile Smart Contract
   npx hardhat compile
   ```
4. Deploy the Solidity smart contract to an Ethereum testnet or local development environment.
   ```bash
   # Deploy Smart Contract
   npx hardhat run scripts/deploy.js --network <network-name>
   ```
5. Install dependencies for the React front end:
   ```bash
   # Navigate to the React client directory
   cd client 
   # Install React dependencies
   npm install
   ```
6. Run the react application:
   ```bash
   # Start React Application
   npm start
   ```
   
### Configuration

1. Set up environment variables:

   - Obtain API keys for Pinata to interact with IPFS.
   - Update the React component (FileUpload.js) with your Pinata API keys.
     
### Usage

Once the setup and configuration are complete, follow these steps to utilize the decentralized image upload and sharing system:

1. **Install Metamask:**
   - Ensure Metamask is installed and configured in your browser for Ethereum interactions.

2. **Update Contract Address:**
   - After smart contract deployment, make sure to update the contract address in `App.js` within the React application.

3. **Upload Image before "Get Data":**
   - Click "Get Data" only after uploading an image on Pinata. Otherwise, it will throw an error stating "You don't have access".

4. **Accessing Other User Images:**
   - Use the "Get Data" button to access other users' images. Input the user's address in the designated box, but remember, you can only access their images if they've granted you access through the smart contract. Otherwise, it will throw an error saying "You don't have access".

These steps will ensure smooth navigation and utilization of the system while maintaining access control and avoiding potential errors.

