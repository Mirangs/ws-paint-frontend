import { useAppDispatch, useAppSelector } from 'app/hooks'
import { redo, selectCanvas, undo } from 'features/canvas/canvasSlice'
import { ToolbarBtn, ToolbarContainer } from './Toolbar.styles'
import { setCurrentTool, setFillColor, setStrokeColor } from './toolbarSlice'
import Brush from './tools/Brush'
import Rect from './tools/Rect'
import Eraser from './tools/Eraser'

const Toolbar = () => {
  const dispatch = useAppDispatch()
  const { canvas, socket, sessionId } = useAppSelector(selectCanvas)

  const changeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setStrokeColor(e.target.value))
    dispatch(setFillColor(e.target.value))
  }

  const download = () => {
    const dataUrl = canvas.toDataURL()
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = `${sessionId}.jpg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <ToolbarContainer>
      <div>
        <ToolbarBtn
          image="brush"
          onClick={() =>
            dispatch(setCurrentTool(new Brush(canvas, socket, sessionId)))
          }
        />
        <ToolbarBtn
          image="rect"
          onClick={() =>
            dispatch(setCurrentTool(new Rect(canvas, socket, sessionId)))
          }
        />
        <ToolbarBtn image="circle" />
        <ToolbarBtn
          image="eraser"
          onClick={() =>
            dispatch(setCurrentTool(new Eraser(canvas, socket, sessionId)))
          }
        />
        <ToolbarBtn image="line" />
        <input type="color" onChange={changeColor} />
      </div>
      <div>
        <ToolbarBtn image="undo" onClick={() => dispatch(undo())} />
        <ToolbarBtn image="redo" onClick={() => dispatch(redo())} />
        <ToolbarBtn image="save" onClick={download} />
      </div>
    </ToolbarContainer>
  )
}

export default Toolbar
