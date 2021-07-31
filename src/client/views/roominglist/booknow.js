import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Cell, Select } from '@components';

export default class Booknow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // ? form
            _slct_typeReserv: '',
            _slct_resort: '',
            _slct_adults: '',
            _slct_teens: '',
            _slct_kids: '',
            _slct_infants: '',

            // ? aux values
            _lstSlct_typeReserv: [],
            _lstSlct_resort: [],
            _lstSlct_adults: [],
            _lstSlct_teens: [],
            _lstSlct_kids: [],
            _lstSlct_infants: [],
        };
    }

    //#region    // !----------------------------------------------------------- 'REACT ABSTRACT'
    static propTypes = {};
    static defaulProps = {};

    componentDidMount() {
        // this.setSelectByAPI('_lstSlct_adults', () => {}, 'getQuantitiesSelect');

        this.setSelectByAPI('_lstSlct_typeReserv', 'apiReserv', (data, key) => {
            // data.unshift({ key: '', label: 'Type of Reservation' });
            // this.setState({ [key]: data });
        });
        this.setSelectByAPI('_lstSlct_resort', 'apiResorts');
        this.setSelectByAPI('_lstSlct_adults', 'apiQuant');
        this.setSelectByAPI('_lstSlct_teens', 'apiQuant');
        this.setSelectByAPI('_lstSlct_kids', 'apiQuant');
        this.setSelectByAPI('_lstSlct_infants', 'apiQuant');
    }
    //#endregion // !----------------------------------------------------------- 'REACT ABSTRACT'

    //#region    // !----------------------------------------------------------- 'TODO: REMOVE aux funct'
    apiQuant() {
        return {
            error: false,
            data: [
                { value: '1', label: 'One' },
                { value: '2', label: 'Two' },
                { value: '3', label: 'Three' },
                { value: '4', label: 'Four' },
                { value: '5', label: 'Five' },
                { value: '6', label: 'Six' },
                { value: '6', label: 'Seven' },
            ],
        };
    }
    apiResorts() {
        return {
            error: false,
            data: [
                { value: 'ZHMI', label: 'Ejemplo resort 1' },
                { value: 'ZHM2', label: 'Ejemplo resort 2' },
                { value: 'ZHM3', label: 'Ejemplo resort 3' },
            ],
        };
    }
    apiReserv() {
        return {
            error: false,
            data: [
                { value: 'H1', label: 'Ejemplo reserv 1' },
                { value: 'H2', label: 'Ejemplo reserv 2' },
                { value: 'H3', label: 'Ejemplo reserv 3' },
            ],
        };
    }
    //#endregion // !----------------------------------------------------------- 'TODO: REMOVE aux funct'

    //#region    // !----------------------------------------------------------- 'HELPER FUNCTIONS'
    /**
     * Helper to set data at select
     * @param {String} stateKey
     * @param {String} keyApiGet
     * @param {Function} extraFunction
     * @param  {Array<any>} args
     */
    setSelectByAPI(stateKey, keyApiGet, extraFunction, ...args) {
        // console.log(`args ${stateKey} ${keyApiGet}`, args);
        const resp = this[keyApiGet](...args);
        this.setState(
            {
                [stateKey]: !resp['error'] ? resp['data'] : [],
            },
            () => {
                // console.log('extraFunction', typeof extraFunction);
                if (typeof extraFunction == 'function') extraFunction(this.state[stateKey]);
            }
        );

        // this[keyApiGet](...args)
        //     .then((res) => {
        //         console.log('res', res)
        //         extraFunction();
        //     })
        //     .catch((err) => {

        //     });

        return;
    }
    //#endregion // !----------------------------------------------------------- 'HELPER FUNCTIONS'

    render() {
        return (
            <div component='booknow'>
                <Grid type='x' className='grid-margin-x'>
                    <Cell className='shrink'>
                        <i className='fas fa-bed'></i>
                    </Cell>
                    <Cell className='auto'>
                        <label htmlFor='_slct_typeReserv'>Type of Reservation</label>
                        <Select
                            value={this.state._slct_typeReserv}
                            items={this.state._lstSlct_typeReserv}
                            name='_slct_typeReserv'
                            id='_slct_typeReserv'
                            onItemClick={(data) => {
                                const { label, name, key } = data;
                                this.setState({ [name]: key }, () => {
                                    /* console.log('this.state', this.state); */
                                });
                            }}
                        />
                    </Cell>
                    <Cell className='auto'>
                        <label htmlFor='_slct_resort'>Select Resort</label>
                        <Select
                            value={this.state._slct_resort}
                            items={this.state._lstSlct_resort}
                            name='_slct_resort'
                            id='_slct_resort'
                            onItemClick={(data) => {
                                const { label, name, key } = data;
                                this.setState({ [name]: key }, () => {
                                    /* console.log('this.state', this.state); */
                                });
                            }}
                        />
                    </Cell>
                    <Cell className='auto'>
                        <label htmlFor=''>Date of your stay</label>
                        <></>
                    </Cell>
                    <Cell className='auto'>
                        <label htmlFor='_slct_adults'>Adults</label>
                        <Select
                            value={this.state._slct_adults}
                            items={this.state._lstSlct_adults}
                            name='_slct_adults'
                            id='_slct_adults'
                            onItemClick={(data) => {
                                const { label, name, key } = data;
                                this.setState({ [name]: key }, () => {
                                    /* console.log('this.state', this.state); */
                                });
                            }}
                        />
                    </Cell>
                    <Cell className='auto'>
                        <label htmlFor='_slct_teens'>Teens</label>
                        <Select
                            value={this.state._slct_teens}
                            items={this.state._lstSlct_teens}
                            name='_slct_teens'
                            id='_slct_teens'
                            onItemClick={(data) => {
                                const { label, name, key } = data;
                                this.setState({ [name]: key }, () => {
                                    /* console.log('this.state', this.state); */
                                });
                            }}
                        />
                    </Cell>
                    <Cell className='auto'>
                        <label htmlFor='_slct_kids'>Kids</label>
                        <Select
                            value={this.state._slct_kids}
                            items={this.state._lstSlct_kids}
                            name='_slct_kids'
                            id='_slct_kids'
                            onItemClick={(data) => {
                                const { label, name, key } = data;
                                this.setState({ [name]: key }, () => {
                                    /* console.log('this.state', this.state); */
                                });
                            }}
                        />
                    </Cell>
                    <Cell className='auto'>
                        <label htmlFor='_slct_infants'>Infants</label>
                        <Select
                            value={this.state._slct_infants}
                            items={this.state._lstSlct_infants}
                            name='_slct_infants'
                            id='_slct_infants'
                            onItemClick={(data) => {
                                const { label, name, key } = data;
                                this.setState({ [name]: key }, () => {
                                    /* console.log('this.state', this.state); */
                                });
                            }}
                        />
                    </Cell>
                    <Cell className='shrink'>
                        <button>{' < BOOK NOW '}</button>
                    </Cell>
                </Grid>
            </div>
        );
    }
}
