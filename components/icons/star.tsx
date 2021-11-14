import React from 'react'
import styled from 'styled-components'

const StyledStar = styled.img<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`

interface StarProps {
  size?: number
}

export const StarFull: React.VFC<StarProps> = ({ size = 16 }): JSX.Element => {
  return (
    <StyledStar
      src={
        'https://maps.gstatic.com/consumer/images/icons/2x/ic_star_rate_14.png'
      }
      size={size}
    />
  )
}

export const StarHalf: React.VFC<StarProps> = ({ size = 16 }): JSX.Element => {
  return (
    <StyledStar
      src={
        'https://maps.gstatic.com/consumer/images/icons/2x/ic_star_rate_half_14.png'
      }
      size={size}
    />
  )
}

export const StarEmpty: React.VFC<StarProps> = ({ size = 16 }): JSX.Element => {
  return (
    <StyledStar
      src={
        'https://maps.gstatic.com/consumer/images/icons/2x/ic_star_rate_empty_14.png'
      }
      size={size}
    />
  )
}
