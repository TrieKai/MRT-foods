import React from "react";
import styled from "styled-components";

const StyledLabel = styled.label`
  margin: .5rem .25rem;
  cursor: pointer;
`;

const StyledText = styled.span`
  display: block;
  color: rgb(102, 102, 102);
  padding: 0.5rem 1rem;
  border-radius: 7px;
  border: 1px solid rgb(102, 102, 102);
  background: white;
  transition: box-shadow 0.2s ease 0s;
`;

const StyledRadioBtn = styled.input`
  display: none;
  &:checked + ${StyledText} {
    color: rgb(17, 17, 17);
    border-color: rgb(17, 17, 17);
    box-shadow: rgb(193 193 193) 0px 0px 0px 3px;
    font-weight: 600;
  }
`;

interface RadioBtnProps {
  name: string
  texts: string[]
  onChecked: Function
}

const RadioBtn: React.FC<RadioBtnProps> = ({ name, texts, onChecked }) => {
  return <>
    {texts.map((text, i) =>
      <StyledLabel onClick={() => { onChecked(text) }} key={i}>
        <StyledRadioBtn type='radio' name={name} />
        <StyledText>{text}</StyledText>
      </StyledLabel>
    )}
  </>
}

export default RadioBtn;