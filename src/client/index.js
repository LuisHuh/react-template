/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description index.js - Archivo principal para cargar la aplicación.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from '@app/SWRutime';

ReactDOM.render(<App/>, document.getElementById('root'));

//serviceWorker.register();
serviceWorker.unregister();