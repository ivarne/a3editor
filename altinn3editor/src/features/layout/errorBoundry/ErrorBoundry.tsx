import { Component, ErrorInfo } from "react";

interface Props {}
interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h1>Something went wrong.</h1>;
          <p>
            Click <a href="/zip">this link</a> to refresh and upload a new zip
          </p>
          <p>Click <button onClick={()=>this.setState({hasError:false})}>here</button> to reset error</p>
        </div>
      );
    }

    return this.props.children;
  }
}
