import { FC } from 'react'
import styled from 'styled-components'

export type ButtonType = {
  type: 'primary' | 'secondary'
}

interface ButtonStyles extends ButtonType {
  disable?: boolean
}

const ButtonContainer = styled.a<ButtonStyles>`
  margin: 0 0.5rem;
  padding: 0px 2rem;
  display: inline-block;
  height: 2.5rem;
  line-height: 2.5rem;
  border-radius: 7px;
  color: ${({ type }) => (type === 'primary' ? '#fff' : '#0070f3')};
  background: ${({ type }) => (type === 'primary' ? '#0070f3' : '#fff')};
  box-shadow: ${({ type }) =>
    type === 'primary' ? 'rgb(0 118 255 / 39%) 0px 4px 14px 0px' : 'unset'};
  cursor: ${({ disable }) => (disable ? 'not-allowed' : 'pointer')};

  &:hover {
    background: ${({ type }) =>
      type === 'primary' ? 'rgba(0, 118, 255, 0.9)' : 'rgba(0, 118, 255, 0.1)'};
    box-shadow: ${({ type }) =>
      type === 'primary' ? 'rgb(0 118 255 / 23%) 0px 6px 20px' : null};
  }
`

interface ButtonProps extends ButtonType {
  disable?: boolean
  onClick: Function
}

const Button: FC<ButtonProps> = ({ type, disable, onClick, children }) => {
  return (
    <ButtonContainer
      type={type}
      disable={disable}
      onClick={() => {
        onClick()
      }}
    >
      {children}
    </ButtonContainer>
  )
}

export default Button
