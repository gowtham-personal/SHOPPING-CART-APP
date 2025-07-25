import { render, screen } from '@/test-utils';

import { StarRating, type StarRatingProps } from './index';

const getRenderedComponent = (args: Partial<StarRatingProps> = {}) => {
  const defaultProps: StarRatingProps = {
    rating: 3.5,
    ...args,
  };
  return render(<StarRating {...defaultProps} />);
};

describe('StarRating', () => {
  it('should match snapshot with default props', () => {
    const { container } = getRenderedComponent();
    expect(container).toMatchSnapshot();
  });

  it('should render without errors', () => {
    const spy = jest.spyOn(global.console, 'error');
    getRenderedComponent();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should render with correct ARIA label for rating', () => {
    getRenderedComponent({ rating: 4.2 });
    expect(screen.getByLabelText('Rating: 4.2 out of 5 stars')).toBeInTheDocument();
  });

  it('should render 5 star icons regardless of rating', () => {
    getRenderedComponent({ rating: 2.7 });
    const starContainer = screen.getByLabelText('Rating: 2.7 out of 5 stars');
    // Each star is rendered as a lucide-react Star component with svg
    const stars = starContainer.querySelectorAll('svg');
    expect(stars).toHaveLength(5);
  });

  it('should render full stars correctly', () => {
    getRenderedComponent({ rating: 3 });
    const starContainer = screen.getByLabelText('Rating: 3 out of 5 stars');
    const fullStars = starContainer.querySelectorAll('.fill-yellow-400');
    expect(fullStars).toHaveLength(3);
  });

  it('should render half star correctly', () => {
    getRenderedComponent({ rating: 3.5 });
    const starContainer = screen.getByLabelText('Rating: 3.5 out of 5 stars');
    const halfStars = starContainer.querySelectorAll('.fill-yellow-400\\/50');
    expect(halfStars).toHaveLength(1);
  });

  it('should render empty stars correctly', () => {
    getRenderedComponent({ rating: 2.3 });
    const starContainer = screen.getByLabelText('Rating: 2.3 out of 5 stars');
    const emptyStars = starContainer.querySelectorAll('.text-gray-300');
    expect(emptyStars).toHaveLength(2); // 5 - 3 (2 full + 1 half) = 2 empty
  });

  it('should not show review count when showCount is false', () => {
    getRenderedComponent({ rating: 4, showCount: false, count: 25 });
    expect(screen.queryByText('(25 reviews)')).not.toBeInTheDocument();
  });

  it('should show review count when showCount is true and count is provided', () => {
    getRenderedComponent({ rating: 4, showCount: true, count: 142 });
    expect(screen.getByText('(142 reviews)')).toBeInTheDocument();
  });

  it('should not show review count when showCount is true but count is undefined', () => {
    getRenderedComponent({ rating: 4, showCount: true });
    expect(screen.queryByText(/reviews/)).not.toBeInTheDocument();
  });

  it('should apply custom className when provided', () => {
    const { container } = getRenderedComponent({ className: 'custom-rating-class' });
    expect(container.firstChild).toHaveClass('custom-rating-class');
  });

  it('should handle edge case of 0 rating', () => {
    getRenderedComponent({ rating: 0 });
    const starContainer = screen.getByLabelText('Rating: 0 out of 5 stars');
    const emptyStars = starContainer.querySelectorAll('.text-gray-300');
    expect(emptyStars).toHaveLength(5);
  });

  it('should handle edge case of maximum rating', () => {
    getRenderedComponent({ rating: 5 });
    const starContainer = screen.getByLabelText('Rating: 5 out of 5 stars');
    const fullStars = starContainer.querySelectorAll('.fill-yellow-400');
    expect(fullStars).toHaveLength(5);
  });

  it('should handle fractional ratings correctly', () => {
    getRenderedComponent({ rating: 4.8 });
    const starContainer = screen.getByLabelText('Rating: 4.8 out of 5 stars');
    const fullStars = starContainer.querySelectorAll('.fill-yellow-400');
    const halfStars = starContainer.querySelectorAll('.fill-yellow-400\\/50');
    expect(fullStars).toHaveLength(4);
    expect(halfStars).toHaveLength(1);
  });

  it('should display correct review count text format', () => {
    getRenderedComponent({ rating: 3.5, showCount: true, count: 1 });
    expect(screen.getByText('(1 reviews)')).toBeInTheDocument();
  });

  it('should have all star icons with aria-hidden attribute', () => {
    getRenderedComponent({ rating: 3.2 });
    const starContainer = screen.getByLabelText('Rating: 3.2 out of 5 stars');
    const stars = starContainer.querySelectorAll('svg[aria-hidden="true"]');
    expect(stars).toHaveLength(5);
  });
}); 