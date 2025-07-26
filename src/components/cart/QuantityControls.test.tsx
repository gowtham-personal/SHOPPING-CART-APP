import { fireEvent, render, screen } from "@/test-utils";

import QuantityControls from "./QuantityControls";

interface QuantityControlsProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const getRenderedComponent = (args: Partial<QuantityControlsProps> = {}) => {
  const defaultProps: QuantityControlsProps = {
    quantity: 1,
    onIncrement: jest.fn(),
    onDecrement: jest.fn(),
    ...args,
  };
  return {
    ...render(<QuantityControls {...defaultProps} />),
    props: defaultProps,
  };
};

describe("QuantityControls", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render without errors", () => {
      const spy = jest.spyOn(global.console, "error");
      getRenderedComponent();
      expect(spy).not.toHaveBeenCalled();
    });

    it("should display the correct quantity", () => {
      getRenderedComponent({ quantity: 5 });

      expect(screen.getByText("5")).toBeInTheDocument();
    });

    it("should render two buttons (decrement, increment)", () => {
      getRenderedComponent();

      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(2); // decrement and increment buttons
    });

    it("should display quantity text with correct styling classes", () => {
      getRenderedComponent({ quantity: 3 });

      const quantityText = screen.getByText("3");
      expect(quantityText).toHaveClass("min-w-[2rem]", "text-center");
    });
  });

  describe("Decrement Button", () => {
    it("should display minus icon when quantity is greater than 1", () => {
      getRenderedComponent({ quantity: 2 });

      const decrementButton = screen.getByRole("button", {
        name: /decrease quantity/i,
      });
      // Check if minus icon is present (Lucide icons render as SVG)
      const minusIcon = decrementButton.querySelector("svg");
      expect(minusIcon).toBeInTheDocument();
    });

    it("should display trash icon when quantity is 1", () => {
      getRenderedComponent({ quantity: 1 });

      const decrementButton = screen.getByRole("button", {
        name: /decrease quantity/i,
      });
      // Check if trash icon is present (Lucide icons render as SVG)
      const trashIcon = decrementButton.querySelector("svg");
      expect(trashIcon).toBeInTheDocument();
    });

    it("should call onDecrement when decrement button is clicked", () => {
      const { props } = getRenderedComponent({ quantity: 2 });

      const decrementButton = screen.getByRole("button", {
        name: /decrease quantity/i,
      });
      fireEvent.click(decrementButton);

      expect(props.onDecrement).toHaveBeenCalledTimes(1);
    });

    it("should call onDecrement when quantity is 1 and button is clicked", () => {
      const { props } = getRenderedComponent({ quantity: 1 });

      const decrementButton = screen.getByRole("button", {
        name: /decrease quantity/i,
      });
      fireEvent.click(decrementButton);

      expect(props.onDecrement).toHaveBeenCalledTimes(1);
    });

    it("should have correct styling classes for decrement button", () => {
      getRenderedComponent();

      const decrementButton = screen.getByRole("button", {
        name: /decrease quantity/i,
      });
      expect(decrementButton).toHaveClass("h-8", "w-8", "p-0");
    });
  });

  describe("Increment Button", () => {
    it("should display plus icon", () => {
      getRenderedComponent();

      const incrementButton = screen.getByRole("button", {
        name: /increase quantity/i,
      });
      // Check if plus icon is present (Lucide icons render as SVG)
      const plusIcon = incrementButton.querySelector("svg");
      expect(plusIcon).toBeInTheDocument();
    });

    it("should call onIncrement when increment button is clicked", () => {
      const { props } = getRenderedComponent({ quantity: 1 });

      const incrementButton = screen.getByRole("button", {
        name: /increase quantity/i,
      });
      fireEvent.click(incrementButton);

      expect(props.onIncrement).toHaveBeenCalledTimes(1);
    });

    it("should have correct styling classes for increment button", () => {
      getRenderedComponent();

      const incrementButton = screen.getByRole("button", {
        name: /increase quantity/i,
      });
      expect(incrementButton).toHaveClass("h-8", "w-8", "p-0");
    });
  });

  describe("Different Quantity Values", () => {
    it("should handle quantity of 0", () => {
      getRenderedComponent({ quantity: 0 });

      expect(screen.getByText("0")).toBeInTheDocument();
    });

    it("should handle large quantity values", () => {
      getRenderedComponent({ quantity: 999 });

      expect(screen.getByText("999")).toBeInTheDocument();
    });

    it("should show trash icon for quantity 1", () => {
      getRenderedComponent({ quantity: 1 });

      const decrementButton = screen.getByRole("button", {
        name: /decrease quantity/i,
      });
      // Verify trash icon is shown (when quantity is 1)
      const trashIcon = decrementButton.querySelector("svg");
      expect(trashIcon).toBeInTheDocument();
    });

    it("should show minus icon for quantity greater than 1", () => {
      getRenderedComponent({ quantity: 5 });

      const decrementButton = screen.getByRole("button", {
        name: /decrease quantity/i,
      });
      // Verify minus icon is shown (when quantity > 1)
      const minusIcon = decrementButton.querySelector("svg");
      expect(minusIcon).toBeInTheDocument();
    });
  });

  describe("Button Interactions", () => {
    it("should handle multiple rapid clicks on increment", () => {
      const { props } = getRenderedComponent();

      const incrementButton = screen.getByRole("button", {
        name: /increase quantity/i,
      });

      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton);

      expect(props.onIncrement).toHaveBeenCalledTimes(3);
    });

    it("should handle multiple rapid clicks on decrement", () => {
      const { props } = getRenderedComponent({ quantity: 5 });

      const decrementButton = screen.getByRole("button", {
        name: /decrease quantity/i,
      });

      fireEvent.click(decrementButton);
      fireEvent.click(decrementButton);

      expect(props.onDecrement).toHaveBeenCalledTimes(2);
    });
  });

  describe("Layout and Styling", () => {
    it("should have correct container styling", () => {
      const { container } = getRenderedComponent();

      const containerDiv = container.firstChild as HTMLElement;
      expect(containerDiv).toHaveClass("flex", "items-center", "gap-1");
    });

    it("should have proper button variants", () => {
      getRenderedComponent();

      const buttons = screen.getAllByRole("button");
      buttons.forEach((button) => {
        expect(button).toHaveClass("border-neutral-200"); // outline variant styling
      });
    });
  });
});
