import { render, screen } from '@/test-utils';

import { ErrorBoundary } from './index';

// Mock console.log to prevent error logging during tests
const originalConsoleLog = console.log;
beforeEach(() => {
  console.log = jest.fn();
});

afterEach(() => {
  console.log = originalConsoleLog;
});

describe('ErrorBoundary', () => {
  const FallbackComponent = () => <div>Error occurred</div>;
  const ThrowError = () => {
    throw new Error('Test error');
    return null;
  };

  const ChildComponent = () => <div>Child component</div>;

  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <ChildComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Child component')).toBeInTheDocument();
  });

  it('should render fallback component when error occurs', () => {
    // Suppress console.error for this test as we expect an error
    const originalError = console.error;
    console.error = jest.fn();

    render(
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Error occurred')).toBeInTheDocument();
    expect(console.log).toHaveBeenCalled();

    // Restore console.error
    console.error = originalError;
  });

  it('should handle multiple children', () => {
    render(
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <div>First child</div>
        <div>Second child</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('First child')).toBeInTheDocument();
    expect(screen.getByText('Second child')).toBeInTheDocument();
  });

  it('should work without children', () => {
    render(<ErrorBoundary FallbackComponent={FallbackComponent} />);
    // Should not throw and render nothing
    expect(document.body.textContent).toEqual('');
  });
});
