import React, { Component } from 'react';
import { connect } from 'react-redux';

class NoPermission extends Component {
    
    constructor(props) {
        super(props);

    }
    
    render() {
        return (
            <React.Fragment>
                No allowed to access
            </React.Fragment>
        )
    }
}

export default connect()(NoPermission);