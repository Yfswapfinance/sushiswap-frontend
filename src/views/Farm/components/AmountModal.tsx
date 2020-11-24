import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import Web3 from 'web3'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils'
import ABI from '../../../utils/abi.json'
import { masterChefAddress, univ2 } from '../../../constants/tokenAddresses'
import React, { useCallback, useMemo, useState, useEffect } from 'react'
import Button from '../../../components/Button'
import Modal, { ModalProps } from '../../../components/Modal'
import ModalActions from '../../../components/ModalActions'
import ModalTitle from '../../../components/ModalTitle'
import TokenInput from '../../../components/TokenInput'
import { getFullDisplayBalance } from '../../../utils/formatBalance'
import { getUserInfo } from '../../../sushi/utils'

interface AmountModalProps extends ModalProps {
  tokenName?: string
  maxValue?: BigNumber
  setStakedBalance: Function
  onConfirm: (amount: string) => void
}

const getContract = (provider: provider, address: string) => {
    const web3 = new Web3(provider)
    const contract = new web3.eth.Contract((ABI as unknown) as AbiItem, address)
    return contract
  }

const AmountModal: React.FC<AmountModalProps> = ({
  onConfirm,
  onDismiss,
  setStakedBalance,
  tokenName = '',
  maxValue,
}) => {
  const [val, setVal] = useState('')
  const [isConfirm, setConfirm] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(maxValue)
  }, [maxValue])

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )

  const afterConfirm = async () =>{
    const contractAddress = masterChefAddress
    const contract = getContract(ethereum as provider, contractAddress)
    const txHash = await getUserInfo(contract, account)
    setStakedBalance(txHash)
  }

  useEffect(() => {
    if (val > fullBalance) {
      setConfirm(true)
    } else {
      setConfirm(false)
    }
  }, [val])

  return (
    <Modal>
      <ModalTitle text={`Deposit ${tokenName} Tokens`} />
      <TokenInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
      />
      <ModalActions>
        <Button text="Cancel" variant="secondary" onClick={onDismiss} />
        <Button
          disabled={isConfirm}
          text={pendingTx ? 'Pending Confirmation' : 'Confirm'}
          onClick={async () => {
            setPendingTx(true)
            await onConfirm(val)
            await afterConfirm()
            setPendingTx(false)
            onDismiss()
          }}
        />
      </ModalActions>
    </Modal>
  )
}

export default AmountModal
