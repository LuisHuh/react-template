/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description Template Loader
 */
import { StyleLoader } from '@app/StyleLoader';
import React from 'react';

/**
 * Cargador de estilos en las plantillas
 * @param { Object } props Attributos de la plantilla
 * @param { string } props.stylesheet Nombre de la hoja de estilos, debe ser sass.
 * @param { string } props.theme Nombre del tema --- *default stylesheet*.
 * @param { React.Component } props.children Nombre de la hoja de estilos, debe ser sass.
 */
function TemplateLoader({ stylesheet, theme, children, ...props }) {
   return (
      <StyleLoader stylesheet={stylesheet}>
         {
            isLoaded => (
               <div theme={theme || stylesheet} {...props}>
                  {children}
               </div>
            )
         }
      </StyleLoader>
   );
}

TemplateLoader.defaultProps = {
   stylesheet: '',
   theme: null
};

export default TemplateLoader;
