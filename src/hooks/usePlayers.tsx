// import React, { useEffect, useState } from "react";
// import { gql, useApolloClient } from "@apollo/client";
// import { useWatch } from "./useWatch";
// import { useCollection } from "./useCollection";
// import atlasConfig from "../atlasConfig.json";
// import { Player } from "../models/Player";
// import { addValueAtIndex, getPlayersIndex, removeValueAtIndex, replaceValueAtIndex, updateValueAtIndex } from "../utils/utils";

// const { dataSourceName } = atlasConfig;

// export default function usePlayers() {
//   // Get a graphql client and set up a list of players in state
//   const graphql = useApolloClient();
//   const [players, setPlayers] = useState<Player[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Fetch all players on load and whenever our graphql client changes (i.e. either the current user OR App ID changes)
//   useEffect(() => {
//     const query = gql`
//       query FetchAllPlayers {
//         players {
//           _id
//           isAvailable
//           name
//           email
//           phone
//           position
//           skillLevels
//         }
//       }
//     `;
//     graphql
//       .query({ query })
//       .then(({ data }) => {
//         setPlayers(data.players);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError(error);
//       });
//   }, [graphql]);

//   // Use a MongoDB change stream to reactively update state when operations succeed
//   // const playerCollection = useCollection({
//   //   cluster: dataSourceName,
//   //   db: "soccer",
//   //   collection: "Player",
//   // });
//   // useWatch(playerCollection, {
//   //   onInsert: (change: any) => {
//   //     setPlayers((oldPlayers) => {
//   //       if (loading) {
//   //         return oldPlayers;
//   //       }
//   //       const idx = getPlayersIndex(oldPlayers, change.fullDocument) ?? oldPlayers.length;
//   //       if (idx === oldPlayers.length) {
//   //         return addValueAtIndex(oldPlayers, idx, change.fullDocument);
//   //       } else {
//   //         return oldPlayers;
//   //       }
//   //     });
//   //   },
//   //   onUpdate: (change: any) => {
//   //     setPlayers((oldPlayers) => {
//   //       if (loading) {
//   //         return oldPlayers;
//   //       }
//   //       const idx = getPlayersIndex(oldPlayers, change.fullDocument);
//   //       return updateValueAtIndex(oldPlayers, idx, () => {
//   //         return change.fullDocument;
//   //       });
//   //     });
//   //   },
//   //   onReplace: (change: any) => {
//   //     setPlayers((oldPlayers) => {
//   //       if (loading) {
//   //         return oldPlayers;
//   //       }
//   //       const idx = getPlayersIndex(oldPlayers, change.fullDocument);
//   //       return replaceValueAtIndex(oldPlayers, idx, change.fullDocument);
//   //     });
//   //   },
//   //   onDelete: (change: any) => {
//   //     setPlayers((oldPlayers) => {
//   //       if (loading) {
//   //         return oldPlayers;
//   //       }
//   //       const idx = getPlayersIndex(oldPlayers, change.fullDocument);
//   //       if (idx && idx >= 0) {
//   //         return removeValueAtIndex(oldPlayers, idx);
//   //       } else {
//   //         return oldPlayers;
//   //       }
//   //     });
//   //   },
//   // });

//   // Given a draft player, format it and then insert it with a mutation
//   const savePlayer = async (draftPlayer: Player) => {
//     try {
//       await graphql.mutate({
//         mutation: gql`
//           mutation SaveItem($player: ItemInsertInput!) {
//             insertOneItem(data: $player) {
//               _id
//               isAvailable
//               name
//               email
//               phone
//               position
//               skillLevels
//             }
//           }
//         `,
//         variables: { player: draftPlayer },
//       });
//     } catch (err: any) {
//       setError(err);
//     }
//   };

//   // Toggle availability status of a player
//   const togglePlayers = async (player: Player) => {
//     try {
//       await graphql.mutate({
//         mutation: gql`
//         mutation TogglePlayerComplete($playerId: ObjectId!) {
//           updateOneItem(query: { _id: $playerId }, set: { isAvailable: ${!player.isAvailable} }) {
//             _id
//             name
//             email
//             phone
//             position
//             skillLevels
//           }
//         }
//       `,
//         variables: { playerId: player.id },
//       });
//     } catch (err: any) {
//       setError(err);
//     }
//   };

//   // Delete a given player
//   const deletePlayers = async (player: Player) => {
//     try {
//       await graphql.mutate({
//         mutation: gql`
//           mutation DeletePlayer($playerId: ObjectId!) {
//             deleteOneItem(query: { _id: $playerId }) {
//               _id
//             }
//           }
//         `,
//         variables: { playerId: player.id },
//       });
//     } catch (err: any) {
//       setError(err);
//     }
//   };

//   return {
//     loading,
//     players,
//     error,
//     savePlayer,
//     togglePlayers,
//     deletePlayers,
//   };
// }
