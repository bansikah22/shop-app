import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductForm from './ProductForm';

describe('ProductForm Component', () => {
    const mockOnSubmit = jest.fn();

    beforeEach(() => {
        mockOnSubmit.mockClear();
    });

    test('renders form inputs correctly', () => {
        render(<ProductForm onSubmit={mockOnSubmit} />);

        const nameInput = screen.getByPlaceholderText(/Product Name/i);
        const priceInput = screen.getByPlaceholderText(/Price/i);
        const saveButton = screen.getByText(/Save/i);

        expect(nameInput).toBeInTheDocument();
        expect(priceInput).toBeInTheDocument();
        expect(saveButton).toBeInTheDocument();
    });

    test('calls onSubmit with correct values when form is submitted', () => {
        render(<ProductForm onSubmit={mockOnSubmit} />);

        const nameInput = screen.getByPlaceholderText(/Product Name/i);
        const priceInput = screen.getByPlaceholderText(/Price/i);
        const saveButton = screen.getByText(/Save/i);

        // Simulate user input
        fireEvent.change(nameInput, { target: { value: 'Test Product' } });
        fireEvent.change(priceInput, { target: { value: '99.99' } });

        // Submit form
        fireEvent.click(saveButton);

        expect(mockOnSubmit).toHaveBeenCalledWith({ name: 'Test Product', price: 99.99 });
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });

    test('resets form after submission', () => {
        render(<ProductForm onSubmit={mockOnSubmit} />);

        const nameInput = screen.getByPlaceholderText(/Product Name/i);
        const priceInput = screen.getByPlaceholderText(/Price/i);
        const saveButton = screen.getByText(/Save/i);

        fireEvent.change(nameInput, { target: { value: 'Another Product' } });
        fireEvent.change(priceInput, { target: { value: '49.99' } });

        fireEvent.click(saveButton);

        // Form should reset after submission
        expect(nameInput.value).toBe('');
        expect(priceInput.value).toBe('');
    });
});
