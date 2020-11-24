import { provider } from 'web3-core'
import useSushi from './useSushi'
import { useWallet } from 'use-wallet'
import { masterChefAddress, univ2 } from '../constants/tokenAddresses'
import { getContract } from '../utils/erc20'
import { transfer } from '../sushi/utils'

const useTransfer = (pid: number) => {
  const contractAddress = univ2
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const contract = getContract(ethereum as provider, contractAddress)
  const sushi = useSushi()
  const handleStake = async (amount: string) => {
    const txHash = await transfer(contract, amount, masterChefAddress, account)
    console.log(txHash)
  }

  return { onTransfer: handleStake }
}

export default useTransfer
