/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description Error.js - Archivo que contiene un componente para validar fallos de los componentes.
 */

import React, { Component } from "react";

class ErrorCatching extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			errorInfo: null,
		};
	}

	componentDidCatch(error, errorInfo) {
		this.setState({
			error: error,
			errorInfo: errorInfo,
		});
	}

	render() {
		const { errorInfo, error } = this.state;
		const { message } = this.props;
		if (errorInfo) {
			return (
				<div style={{textAlign: "center", padding:"0 0.5rem"}}>
					<h4 className="subtitle-1">{message}</h4>
					<details style={{ whiteSpace: "pre-wrap" }}>
						{error && error.toString()}
						<br />
						{errorInfo.componentStack}
					</details>
				</div>
			);
		}

		return this.props.children;
	}
}

ErrorCatching.defaultProps = {
	message: "Something happened :-(",
};

const TryCatch = (Component) => {
	return function CatchContext(props) {
		return (
			<ErrorCatching>
				<Component {...props} />
			</ErrorCatching>
		);
	};
};

export default ErrorCatching;
export { TryCatch };
