import React, { forwardRef } from "react";
import { Link } from "react-router-dom";

const List = forwardRef((props, ref) => {
	const defaults = {
		className: null,
		style: null,
		component: null,
		items: [],
		readKey: "value",
		selected: -1,
		onClick: () => {},
	};
	const newProps = Object.assign({}, defaults, props);

	return (
		<ul
			className={newProps.className}
			style={newProps.style}
			component={newProps.component}
			ref={ref}>
			{newProps.items.map((item, key) => {
				const { to, externalLink } = item;
				const TriggerElement = to ? Link : "a";
				const action = TriggerElement === Link ? to : null;

				return (
					<li
						key={key}
						onClick={(e) =>
							newProps.onClick(
								Object.assign({}, item, { selected: key })
							)
						}
						className={key === newProps.selected ? "active" : null}>
						<TriggerElement
							href={externalLink}
							target={externalLink ? "_blank" : null}
							to={action}>
							{item[newProps.readKey]}
						</TriggerElement>
					</li>
				);
			})}
		</ul>
	);
});

export default List;
