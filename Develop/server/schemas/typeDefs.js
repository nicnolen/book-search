"TODO: TYPE DEFINITIONS"
"Import the gql tagged template function"
const { gql } = require('apollo-server-express');

"Create typeDefs"
const typeDefs = gql`
  #! Queries
  type Query {
    me: User
  }
`;

"Export typeDefs"
module.exports = typeDefs;