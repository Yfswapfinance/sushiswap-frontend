import React from 'react'
import styled from 'styled-components'
import { AiFillMediumCircle, AiOutlineGithub } from 'react-icons/ai'
import { FaTelegram } from 'react-icons/fa'
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
          <a href="" target="blank">
            <img src={logo1} alt="" style={style} />
          </a>
          {/* https://github.com/abanshinoburu */}
          <a href="" target="blank">
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
    //
    //   <StyledLink

    //   >
    //     MasterChef Contract
    //   </StyledLink>
    //   <StyledLink

    //   >
    //     Uniswap YFBTC-ETH
    //   </StyledLink>
    //   <StyledLink >
    //     Discord
    //   </StyledLink>
    //   <StyledLink>
    //     Github
    //   </StyledLink>
    //   <StyledLink >
    //     Twitter
    //   </StyledLink>
    // </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  margin-top: 50px;
`

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.grey[900]};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
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
