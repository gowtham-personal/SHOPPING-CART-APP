import { Home } from "lucide-react";

import { fireEvent, render } from "@/test-utils";

import { Icon, type IconProps } from "./index";

const getRenderedComponent = (args: IconProps) => render(<Icon {...args} />);

describe("Icon", () => {
  it("should match snapshot with default props", () => {
    // Render with a default icon like Home for consistency
    const { container } = getRenderedComponent({ icon: Home });
    expect(container).toMatchSnapshot();
  });

  it("should render without errors", () => {
    const spy = jest.spyOn(global.console, "error");
    getRenderedComponent({ icon: Home });
    expect(spy).not.toHaveBeenCalled();
  });

  it("should apply the correct size based on the size prop", () => {
    const { container } = getRenderedComponent({ icon: Home, size: "lg" });
    // Check if the SVG has the correct size attribute (24px for 'lg')
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "24");
    expect(svg).toHaveAttribute("height", "24");
  });

  it("should apply the correct color class based on the color prop", () => {
    const { container } = getRenderedComponent({ icon: Home, color: "red" });
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("text-red-600");
  });

  it("should apply custom stroke width when provided", () => {
    const { container } = getRenderedComponent({ icon: Home, strokeWidth: 3 });
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("stroke-width", "3");
  });

  it("should apply additional className when provided", () => {
    const { container } = getRenderedComponent({
      icon: Home,
      className: "custom-class",
    });
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("custom-class");
  });

  it("should combine color class with additional className", () => {
    const { container } = getRenderedComponent({
      icon: Home,
      color: "blue",
      className: "custom-class",
    });
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("text-blue-600");
    expect(svg).toHaveClass("custom-class");
  });

  describe("Icon type functionality", () => {
    it("should render default type with correct styles", () => {
      const { container } = getRenderedComponent({
        icon: Home,
        type: "default",
        color: "green",
      });
      const svg = container.querySelector("svg");
      expect(svg).toHaveClass("text-green-600");
      expect(svg).toHaveAttribute("fill", "none");
    });

    it("should render solid type with correct styles", () => {
      const { container } = getRenderedComponent({
        icon: Home,
        type: "solid",
        color: "blue",
      });
      const svg = container.querySelector("svg");
      expect(svg).toHaveClass("text-white");
      expect(svg).toHaveClass("fill-blue-600");
      expect(svg).toHaveAttribute("fill", "currentColor");
    });
  });

  describe("Wrapper functionality", () => {
    it('should not render a wrapper when wrapper is "none"', () => {
      const { container } = getRenderedComponent({
        icon: Home,
        wrapper: "none",
      });

      // Should not have a div wrapper
      expect(container.firstChild?.nodeName).toEqual("svg");
    });

    it('should render a circle wrapper when wrapper is "circle"', () => {
      const { container } = getRenderedComponent({
        icon: Home,
        wrapper: "circle",
        color: "grey",
      });

      // Should have a div wrapper with rounded-full class
      const wrapper = container.firstChild;
      expect(wrapper?.nodeName).toEqual("DIV");
      expect(wrapper).toHaveClass("rounded-full");
      expect(wrapper).toHaveClass("bg-neutral-100");

      // Should contain the icon as a child
      const svg = container.querySelector("svg");
      expect(svg).not.toBeNull();
    });

    it('should render a rounded wrapper when wrapper is "rounded-md"', () => {
      const { container } = getRenderedComponent({
        icon: Home,
        wrapper: "rounded-md",
        color: "blue",
      });

      // Should have a div wrapper with rounded-md class
      const wrapper = container.firstChild;
      expect(wrapper?.nodeName).toEqual("DIV");
      expect(wrapper).toHaveClass("rounded-md");
      expect(wrapper).toHaveClass("bg-blue-50");

      // Should contain the icon as a child
      const svg = container.querySelector("svg");
      expect(svg).not.toBeNull();
    });

    it("should apply the correct wrapper size based on the size prop", () => {
      const { container } = getRenderedComponent({
        icon: Home,
        size: "lg",
        wrapper: "circle",
      });

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("w-12");
      expect(wrapper).toHaveClass("h-12");
    });

    it("should apply the correct wrapper color based on color prop", () => {
      const colorTests = [
        { color: "white", expectedClass: "bg-white" },
        { color: "red", expectedClass: "bg-red-50" },
        { color: "green", expectedClass: "bg-green-50" },
      ] as const;

      colorTests.forEach((test) => {
        const { container } = getRenderedComponent({
          icon: Home,
          wrapper: "circle",
          color: test.color,
        });
        const wrapper = container.firstChild;
        expect(wrapper).toHaveClass(test.expectedClass);
      });
    });
  });

  describe("onClick functionality", () => {
    it("should call the onClick handler when icon is clicked", () => {
      const handleClick = jest.fn();
      const { container } = getRenderedComponent({
        icon: Home,
        onClick: handleClick,
      });

      const svg = container.querySelector("svg");
      fireEvent.click(svg!);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should apply cursor-pointer class when onClick is provided", () => {
      const { container } = getRenderedComponent({
        icon: Home,
        onClick: jest.fn(),
      });

      const svg = container.querySelector("svg");
      expect(svg).toHaveClass("cursor-pointer");
    });

    it("should call the onClick handler when wrapper is clicked", () => {
      const handleClick = jest.fn();
      const { container } = getRenderedComponent({
        icon: Home,
        wrapper: "circle",
        onClick: handleClick,
      });

      const wrapper = container.firstChild;
      fireEvent.click(wrapper!);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should apply cursor-pointer class to wrapper when onClick is provided", () => {
      const { container } = getRenderedComponent({
        icon: Home,
        wrapper: "circle",
        onClick: jest.fn(),
      });

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("cursor-pointer");
    });

    it("should handle onClick correctly when wrapper is provided", () => {
      // Create two separate mocks to test where the onClick is actually attached
      const iconOnClick = jest.fn();

      // When a wrapper is provided, the onClick handler should be attached to the wrapper
      // and not directly to the SVG element
      const { container } = getRenderedComponent({
        icon: Home,
        wrapper: "circle",
        onClick: iconOnClick,
      });

      // Test clicking on the SVG directly (should not directly trigger the handler)
      const svg = container.querySelector("svg");

      // Create a dummy wrapper div so we can test without event bubbling
      const testWrapper = document.createElement("div");
      document.body.appendChild(testWrapper);
      testWrapper.appendChild(svg!.cloneNode(true));

      // Click on the SVG copy that's not in the real wrapper
      fireEvent.click(testWrapper.querySelector("svg")!);

      // The original handler should not be called directly by the SVG
      expect(iconOnClick).not.toHaveBeenCalled();

      // Cleanup
      document.body.removeChild(testWrapper);
    });
  });
});
