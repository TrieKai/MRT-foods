import React from "react";
import styled from "styled-components";

const StyledStar = styled.img<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
`;

interface StarProps {
  size?: number
}

export const StarFull: React.FC<StarProps> = ({ size = 16 }) => {
  return <StyledStar src={'https://maps.gstatic.com/consumer/images/icons/2x/ic_star_rate_14.png'} size={size} />;
}

export const StarHalf: React.FC<StarProps> = ({ size = 16 }) => {
  return <StyledStar src={'https://maps.gstatic.com/consumer/images/icons/2x/ic_star_rate_half_14.png'} size={size} />;
}

export const StarEmpty: React.FC<StarProps> = ({ size = 16 }) => {
  return <StyledStar src={'https://maps.gstatic.com/consumer/images/icons/2x/ic_star_rate_empty_14.png'} size={size} />;
}