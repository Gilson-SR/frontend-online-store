import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { saveProductCart } from '../services/localStorage';
import EvaluationForm from './EvaluationForm';
import { getSavedComents, saveComent } from '../services/storageEvaluation';

class ProductDetails extends React.Component {
  state = {
    atributos: [],
    infoImage: '',
    infoPrice: 0,
    infoName: '',
    inputEmail: '',
    mensagem: '',
    nota: 0,
    error: false,
    coments: [],
  };

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    const results = await getProductById(id);
    this.getComents();
    this.setState({
      atributos: results.attributes,
      infoImage: results.thumbnail,
      infoPrice: results.price,
      infoName: results.title,
      allInfo: results,
    });
  }

  getComents = () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    const coments = getSavedComents(id) || [];

    this.setState({ coments });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleCheckRate = ({ target }) => {
    const { id } = target;
    const value = Number(id.split('')[0]);
    this.setState({ nota: value });
  };

  handleClick = () => {
    const { inputEmail, nota, mensagem } = this.state;
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const verifyEmail = inputEmail.endsWith('.com') && inputEmail.split('')[0] !== '@';
    const coment = { email: inputEmail, text: mensagem, rating: nota };
    if (verifyEmail && nota > 0) {
      saveComent(coment, id);
      this.getComents();
      this.setState({
        error: false,
        inputEmail: '',
        mensagem: '',
        nota: 0,
      });
    } else {
      this.setState({
        error: true,
      });
    }
  };

  render() {
    const { state, handleChange, handleCheckRate, handleClick } = this;
    const {
      atributos,
      infoImage,
      infoName,
      infoPrice,
      allInfo,
      inputEmail,
      mensagem,
      nota,
      error,
      coments,
    } = state;
    return (
      <div>
        <Link to="/BuyCart" data-testid="shopping-cart-button">
          Carrinho
        </Link>
        <img
          data-testid="product-detail-image"
          src={ infoImage }
          alt={ infoName }
        />
        <h2 data-testid="product-detail-name">{infoName}</h2>
        <h4>
          <span>Preço:</span>
          <span data-testid="product-detail-price">{infoPrice}</span>
        </h4>
        <ul>
          {atributos.map((product) => (
            <li key={ product.id }>{`${product.name}: ${product.value_name}`}</li>
          ))}
        </ul>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => saveProductCart(allInfo) }
        >
          Adicionar ao Carinho
        </button>
        <div>
          <EvaluationForm
            handleChange={ handleChange }
            handleCheckRate={ handleCheckRate }
            handleClick={ handleClick }
            inputEmail={ inputEmail }
            mensagem={ mensagem }
            nota={ nota }
          />
          {error && <p data-testid="error-msg">Campos inválidos</p>}
        </div>
        <div>
          {coments.map(({ email, text, rating }, index) => (
            <div key={ index }>
              <p data-testid="review-card-email">{email}</p>
              <p data-testid="review-card-rating">{rating}</p>
              <p data-testid="review-card-evaluation">{text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default ProductDetails;
