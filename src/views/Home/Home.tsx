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
      hourlyROI : 0.74, dailyROI: 17.74, weeklyROI: 124.19,
      hourlyEstimate: 0.0493, hourlyEstimateYFBTC : 14.7842, dailyEstimate: 1.1827, dailyEstimateYFBTC: 354.82, weeklyEstimate: 8.2792, weeklyEstimateYFBTC: 2483.75
    },
    { 
      name: 'YFBTC/ETH Stats', logo: changeImg , class : 'img-con', hourlyROI : 0.9856, dailyROI: 23.65, weeklyROI: 165,
      hourlyEstimate: 0.0657, hourlyEstimateYFBTC : 19.7123, dailyEstimate: 1.5770, dailyEstimateYFBTC: 473.09, weeklyEstimate: 11.039, weeklyEstimateYFBTC: 3311.666
    },
    { 
      name: 'YFBTC/WBTC Stats', logo: sweetImg , class : 'img-con', hourlyROI : 0.74, dailyROI: 17.74, weeklyROI: 124.19,
      hourlyEstimate: 0.0493, hourlyEstimateYFBTC : 14.7842, dailyEstimate: 1.1827, dailyEstimateYFBTC: 354.82, weeklyEstimate: 8.2792, weeklyEstimateYFBTC: 2483.75
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
