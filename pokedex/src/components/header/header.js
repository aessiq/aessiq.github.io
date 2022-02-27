import React from 'react';
import './header.css';
import {Link} from 'react-router-dom';

const Header = () => {
  return(
    <header className="header d-flex justify-content-around align-items-center pt-3 mb-2">
      <Link to="/" className="text-decoration-none">
        <h1 className="header__title text-danger mb-0">Pokedex</h1>
      </Link>
      <nav className="d-flex justify-content-around">
        <Link to="/">
          <button className="header__all btn btn-danger me-1">All Pokemons</button>
        </Link>
        <Link to="/catched">
          <button className="header__catched btn btn-danger">Catched Pokemons</button>
        </Link>
      </nav>
    </header>
  )
}

export default Header;