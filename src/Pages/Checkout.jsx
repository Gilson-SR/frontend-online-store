import React, { Component } from 'react';
import { getProductsCart, clearCart } from '../services/StorageCart';
import CheckoutForm from '../Components/CheckoutForm';

class Checkout extends Component {
  state = {
    productsCart: [],
    inputName: '',
    inputCpf: '',
    inputEmail: '',
    inputPhone: '',
    inputCep: '',
    inputAddress: '',
    inputMethodForm: '',
    allInputsIsOk: true,
    isRedirect: false,
  };

  componentDidMount() {
    this.filterProducts();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const {
      inputName,
      inputCpf,
      inputEmail,
      inputAddress,
      inputCep,
      inputMethodForm,
      inputPhone,
    } = this.state;
    const verifyEmail = inputEmail.endsWith('.com')
      && inputEmail.split('')[0] !== '@'
      && inputEmail.includes('@');
    if (
      verifyEmail
      && inputName
      && inputCpf
      && inputAddress
      && inputCep
      && inputMethodForm
      && inputPhone
    ) {
      this.setState({
        allInputsIsOk: true,
        isRedirect: true,
      });
      clearCart();
    } else {
      this.setState({
        allInputsIsOk: false,
      });
    }
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
    this.setState({ productsCart: productsFilter });
  }

  render() {
    const { state, handleChange, handleClick } = this;
    const { productsCart } = state;
    return (
      <div>
        <div>
          <h3>Revise seus Produtos:</h3>
          {productsCart.map(({ id, title, thumbnail, price }) => (
            <div key={ id }>
              <img src={ thumbnail } alt={ title } />
              <p>{title}</p>
              <p>
                <span>Total R$: </span>
                <span>{price}</span>
              </p>
            </div>
          ))}
        </div>
        <CheckoutForm
          { ...state }
          handleClick={ handleClick }
          handleChange={ handleChange }
        />
      </div>
    );
  }
}

export default Checkout;
