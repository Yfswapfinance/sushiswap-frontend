import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'
import { useWallet } from 'use-wallet'
import {
  getFarms,
} from '../sushi/utils'
import useSushi from './useSushi'
import { gql, useApolloClient } from '@apollo/client'

const GET_PRICE = gql`
 {
    bundle(id: "1") {
      ethPrice
    }
  }
`

const useEthPrice = () => {
  const [balances, setBalance] = useState([] as Array<any>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const farms = getFarms(sushi)
  const client = useApolloClient()

const getPair = async () => {
    let result = await client.query({
      query: GET_PRICE,
    })
    return result.data.bundle.ethPrice
  }

  const fetchAllPairValue = useCallback(async () => {
    const balances: Array<any> = await Promise.all(
      farms.map(
        () => getPair(),
      ),
    )
    setBalance(balances)
  }, [account, sushi])

  useEffect(() => {
    if (account && sushi) {
      fetchAllPairValue()
    }
  }, [account, setBalance, sushi])

  return balances
}

export default useEthPrice
