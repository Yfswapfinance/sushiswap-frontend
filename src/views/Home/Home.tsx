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
import ReactPlayer from 'react-player'
import { FaYoutube } from 'react-icons/fa'
import './home.css'
import { useWallet } from 'use-wallet'
import { gql, useApolloClient } from '@apollo/client'
import StatCards from './components/StatCards'
import yticon from '../../assets/img/youtube_icon.png'

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
            <StyledTransCard>
              <StyledButton>BUY YFBTC</StyledButton>
            </StyledTransCard>
            <Spacer />
            <StyledCard>
              <StyledCardContent>
                <a
                  href="https://www.youtube.com/watch?v=NheGX8Ksc-c"
                  target="blank"
                  className="link-color"
                >
                  WATCH INTRO VIDEO
                  <img
                    src={yticon}
                    alt=""
                    className="youtube-icon"
                  />
                </a>
              </StyledCardContent>
            </StyledCard>
          </StyledWrapper>
        </Container>
        <Spacer size="lg" />
        <StyledInfo>
          🏆<b>Pro Tip</b>: YFBTC-ETH UNI-V2 LP token pool yields 5.0x more
          token rewards per block.
        </StyledInfo>
        <Spacer size="lg" />
        {!!account && (
          <div className="row mt-2 mb-5">
            <StatCards />
          </div>
        )}
        {/* <div className="row  ">
          <div className="">
            <div className="red-band">
              THIS ROI IS JUST AN ESTIMATION PLEASE REFER TO{' '}
              <a href="http://bit.ly/DeFiROI">
                <u>MEDIUM</u>
              </a>{' '}
              FOR <br />
              <span className="text-center">MORE INFORMATION.</span>
            </div>
          </div>
        </div> */}
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
        {/* <StyledVideo>
        <ReactPlayer url="https://www.youtube.com/watch?v=NheGX8Ksc-c" height={340} width={530}/>
        </StyledVideo> */}
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
  align-items: center;
  display: flex;
  margin-top: 30px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
`

const StyledBalances = styled.div`
  display: flex;
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
  flex: 1;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  border: 2px solid #FF82CE;
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
  color: #DC0067;
  display: flex;
  flex: 1;
  align-items: center;
  padding: ${(props) => props.theme.spacing[2]}px;
`

export default Home
