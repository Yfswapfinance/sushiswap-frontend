import React from 'react'
import styled from 'styled-components'

const Card: React.FC = ({ children }) =><StyledCard>{children}</StyledCard>

const StyledCard = styled.div`
border-radius: 12px;
display: flex;
flex: 1; 
flex-direction: column;
box-shadow: 0px 0px 24px 0px rgb(47, 201, 226);
border: solid 1px rgba(0, 0, 0, 0);
background-color: #ffffff;

`
export default Card
