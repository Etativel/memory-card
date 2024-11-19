/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import "../styles/CardContainer.css";
import "../styles/PokemonType.css";
import battleMusic from "../assets/bgm/battle.mp3";
import { shuffle, ensureAtLeastOneUnclicked } from "../utils/cardUtils";
import { capitalize, formatNumber, getType } from "../utils/formatter";
import musicNote from "../assets/icons/music-player.png";

function Card({ id, onClick, clicked, pokemon }) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`card card-${id} ${clicked ? "clicked" : ""} ${getType(
        pokemon.type[0]
      )} `}
    >
      <div className="id-type">
        <p className="id">#{formatNumber(pokemon.p_id)}</p>
        <p
          style={{
            backgroundColor: `var(--${getType(pokemon.type[0])})`,
          }}
          className="type-bullet"
        ></p>
      </div>
      <img src={pokemon.img} alt="" className="card-img" />
      <div className="desc">
        <p className="pokemon-name">{capitalize(pokemon.name)}</p>
        <div className="weight-height">
          <div className="weight">
            <p className="w-title grey-text">Weight</p>
            <p className="w-text">{pokemon.weight}</p>
          </div>
          <div className="height">
            <p className="h-title grey-text">Height</p>
            <p className="h-text">{pokemon.height}</p>
          </div>
        </div>
        <div className="type">
          <p className="t-type">
            <span className="grey-typ grey-text">Type:</span>
            {pokemon.type[0]}
          </p>
        </div>
      </div>
    </button>
  );
}

export default function CardContainer({
  score,
  setScore,
  data,
  totalCards,
  setOnHome,
  setBestScore,
  visibleCardsCount,
  setDifficulty,
  bestScore,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          audioRef.current.volume = 0.5;
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error("Autoplay blocked: ", error);
      }
    };
    playAudio();
  }, []);

  function handleMusic() {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }
  const initialCards = Array.from({ length: totalCards }, (_, index) => ({
    id: index + 1,
    clicked: false,
  }));

  const [cards, setCards] = useState(initialCards);
  const [visibleCards, setVisibleCards] = useState(() =>
    ensureAtLeastOneUnclicked(shuffle([...initialCards]), visibleCardsCount)
  );
  const [message, setMessage] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);

  // Prevent clicks after game over
  function handleCardClick(id) {
    if (isGameOver) return;
    const clickedCard = cards.find((card) => card.id === id);

    if (clickedCard.clicked) {
      setMessage(
        `Game Over! You clicked the same card. Your Score is ${score}`
      );
      setIsGameOver(true);
      return;
    }

    const updatedCards = cards.map((card) =>
      card.id === id ? { ...card, clicked: true } : card
    );

    setCards(updatedCards);
    setScore((prev) => prev + 1);

    const allClicked = updatedCards.every((card) => card.clicked);
    if (allClicked) {
      setMessage("You win! Congratulations!");
      setIsGameOver(true);
      return;
    }

    const shuffledCards = shuffle(updatedCards);
    const newVisibleCards = ensureAtLeastOneUnclicked(
      shuffledCards,
      visibleCardsCount
    );

    setVisibleCards(newVisibleCards);
  }

  function resetGame() {
    setCards(initialCards);
    setVisibleCards(
      ensureAtLeastOneUnclicked(shuffle([...initialCards]), visibleCardsCount)
    );
    setMessage("");
    setIsGameOver(false);
    setScore(0);
  }

  function handleQuit() {
    setDifficulty("");
    audioRef.current.pause();
    setIsGameOver(true);
    setScore(0);
    setBestScore(0);
    setTimeout(() => {
      setOnHome(true);
    }, 1001);
  }

  return (
    <div className={`card-container`}>
      <audio
        ref={audioRef}
        src={battleMusic}
        loop
        preload="none"
        autoPlay
      ></audio>
      <button
        className={`music-btn-card ${isPlaying ? "playing" : "paused"}`}
        onClick={handleMusic}
      >
        <img className="music-note-img" src={musicNote} />
      </button>
      {message && (
        <div className="message">
          <div className="mess-text">
            <p className="tt-xt">{message}</p>
          </div>
          <div className="diff-btn-container">
            <button className="diff-btn-card" onClick={resetGame}>
              Restart Game
            </button>
            <button className="diff-btn-card" onClick={handleQuit}>
              Quit Game
            </button>
          </div>
        </div>
      )}
      {!isGameOver && (
        <div className={`card-sub-container`}>
          <div className="card-text-hero">
            <div className="score-board-container">
              <div className="score">SCORE: {score}</div>
              <div className="best-score">BEST SCORE: {bestScore}</div>
            </div>
            <div className="guessed">
              {score} / {totalCards}
            </div>
          </div>
          <div className="card-c-c">
            {visibleCards.map((card) => {
              const pokemon = data.find((item) => item.id === card.id);
              return (
                <Card
                  pokemon={pokemon}
                  key={card.id}
                  id={card.id}
                  onClick={handleCardClick}
                  clicked={card.clicked}
                  img={pokemon ? pokemon.img : ""}
                  name={pokemon ? pokemon.name : ""}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
