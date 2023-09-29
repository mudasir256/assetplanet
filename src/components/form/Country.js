import React, { Component } from 'react';

import { Input, Select, Icon } from 'antd';

const { Option } = Select;

class Country extends Component {    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render(){
        const countries = [
            'Afghanistan', 'Albania', 'Algeria'
        ]
        return (
            <Select
                showSearch
                placeholder="-Select-"
                onChange={this.props.onChange}
                value={this.props.value}
                size="large"
                disabled={this.props.disabled}
            >
            {
                countries.map((country, index) => <Option key={index} value={country}>{country}</Option>)
            }
            </Select>
        );
    }
}

export default Country;