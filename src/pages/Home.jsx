import './Home.css';
import app_icon from "../assets/app_icon.png";

export default function Home() {
  return (
    <div className="home-container">
      <div className="content">
        <div className="logo_h">
              <img src={app_icon} alt="AppIcon" />
        </div>
        <h1 className="title">Communicate with smarter AI using Organizational RAG</h1>
        <p className="subheading"> Retrieval-Augmented Generation that connects your org’s knowledge to secure,
      context-aware conversations — easily integrate into your website.</p>
        <div className="download-container">
          <button className="download-btn">Get Started</button>
          <p className="available-text">RAG Widget available for React/Angular or a plain static HTML page.</p>
        </div>
      </div>
    </div>
  );
}
