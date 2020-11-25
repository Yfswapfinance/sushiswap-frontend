import React, { useState, useEffect } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import Web3 from 'web3'
import { provider } from 'web3-core'
import { AbiItem } from 'web3-utils'
import ABI from '../../../utils/abi.json'
import { masterChefAddress } from '../../../constants/tokenAddresses'
import styled from 'styled-components'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import useEarnings from '../../../hooks/useEarnings'
import useReward from '../../../hooks/useReward'
import { getBalanceNumber } from '../../../utils/formatBalance'
import { getPendingReward } from '../../../sushi/utils'
import btc from '../../../../src/assets/img/btc.svg'

interface HarvestProps {
  pid: number
}

const Harvest: React.FC<HarvestProps> = ({ pid }) => {
  const earnings = useEarnings(pid)
  const [pendingBalance, setPendingBalance] = useState(new BigNumber(0))
  const [pendingTx, setPendingTx] = useState(false)
  const [isHarvest, setHarvest] = useState(false)
  const { onReward } = useReward(pid)
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()

  const getContract = (provider: provider, address: string) => {
    const web3 = new Web3(provider)
    const contract = new web3.eth.Contract((ABI as unknown) as AbiItem, address)
    return contract
  }

  const onPendingReward = async () => {
    const contractAddress = masterChefAddress
    const contract = getContract(ethereum as provider, contractAddress)
    const txHash = await getPendingReward(contract, account)
    setPendingBalance(txHash)
  }

  useEffect(() => {
    onPendingReward()
  }, [])

  useEffect(() => {
    if(getBalanceNumber(pendingBalance) > 0){
      setHarvest(true)
    }
    else{
      setHarvest(false)
    }
  }, [pendingBalance])

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>
              <img src={btc} height="70" style={{}} />
            </CardIcon>
            <Value value={getBalanceNumber(pendingBalance)} />
            <Label text="YFBTC Earned" />
          </StyledCardHeader>
          <StyledCardActions>
            <Button
              // disabled={!earnings.toNumber() || pendingTx}
              disabled={!isHarvest}
              text={pendingTx ? 'Collecting YFBTC' : 'Harvest'}
              onClick={async () => {
                // setPendingTx(true)
                // await onReward()
                // setPendingTx(false)
              }}
            />
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  )
}

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`

// const StyledSpacer = styled.div`
//   height: ${(props) => props.theme.spacing[4]}px;
//   width: ${(props) => props.theme.spacing[4]}px;
// `

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

export default Harvest
