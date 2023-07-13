import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
        favorites {
          _id
        }
      }
    }
  }
`;

export const ADD_FAVORITE = gql`
  mutation addFavorite($favorite: ID!) {
    addFavorite(favorite: $favorite) {
      favorites {
        name
      }
    }
  }
`;

export const REMOVE_FAVORITE = gql`
  mutation removeFavorite($favorite: ID!) {
    removeFavorite(favorite: $favorite) { 
      favorites {
        name
      }
    }
  }
`;