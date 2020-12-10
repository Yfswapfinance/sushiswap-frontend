import config from "./config";
import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, split, DefaultOptions } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { onError } from "@apollo/client/link/error";
import { showNotification } from "./notificationService";

const wsLink = new WebSocketLink({
  uri: config.proxyWSGraphQLUrl,
  options: {
    reconnect: true
  }
});
const httpLink = new HttpLink({ uri: config.proxyGraphQLUrl });

const authLink = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('token') || null,
    }
  });

  return forward(operation);
})
const middlewareLink = authLink.concat(httpLink);
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  middlewareLink,
);

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

const GraphqlClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ extensions, message, locations, path }, index) => {
          if (extensions) {
            showNotification(`[Graphql error]: ${message}`, 'error');
          }
        });
      } else if (networkError) {
        showNotification(`[Network error]: ${networkError}`, 'error');
      }
    }),
    splitLink,
  ]),
  defaultOptions: defaultOptions
});

export default GraphqlClient;
