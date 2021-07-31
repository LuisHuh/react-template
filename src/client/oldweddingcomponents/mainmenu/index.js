import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

import { Submenu } from "../index";
import WithContext from '@app/ServiceContext';

class Mainmenu extends Component {
    menuactive = -1;
    constructor() {
        super();
        this.handleOver = this.handleOver.bind(this);
        this.state = {
            activeMenu: -1,
            variable: null,
            link: "/en/take-next-step",
            txt: "TAKE THE NEXT STEP",
        };
    }

    componentDidMount() {
        const {
            match: { params },
        } = this.props;
        switch (params.lang) {
            case "es":
                this.setState({
                    link: "/es/da-el-siguiente-paso",
                    txt: "DA EL SIGUIENTE PASO",
                });
                break;
        }
    }

    handleOver = (check, e) => {
        this.setState({
            variable: check,
        });
    };
    handleOut = () => {
        this.setState({
            variable: "",
        });
    };

    render() {
        return (
            <ul ref={this.props.menuLi} component="mainmenu">
                {this.props.mainmenu.map((menus, index) => {
                    let sub =
                        this.state.variable == menus.Titulo ? (
                            <Submenu
                                active={window.location.pathname}
                                mouseout={this.handleOut}
                                component="submenu"
                                title={menus.Titulo}
                                Img={menus.Img}
                                menus={menus.Submenu}
                            />
                        ) : null;
                    return (
                        <li
                            key={index}
                            onMouseOver={this.handleOver.bind(this, menus.Titulo)}
                            className={
                                this.props.mainmenu.length == index + 1 ? "margin-especial" : "border-white-left"
                            }
                            key={menus.Key}
                        >
                            <Link
                                to={menus.Url}
                                className={(this.state.activeMenu = 1 ? "nav-link-weddings" : "nalgets")}
                            >
                                {menus.Titulo}
                            </Link>
                            {sub}
                        </li>
                    );
                })}
                <li>
                    <Link to={this.state.link}>
                        <section component="inputwedd">
                            <input type={"button"} className="btn pink" value={this.state.txt} />
                        </section>
                    </Link>
                </li>
            </ul>
        );
    }
}

export default withRouter(WithContext(Mainmenu));
