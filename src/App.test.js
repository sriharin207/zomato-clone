import { render, screen } from "@testing-library/react";
import Header from "./components/Layout/header";
import RootLayout from "./components/Layout/RootLayout";

test("Zomato", () => {
  render(<RootLayout />);
  const linkElement = screen.getByText(/Zomato/i);
  expect(linkElement).toBeInTheDocument();
});
