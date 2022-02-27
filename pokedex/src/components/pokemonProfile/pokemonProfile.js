import React, {Component, Fragment} from 'react';
import Header from '../header/header';
import './pokemonProfile.css';
import PokemonApi from '../api/api';


export default class PokemonProfile extends Component {
  state = {
    name: null,
    id: this.props.id,
    isCatched: false,
    catchDate: null,
  }

  getPokemon = async (id) => {
    const pokemonApi = new PokemonApi();
    const pokemon = await pokemonApi.getPokemon(id);
    if (this.state.name !== pokemon.name) {
      this.setState({
        name: pokemon.name,
        isCatched: pokemon.isCatched,
        catchDate: pokemon.catchDate,
      });
    }
  }

  render() {
    this.getPokemon(this.props.id);
    return (
        <>
          <Header/>
          <div className="pokemon-profile">
            <div className="pokemon-profile__info">
              <h1>Name: {this.state.name}</h1>
              <h3>ID: {this.state.id}</h3>
              {this.state.isCatched ? (
                <>
                  <h3>Catched: Yes</h3>
                  <h3>Catch Date: {this.state.catchDate}</h3>
                </>
              ) : <h3>Catched: No</h3>}
            </div>
            <img class="pokemon-img" src={`/pokemons/${this.state.id}.png`} alt={this.state.name}/>
          </div>
        </>
      )
    }
  }
