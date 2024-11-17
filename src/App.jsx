import "./App.css";
import CardContainer from "./components/CardContainer";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";
// import Loader from "./components/Loader";
function App() {
  const [score, setScore] = useState(0);
  return (
    <div className="app-container">
      <Header score={score} />
      <CardContainer setScore={setScore} score={score} />
      <Footer />
    </div>
  );
}

export default App;
