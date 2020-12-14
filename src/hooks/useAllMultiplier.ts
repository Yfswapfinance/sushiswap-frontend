import { useEffect, useState } from 'react'
import { provider } from 'web3-core'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'
import ABI from '../utils/abi.json'
import {
  getFarms,
  getMultiplier
} from '../sushi/utils'
import useSushi from './useSushi'
import useBlock from './useBlock'
import { masterChefAddress } from '../constants/tokenAddresses'

const useAllMultiplier = () => {
  const [multipliers, SetMultipliers] = useState([] as Array<any>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const { ethereum } = useWallet()
  const sushi = useSushi()
  const farms = getFarms(sushi)
  const block = useBlock()

  useEffect(() => {

    const fetchAllValues = async () => {
        const contractAddress = masterChefAddress
        const web3 = new Web3(ethereum as provider)
        const contract = new web3.eth.Contract(
          (ABI as unknown) as AbiItem,
          contractAddress,
        )
        const multipliers: Array<any> = await Promise.all(
          farms.map(
            ({
              pid,
            }: {
              pid: number
              lpContract: Contract
              tokenContract: Contract
            }) => getMultiplier(contract,pid,block),
          ),
        )
        SetMultipliers(multipliers)
      }

    if (account && sushi) {
      fetchAllValues()
    }
  }, [account, block, SetMultipliers, sushi])

  return multipliers
}

export default useAllMultiplier
