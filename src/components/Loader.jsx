import "..//styles/Loader.css";

import loadingGif from "../assets/gif/simple_pokeball.gif";
export default function Loader() {
  return (
    <div className="loader-container">
      <img className="loading-gif" src={loadingGif} alt="" />
    </div>
  );
}
