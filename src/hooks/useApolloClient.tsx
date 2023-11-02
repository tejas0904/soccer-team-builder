import React from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import atlasConfig from "../atlasConfig.json";
import { useApp } from "../context/realm-app";

const { clientApiBaseUrl } = atlasConfig;

export default function useApolloClient() {
  const { realmApp } = useApp();

  const client = React.useMemo(() => {
    const graphqlUri = `${clientApiBaseUrl}/api/client/v2.0/app/${realmApp.id}/graphql`;
    // Local apps should use a local URI!
    // const graphqlUri = `https://us-east-1.aws.stitch.mongodb.com/api/client/v2.0/app/${realmApp.id}/graphql`;

    async function getValidAccessToken() {
      // An already logged in user's access token might be expired. We decode the token and check its
      // expiration to find out whether or not their current access token is stale.
      if (realmApp.currentUser && realmApp.currentUser.accessToken) {
        // const { exp } = jwt_decode(realmApp.currentUser.accessToken);
        // const isExpired = Date.now() >= exp * 1000;
        // if (isExpired) {
        // To manually refresh the user's expired access token, we refresh their custom data
        await realmApp.currentUser?.refreshCustomData();
        // }
        // The user's access token is now guaranteed to be valid (unless their account is disabled or deleted)
        return realmApp.currentUser?.accessToken;
      }
    }

    return new ApolloClient({
      link: new HttpLink({
        uri: graphqlUri,
        fetch: async (uri: string, options: RequestInit) => {
          const accessToken = await getValidAccessToken();
          options.headers = {
            ...options.headers,
            Authorization: `Bearer ${accessToken}`,
          };
          return fetch(uri, options);
        },
      }),
      cache: new InMemoryCache(),
    });
  }, [realmApp.currentUser]);

  return client;
}