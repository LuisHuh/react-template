import React, { Component } from "react";
import { Iconwedd } from "../wirefragment";

class ModalVideo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
		};
	}

	componentDidMount() {
		this.addRefs(this);
	}

	componentWillUnmount() {
        this.addRefs(undefined);
        this.disabledScroll(false);
	}

	moveScrollTop = () => {
		window.scrollTo(window.scrollX, window.scrollY);
	};

	addRefs(value) {
		const { onRef } = this.props;
		onRef(value);
	}

	disabledScroll(disable) {
		document.body.style.overflow = disable ? "hidden" : "auto";
	}

	onClose = () => {
        this.setState({ show: false });
        window.removeEventListener("scroll", this.moveScrollTop);
        this.disabledScroll(false);
	};

	onOpen = () => {
        this.setState({ show: true });
        window.addEventListener("scroll", this.moveScrollTop);
        this.disabledScroll(true);
	};

	render() {
		const { show } = this.state;
		return (
			<div page="modalvideo" style={{ display: show ? "block" : "none" }}>
				<div component="modalvideo">
					<div className="container closecontainer">
						<span className="btn" onClick={this.onClose}>
							<Iconwedd
								icon="close-menu"
								color="pink position"></Iconwedd>
						</span>
					</div>
					{this.props.children}
				</div>
			</div>
		);
	}
}

ModalVideo.defaultProps = {
	onRef: () => {},
};
export default ModalVideo;
