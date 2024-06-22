import type { Meta, StoryObj } from "@storybook/react";

import { Card as CardComponent } from "../card";

const meta = {
  title: "Card",
  component: CardComponent,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: { control: "text" },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CardComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Card: Story = {
  args: {
    children: "It works!",
  },
};
