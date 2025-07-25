import "@testing-library/jest-dom";

import { render, screen } from "../../../test-utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from ".";

describe("Card", () => {
  it("should render the card component with default variant", () => {
    const { container } = render(
      <Card>
        <div>Card content</div>
      </Card>,
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass("border", "shadow-sm");
  });

  it("should render with elevated variant", () => {
    const { container } = render(
      <Card variant="elevated">
        <div>Card content</div>
      </Card>,
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass("border", "shadow-lg");
  });

  it("should render with outlined variant", () => {
    const { container } = render(
      <Card variant="outlined">
        <div>Card content</div>
      </Card>,
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass("border-2", "shadow-none");
  });

  it("should apply custom className", () => {
    const { container } = render(
      <Card className="custom-class">
        <div>Card content</div>
      </Card>,
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass("custom-class");
  });

  it("should forward ref correctly", () => {
    const ref = jest.fn();

    render(
      <Card ref={ref}>
        <div>Card content</div>
      </Card>,
    );

    expect(ref).toHaveBeenCalled();
  });
});

describe("Card compound components", () => {
  it("should render card with header using compound pattern", () => {
    render(
      <Card>
        <Card.Header>
          <Card.Title>Test Title</Card.Title>
          <Card.Description>Test Description</Card.Description>
        </Card.Header>
        <Card.Content>Content</Card.Content>
        <Card.Footer>Footer</Card.Footer>
      </Card>,
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("should render card with all components separately", () => {
    render(
      <div>
        <Card>Card</Card>
        <CardHeader>Header</CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
        <CardTitle>Title</CardTitle>
        <CardDescription>Description</CardDescription>
      </div>,
    );

    expect(screen.getByText("Card")).toBeInTheDocument();
    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
  });
});

describe("CardHeader", () => {
  it("should render with default styling", () => {
    render(<CardHeader>Header content</CardHeader>);

    const header = screen.getByText("Header content");
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass("pb-3");
  });

  it("should apply custom className", () => {
    render(<CardHeader className="custom-header">Header</CardHeader>);

    const header = screen.getByText("Header");
    expect(header).toHaveClass("custom-header", "pb-3");
  });
});

describe("CardContent", () => {
  it("should render with default styling", () => {
    render(<CardContent>Content</CardContent>);

    const content = screen.getByText("Content");
    expect(content).toBeInTheDocument();
    expect(content).toHaveClass("pt-0");
  });

  it("should apply custom className", () => {
    render(<CardContent className="custom-content">Content</CardContent>);

    const content = screen.getByText("Content");
    expect(content).toHaveClass("custom-content", "pt-0");
  });
});

describe("CardFooter", () => {
  it("should render with default styling", () => {
    render(<CardFooter>Footer</CardFooter>);

    const footer = screen.getByText("Footer");
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass("pt-3");
  });

  it("should apply custom className", () => {
    render(<CardFooter className="custom-footer">Footer</CardFooter>);

    const footer = screen.getByText("Footer");
    expect(footer).toHaveClass("custom-footer", "pt-3");
  });
});

describe("CardTitle", () => {
  it("should render as h3 element with correct styling", () => {
    render(<CardTitle>Title</CardTitle>);

    const title = screen.getByRole("heading", { level: 3 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Title");
    expect(title).toHaveClass("text-lg", "font-semibold");
  });

  it("should apply custom className", () => {
    render(<CardTitle className="custom-title">Title</CardTitle>);

    const title = screen.getByRole("heading", { level: 3 });
    expect(title).toHaveClass("custom-title", "text-lg", "font-semibold");
  });
});

describe("CardDescription", () => {
  it("should render with correct styling", () => {
    render(<CardDescription>Description</CardDescription>);

    const description = screen.getByText("Description");
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass("text-sm", "text-gray-600");
  });

  it("should apply custom className", () => {
    render(
      <CardDescription className="custom-desc">Description</CardDescription>,
    );

    const description = screen.getByText("Description");
    expect(description).toHaveClass("custom-desc", "text-sm", "text-gray-600");
  });
});
