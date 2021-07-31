import React, { Fragment, useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Api from "@app/Api";
import Auth from "@app/Auth";
import { generator } from "@app/Helpers";
import image from "@app/image.js";
import { ServiceContext } from "@app/ServiceContext";
import UseText from "@app/UseText";
import {
	Badge,
	Button,
	Cell,
	Grid,
	Modal,
	StatusPaymentbar,
	Toast,
	PayBalace,
} from "@components";

function StatusPayment() {
	const context = useContext(ServiceContext);
	const [data, setData] = useState({});
	const [service, setService] = useState({});
	const [redirect, setRedirect] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [fechaRestante, setFecha] = useState("");
	const user = Auth.userData();

	const { getDaysLeft2 } = generator;
	const daysLeft = getDaysLeft2(sessionStorage.date_start, -45);

	useEffect(() => {
		Api.getPositiveBalance(user.id)
			.then((res) => {
				res = res.data || {};
				setData(res);
			})
			.catch((e) => {
				console.error(e);
			});
	}, []);

	function redirectCheckout() {
		let services = [];
		services.push({
			img: false,
			description: "Pay Balance",
			amount: 1,
			currency: "USD",
			quantity: "1",
			u_price: 1,
			id: "0",
			idconcepto_ingreso: 0,
			userRequest: sessionStorage.id_planner,
			isChangeAmount:true
		});
		setService(services);
		setRedirect(true);

	}

	const closeModal = () => setShowModal(false);

	const openModal = () => {
		setShowModal(true);
		var d = new Date(user.wedding_date);
		let fecha = sumarDias(d, 45);
		setFecha(fecha);
	};

	const sumarDias = (fecha, dias) => {
		fecha.setDate(fecha.getDate() - dias);
		let newDate = dateToYMD(fecha);
		return newDate;
	};

	const dateToYMD = (date) => {
		var strArray = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		];
		var d = date.getDate();
		var m = strArray[date.getMonth()];
		var y = date.getFullYear();
		return "" + (d <= 9 ? "0" + d : d) + "/" + m + "/" + y;
	};

	const { total, pendiente, pagado } = data;

	if (redirect) {
		return (
			<Redirect
				to={{
					pathname: "/checkout",
					state: { internal:true, order: service, concepto: 2, isChangeAmount:true},
				}}
			/>
		);
	}

	//<UseText i18n="DAYS_LEFT" />
	return (
		<section name="status-payment">
			<Badge
				onClick={() => {
					openModal();
				}}>
				{context.languageId == 1 ? (
					<Fragment>{daysLeft} Days left </Fragment>
				) : (
					<Fragment> Faltan {daysLeft} días</Fragment>
				)}
			</Badge>
			<StatusPaymentbar total={total} paid={pagado} balance={pendiente} />
			<Grid type="x">
				<Cell className="widget-pay-balance">
				<Button className={""} onClick={(e) => redirectCheckout()}>
				<UseText i18n="PAY_NOW" />
				</Button>
					{/* <PayBalace
						textTrigger="PAY_BALANCE"
						textCancel="CANCEL"
						textConfirm="PAY_NOW"
						label="AMOUNT_TO_PAY"
						onSubmit={(v) => redirectCheckout(v)}
					/> */}
				</Cell>
			</Grid>
			<Modal
				sendUpdate={() => closeModal()}
				displayModal={showModal}>
				<div className="body">
					<div>
						<img src={image.paymentnotice} className="images" />
						<h3>
							<UseText i18n="DONT_FALL_BEHIND" />
						</h3>
						<span className="lg-f20x sm-f12x md-f14x">
							{" "}
							<UseText i18n="BALANCE_PAYMENT_QUICK_REMINDER" />{" "}
						</span>
						<p className="lg-f48x sm-f24x md-f22x days font">
							{" "}
							{daysLeft} <UseText i18n="DAYS" />{" "}
						</p>
						<p className="lg-f32x sm-f16x md-f18x dates font">
							{" "}
							{fechaRestante}{" "}
						</p>
					</div>
					<span className="lg-f20x sm-f12x md-f14x text-foot">
						<UseText i18n="STATUS_PAYMENT_LETUSKNOW" />
					</span>
					<Grid type="x" style={{ marginTop: "10px" }}>
						{/* <Cell small="6"> se quita segun correo Funcionalidad "CALL US" modal PostLogin
							<Button className="uppercase hollow btn-inline" onClick={() => closeModal()}>CALL US</Button>
						</Cell> */}
						<Cell small="12" medium="12" large="12">
							<Button className="uppercase" onClick={() => closeModal()}>
								{" "}
								<span>
									{" "}
									<UseText i18n="OK_GOT_IT" />{" "}
								</span>
							</Button>
						</Cell>
					</Grid>
				</div>
			</Modal>
		</section>
	);
}

export default StatusPayment;
