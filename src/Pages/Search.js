import React from 'react';
import { Link } from 'react-router-dom';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';
import Product from '../Components/Product';

class Search extends React.Component {
  state = {
    listCategories: [],
    searching: '',
    listResults: [],
    message: true,
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
    const { state, handleChange, handleClick, handleClickCategorie } = this;
    const { listCategories, searching, listResults, message } = state;
    return (
      <div data-testid="home-initial-message">
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
        {message && <p>Digite algum termo de pesquisa ou escolha uma categoria.</p>}
        {listResults.length < 1 ? (
          <p>Nenhum produto foi encontrado</p>
        ) : (
          listResults.map((element) => (
            <Product
              name={ element.title }
              price={ element.price }
              image={ element.thumbnail }
              key={ element.id }
            />
          ))
        )}
        <Link to="/BuyCart" data-testid="shopping-cart-button">
          carrinho
        </Link>
      </div>
    );
  }
}

export default Search;
