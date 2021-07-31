/**
 * @author Isaias Xicale <ixicale@palaceresorts.com
 * @description CUSTOM NOTIFICATION
 */
'use strict';

/* * * * * * * * * * * *
 *  Import Statements  *
 * * * * * * * * * * * */
const Main = require('../app');
const Api = require('../app/endpoints');

class MainNotification extends Main {
    /**
     * Clase principal para enviar correo de notificacion
     * @param {object} payload tags a enviar y sustituir de la plantilla
     * @param {*} tagName 'tagnotification' de frm_notificaciones
     */
    constructor(context) {
        super(context.request, context.response, context.next);
    }

    sendNotification(payload, tagName) {
        this.data = payload;
        this.url = this.path(Api.notificaicones__notificacion, tagName);
        this.setAuthorization();

        this.post((error, response) => {});
    }
}

class MailErrorNotification extends MainNotification {
    // constructor(requestResponse, catchError, payload, requestType) {
    constructor(context) {
        // console.log(context.req, context.res, context.next);
        super(context);
    }

    /**
     *
     * @param {*} data
     */
    buildJSONFormat(data) {
        let formater = '';
        if (Array.isArray(data)) {
            formater += '<span>[</span><ul style="width: 100%; list-style: none !important; margin: 0; padding-left: 16px">';
            data.map((item, idx) => {
                formater += '<li>';
                formater += '<div>';
                formater += this.buildJSONFormat(item);
                if (idx < data.length - 1) formater += ',';
                formater += '</div>';
                formater += '</li>';
            });
            formater += '</ul><span>]</span>';
        } else if (typeof data == 'object') {
            formater += '<span>{</span><ul style="width: 100%; list-style: none !important; margin: 0; padding-left: 16px">';
            let keys = Object.keys(data);
            keys.map((key, idx) => {
                formater += '<li>';
                formater += '<div>';
                let send = data[key];
                formater += `<span style="color: #032f62">"${key}"</span> : ${this.buildJSONFormat(send)}`;

                if (idx < keys.length - 1) formater += ',';

                formater += '</div>';
                formater += '</li>';
            });
            formater += '</ul><span>}</span>';
        } else {
            formater += `<span style="color: #e36209">"${data}"</span>`;
        }
        return formater;
    }

    send() {
        const { code, message } = this.requestResponse;
        const { clientMessage } = this.catchError;
        delete this.requestResponse.toString;
        const data = {
            SYSTEM: `POSTLOGIN`,
            ENV: this.enviroment.toUpperCase(),
            USER: this.username,
            DATE: this.currentTime.toString(),
            CODE: code,
            TYPE_RESPONSE: this.method,
            MSG_ERROR: `${message || clientMessage}`,
            API: this.url,
            PAYLOAD: this.buildJSONFormat(this.payload),
            RESPONSE: this.buildJSONFormat(this.requestResponse),
        };
        this.sendNotification(data, 'NOTIFICATION_API_ERRORS');
    }
}

module.exports.MainNotification = MainNotification;
module.exports.MailErrorNotification = MailErrorNotification;
