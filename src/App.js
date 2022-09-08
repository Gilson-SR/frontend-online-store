import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Search from './Components/Search';
import './App.css';
import BuyCart from './Components/BuyCart';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={ () => <Search /> } />
          <Route exact path="/BuyCart" render={ () => <BuyCart /> } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
