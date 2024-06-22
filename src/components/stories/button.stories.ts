import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../button";

const meta = {
  title: "Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "danger"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    children: { control: "text" },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonPrimary: Story = {
  args: {
    variant: "primary",
    children: "Create course",
  },
};

export const ButtonSecondary: Story = {
  args: {
    variant: "secondary",
    children: "Create course",
  },
};

export const ButtonDanger: Story = {
  args: {
    variant: "danger",
    children: "Create course",
  },
};
