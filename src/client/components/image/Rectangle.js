/**
 * @function RectangleImage
 * @version 1.0.0
 * @author alanjimenez
 * @summary Imagen rectangular con texto descriptivo
 */
import React, { useEffect, useState } from "react";

export default function RectangleImage(props) {
	const [text, setText] = useState(null);
	const [image, setImage] = useState(null);
	const Element = props.url ? "a" : "div";

	// Asignar el valor de state1
	useEffect(() => {
		setText(props.text);
		setImage(props.image);
	}, [props.text, props.image]);

	return (
		<Element component="rectangle-image" href={props.url}>
			<img src={image} />
			<span>{text}</span>
		</Element>
	);
}
