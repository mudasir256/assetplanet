import React, { Component } from 'react';

import { Input, Icon } from 'antd';
class Amount extends Component {
    render(){
        return (
            <Input
                type="number"
                addonBefore={<Icon type="dollar" />}
                style={{ width: '100%' }}
                disabled={this.props.disabled}
                value={this.props.value}
                disabled={this.props.disabled}
            />
        );
    }
}

export default Amount;