import React, { Component } from 'react';
import Sliderprincipalslider from '../sliderprincipalslider';

class Sliderprincipal extends Component {
    state = {}
    itemsLider = {}
    positions = 0
    constructor() {
        super();
        this.updateDimensions = this.updateDimensions.bind(this);
        this.state = {}
        this.refslidpr = React.createRef()
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
        window.addEventListener("load", this.updateDimensions);
        this.updateDimensions()
    }
    updateDimensions() {
        if (this.refslidpr.current == null) {
            return false
        }
        this.itemsLider = this.refslidpr.current.Item.current.children
        this.itemsLider[0].scrollLeft = 300
        if (this.itemsLider.length <= 1) {
            this.itemsLider[0].style = "left:100vw"
        }
        for (let i = 0; i < this.itemsLider.length; i++) {
            this.itemsLider[i].scrollLeft = ((1920 - this.itemsLider[0].clientWidth) / 2)
        }
    }

    render() {

        return (
            <section component="sliderprincipal">
                <section className={this.props.class}>
                    <Sliderprincipalslider typeCaptionBg={this.props.typeCaptionBg} refSlide={this.refslidpr} slide={this.props.slides} />
                </section>
            </section>
        )
    }
}

export default Sliderprincipal;