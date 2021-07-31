/**
 * @function CatalogBanner
 * @version 2.0.0
 * @author alanjimenez, lhuh
 * @summary Muestra una imagen con enlace a un video para mostrar un video de la unidad de negocio
 */

import React, { useState } from "react";
import { Image, Gradient } from "@components";
import { ModalVideo } from "../../oldweddingcomponents";

function CatalogBanner({srcMobile, srcDesktop, srcVideo}) {
   const [modal, setModal] = useState(false);

   const showModal = () => {
      modal.onOpen();
   }

	return (
		<Gradient>
			<section component="catalog-banner">
				<div className="desktop-banner">
					<Image src={srcDesktop} thumbSrc={srcDesktop} onClick={showModal} />
				</div>
				<div className="movil-banner">
					<Image src={srcMobile} thumbSrc={srcMobile} onClick={showModal} />
				</div>
				<ModalVideo onRef={ref => setModal(ref)}>
					<iframe src={srcVideo} width="100%" height="550px" style={{ border: "none" }}></iframe>
				</ModalVideo>
			</section>
		</Gradient>
	);
}

export default CatalogBanner;
