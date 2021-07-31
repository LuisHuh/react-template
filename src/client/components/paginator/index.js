import React, { Component } from "react";
import PropTypes from "prop-types";
import "./style.css";

export default class Paginator extends Component {
	constructor(props) {
		super(props);
		this.state = { pager: {} };
	}

	componentWillMount() {
		// set page if items array isn't empty
		if (this.props.items && this.props.items.length) {
			this.setPage(this.props.initialPage);
		}
	}

	componentDidMount() {
		this.props.onRef(this);
	}

	componentDidUpdate(prevProps, prevState) {
		// reset page if items array has changed
		if (this.props.items !== prevProps.items) {
			this.setPage(this.props.initialPage);
		} else if (this.props.limit !== prevProps.limit) {
			this.setPage(this.props.initialPage);
		}
	}

	componentWillUnmount() {
		this.props.onRef(undefined);
	}

	setPage(page) {
		const { limit, items } = this.props;
		var { pager } = this.state;

		// get new pager object for specified page
		pager = this.getPager(items.length, page, limit);
		if (pager.limitExceeded) {
			this.setState({ pager: pager });
			this.props.onChangePage([]);
			return;
		}
		// get new page of items from items array
		var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

		// update state
		this.setState({ pager: pager });

		// call change page function in parent component
		this.props.onChangePage(pageOfItems);
	}

	getPager(totalItems, currentPage, pageSize) {
		if (currentPage < 1 || currentPage > totalItems) {
			return {
				limitExceeded: true,
				pages: [],
			};
		}
		// default to first page
		currentPage = currentPage || 1;

		// default page size is 10
		pageSize = pageSize || 10;

		// calculate total pages
		var totalPages = Math.ceil(totalItems / pageSize);

		var startPage, endPage;
		if (totalPages <= 10) {
			// less than 10 total pages so show all
			startPage = 1;
			endPage = totalPages;
		} else {
			// more than 10 total pages so calculate start and end pages
			if (currentPage <= 6) {
				startPage = 1;
				endPage = 10;
			} else if (currentPage + 4 >= totalPages) {
				startPage = totalPages - 9;
				endPage = totalPages;
			} else {
				startPage = currentPage - 5;
				endPage = currentPage + 4;
			}
		}

		// calculate start and end item indexes
		var startIndex = (currentPage - 1) * pageSize;
		var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

		// create an array of pages to ng-repeat in the pager control
		var pages = [...Array(endPage + 1 - startPage).keys()].map(
			(i) => startPage + i
		);

		// return object with all pager properties required by the view
		return {
			totalItems: totalItems,
			currentPage: currentPage,
			pageSize: pageSize,
			totalPages: totalPages,
			startPage: startPage,
			endPage: endPage,
			startIndex: startIndex,
			endIndex: endIndex,
			pages: pages,
			limitExceeded: false,
		};
	}

	render() {
		var pager = this.state.pager;

		if (!pager.pages || pager.pages.length <= 1) {
			// don't display pager if there is only 1 page
			return null;
		}

		return (
			<ul component="paginator" className="sm-f18x md-f18x lg-f24x">
				<li
					className={pager.currentPage === 1 ? "disabled" : ""}
					component="paginator-first"
				>
					<a
						onClick={
							pager.currentPage === 1
								? null
								: () => this.setPage(1)
						}
					>
						<i className="prr pr-chevron-left prs"></i>
						<i className="prr pr-chevron-left prs"></i>
					</a>
				</li>
				<li
					className={pager.currentPage === 1 ? "disabled" : ""}
					component="paginator-before"
				>
					<a
						disabled={pager.currentPage === 1}
						onClick={
							pager.currentPage === 1
								? null
								: () => this.setPage(pager.currentPage - 1)
						}
					>
						<i className="prr pr-chevron-left prs"></i>
					</a>
				</li>
				{pager.pages.map((page, index) => (
					<li
						key={index}
						className={pager.currentPage === page ? "active" : ""}
						component="paginator-number"
					>
						<a onClick={() => this.setPage(page)}>{page}</a>
					</li>
				))}
				<li
					className={
						pager.currentPage === pager.totalPages ? "disabled" : ""
					}
					component="paginator-next"
				>
					<a
						onClick={
							pager.currentPage === pager.totalPages
								? null
								: () => this.setPage(pager.currentPage + 1)
						}
					>
						<i className="prr pr-chevron-right prs"></i>
					</a>
				</li>
				<li
					className={
						pager.currentPage === pager.totalPages ? "disabled" : ""
					}
					component="paginator-last"
				>
					<a
						onClick={
							pager.currentPage === pager.totalPages
								? null
								: () => this.setPage(pager.totalPages)
						}
					>
						<i className="prr pr-chevron-right prs"></i>
						<i className="prr pr-chevron-right prs"></i>
					</a>
				</li>
			</ul>
		);
	}
}

Paginator.defaultProps = {
	onRef: (context) => {},
	onChangePage: (pageOfItems) => {},
	initialPage: 1,
	limit: 10,
};

Paginator.propTypes = {
	onRef: PropTypes.func,
	onChangePage: PropTypes.func,
	items: PropTypes.array,
	initialPage: PropTypes.number,
	limit: PropTypes.number,
};
