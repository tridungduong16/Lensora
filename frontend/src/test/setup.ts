import "@testing-library/jest-dom/vitest";
import { createElement } from "react";
import { vi } from "vitest";

vi.mock("next/image", () => ({
  default: ({
    priority: _priority,
    placeholder: _placeholder,
    ...props
  }: Record<string, unknown>) => createElement("img", props),
}));
