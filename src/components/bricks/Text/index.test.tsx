import { render, screen } from '@/test-utils';

import { Text } from './index';

describe('Text', () => {
  it('should match snapshot with default props', () => {
    const { container } = render(<Text text="Snapshot Text" />);
    expect(container).toMatchSnapshot();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with default props', () => {
    render(<Text text="Main Text" />);

    const mainText = screen.getByText('Main Text');
    expect(mainText).toBeDefined();
    // No subtext should be present
    expect(screen.queryByText('Subtext')).toBeNull();
  });

  it('should render with subtext', () => {
    render(<Text text="Main Text" subText="Subtext" />);

    const mainText = screen.getByText('Main Text');
    const subText = screen.getByText('Subtext');
    expect(mainText).toBeDefined();
    expect(subText).toBeDefined();
  });

  it('should render correct size classes for main text', () => {
    const { rerender } = render(<Text text="Size XS" size="xs" />);
    let mainText = screen.getByText('Size XS');
    expect(mainText).toHaveClass('text-xs');

    rerender(<Text text="Size SM" size="sm" />);
    mainText = screen.getByText('Size SM');
    expect(mainText).toHaveClass('text-sm');

    rerender(<Text text="Size MD" size="md" />);
    mainText = screen.getByText('Size MD');
    expect(mainText).toHaveClass('text-base');

    rerender(<Text text="Size LG" size="lg" />);
    mainText = screen.getByText('Size LG');
    expect(mainText).toHaveClass('text-lg');
  });

  it('should render correct weight classes for main text', () => {
    const { rerender } = render(<Text text="Normal Weight" weight="normal" />);
    let mainText = screen.getByText('Normal Weight');
    expect(mainText).toHaveClass('font-normal');

    rerender(<Text text="Medium Weight" weight="medium" />);
    mainText = screen.getByText('Medium Weight');
    expect(mainText).toHaveClass('font-medium');

    rerender(<Text text="Semibold Weight" weight="semibold" />);
    mainText = screen.getByText('Semibold Weight');
    expect(mainText).toHaveClass('font-semibold');

    rerender(<Text text="Bold Weight" weight="bold" />);
    mainText = screen.getByText('Bold Weight');
    expect(mainText).toHaveClass('font-bold');
  });

  it('should render correct color classes for main text', () => {
    const { rerender } = render(<Text text="Black Text" color="black" />);
    let mainText = screen.getByText('Black Text');
    expect(mainText).toHaveClass('text-neutral-950');

    rerender(<Text text="Gray Text" color="grey" />);
    mainText = screen.getByText('Gray Text');
    expect(mainText).toHaveClass('text-neutral-600');
  });

  it('should render correct size classes for subtext', () => {
    const { rerender } = render(<Text text="Main" subText="Size XS" subTextSize="xs" />);
    let subText = screen.getByText('Size XS');
    expect(subText).toHaveClass('text-xs');

    rerender(<Text text="Main" subText="Size SM" subTextSize="sm" />);
    subText = screen.getByText('Size SM');
    expect(subText).toHaveClass('text-sm');

    rerender(<Text text="Main" subText="Size MD" subTextSize="md" />);
    subText = screen.getByText('Size MD');
    expect(subText).toHaveClass('text-base');

    rerender(<Text text="Main" subText="Size LG" subTextSize="lg" />);
    subText = screen.getByText('Size LG');
    expect(subText).toHaveClass('text-lg');
  });

  it('should render correct weight classes for subtext', () => {
    const { rerender } = render(
      <Text text="Main" subText="Normal Weight" subTextWeight="normal" />
    );
    let subText = screen.getByText('Normal Weight');
    expect(subText).toHaveClass('font-normal');

    rerender(<Text text="Main" subText="Medium Weight" subTextWeight="medium" />);
    subText = screen.getByText('Medium Weight');
    expect(subText).toHaveClass('font-medium');

    rerender(<Text text="Main" subText="Semibold Weight" subTextWeight="semibold" />);
    subText = screen.getByText('Semibold Weight');
    expect(subText).toHaveClass('font-semibold');

    rerender(<Text text="Main" subText="Bold Weight" subTextWeight="bold" />);
    subText = screen.getByText('Bold Weight');
    expect(subText).toHaveClass('font-bold');
  });

  it('should render correct color classes for subtext', () => {
    const { rerender } = render(<Text text="Main" subText="Black Text" subTextColor="black" />);
    let subText = screen.getByText('Black Text');
    expect(subText).toHaveClass('text-neutral-950');

    rerender(<Text text="Main" subText="Gray Text" subTextColor="grey" />);
    subText = screen.getByText('Gray Text');
    expect(subText).toHaveClass('text-neutral-600');
  });

  it('should render custom className to main text', () => {
    render(<Text text="Main Text" className="custom-class" />);
    const mainText = screen.getByText('Main Text');
    expect(mainText).toHaveClass('custom-class');
  });

  it('should render outer container with flex flex-col class, when subText is present', () => {
    render(<Text text="Main Text" subText="Subtext" />);
    const mainText = screen.getByText('Main Text');
    const container = mainText.parentElement;
    expect(container).toHaveClass('flex flex-col');
  });

  it('should render all classnames correctly for main text', () => {
    render(
      <Text text="Styled Text" size="lg" weight="bold" color="black" className="custom-class" />
    );

    const mainText = screen.getByText('Styled Text');

    expect(mainText).toHaveClass('text-lg');
    expect(mainText).toHaveClass('font-bold');
    expect(mainText).toHaveClass('text-neutral-950');
    expect(mainText).toHaveClass('custom-class');
  });

  it('should render all classnames correctly for subtext', () => {
    render(
      <Text
        text="Main"
        subText="Styled Subtext"
        subTextSize="md"
        subTextWeight="semibold"
        subTextColor="black"
      />
    );

    const subText = screen.getByText('Styled Subtext');

    expect(subText).toHaveClass('text-base');
    expect(subText).toHaveClass('font-semibold');
    expect(subText).toHaveClass('text-neutral-950');
  });

  it('should render outer container with flex flex-row class, when subTextAlignment is right', () => {
    render(<Text text="Main Text" subText="Subtext" subTextAlignment="right" />);
    const mainText = screen.getByText('Main Text');
    const container = mainText.parentElement;
    expect(container).toHaveClass('flex flex-row');
  });
});
