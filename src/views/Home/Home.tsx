import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { provider } from 'web3-core'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import { useWallet } from 'use-wallet'
import formar from '../../assets/img/formar.png'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'
import rocketImg from '../../assets/img/rocket.png'
import changeImg from '../../assets/img/change.svg'
import sweetImg from '../../assets/img/sweet.svg'
import StickyBar from '../../components/TopBar/stickyNote'
import useFarms from '../../hooks/useFarms'
import { Farm } from '../../contexts/Farms'
import useAllStakedValue, { StakedValue } from '../../hooks/useAllStakedValue'
import { getUserInfo } from '../../sushi/utils'
import ABI from '../../utils/abi.json'
import './home.css'
import { getBalanceNumber } from '../../utils/formatBalance'
import { resolve } from 'path'
import { masterChefAddress } from '../../constants/tokenAddresses'

interface FarmWithStakedValue extends Farm, StakedValue {
  apy: BigNumber,
  stakedBalance: any
}

const Home: React.FC = () => {
  const [farms] = useFarms()
  const stakedValue = useAllStakedValue()
  const [resolved, setIsResolved] = useState(false)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const { ethereum } = useWallet()

  const sushiIndex = farms.findIndex(
    ({ tokenSymbol }) => tokenSymbol === 'SUSHI',
  )

  // useEffect(() => {
  //   f();
  // }, []);

  const BLOCKS_PER_YEAR = new BigNumber(2336000)
  const SUSHI_PER_BLOCK = new BigNumber(1000)

  const sushiPrice =
    sushiIndex >= 0 && stakedValue[sushiIndex]
      ? stakedValue[sushiIndex].tokenPriceInWeth
      : new BigNumber(0)

  const fetchBalance = async (pid: number, tokenAddress: string) => {
    const contractAddress = masterChefAddress
    const web3 = new Web3(ethereum as provider)
    const contract = new web3.eth.Contract(
      (ABI as unknown) as AbiItem,
      contractAddress,
    )
    const balance = await getUserInfo(pid, contract, account)

    return getBalanceNumber(balance)
  }

  // async function s (farms: any) {
  //   let s = 0;
  //   for (const farm of farms) {
  //     s = await fetchBalance(farm.pid, farm.tokenAddresses);
  //     console.log(s)
  //   }
  //   console.log(s)
  // }

    const rows = farms.reduce<any> (
       (farmRows, farm, i) => {
         console.log('farmRows', farmRows)
         if(farmRows == undefined) return []
        fetchBalance(farm.pid, farm.tokenAddresses).then(balance=>{
          // s(farms);
        const farmWithStakedValue = {
          ...farm,
          ...stakedValue[i],
          apy: stakedValue[i]
            ? sushiPrice
                .times(SUSHI_PER_BLOCK)
                .times(BLOCKS_PER_YEAR)
                .times(stakedValue[i].poolWeight)
                .div(stakedValue[i].totalWethValue)
            : null,
          stakedBalance: balance,
        }
        const newFarmRows = [...farmRows]
        if (newFarmRows[newFarmRows.length - 1].length === 3) {
          newFarmRows.push([farmWithStakedValue])
        } else {
          newFarmRows[newFarmRows.length - 1].push(farmWithStakedValue)
        }
        // console.log('newFarmRows')
        console.log(newFarmRows)
        return newFarmRows
        })
      },
      [[]],
    )

  console.log(rows)
  console.log('rowsss')
  // console.log(rows.length > 0 && rows[0])
  const data: any = [
    {
      name: 'BITTO/ETH Stats',
      logo: rocketImg,
      class: 'img-size',
      hourlyROI: 0.1,
      dailyROI: 2.4,
      weeklyROI: 16.8,
      hourlyEstimate: 0.005,
      hourlyEstimateYFBTC: 2,
      dailyEstimate: 0.12,
      dailyEstimateYFBTC: 48,
      weeklyEstimate: 0.84,
      weeklyEstimateYFBTC: 336,
    },
    {
      name: 'YFBTC/ETH Stats',
      logo: changeImg,
      class: 'img-con',
      hourlyROI: 0.16,
      dailyROI: 3.84,
      weeklyROI: 26.88,
      hourlyEstimate: 0.008,
      hourlyEstimateYFBTC: 3.2,
      dailyEstimate: 0.192,
      dailyEstimateYFBTC: 76.8,
      weeklyEstimate: 1.344,
      weeklyEstimateYFBTC: 537,
    },
    {
      name: 'wBTC/wETH Stats',
      logo: sweetImg,
      class: 'img-con',
      hourlyROI: 0.12,
      dailyROI: 2.88,
      weeklyROI: 20.16,
      hourlyEstimate: 0.006,
      hourlyEstimateYFBTC: 2.4,
      dailyEstimate: 0.144,
      dailyEstimateYFBTC: 57.6,
      weeklyEstimate: 1.008,
      weeklyEstimateYFBTC: 403.2,
    },
  ]
  const renderRateBoxes = () => {
    console.log('stateked: ', rows);

    return (
      <>
        {rows.length > 0
          ? rows.map((farmRow: any, i:any ) =>
              farmRow.map((farm:any, j:number) => (
                <div className="col section-outline mr-3 p-3">
                  <img
                    className={'img-con'}
                    src={farm.icon.toString()}
                    alt=""
                  />
                  <span className="head-text ml-2">{farm.name} Stats</span>
                  <span className="percentage d-block">
                    {farm.stakedBalance}
                  </span>
                  <span className="d-block">My Stake</span>
                  <span className="percentage ">0.0000</span>
                  <small>0.00%</small>
                  <br />
                  Total Staked
                  <br />
                  <br />
                  ========== PRICES ==========
                  <br />
                  1 YFBTC = 300.0$
                  <br />
                  1 USDT = 1.0020$
                  <br />
                  <br />
                  ======== YFBTC REWARDS ========
                  <br />
                  <span className="d-block">
                    Claimable Rewards:0.0000 YFBTC=$0.0000
                  </span>
                  Hourly estimate : 0.006 YFBTC = $ 2.4
                  <br />
                  Daily estimate : 0.144 YFBTC = $
                  <br />
                  Weekly estimate : 57.6 YFBTC = $ 403.2
                  <br />
                  Hourly ROI in USD : 0.12%
                  <br />
                  Daily ROI in USD : 2.88%
                  <br />
                  Weekly ROI in USD : 20.16%
                  <br />
                </div>
              )),
            )
          : null}
      </>
    )
    // data.map((elements: any) => {
    //   return (
    //     <div className="col section-outline mr-3 p-3">
    //       <img className={elements.class} src={elements.logo} alt="" />
    //       <span className="head-text ml-2">{elements.name}</span>
    //       <span className="percentage d-block">0.000000</span>
    //       <span className="d-block">My Stake</span>
    //       <span className="percentage ">0.0000</span>
    //       <small>0.00%</small>
    //       <br />
    //       Total Staked
    //       <br />
    //       <br />
    //       ========== PRICES ==========
    //       <br />
    //       1 YFBTC = 300.0$
    //       <br />
    //       1 USDT = 1.0020$
    //       <br />
    //       <br />
    //       ======== YFBTC REWARDS ========
    //       <br />
    //       <span className="d-block">
    //         Claimable Rewards:0.0000 YFBTC=$0.0000
    //       </span>
    //       Hourly estimate : {elements.hourlyEstimate} YFBTC = $
    //       {elements.hourlyEstimateYFBTC}
    //       <br />
    //       Daily estimate : {elements.dailyEstimate} YFBTC = $
    //       {elements.dailyEstimateYFBTC}
    //       <br />
    //       Weekly estimate : {elements.weeklyEstimate} YFBTC = $
    //       {elements.weeklyEstimateYFBTC}
    //       <br />
    //       Hourly ROI in USD : {elements.hourlyROI}%<br />
    //       Daily ROI in USD : {elements.dailyROI}%<br />
    //       Weekly ROI in USD : {elements.weeklyROI}%<br />
    //     </div>
    //   )
    // })
  }
  return (
    <>
      <StickyBar />
      <Page>
        <PageHeader
          icon={<img src={formar} height={120} />}
          title="Farming is Ready"
          subtitle="Stake Uniswap LP tokens to claim the future of BTC, YFBTC!"
        />

        <Container>
          <Balances />
        </Container>
        <Spacer size="lg" />
        <StyledInfo>
          🏆<b>Pro Tip</b>: YFBTC-ETH UNI-V2 LP token pool yields TWICE more
          token rewards per block.
        </StyledInfo>
        <Spacer size="lg" />
        <div className="row container mt-2 mb-5">{renderRateBoxes()}</div>
        <div className="row  ">
          <div className="">
            <div className="red-band ">
              THIS ROI IS JUST AN ESTIMATION PLEASE REFER TO{' '}
              <a href="http://bit.ly/DeFiROI">
                <u>MEDIUM</u>
              </a>{' '}
              FOR <br />
              <span className="text-center">MORE INFORMATION.</span>
            </div>
          </div>
        </div>
        <div
        // style={{
        //   margin: '0 auto',
        //   boxShadow: '0 20px 40px 0 rgba(255, 148, 22, 0.8)',
        //   border:' solid 1px rgba(0, 0, 0, 0)',
        //   background : '#ffffff'
        // }}
        >
          <Button
            text="🔪 Join Farm"
            size="md"
            to="/farms"
            variant="secondary"
          />
        </div>
      </Page>
    </>
  )
}

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[900]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;

  > b {
    color: ${(props) => props.theme.color.grey[900]};
  }
`

export default Home
