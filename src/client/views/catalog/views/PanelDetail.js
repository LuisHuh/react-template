import React from "react";
import { Panel, LinkButton, PalaceIcon } from "@components";

function PanelDetail({ children, to }) {
	return (
		<Panel className="panel-detail">
			<div className="panel-header">
				<LinkButton to={to}>
					<PalaceIcon name="chevron-left" type="solid" className="pr-2x" />
				</LinkButton>
			</div>
			<div className="panel-body">{children}</div>
		</Panel>
	);
}

PanelDetail.defaultProps = {
	to: {},
};

export default PanelDetail;
