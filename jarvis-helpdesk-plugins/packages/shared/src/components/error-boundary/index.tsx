import { Component, ErrorInfo, PropsWithChildren } from 'react';

import { SHARED_APP_CONFIG } from '../../lib/app-config';
import { Env } from '../../lib/constants/common';

class ErrorBoundary extends Component<
  PropsWithChildren,
  {
    error?: Error;
    errorInfo?: ErrorInfo;
  }
> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { error: undefined, errorInfo: undefined };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      if (SHARED_APP_CONFIG.MODE === Env.PRODUCTION) {
        return <div>Error occurred</div>;
      }

      return (
        <div>
          <h1 className="text-red-500">Something went wrong.</h1>
          <div>
            {this.state.error && <div>{this.state.error.toString()}</div>}
            <div>{this.state.errorInfo.componentStack}</div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
