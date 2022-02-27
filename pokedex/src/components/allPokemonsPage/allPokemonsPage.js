import React, {Component, Fragment} from 'react';
import PokemonCard from '../pokemonCard/pokemonCard';
import PokemonApi from '../api/api';
import Header from '../header/header';
import Paginator from '../paginator/paginator';

export default class AllPokemonsPage extends Component {
  state = {
    loading: true,
    pokemons: [],
    currentPage: this.props.currentPage,
  }

  async componentDidMount() {
    const pokemonApi = new PokemonApi();
    const pokemons = await pokemonApi.getAllPokemons(this.state.currentPage);
    this.setState({
      loading: false,
      pokemons: pokemons,
    });
  }

    async componentDidUpdate() {
      if (this.state.loading) {
        const pokemonApi = new PokemonApi();
        const pokemons = await pokemonApi.getAllPokemons(this.state.currentPage);
        this.setState({
            loading: false,
            pokemons: pokemons,
        });
      }
    }

  changePage = (newPage) => {
    if (newPage < 1) return;
    if (newPage !== this.state.currentPage) {
      this.setState({
        loading: true,
        currentPage: newPage,
      });
    }
  }

  render() {
    return (
      <>
        <Header/>
        <Paginator currentPage={this.state.currentPage} changePage={this.changePage}/>
        <div className="app d-flex flex-wrap justify-content-center">
          {this.state.loading ? <h2>Loading...</h2> : this.state.pokemons.map(pokemon => {
            return <PokemonCard name={pokemon.name} id={pokemon.id} key={pokemon.id} isCatched={pokemon.isCatched}/>
          })}
        </div>
        <Paginator currentPage={this.state.currentPage} changePage={this.changePage}/>
      </>
    )
  }
}