import React,{Component} from 'react';
import { FormNewsletter , CommonLinks,Awardsandlinks ,Privacylinks } from '../index';

class Footer extends Component {

    render(){
        return(
            <footer component="Footer" className="container">
                <FormNewsletter type={2}/>
                <Awardsandlinks/>
                <CommonLinks/>
                <Privacylinks/>
            </footer>
        )
    }

}

export default Footer;