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

//! Start the Apollo server
const startServer = async (typeDefs, resolvers) => {
  //* create a new Apollo server and pass in our schema data
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // context: authMiddleware, // inside utils/auth.js
  });

  //* start the Apollo server
  await server.start();

  //* integrate our Apollo server with the Express application as middleware
  server.applyMiddleware({ app });

  //* log where to go to test GQL API
  console.info(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);

  //! Import Mongoose connections the first time the connection is opened
  db.once('open', () => {
    //* Start the server on successful connection
    app.listen(PORT, () =>
      console.info(`🌍 Now listening on localhost:${PORT}`)
    );
  });
};

//! Set URL encoded data
app.use(express.urlencoded({ extended: true })); //? If true, data is parsed with qs library which allows nested objects from query string. If false, data is parsed with querystring library which does not support nested objects from query strings
//! Every request goes through this middleware and gets converted to JSON
app.use(express.json());

//! If we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

//! Catch-all route where any route that isnt defined is treated as a 404 error
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client'));
});

// Initialize the Apollo server
startServer(typeDefs, resolvers);
