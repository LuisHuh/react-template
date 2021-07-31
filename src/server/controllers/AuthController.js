/**
 * Event Grupo Auth
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description AUTH CONTROLLER FILE
 */
"use strict";

/* * * * * * * * * * * *
 *  Import Statements  *
 * * * * * * * * * * * */
const Controller = require("../app");
const Auth = require("../app/AuthRequest");
const Api = require("../app/endpoints");
const ResponseFormatter = require("../libraries/ResponseFormatter");
const AuthException = require("../libraries/ThrowExceptions");
const url = require("url");
const Path = require("path");
const { usuario_creacion } = require("../app/dic");

class AuthController extends Controller {
	/**
	 * Autentica al usuario del portal
	 */
	authenticate() {
		let message = {};
		try {
			const authorization = this.jsonRawHeaders.authorization;
			if (!authorization) {
				throw new AuthException(
					400,
					"Required Credentials",
					"No se proporciono los datos del usuario"
				);
			}

			this.url = Api.authenticate2;
			this.authorization = authorization;
			this.json = false;

			// Se obtiene el token del usuario
			this.post((error, response) => {
				if (error) {
					message =
						response.code == 401
							? 'INVALID_USERNAME_PASSWORD'
							: "Unable to authenticate";
					message = new ResponseFormatter(message, response.code, true);
					return this.sendResponse(message);
				}
				this.getSessionInfo(response.data)
					.then((seRes) => {
						const message = new ResponseFormatter().setData(seRes);
						return this.sendResponse(message);
					})
					.catch((e) => {
						message = new ResponseFormatter(
							e.clientMessage,
							e.code,
							true
						);
						this.sendResponse(message);
					});
			});
		} catch (e) {
			message = new ResponseFormatter(e.clientMessage, e.code, true);
			this.sendResponse(message);
		}
	}

	/**
	 * Obtiene las claves de accesos del usuario por medio de un token
	 */
	credentials() {
		let message = {};
		try {
			this.token = this.jsonRawHeaders.authorization;
			if (!this.token)
				throw new AuthException(
					401,
					"Authorization token is required",
					"No se proporciono ningun token"
				);
			Auth.tokenGenerator(this.token)
				.then((authRes) => {
					authRes = authRes.data || authRes;
					if (!authRes.hasOwnProperty("token"))
						throw new AuthException(
							401,
							"Unable to process token",
							"No se regreso ningun token"
						);

					this.token = authRes.token;
					Auth.tokenDecoder(this.token)
						.then((authDec) => {
							authDec = authDec.data || authDec;
							if (
								!authDec.hasOwnProperty("idToken")
							)
								throw new AuthException(
									401,
									"Invalid token",
									"No se encontro el id de la tabla de transactionlink"
								);

							this.url = this.path(Api.getTransactionLink, authDec.idToken);

							this.setAuthorization();
							return this.get((err, res) => {
								if (err) {
									throw new AuthException(
										401,
										"Invalid token",
										"No contiene los datos necesarios."
									);
								}

								res = res.data || {};
								res = this.jsonParse(res);

								this.url = this.path(Api.eventDataLocal, res.id_group);
								return this.get((errGrupo, grupo) => {
									if (errGrupo) {
										throw new AuthException(
											401,
											"Wedding not found.",
											"No se encontro la información del grupo."
										);
									}

									grupo = grupo.data || {};
									const { email: username, password } = grupo;
									message = new ResponseFormatter().setData({
										username,
										password,
										systemUser: res.usuario_creacion,
										idtoken:authDec.idToken
									});
									return this.sendResponse(message);
								});
							});
						})
						.catch((e) => {
							message = new ResponseFormatter(
								e.clientMessage,
								e.code,
								true
							);
							this.sendResponse(message);
						});
				})
				.catch((e) => {
					message = new ResponseFormatter(e.clientMessage, e.code, true);
					this.sendResponse(message);
				});
		} catch (e) {
			message = new ResponseFormatter(e.clientMessage, e.code, true);
			this.sendResponse(message);
		}
	}

	/**
	 * Restablece la contraseña del usuario
	 */
	resetPassword() {
		let message = {};
		try {
			if (!this.jsonRawBody.id)
				throw new AuthException(
					400,
					"Id is required",
					"No se proporciono el id del grupo para actualizar contraseña"
				);
			if (!this.jsonRawBody.password)
				throw new AuthException(
					400,
					"Password is required",
					"No se proporciono la contraseña"
				);
			if (!this.jsonRawBody.oldpass)
				throw new AuthException(
					400,
					"The old Password is required",
					"No se proporciono la contraseña anterior"
				);
			this.url = this.path(Api.resetpassword, this.jsonRawBody.id);
			this.data = {
				password: this.jsonRawBody.password,
				oldpass: this.jsonRawBody.oldpass,
			};
			//this.data = { password: this.jsonRawBody.password, estado_sesion: 1 };
			this.authorization = this.tokenMiddleware;
			this.put((err, res) => {
				if (err) {
					message = new ResponseFormatter(
						res.clientMessage,
						res.code,
						true
					);
					return this.sendResponse(message);
				}
				message = new ResponseFormatter(
					"Password has been changed successfully"
				);
				this.sendResponse(message);
			});
		} catch (e) {
			message = new ResponseFormatter(e.clientMessage, e.code, true);
			this.sendResponse(message);
		}
	}

	/**
	 * Restablece la contraseña del usuario sin estar logueado
	 */
	changePassword() {
		let message = {};
		try {

			this.url = this.path(Api.changepassword, this.jsonRawBody.id);
			this.authorization = this.tokenMiddleware;
			this.data = {
				password: this.jsonRawBody.newpass,
			};
			this.put((err, res) => {
				if (err) {
					message = new ResponseFormatter(
						res.clientMessage,
						res.code,
						true
					);
					return this.sendResponse(message);
				}
				message = new ResponseFormatter(
					"Password has been changed successfully"
				);
				this.sendResponse(message);
			});
		} catch (e) {
			message = new ResponseFormatter(e.clientMessage, e.code, true);
			this.sendResponse(message);
		}
	}

	skipPassword() {
		let message = {};
		try {
			if (!this.jsonRawBody.id)
				throw new AuthException(
					400,
					"Id is required",
					"No se proporciono el id del grupo para actualizar contraseña"
				);
			this.url = this.path(Api.resetpassword, this.jsonRawBody.id);
			this.data = { estado_sesion: 1 };
			this.authorization = this.tokenMiddleware;

			this.put((err, res) => {
				if (err) {
					message = new ResponseFormatter(
						"You are not authorized to make this request.",
						res.code,
						true
					);
					return this.sendResponse(message);
				}
				message = new ResponseFormatter("Password Skipped :/");
				this.sendResponse(message);
			});
		} catch (e) {
			message = new ResponseFormatter(e.clientMessage, e.code, true);
			this.sendResponse(message);
		}
	}

	userInfo() {
		try {
			const { username } = this.jsonRawParams;
			if (!username) {
				throw new EventException(400, "User is required");
			}
			/* this.url = this.path(Api.userInfo, username);
			return this.getResource(); */
			this.getUserInfo(username)
				.then((res) => {
					const data= {
						name: res.name || "",
						email: res.email || "",
						phone_number: "",
					};
					const message = new ResponseFormatter().setData(data);
					return this.sendResponse(message);
				})
				.catch((e) => {
					const message = new ResponseFormatter(
						e.clientMessage,
						e.code,
						true
					);
					return this.sendResponse(message);
				});
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}

	/**
	 * Obtiene la informacion del nombre de usuario
	 * @param {string} username Nombre de usuario de auth
	 */
	async getUserInfo(username) {
		try {
			if (!username) {
				return {};
			}

			this.url = this.path(Api.userInfo, username);
			return await this.get((err, response) => {
				if (!err) {
					response = response || {};
					return response;
				}
				return {};
			});
		} catch (e) {
			return {};
		}
	}

	/**
	 * Obtiene la informacion del hotel
	 * @param {string} username Nombre de usuario de auth
	 */
	async getHotelInfo(idResort) {
		try {
			if (!idResort) {
				return {};
			}

			this.url = this.path(Api.resortname, idResort);
			return await this.get((err, response) => {
				if (!err) {
					response = response.data || {};
					return response;
				}
				return {};
			});
		} catch (e) {
			return {};
		}
	}

	/**
	 * Obtiene la información de la sesion actual
	 * @param {string} token Token a decodificar
	 */
	async getSessionInfo(token) {
		return await Auth.tokenDecoder(token)
			.then(async (authRes) => {
				authRes["token"] = token;
				authRes["resort"] = "";
				authRes["wedding_planner"] = {};
				// Se obtiene el hotel
				if (authRes["id_resort"]) {
					this.authorization = this.tokenMiddleware;
					const resort = await this.getHotelInfo(authRes["id_resort"]);
					authRes["resort"] = resort["nombre_comercial"] || "";
				}

				if (authRes["id_planner"]) {
					const planner = await this.getUserInfo(authRes["id_planner"]);
					authRes["wedding_planner"] = {
						name: planner["name"] || "",
						email: planner["email"] || "",
						ctry_code: "",
						phone_number: "",
						ext: "",
					};
				}

				return authRes;
			})
			.catch(() => {
				return {};
			});
	}
}

/* * * * * * * * *
 * Export Module *
 * * * * * * * * */
module.exports = AuthController;
