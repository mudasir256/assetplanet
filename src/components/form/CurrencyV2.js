import React, { Component } from 'react';

import { InputNumber } from 'antd';

const formatter = (value) => {
    value = value.replace(/[^0-9.]+/g, '');
    return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
class Currency extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
    }

    handleInputChange(value){
        this.setState({
            value: value
        });
        if(this.props.onChange){
            this.props.onChange(value);
        }
    }


    render(){
        return (            
            <div>
                <InputNumber
                    formatter={value => formatter(value)}
                    // parser={value => value.replace(/\$\s?[^a-zA-Z]|(,*)/g, '')}
                    size={'large'}
                    style={{ width: '100%' }}
                    onChange={(value) => this.handleInputChange(value)}
                    {...this.props}
                />  
            </div>
        );
    }
}

export default Currency;