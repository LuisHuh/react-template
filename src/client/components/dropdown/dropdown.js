import React, { Component, createRef, Fragment } from "react";
import List from "./list";
import { anim } from "./anim";

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            style: {},
            values: {},
        };

        this.$el = createRef();
        this.$dropdownEl = createRef();
        this._cancelCoverTrigger = false;
        this.keys = {
            ARROW_DOWN: 40,
            ARROW_UP: 38,
            ENTER: 13,
            ESC: 27,
            TAB: 9,
        };
    }

    componentDidMount() {
        this._mounted = true;
        this.isOpen = false;
        this.el = this.$el.current;
        this.dropdownEl = this.$dropdownEl.current;

        this._setupEventHandlers();
    }

    componentWillUnmount() {
        this._removeEventHandlers();
        this._mounted = false;
        this.isOpen = false;
    }

    _checkPossibleAlignments = (el, container, bounding, offset) => {
        let canAlign = {
            top: true,
            right: true,
            bottom: true,
            left: true,
            spaceOnTop: null,
            spaceOnRight: null,
            spaceOnBottom: null,
            spaceOnLeft: null,
        };

        let containerAllowsOverflow =
            getComputedStyle(container).overflow === "visible";
        let containerRect = container.getBoundingClientRect();
        let containerHeight = Math.min(
            containerRect.height,
            window.innerHeight
        );
        let containerWidth = Math.min(containerRect.width, window.innerWidth);
        let elOffsetRect = el.getBoundingClientRect();

        let scrollLeft = container.scrollLeft;
        let scrollTop = container.scrollTop;

        let scrolledX = bounding.left - scrollLeft;
        let scrolledYTopEdge = bounding.top - scrollTop;
        let scrolledYBottomEdge =
            bounding.top + elOffsetRect.height - scrollTop;

        // Check for container and viewport for left
        canAlign.spaceOnRight = !containerAllowsOverflow
            ? containerWidth - (scrolledX + bounding.width)
            : window.innerWidth - (elOffsetRect.left + bounding.width);
        if (canAlign.spaceOnRight < 0) {
            canAlign.left = false;
        }

        // Check for container and viewport for Right
        canAlign.spaceOnLeft = !containerAllowsOverflow
            ? scrolledX - bounding.width + elOffsetRect.width
            : elOffsetRect.right - bounding.width;
        if (canAlign.spaceOnLeft < 0) {
            canAlign.right = false;
        }

        // Check for container and viewport for Top
        canAlign.spaceOnBottom = !containerAllowsOverflow
            ? containerHeight - (scrolledYTopEdge + bounding.height + offset)
            : window.innerHeight -
              (elOffsetRect.top + bounding.height + offset);
        if (canAlign.spaceOnBottom < 0) {
            canAlign.top = false;
        }

        // Check for container and viewport for Bottom
        canAlign.spaceOnTop = !containerAllowsOverflow
            ? scrolledYBottomEdge - (bounding.height - offset)
            : elOffsetRect.bottom - (bounding.height + offset);
        if (canAlign.spaceOnTop < 0) {
            canAlign.bottom = false;
        }

        return canAlign;
    };

    _getPosition = () => {
        const { coverTrigger, alignment } = this.props;
        let triggerBRect = this.el.getBoundingClientRect();
        let dropdownBRect = this.dropdownEl.getBoundingClientRect();

        let idealHeight = dropdownBRect.height;
        let idealWidth = dropdownBRect.width;
        let idealXPos = triggerBRect.left - dropdownBRect.left;
        let idealYPos = triggerBRect.top - dropdownBRect.top;

        let dropdownBounds = {
            left: idealXPos,
            top: idealYPos,
            height: idealHeight,
            width: idealWidth,
        };

        // Countainer here will be closest ancestor with overflow: hidden
        let closestOverflowParent = !!this.dropdownEl.offsetParent
            ? this.dropdownEl.offsetParent
            : this.dropdownEl.parentNode;

        let alignments = this._checkPossibleAlignments(
            this.el,
            closestOverflowParent,
            dropdownBounds,
            this._cancelCoverTrigger
                ? triggerBRect.height
                : coverTrigger
                ? 0
                : triggerBRect.height
        );

        let verticalAlignment = "top";
        let horizontalAlignment = alignment;
        idealYPos += this._cancelCoverTrigger
            ? triggerBRect.height
            : coverTrigger
            ? 0
            : triggerBRect.height;

        // Reset isScrollable
        //this.isScrollable = false;

        if (!alignments.top) {
            if (alignments.bottom) {
                verticalAlignment = "bottom";
            } else {
                //this.isScrollable = true;

                // Determine which side has most space and cutoff at correct height
                if (alignments.spaceOnTop > alignments.spaceOnBottom) {
                    verticalAlignment = "bottom";
                    idealHeight += alignments.spaceOnTop;
                    idealYPos -= alignments.spaceOnTop;
                } else {
                    idealHeight += alignments.spaceOnBottom;
                }
            }
        }

        // If preferred horizontal alignment is possible
        if (!alignments[horizontalAlignment]) {
            let oppositeAlignment =
                horizontalAlignment === "left" ? "right" : "left";
            if (alignments[oppositeAlignment]) {
                horizontalAlignment = oppositeAlignment;
            } else {
                // Determine which side has most space and cutoff at correct height
                if (alignments.spaceOnLeft > alignments.spaceOnRight) {
                    horizontalAlignment = "right";
                    idealWidth += alignments.spaceOnLeft;
                    idealXPos -= alignments.spaceOnLeft;
                } else {
                    horizontalAlignment = "left";
                    idealWidth += alignments.spaceOnRight;
                }
            }
        }

        if (verticalAlignment === "bottom") {
            idealYPos =
                idealYPos -
                dropdownBRect.height +
                (this._cancelCoverTrigger
                    ? -triggerBRect.height
                    : coverTrigger
                    ? triggerBRect.height
                    : 0);
        }

        if (horizontalAlignment === "right") {
            idealXPos = idealXPos - dropdownBRect.width + triggerBRect.width;
        }

        return {
            x: idealXPos,
            y: idealYPos,
            verticalAlignment: verticalAlignment,
            horizontalAlignment: horizontalAlignment,
            height: idealHeight,
            width: idealWidth,
        };
    };

    _placeDropdown = () => {
        // Set width before calculating positionInfo
        let idealWidth = this.props.constrainWidth
            ? this.el.getBoundingClientRect().width
            : this.dropdownEl.getBoundingClientRect().width;

        if (this._mounted) {
            this.setState(
                (prev) => {
                    const style = Object.assign({}, prev.style);
                    style["width"] = idealWidth;

                    return { style };
                },
                () => {
                    let positionInfo = this._getPosition();

                    const _style = {
                        left: positionInfo.x + "px",
                        top: positionInfo.y + "px",
                        height: positionInfo.height + "px",
                        width: positionInfo.width + "px",
                        transformOrigin: `${
                            positionInfo.horizontalAlignment === "left"
                                ? "0"
                                : "100%"
                        } ${
                            positionInfo.verticalAlignment === "top"
                                ? "0"
                                : "100%"
                        }`,
                        transform: "",
                    };

                    this.setState((prev) => {
                        const prevStyle = prev.style;
                        const style = Object.assign({}, prevStyle, _style);
                        return { style };
                    });
                }
            );
        }
    };

    _animateIn = (duration = 10) => {
        anim({
            element: this,
            opacity: [0, 1],
            scaleX: [0.3, 1],
            scaleY: [0.3, 1],
            duration: duration,
        });
    };

    _closest = (el, ancestorSelector) => {
        let current = el;
        let count = 0;
        while (current && current !== ancestorSelector && count < 100) {
            current = current.parentElement;
            count++;
        }

        return current ? [current] : [];
    };

    _setupEventHandlers = () => {
        // Hover event handlers
        if (this.props.hover) {
            this.el.addEventListener("mouseenter", this.open);
            this.el.addEventListener("mouseleave", this._handleMouseLeave);
            this.dropdownEl.addEventListener(
                "mouseleave",
                this._handleMouseLeave
            );
        } else {
            this.el.addEventListener("click", this._handleClick);
        }
    };

    _removeEventHandlers = () => {
        if (this.props.hover) {
            this.el.removeEventListener("mouseenter", this.open);
            this.el.removeEventListener("mouseleave", this._handleMouseLeave);
            this.dropdownEl.removeEventListener(
                "mouseleave",
                this._handleMouseLeave
            );
        } else {
            this.el.removeEventListener("click", this.open);
        }
    };

    _setupTemporaryEventHandlers = () => {
        // Use capture phase event handler to prevent click
        document.body.addEventListener(
            "click",
            this._handleDocumentClick,
            true
        );
    };

    _removeTemporaryEventHandlers = () => {
        // Use capture phase event handler to prevent click
        document.body.removeEventListener(
            "click",
            this._handleDocumentClick,
            true
        );
    };

    _handleMouseLeave = (e) => {
        let toEl = e.toElement || e.relatedTarget;
        let leaveToDropdownContent = !!this._closest(toEl, this.dropdownEl)
            .length;
        let leaveToActiveDropdownTrigger = false;

        let $closestTrigger = this._closest(toEl, this.el);
        if ($closestTrigger.length && !!$closestTrigger[0]) {
            leaveToActiveDropdownTrigger = true;
        }

        // Close hover dropdown if mouse did not leave to either active dropdown-trigger or dropdown-content
        if (!leaveToActiveDropdownTrigger && !leaveToDropdownContent) {
            this.close(this.state.values);
        }
    };

    _handleDocumentClick = (e) => {
        const target = e.target;
        const { closeOnClick } = this.props;
        if (closeOnClick && !this._closest(target, this.el).length) {
            this.close(this.state.values);
        }
    };

    _setDefaultValues = (value) => {
        if (this._mounted) {
            this.setState({ value });
        }
    };

    _resetDropdownStyles = () => {
        this.setState({ style: {} });
    };

    _handleClick = (e) => {
        e.preventDefault();
        if (!this.isOpen) {
            this.open();
        }
    };

    open = (e) => {
        if (this._mounted) {
            const { onOpenStart, onOpenEnd, name } = this.props;
            onOpenStart({ name, ...this.state.values });
            this.setState(
                {
                    style: {
                        display: "block",
                    },
                },
                () => {
                    this._placeDropdown();
                    this._animateIn();
                    this._setupTemporaryEventHandlers();
                    onOpenEnd({ name, ...this.state.values });
                    this.isOpen = true;
                }
            );
        }
    };

    close = (params) => {
        
        if (this._mounted) {
            const { onCloseStart, onCloseEnd, name } = this.props;
            onCloseStart({ name, ...params });

            this.setState({ style: {} }, () => {
                this._removeTemporaryEventHandlers();
                onCloseEnd({ name, ...params });
                this.isOpen = false;
            });
        }
    };

    recalculateDimensions = () => {
        if (this.isOpen) {
            this.setState(
                (prev) => {
                    const style = Object.assign({}, prev.style);
                    style["width"] = "";
                    style["height"] = "";
                    style["left"] = "";
                    style["top"] = "";
                    style["transformOrigin"] = "";

                    return { style };
                },
                () => {
                    this._placeDropdown();
                }
            );
        }
    };

    clickItem = (params) => {
        const { onItemClick, name } = this.props;
        if (this._mounted) {
            this.setState(
                {
                    values: params,
                },
                () => {
                    onItemClick(Object.assign({}, params, { name }));
                    this.close(params);
                }
            );
        }
    };

    render() {
        const { style, values } = this.state;
        const { items, children, className } = this.props;
        return (
            <Fragment>
                <a component="btn-trigger" className={className} ref={this.$el}>
                    {children}
                </a>
                <List
                    ref={this.$dropdownEl}
                    style={style}
                    component="dropdown-list"
                    onClick={this.clickItem}
                    selected={values.selected}
                    readKey="label"
                    items={items}
                />
            </Fragment>
        );
    }
}

Dropdown.defaultProps = {
    items: [],
    name: "",
    value: "",
    className: "",
    alignment: "left",
    autoFocus: true,
    constrainWidth: true,
    coverTrigger: true,
    closeOnClick: true,
    hover: false,
    inDuration: 150,
    outDuration: 250,
    onOpenStart: (params) => {},
    onOpenEnd: (params) => {},
    onCloseStart: (params) => {},
    onCloseEnd: (params) => {},
    onItemClick: (params) => {},
};

export default Dropdown;
