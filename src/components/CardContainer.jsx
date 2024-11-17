/* eslint-disable react/prop-types */
import { useState } from "react";
import "../styles/CardContainer.css";

function shuffle(array) {
  let currentIndex = array.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function Card({ id, onClick, clicked }) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`card card-${id} ${clicked ? "clicked" : ""}`}
    >
      Card {id}
    </button>
  );
}

export default function CardContainer({ setScore }) {
  // Total number of unique cards
  const totalCards = 4;
  // Number of visible cards at a time
  const visibleCardsCount = 2;

  // Initialize all cards
  const initialCards = Array.from({ length: totalCards }, (_, index) => ({
    id: index + 1,
    clicked: false,
  }));

  const [cards, setCards] = useState(initialCards);
  const [visibleCards, setVisibleCards] = useState(() =>
    ensureAtLeastOneUnclicked(shuffle([...initialCards]), visibleCardsCount)
  );

  function handleCardClick(id) {
    const clickedCard = cards.find((card) => card.id === id);

    if (clickedCard.clicked) {
      alert("Game Over! You clicked the same card.");
      resetGame();
      setScore(0);
      return;
    }

    // Mark the card as clicked //
    const updatedCards = cards.map((card) =>
      card.id === id ? { ...card, clicked: true } : card
    );

    setCards(updatedCards);
    setScore((prev) => prev + 1);

    // Check if all cards have been clicked //
    const allClicked = updatedCards.every((card) => card.clicked);
    if (allClicked) {
      alert("You win!");
      resetGame();
      setScore(0);
      return;
    }

    // Shuffle cards and ensure at least one unclicked card is visible //
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
  }

  // Ensure at least one unclicked card is in the visible cards
  function ensureAtLeastOneUnclicked(cards, count) {
    const unclickedCards = cards.filter((card) => !card.clicked);
    const clickedCards = cards.filter((card) => card.clicked);

    // Pick enough unclicked cards to ensure visibility of at least one, Ensure at least one unclicked
    const visibleUnclicked = unclickedCards.slice(0, 1);
    const remainingCards = [...unclickedCards.slice(1), ...clickedCards];

    return shuffle([
      ...visibleUnclicked,
      ...remainingCards.slice(0, count - 1),
    ]);
  }

  return (
    <div className="card-container">
      <div className="card-sub-container">
        {visibleCards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            onClick={handleCardClick}
            clicked={card.clicked}
          />
        ))}
      </div>
    </div>
  );
}
