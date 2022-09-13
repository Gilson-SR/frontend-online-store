import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { saveProductCart } from '../services/StorageCart';

export default class Product extends React.Component {
  render() {
    const { product, callback } = this.props;
    const {
      thumbnail,
      title,
      id,
      price,
      shipping: { free_shipping: freteGratis },
    } = product;
    return (
      <div data-testid="product">
        <Link to={ `/${id}` } data-testid="product-detail-link">
          <h3>{title}</h3>
          <img src={ thumbnail } alt={ title } />
          <h2>{`R$: ${price}`}</h2>
          {freteGratis && <h4 data-testid="free-shipping">Frete Grátis</h4>}
        </Link>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ () => {
            saveProductCart(product);
            callback();
          } }
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
    callback: PropTypes.func,
  }),
}.isRequired;
