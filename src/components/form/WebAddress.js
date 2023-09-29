import React, { Component } from 'react';

import { Input, Select } from 'antd';

const { Option } = Select;

class WebAddress extends Component {    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render(){
        const selectBefore  = (
            <Select defaultValue="Http://" style={{ width: 90 }}>
                <Option value="Http://">Http://</Option>
                <Option value="Https://">Https://</Option>
            </Select>
        );
        {console.log("this.props.value",this.props.value)}
        return (
            <Input 
                addonBefore={selectBefore} 
                style={this.props.style ? this.props.style : { width: '100%' }} 
                name={this.props.name}
                onChange={this.props.onChange}
                disabled={this.props.disabled}
                // value={this.props.value}
            />
        );
    }
}

export default WebAddress;