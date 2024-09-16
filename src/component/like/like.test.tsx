import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import Like from "./index";

jest.mock("../../actions/favourite", () => ({
  setFavourite: "setFavourite",
}));

describe("Like", () => {
  it("isLiked:true", () => {
    const { getByText } = render(
      <Like id="1" isLiked={true} artistName="Adele" />
    );

    expect(getByText("Remove")).toBeInTheDocument();
  });

  it("isLiked:false", () => {
    const { getByText } = render(
      <Like id="1" isLiked={false} artistName="Adele" />
    );
    expect(getByText("Add as favourite")).toBeInTheDocument();
  });
});
