import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Provider from '@laststance/use-app-state'
import itly from './itly'

const initialAppState = {
  todoList: [],
}

beforeAll(() => {
  itly.load({
    destinations: { all: { disabled: true } },
  })
})

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Provider appState={initialAppState}>
      <App path="/" />
    </Provider>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})
