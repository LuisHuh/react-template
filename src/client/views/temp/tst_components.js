import React, { Component, Fragment } from 'react';
import { Grid, Cell } from '@components';

import { Currency } from '@components';

export default class Tes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            amount: '1231541.11',
            rCurrency: false,
        };
        this.ref = {};
        this.rCurrency;
        this.list = {};
    }

    componentDidMount() {
        /* console.log(this.rCurrency); */
        this.setState({ rCurrency: this.rCurrency, list: this.list });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props != prevProps) {
        }
    }
    render() {
        const { form } = this.state;
        const { amount } = this.state;
        return (
            <Fragment>
                <Grid type='x'>
                    <Cell small='12'> Formato de numeros </Cell>
                    <hr />
                    <Cell small='3'>
                        <p>
                            LANGUAGE: 'EN' <br /> MONEDA: 'MXN' <br /> REGION: 'USA'
                        </p>
                        <Currency value={amount} lang={'en'} moneda={'MXN'} onRef={(x) => (this.rCurrency = x)} isDefault={true}/>
                    </Cell>
                    <Cell small='3'>
                        <p>
                            LANGUAGE: 'ES' <br /> MONEDA: 'USD' <br /> REGION: 'MEX'
                        </p>
                        <Currency
                            value={amount}
                            isQty={true}
                        />
                    </Cell>
                </Grid>
                {this.rCurrency ? (
                    // this.rCurrency.avaliableLangs.map((l) =>
                    //     this.rCurrency.avaliableCurrency.map((c) => (
                    //         <Cell small='3' style={{ margin: '0.5em 0' }}>
                    //             <p>
                    //                 LANGUAGE: '{l}' <br /> REGION: '{c}'
                    //             </p>
                    //             <Currency value={amount} lang={l} moneda={c} />
                    //         </Cell>
                    //     ))
                    // )

                    this.rCurrency.avaliableFormat.map((l) => (
                        <Grid type='x' key={'lang-' + l}>
                            {this.rCurrency.avaliableCurrency.map((c) =>
                                ['USA', null, 'MEX'].map((r) => (
                                    <Cell small='3' style={{ margin: '0.5em 0' }} key={l + '-' + c + '-' + r}>
                                        <p>
                                            LANGUAGE: '{l}' <br /> MONEDA: '{c}' <br /> REGION: '{r}'
                                        </p>
                                        <Currency
                                            value={amount}
                                            lang={l}
                                            moneda={c}
                                            region={r}
                                            // onR={({ key, local }) => {
                                            //     const last = this.list[key] || {}
                                            //     const tmp = { cant: 0, ...last, ...{ local } }; //? actualizar local o crear nuevo nodo
                                            //     const cant = this.list[key] ? tmp.cant + 1 : 1; //? si existe el nodo, suma; si no, 1
                                            //     const list = { ...tmp, cant }; //? variable para la lista
                                            //     this.list[key] = list; //? sobreescribir valor de la lista para debug
                                            // }}
                                        />
                                    </Cell>
                                ))
                            )}
                        </Grid>
                    ))
                ) : (
                    <Fragment />
                )}
            </Fragment>
        );
    }
}
