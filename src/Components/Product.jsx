import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { saveProductCart } from '../services/localStorage';

export default class Product extends React.Component {
  render() {
    const { product } = this.props;
    const {
      thumbnail,
      name,
      id,
      price,
      shipping: { free_shipping: freteGratis },
    } = product;
    console.log(product);
    return (
      <div data-testid="product">
        <Link to={ `/${id}` } data-testid="product-detail-link">
          <img src={ thumbnail } alt={ name } />
          <h3>{`R$: ${price}`}</h3>
          {freteGratis && <h4 data-testid="free-shipping">Frete Grátis</h4>}
        </Link>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ () => saveProductCart(product) }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

Product.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
  }),
}.isRequired;
