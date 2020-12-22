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
import './home.css'
import { useWallet } from 'use-wallet'
import { gql, useApolloClient } from '@apollo/client'
import StatCards from './components/StatCards'

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
      {/* <StickyBar /> */}
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
        {!!account && (
          <div className="row mt-2 mb-5">
            <StatCards />
          </div>
        )}
        <div className="row  ">
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
        <StyledVideo>
        <ReactPlayer url="https://www.youtube.com/watch?v=NheGX8Ksc-c" height={340} width={530}/>
        </StyledVideo>
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

const StyledVideo = styled.div`
  margin-top:50px;
`

export default Home
