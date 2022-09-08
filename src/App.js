import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Search from './Components/Search';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={ () => <Search /> } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
