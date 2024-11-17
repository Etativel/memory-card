export function shuffle(array) {
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

export function ensureAtLeastOneUnclicked(cards, count) {
  const unclickedCards = cards.filter((card) => !card.clicked);
  const clickedCards = cards.filter((card) => card.clicked);

  const visibleUnclicked = unclickedCards.slice(0, 1);
  const remainingCards = [...unclickedCards.slice(1), ...clickedCards];

  return shuffle([...visibleUnclicked, ...remainingCards.slice(0, count - 1)]);
}
