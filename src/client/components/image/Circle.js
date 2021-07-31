/**
 * @function CircleImage
 * @version 1.0.0
 * @author alanjimenez
 * @summary Imagen circular con texto descriptivo
 */
import React, { useEffect, useState } from "react";

export default function CircleImage(props) {
	const [text, setText] = useState(null);
	const [image, setImage] = useState(null);
	const Element = props.url ? "a" : "div";

	// Asignar el valor de state1
	useEffect(() => {
		setText(props.text);
		setImage(props.image);
	}, [props.text, props.image]);

	return (
		<Element
			href={props.url}
			component="circle-image"
			style={{ backgroundImage: `url(${image})` }}>
			<span>{text}</span>
		</Element>
	);
}
