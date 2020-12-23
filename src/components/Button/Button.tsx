import React, { useContext, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'

import { Link } from 'react-router-dom'

interface ButtonProps {
  children?: React.ReactNode
  disabled?: boolean
  href?: string
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg' | 'cs' | 'ps' | 'ts'
  text?: string
  to?: string
  variant?: 'default' | 'secondary' | 'tertiary' | 'normal'
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  href,
  onClick,
  size,
  text,
  to,
  variant,
}) => {
  const { color, spacing } = useContext(ThemeContext)

  let buttonColor: string
  switch (variant) {
    case 'secondary':
      buttonColor = color.grey[500]
      break
    case 'normal':
      buttonColor = color.grey[900]
      break
    case 'tertiary':
      buttonColor = '#ff9416'
      break
    case 'default':
    default:
      buttonColor = color.primary.main
  }

  let boxShadow: string
  let buttonSize: number
  let buttonPadding: number
  let fontSize: number
  switch (size) {
    case 'sm':
      boxShadow = `4px 4px 8px ${color.grey[300]},
        -8px -8px 16px ${color.grey[100]}FF;`
      buttonPadding = spacing[3]
      buttonSize = 36
      fontSize = 14
      break
    case 'lg':
      boxShadow = `6px 6px 12px ${color.grey[300]},
        -12px -12px 24px ${color.grey[100]}ff;`
      buttonPadding = spacing[4]
      buttonSize = 72
      fontSize = 16
      break
    case 'cs':
      boxShadow = `8px 10px 15px 0 rgba(255, 148, 22, 0.7)`
      buttonPadding = spacing[4]
      buttonSize = 40
      fontSize = 11
      break
    case 'ps':
      boxShadow = `none`
      buttonPadding = spacing[4]
      buttonSize = 40
      fontSize = 12
      break
    case 'ts':
      boxShadow = `none`
      buttonPadding = spacing[4]
      buttonSize = 40
      fontSize = 11.8
      break
    case 'md':
    default:
      boxShadow = `6px 6px 12px ${color.grey[300]},
        -12px -12px 24px -2px ${color.grey[100]}ff;`
      buttonPadding = spacing[4]
      buttonSize = 56
      fontSize = 16
  }

  const ButtonChild = useMemo(() => {
    if (to) {
      return <StyledLink to={to}>{text}</StyledLink>
    } else if (href) {
      return (
        <StyledExternalLink href={href} target="__blank">
          {text}
        </StyledExternalLink>
      )
    } else {
      return text
    }
  }, [href, text, to])

  return (
    <StyledButton
      boxShadow={boxShadow}
      color={buttonColor}
      disabled={disabled}
      fontSize={fontSize}
      onClick={onClick}
      padding={buttonPadding}
      size={buttonSize}
    >
      {children}
      {ButtonChild}
    </StyledButton>
  )
}

interface StyledButtonProps {
  boxShadow: string
  color: string
  disabled?: boolean
  fontSize: number
  padding: number
  size: number
}

const StyledButton = styled.button<StyledButtonProps>`
  align-items: center;
  background-color: ${(props) =>
    props.color === 'white'
      ? '#110f40'
      : (props) => props.theme.color.grey[200]};
  border: 0;
  border-radius: ${(props) =>
    props.fontSize === 12 || props.fontSize === 11.8 ? '18px' : '12px'};
  box-shadow: ${(props) => props.boxShadow};
  color: ${(props) =>
    !props.disabled ? props.color : props.theme.color.grey[2000]};
  cursor: pointer;
  display: flex;
  font-size: ${(props) => (props.fontSize === 11 ? '10' : props.fontSize)}px;
  font-weight: 700;
  height: ${(props) => props.size}px;
  justify-content: center;
  outline: none;
  padding-left: ${(props) =>
    props.fontSize === 11.8 ? '63' : props.padding}px;
  padding-right: ${(props) => props.padding}px;
  pointer-events: ${(props) => (!props.disabled ? undefined : 'none')};
  width: 100%;
  &:hover {
    background-color: ${(props) =>
      props.color === 'white' ? '#110f40' : '#ffdde3'};
    color: ${(props) => (props.color === 'white' ? 'white' : 'blue')};
  }
`

const StyledLink = styled(Link)`
  align-items: center;
  color: #ff9416;
  display: flex;
  flex: 1;
  height: 56px;
  justify-content: center;
  margin: 0 ${(props) => -props.theme.spacing[4]}px;
  padding: 0 ${(props) => props.theme.spacing[4]}px;
  text-decoration: none;
`

const StyledExternalLink = styled.a`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 56px;
  justify-content: center;
  margin: 0 ${(props) => -props.theme.spacing[4]}px;
  padding: 0 ${(props) => props.theme.spacing[4]}px;
  text-decoration: none;
`

export default Button
