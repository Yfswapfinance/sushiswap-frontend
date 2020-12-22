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
  const [ethPrice, setEthPrice] = useState([] as Array<any>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const farms = getFarms(sushi)
  const client = useApolloClient()

const getPrice = async () => {
    let result = await client.query({
      query: GET_PRICE,
    })
    return result.data.bundle.ethPrice
  }

  const fetchAllPairValue = useCallback(async () => {
    const rate: Array<any> = await Promise.all(
      farms.map(
        () => getPrice(),
      ),
    )
    setEthPrice(rate)
  }, [account, sushi])

  useEffect(() => {
    if (account && sushi) {
      fetchAllPairValue()
    }
  }, [account, setEthPrice, sushi])

  return ethPrice
}

export default useEthPrice
