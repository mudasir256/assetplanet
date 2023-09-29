import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postStepsFields } from "../../../../redux/slices/loginSlice";
import ReportModal from 'components/ReportModal';
import { Button, Row, Col, Input, Select, Form, Collapse, Icon, DatePicker, Modal } from 'antd';
import Currency from 'components/form/Currency';
import Percent from 'components/form/PercentV2';
import moment from 'moment';
import AdjustableLoanDetailsSubFormModalForm from './AdjustableLoanDetailsSubFormModalForm';
import { ORDER_DISTRIBUTES, FREQUNCIES } from 'constants/types';
import TextArea from 'antd/lib/input/TextArea';

const dateFormat = 'MM/DD/YYYY';

const { Option } = Select;

class AdjustableLoanDetailsSubFormModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formData: {}
        }

        this.updatedForm = this.updatedForm.bind(this);
    }

    componentDidMount(){
        console.log("Step4444444",this.props.Step4)
    }

    renderBody(){
        return (
            <AdjustableLoanDetailsSubFormModalForm
                cbUpdatedForm={this.updatedForm}
                formData={this.props.formData}
            ></AdjustableLoanDetailsSubFormModalForm>
        )
    }

    updatedForm(formData){
        this.setState({
            formData: formData
        })
    }

    renderFooter(){
        return (
            <React.Fragment>
                <Button type="primary" onClick={() => this.props.cbSave(this.state.formData)}>
                    {
                        this.props.formData.hasOwnProperty('id') && 
                        <React.Fragment>Update</React.Fragment>
                    }
                    {
                        !this.props.formData.hasOwnProperty('id') && 
                        <React.Fragment>Add</React.Fragment>
                    }
                </Button>{' '}
                <Button onClick={this.props.cbCancel}>Cancel</Button>
            </React.Fragment>
        )
    }

    render() {
        
        return (
            <Modal 
                width="80vw"
                centered
                visible={this.props.visible}
                footer={this.renderFooter()}
                onCancel={this.props.cbCancel}
            >
                {this.renderBody()}
            </Modal>
        )
    }
}
const mapStateToProps = (state) => ({
    stepsFields: state.rootReducer.loginUser.stepsFields,
    Step4: state.rootReducer.loginUser.Step4,
});

const mapDispatchToProps = { postStepsFields };
export default connect(mapStateToProps, mapDispatchToProps)(AdjustableLoanDetailsSubFormModal);