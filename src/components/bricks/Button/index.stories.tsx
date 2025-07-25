import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { ChevronRight, Download, Filter } from "lucide-react";

import { Icon } from "@/components/bricks/Icon";

import { Button, type ButtonColorVariant } from "./index";

// Extract color variants as a typed array
const BUTTON_COLOR_VARIANTS: ButtonColorVariant[] = [
  "blue",
  "blue-500",
  "grey",
  "red",
];

const meta = {
  title: "Bricks/Button",
  component: Button,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    text: {
      control: "text",
      description: "Button content",
    },
    type: {
      control: "select",
      options: ["solid", "outline", "transparent"],
      description: "Button type style",
    },
    color: {
      control: "select",
      options: BUTTON_COLOR_VARIANTS,
      description: "Button color variant",
    },
    onClick: {
      action: "clicked",
      description: "Callback fired when the button is clicked",
    },
  },
  decorators: [
    (Story) => (
      <div className="p-20">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Default",
    variant: "outline",
    color: "grey",
  },
};

export const ColorWithSolidVariants: Story = {
  render: () => {
    const colors: ButtonColorVariant[] = ["blue", "blue-500", "grey", "red"];

    return (
      <div className="grid grid-cols-2 gap-3">
        {colors.map((color) => (
          <Button
            key={color}
            variant="solid"
            text={`${color} Color`}
            color={color}
          />
        ))}
      </div>
    );
  },
};

export const ColorWithOutlineVariants: Story = {
  render: () => {
    const colors: ButtonColorVariant[] = ["blue", "blue-500", "grey", "red"];

    return (
      <div className="grid grid-cols-2 gap-3">
        {colors.map((color) => (
          <Button
            key={color}
            variant="outline"
            text={`${color} Color`}
            color={color}
          />
        ))}
      </div>
    );
  },
};

export const ColorWithTransparentVariants: Story = {
  render: () => {
    const colors: ButtonColorVariant[] = ["blue", "blue-500", "grey", "red"];

    return (
      <div className="grid grid-cols-2 gap-3">
        {colors.map((color) => (
          <Button
            key={color}
            variant="transparent"
            text={`${color} Color`}
            color={color}
          />
        ))}
      </div>
    );
  },
};

export const ColorWithLinkVariants: Story = {
  render: () => {
    const colors: ButtonColorVariant[] = ["blue", "blue-500", "grey", "red"];

    return (
      <div className="grid grid-cols-2 gap-3">
        {colors.map((color) => (
          <Button
            key={color}
            variant="link"
            text={`${color} Color`}
            color={color}
          />
        ))}
      </div>
    );
  },
};

export const SizeVariants: Story = {
  render: () => {
    return (
      <div className="grid grid-cols-2 gap-3">
        <Button
          key="sm"
          variant="solid"
          text="sm Size [36px height]"
          size="sm"
          color="blue"
        />
        <Button
          key="md"
          variant="solid"
          text="md Size [40px height]"
          size="md"
          color="grey"
        />
      </div>
    );
  },
};

export const WithLeftIcon: Story = {
  args: {
    text: "Filter",
    variant: "outline",
    color: "grey",
    leftIcon: <Icon icon={Filter} size="sm" />,
  },
};
export const WithRightIcon: Story = {
  args: {
    text: "Next",
    variant: "solid",
    color: "blue",
    rightIcon: <Icon icon={ChevronRight} size="sm" color="white" />,
  },
};

export const WithBothIcons: Story = {
  args: {
    text: "Download",
    variant: "solid",
    color: "grey",
    leftIcon: <Icon icon={Download} size="sm" />,
    rightIcon: <Icon icon={ChevronRight} size="sm" />,
  },
};

export const Disabled: Story = {
  args: {
    text: "Disabled",
    variant: "solid",
    color: "blue",
    disabled: true,
  },
};

export const WithAction: Story = {
  args: {
    text: "Click me",
    variant: "solid",
    color: "blue",
    onClick: action("button-click"),
  },
};
