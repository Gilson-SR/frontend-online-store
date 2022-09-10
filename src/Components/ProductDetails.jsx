import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { saveProductCart } from '../services/localStorage';

class ProductDetails extends React.Component {
  state = {
    atributos: [],
    infoImage: '',
    infoPrice: 0,
    infoName: '',
  };

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const results = await getProductById(id);
    this.setState({
      atributos: results.attributes,
      infoImage: results.thumbnail,
      infoPrice: results.price,
      infoName: results.title,
      allInfo: results,
    });
  }

  render() {
    const { atributos, infoImage, infoName, infoPrice, allInfo } = this.state;
    return (
      <div>
        <Link to="/BuyCart" data-testid="shopping-cart-button">
          Carrinho
        </Link>
        <img
          data-testid="product-detail-image"
          src={ infoImage }
          alt={ infoName }
        />
        <h2 data-testid="product-detail-name">{infoName}</h2>
        <h4>
          <span>Preço:</span>
          <span data-testid="product-detail-price">{infoPrice}</span>
        </h4>
        <ul>
          {atributos.map((product) => (
            <li key={ product.id }>{`${product.name}: ${product.value_name}`}</li>
          ))}
        </ul>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => saveProductCart(allInfo) }
        >
          Adicionar ao Carinho
        </button>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default ProductDetails;
