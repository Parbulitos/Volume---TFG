import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Homepage from '../pages/index'
import { describe } from 'node:test'

describe('Homepage', () => {
    it('renders home page', () => {
        render(<Homepage />)
        expect(screen.getByText('Bienvenido a Volume')).toBeInTheDocument()
    })
})