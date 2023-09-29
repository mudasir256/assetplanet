import React, { Component } from 'react';

import { Input, Icon } from 'antd';
import { number } from 'style-value-types';
class Currency extends Component {    
    constructor(props) {
        super(props);
        let propsVal = ('' + props.value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        
        this.state = {
            value: propsVal,
            numberVal: 0
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        let formatVal = ('' + this.props.value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        if(formatVal == "null"){
            formatVal = '';
        }
        
        this.setState({
            value: formatVal
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps.value == '' || prevProps.value){
            var prevVal;
            var parseVal;
            if(prevProps.value != null){
                parseVal = ('' + prevProps.value).replace(/\$\s?|(,*)/g, '');
                prevVal = parseVal.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                prevVal = Number(prevVal.replace(/[^0-9\.-]+/g,""));
            }

            var newVal;
            if(this.props.value != null){
                parseVal = ('' + this.props.value).replace(/\$\s?|(,*)/g, '');
                newVal = parseVal.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                newVal = Number(newVal.replace(/[^0-9\.-]+/g,""));
            }
            
            if(prevVal != newVal){
                if(this.props.value != null || this.props.value != ''){
                    parseVal = ('' + this.props.value).replace(/\$\s?|(,*)/g, '');
                    let newvalue = parseVal.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                   
                    if(newvalue == "null"){
                        newvalue = '';
                    }
                    this.setState({
                        value: newvalue
                    })
                }               
    
            }
        }
        
    }

    handleInputChange(event){
        event.preventDefault();
        const {name, value} = event.target;
        // this.handleFormInputChange(name, value);        

        let parseValue = value.replace(/\$\s?|(,*)/g, '');
        let newvalue = parseValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        let numberVal = Number(newvalue.replace(/[^0-9\.-]+/g,""));

        this.setState({
            value: newvalue,
            numberVal: numberVal
        })

        event.target.value = numberVal;
        if(this.props.onChange){
            this.props.onChange(event);
        }
        
    }

    render(){
        return (            
            <div>
                <Input 
                    style={this.props.style ? this.props.style : null}
                    addonBefore={"$"} 
                    placeholder="#,###,###.##" 
                    value={this.state.value}
                    name={this.props.name}
                    onChange={this.handleInputChange}
                    disabled={this.props.disabled}
                    size={'large'}
                />       
            </div>
        );
    }
}

export default Currency;