import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Dropdown from "./Dropdown";

describe("Dropdown component", () => {
  const items = ["Option 1", "Option 2", "Option 3"];

  it("renders with default props", () => {
    const { getByLabelText, getByPlaceholderText, getByText } = render(
      <Dropdown
        label="Dropdown Label"
        labelVisibility="Visible"
        status="Unfilled"
        labelIconVisibility="Hidden"
        leftIconVisibility="Hidden"
        helperText="Helper Text"
        required="No"
        text="Select option"
        type="SingleNoIcon"
        activeItemIndex={-1}
        items={items}
      />
    );

    expect(getByLabelText("Dropdown Label")).toBeInTheDocument();
    expect(getByPlaceholderText("Select option")).toBeInTheDocument();
    expect(getByText("Helper Text")).toBeInTheDocument();
  });

  it("opens dropdown and selects an option", () => {
    const { getByPlaceholderText, getByText } = render(
      <Dropdown
        label="Dropdown Label"
        labelVisibility="Visible"
        status="Unfilled"
        helperText="Helper Text"
        text="Select option"
        type="SingleNoIcon"
        activeItemIndex={-1}
        items={items}
      />
    );

    const dropdownInput = getByPlaceholderText("Select option");
    fireEvent.click(dropdownInput);

    expect(getByText("Option 1")).toBeInTheDocument();
    expect(getByText("Option 2")).toBeInTheDocument();
    expect(getByText("Option 3")).toBeInTheDocument();

    fireEvent.click(getByText("Option 2"));

    expect(dropdownInput.value).toBe("Option 2");
  });

  it('clears selection on "Clear" button click', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <Dropdown
        label="Dropdown Label"
        labelVisibility="Visible"
        status="Unfilled"
        helperText="Helper Text"
        text="Select option"
        type="SingleNoIcon"
        activeItemIndex={-1}
        items={items}
      />
    );

    const dropdownInput = getByPlaceholderText("Select option");
    fireEvent.click(dropdownInput);

    fireEvent.click(getByText("Option 2"));
    expect(dropdownInput.value).toBe("Option 2");

    fireEvent.click(getByText("Clear"));

    expect(dropdownInput.value).toBe("");
  });

  it('disables dropdown when status is "Disabled"', () => {
    const { getByPlaceholderText } = render(
      <Dropdown
        label="Dropdown Label"
        labelVisibility="Visible"
        status="Disabled"
        helperText="Helper Text"
        text="Select option"
        type="SingleNoIcon"
        activeItemIndex={-1}
        items={items}
      />
    );

    const dropdownInput = getByPlaceholderText("Select option");
    expect(dropdownInput).toBeDisabled();
  });

  it('allows multi-selection in "Multi" type dropdown', () => {
    const { getByPlaceholderText, getByText } = render(
      <Dropdown
        label="Dropdown Label"
        labelVisibility="Visible"
        status="Unfilled"
        helperText="Helper Text"
        text="Select option"
        type="Multi"
        activeItemIndex={-1}
        items={items}
      />
    );

    const dropdownInput = getByPlaceholderText("Select option");
    fireEvent.click(dropdownInput);

    fireEvent.click(getByText("Option 1"));
    fireEvent.click(getByText("Option 3"));

    expect(dropdownInput.value).toBe("Option 1, Option 3");
  });
});
