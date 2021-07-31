import React from "react";
import { TryCatch } from "@app/Error";
import { Collapsible } from "@components";
import { Sliders } from "../../oldweddingcomponents";
import UseText from '@app/UseText';

const Sliderpromotion = (props) => {
	const parents = props.Data.map(
		({ description, path_image, wording: promos }, index) => {
			promos = !Array.isArray(promos) ? promos[props.language] : {};
			const { wording, terms_and_conditions } = promos;
			let terminos = <span dangerouslySetInnerHTML={{__html:terms_and_conditions|| ""}} ></span>
			let PWording = <span dangerouslySetInnerHTML={{__html: wording|| ""}} ></span>

			return (
				<div key={index} className="itemContent">
					<img className="image-left" src={path_image} />
					<h6 className="sm-f18x md-f18x lg-f24x">{description}</h6>
					<p className="content-descriptions sm-f14x  md-f14x lg-f20x">
						{PWording}
					</p>
					<Collapsible header={<UseText i18n='TERMS_CONDITIONS' />}>
					<p className="content-terms sm-f12x md-f12x lg-f16x">{terminos}</p>
					</Collapsible>
				</div>
			);
		}
	);

	return <Sliders nameSlide={"W-Promotions"} itemsmult={false} >{parents}</Sliders>;
};

export default TryCatch(Sliderpromotion);
