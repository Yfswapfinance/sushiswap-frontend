import { useCallback } from 'react'
import { useWallet } from 'use-wallet'
import { claim, getSushiContract } from '../sushi/utils'
import useSushi from './useSushi'

const useClaim = () => {
  const { account } = useWallet()
  const sushi = useSushi()


  const handleClaim = useCallback(
    async () => {
      const txHash = await claim(
        getSushiContract(sushi),
        account,
      )
      console.log(txHash)
    },
    [account, sushi],
  )
  return { onClaim: handleClaim }
}

export default useClaim
