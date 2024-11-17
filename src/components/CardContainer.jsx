/* eslint-disable react/prop-types */
import { useState } from "react";
import "../styles/CardContainer.css";
import { shuffle, ensureAtLeastOneUnclicked } from "../utils/cardUtils";
import { capitalize } from "../utils/formatter";

function Card({ id, onClick, clicked, img, name }) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`card card-${id} ${clicked ? "clicked" : ""}`}
    >
      <img src={img} alt="" />
      <p>{capitalize(name)}</p>
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
}) {
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
    setOnHome(true);
    setIsGameOver(true);
    setScore(0);
    setBestScore(0);
  }

  return (
    <div className="card-container">
      {message && (
        <div className="message">
          <p>{message}</p>
          <button onClick={resetGame}>Restart Game</button>
          <button onClick={handleQuit}>Quit Game</button>
        </div>
      )}
      {!isGameOver && (
        <div className="card-sub-container">
          {visibleCards.map((card) => {
            const pokemon = data.find((item) => item.id === card.id);
            return (
              <Card
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
      )}
    </div>
  );
}
