import React, { cloneElement, Fragment, useCallback, useState } from "react";
import MIMETypes from "@app/MIMETypes";
import { getFile } from "@app/Methods";
import { FileLoader } from "@components";

/**
 * Descarga un archivo embebiendo un componente de tipo _a_ o _button_.
 * @param {Object} props Parámetros del componente.
 * @param {string|URL} props.url Ruta o API del archivo a descargar.
 * @param {string} props.filename Nombre del archivo. No agregar extensión.
 * @param {JSX.Element} props.children Requiere un elemento _button_ u _a_ el cual sera el interruptor del evento.
 */
function FileDownloader({ url, filename, children }) {
   const [isFetching, setFetching] = useState(false);
   
   const disableScroll = (bool) => {
      document.body.style.overflow = bool? "hidden" : "auto";
   }

	useCallback(() => {
      return () => {
         disableScroll(false);
      }
   });

	const onClick = (e) => {
      setFetching(true);
      disableScroll(true);

		getFile(url)
			.then((file) => {
				if (file instanceof Blob) {
					// Datos del archivo nuevo.
					const ext = MIMETypes[file.type];
					file.lastModifiedDate = Date.now();
					if (typeof filename === "string") {
						filename = filename.replace(" ", "_").trim();
					}
					file.name = `${file.lastModifiedDate}_${filename}.${ext}`;

					// Link temporal de descarga.
					const link = document.createElement("a");
					link.download = file.name;
					link.href = URL.createObjectURL(file);
					link.click();
				}
            setFetching(false);
            disableScroll(false);
			})
			.catch((err) => {
            setFetching(false);
            disableScroll(false);
				console.error(err);
			});
	};

	return (
		<Fragment>
			<FileLoader isLoading={isFetching} />
			{cloneElement(children, { onClick })}
		</Fragment>
	);
}

FileDownloader.defaultProps = {
	url: "",
	filename: "file",
};

export default FileDownloader;
