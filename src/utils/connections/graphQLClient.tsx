import config from './config'
import {
  ApolloClient,
  InMemoryCache,
  DefaultOptions,
} from '@apollo/client'

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
  uri: config.proxyGraphQLUrl,
  defaultOptions: defaultOptions,
})

export default GraphqlClient
