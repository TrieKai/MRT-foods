import React from "react";
import styled from "styled-components";
import { StarFull, StarHalf, StarEmpty } from 'components/icons/star';

const StyledRatingBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledRating = styled.span`
  padding-right: 4px;
  line-height: 100%;
`;

const StyledRatingNum = styled.span`
  padding-left: 4px;
  line-height: 100%;
`;

interface RatingComponentProps {
  rating: number
  ratingNum: number
}

const RatingComponent: React.FC<RatingComponentProps> = ({ rating, ratingNum }) => {
  const ratings = rating * 10 + 2; // 加二是因為好計算
  const ratingStars = Math.floor(ratings / 5) / 2; // 標準化成得到的星星數
  const fullStars = Math.floor(ratingStars); // 滿星的數量
  const halfStars = (ratingStars - fullStars) * 2; // 半星的數量
  const emptyStars = 5 - fullStars - halfStars; // 空星的數量

  return <StyledRatingBox>
    <StyledRating>{rating}</StyledRating>
    {Array(fullStars).fill(0).map((_, i) => (<StarFull key={i} />))}
    {Array(halfStars).fill(0).map((_, i) => <StarHalf key={i} />)}
    {Array(emptyStars).fill(0).map((_, i) => <StarEmpty key={i} />)}
    <StyledRatingNum>({ratingNum})</StyledRatingNum>
  </StyledRatingBox>;
}

export default RatingComponent;