import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReportModal from 'components/ReportModal';
import { Button, Row, Col, Input, Select, Form, Collapse, Icon, DatePicker, Modal } from 'antd';
import Currency from 'components/form/Currency';
import moment from 'moment';
import { RENTAL_EXPENSES, FREQUNCIES } from 'constants/types';
import TextArea from 'antd/lib/input/TextArea';
import {disabledStartDate, disabledEndDate} from 'helpers/Utils'

const dateFormat = 'MM/DD/YYYY';

const { Option } = Select;

class InvestmentPropertyExpensesSubFormModalForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            formData: this.props.formData,
            size: 'large'
        }

        this.handleFormInputChange = this.handleFormInputChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);

    }

    componentDidMount(){
        
    }

    handleFormInputChange(name, value){
        
        let formData = this.state.formData;
        formData[name] = value;

        let newState = {
            formData: formData
        };

        this.setState(newState);

        this.props.cbUpdatedForm(formData);
    }

    handleInputChange(event){
        event.preventDefault();
        const {name, value} = event.target;
        this.handleFormInputChange(name, value);
    }

    handleDatePickerChange(name, date, dateString){
        this.handleFormInputChange(name, dateString);
    }

    handleSelectChange(name, value){
        this.handleFormInputChange(name, value);
    }

    render() {
        let size = this.state.size;

        return(
            <React.Fragment>
                <div className="info-form-block pl-5 pr-5">
                    <h2 className="text-center font-weight-bold mb-4">Add Investment Property Expense</h2>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Rental Expenses">
                                <Select
                                    showSearch
                                    placeholder="-Select-"
                                    value={this.state.formData.rentalExpenses}
                                    onChange={(value) => this.handleSelectChange("rentalExpenses", value)}
                                    size={size}
                                >
                                {
                                    RENTAL_EXPENSES.map((rentalExpenses, index) => <Option key={index} value={rentalExpenses}>{rentalExpenses}</Option>)
                                }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Amount">
                                <Currency 
                                    value={this.state.formData.amount} 
                                    name="amount" size={size} 
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Start Date">
                                <DatePicker 
                                    style={{ width: '100%' }} 
                                    size={'large'}
                                    format={dateFormat} 
                                    disabledDate={(value) => disabledStartDate(value, this.state.formData.endDate)}
                                    onChange={(date, dateString) => this.handleDatePickerChange('startDate', date, dateString)}
                                    value={this.state.formData.startDate == '' ? null : moment(this.state.formData.startDate, dateFormat)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Frequency">
                                <Select
                                    showSearch
                                    placeholder="-Select-"
                                    value={this.state.formData.frequency}
                                    onChange={(value) => this.handleSelectChange("frequency", value)}
                                    size={size}
                                >
                                {
                                    FREQUNCIES.map((frequency, index) => <Option key={index} value={frequency}>{frequency}</Option>)
                                }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="End Date">
                                <DatePicker 
                                    style={{ width: '100%' }} 
                                    size={'large'}
                                    format={dateFormat} 
                                    disabledDate={(value) => disabledEndDate(value, this.state.formData.startDate)}
                                    onChange={(date, dateString) => this.handleDatePickerChange('endDate', date, dateString)}
                                    value={this.state.formData.endDate == '' ? null : moment(this.state.formData.endDate, dateFormat)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}
class InvestmentPropertyExpensesSubFormModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formData: {}
        }

        this.updatedForm = this.updatedForm.bind(this);
    }

    componentDidMount(){
        
    }

    renderBody(){
        return (
            <InvestmentPropertyExpensesSubFormModalForm
                cbUpdatedForm={this.updatedForm}
                formData={this.props.formData}
            ></InvestmentPropertyExpensesSubFormModalForm>
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


export default connect()(InvestmentPropertyExpensesSubFormModal);