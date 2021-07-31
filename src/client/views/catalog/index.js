/**
 * @view CatalogView
 * @version 3.0.0
 * @author lhuh
 * @summary Vista principal del catálogo.
 */

import React, { useEffect, useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import Auth from "@app/Auth";
import CatalogContext from "@templates/catalog/Context";
import { Subtitle, Grid } from "@components";
import { Tabstwo, GalleryChecks } from "../../oldweddingcomponents";
import WeddingsSlider from "../../oldweddingcomponents/wellmakeyour";
import { LoadCategories, LoadServices } from "./DataSources";
import Paginator from '../../components/paginator';

export default function CatalogView({ location }) {
	const [redirectToView, setRedirectView] = useState({
		redirect: false,
		pathname: "",
		state: {},
	});
	const [categories, setCategories] = useState([]);
	const [services, setServices] = useState([]);
	const [servicesP, setServicesP] = useState([]);
	/* const [inCart, setInCart] = useState([]); */
	const { business, itemsInCart } = useContext(CatalogContext);

	const onClickCategory = (id) => {
		const { id_resort } = Auth.userData();
		LoadServices(id_resort, id, business.campo_descripcion_comercial).then((res) =>{
			setServices(res);
		} );
	};

	const onClickItem = (values, index) => {
		if (values.coleccion == 0){
			const pathname = `${location.pathname}/details`;
			setRedirectView({
				redirect: true,
				pathname,
				state: { ...values, from: location.pathname },
			});
		}else if((values.coleccion == 1) && (values.idservicio_agrupador != 0) && (values.id_tipo_servicio != 22)) {
			const pathname = `${location.pathname}/package-details`;
			setRedirectView({
				redirect: true,
				pathname,
				state:{ ...values, from: location.pathname},
			})
		}

	};

	useEffect(() => {
		const { idCategory } = business;
		if (idCategory) {
			LoadCategories(idCategory).then((res) => {
				setCategories(res);
				const { idSubcategory } = res[0] || {};
				if (idSubcategory) {
					onClickCategory(idSubcategory);
				}
			});
		}
	}, [business]);

	/* useEffect(() => {
		const cart = Object.values(itemsInCart.products);
		setInCart(cart);
	}, [itemsInCart.products]); */

	if (redirectToView.redirect) {
		const { redirect, ...params } = redirectToView;
		return <Redirect push={true} to={{ ...params }} />;
	}

	const changePage = (items) => {
		setServicesP(items)
	}

	return (
		<section page="catalog">
			<Tabstwo class="container tabcategoriescake">
				{categories.map(({ description, idSubcategory }, index) => (
					<a onClick={(e) => onClickCategory(idSubcategory)} key={index}>
						<Subtitle size={2}>{description}</Subtitle>
					</a>
				))}
			</Tabstwo>
			<GalleryChecks
				item_list={servicesP}
				galleryClick={(value, id, item, key) => onClickItem(item, key)}
				card={true}
				values_checked={[]}
			/>
			<Paginator onChangePage={(items)=> changePage(items)} items={services} limit={10} initialPage={1}></Paginator> 
			<Grid type="x">
				<WeddingsSlider />
			</Grid>
		</section>
	);
}
