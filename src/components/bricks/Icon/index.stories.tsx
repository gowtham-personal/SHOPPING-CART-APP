import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeftRight,
  Check,
  ChevronDown,
  FileText,
  Home,
  Info,
  Settings,
  Star,
  User,
  X,
} from 'lucide-react';

import { Text } from '../Text';
import { Icon } from './index';

const meta = {
  title: 'Bricks/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: { type: 'select' },
      options: [
        'AlertCircle',
        'AlertTriangle',
        'ArrowLeftRight',
        'Check',
        'ChevronDown',
        'FileText',
        'Home',
        'Info',
        'Settings',
        'Star',
        'User',
        'X',
      ],
      mapping: {
        AlertCircle,
        AlertTriangle,
        ArrowLeftRight,
        Check,
        ChevronDown,
        FileText,
        Home,
        Info,
        Settings,
        Star,
        User,
        X,
      },
      description: 'The Lucide icon to display',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'The size of the icon',
    },
    color: {
      control: { type: 'select' },
      options: ['grey', 'red', 'blue', 'green', 'white', 'grey-500', 'orange'],
      description: 'The color of the icon and background of wrapper (if used)',
    },
    type: {
      control: { type: 'select' },
      options: ['default', 'solid'],
      description: 'The type of icon style',
    },
    strokeWidth: {
      control: { type: 'number' },
      description: 'The stroke width of the icon',
    },
    wrapper: {
      control: { type: 'select' },
      options: ['circle', 'rounded', 'none'],
      description: 'The type of wrapper for the icon',
    },
    onClick: {
      action: 'clicked',
      description: 'Function to call when the icon is clicked',
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: AlertTriangle,
    size: 'md',
    color: 'grey',
    type: 'default',
    strokeWidth: 2,
  },
};

export const SizeVariants: Story = {
  args: {
    icon: Star,
  },
  render: () => (
    <div className="flex items-center gap-4">
      <Icon icon={Star} size="xs" />
      <Icon icon={Star} size="sm" />
      <Icon icon={Star} size="md" />
      <Icon icon={Star} size="lg" />
      <Icon icon={Star} size="xl" />
    </div>
  ),
};

export const ColorVariants: Story = {
  args: {
    icon: AlertCircle,
  },
  render: () => (
    <div className="flex items-center gap-4">
      <Icon icon={AlertCircle} color="grey" />
      <Icon icon={AlertCircle} color="red" />
      <Icon icon={AlertCircle} color="blue" />
      <Icon icon={AlertCircle} color="green" />
    </div>
  ),
};

export const TypeVariants: Story = {
  args: {
    icon: Settings,
  },
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <h3 className="text-sm font-medium w-20">Default:</h3>
        <Icon icon={Settings} type="default" color="grey" />
        <Icon icon={AlertCircle} type="default" color="red" />
        <Icon icon={AlertTriangle} type="default" color="green" />
        <Icon icon={Info} type="default" color="blue" />
        <Icon icon={Star} type="default" color="grey" />
      </div>
      <div className="flex items-center gap-4">
        <h3 className="text-sm font-medium w-20">Solid:</h3>
        <Icon icon={Settings} type="solid" color="grey" />
        <Icon icon={AlertCircle} type="solid" color="red" />
        <Icon icon={AlertTriangle} type="solid" color="green" />
        <Icon icon={Info} type="solid" color="blue" />
        <Icon icon={Star} type="solid" color="grey" />
      </div>
    </div>
  ),
};

export const StrokeWidthVariants: Story = {
  args: {
    icon: Settings,
  },
  render: () => (
    <div className="flex items-center gap-4">
      <Icon icon={Settings} strokeWidth={1} />
      <Icon icon={Settings} strokeWidth={1.5} />
      <Icon icon={Settings} strokeWidth={2} />
      <Icon icon={Settings} strokeWidth={2.5} />
      <Icon icon={Settings} strokeWidth={3} />
    </div>
  ),
};

export const CommonIcons: Story = {
  args: {
    icon: Home,
  },
  render: () => (
    <div className="grid grid-cols-5 gap-6">
      <Icon icon={Home} size="lg" />
      <Icon icon={User} size="lg" />
      <Icon icon={Settings} size="lg" />
      <Icon icon={FileText} size="lg" />
      <Icon icon={AlertCircle} size="lg" />
      <Icon icon={Check} size="lg" color="green" />
      <Icon icon={X} size="lg" color="red" />
      <Icon icon={Star} size="lg" color="grey" />
      <Icon icon={ChevronDown} size="lg" />
    </div>
  ),
};

export const CircleWrappersSizeVariants: Story = {
  args: {
    icon: ArrowLeftRight,
  },
  render: () => (
    <div className="flex items-center gap-6">
      <Icon icon={ArrowLeftRight} wrapper="circle" size="xs" color="grey" />
      <Icon icon={Check} color="green" wrapper="circle" size="sm" />
      <Icon icon={X} color="red" wrapper="circle" size="md" />
      <Icon icon={AlertCircle} color="red" wrapper="circle" size="lg" />
      <Icon icon={Info} color="blue" wrapper="circle" size="xl" />
    </div>
  ),
};

export const CircleWrappers: Story = {
  args: {
    icon: ArrowLeftRight,
  },
  render: () => (
    <div className="flex items-center gap-6">
      <Icon icon={ArrowLeftRight} wrapper="circle" color="grey" />
      <Icon icon={Check} color="green" wrapper="circle" />
      <Icon icon={X} color="red" wrapper="circle" />
      <Icon icon={AlertCircle} color="red" wrapper="circle" />
      <Icon icon={Info} color="blue" wrapper="circle" />
    </div>
  ),
};

export const RoundedWrappers: Story = {
  args: {
    icon: Settings,
  },
  render: () => (
    <div className="gap-6 space-y-6">
      <div className="flex flex-col gap-2 items-center">
        <Text text="Rounded-sm [6px radius]" size="sm" color="grey" />
        <div className="flex items-center gap-6">
          <Icon icon={Settings} wrapper="rounded-sm" color="grey" />
          <Icon icon={Home} color="grey" wrapper="rounded-sm" />
        </div>
      </div>

      <div className="flex flex-col gap-2 items-center">
        <Text text="Rounded-md [8px radius]" size="sm" color="grey" />
        <div className="flex items-center gap-6">
          <Icon icon={Settings} wrapper="rounded-md" color="grey" />
          <Icon icon={Home} color="grey" wrapper="rounded-md" />
        </div>
      </div>
    </div>
  ),
};

export const FigmaExamples: Story = {
  args: {
    icon: AlertCircle,
  },
  render: () => (
    <div className="flex items-center gap-6">
      {/* Grey circle example */}
      <Icon icon={ArrowLeftRight} size="md" color="grey" wrapper="circle" />

      {/* Red circle example */}
      <Icon icon={AlertCircle} size="md" color="red" wrapper="circle" />

      {/* Solid examples */}
      <Icon icon={Check} size="md" color="green" wrapper="circle" />
      <Icon icon={AlertCircle} size="md" color="red" type="solid" />
    </div>
  ),
};

export const WithClickHandler: Story = {
  args: {
    icon: Settings,
    size: 'md',
    color: 'blue',
    onClick: action('Icon clicked'),
  },
  render: args => (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <h3 className="text-sm font-medium w-20">Default:</h3>
        <Icon {...args} icon={Settings} />
      </div>
      <div className="flex items-center gap-4">
        <h3 className="text-sm font-medium w-20">With wrapper:</h3>
        <Icon {...args} icon={Settings} wrapper="circle" />
      </div>
    </div>
  ),
};
