import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'
import ABI from '../utils/abi.json'

import {
  getFarms,
  getUserInfo
} from '../sushi/utils'
import useSushi from './useSushi'
import useBlock from './useBlock'
import { masterChefAddress } from '../constants/tokenAddresses'

export interface StakedValue {
  tokenAmount: BigNumber
  wethAmount: BigNumber
  totalWethValue: BigNumber
  tokenPriceInWeth: BigNumber
  poolWeight: BigNumber
}

const useAllStakedBalance = () => {
  const [balances, setBalance] = useState([] as Array<any>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const { ethereum } = useWallet()
  const sushi = useSushi()
  const farms = getFarms(sushi)
  const block = useBlock()

  const fetchAllStakedValue = useCallback(async () => {
    const contractAddress = masterChefAddress
    const web3 = new Web3(ethereum as provider)
    const contract = new web3.eth.Contract(
      (ABI as unknown) as AbiItem,
      contractAddress,
    )
    const balances: Array<any> = await Promise.all(
      farms.map(
        ({
          pid,
          lpContract,
          tokenContract,
        }: {
          pid: number
          lpContract: Contract
          tokenContract: Contract
        }) => getUserInfo(pid, contract, account),
      ),
    )
    setBalance(balances)
  }, [account, sushi])

  useEffect(() => {
    if (account && sushi) {
      fetchAllStakedValue()
    }
  }, [account, block, setBalance, sushi])

  return balances
}

export default useAllStakedBalance
