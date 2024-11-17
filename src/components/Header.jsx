/* eslint-disable react/prop-types */
import "../styles/Header.css";

export default function Header({ score }) {
  return (
    <div className="header-container">
      <div className="main">Card Game</div>
      <div className="score-board">Score Board: {score}</div>
    </div>
  );
}
