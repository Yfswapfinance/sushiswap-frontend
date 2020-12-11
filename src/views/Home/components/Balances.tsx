import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'
import Spacer from '../../../components/Spacer'
import Value from '../../../components/Value'
import SushiIcon from '../../../components/SushiIcon'
import useAllEarnings from '../../../hooks/useAllEarnings'
import useAllStakedValue from '../../../hooks/useAllStakedValue'
import useFarms from '../../../hooks/useFarms'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useSushi from '../../../hooks/useSushi'
import { getSushiAddress, getSushiSupply } from '../../../sushi/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'
import { yfbtc } from '../../../constants/tokenAddresses'
import { black } from '../../../theme/colors'
import useAllStakedBalance from '../../../hooks/useAllStakedBalance'
import useAllPendingRewards from '../../../hooks/useAllPendingRewards'

const PendingRewards: React.FC = () => {
  const allEarnings = useAllEarnings()
  const { account } = useWallet()
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [scale, setScale] = useState(1)
  const pendingRewards = useAllPendingRewards()
  let sumEarning = 0
  for (let earning of pendingRewards) {
    sumEarning += new BigNumber(earning)
      .div(new BigNumber(10).pow(18))
      .toNumber()
  }

  // const [farms] = useFarms()
  // const allStakedValue = useAllStakedValue()

  // if (allStakedValue && allStakedValue.length) {
  //   const sumWeth = farms.reduce(
  //     (c, { id }, i) => c + (allStakedValue[i].totalWethValue.toNumber() || 0),
  //     0,
  //   )
  // }

  useEffect(() => {
    setStart(end)
    setEnd(sumEarning)
  }, [sumEarning])

  return (
    <span
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'right bottom',
        transition: 'transform 0.5s',
        display: 'inline-block',
      }}
    >
      <CountUp
        start={start}
        end={!!account ? end : start}
        decimals={end < 0 ? 4 : end > 1e5 ? 0 : 3}
        duration={2}
        onStart={() => {
          setScale(1.25)
          setTimeout(() => setScale(1), 600)
        }}
        separator=","
      />
    </span>
  )
}

const Balances: React.FC = () => {
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const sushi = useSushi()
  const sushiBalance = useTokenBalance(yfbtc)
  const { account, ethereum }: { account: any; ethereum: any } = useWallet()

  useEffect(() => {
    async function fetchTotalSupply() {
      // const supply = await getSushiSupply(sushi)
      setTotalSupply(new BigNumber(0))
    }
    if (sushi) {
      fetchTotalSupply()
    }
  }, [sushi, setTotalSupply])

  return (
    <StyledWrapper>
      <Card>
        <CardContent>
          <StyledBalances>
            <StyledBalance>
              <SushiIcon />
              <Spacer />
              <div style={{ flex: 1, color: '#5c5c5c' }}>
                <Label text="YFBTC" />
              </div>
              <Value
                value={!!account ? getBalanceNumber(sushiBalance) : 'Locked'}
              />
            </StyledBalance>
          </StyledBalances>
        </CardContent>
        <Footnote>
          Pending harvest
          <FootnoteValue>
            <PendingRewards /> YFBTC
          </FootnoteValue>
        </Footnote>
      </Card>
      <Spacer />

      <Card>
        <CardContent>
          <StyledBalances>
            <StyledBalance>
              <div style={{ color: '#5c5c5c' }}>
                <Label text="Total YFBTC Supply" />
              </div>
              {totalSupply ? (
                ''
              ) : (
                <>
                  <Spacer />
                  <Spacer />
                </>
              )}
              <Value
                value={totalSupply ? getBalanceNumber(totalSupply) : 'Locked'}
              />
            </StyledBalance>
          </StyledBalances>
        </CardContent>
        <Footnote>
          New rewards per block
          <FootnoteValue>1,000 YFBTC</FootnoteValue>
        </Footnote>
      </Card>
    </StyledWrapper>
  )
}

const Footnote = styled.div`
  font-size: 14px;
  padding: 8px 20px;
  color: ${(props) => props.theme.color.grey[1000]};
  border-top: solid 1px ${(props) => props.theme.color.grey[10]};
`
const FootnoteValue = styled.div`
  font-family: 'Roboto Mono', monospace;
  float: right;
`

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
`

const StyledBalances = styled.div`
  display: flex;
`

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  @media (max-width: 536px) {
    flex-direction: column;
  }
`

export default Balances
