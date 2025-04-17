import React from "react";

interface ErrorBoundaryProps {
	children: React.ReactNode;
	onError?: (error: Error, info: string) => void;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}
	/* 
	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		//	return { hasError: true };
	}
 */
	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		this.props.onError?.(
			error,
			errorInfo.componentStack || "No component stack available"
		);
		console.log("ERROR BOUNDARY: ", error);
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<>
					<div>
						<h1>Something went wrong.</h1>
					</div>
					{this.props.children}
				</>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
