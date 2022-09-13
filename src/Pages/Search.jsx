import React from 'react';
import { Link } from 'react-router-dom';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';
import Product from '../Components/Product';
import { getProductsCart } from '../services/StorageCart';

class Search extends React.Component {
  state = {
    listCategories: [],
    searching: '',
    listResults: [],
    message: true,
    sizeCart: 0,
  };

  async componentDidMount() {
    await this.getAllCategories();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  getSizeCart = () => {
    const cartItems = getProductsCart() || [];
    const sizeCart = cartItems.length;
    console.log(cartItems);
    this.setState({
      sizeCart,
    });
  };

  handleClick = async () => {
    const { searching } = this.state;
    const request = await getProductsFromCategoryAndQuery(searching);
    this.setState({
      listResults: request.results,
      message: false,
    });
  };

  handleClickCategorie = async ({ target }) => {
    const { id } = target;
    const { searching } = this.state;
    const request = await getProductsFromCategoryAndQuery(searching, id);
    const { results } = request;
    this.setState({
      listResults: results,
    });
  };

  getAllCategories = async () => {
    const categories = await getCategories();
    this.setState({
      listCategories: categories,
    });
  };

  render() {
    const { state, handleChange, handleClick, handleClickCategorie, getSizeCart } = this;
    const { listCategories, searching, listResults, message, sizeCart } = state;
    return (
      <div data-testid="home-initial-message">
        <Link to="/BuyCart" data-testid="shopping-cart-button">
          <span>Carrinho</span>
          <span data-testid="shopping-cart-size">{ sizeCart }</span>
        </Link>
        <aside>
          {listCategories.map(({ id, name }) => (
            <button
              data-testid="category"
              type="button"
              id={ id }
              key={ id }
              onClick={ handleClickCategorie }
            >
              {name}
            </button>
          ))}
        </aside>
        <input
          type="text"
          name="searching"
          data-testid="query-input"
          value={ searching }
          onChange={ handleChange }
        />
        <button data-testid="query-button" type="button" onClick={ handleClick }>
          Pesquisar
        </button>
        {message && (
          <p>Digite algum termo de pesquisa ou escolha uma categoria.</p>
        )}
        {listResults.length < 1 ? (
          <p>Nenhum produto foi encontrado</p>
        ) : (
          listResults.map((element) => (
            <Product callback={ getSizeCart } product={ element } key={ element.id } />
          ))
        )}
      </div>
    );
  }
}

export default Search;
