import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReportModal from '../../../../components/ReportModal';
import { Button, Row, Col, Select } from 'antd';

const { Option } = Select;

class ClientChangeModal extends Component {

    constructor(props) {
        super(props);
        
    }

    renderBody(){
        const clients = [
            'Adam  Meyers', 'Bill Client', 'Frank Jones', 'Greg Hanson', 'John Smith', 'Steve Rymer', 'Victor Pena'
        ]
        return (
            <div>
                <Row>
                    <Col span={12}>
                    Select Client
                    </Col>
                    <Col span={12}>
                        <Select
                            placeholder="-Select-"
                            style={{ width: 200 }} 
                        >
                            {
                                clients.map((client, index) => <Option key={index} value={client}>{client}</Option>)
                            }
                        </Select>
                    </Col>
                </Row>
            </div>
        )
    }

    renderFooter(){
        return (
            <div>
                <Button type="primary">Submit</Button>
            </div>
        )
    }

    render() {
        
        return (
            <ReportModal
                isOpen={this.props.isOpen}
                title="Clients"
                cbToggle={this.props.cbToggle}
                body={this.renderBody()}
                footer={this.renderFooter()}
            ></ReportModal>
        )
    }
}


export default connect()(ClientChangeModal);