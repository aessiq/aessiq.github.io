import React, {Component, Fragment} from 'react';
import Header from '../header/header';
import PokemonApi from '../api/api';
import PokemonCard from '../pokemonCard/pokemonCard';
import Paginator from '../paginator/paginator';

export default class CatchedPokemonsPage extends Component {
  state = {
    loading: true,
    pokemons: [],
    currentPage: 1,
  }

  async componentDidMount() {
    const pokemonApi = new PokemonApi();
    await pokemonApi.setAsUncatched();
    const pokemons = await pokemonApi.getCatchedPokemons(this.state.currentPage);
    this.setState({
      loading: false,
      pokemons: pokemons,
    });
  }

  async componentDidUpdate() {
    if (this.state.loading) {
      const pokemonApi = new PokemonApi();
      const pokemons = await pokemonApi.getCatchedPokemons(this.state.currentPage);
      this.setState({
          loading: false,
          pokemons: pokemons,
      });
    }
  }

  renderCatchedPokemonsList = () => {
    if (this.state.pokemons.length === 0) {
      return <h2 className="mt-5 mb-5">You haven't catched anyone yet.</h2>
    }
    if (this.state.loading) {
      return <h2>Loading...</h2>
    }
    const catchedPokemonsList = this.state.pokemons.map(pokemon => {
      return <PokemonCard name={pokemon.name} id={pokemon.id} key={pokemon.id} isCatched={pokemon.isCatched}/>
    });
    return catchedPokemonsList;
  }
  

  render() {
    return (
      <>
        <Header/>
        <div className="app d-flex flex-wrap justify-content-center">
          {this.renderCatchedPokemonsList()}
        </div>
      </>
    )
  }
}