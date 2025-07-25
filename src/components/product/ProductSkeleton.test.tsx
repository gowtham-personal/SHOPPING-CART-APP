import { render } from '@/test-utils';
import ProductSkeleton from './ProductSkeleton';

describe('ProductSkeleton', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    const { container } = render(<ProductSkeleton />);
    
    const card = container.querySelector('.animate-pulse');
    expect(card).toBeInTheDocument();
  });

  it('should have proper card structure with header and content', () => {
    const { container } = render(<ProductSkeleton />);
    
    // Header section contains the image placeholder
    const cardHeader = container.querySelector('.aspect-square')?.parentElement;
    // Content section contains the flex-1 layout
    const cardContent = container.querySelector('.flex-1.flex.flex-col');
    
    expect(cardHeader).toBeInTheDocument();
    expect(cardContent).toBeInTheDocument();
  });

  it('should display skeleton loading animation', () => {
    const { container } = render(<ProductSkeleton />);
    
    const card = container.querySelector('.animate-pulse');
    expect(card).toHaveClass('animate-pulse');
  });

  it('should render image placeholder skeleton', () => {
    const { container } = render(<ProductSkeleton />);
    
    const imagePlaceholder = container.querySelector('.aspect-square');
    expect(imagePlaceholder).toBeInTheDocument();
    expect(imagePlaceholder).toHaveClass('bg-gray-200', 'rounded-md');
  });

  it('should render title skeleton with proper structure', () => {
    const { container } = render(<ProductSkeleton />);
    
    // Find title skeleton container and its children
    const titleSkeletons = container.querySelectorAll('.space-y-2.mb-2 > div');
    expect(titleSkeletons).toHaveLength(2);
    
    // Check first title line
    expect(titleSkeletons[0]).toHaveClass('h-5', 'bg-gray-200', 'rounded', 'w-full');
    
    // Check second title line (shorter)
    expect(titleSkeletons[1]).toHaveClass('h-5', 'bg-gray-200', 'rounded', 'w-3/4');
  });

  it('should render rating skeleton with five star elements', () => {
    const { container } = render(<ProductSkeleton />);
    
    // Find the rating stars container
    const starsContainer = container.querySelector('.flex.items-center.gap-1');
    const starSkeletons = starsContainer?.querySelectorAll('div');
    
    expect(starSkeletons).toHaveLength(5);
    
    starSkeletons?.forEach(star => {
      expect(star).toHaveClass('h-4', 'w-4', 'bg-gray-200', 'rounded');
    });
  });

  it('should render rating text skeleton', () => {
    const { container } = render(<ProductSkeleton />);
    
    // Find rating text skeleton (sibling to stars container)
    const ratingContainer = container.querySelector('.flex.items-center.gap-2.mb-3');
    const ratingTextSkeleton = ratingContainer?.querySelector('.h-4.bg-gray-200.rounded.w-16');
    
    expect(ratingTextSkeleton).toBeInTheDocument();
  });

  it('should render description skeleton with three lines', () => {
    const { container } = render(<ProductSkeleton />);
    
    // Find description skeleton container
    const descriptionContainer = container.querySelector('.space-y-2.mb-4.flex-1');
    const descriptionLines = descriptionContainer?.querySelectorAll('div');
    
    expect(descriptionLines).toHaveLength(3);
    
    // Check line widths
    expect(descriptionLines?.[0]).toHaveClass('h-4', 'bg-gray-200', 'rounded', 'w-full');
    expect(descriptionLines?.[1]).toHaveClass('h-4', 'bg-gray-200', 'rounded', 'w-full');
    expect(descriptionLines?.[2]).toHaveClass('h-4', 'bg-gray-200', 'rounded', 'w-2/3');
  });

  it('should render price skeleton', () => {
    const { container } = render(<ProductSkeleton />);
    
    const priceSkeleton = container.querySelector('.h-8.bg-gray-200.rounded.w-20');
    expect(priceSkeleton).toBeInTheDocument();
  });

  it('should render action button skeleton', () => {
    const { container } = render(<ProductSkeleton />);
    
    const buttonSkeleton = container.querySelector('.h-10.bg-gray-200.rounded.w-full');
    expect(buttonSkeleton).toBeInTheDocument();
  });

  it('should have proper flex layout structure', () => {
    const { container } = render(<ProductSkeleton />);
    
    const card = container.querySelector('.h-full.flex.flex-col.animate-pulse');
    const cardContent = container.querySelector('.flex-1.flex.flex-col');
    
    expect(card).toHaveClass('h-full', 'flex', 'flex-col');
    expect(cardContent).toHaveClass('flex-1', 'flex', 'flex-col');
  });

  it('should position action area at bottom with mt-auto', () => {
    const { container } = render(<ProductSkeleton />);
    
    const actionArea = container.querySelector('.mt-auto');
    expect(actionArea).toBeInTheDocument();
    
    // Verify it contains price and button
    const priceSkeleton = actionArea?.querySelector('.h-8.bg-gray-200.rounded.w-20');
    const buttonSkeleton = actionArea?.querySelector('.h-10.bg-gray-200.rounded.w-full');
    
    expect(priceSkeleton).toBeInTheDocument();
    expect(buttonSkeleton).toBeInTheDocument();
  });
}); 