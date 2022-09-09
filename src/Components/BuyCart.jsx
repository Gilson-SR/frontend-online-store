import React from 'react';
import { getProductsCart } from '../services/localStorage';

class BuyCart extends React.Component {
  state = {
    cartItems: [],
  };

  componentDidMount() {
    this.filterProducts();
  }

  filterProducts() {
    const productsCart = getProductsCart();
    const productsFilter = productsCart.reduce((products, element) => {
      if (products.includes(element)) {
        return products;
      }
      products.push(element);
      console.log(products);
      return products;
    }, []);
    this.setState({ cartItems: productsFilter });
  }

  render() {
    const { cartItems } = this.state;
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
                <span data-testid="shopping-cart-product-name">{title}</span>
                <span>{price}</span>
              </p>
            );
          })
        )}
      </div>
    );
  }
}

export default BuyCart;
