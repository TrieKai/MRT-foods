import styled from 'styled-components'

const StyledLabel = styled.label`
  margin: 0.5rem 0.25rem;
  cursor: pointer;

  &:hover {
    box-shadow: rgb(0 0 0 / 10%) 0px 6px 12px;
  }
`

const StyledText = styled.span`
  display: block;
  color: rgb(102, 102, 102);
  padding: 0.5rem 1rem;
  border-radius: 7px;
  border: 1px solid rgb(102, 102, 102);
  background: white;
  transition: box-shadow 0.2s ease 0s;
`

const StyledRadioBtn = styled.input`
  display: none;

  &:checked + ${StyledText} {
    color: rgb(17, 17, 17);
    border-color: rgb(17, 17, 17);
    box-shadow: rgb(193 193 193) 0px 0px 0px 3px;
    font-weight: 600;
  }
`

interface RadioBtnProps {
  name: string
  data: {
    text: string
    checked: boolean
  }[]
  onChange: Function
}

const RadioBtn: React.VFC<RadioBtnProps> = ({
  name,
  data,
  onChange
}): JSX.Element => {
  return (
    <>
      {data.map((item, i) => (
        <StyledLabel key={i}>
          <StyledRadioBtn
            type='radio'
            name={name}
            checked={item.checked}
            onChange={() => {
              onChange(item.text)
            }}
          />
          <StyledText>{item.text}</StyledText>
        </StyledLabel>
      ))}
    </>
  )
}

export default RadioBtn
