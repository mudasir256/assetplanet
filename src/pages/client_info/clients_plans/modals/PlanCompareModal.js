import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReportModal from '../../../../components/ReportModal';
import {StyledModal} from "./ModalStyling.js"
import { Button, Row, Col, Select } from 'antd';

const { Option } = Select;

class PlanCompareModal extends Component {

    constructor(props) {
        super(props);
        
    }

    renderBody(){
        return (
            <StyledModal>
                <Row className="styled-modal-body">
                    <Col span={12}>
                    Compare Plan
                    </Col>
                    <Col span={12}>
                        <Select
                            mode="multiple"
                            placeholder="-Select-"
                            style={{ width: 220 }} 
                        >
                            <Option value="plan_1">1 - Firt Plan</Option>
                            <Option value="plan_2">2 - Plan 2</Option>
                        </Select>
                    </Col>
                </Row>
            </StyledModal>
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
                title="Plan Comparison(Stateless)"
                cbToggle={this.props.cbToggle}
                body={this.renderBody()}
                footer={this.renderFooter()}
            ></ReportModal>
        )
    }
}


export default connect()(PlanCompareModal);