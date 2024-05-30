import React from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Store from "./Store";
import { COUNTRIES, BOOKS, AUTHORS } from "../../constants";

const mockStore = {
  attributes: {
    name: "Mock Store",
    storeImage: "mock-image-url",
    establishmentDate: "01/01/2022",
    website: "www.mockstore.com",
  },
  relationships: {
    countries: { data: { id: 1 } },
    books: {
      data: [
        { id: 1, name: "Book 1", author: "Author 1" },
        { id: 2, name: "Book 2", author: "Author 2" },
      ],
    },
  },
};

const mockIncluded = [
  { type: COUNTRIES, id: 1, attributes: { code: "US" } },
  {
    type: BOOKS,
    id: 1,
    attributes: { name: "Book 1" },
    relationships: { author: { data: { id: 1 } } },
  },
  {
    type: BOOKS,
    id: 2,
    attributes: { name: "Book 2" },
    relationships: { author: { data: { id: 2 } } },
  },
  { type: AUTHORS, id: 1, attributes: { fullName: "Author 1" } },
  { type: AUTHORS, id: 2, attributes: { fullName: "Author 2" } },
];

jest.mock("../../utils", () => ({
  sanitizeUrl: jest.fn((url) => url),
  getFlagUrl: jest.fn(() => Promise.resolve()),
}));

describe("Store Component", () => {
  test("renders store details correctly", async () => {
    const { findByText, getByAltText, getByText } = render(
      <Store store={mockStore} included={mockIncluded} />
    );

    const storeImage = getByAltText("Mock Store");
    expect(storeImage).toBeInTheDocument();
    expect(storeImage).toHaveAttribute("src", "mock-image-url");

    expect(screen.getByText("Best-selling books")).toBeInTheDocument();

    const flagImage = await waitFor(() => screen.getByAltText("US"));
    expect(flagImage).toBeInTheDocument();

    expect(getByText("Mock Store")).toBeInTheDocument();

    const storeFooter = screen
      .getByText(/01\/01\/2022/)
      .closest(".store-footer");
    expect(storeFooter).toBeInTheDocument();

    const establishmentDateElement =
      within(storeFooter).getByText("01/01/2022 -");
    expect(establishmentDateElement).toBeInTheDocument();

    const websiteLink = within(storeFooter).getByRole("link", {
      href: "http://www.mockstore.com",
    });
    expect(websiteLink).toBeInTheDocument();
  });

  test('displays "No data available" message when there are no books', async () => {
    const mockStoreNoBooks = {
      ...mockStore,
      relationships: { ...mockStore.relationships, books: { data: [] } },
    };
    const { findByText } = render(
      <Store store={mockStoreNoBooks} included={mockIncluded} />
    );
    const noDataMessage = await findByText("No data available");
    expect(noDataMessage).toBeInTheDocument();
  });
});
