import React, { ReactNode } from 'react'
import styled, { keyframes } from 'styled-components'

const animation = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.6) translateY(-8px);
  }
  
  100% {
    opacity: 1;
  }
`

const StyledCard = styled.div<{ index: number }>`
  margin: 1.5rem 0px;
  border-radius: 5px;
  border: 1px solid rgb(234, 234, 234);
  box-shadow: rgb(0 0 0 / 15%) 0px 2px 6px;
  transition: box-shadow 0.2s ease 0s;
  animation-name: ${animation};
  animation-duration: 350ms;
  animation-delay: calc(${({ index }) => index} * 100ms);
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;

  &:hover {
    box-shadow: rgb(0 0 0 / 10%) 0px 6px 12px;
  }
`

const StyledContent = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  width: 100%;
  color: rgb(102, 102, 102);
  border: none;
  transition: color 0.2s ease 0s;

  &:hover {
    color: rgb(17, 17, 17);
  }
`

interface CardListProps {
  list: ReactNode[]
  onClick: Function
}

const CardList: React.VFC<CardListProps> = ({ list, onClick }): JSX.Element => {
  return (
    <>
      {list.map((item, i) => (
        <StyledCard index={i + 1} key={i}>
          <StyledContent>{item}</StyledContent>
        </StyledCard>
      ))}
    </>
  )
}

export default CardList
