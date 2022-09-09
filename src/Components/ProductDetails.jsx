import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

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
    });
  }

  render() {
    const { atributos, infoImage, infoName, infoPrice } = this.state;
    return (
      <div>
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
        <Link to="/BuyCart" data-testid="shopping-cart-button">Carrinho</Link>
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
