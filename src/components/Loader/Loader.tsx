import React from 'react'
import styled, { keyframes } from 'styled-components'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Loader from 'react-loader-spinner'

interface LoaderProps {
  text?: string
}

const CustomLoader: React.FC<LoaderProps> = ({ text }) => {
  return (
    <StyledLoader>
      <Loader
        type="Oval"
        color="#ff9416"
        height={100}
        width={100}
      />
    </StyledLoader>
  )
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const StyledLoader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 99999;
  background-color:rgba(0,0,0,0.5);
`

const StyledSushi = styled.div`
  font-size: 32px;
  position: relative;
  animation: 1s ${spin} infinite;
`

const StyledText = styled.div`
  color: ${(props) => props.theme.color.grey[400]};
`

export default CustomLoader
