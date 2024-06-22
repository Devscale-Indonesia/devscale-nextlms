import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "../input";

const meta = {
  title: "Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextInput: Story = {
  args: {
    placeholder: "Input your text",
  },
};

export const PasswordInput: Story = {
  args: {
    placeholder: "Input your text",
    type: "password",
  },
};
