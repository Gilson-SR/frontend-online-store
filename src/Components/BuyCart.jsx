import React from 'react';
import { getProductsCart, removeProductCart } from '../services/localStorage';

class BuyCart extends React.Component {
  state = {
    cartItems: [],
    quantidades: {},
  };

  componentDidMount() {
    this.filterProducts();
    this.counterProducts();
  }

  addCounter = (id) => {
    const { quantidades, cartItems } = this.state;
    const counterByID = quantidades[id];
    const obj = cartItems.find((e) => e.id === id);
    const { available_quantity: availableQuantity } = obj;
    let sum = availableQuantity;
    if (availableQuantity > counterByID) {
      sum = counterByID + 1;
    }
    const objSum = { [id]: sum };
    this.setState(({ quantidades: quantity }) => ({
      quantidades: { ...quantity, ...objSum },
    }));
  };

  decreaseCounter = (id /* , product */) => {
    const { quantidades } = this.state;
    const counterByID = quantidades[id];
    let sub = 0;
    if (counterByID > 1) {
      sub = counterByID - 1;
    } else {
      sub = 1;
      // this.removeItemCart(product);
    }
    const objSub = { [id]: sub };
    this.setState(({ quantidades: quantity }) => ({
      quantidades: { ...quantity, ...objSub },
    }));
  };

  removeItemCart = (obj) => {
    removeProductCart(obj);
    this.filterProducts();
  };

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
    const { addCounter, decreaseCounter, removeItemCart } = this;
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
            const totalPrice = price * quantidades[id];
            return (
              <p key={ id }>
                <span data-testid="shopping-cart-product-name">{title}</span>
                <button
                  type="button"
                  data-testid="product-increase-quantity"
                  onClick={ () => addCounter(id) }
                >
                  +
                </button>
                <span data-testid="shopping-cart-product-quantity">
                  {quantidades[id]}
                </span>
                <span> Unds</span>
                <button
                  type="button"
                  data-testid="product-decrease-quantity"
                  onClick={ () => decreaseCounter(id, product) }
                >
                  -
                </button>
                <span>
                  {' '}
                  R$:
                  {' '}
                  {totalPrice.toLocaleString({
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
                <button
                  type="button"
                  data-testid="remove-product"
                  onClick={ () => removeItemCart(product) }
                >
                  X
                </button>
              </p>
            );
          })
        )}
      </div>
    );
  }
}

export default BuyCart;
