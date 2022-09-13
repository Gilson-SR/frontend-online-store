import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Search from './Pages/Search';
import BuyCart from './Pages/BuyCart';
import ProductDetails from './Pages/ProductDetails';
import Checkout from './Pages/Checkout';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={ () => <Search /> } />
          <Route exact path="/BuyCart" render={ () => <BuyCart /> } />
          <Route
            exact
            path="/:id"
            render={ (props) => <ProductDetails { ...props } /> }
          />
          <Route exact path="/BuyCart/Checkout" render={ () => <Checkout /> } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
