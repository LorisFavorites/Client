import { gql } from '@apollo/client';

/**
 * TODO: return favorites from profile query
 * Profile ID comes from User Token.
 */
export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
    }
  }
`;

export const QUERY_INVENTORY = gql`
  query inventories {
    _id
    name
    cards {
      itemId
      stock
    }
  }
`

export const QUERY_FAVORITES = gql`
  query favorites {
    favorites {
      _id
      name
      imgUrl
      price
    }
  }
`;