import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import Page1 from './pages/page1';
import Page2 from './pages/page2';

class Main extends Component{
    render(){
        return(
            <Switch>
                <Route path="/page1" component={Page1}/>
                <Route path="/page2" component={Page2}/>
            </Switch>
        );
    }
}

export default Main;