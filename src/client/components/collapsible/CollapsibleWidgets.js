import React, { forwardRef } from "react";

function Collapsible({ children, ...rest }) {
	return (
		<div component="collapsible" {...rest}>
			{children}
		</div>
	);
}

function CollapsibleHeader({ children, ...rest }) {
	return (
		<div component="collapsible-header" {...rest}>
			{children}
		</div>
	);
}

function CollapsibleDropIcon({ children, ...rest }) {
	return (
		<div component="trigger-icon" {...rest}>
			<i className="prs pr-chevron-down" style={{color: "#ea8685"}}></i>
			{children}
		</div>
	);
}

function CollapsibleContentHeader({ children, ...rest }) {
	return (
		<div component="content-header" {...rest}>
			{children}
		</div>
	);
}

const CollapsibleBody = forwardRef(function CollapsibleContent(
	{ children, ...rest },
	ref
) {
	return (
		<div component="collapsible-body" {...rest}>
			<div component="collapsible-content" ref={ref}>
				{children}
			</div>
		</div>
	);
});

export {
	Collapsible,
	CollapsibleHeader,
	CollapsibleDropIcon,
	CollapsibleContentHeader,
	CollapsibleBody,
};
