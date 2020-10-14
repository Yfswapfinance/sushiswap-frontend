import React from 'react'
import styled from 'styled-components'
import formar from '../../assets/img/formar.png'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'
import rocketImg from '../../assets/img/rocket.png';
import changeImg from '../../assets/img/change.svg';
import sweetImg from '../../assets/img/sweet.svg';
import StickyBar from "../../components/TopBar/stickyNote"
import './home.css';




const Home: React.FC = () => {
  const data: any = [
    {
      name: 'BITTO/ETH Stats',
      logo: rocketImg ,
      class : 'img-size',
      hourlyROI : 0.1, dailyROI: 2.4, weeklyROI: 16.8,
      hourlyEstimate: 0.005, hourlyEstimateYFBTC : 2, dailyEstimate: 0.12, dailyEstimateYFBTC: 48, weeklyEstimate: 0.84, weeklyEstimateYFBTC: 336
    },
    {
      name: 'YFBTC/ETH Stats', logo: changeImg , class : 'img-con', hourlyROI : 0.16, dailyROI: 3.84, weeklyROI: 26.88,
      hourlyEstimate: 0.008, hourlyEstimateYFBTC : 3.2, dailyEstimate: 0.192, dailyEstimateYFBTC: 76.8, weeklyEstimate: 1.344, weeklyEstimateYFBTC: 537
    },
    {
      name: 'wBTC/wETH Stats', logo: sweetImg , class : 'img-con', hourlyROI : 0.12, dailyROI: 2.88, weeklyROI: 20.16,
      hourlyEstimate: 0.006, hourlyEstimateYFBTC : 2.4, dailyEstimate: 0.144, dailyEstimateYFBTC: 57.6, weeklyEstimate: 1.008, weeklyEstimateYFBTC: 403.2
    }
  ];
  const renderRateBoxes = () => {

    return data.map((elements: any) => {
      return (
        <div className="col section-outline mr-3 p-3">
          <img className={elements.class} src={elements.logo} alt="" /><span className="head-text ml-2">{elements.name}</span>
          <span className="percentage d-block">0.000000</span>
          <span className="d-block">My Stake</span>
          <span className="percentage ">0.0000</span><small>0.00%</small><br />
            Total Staked<br /><br />
            ========== PRICES ==========<br />
            1 YFBTC = 300.0$<br />
            1 USDT = 1.0020$<br /><br />
            ======== YFBTC REWARDS ========<br />
            <span className="d-block">Claimable Rewards:0.0000 YFBTC=$0.0000</span>
            Hourly estimate : {elements.hourlyEstimate} YFBTC = ${elements.hourlyEstimateYFBTC}<br />
            Daily estimate : {elements.dailyEstimate} YFBTC = ${elements.dailyEstimateYFBTC}<br />
            Weekly estimate : {elements.weeklyEstimate} YFBTC = ${elements.weeklyEstimateYFBTC}<br />
      Hourly ROI in USD : {elements.hourlyROI}%<br />
            Daily ROI in USD : {elements.dailyROI}%<br />
            Weekly ROI in USD : {elements.weeklyROI}%<br />
        </div>
      );
    })
  }
  return (
    <>
    <StickyBar/>
    <Page>
      <PageHeader
        icon={<img src={formar} height={120} />}
        title="Farming is Ready"
        subtitle="Stake Uniswap LP tokens to claim your very own yummy YFBTC!"
      />

      <Container>
        <Balances />
      </Container>
      <Spacer size="lg" />
      <StyledInfo>
        🏆<b>Pro Tip</b>: YFBTC-ETH UNI-V2 LP token pool yields TWICE more token
        rewards per block.
      </StyledInfo>
      <Spacer size="lg" />
      <div className="row container mt-2 mb-5">
        {renderRateBoxes()}
      </div>
      <div className="row  ">
        <div className="">
          <div className="red-band ">
            THIS ROI IS JUST AN ESTIMATION PLEASE REFER TO <a href="http://bit.ly/DeFiROI"><u>MEDIUM</u></a> FOR <br/><span className="text-center">MORE
            INFORMATION.</span>
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

        <Button text="🔪 Join Farm" size="md" to="/farms" variant="secondary" />
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
