import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'
import { useWallet } from 'use-wallet'
import {
  getFarms,
} from '../sushi/utils'
import useSushi from './useSushi'
import { gql, useApolloClient } from '@apollo/client'

const GET_PAIR = gql`
query pair($id: String!) {
  pair(id: $id) {
    token0 {
      id
      symbol
      name
      derivedETH
    }
    token1 {
      id
      symbol
      name
      derivedETH
    }
    reserve0
    reserve1
    reserveUSD
    trackedReserveETH
    token0Price
    token1Price
    volumeUSD
    txCount
  }
}
`

const useAllPair = () => {
  const [balances, setBalance] = useState([] as Array<any>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const farms = getFarms(sushi)
  const client = useApolloClient()

const getPair = async (address: any) => {
    let result = await client.query({
      query: GET_PAIR,
      variables: { id: address },
    })
    return result.data.pair
  }

  const fetchAllPairValue = useCallback(async () => {
    const balances: Array<any> = await Promise.all(
      farms.map(
        ({
          liveAddress
        }: {
          liveAddress: String
        }) => getPair(liveAddress),
      ),
    )
    console.log('balances ', balances)
    setBalance(balances)
  }, [account, sushi])

  useEffect(() => {
    if (account && sushi) {
      fetchAllPairValue()
    }
  }, [account, setBalance, sushi])

  return balances
}

export default useAllPair
