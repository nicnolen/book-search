"TODO: TYPE DEFINITIONS";
"Import the gql tagged template function";
const { gql } = require('apollo-server-express');

('Create typeDefs');
const typeDefs = gql`
  #! Find user by id
  type User {
    _id: ID!
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  #! Find book by id
  type Book {
    bookId: String!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  #! JWT
  type Auth {
    token: ID!
    user: User
  }

  #! Save books
  input savedBook {
    description: String
    title: String
    bookId: String
    image: String
    link: String
    authors: [String]
  }

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
`;

('Export typeDefs');
module.exports = typeDefs;
