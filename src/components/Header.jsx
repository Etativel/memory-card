/* eslint-disable react/prop-types */
import "../styles/Header.css";

import pokeCard from "..//assets/icons/PokeCard (2).png";

export default function Header() {
  return (
    <div className="header-container">
      <div className="main">
        <img className="poke-card" src={pokeCard} alt="PokeCard" />
      </div>
    </div>
  );
}
