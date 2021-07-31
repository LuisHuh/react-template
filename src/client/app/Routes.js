/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description Routes.js - Lista de rutas para enrutamiento de las paginas.
 */

/** * * **
 * Rutas *
 ** * * **/

/**
 * Grupo de vistas
 */
const home = ['/'];


/**
 * Tomar este ejemplo si se desea agregar una nueva vista.
 * @type {{
 *  group:Array<String>;    // Grupo de URLs de las vistas donde se mostrar esta opción del menu, propiedad opcional.
 *  isExact:boolean;        // Establece si la ruta debe ser considerada como unica, por defecto es falso;
 *  isPrivate:boolean;      // Establece si la vista es privada o publica, por defecto es publico;
 *  layout:String;          // Establece la plantilla que la vista usará, por defecto es nulo;
 *  name:String;            // Establece el nombre para mostrar en el menu, es requerido solamente si se incluirá en el menu lateral;
 *  path:String;            // Url para la vista. ES OBLIGATORIO!;
 *  showInMenu:boolean;     // Define si se mostrara en el menu lateral, por defecto es false.
 *  view:String             // Nombre de la clase o función de la vista a asignar. ES OBLIGATORIO!.
 * }}
 */
const currentSettings = {
    group: [],
    isExact: true,
    isPrivate: false,
    layout: null,
    name: 'Example name to display',
    path: '/example-path',
    showInMenu: false,
    view: 'ViewClassName',
};

/**
 * Lista de rutas.
 * @property {Object} roomingList
 */
let routes = {
    /**
     * Home
     */
    home: {
        ...currentSettings,
        group: home,
        name: 'Home',
        path: '/',
        view: 'Home',
    },
};

routes = Object.assign({}, routes, {
    /**
     * Opciones para pagina no encontrada
     */
    notFound: {
        layout: 'WeddingTemplate',
        name: 'Not Found',
        view: 'e400',
    },
});
export default routes;
