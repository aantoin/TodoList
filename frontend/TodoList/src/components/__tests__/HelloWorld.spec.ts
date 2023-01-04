import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";

describe("HelloWorld", () => {
  it("success test", () => {
    expect(true).toBe(true);
  });
  it("fail test", () => {
    expect(false).toBe(true);
  });
});
