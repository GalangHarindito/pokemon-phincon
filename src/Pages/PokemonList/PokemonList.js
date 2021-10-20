import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./style.css";
import { getAllPokemon } from "./action";
import { useSelector } from "react-redux";
import CardPokemon from "../../component/CardPokemon";
import icPrev from "../../assets/ic-arrow-left.svg";
import icNext from "../../assets/ic-arrow-right.svg";
import queryString from "querystring";
import { useHistory, useLocation } from "react-router";
import DetailPokemon from "../DetailPokemon";
import { Link } from "react-router-dom";

export default function PokemonList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { search } = useLocation();
  let { offset } = queryString.parse(search.replace("?", ""));
  const { pokemon } = queryString.parse(search.replace("?", ""));
  const { dataResults, dataNext, dataPrevious, dataCount, isLoading } = useSelector(
    (s) => s.pokemonList
  );

  let req = {
    limit: 20,
    offset: offset || 0,
  };

  useEffect(() => {
    dispatch(getAllPokemon(req));
  }, []);

  useEffect(() => {
    dispatch(getAllPokemon(req));
  }, [offset]);

  if (search.includes("?pokemon") && pokemon) {
    return <DetailPokemon />
  }

  return (
    <section className='pokemon-list'>
      <div>
        <h3>Let's Find Your Pokemon</h3>
        <Link to='/'>Home</Link>
        <br />
        <p>Total pokemon = {dataCount}</p>
        <div>
          <img
            src={icPrev}
            alt='prev'
            style={{ visibility: dataPrevious === null ? "hidden" : "visible" }}
            onClick={() => {
              req['offset'] = Number(req.offset) - 10
              const newQuery = queryString.stringify(req);
              history.push(`?${newQuery}`);
            }}
          />
          <CardPokemon data={dataResults} onClick={(id) => history.push(`?pokemon=${id}`) } />
          <img
            src={icNext}
            alt='next'
            style={{ visibility: dataNext === null ? "hidden" : "visible" }}
            onClick={() => {
              req['offset'] = Number(req.offset) + 10
              const newQuery = queryString.stringify(req);
              history.push(`?${newQuery}`);
            }}
          />
        </div>
      </div>
    </section>
  );
}
