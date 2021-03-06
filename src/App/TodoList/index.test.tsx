import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Provider from '@laststance/use-app-state'
import '@testing-library/jest-dom'
import TodoList from './index'
import { AppState } from '../../index'
import itly, { TodoDeleted, TodosToggled } from '../../itly'
import ItlyPluginTest from '@itly/plugin-testing'

const initialAppState: AppState = {
  todoList: [
    {
      id: 'TsHx9eEN5Y4A',
      bodyText: 'monster',
      completed: false,
    },
    {
      id: 'ba91OwrK0Dt8',
      bodyText: 'boss black',
      completed: false,
    },
    {
      id: 'QwejYipEf5nk',
      bodyText: 'caffe latte',
      completed: false,
    },
  ],
}

const itlyTestPlugin = new ItlyPluginTest()

beforeAll(() => {
  itly.load({
    destinations: { all: { disabled: true } },
    plugins: [itlyTestPlugin],
  })
})

beforeEach(() => {
  itlyTestPlugin.reset()
})

test('should be render 3 todo items in initialAppState', () => {
  const { getByTestId, getAllByTestId } = render(
    <Provider appState={initialAppState}>
      <TodoList path="/" />
    </Provider>
  )

  expect(getByTestId('todo-list')).toBeInTheDocument()
  expect(getByTestId('todo-list').children.length).toBe(3)
  expect(Array.isArray(getAllByTestId('todo-item'))).toBe(true)
  expect(getAllByTestId('todo-item')[0]).toHaveTextContent('monster')
  expect(getAllByTestId('todo-item')[1]).toHaveTextContent('boss black')
  expect(getAllByTestId('todo-item')[2]).toHaveTextContent('caffe latte')

  expect(itlyTestPlugin.all()).toHaveLength(0)
})

test('should be work delete todo button', () => {
  const { getByTestId, getAllByTestId } = render(
    <Provider appState={initialAppState}>
      <TodoList path="/" />
    </Provider>
  )

  // delete first item
  fireEvent.click(getAllByTestId('delete-todo-btn')[0])
  // assertions
  expect(getByTestId('todo-list').children.length).toBe(2)
  expect(Array.isArray(getAllByTestId('todo-item'))).toBe(true)
  expect(getAllByTestId('todo-item')[0]).toHaveTextContent('boss black')
  expect(getAllByTestId('todo-item')[1]).toHaveTextContent('caffe latte')

  expect(itlyTestPlugin.all()).toHaveLength(1)
  expect(itlyTestPlugin.all()).toEqual([new TodoDeleted()])
})

test('should be work correctly all completed:true|false checkbox toggle button', () => {
  const { getByTestId, getAllByTestId } = render(
    <Provider appState={initialAppState}>
      <TodoList path="/" />
    </Provider>
  )

  // toggle on
  fireEvent.click(getByTestId('toggle-all-btn'))
  // should be completed all todo items
  expect((getAllByTestId('todo-item-complete-check')[0] as HTMLInputElement).checked).toBe(true) /* eslint-disable-line prettier/prettier */
  expect((getAllByTestId('todo-item-complete-check')[1] as HTMLInputElement).checked).toBe(true) /* eslint-disable-line prettier/prettier */
  expect((getAllByTestId('todo-item-complete-check')[2] as HTMLInputElement).checked).toBe(true) /* eslint-disable-line prettier/prettier */

  // toggle off
  fireEvent.click(getByTestId('toggle-all-btn'))
  // should be not comleted all todo items
  expect((getAllByTestId('todo-item-complete-check')[0] as HTMLInputElement).checked).toBe(false) /* eslint-disable-line prettier/prettier */
  expect((getAllByTestId('todo-item-complete-check')[1] as HTMLInputElement).checked).toBe(false) /* eslint-disable-line prettier/prettier */
  expect((getAllByTestId('todo-item-complete-check')[2] as HTMLInputElement).checked).toBe(false) /* eslint-disable-line prettier/prettier */

  expect(itlyTestPlugin.all()).toHaveLength(2)
  expect(itlyTestPlugin.all()).toEqual([new TodosToggled(), new TodosToggled()])
})
