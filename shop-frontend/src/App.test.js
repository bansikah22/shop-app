import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Product Management heading', () => {
  render(<App />);
  
  // Check for the Product Management heading
  const headingElement = screen.getByText(/Product Management/i);
  expect(headingElement).toBeInTheDocument();
  
  // Check for the Save button
  const buttonElement = screen.getByText(/Save/i);
  expect(buttonElement).toBeInTheDocument();
});
