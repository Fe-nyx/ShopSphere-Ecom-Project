import { describe, it, expect } from "vitest";

import searchReducer, { updateSearchValue } from "../../redux/slices/searchSlice";

describe("searchSlice", () => {
  it("should return the initial state", () => {
    const state = searchReducer(undefined, { type: "unknown" });

    expect(state).toEqual({
      searchValue: "",
    });
  });

  it("should update the search value", () => {
    const state = {
      searchValue: "",
    };

    const newState = searchReducer(state, updateSearchValue("shirt"));

    expect(newState.searchValue).toBe("shirt");
  });

  it("should overwrite the previous search value", () => {
    const state = {
      searchValue: "laptop",
    };

    const newState = searchReducer(state, updateSearchValue("phone"));

    expect(newState.searchValue).toBe("phone");
  });
});
