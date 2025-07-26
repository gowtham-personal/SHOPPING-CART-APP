import { render, screen } from "@/test-utils";

import { Button, type ButtonProps } from "./index";

const getRenderedComponent = (args: Partial<ButtonProps> = {}) => {
  const defaultProps: ButtonProps = {
    text: "Test Button",
    ...args,
  };
  return render(<Button {...defaultProps} />);
};

describe("Button", () => {
  it("should match snapshot with default props", () => {
    const { container } = getRenderedComponent(); // Renders with default text
    expect(container).toMatchSnapshot();
  });

  it("should render without errors", () => {
    const spy = jest.spyOn(global.console, "error");
    getRenderedComponent();
    expect(spy).not.toHaveBeenCalled();
  });

  it("should render with the correct text", () => {
    getRenderedComponent({ text: "Click me" });
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("should render with the correct variant and color classes", () => {
    getRenderedComponent({ variant: "outline", color: "grey" });
    const button = screen.getByRole("button");
    expect(button).toHaveClass("border-neutral-200");
    expect(button).toHaveClass("text-neutral-600");
  });

  it("should apply custom className when provided", () => {
    getRenderedComponent({ className: "custom-class" });
    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });

  it("should render with left icon when provided", () => {
    getRenderedComponent({
      leftIcon: <span aria-hidden="true">left-icon</span>,
    });

    const button = screen.getByRole("button");
    // Check for text content that includes the icon text
    expect(button).toHaveTextContent("left-icon");
    // Verify icon appears before the button text
    expect(button.textContent).toMatch(/left-icon.*Test Button/);
  });

  it("should render with right icon when provided", () => {
    getRenderedComponent({
      rightIcon: <span aria-hidden="true">right-icon</span>,
    });

    const button = screen.getByRole("button");
    // Check for text content that includes the icon text
    expect(button).toHaveTextContent("right-icon");
    // Verify icon appears after the button text
    expect(button.textContent).toMatch(/Test Button.*right-icon/);
  });

  it("should be disabled when disabled prop is true", () => {
    getRenderedComponent({ disabled: true });
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("should apply blue color variant correctly", () => {
    getRenderedComponent({ variant: "solid", color: "blue" });
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-sky-600/90");
    expect(button).toHaveClass("text-white");
  });

  it("should apply red color variant correctly", () => {
    getRenderedComponent({ variant: "solid", color: "red" });
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-red-600");
    expect(button).toHaveClass("text-white");
  });

  it("should apply transparent type correctly", () => {
    getRenderedComponent({ variant: "transparent", color: "grey" });
    const button = screen.getByRole("button");
    expect(button).toHaveClass("text-neutral-600");
    expect(button).toHaveClass("hover:bg-neutral-50");
  });
});
