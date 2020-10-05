import React from 'react'
import styled from 'styled-components'

interface stickybarProps { }

const AccountButton: React.FC<stickybarProps> = (props) => {
    return (
        <StyledStickyBar>
            <StyledInner>
                <div>
                    🚨 <span className="mx-2"> <del> Do Not</del> Claim Your Free YFBTC . <a href="/getYfbtc"> Do Not Click Here To Claim</a> </span> 🚨
                </div>
            </StyledInner>
        </StyledStickyBar>
    )
}

const StyledStickyBar = styled.div`
        width : 100%;
        background : #21dad7;
        padding-top : 5px ; 
        padding-bottom : 5px;
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
