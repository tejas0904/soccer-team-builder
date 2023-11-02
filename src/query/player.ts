import gql from "graphql-tag";

export const ALL_PLAYERS = gql`
  query {
    players {
      _id
      comments
      email
      name
      phone
      position
      IsAvailable
      skillLevels {
        agility
        attack
        ballControl
        defence
        speed
      }
    }
  }
`;

export const UPDATE_PLAYERS_AVAILABILITY = gql`
  mutation UpdatePlayersAvailability($playerIds: PlayerQueryInput, $playerUpdates: PlayerUpdateInput!) {
    updateManyPlayers(query: $playerIds, set: $playerUpdates) {
      matchedCount
      modifiedCount
    }
  }
`;

export const INSERT_PLAYER = gql`
  mutation InsertOnePlayer($playerInput: PlayerInsertInput!) {
    insertOnePlayer(data: $playerInput) {
      _id
    }
  }
`;
