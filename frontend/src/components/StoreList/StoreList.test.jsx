import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import StoreList from "./StoreList";
import * as api from "../../api";

jest.mock("../../api");

describe("StoreList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn();
  });

  test("renders StoreList component without crashing", () => {
    render(<StoreList />);
  });

  test("handles errors gracefully", async () => {
    const mockStores = {
      data: [
        { id: 1, name: "Store 1" },
        { id: 2, name: "Store 2" },
      ],
      included: [],
    };

    api.getStores.mockResolvedValue(mockStores);

    api.getStores.mockRejectedValue(new Error("Failed to fetch"));

    render(<StoreList />);

    await waitFor(() => {
      expect(api.getStores).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith(
        "Error fetching stores:",
        expect.any(Error)
      );
    });
  });
});
