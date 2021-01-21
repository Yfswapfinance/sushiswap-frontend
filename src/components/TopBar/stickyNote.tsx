import React from 'react'
import styled from 'styled-components'
import Countdown from "react-countdown";

interface stickybarProps { }

const AccountButton: React.FC<stickybarProps> = (props) => {
  const renderer = (renderer: any) => {
    
    // Render a countdown
    return <span><span className="span-timer">{renderer.hours}</span> hrs <span className="span-timer">{renderer.minutes}</span> min <span className="span-timer">{renderer.seconds}</span> sec</span>;
  
};
console.log("Counter Time", Date.now() + 3600000, 1608632606)

    return (
        <StyledStickyBar>
           <StyledInner>
           <div>
                    🚨 <span  className="mx-2">YFBitcoin is an alternative to bitcoin, a defi bitcoin version with yield farming <a href="https://help.yfswap.finance/" style={{color:'inherit',textDecoration:'underline'}} target="blank">Learn More.</a></span> 🚨
                </div>
                {/* <Countdown date={1608654379000} renderer={renderer}/> */}
            </StyledInner>
        </StyledStickyBar>
    )
}

const StyledStickyBar = styled.div`
        width : 100%;
        background : #21dad7;
        padding-top : 7px ; 
        padding-bottom : 8px;
        position: absolute;
        top: 0;
`
const StyledInner = styled.div`
font-family: sans-serif, Chivo;
font-size: 14px;
font-weight: normal;
font-stretch: normal;
font-style: normal;
line-height: 2.56;
letter-spacing: -0.18px;
text-align: center;
color: #242166;
`

export default AccountButton
