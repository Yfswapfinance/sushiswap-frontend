import React from 'react'
import styled from 'styled-components'
import chef from '../../assets/img/chef.png'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'
import worldImg from '../../assets/img/world.svg';
import peachImg from '../../assets/img/peach.svg';
import pearlImg from '../../assets/img/oyster.svg';

import './home.css';
const Home: React.FC = () => {
  const data: any = [
    { name: 'USDT Stats', logo: worldImg },
    { name: 'TAI Stats', logo: peachImg },
    { name: 'PEARL/TRX LP Stats', logo: pearlImg }
  ];
  const renderRateBoxes = () => {
    return data.map((elements: any) => {
      return (
        <div className="col section-outline mr-3 p-3">
          <img className="img-size" src={elements.logo} alt="" /><span className="head-text ml-3">{elements.name}</span>
          <span className="percentage d-block">0.000000</span>
          <span className="d-block">My Stake</span>
          <span className="percentage ">0.0000</span><small>0.00%</small><br />
            Total Staked<br /><br />
            ========== PRICES ==========<br />
            1 YFBTC = 379.1565$<br />
            1 USDT = 1.0020$<br /><br />
            ======== YFBTC REWARDS ========<br />
            <span className="d-block">Claimable Rewards:0.0000 YFBTC=$0.0000</span>
            Hourly estimate : 0.0000 YFBTC = $0.0000<br />
            Daily estimate : 0.0000 YFBTC = $0.0000<br />
            Weekly estimate : 0.0000 YFBTC = $0.0000<br />
            Hourly ROI in USD : 0.0000%<br />
            Daily ROI in USD : 0.0000%<br />
            Weekly ROI in USD : 0.0000%<br />
        </div>
      );
    })
  }
  return (
    <Page>
      <PageHeader
        icon={<img src={chef} height={120} />}
        title="MasterChef is Ready"
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
        style={{
          margin: '0 auto',
        }}
      >

        <Button text="🔪 See the Menu" to="/farms" variant="secondary" />
      </div>
    </Page>
  )
}

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[500]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;

  > b {
    color: ${(props) => props.theme.color.grey[600]};
  }
`


export default Home
