import React from 'react'
import styled from 'styled-components'

const Card: React.FC = ({ children }) => <StyledCard>{children}</StyledCard>

const StyledCard = styled.div`
  border-radius: 12px;
  display: flex;
  flex: 1; 
  flex-direction: column;
  box-shadow: 0 20px 40px 0 rgba(255, 148, 22, 0.8);
  border: solid 1px rgba(0, 0, 0, 0);
  background-color: #ffffff;
`

export default Card
