import React, { Component } from "react";
import LineInputRange from "./line_inputrange";

class InputRange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            panel: 0,
            sumline: 0,
            range_divider:[],
        };
        this.inputRef = React.createRef();
        this.tabla = React.createRef();
        this.resize = this.resize.bind(this);
    }

    componentDidMount() {
        this.resize();        
    }

    resize() {
        let sumline = this.props.maxValue - this.props.minValue;
        let panel = this.tabla.current.offsetWidth;
        let range_divider = 1
        try{
            range_divider=[...Array(sumline).keys()]
        }catch(ex){
            //console.log(ex)
        }
        
        if (range_divider !== this.state.range_divider) {
            this.setState({ range_divider });
        }
        if (panel !== this.state.panel) {
            this.setState({ panel });
        }
        if (sumline !== this.state.sumline) {
            this.setState({ sumline, sumline});
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.value !== this.props.value) {
            let items = this.props.value;
            this.setState({
                value: items
            },()=>{
                this.props._onChange(items);
            });
        }
    }

    handleChange = (min, max) => event => {
        const value = event.target.value;
        const progress = (value / max) * 100 + "%";

        this.setState({ value },()=>{
            this.props._onChange(value);
        });
        const newBackgroundStyle = `linear-gradient(90deg, ${this.props.linercolor["active"]} 0% ${progress}%,   ${this.props.linercolor["inactive"]} ${progress}% 100%)`;
        this.inputRef.current.style.background = newBackgroundStyle;
    };

    render() {
        if(localStorage.clearbarprogress){
            this.setState({value:0})
            localStorage.removeItem("clearbarprogress")
        }
        const minValue = this.props.minValue;
        const maxValue = this.props.maxValue;

        const progress = (this.state.value / maxValue) * 100 + "%";
        const styleInput = {
        background: `linear-gradient(90deg, ${this.props.linercolor["active"]} 0% ${progress},   ${this.props.linercolor["inactive"]} ${progress} 100%)`
        };
        return (
            <div id="PanelIzquierda" ref={this.tabla}>
                <input
                    ref={this.inputRef}
                    id="sliderId"
                    className={"_input_range "+(this.props.type2?"_range_two":"")}
                    name="sliderName"
                    type="range"
                    min={minValue}
                    max={maxValue}
                    value={this.state.value}
                    onChange={this.handleChange(minValue, maxValue)}
                    style={styleInput}
                />
                {this.props.identify ? (
                        <LineInputRange
                            _panel={this.state.panel}
                            _sumline={this.state.sumline}
                            range_divider={this.state.range_divider}
                        />
                    ) : (
                        <div></div>
                    )
                }
            </div>
        );
    }
}
InputRange.defaultProps = {
    minValue: 1,
    maxValue: 200,
    value: 1,
    linercolor: { active: "#F26193", inactive: "#dbdbdb" },
    identify: true,
    _onChange: (inputvalue => { /* */}),
};
export default InputRange;
