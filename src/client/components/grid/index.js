import React from "react";
import PropTypes from "prop-types";

/**
 * Crea el grid contenedor, x e y
 * @param {Object} props Parametros para el grid
 * @param {string} props.className Lista de clases
 * @param {"x"|"y"|null} props.type __x__ para __grid-x__ | __y__ para __grid-y__ | __null__ para __grid-container__
 * @param {string} props.smallup  afecta los cell children y los divide equitativamente. No en columnas
 * @param {string} props.mediumup afecta los cell children y los divide equitativamente. No en columnas
 * @param {string} props.largeup  afecta los cell children y los divide equitativamente. No en columnas
 */
const Grid = ({ type, children, smallup, mediumup, largeup, ...params }) => {
    const component = type ? `grid-${type}` : null;
    const customProps = {
        "small-up": smallup,
        "medium-up": mediumup,
        "large-up": largeup,
    };

    return (
        <div component={component} {...customProps} {...params}>
            {children}
        </div>
    );
};

const numbers = [...Array(12).keys()].map(i => i+1);
const valid = [].concat(numbers, numbers.map(i => i.toString(10)));

Grid.propTypes = {
    className: PropTypes.string, // ["fluid", "full"]
    type: PropTypes.oneOf(["x", "y", "container"]),
    smallup: PropTypes.oneOf(valid),
    mediumup: PropTypes.oneOf(valid),
    largeup: PropTypes.oneOf(valid),
};
Grid.defaultProps = {
    className: null,
    type: "container",
    smallup: null,
    mediumup: null,
    largeup: null,
};

/**
 * Crea una celda para el grid
 * @param {Object} prop Parametros para la celda
 * @param {string} prop.small Cantidad de columnas a ocupar en modo mobile
 * @param {string} prop.medium Cantidad de columnas a ocupar en modo tableta
 * @param {string} prop.large Cantidad de columnas a ocupar en modo escritorio
 */
function Cell({ children, ...params }) {
    return (
        <div component="cell" {...params}>
            {children}
        </div>
    );
}

Cell.propTypes = {
    className: PropTypes.string,
    small: PropTypes.oneOf(valid),
    medium: PropTypes.oneOf(valid),
    large: PropTypes.oneOf(valid),
};
Cell.defaultProps = {
    className: null,
    small: null,
    medium: null,
    large: null,
};

export { Grid, Cell };
