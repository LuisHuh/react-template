import React, { Component } from "react";
import PropTypes from "prop-types";
import "./style.css";

export default class Collapsible extends Component {
    portableClick(index, onRef) {
        const elementList = onRef.current.childNodes;
        const elemetClassName = elementList[index].className;
        for (let idx = 0; idx < elementList.length; idx++) elementList[idx].className = "item close";

        if (elemetClassName == "item close") elementList[index].className = "item open";
    }

    render() {
        const { items, id, onRef, onHeadingClick } = this.props;
        return (
            <div /* component={"collapsible"} */ className="accordionWrapper" id={id} ref={onRef}>
                {items.map((item, index) => (
                    <div className="item close" id={`${id}_c_${index}`} key={`${id}_c_${index}`}>
                        <div
                            className="itemHeading"
                            onClick={(e) => {
                                if (typeof item.heading === "function") return;
                                if (typeof onHeadingClick === "function") this.portableClick(index, onRef);
                            }}
                        >
                            {typeof item.heading === "function"
                                ? item.heading(this.portableClick, index)
                                : typeof item.heading !== "object"
                                ? item.heading
                                : "No valid heading "}
                        </div>
                        <div className="itemContent">
                            {typeof item.content === "function"
                                ? item.content(this.portableClick, index)
                                : typeof item.content !== "object"
                                ? item.content
                                : "No valid content "}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

Collapsible.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.exact({
            content: PropTypes.any,
            heading: PropTypes.any,
        }).isRequired
    ).isRequired,
    id: PropTypes.string.isRequired,
    onRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    onHeadingClick: PropTypes.func,
};
