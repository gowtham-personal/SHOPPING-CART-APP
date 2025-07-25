import type { Meta, StoryObj } from '@storybook/react';

import { StarRating } from './index';

const meta = {
  title: 'Bricks/StarRating',
  component: StarRating,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    rating: {
      control: { type: 'number', min: 0, max: 5, step: 0.1 },
      description: 'Rating value from 0 to 5',
    },
    showCount: {
      control: 'boolean',
      description: 'Whether to show the review count',
    },
    count: {
      control: { type: 'number', min: 0 },
      description: 'Number of reviews',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="p-20">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StarRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rating: 3.5,
  },
};

export const FullRating: Story = {
  args: {
    rating: 5,
  },
};

export const NoRating: Story = {
  args: {
    rating: 0,
  },
};

export const WithReviewCount: Story = {
  args: {
    rating: 4.2,
    showCount: true,
    count: 248,
  },
};

export const SingleReview: Story = {
  args: {
    rating: 5,
    showCount: true,
    count: 1,
  },
};

export const RatingVariations: Story = {
  args: {
    rating: 3.5,
  },
  render: () => {
    const ratings = [1, 1.5, 2, 2.3, 3, 3.7, 4, 4.5, 5];

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-4">Different Rating Values</h3>
        {ratings.map(rating => (
          <div key={rating} className="flex items-center gap-4">
            <StarRating rating={rating} />
            <span className="text-sm text-gray-600">{rating} stars</span>
          </div>
        ))}
      </div>
    );
  },
};

export const WithAndWithoutCounts: Story = {
  args: {
    rating: 3.5,
  },
  render: () => {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Without Review Counts</h3>
          <div className="space-y-3">
            <StarRating rating={4.5} />
            <StarRating rating={3.2} />
            <StarRating rating={2.8} />
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">With Review Counts</h3>
          <div className="space-y-3">
            <StarRating rating={4.5} showCount={true} count={1247} />
            <StarRating rating={3.2} showCount={true} count={89} />
            <StarRating rating={2.8} showCount={true} count={15} />
          </div>
        </div>
      </div>
    );
  },
};

export const CustomStyling: Story = {
  args: {
    rating: 3.5,
  },
  render: () => {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-gray-100 rounded-lg">
          <StarRating rating={4.3} className="mb-2" />
          <p className="text-sm text-gray-600">Default styling</p>
        </div>
        
        <div className="p-4 bg-blue-50 rounded-lg">
          <StarRating rating={4.3} showCount={true} count={156} className="mb-2" />
          <p className="text-sm text-gray-600">With review count</p>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg">
          <StarRating rating={4.3} className="scale-125 mb-2" />
          <p className="text-sm text-gray-600">Scaled up with CSS</p>
        </div>
      </div>
    );
  },
};

export const ProductShowcase: Story = {
  args: {
    rating: 3.5,
  },
  render: () => {
    const products = [
      { name: 'Premium Headphones', rating: 4.8, reviews: 324 },
      { name: 'Wireless Mouse', rating: 4.2, reviews: 89 },
      { name: 'Mechanical Keyboard', rating: 4.6, reviews: 156 },
      { name: 'USB-C Hub', rating: 3.9, reviews: 42 },
      { name: 'Monitor Stand', rating: 4.1, reviews: 78 },
    ];

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-4">Product Ratings Example</h3>
        {products.map(product => (
          <div key={product.name} className="flex items-center justify-between p-3 border rounded-lg">
            <span className="font-medium">{product.name}</span>
            <StarRating rating={product.rating} showCount={true} count={product.reviews} />
          </div>
        ))}
      </div>
    );
  },
};

export const InteractivePlayground: Story = {
  args: {
    rating: 3.7,
    showCount: true,
    count: 127,
    className: '',
  },
}; 