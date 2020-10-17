import React from 'react'
import styled from 'styled-components'
import { AiFillMediumCircle, AiOutlineGithub } from 'react-icons/ai';
import { FaTelegram } from 'react-icons/fa';

const style = {
  color: 'white', 
};
const Nav: React.FC = () => {
  return (
    <StyledNav>
      <div className="py-5">
        <div className="center">
          <a href="https://yfswapfi.medium.com/" target="blank" style={style}>
            <AiFillMediumCircle className="mr-2" style={{ fontSize: 30 }}/>
          </a>

          <a href="https://t.me/yfswap" target="blank" style={style}>
            <FaTelegram className="mr-2" style={{ fontSize: 30 }} />
          </a>
          <a href="https://github.com/abanshinoburu" target="blank" style={style}>
          <AiOutlineGithub style={{ fontSize: 30 }} />
          </a>
          
        </div>
        <Styledspan>
          <span>© 2020 yfswap.finance</span>
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
  margin-top: 50px
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
font-family: sans-serif, Chivo;
font-size: 14px;
font-weight: normal;
font-stretch: normal;
font-style: normal;
line-height: 1.56;
letter-spacing: -0.18px;
text-align: left;
color: #eaa8c4;
`

export default Nav

