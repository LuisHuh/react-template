import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import Home from './pages/Home';
import Page1 from './pages/page1';
import Page2 from './pages/page2';
import store from '../redux/store';

class Main extends Component{
    render(){
        return(
         <Provider store={store}>
            <Switch>
               <Route exact path="/" component={Home}/>
               <Route path="/page1" component={Page1}/>
               <Route path="/page2" component={Page2}/>
            </Switch>
         </Provider>
        );
    }
}

export default Main;