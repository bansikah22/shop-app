import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import * as api from './api'; // Import the API functions to mock them

jest.mock('./api', () => ({
    getProducts: jest.fn(),
    createProduct: jest.fn(),
    updateProduct: jest.fn(),
    deleteProduct: jest.fn(),
}));

describe('App Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the Product Management title', async () => {
        api.getProducts.mockResolvedValueOnce({ data: [] });

        render(<App />);

        expect(screen.getByText(/Product Management/i)).toBeInTheDocument();

        await waitFor(() => expect(api.getProducts).toHaveBeenCalledTimes(1));
    });

    it('displays products fetched from the API', async () => {
        api.getProducts.mockResolvedValueOnce({
            data: [
                { id: 1, name: 'Product 1', price: 100 },
                { id: 2, name: 'Product 2', price: 200 },
            ],
        });

        render(<App />);

        await waitFor(() => {
            expect(screen.getByText('Product 1')).toBeInTheDocument();
            expect(screen.getByText('Product 2')).toBeInTheDocument();
        });
    });

    it('calls createProduct API and refreshes the list on product creation', async () => {
        // Mock API responses
        api.getProducts.mockResolvedValueOnce({ data: [] }); // Initial fetch
        api.createProduct.mockResolvedValueOnce(); // Simulate successful creation
        api.getProducts.mockResolvedValueOnce({
            data: [{ id: 1, name: 'New Product', price: 50 }],
        }); // After creation

        render(<App />);

        // Simulate form input
        fireEvent.change(screen.getByPlaceholderText(/Product Name/i), {
            target: { value: 'New Product' },
        });
        fireEvent.change(screen.getByPlaceholderText(/Price/i), {
            target: { value: '50' },
        });

        // Simulate form submission
        fireEvent.click(screen.getByText(/save/i)); // Adjusted to match actual button text

        // Wait for the API call and UI update
        await waitFor(() => expect(api.createProduct).toHaveBeenCalledWith({ name: 'New Product', price: 50 }));
        await waitFor(() => expect(screen.getByText('New Product')).toBeInTheDocument());
    });
});
