import React, { createContext, useState, useEffect, useContext } from "react";
import { Grid } from "@components";

/**
 * Inicializador de contexto
 * @property FieldsetContext
 * @type React.Context
 */
const FieldsetContext = createContext();

/**
 * Permite pasar parametros a través del contexto
 * @property FieldsetProvider
 * @type React.Provider<any>
 */
const FieldsetProvider = FieldsetContext.Provider;

function Fieldset({ children, ...rest }) {
	const [legend, setLegend] = useState("");
	const methods = { setLegend };

	return (
		<FieldsetProvider value={methods}>
			<fieldset>
				{legend}
				<Grid type="x" {...rest}>
					{children}
				</Grid>
			</fieldset>
		</FieldsetProvider>
	);
}

function Legend({ children, ...rest }) {
   const FieldsetParent = useContext(FieldsetContext);
   const Element = <legend {...rest}>{children}</legend>;
   
	if (FieldsetParent) {
      useEffect(() => {
         FieldsetParent.setLegend(Element);
      }, []);
      
      return null;
   }

	return Element;
}

export { Fieldset, Legend };
