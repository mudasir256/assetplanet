import React, { Component } from 'react';

import { Input, Icon } from 'antd';

class Uploader extends Component {    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render(){
        return (
            <Input addonAfter={<Icon type="upload" />} />
        );
    }
}

export default Uploader;