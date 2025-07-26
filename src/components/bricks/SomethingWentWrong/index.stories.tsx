import type { Meta, StoryObj } from "@storybook/react";

import SomethingWentWrong from "./index";

const meta = {
  title: "Bricks/SomethingWentWrong",
  component: SomethingWentWrong,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    // No props to control since component doesn't accept any
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="p-20">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SomethingWentWrong>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const InContainer: Story = {
  args: {},
  render: () => (
    <div className="max-w-md mx-auto border border-gray-200 rounded-lg">
      <SomethingWentWrong />
    </div>
  ),
};

export const FullPage: Story = {
  args: {},
  render: () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <SomethingWentWrong />
    </div>
  ),
};

export const ErrorState: Story = {
  args: {},
  render: () => (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-4">Error State Examples</h2>
      <div className="border border-gray-200 rounded-lg">
        <SomethingWentWrong />
      </div>
      <div className="bg-red-50 border border-red-200 rounded-lg">
        <SomethingWentWrong />
      </div>
    </div>
  ),
};
