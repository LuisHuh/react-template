import WithContext from '@app/ServiceContext';
import React from 'react';

import Api from '../../app/Api';
import { Navbar } from '../../components';
import BusinessUnitBanner from '../../components/catalogtemplate/BusinessUnitBanner';
import Template from '../Template';
import WeddingsSlider from '../../oldweddingcomponents/wellmakeyour';

/**
 * @class CatalogTemplate
 * @version 2.0.0
 * @author mmendiola, alanjimenez
 * @summary Plantilla para las vistas que utilizan el carrito de compras
 */
class CatalogTemplate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			businessUnits: [],
			selectedUnit: null,
			currentUnit: null
		};
	}

	getUrlParam(paramName) {
		let tmp = {};
		if ((tmp = this.props.children)) {
			if ((tmp = tmp.props)) {
				if ((tmp = tmp.match)) {
					if ((tmp = tmp.params)) {
						if (paramName && tmp.hasOwnProperty(paramName)) {
							return tmp[paramName] || undefined;
						}
						return tmp;
					}
				}
			}
		}
		return {};
	}

	validateApiResponse = (response) => {
		if (Object.keys(response).length > -1) {
			return Array.isArray(response.data) ? response.data : [];
		}
		return Promise.reject(response);
	}

	formatBusinessUnitResponse = (data) => {
		// Recorrer las categorías y convertir el campo extra en JSON
		for (const category in data) {
			if (data.hasOwnProperty(category)) {
				const catego = data[category];
				// Convertir el campo a JSON
				let { extra } = catego;
				if (catego.hasOwnProperty('extra')) {
					if (extra === '"{}"') {
						extra = {};
					} else {
						try {
							extra = JSON.parse(extra);
						} catch (error) {
							extra = {};
						}
					}
				}
				catego.extra = extra || {};
			}
		}
		return data;
	}

	componentDidMount() {
		// Cargar la información necesaria para el Catálogo
		Api.getBusinessUnits()
			// Verificar que tenga información
			.then(this.validateApiResponse)
			.then(this.formatBusinessUnitResponse)
			.then(businessUnits => {
				// Guardamos las unidades de negocio y marcamos la seleccionada
				let selectedUnit = this.getUrlParam('service');
				let currentUnit = businessUnits.find(bu => bu.idCategory == selectedUnit);
				this.setState({
					businessUnits,
					selectedUnit,
					currentUnit
				});
			})
			.catch((e) => console.error(e));
	}

	render() {
		return (
			<Template stylesheet="wedding-theme">

				<Navbar />

				<BusinessUnitBanner businessUnit={this.state.currentUnit} />

				{/* <WeddingsSlider data={this.state.currentUnit.idCategory} idservicio={this.state.currentUnit.idCategory} /> */}

			</Template>
		);
	}

}

CatalogTemplate.defaultProps = {
};

export default WithContext(CatalogTemplate);
