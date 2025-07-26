import type { Meta, StoryObj } from "@storybook/react";

import {
  Text,
  type TextColorVariant,
  type TextSizeVariant,
  type TextWeightVariant,
} from "./index";

const textSizeOptions: TextSizeVariant[] = ["xs", "sm", "md", "lg"];
const textWeightOptions: TextWeightVariant[] = [
  "normal",
  "medium",
  "semibold",
  "bold",
];
const textColorOptions: TextColorVariant[] = [
  "black",
  "grey",
  "destructive",
  "white",
];

const meta: Meta<typeof Text> = {
  title: "Bricks/Text",
  component: Text,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    text: {
      control: "text",
      description: "Main text content",
    },
    subText: {
      control: "text",
      description: "Optional secondary text content",
    },
    size: {
      control: { type: "select" },
      options: textSizeOptions,
      description: "Size of the main text",
    },
    weight: {
      control: { type: "select" },
      options: textWeightOptions,
      description: "Font weight of the main text",
    },
    color: {
      control: { type: "select" },
      options: textColorOptions,
      description: "Color of the main text",
    },
    subTextSize: {
      control: { type: "select" },
      options: textSizeOptions,
      description: "Size of the sub text",
    },
    subTextWeight: {
      control: { type: "select" },
      options: textWeightOptions,
      description: "Font weight of the sub text",
    },
    subTextColor: {
      control: { type: "select" },
      options: textColorOptions,
      description: "Color of the sub text",
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Main Title",
  },
};

export const TextWithSubText: Story = {
  args: {
    text: "Main Text Only",
    subText: "Subtext",
    size: "sm",
    weight: "normal",
    color: "black",
  },
};

export const TextWithSubTextAlignment: Story = {
  args: {
    text: "Main Text",
    subText: "Subtext with right alignment",
    size: "md",
    subTextSize: "md",
    subTextAlignment: "right",
  },
};

export const ExtraSmallSize: Story = {
  args: {
    text: "Extra Small Text",
    subText: "Extra small subtext",
    size: "xs",
    subTextSize: "xs",
  },
};

export const MediumSize: Story = {
  args: {
    text: "Medium Text",
    subText: "Medium subtext",
    size: "md",
    subTextSize: "sm",
  },
};

export const LargeSize: Story = {
  args: {
    text: "Large Text",
    subText: "Large subtext",
    size: "lg",
    subTextSize: "md",
  },
};

export const MediumWeight: Story = {
  args: {
    text: "Medium Weight Text",
    subText: "Normal weight subtext",
    weight: "medium",
  },
};

export const SemiboldWeight: Story = {
  args: {
    text: "Semibold Text",
    subText: "Normal weight subtext",
    weight: "semibold",
  },
};

export const BoldWeight: Story = {
  args: {
    text: "Bold Text",
    subText: "Normal weight subtext",
    weight: "bold",
  },
};

export const GreyText: Story = {
  args: {
    text: "Grey Main Text",
    subText: "Black subtext",
    color: "grey",
    subTextColor: "black",
  },
};

export const CustomSubtext: Story = {
  args: {
    text: "Main Text",
    subText: "Custom Subtext",
    subTextSize: "sm",
    subTextWeight: "semibold",
    subTextColor: "black",
  },
};

export const LongText: Story = {
  args: {
    text: "This is a very long title that might wrap to multiple lines to demonstrate how the component handles long content",
    subText:
      "This is also a longer subtitle text that demonstrates how the component handles multiple lines of content in the subtitle area",
  },
};
