import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import styled from 'styled-components'
import Modal from 'components/modal/modal'
import CheckBox from 'components/checkbox'
import { LineVO } from 'utils/interface/common'

const FilterMapButtonContainer = styled.div``

const FilterMapButtonButton = styled.button`
  position: fixed;
  top: 0px;
  left: 0px;
  margin: 10px;
  padding: 0px;
  width: 40px;
  height: 40px;
  background: none rgb(255, 255, 255);
  border: 0px;
  text-transform: none;
  appearance: none;
  user-select: none;
  border-radius: 2px;
  box-shadow: rgb(0 0 0 / 30%) 0px 1px 4px -1px;
  cursor: pointer;
  overflow: hidden;
  z-index: 1;
`

interface FilterMapProps {
  lines: LineVO[]
  setLines: Dispatch<SetStateAction<LineVO[]>>
}

const FilterMap: React.VFC<FilterMapProps> = ({ lines, setLines }) => {
  const [open, setOpen] = useState<boolean>(false)

  const onOpen = useCallback(() => setOpen(true), [])

  const onClose = useCallback(() => setOpen(false), [])

  return (
    <FilterMapButtonContainer>
      <FilterMapButtonButton onClick={onOpen}>
        <svg viewBox='0 0 64 64' width='30' height='30'>
          <path
            d='M56 13v6a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h46a1 1 0 0 1 1 1zm-1 15H9a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h46a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1zm0 16H9a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h46a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1z'
            fill='#808080'
          ></path>
        </svg>
      </FilterMapButtonButton>
      <Modal show={open} onClose={onClose}>
        <h1>台北捷運</h1>
        <CheckBox
          name={'line'}
          data={lines.map(line => {
            return { text: line.name, checked: line.checked }
          })}
          onChange={(selectedLine: string) => {
            const newLines = lines.map(line => {
              if (line.name === selectedLine) line.checked = !line.checked
              return line
            })
            console.log(newLines)
            setLines([...newLines])
          }}
        />
      </Modal>
    </FilterMapButtonContainer>
  )
}

export default FilterMap
