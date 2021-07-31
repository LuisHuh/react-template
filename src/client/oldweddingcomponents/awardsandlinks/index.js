import React, { Component } from "react";
import { Cell, Grid } from "./../../components";
import { Iconwedd } from "../index";
import { withRouter } from "react-router-dom";

class Awardsandlinks extends Component {
    render() {
        const {
            match: { params },
        } = this.props;

        return (
            <section component="awardsandlinks">
                <article className="container" style={{ background: "var(--white)" }}>
                    <div className="container footer-ourawards">
                        <Grid type="y" small-up="2">
                            <Cell style={{ paddingTop: "29px" }}>
                                <Grid type="x">
                                    <Cell small="5">
                                        <hr className="margin-unset hr-pink" />
                                    </Cell>
                                    <Cell small="2">
                                        <span className="center awards">
                                            {params.lang === "en"
                                                ? "OUR AWARDS"
                                                : params.lang === "es"
                                                ? "PREMIOS"
                                                : "OUR AWARDS"}
                                        </span>
                                    </Cell>
                                    <Cell small="5">
                                        <hr className="margin-unset hr-pink" />
                                    </Cell>
                                </Grid>
                            </Cell>
                            <Cell style={{ paddingTop: "47px" }}>
                                <Grid type="x">
                                    <Cell small="3"></Cell>
                                    <Cell small="2">
                                        <Iconwedd icon={"five-diamond"} color={"gray five-content center"} />
                                    </Cell>
                                    <Cell small="2">
                                        <Iconwedd
                                            icon={"tripadvisor-award"}
                                            color={"gray center tripadvisor-content"}
                                        />
                                    </Cell>
                                    <Cell small="2">
                                        <Iconwedd icon={"four-diamond"} color={"gray four-content center"} />
                                    </Cell>
                                    <Cell small="3"></Cell>
                                </Grid>
                            </Cell>
                        </Grid>
                    </div>
                </article>
            </section>
        );
    }
}

export default withRouter(Awardsandlinks);
