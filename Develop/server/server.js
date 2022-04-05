//TODO: MAIN SERVER
//! Import Dependencies
const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express'); // Import ApolloServer

const { typeDefs, resolvers } = require('./schemas'); 
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

//! Start a new Apollo server
const startServer = async () => {
  //* create a new Apollo server and pass in our schema data
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  //* start the Apollo server
  await server.start();

  //* integrate our Apollo server with the Express application as middleware
  server.applyMiddleware({ app });

  //* log where we can go to test our GQL API
  console.info(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

//! Initialize the Apollo server
startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
