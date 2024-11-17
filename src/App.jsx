import "./App.css";
import CardContainer from "./components/CardContainer";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import Loader from "./components/Loader";
function App() {
  return (
    <div className="app-container">
      <Header />
      <CardContainer />
      <Footer />
    </div>
  );
}

export default App;
