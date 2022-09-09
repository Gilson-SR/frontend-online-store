import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Search from './Pages/Search';
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
