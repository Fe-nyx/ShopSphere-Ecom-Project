import { describe, it, expect } from "vitest";

import { formatCategory } from "../utils/formatCategory";

describe("formatCategory", () => {
  it("should capitalize each word", () => {
    const category = "men's fashion";

    expect(formatCategory(category)).toBe("Men's Fashion");
  });

  it("should return an empty string when category is empty", () => {
    const category = "";
    expect(formatCategory(category)).toBe("");
  });

  it("should return an empty string when category is undefined", () => {
    const category = undefined;
    expect(formatCategory(category)).toBe("");
  });
});
