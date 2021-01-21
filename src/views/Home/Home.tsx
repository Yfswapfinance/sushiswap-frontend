import React, { useEffect, useRef, useImperativeHandle } from 'react'
import styled from 'styled-components'
import formar from '../../assets/img/formar.png'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'
import StickyBar from '../../components/TopBar/stickyNote'
import { Link } from 'react-router-dom'
import { MdDone } from 'react-icons/md'
import './home.css'
import { useWallet } from 'use-wallet'
import { gql, useApolloClient } from '@apollo/client'
import StatCards from './components/StatCards'
import yticon from '../../assets/img/youtube_icon.png'
import certik from '../../assets/img/certik_logo.png'

const GET_ETH_PRICE = gql`
  {
    bundle(id: "1") {
      ethPrice
    }
  }
`

const Home: React.FC = () => {
  const { account } = useWallet()
  const client = useApolloClient()

  useEffect(() => {
    client
      .query({
        query: GET_ETH_PRICE,
      })
      .then(({ data }: any) => {
        const ethPrice = data.bundle.ethPrice
        // console.log(ethPrice)
      })
  }, [])

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
        <Container>
          <StyledWrapper>
            <StyledTransCard style={{ flex: !!account ? 0.5 : 1 }}>
              <StyledButton>
                <a
                  href="https://app.uniswap.org/#/swap?outputCurrency=0xff034D12353867fC4228f4Ae3E689CD6dCAad120"
                  target="_blank"
                  className="buy-link-color"
                >
                  BUY YFBTC
                </a>
              </StyledButton>
            </StyledTransCard>
            <Spacer />
            {!account && (
              <StyledCard>
                <StyledCardContent>
                  <a
                    href="https://youtu.be/NheGX8Ksc-c"
                    target="_blank"
                    className="link-color"
                  >
                    WATCH INTRO VIDEO
                    <img src={yticon} alt="" className="youtube-icon" />
                  </a>
                </StyledCardContent>
              </StyledCard>
            )}
          </StyledWrapper>
        </Container>
        <Spacer size="lg" />
        <StyledInfo>
          🏆<b>Pro Tip</b>: YFBTC-ETH UNI-V2 LP token pool yields 5.0x more
          token rewards per block.
        </StyledInfo>
        <Spacer size="lg" />
        {!!account && (
          <div className="row mt-2 mb-5 pb-5">
            <StatCards />
          </div>
        )}
        <div>
          <StyledLink to="/farms">🔪 Choose Your Farm</StyledLink>
        </div>
        <StyledLogo>
          <MdDone color="white" size={22} className="mr-2 green-bg" />
          Audited By:
          <img src={certik} alt="" className="ml-2" />
        </StyledLogo>
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

const StyledWrapper = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 30px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
`
const StyledLogo = styled.div`
  margin-top: 100px;
`

const StyledCard = styled.div`
  border-radius: 12px;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  border: solid 1px rgba(0, 0, 0, 0);
  background-color: #dc0067;
`
const StyledTransCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  border: 2px solid #ff82ce;
  border-radius: 10px;
`
const StyledCardContent = styled.div`
  color: white;
  display: flex;
  flex: 1;
  align-items: center;
  padding: ${(props) => props.theme.spacing[2]}px;
`
const StyledButton = styled.div`
  color: #dc0067;
  display: flex;
  flex: 1;
  align-items: center;
  padding: ${(props) => props.theme.spacing[2]}px;
`
const StyledLink = styled(Link)`
  align-items: center;
  color: #ffffff;
  font-weight: bold;
  border-radius: 15px;
  display: flex;
  flex: 1;
  height: 56px;
  justify-content: center;
  margin: 0 ${(props) => -props.theme.spacing[4]}px;
  padding: 0 ${(props) => props.theme.spacing[4]}px;
  text-decoration: none;
  box-shadow: 10px 8px 18px 0 rgba(255, 148, 22, 0.7);
  &:hover {
    color: white;
    text-decoration: none;
  }
`

export default Home
