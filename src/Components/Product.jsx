import React from 'react';
import PropTypes from 'prop-types';

export default class Product extends React.Component {
  render() {
    const { name, price, image } = this.props;
    return (
      <div>
        <h2>
          <img src={ image } alt={ name } />
          <p>{`R$: ${price}`}</p>
          <button type="button">Adicionar ao Carrinho</button>
        </h2>
      </div>
    );
  }
}

Product.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
