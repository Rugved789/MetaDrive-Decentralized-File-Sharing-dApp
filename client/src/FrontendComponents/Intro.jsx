import "../styles/intro.css";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import metadriveVideo from "./MetaDrive_ Decentralized Future (1).mp4";

function Intro() {
  const [expanded, setExpanded] = useState(false);
  const videoRef = useRef(null);

  // prefer the bundled video in the FrontendComponents folder
  const demoSrc = metadriveVideo || process.env.REACT_APP_DEMO_VIDEO || "/demo.mp4";

  const enterExpanded = () => {
    // expand to full screen overlay and play
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
    // user gesture -> expand and start playback
    enterExpanded();
  };

  const handleVideoEnded = () => {
    // revert to small box
    exitExpanded();
  };

  useEffect(() => {
    return () => {
      const v = videoRef.current;
      if (v) {
        try {
          v.pause();
        } catch (e) {}
      }
    };
  }, []);
  return (
    <section className="main">
      <div className="intro-container">
        <div className="description">
          <div className="desc-text">
            <div className="capsuleInfo">
              🚀 The Future of File Sharing is Here
            </div>
            <h1>
              Own Your Files.
              <span>Share Securely.</span>
            </h1>
            <p>
              MetaDrive revolutionizes file sharing with blockchain technology
              and IPFS storage. No more relying on centralized platforms that
              can disappear overnight.
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="green"
                className="bi bi-check-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
              </svg>
              <span>No signup required</span>
            </div>
            <div className="pointBox">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="green"
                className="bi bi-check-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
              </svg>
              <span>100% decentralized</span>
            </div>
            <div className="pointBox">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="green"
                className="bi bi-check-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
              </svg>
              <span>Open source</span>
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
                  onClick={() => {
                    // clicking the boxed video should behave like pressing Watch Demo
                    if (!expanded) {
                      enterExpanded();
                    }
                  }}
                  onEnded={handleVideoEnded}
                  muted={false}
                />
            </div>
          </div>
          {/* overlay close area when expanded */}
          {expanded && (
            <div
              className="media-overlay"
              onClick={() => {
                // clicking overlay closes and stops video
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
