import React, { Component } from 'react';
import { string, bool, func } from 'prop-types';
import { Redirect } from 'react-router-dom';

class CheckoutForm extends Component {
  render() {
    const {
      handleChange,
      inputAddress,
      inputCep,
      inputCpf,
      inputEmail,
      inputMethodForm,
      inputName,
      inputPhone,
      handleClick,
      allInputsIsOk,
      isRedirect,
    } = this.props;
    return (
      <div>
        <div>
          <h2>Informações do Comprador: </h2>
          {allInputsIsOk === false && (
            <p data-testid="error-msg">Campos inválidos</p>
          )}
          <input
            type="text"
            placeholder="Nome Completo"
            name="inputName"
            value={ inputName }
            data-testid="checkout-fullname"
            onChange={ handleChange }
          />
          <input
            type="text"
            placeholder="CPF"
            name="inputCpf"
            value={ inputCpf }
            data-testid="checkout-cpf"
            onChange={ handleChange }
          />
          <input
            type="email"
            placeholder="Email"
            name="inputEmail"
            value={ inputEmail }
            data-testid="checkout-email"
            onChange={ handleChange }
          />
          <input
            type="text"
            placeholder="Telefone"
            name="inputPhone"
            value={ inputPhone }
            data-testid="checkout-phone"
            onChange={ handleChange }
          />
          <input
            type="text"
            placeholder="CEP"
            name="inputCep"
            value={ inputCep }
            data-testid="checkout-cep"
            onChange={ handleChange }
          />
          <input
            type="text"
            placeholder="Endereço"
            name="inputAddress"
            value={ inputAddress }
            data-testid="checkout-address"
            onChange={ handleChange }
          />
        </div>
        <div>
          <label htmlFor="ticket-payment">
            Boleto
            <input
              type="radio"
              name="inputMethodForm"
              id="ticket-payment"
              data-testid="ticket-payment"
              value="ticket-payment"
              checked={ inputMethodForm === 'ticket-payment' }
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="ticket-payment">
            VISA
            <input
              type="radio"
              name="inputMethodForm"
              id="ticket-payment"
              data-testid="visa-payment"
              value="visa-payment"
              checked={ inputMethodForm === 'visa-payment' }
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="ticket-payment">
            MasterCard
            <input
              type="radio"
              name="inputMethodForm"
              id="ticket-payment"
              data-testid="master-payment"
              value="master-payment"
              checked={ inputMethodForm === 'master-payment' }
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="ticket-payment">
            Elo
            <input
              type="radio"
              name="inputMethodForm"
              id="ticket-payment"
              data-testid="elo-payment"
              value="elo-payment"
              checked={ inputMethodForm === 'elo-payment' }
              onChange={ handleChange }
            />
          </label>
        </div>
        <button type="button" data-testid="checkout-btn" onClick={ handleClick }>
          Finalizar Compra
        </button>
        { isRedirect && <Redirect to="/" /> }
      </div>
    );
  }
}

CheckoutForm.propTypes = {
  handleChange: func,
  inputAddress: string,
  inputCep: string,
  inputCpf: string,
  inputEmail: string,
  inputMethodForm: string,
  inputName: string,
  inputPhone: string,
  handleClick: func,
  allInputsIsOk: bool,
  isRedirect: bool,
}.isRequired;

export default CheckoutForm;
