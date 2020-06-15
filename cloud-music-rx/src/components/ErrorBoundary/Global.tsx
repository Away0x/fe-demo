import React from 'react';

type GlobalErrorBoundaryState = {
  hasError: boolean;
  error: null | any;
  errorInfo: null | any;
};

export default class GlobalErrorBoundary extends React.Component<{}, GlobalErrorBoundaryState> {

  public state: GlobalErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public componentDidCatch(error: any, errorInfo: any) {
    this.setState({
      hasError: true,
      error,
      errorInfo,
    });
  }

  public reload = () => {
    window.location.reload();
  };

  public render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div>
        <h1>Something broke!</h1>
        <p onClick={this.reload}>Click here to reload!</p>
        <p>So this is embarrassing - something broke!</p>
        {this.state.errorInfo && this.state.errorInfo.componentStack ?
          (
            <pre>
              <code>{this.state.errorInfo.componentStack}</code>
            </pre>
          ) : null}
      </div>
    );
  }

}