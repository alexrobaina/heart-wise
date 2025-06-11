// src/components/atoms/Button/__tests__/Button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from '../index'

describe('Button component', () => {
  it('renders the button with children text', () => {
    render(<Button>Click Me</Button>)
    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })
})
