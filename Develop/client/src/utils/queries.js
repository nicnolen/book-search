"TODO: QUERIES FOR APOLLO CLIENT"
"Import dependencies"
import { gql } from "@apollo/client"

export const GET_ME = gql`
  #! Conditionally render data specific to logged in users profile page
  {
    me {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image 
        description
        title
        link
      }
    }
  }
`;