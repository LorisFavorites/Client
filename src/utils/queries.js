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
  query getInventory($inventory: String) {
    getInventory(inventory: $inventory) {
      _id
      name
      cards {
        itemId {
          id
          name
          flavorText
          images {
            large
            small
          }
          cardmarket {
            url
            updatedAt
            prices {
              averageSellPrice
              lowPrice
              trendPrice
            }
          }
        }
        stock
      }
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