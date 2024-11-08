import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductList from './ProductList';

describe('ProductList Component', () => {
    const mockOnEdit = jest.fn();
    const mockOnDelete = jest.fn();

    const products = [
        { id: 1, name: 'Product 1', price: 19.99 },
        { id: 2, name: 'Product 2', price: 29.99 }
    ];

    beforeEach(() => {
        mockOnEdit.mockClear();
        mockOnDelete.mockClear();
    });

    test('renders list of products', () => {
        render(<ProductList products={products} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

        const product1 = screen.getByText(/Product 1/i);
        const product2 = screen.getByText(/Product 2/i);

        expect(product1).toBeInTheDocument();
        expect(product2).toBeInTheDocument();
    });

    test('calls onEdit when edit button is clicked', () => {
        render(<ProductList products={products} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

        const editButtons = screen.getAllByText(/Edit/i);
        fireEvent.click(editButtons[0]);

        expect(mockOnEdit).toHaveBeenCalledWith(products[0]);
        expect(mockOnEdit).toHaveBeenCalledTimes(1);
    });

    test('calls onDelete when delete button is clicked', () => {
        render(<ProductList products={products} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

        const deleteButtons = screen.getAllByText(/Delete/i);
        fireEvent.click(deleteButtons[1]);

        expect(mockOnDelete).toHaveBeenCalledWith(products[1].id);
        expect(mockOnDelete).toHaveBeenCalledTimes(1);
    });
});
