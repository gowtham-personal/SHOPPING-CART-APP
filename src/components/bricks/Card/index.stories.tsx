import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { CreditCard, ShoppingCart, User } from "lucide-react";

import { Button } from "../Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from ".";

const meta: Meta<typeof Card> = {
  title: "Bricks/Card",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible card component with compound pattern support for headers, content, and footers.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "elevated", "outlined"],
      description: "Visual variant of the card",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
          <CardDescription>
            This is a basic card with default styling.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the main content area of the card.</p>
        </CardContent>
        <CardFooter>
          <Button text="Action" onClick={action("button-clicked")} />
        </CardFooter>
      </>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: "elevated",
    children: (
      <>
        <CardHeader>
          <CardTitle>Elevated Card</CardTitle>
          <CardDescription>
            This card has enhanced shadow for emphasis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Perfect for highlighting important content or call-to-action cards.
          </p>
        </CardContent>
      </>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    children: (
      <>
        <CardHeader>
          <CardTitle>Outlined Card</CardTitle>
          <CardDescription>
            This card uses a prominent border instead of shadow.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Great for forms or when you need clear visual separation.</p>
        </CardContent>
      </>
    ),
  },
};

export const CompoundComponents: Story = {
  render: () => (
    <Card>
      <Card.Header>
        <Card.Title>Compound Pattern</Card.Title>
        <Card.Description>
          Using the compound component pattern.
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <p>
          You can use Card.Header, Card.Content, and Card.Footer for
          convenience.
        </p>
      </Card.Content>
      <Card.Footer>
        <Button text="Compound Action" onClick={action("compound-action")} />
      </Card.Footer>
    </Card>
  ),
};

export const ProductCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center">
          <ShoppingCart className="h-10 w-10 text-blue-600" />
        </div>
        <CardTitle>Premium Product</CardTitle>
        <CardDescription>A high-quality product for your needs</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <div className="text-3xl font-bold text-blue-600 mb-2">$99.99</div>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>✓ Free shipping</li>
          <li>✓ 30-day returns</li>
          <li>✓ 1-year warranty</li>
        </ul>
      </CardContent>
      <CardFooter className="flex-col space-y-2">
        <Button
          text="Add to Cart"
          variant="solid"
          color="blue"
          onClick={action("add-to-cart")}
        />
        <Button
          text="Learn More"
          variant="outline"
          color="blue"
          onClick={action("learn-more")}
        />
      </CardFooter>
    </Card>
  ),
};

export const UserProfile: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center">
          <User className="h-8 w-8 text-gray-600" />
        </div>
        <CardTitle>John Doe</CardTitle>
        <CardDescription>Senior Software Engineer</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Department:</span>
            <span>Engineering</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Location:</span>
            <span>San Francisco, CA</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Experience:</span>
            <span>5+ years</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          text="View Profile"
          variant="outline"
          className="w-full"
          onClick={action("view-profile")}
        />
      </CardFooter>
    </Card>
  ),
};

export const PaymentCard: Story = {
  render: () => (
    <Card variant="outlined" className="w-80">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="mr-2 h-5 w-5" />
          Payment Method
        </CardTitle>
        <CardDescription>Manage your payment information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
            </label>
            <div className="text-sm text-gray-600">**** **** **** 1234</div>
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expires
              </label>
              <div className="text-sm text-gray-600">12/25</div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <div className="text-sm text-gray-600">***</div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          text="Update Payment"
          variant="solid"
          color="blue"
          onClick={action("update-payment")}
        />
      </CardFooter>
    </Card>
  ),
};

export const MinimalCard: Story = {
  args: {
    className: "p-6",
    children: (
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Simple Card</h3>
        <p className="text-gray-600">
          Just a simple card without compound components.
        </p>
      </div>
    ),
  },
};
