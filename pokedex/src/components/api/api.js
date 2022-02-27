import {Component} from 'react';

export default class PokemonApi extends Component {
  async getAllPokemons(page) {
    const url = `http://localhost:5000/pokemons?_page=${page}&_limit=30`;
    const data = await fetch(url);

    if (!data.ok) {
      throw new Error('Cannot fetch Pokemons\' data');
    }

    return await data.json();
  }

  async getCatchedPokemons(page) {
    const url = `http://localhost:5000/pokemons?isCatched=true&_page=${page}&_limit=30`;
    const data = await fetch(url);

    if (!data.ok) {
      throw new Error('Cannot fetch Pokemons\' data');
    }

    return await data.json();
  }

  async getPokemon(id) {
    const url = `http://localhost:5000/pokemons/${id}`
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Cannot fetch Pokemons\' data');
    }

    return await response.json();
  }

  async catchPokemon(id) {
    const url = `http://localhost:5000/pokemons/${id}`;
    const date = `${new Date().getHours()}:${new Date().getMinutes()}, ${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`;
    await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({isCatched: true, catchDate: date})
    });
  }

  async setAsUncatched() {
    const url = `http://localhost:5000/pokemons/1`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Cannot fetch Pokemons\' data');
    }

    const pokemon = await response.json();

    if (!pokemon.isCatched || !pokemon.hasOwnProperty('isCatched')) {
      await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({isCatched: false})
      });
    }
  }
}