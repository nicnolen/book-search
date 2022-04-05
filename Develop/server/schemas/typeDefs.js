"TODO: TYPE DEFINITIONS"
"Import the gql tagged template function"
const { gql } = require('apollo-server-express');

"Create typeDefs"
const typeDefs = gql`
  #! Queries
  type Query {
    me: User
  }

  #! Mutations
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: savedBook!): User 
    removeBook(bookId: ID!): User
  }

  #! Find user by id 
  type User {
    _id: ID!
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }
`;

"Export typeDefs"
module.exports = typeDefs;