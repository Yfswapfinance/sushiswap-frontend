import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import btcIcon from '../../assets/img/btcIcon.png';

const Logo: React.FC = () => {
  return (
    <StyledLogo to="/">
      <img src={btcIcon} height="50" style={{ marginTop: 15 }} />
      <StyledText>
        YFBTC<MasterChefText>.vip</MasterChefText>
      </StyledText>
    </StyledLogo>
  )
}

const StyledLogo = styled(Link)`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
  min-height: 44px;
  min-width: 44px;
  padding: 0;
  text-decoration: none;
`

const StyledText = styled.span`
  color: ${(props) => props.theme.color.grey[900]};
  margin-left: ${(props) => props.theme.spacing[2]}px;
  @media (max-width: 400px) {
    display: none;
  }
  font-family:  sans-serif MyriadPro;
  font-size: 30px;
  font-weight: bold;
  font-stretch: normal;
`

const MasterChefText = styled.span`
color: ${(props) => props.theme.color.grey[11]};
font-family: 'Reem Kufi', sans-serif;
font-size: 20px;
font-weight: 700;
letter-spacing: 0.03em;
margin-left: ${(props) => props.theme.spacing[2]}px;
@media (max-width: 400px) {
  display: none;
}`

export default Logo
