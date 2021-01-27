import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import useModal from '../../../hooks/useModal'
import Button from '../../Button'
import WalletProviderModal from '../../WalletProviderModal'
import AccountModal from './AccountModal'

interface AccountButtonProps {}

const AccountButton: React.FC<AccountButtonProps> = (props) => {
  const [onPresentAccountModal] = useModal(<AccountModal />)
  const [onPresentWalletProviderModal] = useModal(
    <WalletProviderModal />,
    'provider',
  )

  const { account } = useWallet()

  const handleUnlockClick = useCallback(() => {
    onPresentWalletProviderModal()
  }, [onPresentWalletProviderModal])

  return (
    <StyledAccountButton>
      {!account ? (
        <Button onClick={handleUnlockClick} size="cs" variant='normal' text="Connect Your Wallet" />
      ) : (
        <Button onClick={onPresentAccountModal} size="cs" variant='normal' text="My Wallet" />
      )}
    </StyledAccountButton>
  )
}

const StyledAccountButton = styled.div`
@media (max-width: 768px) {
 border:2px solid red
 display:flex;
 justify-content:center;
}
`

export default AccountButton
