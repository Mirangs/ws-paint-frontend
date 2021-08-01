import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import toolbarReducer from '../features/toolbar/toolbarSlice'
import canvasReducer from '../features/canvas/canvasSlice'

export const store = configureStore({
  reducer: {
    toolbar: toolbarReducer,
    canvas: canvasReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
