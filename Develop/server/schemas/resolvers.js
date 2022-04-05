//TODO: RESOLVERS
//! Import dependencies
const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

//! Create resolver object
const resolvers = {
  //! Query resolvers
  Query: {
    //* Find logged in user
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({})
          .select('-_v -password')
          .populate('books');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
  },

  //! Mutation resolvers
  Mutation: {
    //* add a new user
    addUser: async (parent, args) => {
      try {
        const user = await User.create(args);
        const token = signToken(user);

        return { token, user };
      } catch (err) {
        console.error(err);
      }
    },
  },
};
