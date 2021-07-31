import React from "react";
import { Sliders, Input } from "../../oldweddingcomponents";
import { LinkButton } from "@components";
import UseText from "@app/UseText";
import Auth from "@app/Auth";
import path from 'path';

const Wellmakeyourslide = (props) => {
    const { langWeddings } = Auth.userData();
    const lang = langWeddings == 2? 'es' : 'en';
	const valor = Array.isArray(props.slide) ? props.slide : [];
	const sorted = valor.sort((a, b) => {
		if (a.orden_comercial > b.orden_comercial) {
			return 1;
		}
		if (a.orden_comercial < b.orden_comercial) {
			return -1;
		}
	});
	const parents = sorted
		.filter((elemento) => elemento.enable_online == 1)
		.map((element, index) => {
			let extra = null;
			if (element.extra) {
				extra = JSON.parse(element.extra);
			}
			let campo = extra || {};
			let logos = campo.logo || [];
			let logo = logos[0] || [];
			let nombre = element.nombre || "";
			let nombremin = nombre.toLowerCase();
			let frase_comercial = campo.frase_comercial || "";
			let nameLower = nombre ? nombre.toLowerCase() : "";

			let orden = element.orden_comercial % 2 != 0;

			return (
				<div className={orden ? "one" : "two"} key={index}>
					<div className="container-movil">
						<img
							alt={nombre}
							src={element.cover}
							className={nombremin + "-img"}
						/>
						<div>
							<section>
								<article className="aling-items-desk">
									<p className="description">
										<UseText i18n={frase_comercial} />
									</p>
								</article>
								<img
									alt={nombre}
									src={logo}
									className={"logo " + nombremin + "-lgo"}
								/>
							</section>
						</div>
					</div>
					<div component="inputwedd">
						<LinkButton
							className=""
							externalLink={path.join(lang, "catalog", nameLower)}>
							<UseText i18n="VIEW_CATALOG" />
						</LinkButton>
					</div>
					<div className="catalog-bg"></div>
					<div className="separating-line hide-for-medium-only hide-for-small-only"></div>
				</div>
			);
		});

	return (
		<Sliders nameSlide={"wll-make-your"} nonindicator>
			{parents}
		</Sliders>
	);
};

export default Wellmakeyourslide;
