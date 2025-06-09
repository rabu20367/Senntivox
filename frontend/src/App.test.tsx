import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home page hero text', () => {
  render(<App />);
  const heroText = screen.getByText(/your intelligent emotional well-being companion/i);
  expect(heroText).toBeInTheDocument();
});
