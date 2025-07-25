import { render, screen } from '@/test-utils';

import SomethingWentWrong from './index';

describe('SomethingWentWrong', () => {
  it('should render the component with error messages', () => {
    render(<SomethingWentWrong />);

    // Check for the main error message
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    // Check for the descriptive error message
    expect(
      screen.getByText("We're sorry, an error occurred while rendering this page.")
    ).toBeInTheDocument();
  });

  it('should apply correct styling classes', () => {
    const { container } = render(<SomethingWentWrong />);

    // Check if the main container has the correct classes
    const mainContainer = container.querySelector('div');
    expect(mainContainer).toHaveClass(
      'flex',
      'flex-col',
      'items-center',
      'justify-center',
      'min-h-[400px]',
      'text-center',
      'gap-3'
    );

    // Check if Text components are rendered (they handle their own styling internally)
    const errorTitle = screen.getByText('Something went wrong');
    expect(errorTitle).toBeInTheDocument();

    const errorDescription = screen.getByText(
      "We're sorry, an error occurred while rendering this page."
    );
    expect(errorDescription).toBeInTheDocument();
  });
});
