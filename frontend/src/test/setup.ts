import "@testing-library/jest-dom/vitest";
import { createElement } from "react";
import { vi } from "vitest";

vi.mock("next/image", () => ({
  default: ({
    priority,
    placeholder: _placeholder,
    ...props
  }: Record<string, unknown>) =>
    createElement("img", {
      ...props,
      "data-priority": priority ? "true" : undefined,
    }),
}));

vi.mock("next/font/google", () => ({
  Be_Vietnam_Pro: () => ({ variable: "font-ui-variable" }),
  Lora: () => ({ variable: "font-editorial-variable" }),
}));
