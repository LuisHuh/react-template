import React, {Component} from "react";

export default class LineInputRange extends Component{
    constructor(props) {
        React.createRef();
        super(props);
        this.state = {
            _panel:0,
            _sumline:0,
            range_divider:[],
        };
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps._panel !== this.props._panel) {
            let items = this.props._panel;
            this.setState({
                _panel: items,
            })
        }
        if (prevProps._sumline !== this.props._sumline) {
            let items = this.props._sumline;
            this.setState({
                _sumline: items,
            })
        }
        if (prevProps.range_divider !== this.props.range_divider) {
            let items = this.props.range_divider;
            this.setState({
                range_divider: items,
            })
        }
    }
    
    render() {
        let large = this.props._panel;
        let width = 0;
        let value = 0;
        if(large >= 1200){ width=1; value = (100-width-width)/(this.props._sumline);
        }else if(large >= 900){ width=1.5; value = (100-width-width)/(this.props._sumline);
        }else if(large >= 750){ width=2; value = (100-width-width)/(this.props._sumline);
        }else if(large >= 650){ width=2; value = (100-width-width)/(this.props._sumline);
        }else if(large >= 300){ width=3; value = (100-width-width)/(this.props._sumline);
        }else if(large >= 1){ width=6; value = (100-width-width)/(this.props._sumline);
        }
        
        return (
            <div>
                <div style={{"margin":"-5px 0 0 0","width":width+"%","height":"6px", "position": "relative", "float":"right",}}></div>
                {Object.keys(this.props.range_divider).map((a)=>{
                    return(
                        <div key={a} style={{"margin":"-5px 0 0 0","width":value+"%","height":"6px", "borderRight":"1px solid #DBDBDB", "position": "relative", "float":"right",}}></div>
                    )
                })}
                <div style={{"margin":"-5px 0 0 0","width":width+"%","height":"6px", "borderRight":"1px solid #DBDBDB", "position": "relative", "float":"right",}}></div>
            </div>
        )
    }
}
LineInputRange.defaultProps = {
    _panel: 0,
    _sumline: 0,
    range_divider:[],
};