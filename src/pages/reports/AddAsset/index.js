import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'antd';
import AddAsset from './AddAsset';

class ClientsPlans extends Component {

    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (              
            <Row gutter={16}>
                <Col span={24}>
                    <AddAsset />
                </Col>
            </Row>
        )
    }
}


export default connect()(ClientsPlans);