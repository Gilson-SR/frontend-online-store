import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

class Search extends React.Component {
  state = {
    listCategories: [],
  };

  async componentDidMount() {
    await this.getAllCategories();
  }

  getAllCategories = async () => {
    const categories = await getCategories();
    this.setState({
      listCategories: categories,
    });
  };

  render() {
    const { listCategories } = this.state;
    return (
      <div data-testid="home-initial-message">
        <aside>
          {listCategories.map(({ id, name }) => (
            <button data-testid="category" type="button" key={ id }>
              {name}
            </button>
          ))}
        </aside>
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
