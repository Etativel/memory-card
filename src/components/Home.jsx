/* eslint-disable react/prop-types */
import "../styles/Home.css";
import pokecard from "../assets/icons/PokeCard (1).png";
import homeMusic from "../assets/bgm/opening.mp3";
import { useRef, useEffect, useState } from "react";
import musicNote from "../assets/icons/music-player.png";

export default function Home({ setOnHome, setDifficulty }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          audioRef.current.volume = 0.5;
          await audioRef.current.play();
          setIsPlaying(true);
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
      setIsPlaying(true); // Music is playing
    } else {
      audioRef.current.pause();
      setIsPlaying(false); // Music is playing
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
      <button
        className={`music-btn ${isPlaying ? "playing" : "paused"}`}
        onClick={handleMusic}
      >
        <img className="music-note-img" src={musicNote} />
      </button>
      <div className="header">
        <img className="pokecard-img" src={pokecard} alt="pokemon" />
      </div>
      <div className="button-container">
        <button
          onClick={() => handleClick("easy")}
          className="easy-btn diff-btn"
        >
          Easy
        </button>
        <button
          onClick={() => handleClick("hard")}
          className="hard-btn diff-btn"
        >
          Hard
        </button>
        <button
          onClick={() => handleClick("insane")}
          className="insane-btn diff-btn"
        >
          Insane
        </button>
      </div>
    </div>
  );
}
