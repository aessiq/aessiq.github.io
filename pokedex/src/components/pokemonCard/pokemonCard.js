import React from 'react';
import './pokemonCard.css';
import PokemonApi from '../api/api';
import { withRouter } from 'react-router-dom';

const PokemonCard = (props) => {
  const api = new PokemonApi();

  const catchPokemon = (e) => {
    api.catchPokemon(props.id);
    e.target.classList.add('disabled');
    e.target.innerText = 'Catched!';
  }

  const handleClick = (e) => {
    if (!e.target.classList.contains('btn')) {
      props.history.push(`/pokemons/${props.id}`);
    }
  }

  return (
      <div className="pokemon-card" onClick={handleClick}>
        <h3 className="pokemon-card__title">{props.name}</h3>
        <img className="pokemon-card__image" src={`/pokemons/${props.id}.png`} alt={props.name}/>
        {props.isCatched ? <button className="btn btn-danger" disabled>Catched!</button> : <button className="btn btn-danger" onClick={catchPokemon}>Catch!</button>}
      </div>
    );
}


export default withRouter(PokemonCard);