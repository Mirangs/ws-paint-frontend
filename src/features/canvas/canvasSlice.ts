import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export interface CanvasState {
  canvas: any
  socket: any

  undoList: string[]
  redoList: string[]

  sessionId: string
  username: string
}

const initialState: CanvasState = {
  canvas: null,
  socket: null,
  undoList: [],
  redoList: [],
  username: '',
  sessionId: '',
}

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    setCanvas(state, action: PayloadAction<any>) {
      state.canvas = action.payload
    },
    pushToUndo(state, action: PayloadAction<string>) {
      state.undoList.push(action.payload)
    },
    pushToRedo(state, action: PayloadAction<string>) {
      state.undoList.push(action.payload)
    },
    undo(state) {
      const ctx = state.canvas.getContext('2d')
      if (!state.undoList.length) {
        return ctx.clearRect(0, 0, state.canvas.width, state.canvas.height)
      }

      let dataUrl = state.undoList.pop()
      state.redoList.push(dataUrl!)
      let img = new Image()
      img.src = dataUrl!
      img.addEventListener('load', () => {
        ctx.clearRect(0, 0, state.canvas.width, state.canvas.height)
        ctx.drawImage(img, 0, 0, state.canvas.width, state.canvas.height)
      })
    },
    redo(state) {
      const ctx = state.canvas.getContext('2d')
      if (!state.redoList.length) {
        return
      }

      let dataUrl = state.redoList.pop()
      state.redoList.push(state.canvas.toDataUrl())
      let img = new Image()
      img.src = dataUrl!
      img.addEventListener('load', () => {
        ctx.clearRect(0, 0, state.canvas.width, state.canvas.height)
        ctx.drawImage(img, 0, 0, state.canvas.width, state.canvas.height)
      })
    },
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload
    },
    setSocket(state, action: PayloadAction<any>) {
      state.socket = action.payload
    },
    setSessionId(state, action: PayloadAction<string>) {
      state.sessionId = action.payload
    },
  },
})

export const {
  setCanvas,
  pushToRedo,
  pushToUndo,
  undo,
  redo,
  setUsername,
  setSocket,
  setSessionId,
} = canvasSlice.actions

export const selectCanvas = (state: RootState) => state.canvas

export default canvasSlice.reducer
