import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export interface ToolbarState {
  currentTool: any
}

const initialState: ToolbarState = {
  currentTool: null,
}

export const toolbarSlice = createSlice({
  name: 'toolbar',
  initialState,
  reducers: {
    setCurrentTool(state, action: PayloadAction<any>) {
      state.currentTool = action.payload
    },
    setFillColor(state, action: PayloadAction<string>) {
      state.currentTool.fillColor = action.payload
    },
    setStrokeColor(state, action: PayloadAction<string>) {
      state.currentTool.strokeColor = action.payload
    },
    setLineWidth(state, action: PayloadAction<number>) {
      state.currentTool.lineWidth = action.payload
    },
  },
})

export const { setCurrentTool, setFillColor, setStrokeColor, setLineWidth } =
  toolbarSlice.actions

export const selectToolbar = (state: RootState) => state.toolbar

export default toolbarSlice.reducer
