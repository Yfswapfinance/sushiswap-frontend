import { useCallback } from 'react'
import Web3 from 'web3'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils'
import useSushi from './useSushi'
import { useWallet } from 'use-wallet'
import { masterChefAddress, univ2 } from '../constants/tokenAddresses'
import { getUserInfo } from '../sushi/utils'
import ABI from '../utils/abi.json'
import BigNumber from 'bignumber.js'

const getContract = (provider: provider, address: string) => {
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract((ABI as unknown) as AbiItem, address)
  return contract
}

const useUserInfo = (pid: number) => {
  const contractAddress = masterChefAddress
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const contract = getContract(ethereum as provider, contractAddress)
  const handleStake = async () => {
    console.log('inside')
    const txHash = await getUserInfo(contract, account)
    console.log(txHash)
  }

  return { onUserInfo: handleStake }
}

export default useUserInfo
