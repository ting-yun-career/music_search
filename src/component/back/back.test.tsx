import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import Back from "./index";

test("renders Back component", () => {
  const { getByText } = render(<Back />);
  expect(getByText("arrow_back")).toBeInTheDocument();
  expect(getByText("Back")).toBeInTheDocument();
});
