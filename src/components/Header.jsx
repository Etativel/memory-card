/* eslint-disable react/prop-types */
import "../styles/Header.css";

export default function Header({ score, bestScore }) {
  return (
    <div className="header-container">
      <div className="main">Card Game</div>
      <div className="score-board">Score: {score}</div>
      <div className="score-board">Best Score: {bestScore}</div>
    </div>
  );
}
