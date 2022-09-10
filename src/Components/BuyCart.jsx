import React from 'react';
import { getProductsCart } from '../services/localStorage';

class BuyCart extends React.Component {
  state = {
    cartItems: [],
    quantidades: {},
  };

  componentDidMount() {
    this.filterProducts();
    this.counterProducts();
  }

  filterProducts() {
    const productsCart = getProductsCart() || [];
    const productsFilter = productsCart.reduce((products, element) => {
      if (products.some((e) => e.id === element.id)) {
        return products;
      }
      products.push(element);
      return products;
    }, []);
    this.setState({ cartItems: productsFilter });
  }

  counterProducts() {
    const productsCart = getProductsCart() || [];
    const productsQuantity = productsCart.reduce((products, element) => {
      if (!products[element.id]) {
        products[element.id] = 0;
      }
      products[element.id] += 1;
      return products;
    }, {});
    this.setState({ quantidades: productsQuantity });
  }

  render() {
    const { cartItems, quantidades } = this.state;
    return (
      <div>
        {cartItems.length < 1 ? (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        ) : (
          cartItems.map((product) => {
            const { title, price, id } = product;
            return (
              <p key={ id }>
                <span data-testid="shopping-cart-product-name">
                  {title}
                </span>
                <span>
                  -
                  {' '}
                  {price}
                  {' '}
                  -
                  {' '}
                </span>
                <span data-testid="shopping-cart-product-quantity">
                  { quantidades[id] }
                </span>
                <span>
                  {' '}
                  Unds
                </span>
              </p>
            );
          })
        )}
      </div>
    );
  }
}

export default BuyCart;
