import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import Sidebar from './Sidebar';

class ClientInfo extends Component {
    render() {
        
        return ( 
            <Row>
                <Col span={19} className="px-3">
                    
                </Col>
                <Col span={5}>
                    <Sidebar />
                </Col>
            </Row>
        )
    }
}


export default connect()(ClientInfo);