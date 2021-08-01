import { useEffect, useRef } from 'react'
import axios from 'axios'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { CanvasContainer } from './Canvas.styles'
import {
  pushToUndo,
  selectCanvas,
  setCanvas,
  setSessionId,
  setSocket,
} from './canvasSlice'
import { setCurrentTool } from 'features/toolbar/toolbarSlice'
import Brush from 'features/toolbar/tools/Brush'
import { useParams } from 'react-router-dom'

const Canvas = () => {
  const dispatch = useAppDispatch()
  const { username } = useAppSelector(selectCanvas)
  const { id } = useParams<{ id: string }>()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const exec = async () => {
      dispatch(setCanvas(canvasRef.current))
      const { data } = await axios.get<string>(
        `http://localhost:5000/image?id=${id}`
      )
      const img = new Image()
      img.src = data
      const ctx = canvasRef.current!.getContext('2d')
      img.addEventListener('load', () => {
        ctx!.clearRect(
          0,
          0,
          canvasRef.current!.width,
          canvasRef.current!.height
        )
        ctx!.drawImage(
          img,
          0,
          0,
          canvasRef.current!.width,
          canvasRef.current!.height
        )
      })
    }

    exec()
  }, [dispatch, id])

  useEffect(() => {
    if (!username) {
      return
    }

    //TODO: Move to config
    const ws = new WebSocket('ws://localhost:5000')

    ws.addEventListener('open', () => {
      ws.send(
        JSON.stringify({
          id,
          username,
          type: 'connection',
        })
      )
    })

    dispatch(setSessionId(id))
    dispatch(setSocket(ws))
    dispatch(setCurrentTool(new Brush(canvasRef.current!, ws, id)))

    ws.addEventListener('message', (e) => {
      const parsedMessage = JSON.parse(e.data)

      switch (parsedMessage.type) {
        case 'connection': {
          return console.log(parsedMessage)
        }
        case 'draw': {
          return drawHandler(parsedMessage)
        }
      }
    })
  }, [username, id, dispatch])

  const mouseUpHandler = () => {
    const dataUrl = canvasRef.current!.toDataURL()
    dispatch(pushToUndo(dataUrl))
    axios.post(`http://localhost:5000/image?id=${id}`, { img: dataUrl })
  }

  const drawHandler = (msg: any) => {
    const figure = msg.figure
    const ctx = canvasRef.current!.getContext('2d')
    switch (figure.type) {
      case 'brush': {
        return Brush.draw(ctx as CanvasRenderingContext2D, figure.x, figure.y)
      }
      case 'finish': {
        return ctx!.beginPath()
      }
    }
  }

  return (
    <CanvasContainer>
      <canvas ref={canvasRef} onMouseUp={mouseUpHandler} />
    </CanvasContainer>
  )
}

export default Canvas
