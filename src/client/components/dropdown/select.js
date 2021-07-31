import React from "react";
import Dropdown from "./dropdown";
import List from "./list";
import { Guid } from "../../app/Helpers";
import { ArrowDown as Icon } from "./icons";
import PropTypes from "prop-types";

class Select extends Dropdown {
	defaults = {
		id: Guid(),
		name: "",
		placeholder: "Select Options",
		autoComplete: false,
	};

	componentDidMount(...args) {
		super.componentDidMount.apply(this, args);
		const { items, value, autoComplete } = this._defaultProps();
		this._cancelCoverTrigger = autoComplete;
		this.setState({ items });
		this._setDefaultValue(items, value);
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.items !== prevProps.items) {
			const { items, value } = this._defaultProps();
			this.setState({ items: items }, () => {
				this._setDefaultValue(items, value);
			});
		}

		if (this.props.value !== prevProps.value) {
			const { items, value } = this._defaultProps();
			this._setDefaultValue(items, value);
		}
	}

	_defaultProps = () => {
		return Object.assign({}, this.defaults, this.props);
	};

	_setDefaultValue = (items = [], value) => {
		if (items && Array.isArray(items)) {
			const tmp = items.slice();
			const index = tmp.findIndex((item) => item.value === value);
			const item = tmp[index];
			if (item) {
				item["selected"] = index;
				this.setState({
					query: item.label || "",
					values: item,
				});
			}
		}
	};

	_searchKeywords = (word = "") => {
		let { items } = this._defaultProps();

		items = items ? items.slice() : [];

		return items.filter((val) => {
			if (typeof val.label === "string") {
				if (val.label.toLowerCase().indexOf(word.toLowerCase()) > -1) {
					return true;
				}
			}

			return false;
		});
	};

	_handleDocumentClick = (e) => {
		const target = e.target;
		const { closeOnClick, autoComplete, items } = this._defaultProps();
		if (
			closeOnClick &&
			!this._closest(target, this.el).length &&
			!this._closest(target, this.dropdownEl).length
		) {
			const { values, query } = this.state;
			if (values.label) {
				this.setState((prev) => {
					if (values.label !== query) {
						return {
							query: values.label,
							items,
						};
					}

					return { items };
				});
			}

			this.close(this.state.values);
		}
	};

	_handleClick = (e) => {
		e.preventDefault();
		if (!this.isOpen) {
			this.open();
			if (this._defaultProps().autoComplete) {
				this.setState({ query: "" });
			}
		}
	};

	_resetSelectValues = () => {
		const { onItemClick, name } = this._defaultProps();
		this.setState({ values: {} }, () => {
			onItemClick(Object.assign({}, { name }));
		});
	};

	handleOnChange = (e) => {
		const input = e.target;
		const value = input.value || "";

		this.setState(
			(prev) => {
				const { autoComplete } = this._defaultProps();

				if (autoComplete) {
					const results = this._searchKeywords(value);
					return {
						query: value,
						items: results,
					};
				}

				return {
					query: value,
				};
			},
			() => {
				if (this.isOpen) {
					this.recalculateDimensions();
				} else {
					this.open();
				}
			}
		);
	};

	handleOnClickItem = (params) => {
		const { onItemClick, name, items, autoComplete } = this._defaultProps();
		if (this._mounted) {
			this.setState(
				{
					query: params.label,
					items,
				},
				() => {
					onItemClick(Object.assign({}, params, { name }));
					this.close(params);
				}
			);
		}
	};

	render() {
		let { style, values, query, items } = this.state;
		const { className, placeholder, autoComplete, id, name } = this._defaultProps();

		items = items || [];
		query = query || "";

		return (
			<div
				component="select"
				onClick={this._handleClick}
				className={className}
			>
				<input
					className="browser-default"
					type="text"
					readOnly={!autoComplete}
					placeholder={placeholder}
					style={{ cursor: autoComplete ? "text" : "pointer" }}
					value={query}
					ref={this.$el}
					onChange={this.handleOnChange}
					autoComplete="off"
					name={name}
					id={id}
				/>
				<Icon className="caret" onClick={this._handleClick} />
				<List
					ref={this.$dropdownEl}
					style={style}
					component="dropdown-list"
					onClick={this.handleOnClickItem}
					selected={values.selected}
					readKey="label"
					items={items}
				/>
			</div>
		);
	}
}

Select.propTypes = {
	autoComplete: PropTypes.bool,
	placeholder: PropTypes.string,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.any.isRequired,
			label: PropTypes.any.isRequired,
		}).isRequired
	).isRequired,
	value: PropTypes.string.isRequired,
	closeOnClick: PropTypes.bool,
	onItemClick: PropTypes.func.isRequired,
	query: PropTypes.string,
	name: PropTypes.string.isRequired,
};

export default Select;
