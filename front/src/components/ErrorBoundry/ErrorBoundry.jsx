import React from "react";

//TODO
class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}
	/* 
	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		//	return { hasError: true };
	}
 */
	componentDidCatch(error, errorInfo) {
		//logErrorToMyService(error, errorInfo);
		console.log("ERROR BOUNDRY!!!!!!!!:  ", error);
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
