import React from 'react'
import TodoApp from './component/TodoApp'
import {Provider} from "react-redux"
import { store } from './Redux/Store/Store';

function App() {
  return (
    <Provider store={store}>
     
        <TodoApp />
    </Provider>
  )
}

export default App
