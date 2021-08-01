import styled from 'styled-components'
import { useAppDispatch } from 'app/hooks'
import { setLineWidth, setStrokeColor } from 'features/toolbar/toolbarSlice'
import { SettingsContainer } from './SettingsBar.styles'

const InputWithMargin = styled.input`
  margin-left: 15px;
`

const SettingsBar = () => {
  const dispatch = useAppDispatch()
  return (
    <SettingsContainer>
      <label htmlFor="line-width">Line width</label>
      <InputWithMargin
        id="line-width"
        type="number"
        defaultValue={1}
        min={1}
        max={50}
        onChange={(e) => dispatch(setLineWidth(+e.target.value))}
      />
      <label htmlFor="stroke-color">Stroke color</label>
      <InputWithMargin
        id="stroke-color"
        type="color"
        onChange={(e) => dispatch(setStrokeColor(e.target.value))}
      />
    </SettingsContainer>
  )
}

export default SettingsBar
