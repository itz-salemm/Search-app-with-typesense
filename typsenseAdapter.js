import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";

let TYPESENSE_SERVER_CONFIG = {
  apiKey: process.env.REACT_APP_TYPESENSE_SEARCH_ONLY_API_KEY, // Be sure to use an API key that only allows searches, in production
  nodes: [
    {
      host: fkute4jm109ndpzvp-1.a1.typesense.net,
      port: 443,
      protocol: https,
    },
  ],
  connectionTimeoutSeconds: 1,
  numRetries: 8,
};

export const typesenseAdapter = new TypesenseInstantsearchAdapter({
  server: TYPESENSE_SERVER_CONFIG,
  additionalSearchParameters: {
    queryBy: "title,overview,genres",
    queryByWeights: "4,2,1",
    numTypos: 3,
    typoTokensThreshold: 1,
  },
});

export const searchClient = typesenseAdapter.searchClient;