/* eslint-disable react/prop-types */
import "../styles/Home.css";
import pokecard from "../assets/icons/PokeCard (1).png";
import homeMusic from "../assets/bgm/opening.mp3";
import { useRef, useEffect } from "react";

export default function Home({ setOnHome, setDifficulty }) {
  const audioRef = useRef(null);

  useEffect(() => {
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          await audioRef.current.play();
        }
      } catch (error) {
        console.error("Autoplay blocked or failed: ", error);
      }
    };

    playAudio();
  }, []);

  function handleMusic() {
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }

  function handleClick(difficulty) {
    setTimeout(() => {
      setOnHome(false);
    }, 1001);
    setDifficulty(difficulty);
  }

  return (
    <div className="home-container">
      <audio ref={audioRef} src={homeMusic} loop preload="none"></audio>
      <button onClick={handleMusic} className="music-btn">
        M
      </button>
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
