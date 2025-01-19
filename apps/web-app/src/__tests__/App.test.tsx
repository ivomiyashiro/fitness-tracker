import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import App from "@/components/app";

describe("App", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });
});
