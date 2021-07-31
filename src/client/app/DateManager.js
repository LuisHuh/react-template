/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description Administrador de fechas.
 */

"use strict";

class DateManager {
	constructor() {}

	/**
	 * Expresión regular para verificar si la fecha incluye hora.
	 */
	static regexArgs = /\s\d{2}([\.\:])\d{2}([\.\:])\d{2}/;

	// Equivalencias de tiempo

	/**
	 * Representación de un segundo.
	 */
	static second = 1000;

	/**
	 * Representación de un minuto.
	 */
	static minute = DateManager.second * 60;

	/**
	 * Representación de una hora.
	 */
	static hour = DateManager.minute * 60;

	/**
	 * Representación de un dia.
	 */
	static day = DateManager.hour * 24;

	/**
	 * Lista de idiomas admitidos.
	 */
	availableLangs = ["es", "en"];

	/**
	 * Lista de países admitidos.
	 */
	availableRegions = ["usa", "mex"];

	/**
	 * Formato de país para la librería Intl.
	 */
	countries = ["US", "MX"];

	/**
	 * Valida si el idioma introducido esta admitida o soportada.
	 * @param {string} lang Idioma.
	 */
	isValidLang(lang) {
		if (!lang && typeof lang !== "string") {
			return false;
		}

		lang = lang.trim(lang);
		lang = lang.toLowerCase(lang);

		return this.availableLangs.indexOf(lang) > -1;
	}

	/**
	 * Valida si la region introducida esta admitida o soportada.
	 * @param {string} region Código de país.
	 */
	isValidRegion(region) {
		if (!region && typeof region !== "string") {
			return false;
		}

		region = region.trim(region);
		region = region.toLowerCase(region);

		return this.availableRegions.indexOf(region) > -1;
	}

	/**
	 * Valida si el dato introducido es una fecha correcta.
	 * @param {string|Date} date Fecha para iniciar conteo.
	 */
	static isValidDate(date) {
		date = new Date(date);
		return date != NaN && date != "Invalid Date";
	}

	/**
	 * Regresa el tiempo con dos dígitos en caso ser menor a 10.
	 * @param {Number} time tiempo de reloj
	 */
	static digitalParse(time) {
		time = DateManager.getMaxNumber(time);
		return time < 10 && time >= 0 ? `0${time}` : time;
	}

	/**
	 * Convierte un string a fecha en caso que sea valido
	 * De lo contrario regresa la fecha del sistema.
	 * @param {string|Date} date Fecha a convertir.
	 */
	static dateParse(date) {
		if (DateManager.isValidDate(date)) {
			if (typeof date === "string") {
				if (!date.match(DateManager.regexArgs)) {
					date = date.concat("T", "00:00:00");
				}
				return new Date(date);
			}
			return date;
		}

		return new Date();
	}

	/**
	 * Devuelve el país en el formato correcto para Intl.
	 * @param {string} region código de país.
	 */
	getCountry(region) {
		const index = this.availableRegions.indexOf(region);
		return this.countries[index];
	}

	/**
	 * Regresa el valor máximo entero menor o igual a un número.
	 * @param {Number} value Valor numérico.
	 */
	static getMaxNumber(value) {
		return Math.floor(value);
	}

	/**
	 * Obtiene la diferencia en tiempo de dos fechas.
	 * @param {string|Date} startDate Fecha inicial.
	 * @param {string|Date} endDate Fecha final.
	 */
	static getTimeDiff(startDate, endDate) {
		startDate = DateManager.dateParse(startDate);
		endDate = DateManager.dateParse(endDate);

		const timeDiff = startDate.getTime() - endDate.getTime();

		return timeDiff > 0 ? timeDiff : 0;
	}

	/**
	 * Obtiene el tiempo restante entre dos fechas.
	 * @param {string|Date} startDate Fecha inicial.
	 * @param {string|Date} endDate Fecha final.
	 */
	static getTimeRemaining(startDate, endDate) {
		const diff = DateManager.getTimeDiff(startDate, endDate),
			day = DateManager.day,
			hour = DateManager.hour,
			minute = DateManager.minute,
			second = DateManager.second;

		return {
			days: DateManager.getMaxNumber(diff / day),
			hours: DateManager.getMaxNumber((diff % day) / hour),
			minutes: DateManager.getMaxNumber((diff % hour) / minute),
			seconds: DateManager.getMaxNumber((diff % minute) / second),
			timeRemaining: diff,
		};
	}

	/**
	 * Obtiene el tiempo transcurrido entre dos fechas.
	 * @param {string|Date} startDate Fecha inicial.
	 * @param {string|Date} endDate Fecha final.
	 */
	static getTimeElapsed(startDate, endDate) {
		startDate = DateManager.dateParse(startDate);
		endDate = DateManager.dateParse(endDate);
		const day = DateManager.day,
			hour = DateManager.hour,
			minute = DateManager.minute,
			second = DateManager.second;

		const diff = endDate - startDate;

		return {
			days: DateManager.getMaxNumber(diff / day),
			hours: DateManager.getMaxNumber((diff % day) / hour),
			minutes: DateManager.getMaxNumber((diff % hour) / minute),
			seconds: DateManager.getMaxNumber((diff % minute) / second),
			timeElapsed: diff,
		};
	}

	/**
	 * Genera una fecha para un lugar determinado _Por defecto __Estados Unidos___.
	 * @param  {string|Date} date Fecha a generar.
	 * @param  {'short'|'long'|'large'} format Indica si se muestra en formato completo o reducido.
	 * @param  {'usa'|'mex'} region Código de referencia de país para formato.
	 * @param  {'en'|'es'} lang Idioma a traducir.
	 * @param  {string} timezone Zona horaria deseada.
	 */
	localDate(
		date,
		format = "short",
		region = "usa",
		lang = "en",
		timezone = "America/Cancun",
		isCustom=false,
		isTableDate=true

	) {
		if (date && format && region && lang && timezone) {
			if (!this.isValidLang(lang) || !this.isValidRegion(region)) {
				console.error("El lenguaje o el país no esta soportado.");
				return;
			}

			region = this.getCountry(region);
			const options = {
				timeZone: timezone,
			};
			if (format === "large" || format === "long") {
				if (format === "large"){
					options.weekday = "long";
				}
				options.year = "numeric";
				options.month = format === "large"? "long" : "short";
				options.day = "numeric";
			}
			if(isCustom){
				options.hour= 'numeric';
				options.minute= 'numeric';
				date = DateManager.dateParse(date);
				let dt = (date=="Invalid Date") ? new Date():date;

				date = new Intl.DateTimeFormat(`${lang}-${region}`, options).format(
					dt
				);
					let strDate = date.split(",");
					let obj ={
						date:strDate[0]+","+strDate[1],
						hours:strDate[2]
					}
					let obj_es ={}
					if(lang !="en"){
						let strDate = date.split(" ");
						let lengt =strDate[2].length
						let mes =strDate[2].substr(-lengt,3);
						 obj_es ={
							date:strDate[0]+" "+mes+", "+strDate[4]+" ",
							hours:strDate[5]
						}

					}

				return (lang =="en") ? obj: obj_es;
			}

			date = DateManager.dateParse(date);
			date = new Intl.DateTimeFormat(`${lang}-${region}`, options).format(
				date
			);

			if(isTableDate){
				// let date1=new Date(date);

					if(lang=='en'){
						let fecha = date.split(" ");
						let mes  = fecha[0];
						let dia = fecha[1];
						let messtring = date.split(",");
						let anio = messtring[1];
						let regex=/,/gi;
						let newday = dia.replace(regex,'');
						let dayw ={1:'01',2:'02',3:'03',4:'04',5:'05',6:'06',7:'07',8:'08',9:'09'}

						let da = dayw.hasOwnProperty(newday) ? dayw[newday] : newday ;
						let obj = {
							day:da || '',
							month:mes || '',
							year:anio || ''
						}

						return obj;
					}else{
						let fecha = date.split(" ");
						let dia = fecha[0];
						let mes = fecha[2];
						let anio = fecha[4];
						let dayw ={1:'01',2:'02',3:'03',4:'04',5:'05',6:'06',7:'07',8:'08',9:'09'}
						let da = dayw.hasOwnProperty(dia) ? dayw[dia] : dia ;
						let obj = {
							day:da,
							month:mes,
							year:anio
						}
						return obj;
					}

				}


			return date;
		}

		console.error(
			"Algunos campos son requeridos:",
			"date,",
			"format,",
			"region,",
			"lang,",
			"timezone."
		);
		return;
	}
}

export default DateManager;
