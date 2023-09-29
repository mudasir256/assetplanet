import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReportModal from '../../../../components/ReportModal';
import { StyledModal } from "./../../../../components/new-styled-components/ModalStyling"
import { Select, Button, Row, Col } from 'antd';
import { Link } from "react-router-dom";

const { Option } = Select;

class PlanChangeModal extends Component {
    renderBody(){
        return (
            <StyledModal>
                 <Row className="styled-modal-body">
                    <Col>
                        <Row type='flex' justify='center'>
                            <Col xs={22} sm={15}>
                                <p className='dropdown-label'> Client Plan:</p>
                                <Select
                                    placeholder="Select Client Plan..."
                                >
                                    <Option value="plan_1">1 - Firt Plan</Option>
                                    <Option value="plan_2">2 - Plan 2</Option>
                                </Select>
                                
                            </Col>
                        </Row>
                    </Col>
                </Row>
                
            </StyledModal>
        )
    }

    renderFooter(){
        return (
            <StyledModal>
                <Row className="styled-modal-footer">
                    <Col>
                        <Row type='flex' justify='center'>
                            <Col xs={22} sm={15}>
                                <Row type="flex" justify='space-between'>
                                    <Col>
                                        <Link className="ant-btn btn-gray secondary" to="/client_plan_new">Add New Plan</Link>
                                    </Col>
                                    <Col>
                                        <Button className="btn-blue">Save</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </StyledModal>
        )
    }

    render() {
        
        return (
            <ReportModal
                isOpen={this.props.isOpen}
                title="Change Client Plan"
                cbToggle={this.props.cbToggle}
                body={this.renderBody()}
                footer={this.renderFooter()}
            ></ReportModal>
        )
    }
}


export default connect()(PlanChangeModal);