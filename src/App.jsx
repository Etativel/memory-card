/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import CardContainer from "./components/CardContainer";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import { useEffect, useState } from "react";
// import Loader from "./components/Loader";
import { api } from "./services/api";
import Home from "./components/Home";

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [data, setData] = useState([]);
  const [onHome, setOnHome] = useState(true);
  const [difficulty, setDifficulty] = useState("");
  const [loading, setLoading] = useState("false");

  useEffect(() => {
    async function fetchData() {
      const pokemonData = await api();
      setData(pokemonData);
    }
    fetchData();
  }, []);

  let visibleCardsCount;
  let totalCards;
  switch (difficulty) {
    case "easy":
      totalCards = 7;
      visibleCardsCount = 5;
      break;
    case "hard":
      totalCards = 12;
      visibleCardsCount = 10;
      break;
    case "insane":
      totalCards = 20;
      visibleCardsCount = 20;
      break;
  }

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [difficulty]);

  useEffect(() => {
    if (score < bestScore) return;
    setBestScore(score);
  }, [score]);

  return (
    <div className="app-container">
      {loading ? (
        <Loader />
      ) : (
        <>
          {data.length === 0 ? (
            <Loader />
          ) : onHome ? (
            <Home setOnHome={setOnHome} setDifficulty={setDifficulty} />
          ) : (
            <div className="play-container">
              <Header
                score={score}
                bestScore={bestScore}
                totalCards={totalCards}
              />
              <CardContainer
                setScore={setScore}
                setBestScore={setBestScore}
                score={score}
                bestScore={bestScore}
                data={data}
                difficulty={difficulty}
                visibleCardsCount={visibleCardsCount}
                totalCards={totalCards}
                setOnHome={setOnHome}
                setDifficulty={setDifficulty}
              />
            </div>
          )}
          {onHome && data.length !== 0 && <Footer />}
        </>
      )}
    </div>
  );
}

export default App;
