import { render, screen } from '@testing-library/react';
import App from './App';

test('Zomato', () => {
  render(<App />);
  const linkElement = screen.getByText(/Zomato/i);
  expect(linkElement).toBeInTheDocument();
});
