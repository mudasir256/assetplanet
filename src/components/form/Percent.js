import React, { Component } from 'react';

import { Input, Icon } from 'antd';

class Percent extends Component {    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render(){
        return (
            <Input 
                style={this.props.style}
                addonAfter="%"
                name={this.props.name}
                onChange={this.props.onChange}
                disabled={this.props.disabled}
                value={this.props.value}
            />
        );
    }
}

export default Percent;