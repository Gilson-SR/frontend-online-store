import React from 'react';
import PropTypes from 'prop-types';

export default class Product extends React.Component {
  render() {
    const { name, price, image } = this.props;
    return (
      <div data-testid="product">
        <img src={ image } alt={ name } />
        <h3>{`R$: ${price}`}</h3>
        <button type="button">Adicionar ao Carrinho</button>
      </div>
    );
  }
}

Product.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};
