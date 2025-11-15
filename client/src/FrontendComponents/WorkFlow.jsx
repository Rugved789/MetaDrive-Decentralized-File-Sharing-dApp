import "../styles/workflow.css";

function WorkFlow() {
  return (
    <section className="workflow" id="how-it-works">
      <div className="workContainer">
        <div className="workHeading">
          <h2>How It Works</h2>
          <p>
            Get started with DecentralDrive in three simple steps. No complex
            setup required.
          </p>
        </div>

        <div className="process">
          <div className="steps step1">
            <div className="step_logo">01</div>
            <h3>Connect Wallet</h3>
            <p>
              Connect your MetaMask wallet to authenticate and start using the
              platform securely.
            </p>
          </div>
          <div className="steps step2">
            <div className="step_logo">02</div>
            <h3>Upload Files</h3>
            <p>
              Upload your images to IPFS where they're stored permanently and
              accessibly worldwide.
            </p>
          </div>
          <div className="steps step3">
            <div className="step_logo">03</div>
            <h3>Share Instantly</h3>
            <p>
              Share files with anyone using their Ethereum address. No accounts
              or passwords needed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
export default WorkFlow;
