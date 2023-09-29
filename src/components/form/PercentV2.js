import React, { Component } from 'react';

import { InputNumber } from 'antd';

class Percent extends Component {    
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
            <InputNumber
                size={'large'}
                style={{ width: '100%' }}
                min={0}
                max={100}
                formatter={value => `${value}%`}
                parser={value => value.replace('%', '')}
                onChange={(value) => this.handleInputChange(value)}
                {...this.props}
            />
        );
    }
}

export default Percent;