import React,{Component} from 'react';
import { FormNewsletter , FloatingMenu, CommonLinksMobile  } from '../';


class Footermobile extends Component {

    render(){
        return(
            <footer component="Footermobile">
                <FormNewsletter type={1}/>
                <CommonLinksMobile/>
                <div className="box2"></div>
                <FloatingMenu />
            </footer>
        )
    }

}

export default Footermobile;