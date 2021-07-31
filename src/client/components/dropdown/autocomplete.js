import React from 'react';
import Dropdown from './dropdown';
import List from './list';

export default class Autocomplete extends Dropdown {
    defaults = {
        onChange: (params) => {},
        onFocus: () => {},
        onBlur: () => {},
        setData: (data) => {},
        placeholder: 'Type a keyword',
        minLength: 2,
        data: []
    }

    componentDidMount(...args){
        super.componentDidMount.apply(this, args);
        this._cancelCoverTrigger = true;
    }

    componentDidUpdate(prevProps, prevState){
        if (this.props.data !== prevProps.data) {
            if (this.isOpen) {
                this.recalculateDimensions()
            }else{
                this.open();
            }
        }

        if (prevProps.value !== this.props.value) {
            this.setState({keywords: this.props.value});
        }
     }

    _defaultProps = () => {
        return Object.assign({}, this.defaults, this.props);
    }

    handleOnChange = (e) => {
        const input = e.target;
        const value = input.value || '';
        
        this.setState({
           keywords: value
        }, () => {
            const { minLength, onChange } = this._defaultProps();
            if(value.length >= minLength){
                onChange({name: input.name, keywords: value});
            }else{
                if (this.isOpen) {
                    this.close();
                }
            }
        });
    }

    render() {
        let { style, keywords } = this.state;
        const { placeholder, data, onFocus, onBlur, name } = this._defaultProps();
        keywords = keywords || '';

        return (
            <div component="autocomplete">
                <input className="browser-default"
                    autoComplete="off"
                    type="search"
                    placeholder={placeholder}
                    name={name}
                    value={keywords} ref={this.$el}
                    onChange={this.handleOnChange}
                    onFocus={onFocus}
                    onBlur={onBlur}/>
                <List ref={this.$dropdownEl} 
                    style={style}
                    component="dropdown-list" 
                    onClick={this.clickItem}
                    items={data}
                    readKey="label"/>
            </div>
        )
    }
}