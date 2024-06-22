import type { Meta, StoryObj } from "@storybook/react";

import { Textarea } from "../textarea";

const meta = {
  title: "Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const TextInput: Story = {
  args: {
    placeholder: "Input your text",
  },
};
