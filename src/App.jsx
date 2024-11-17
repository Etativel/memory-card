import "./App.css";
import CardContainer from "./components/CardContainer";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
// import Loader from "./components/Loader";
import { api } from "./services/api";
import { shuffle } from "./utils/cardUtils";
function App() {
  const [score, setScore] = useState(0);
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const pokemonData = await api();
      const shuffledData = shuffle(pokemonData);
      setData(shuffledData);
    }
    fetchData();
  }, []);

  return (
    <div className="app-container">
      <Header score={score} />
      <CardContainer setScore={setScore} score={score} data={data} />
      <Footer />
    </div>
  );
}

export default App;
