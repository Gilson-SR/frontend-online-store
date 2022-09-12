import React, { Component } from 'react';
import PropTypes from 'prop-types';

const RATE1 = 1;
const RATE2 = 2;
const RATE3 = 3;
const RATE4 = 4;
const RATE5 = 5;

class EvaluationForm extends Component {
  render() {
    const {
      handleChange,
      handleCheckRate,
      handleClick,
      inputEmail,
      mensagem,
      nota,
    } = this.props;
    return (
      <div>
        <form>
          <input
            type="email"
            name="inputEmail"
            placeholder="Email"
            value={ inputEmail }
            data-testid="product-detail-email"
            onChange={ handleChange }
          />
          <div>
            <input
              type="checkbox"
              name="1-rating"
              id="1-rating"
              data-testid="1-rating"
              onChange={ handleCheckRate }
              checked={ RATE1 <= nota }
            />
            <input
              type="checkbox"
              name="2-rating"
              id="2-rating"
              data-testid="2-rating"
              onChange={ handleCheckRate }
              checked={ RATE2 <= nota }
            />
            <input
              type="checkbox"
              name="3-rating"
              id="3-rating"
              data-testid="3-rating"
              onChange={ handleCheckRate }
              checked={ RATE3 <= nota }
            />
            <input
              type="checkbox"
              name="4-rating"
              id="4-rating"
              data-testid="4-rating"
              onChange={ handleCheckRate }
              checked={ RATE4 <= nota }
            />
            <input
              type="checkbox"
              name="5-rating"
              id="5-rating"
              data-testid="5-rating"
              onChange={ handleCheckRate }
              checked={ RATE5 <= nota }
            />
          </div>
          <textarea
            name="mensagem"
            cols="30"
            rows="10"
            placeholder="Mensagem (Opcional)"
            value={ mensagem }
            data-testid="product-detail-evaluation"
            onChange={ handleChange }
          />
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ handleClick }
          >
            Avaliar
          </button>
        </form>
      </div>
    );
  }
}

EvaluationForm.propTypes = {
  handleChange: PropTypes.func,
  handleCheckRate: PropTypes.func,
  handleClick: PropTypes.func,
  inputEmail: PropTypes.string,
  mensagem: PropTypes.string,
  nota: PropTypes.number,
}.isRequired;

export default EvaluationForm;
