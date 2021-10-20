import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import queryString from "querystring";
import './style.css';
import { getPokemonId, catchPokemon, resetMessage, storePokemon } from "./action";
import { useSelector } from "react-redux";
import ModalConfirmation from '../../component/ModalConfirmation';
import { ToastContainer } from "react-toastify";
import Button from "../../component/button/Button";


export default function DetailPokemon() {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const { pokemon } = queryString.parse(search.replace("?", ""));
  const {data, dataCatch, dataStatusStore, isLoading, isLoadingStore, isLoadingCatch } = useSelector(s => s.detailPokemon)
  const {message} = dataCatch;
  const empty = Object.keys(data).map(el => el);
  const [confirmation, setConfirmation] = useState(false);
  const closeModal = () => setConfirmation(false);

  useEffect(() => {
    dispatch(getPokemonId(pokemon))
  }, [])

  useEffect(() => {
    if (!confirmation) {
      if (message) {
      }
      dispatch(resetMessage('', 'Catch'));
    }
  }, [confirmation]);


  useEffect(() => {
    (message) ? setConfirmation(true):closeModal();
  }, [message]);

  useEffect(() => {
    if(dataStatusStore === 200){
      setConfirmation(false)
    }
  },[dataStatusStore])

  const abilities = empty.length < 1 ? '-' : data.abilities.map((el) => el.ability.name);
  const moves = empty.length < 1 ? '-' : data.moves.map((el) => el.move.name);
  const types = empty.length < 1 ? '-' : data.types.map((el) => el.type.name)

  const store = (id, pokemon, value) => {
    const newValue = {};
    newValue.pokemonId = id
    newValue.pokemonName = pokemon
    newValue.name = value
    dispatch(storePokemon(newValue))
  }


  return(
    <section className='detail-pokemon'>
      <div>
        <h3>{pokemon.toUpperCase()}</h3>
        <img src={`https://img.pokemondb.net/artwork/large/${pokemon}.jpg`} alt="" />
        <div>
          <p><b>Abilities</b> : {typeof abilities === 'object'? abilities.join(', '): abilities}</p>
          <p><b>Move</b> : {typeof moves === 'object'? moves.join(', '): moves}</p>
          <p><b>Types</b> : {typeof types === 'object'? types.join(', '): types}</p>
          <div className='form-button'>
            <Button onClick={() => dispatch(catchPokemon())} label='Catch!!' isLoading={isLoadingCatch} />
          </div>
        </div>
      </div>
      <ModalConfirmation
        header={message === 'NICE CATCH!'? 'NICE CATCH!!' : 'BAD CATCH!!'}
        onClose={() => setConfirmation(false)}
        catched= {message === 'NICE CATCH!'? true : false}
        open={confirmation}
        isLoading={isLoadingStore}
        send={(value) => store(data.id, pokemon, value )}
      />
       <ToastContainer
        position='top-center'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </section>
  )
}