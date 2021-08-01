import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Modal } from 'react-responsive-modal'
import GlobalStyle from './App.styles'
import Canvas from './features/canvas/Canvas'
import SettingsBar from './features/settings/SettingsBar'
import Toolbar from './features/toolbar/Toolbar'

import 'react-responsive-modal/styles.css'
import React, { useRef, useState } from 'react'
import { useAppDispatch } from 'app/hooks'
import { setUsername } from 'features/canvas/canvasSlice'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const usernameRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()

  const closeModal = () => setIsModalOpen(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(setUsername(usernameRef.current!.value))
    closeModal()
  }

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Modal open={isModalOpen} onClose={closeModal}>
        <h2>Enter your username</h2>
        <form onSubmit={onSubmit}>
          <input type="text" ref={usernameRef} />
          <button type="submit">Enter</button>
        </form>
      </Modal>
      <div className="App">
        <Switch>
          <Route path="/:id">
            <Toolbar />
            <SettingsBar />
            <Canvas />
          </Route>

          <Redirect to={`f${(+new Date()).toString(16)}`} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
