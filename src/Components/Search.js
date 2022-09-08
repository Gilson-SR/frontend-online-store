import React from 'react';
import { Link } from 'react-router-dom';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="home-initial-message">
        <input type="text" />
        Digite algum termo de pesquisa ou escolha uma categoria.
        <Link
          to="/BuyCart"
          data-testid="shopping-cart-button"
        >
          carrinho
        </Link>
      </div>
    );
  }
}

export default Search;
