import {Cell, Grid } from '@components/';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Api from '@app/Api';
import Sliderpromotion from './sliderpromotion';
import UseText from '@app/UseText';

export default class CurrentBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hideNav: window.innerWidth,
            dataPromotion:[]
        };
        // this._isMounted = false;
        this.windownresize = this.windownresize.bind(this);
    }

    componentDidMount() {
        // this._isMounted = true;
        window.addEventListener("resize", this.windownresize)
        this.getPromotions();

    }

    // /**
    // * Funcion que se ejecuta al momento de desmontar el componente.
    // */
    // componentWillUnmount(){
    // this._isMounted = false;
    // }

    /**
     *metodo que devuelbe las promociones asignadas segun un blockcode
     *
     * @memberof promotions
     */
    getPromotions(){
		Api.getPromotionsByBlockcode(this.props.blockCode)
		.then((res) => {
            if(!res.error)
            // if(!this._isMounted) return;
                this.setState({dataPromotion:res.data})
		})
		.catch((e) => {

		})
	}

    UNSAFE_componentWillMount() {
        window.addEventListener("resize", this.windownresize);
    }
    windownresize() {
        this.setState({ hideNav: window.innerWidth });
    }

    // --------------------------------------
    // !--------- HELPER FUNCTIONS ----------
    // *---------------BEGIN-----------------

    // *----------------END------------------
    // !--------- HELPER FUNCTIONS ----------
    // --------------------------------------className="text-center"

    render() {
        const { hideNav } = this.state;
        return(
            <Grid id='current-book' type='x' className='grid-margin-x padding-curr-book'>
                <Cell  small={'12'} medium={'12'} large={'12'} ><h6 className="title-2 sm-f18x md-f18x lg-f24x title"> <UseText i18n="YOU_HAVE_CURRENTLY_BOOKED" />:<br className="hide-for-large-only"/><b> {this.props.data.rooms} <UseText i18n="ROOMS" /> / {this.props.data.nigths} <UseText i18n="NIGHTS" /></b> {(this.props.language !=2) ? '':<UseText i18n="RESERVED" />}</h6></Cell>
                <Cell  small={'12'} medium={'12'} large={'12'} ><h6 className="title-2 sm-f18x md-f18x lg-f24x">{(this.state.dataPromotion.length >=1 ? <UseText i18n="BENEFIT_TEXT_WEDDING" />:'')}</h6></Cell>
                <Cell small={'12'} medium={'12'} large={'12'} >
                    <Sliderpromotion Data={this.state.dataPromotion} hideNav={hideNav} language={this.props.language}></Sliderpromotion>
                </Cell>
            </Grid>
            );
    }
}

CurrentBook.propTypes = {
    language: PropTypes.number.isRequired,
    blockCode:PropTypes.string.isRequired
};
