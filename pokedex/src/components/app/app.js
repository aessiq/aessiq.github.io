import React, {Component} from 'react';
import PokemonProfile from '../pokemonProfile/pokemonProfile';
import CatchedPokemonsPage from '../catchedPokemonsPage/catchedPokemonsPage';
import AllPokemonsPage from '../allPokemonsPage/allPokemonsPage';
import {BrowserRouter as Router, Route} from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path='/catched' component={CatchedPokemonsPage}/>
        <Route exact path='/' component={() => <AllPokemonsPage currentPage={1}/>}/>
        <Route exact path='/page/:page' component={({match}) => <AllPokemonsPage currentPage={match.params.page}/>}/>
        <Route path='/pokemons/:id' render={({match}) => <PokemonProfile id={match.params.id}/>}/>
      </Router>
    )
  }
}