import React from "react";
import "./style.css";
import background from "../../assets/410023.jpg";
import { Link } from "react-router-dom";
import { routes } from "../../configs";

export default function Home() {
  return (
    <section className='home' style={{ backgroundImage: `url(${background})` }}>
      <div className='menu'>
        <h3>Welcome to Pokemon World</h3>
        <br />
        <h5>Choose Menu :</h5>
        <ul>
          <li>
            <Link to={routes.POKEMONLIST}>Pokemon List</Link>
          </li>
          <li>
            <Link to={routes.MYLIST}>My Pokemon List</Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
