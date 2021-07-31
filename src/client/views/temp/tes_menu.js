import React, { Component } from 'react';
import MenuView from '../../oldweddingcomponents/awardsandlinks';
import MenuLateral from '../../components/menu_lateral';

export default class TesMenu extends Component {
    render() {
        return (
            <div>
                <MenuView/>
                <MenuLateral menus={[
                    'MY WEDDINGS',
                    'ROOMING LIST',
                    'DETAIL SHEET',
                    'MY CART',
                    'MY WISHLIST'
                ]}>
                <div>
                    Content 1
                </div>
                <div>
                    Content 2
                </div>
                <div>
                    Content 3
                </div>
                <div>
                    Content 4
                </div>
                <div>
                    Content 5
                </div>

                </MenuLateral>
               
            </div>
        )
    }
}
