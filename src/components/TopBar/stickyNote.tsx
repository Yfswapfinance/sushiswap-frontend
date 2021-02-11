import React from 'react'
import styled from 'styled-components'
import Countdown from 'react-countdown'

interface stickybarProps {}

const AccountButton: React.FC<stickybarProps> = (props) => {
  const renderer = (renderer: any) => {
    // Render a countdown
    return (
      <span>
        <span className="span-timer">{renderer.days}</span> day{' '}
        <span className="span-timer">{renderer.hours}</span> hrs{' '}
        <span className="span-timer">{renderer.minutes}</span> min{' '}
        <span className="span-timer">{renderer.seconds}</span> sec
      </span>
    )
  }

  return (
    <StyledStickyBar>
      <StyledInner>
        <div>
          🚨
          <span className="mx-2">
            Countdown to starting YFBTC Yield farming
          </span>
          🚨
          {/* 🚨 <span  className="mx-2">YFBitcoin is an alternative to bitcoin, a defi bitcoin version with yield farming <a href="https://yfswapfi.medium.com/bitcoin-defi-explained-748217d76e14" style={{color:'inherit',textDecoration:'underline'}} target="blank">Learn More.</a></span> 🚨 */}
        </div>
        <Countdown
          daysInHours={true}
          // date={new Date('2021-02-12T12:00:00 GMT+05:00')}
          date={1613113200000}
          renderer={renderer}
        />
      </StyledInner>
    </StyledStickyBar>
  )
}

const StyledStickyBar = styled.div`
  width: 100%;
  background: #21dad7;
  padding-top: 7px;
  padding-bottom: 8px;
  position: absolute;
  top: 0;
`
const StyledInner = styled.div`
  font-family: sans-serif, Chivo;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.56;
  letter-spacing: -0.18px;
  text-align: center;
  color: #242166;
`

export default AccountButton
