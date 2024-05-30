import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import StoreInfo from "./StoreInfo";

describe("StoreInfo", () => {
  test("renders store name and rating correctly", () => {
    const mockStore = {
      attributes: {
        name: "Test Store",
        rating: 3,
      },
    };

    render(<StoreInfo store={mockStore} />);

    expect(screen.getByText("Test Store")).toBeInTheDocument();

    const stars = screen.getByText("Test Store").nextSibling;
    expect(stars).toHaveTextContent("★★★☆☆");
  });

  test("renders full rating stars correctly", () => {
    const mockStore = {
      attributes: {
        name: "Full Rating Store",
        rating: 5,
      },
    };

    render(<StoreInfo store={mockStore} />);

    const stars = screen.getByText("Full Rating Store").nextSibling;
    expect(stars).toHaveTextContent("★★★★★");
  });

  test("renders zero rating stars correctly", () => {
    const mockStore = {
      attributes: {
        name: "Zero Rating Store",
        rating: 0,
      },
    };

    render(<StoreInfo store={mockStore} />);

    const stars = screen.getByText("Zero Rating Store").nextSibling;
    expect(stars).toHaveTextContent("☆☆☆☆☆");
  });
});
