import React from 'react'
import styled from 'styled-components'
import medium from '../../../assets/img/medium.png'
import logo1 from '../../../assets/img/logo1.png'
import discord from '../../../assets/img/discord.png'
import telegram from '../../../assets/img/twitter.png'

const style = {
  width: 50,
}
const Nav: React.FC = () => {
  return (
    <StyledNav>
      <div className="py-5">
        <div className="center">
          <a
            href="https://etherscan.io/token/0xff034D12353867fC4228f4Ae3E689CD6dCAad120"
            target="blank"
          >
            <img src={logo1} alt="" style={style} />
          </a>
          <a
            href="https://github.com/Yfswapfinance/YFBTC-Contract"
            target="blank"
          >
            <img src={discord} alt="" style={style} />
          </a>
          <a href="https://yfswapfi.medium.com/" target="blank">
            <img src={medium} alt="" style={style} />
          </a>

          <a href="https://t.me/yfswap" target="blank">
            <img src={telegram} alt="" style={style} />
          </a>
        </div>
        <Styledspan>
          <span>© 2021 yfbtc.net</span>
        </Styledspan>
      </div>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  margin-top: 50px;
`

const Styledspan = styled.span`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  font-family: sans-serif, Chivo;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.56;
  letter-spacing: -0.18px;
  text-align: center;
  color: #eaa8c4;
`

export default Nav
