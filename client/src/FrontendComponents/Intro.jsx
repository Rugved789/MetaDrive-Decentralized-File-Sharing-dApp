import "../styles/intro.css";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import metadriveVideo from "./MetaDrive_ Decentralized Future (1).mp4";

function Intro() {
  const [expanded, setExpanded] = useState(false);
  const videoRef = useRef(null);

  // prefer the bundled video in the FrontendComponents folder
  const demoSrc =
    metadriveVideo || process.env.REACT_APP_DEMO_VIDEO || "/demo.mp4";

  const enterExpanded = () => {
    setExpanded(true);

    // allow DOM to update then play
    setTimeout(() => {
      const v = videoRef.current;
      if (v) {
        v.currentTime = 0;
        v.play().catch((e) => console.warn("play error", e));
      }
    }, 60);
  };

  const exitExpanded = () => {
    const v = videoRef.current;
    if (v) {
      try {
        v.pause();
        v.currentTime = 0;
      } catch (e) {}
    }
    setExpanded(false);
  };

  const handleWatchClick = () => {
    enterExpanded();
  };

  const handleVideoEnded = () => {
    exitExpanded();
  };

  /**
   * ✅ ESLint / CI-safe cleanup
   * - ref is captured ONCE
   * - ref is accessed in effect body
   * - cleanup uses the same stable reference
   */

  return (
    <section className="main">
      <div className="intro-container">
        <div className="description">
          <div className="desc-text">
            <div className="capsuleInfo">🚀 The Future of File Sharing is Here</div>
            <h1>
              Own Your Files.
              <span>Share Securely.</span>
            </h1>
            <p>
              MetaDrive revolutionizes file sharing with blockchain technology
              and IPFS storage. No more relying on centralized platforms that can
              disappear overnight.
            </p>
          </div>

          <div className="start">
            <Link to="/backend">
              <button className="start-button">Get Started Free</button>
            </Link>
            <button className="watch" onClick={handleWatchClick}>
              Watch Demo
            </button>
          </div>

          <div className="points">
            <div className="pointBox">
              <span>✔ No signup required</span>
            </div>
            <div className="pointBox">
              <span>✔ 100% decentralized</span>
            </div>
            <div className="pointBox">
              <span>✔ Open source</span>
            </div>
          </div>
        </div>

        <div className={`media-container ${expanded ? "expanded" : ""}`}>
          <div className="imageContainer">
            <div className="imageHolder">
              <video
                ref={videoRef}
                className={`media-video ${expanded ? "full" : "videobox"}`}
                src={demoSrc}
                poster={process.env.REACT_APP_DEMO_POSTER}
                controls={expanded}
                playsInline
                muted={false}
                onClick={() => {
                  if (!expanded) {
                    enterExpanded();
                  }
                }}
                onEnded={handleVideoEnded}
              />
            </div>
          </div>

          {expanded && (
            <div
              className="media-overlay"
              onClick={() => {
                exitExpanded();
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default Intro;
