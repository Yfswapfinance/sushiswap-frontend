import { useCallback } from 'react'

import useSushi from './useSushi'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'
import { getContract, getBalance } from '../utils/erc20'

import { approve, getMasterChefContract } from '../sushi/utils'

const useApprove = (lpContract: Contract) => {
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const masterChefContract = getMasterChefContract(sushi)

  const contractAddress = "0xe97dece9f7c817fa09594abf14b040caf8c7f3db";
  const { ethereum } = useWallet()
  const contract = getContract(ethereum as provider,contractAddress);
  const balance =  getBalance(ethereum as provider, contractAddress, account)
  const fetchBalance = async () => {
    const balance = await  getBalance(ethereum as provider, contractAddress, account)
    console.log('balance')
    console.log(balance)
  }
  fetchBalance();

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, masterChefContract])

  return { onApprove: handleApprove }
}

export default useApprove
