import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryState {
  error?: Error;
  errorInfo?: ErrorInfo;
}

interface ErrorBoundaryProps {
  children?: ReactNode;
  FallbackComponent: () => React.ReactElement;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {};

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('Uncaught error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  public render() {
    if (this.state.error) {
      const { FallbackComponent } = this.props;
      return <FallbackComponent />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
