import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const style = {
  color: 'white',
}

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink exact activeClassName="active" to="/">
        Home
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/farms">
        Menu 🔥
      </StyledLink>
      {/* <StyledLink exact activeClassName="active" to="/staking">
        Staking
      </StyledLink> */}
      <StyledAbsoluteLink href="https://help.yfswap.finance/" target="_blank">
        Documentation 📋
      </StyledAbsoluteLink>
      <StyledLink
        onClick={(e) => e.preventDefault()}
        exact
        activeClassName="active"
        to="/governance"
        style={{ opacity: 0.4 }}
      >
        Governance 🔜
      </StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  margin-right: 156px;
  padding-top: 2px;
  @media (max-width: 768px) {
    flex-direction: column;
    margin-right: 0px;
  }
`

const StyledLink = styled(NavLink)`
  color: ${(props) => props.theme.color.grey[900]};
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  padding-bottom: 5px;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
    text-decoration: none;
  }
  &.active {
    border-bottom: 2px solid #ff9416;
  }
  @media (max-width: 400px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
  }
  @media (max-width: 768px) {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`

const StyledAbsoluteLink = styled.a`
  color: ${(props) => props.theme.color.grey[900]};
  font-weight: 700;
  padding-bottom: 5px;
  color: white !important;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
    text-decoration: none;
  }
  &.active {
  }
  @media (max-width: 400px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
  }
`

export default Nav
