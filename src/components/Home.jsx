/* eslint-disable react/prop-types */
import "..//styles/Home.css";
import pokecard from "../assets/icons/PokeCard (1).png";
export default function Home({ setOnHome, setDifficulty }) {
  function handleClick(difficulty) {
    setOnHome(false);
    setDifficulty(difficulty);
  }
  return (
    <div className="home-container">
      <div className="header">
        <img className="pokecard-img" src={pokecard} alt="pokemon" />
      </div>
      <div className="button-container">
        <button onClick={() => handleClick("easy")} className="quit-btn">
          Easy
        </button>
        <button onClick={() => handleClick("hard")} className="quit-btn">
          Hard
        </button>
        <button onClick={() => handleClick("insane")} className="quit-btn">
          Insane
        </button>
      </div>
    </div>
  );
}
