import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  ApolloProvider, //? Provides data to all other componments
  ApolloClient, //? Initialize connection to GraphQL API server
  InMemoryCache, //? Enables Apollo Client instances to cache API response data
  createHttpLink, //? Control how Apollo Client makes a request
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

//! Establish new link to the GraphQL server at its /graphql api endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

//! Creates a middleware that attaches a JWT token as an `authorization` header to every authorized request to the server 
const authLink = setContext((_, { headers }) => {
  //* retrieves the token from local storage if it exists
  const token = localStorage.getItem('id_token');
  //* Returns the headers to the context so that httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

//! Create connection to GraphQL API endpoint
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={SearchBooks} />
            <Route exact path="/saved" component={SavedBooks} />
            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
