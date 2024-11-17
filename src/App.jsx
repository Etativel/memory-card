import "./App.css";
import CardContainer from "./components/CardContainer";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import { useEffect, useState } from "react";
// import Loader from "./components/Loader";
import { api } from "./services/api";

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (score < bestScore) return;
    setBestScore(score);
  }, [score]);
  useEffect(() => {
    async function fetchData() {
      const pokemonData = await api();
      setData(pokemonData);
    }
    fetchData();
  }, []);

  return (
    <div className="app-container">
      <Header score={score} bestScore={bestScore} />
      {data.length === 0 ? (
        <Loader />
      ) : (
        <CardContainer
          setScore={setScore}
          setBestScore={setBestScore}
          score={score}
          bestScore={bestScore}
          data={data}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;
