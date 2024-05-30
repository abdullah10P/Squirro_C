import React from "react";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import StoreFooter from "./StoreFooter";
import { sanitizeUrl } from "../../utils";

jest.mock("../../utils", () => ({
  sanitizeUrl: jest.fn((url) => url),
}));

describe("StoreFooter Component", () => {
  const mockProps = {
    establishmentDate: "2020-01-15T00:00:00Z",
    website: "example.com",
    flagUrl: "https://example.com/flag.png",
    countryCode: "GB",
  };

  test("renders establishment date and website correctly", () => {
    render(<StoreFooter {...mockProps} />);

    const storeFooter = screen
      .getByText(/15\/01\/2020/)
      .closest(".store-footer");
    expect(storeFooter).toBeInTheDocument();

    const establishmentDateElement =
      within(storeFooter).getByText("15/01/2020 -");
    expect(establishmentDateElement).toBeInTheDocument();

    const websiteLink = within(storeFooter).getByRole("link", {
      href: "http://www.example.com",
    });
    expect(websiteLink).toBeInTheDocument();
    expect(websiteLink).toHaveAttribute("target", "_blank");
    expect(websiteLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("renders flag image with correct src and alt attributes", () => {
    render(<StoreFooter {...mockProps} />);

    const flagImage = screen.getByAltText("GB");
    expect(flagImage).toBeInTheDocument();
    expect(flagImage).toHaveAttribute("src", "https://example.com/flag.png");
  });

  test("sanitizes the website URL", () => {
    render(<StoreFooter {...mockProps} />);

    expect(sanitizeUrl).toHaveBeenCalledWith("example.com");
  });
});
