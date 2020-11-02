import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { NotFound } from './NotFound'
import itly from './itly'

beforeAll(() => {
  itly.load({
    destinations: { all: { disabled: true } },
  })
})

test('<NotFound /> should render Page Not Found message', () => {
  const { getByText } = render(<NotFound />)
  expect(getByText('Page Not Found')).toBeInTheDocument()
})
