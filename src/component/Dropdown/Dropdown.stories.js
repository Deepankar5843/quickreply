import React from "react";
import { useArgs } from "@storybook/preview-api";
import Dropdown from "./Dropdown";

export default {
  title: "Components/Dropdown",
  component: Dropdown,
  argTypes: {
    label: { control: "text" },
    labelVisibility: { control: "radio", options: ["Visible", "Hidden"] },
    status: {
      control: "radio",
      options: ["Unfilled", "Filled", "Disabled", "Error"],
    },
    labelIconVisibility: { control: "radio", options: ["Visible", "Hidden"] },
    leftIconVisibility: { control: "radio", options: ["Visible", "Hidden"] },
    helperText: { control: "text" },
    required: { control: "radio", options: ["Yes", "No"] },
    text: { control: "text" },
    type: {
      control: "radio",
      options: ["SingleNoIcon", "SingleRadio", "Multi"],
    },
    activeItemIndex: { control: "number" },
    items: { control: "array" },
    onSelectItem: { action: "selected" },
  },
};

const Template = (args) => {
  const [_, updateArgs] = useArgs();

  const handleSelectItem = (index) => {
    updateArgs({ activeItemIndex: index });
    args.onSelectItem(index);
  };

  return (
    <>
      <Dropdown {...args} onSelectItem={handleSelectItem} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Dropdown Label",
  labelVisibility: "Visible",
  status: "Unfilled",
  labelIconVisibility: "Hidden",
  leftIconVisibility: "Hidden",
  helperText: "Helper Text",
  required: "No",
  text: "Select option",
  type: "SingleNoIcon",
  activeItemIndex: -1,
  items: ["Option 1", "Option 2", "Option 3"],
};
