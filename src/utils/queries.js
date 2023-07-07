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
