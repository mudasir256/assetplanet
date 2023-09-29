import React, { Component } from 'react';
import {states} from '../../constants/moving_states'
import { Input, Select, Icon } from 'antd';

const { Option } = Select;

class State extends Component {    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render(){
        // const states = [
        //     'Alabama', 'Alaska', 'Arizona'
        // ]

        return (
            <Select
                showSearch
                placeholder="-Select-"
                onChange={this.props.onChange}
                value={this.props.value}
            >
            {
                states.map((state, index) => <Option key={index} value={state}>{state}</Option>)
            }
            </Select>
        );
    }
}

export default State;