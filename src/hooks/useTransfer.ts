import { provider } from 'web3-core'
import useSushi from './useSushi'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import ABI from '../utils/abi.json'
import { useWallet } from 'use-wallet'
import { masterChefAddress, univ2 } from '../constants/tokenAddresses'
import { transfer } from '../sushi/utils'

const getContract = (provider: provider, address: string) => {
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract((ABI as unknown) as AbiItem, address)
  return contract
}

const useTransfer = (pid: number) => {
  const contractAddress = masterChefAddress
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const contract = getContract(ethereum as provider, contractAddress)
  const sushi = useSushi()
  const handleStake = async (amount: string) => {
    const txHash = await transfer(pid,contract, amount, masterChefAddress, account)
    console.log(txHash)
  }

  return { onTransfer: handleStake }
}

export default useTransfer
