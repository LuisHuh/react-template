import React, { Fragment, useEffect, useState,useContext } from 'react';
import Api from '@app/Api';
import UseText from '@app/UseText';
import { ServiceContext } from "@app/ServiceContext";
import {
   CancelForm,
   Cell,
   FileInput,
   Form,
   Grid,
   Input,
   ListContent,
   ListOption,
   ListView,
   PalaceIcon,
   SendForm,
   Subtitle,
   DateWidget,
   Toast
} from '@components';
import { getLang } from "@app/Helpers";

/**
 * Funcion que obtiene datos de las APIs y los setea al estado del hook
 * @param {string} api Nombre del metodo
 * @param {()=>{}} setState Metodo de estado a actualizar del hook
 */
function DataSource(api, setState, ...extraParams) {
	let MyRequest = Api[api];
	MyRequest = typeof MyRequest === "function" ? MyRequest : Promise;
	MyRequest(...extraParams)
		.then((res) => {
			res = res.data || res || [];
			setState(res);
		})
		.catch((e) => {
			console.error(e);
		});
}

/**
 * Renderea lo que incluye el servicio
 * @param {Object} param0 Props
 * @param {Array} param0.data Datos
 */
function ServiceInfo({ data }) {
	return (
		<Fragment>
			{data.length > 0 ? <b><UseText i18n="INCLUDES" /> </b> : ""}
			{data.map(({ content }, key) => (
				<span
					dangerouslySetInnerHTML={{ __html: content || "" }}
					key={key}></span>
			))}
		</Fragment>
	);
}

/**
 * Renderea los comentarios de la novia
 * @param {Object} param0 Props
 * @param {Array} param0.data Datos
 */
function CommentCollectios({ data }) {
	const context = useContext(ServiceContext);
	return (
		<ListView>
			{data.map(({ created_date, content, thumb, path }, key) => (
				<ListOption key={key} avatar>
					<PalaceIcon name="comment" className="avatar" />
					<ListContent externalLink={`${path}`} className="full">
					{ (thumb.trim()) ?  <img src={thumb} alt="Comment image" className="picture" /> :''}
					</ListContent>
					<Subtitle size={2}>
						<DateWidget value={created_date} isCustom={true} {...getLang(context.languageId)} />
					</Subtitle>
					<Subtitle size={2}>{content}</Subtitle>
				</ListOption>
			))}
		</ListView>
	);
}

function CollapsedContent({ isOpen, data }) {
	const [included, setInclude] = useState([]);
	const [comments, setComments] = useState([]);
	let { idevent_detalle_item } = data;

	useEffect(() => {
		if (isOpen) {
			DataSource("getIncludedService", setInclude, idevent_detalle_item);
			DataSource("getWeddingsNotes", setComments, idevent_detalle_item);
		}
	}, [isOpen]);

	const SaveForm = (data, id, resetForm) => {

		if (data.comment == undefined || data.comment.trim() == "") {
			Toast({ html: "A comment is necessary to save", id: 'my-toast-comment', duration: 4000 })
			return;
		}

		const formData = new FormData();
		Object.keys(data).forEach((key) => {
			if (Array.isArray(data[key]) && data[key].length > 0)
				formData.append(key, data[key][0]);
			else formData.append(key, data[key]);
		});

		formData.append("id", id);

		DataSource(
			"saveComment",
			(res) => {
				const temp = comments.slice();
				temp.unshift(res);
				setComments(temp);
				resetForm();
			},
			formData
		);
	};

	return (
		<Grid type="x" className="grid-padding-x">
			<Cell>
				<Subtitle size={2}>
					<ServiceInfo data={included} />
				</Subtitle>
			</Cell>
			<Cell>
				<Form onSubmit={(data, resetForm) => SaveForm(data, idevent_detalle_item, resetForm)}>
					<Grid type="x" className="grid-padding-x">
						<Cell>
							<br />
							<Input
								type="textarea"
								rows="10"
								cols="30"
								label={<UseText i18n="SPECIAL_REQUEST" />}
								placeholder="YOUR_SPECIAL_REQUESTS"
								name="comment"
							/>
						</Cell>
						<Cell large="6">
							<FileInput
								buttonLabel={<UseText i18n="BROWSE" />}
								label={<UseText i18n="UPLOAD" />}
								placeholder="CHOOSE_FILE"
								accept="image/*"
								name="image"
							/>
						</Cell>
						<Cell large="6" className="button-comment">
							<div>
								<CancelForm ><UseText i18n="CANCEL" /></CancelForm>
								<SendForm ><UseText i18n="SAVE" /></SendForm>
							</div>
						</Cell>
					</Grid>
				</Form>
			</Cell>
			<Cell>
				<CommentCollectios data={comments} />
			</Cell>
		</Grid>
	);
}

CollapsedContent.defaultProps = {
	isOpen: false,
	data: {},
};

export default CollapsedContent;
