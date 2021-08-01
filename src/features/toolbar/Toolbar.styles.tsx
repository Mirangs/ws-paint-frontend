import styled from 'styled-components'
import brush from './img/brush.svg'
import circle from './img/circle.svg'
import color from './img/color.svg'
import eraser from './img/eraser.svg'
import line from './img/line.svg'
import rect from './img/rect.svg'
import undo from './img/undo.svg'
import redo from './img/redo.svg'
import save from './img/save.svg'

const images = {
  brush,
  circle,
  color,
  eraser,
  line,
  rect,
  undo,
  redo,
  save,
}

export const ToolbarContainer = styled.section`
  padding: 8px 20px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  width: 100%;
  box-shadow: 0 4px 5px gray;
  z-index: 10;
  position: relative;
  justify-content: space-between;
`

export interface ToolbarBtnProps {
  image: keyof typeof images
}

export const ToolbarBtn = styled.button<ToolbarBtnProps>`
  width: 25px;
  height: 25px;
  border: none;
  background-color: transparent;
  background-image: url('${(props) => images[props.image]}');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;

  &:not(:last-of-type) {
    margin-right: 15px;
  }
`
