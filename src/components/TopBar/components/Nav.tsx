import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'


const style = {
  color: 'white', 
};


const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink exact activeClassName="active" to="/">
        Home
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/farms">
        Menu
      </StyledLink>
      {/* <StyledLink exact activeClassName="active" to="/staking">
        Staking
      </StyledLink> */}
      <StyledAbsoluteLink  
      >
        <a href="https://help.yfswap.finance/" style={style} target="blank">Documentation</a>
        
      </StyledAbsoluteLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  margin-right : 156px;
  padding-top:2px;
  @media (max-width: 768px) {
    margin-right : 0px;
  }
`


const StyledLink = styled(NavLink)`
  color: ${(props) => props.theme.color.grey[900]};
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
  &.active {
      
  }
  @media (max-width: 400px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
  }
`

const StyledAbsoluteLink = styled.a`
  color: ${(props) => props.theme.color.grey[900]};
  font-weight: 700;
  color:white !important;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
  &.active {
    
  }
  @media (max-width: 400px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
  }
`

export default Nav
