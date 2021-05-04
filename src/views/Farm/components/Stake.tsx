import BigNumber from 'bignumber.js'
import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { Contract } from 'web3-eth-contract'
import { provider } from 'web3-core'
import Web3 from 'web3'
import ABI from '../../../utils/abi.json'
import { AbiItem } from 'web3-utils'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import IconButton from '../../../components/IconButton'
import { AddIcon } from '../../../components/icons'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import CustomLoader from '../../../components/Loader'
import useAllowance from '../../../hooks/useAllowance'
// import useApprove from '../../../hooks/useApprove'
import useModal from '../../../hooks/useModal'
import useStake from '../../../hooks/useStake'
import useStakedBalance from '../../../hooks/useStakedBalance'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useUnstake from '../../../hooks/useUnstake'
import { getBalanceNumber } from '../../../utils/formatBalance'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import { masterChefAddress } from '../../../constants/tokenAddresses'
import AmountModal from './AmountModal'
import formar from '../../../../src/assets/img/formar.png'
import { useWallet } from 'use-wallet'
import { getBalance, getContract } from '../../../utils/erc20'
import useTransfer from '../../../hooks/useTransfer'
import { approve, transfer, Allowance, getUserInfo } from '../../../sushi/utils'

interface StakeProps {
  lpContract: Contract
  pid: number
  tokenName: string
  tokenAddresses: string
  isFetchAllData: Boolean
  setFetchData: Function
}

const Stake: React.FC<StakeProps> = ({
  lpContract,
  pid,
  tokenName,
  tokenAddresses,
  setFetchData,
  isFetchAllData,
}) => {
  const [requestedApproval, setRequestedApproval] = useState(true)
  const [staked_balance, setStackedBalance] = useState(new BigNumber(0))
  const [isFetchBalance, setFetchBalance] = useState(false)
  const [isAddAmount, setAddAmount] = useState(false)
  const [maxAmount, setMaxAmount] = useState(new BigNumber(0))
  const allowance = useAllowance(lpContract)
  // const { onApprove } = useApprove(lpContract)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const { ethereum } = useWallet()

  const tokenBalance = useTokenBalance(lpContract.options.address)
  const stakedBalance = useStakedBalance(pid)

  const { onStake } = useStake(pid)
  const { onUnstake } = useUnstake(pid)
  const { onTransfer } = useTransfer(pid)

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={onStake}
      tokenName={tokenName}
    />,
  )

  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={onUnstake}
      tokenName={tokenName}
    />,
  )

  const [onPresentAmountModal] = useModal(
    <AmountModal
      tokenName={tokenName}
      maxValue={maxAmount}
      onConfirm={onTransfer}
      isFetchBalance={isFetchBalance}
      setFetchBalance={setFetchBalance}
    />,
  )

  const handleApprove = useCallback(async () => {
    try {
      const contractAddress = tokenAddresses
      const contract = getContract(ethereum as provider, contractAddress)
      const tx = await approve(contract, masterChefAddress, account)
      if (tx.status) {
        setAddAmount(false)
        setRequestedApproval(true)
      }
    } catch (e) {
      // user rejected tx or didn't go thru
      setRequestedApproval(false)
      console.log(e)
    }
  }, [setRequestedApproval])

  useEffect(() => {
    const fetchBalance = async () => {
      const contractAddress = masterChefAddress
      const web3 = new Web3(ethereum as provider)
      const contract = new web3.eth.Contract(
        (ABI as unknown) as AbiItem,
        contractAddress,
      )
      const txHash = await getUserInfo(pid, contract, account)
      console.log('staked balance txHash form ', txHash)
      setStackedBalance(txHash)
    }
    const fetchAllowance = async () => {
      const contractAddress = tokenAddresses
      console.log('contractAddress ', contractAddress)
      const contract = getContract(ethereum as provider, contractAddress)
      const tx = await Allowance(contract, masterChefAddress, account)
      console.log('tx', tx)
      if (tx > 0) {
        setRequestedApproval(true)
      } else {
        setAddAmount(true)
        setRequestedApproval(false)
      }
    }
    const fetchMaxAmount = async () => {
      const contractAddress = tokenAddresses
      const balance = await getBalance(
        ethereum as provider,
        contractAddress,
        account,
      )
      setMaxAmount(new BigNumber(balance))
    }

    fetchBalance()
    fetchAllowance()
    fetchMaxAmount()
  }, [])

  useEffect(() => {
    // Update Balance & Amount after Deposit
    const fetchBalance = async () => {
      const contractAddress = masterChefAddress
      const web3 = new Web3(ethereum as provider)
      const contract = new web3.eth.Contract(
        (ABI as unknown) as AbiItem,
        contractAddress,
      )
      const txHash = await getUserInfo(pid, contract, account)
      setStackedBalance(txHash)
    }
    const fetchMaxAmount = async () => {
      const contractAddress = tokenAddresses
      console.log('balance token address ', contractAddress)
      const balance = await getBalance(
        ethereum as provider,
        contractAddress,
        account,
      )
      setMaxAmount(new BigNumber(balance))
    }
    fetchBalance()
    fetchMaxAmount()
    // To update data in Harvest Card
    setFetchData(!isFetchAllData)
  }, [isFetchBalance])

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>
              <img src={formar} height="70" style={{}} />
            </CardIcon>
            <Value value={getBalanceNumber(staked_balance)} />
            <Label text={`${tokenName} Tokens Staked`} />
          </StyledCardHeader>
          <StyledCardActions>
            {!allowance.toNumber() ? (
              <>
                <Button
                  variant="normal"
                  disabled={requestedApproval}
                  onClick={handleApprove}
                  text={`Approve ${tokenName}`}
                />
                <StyledAddButtonContainer>
                  <Button
                    variant="normal"
                    disabled={isAddAmount}
                    onClick={onPresentAmountModal}
                    text={`+`}
                  />
                </StyledAddButtonContainer>
              </>
            ) : (
              <>
                <Button
                  disabled={stakedBalance.eq(new BigNumber(0))}
                  text="Unstake"
                  onClick={onPresentWithdraw}
                />
                <StyledActionSpacer />
                <IconButton onClick={onPresentDeposit}>
                  <AddIcon />
                </IconButton>
              </>
            )}
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
      {/* <CustomLoader text="Cooking the rice ..." /> */}
    </Card>
  )
}

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const StyledLoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

const StyledCardActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`
const StyledAddButtonContainer = styled.div`
  margin-left: 10px;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default Stake
