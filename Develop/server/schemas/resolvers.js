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
  //* check if user is logged in
  login: async (parent, { email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
      throw new AuthenticationError('Incorrect credentials');
    }

    const correctPw = await user.isCorrectPassword(password);

    if (!correctPw) {
      throw new AuthenticationError('Incorrect credentials');
    }

    const token = signToken(user);
    return { token, user };
  },
  //* Save books
  saveBook: async (parent, args, context) => {
    if (context.user) {
      const updatedUser = await User.findByIdAndUpdate(
        { _id: context.user._id },
        //* take the input type to replace "body" as the argument
        { $addToSet: { savedBooks: args.input } },
        { new: true, runValidators: true }
      );

      return updatedUser;
    }

    throw new AuthenticationError('You must be logged in');
  },
  //* Remove books
  removeBook: async (parent, args, context) => {
    if (context.user) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId: args.bookId } } },
        { new: true }
      );

      return updatedUser;
    }
    throw new AuthenticationError('You must be logged in');
  },
};
