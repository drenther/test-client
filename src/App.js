import React, { Component, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/Header';
import AuthProvider from './components/AuthProvider';

import { Home, Signup, Login, Private } from './pages';

class App extends Component {
  render() {
    return (
      <div className="app">
        <AuthProvider>
          {({ loggedIn, name }, { handleAuthState, manageAuth, logout }) => {
            return (
              <Fragment>
                <Header loggedIn={loggedIn} name={name} logout={logout} />
                <main>
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route
                      path="/signup"
                      render={props => (loggedIn ? <Redirect to="/" /> : <Signup {...props} manageAuth={manageAuth} />)}
                    />
                    <Route
                      path="/login"
                      render={props => (loggedIn ? <Redirect to="/" /> : <Login {...props} manageAuth={manageAuth} />)}
                    />
                    <Route
                      path="/private"
                      render={props =>
                        loggedIn ? <Private {...props} handleAuthState={handleAuthState} /> : <Redirect to="/login" />
                      }
                    />
                    <Route component={Home} />
                  </Switch>
                </main>
              </Fragment>
            );
          }}
        </AuthProvider>
      </div>
    );
  }
}

export default App;
