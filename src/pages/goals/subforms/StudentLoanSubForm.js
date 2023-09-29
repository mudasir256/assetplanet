import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Row, Col, Icon, Select, DatePicker } from 'antd';
import Currency from '../../../components/form/Currency';
import moment from 'moment';
const formID = "StudentLoanSubForm";
const dateFormat = 'MM/DD/YYYY';
const { Option } = Select;
class StudentLoanSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Student Loan Details',
            fields: [
                {
                    id: 'provider',
                    title: 'Provider',
                    value: data['provider']
                },
                {
                    id: 'apr',
                    title: 'APR (determined year loan taken)',
                    value: data['apr']
                },
                {
                    id: 'firstPaymentDue',
                    title: 'First Payment Due',
                    value: data['firstPaymentDue']
                },
                {
                    id: 'amount',
                    title: 'Amount of Payment',
                    value: data['amount']
                }
            ]
        }
    
        return formData;
    }

    constructor(props) {
        super(props);

        this.state = {
            enableNext: false,
            formData: {
                amount: '',
            },
            size: 'large'
        }

        this.goNextForm = this.goNextForm.bind(this);
        this.updateFormData = this.updateFormData.bind(this);

        this.handleFormInputChange = this.handleFormInputChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);

    }

    componentDidMount() {
        this.updateFormData(this.props.subFormData);
    }

    updateFormData(newFormData){
        let formData = this.state.formData;
        if(newFormData.hasOwnProperty('fields')){
            for(var findex = 0; findex < newFormData.fields.length; findex++){
                if (newFormData.fields[findex]['id'] == 'provider') {
                    formData['provider'] = newFormData.fields[findex]['value'];
                }
                if (newFormData.fields[findex]['id'] == 'apr') {
                    formData['apr'] = newFormData.fields[findex]['value'];
                }
                if (newFormData.fields[findex]['id'] == 'firstPaymentDue') {
                    formData['firstPaymentDue'] = newFormData.fields[findex]['value'];
                }
                if (newFormData.fields[findex]['id'] == 'amount') {
                    formData['amount'] = newFormData.fields[findex]['value'];
                }
            }

            this.setState({
                formData: formData,
                enableNext: true
            })
        }
        
    }

    handleFormInputChange(name, value){
        
        let formData = this.state.formData;
        formData[name] = value;

        let newState = {
            formData: formData
        };

        if(formData['total_loan'] !== ''){
            newState['enableNext'] = true;
        }
        else{
            newState['enableNext'] = false;
        }

        this.setState(newState);
    }

    handleInputChange(event){
        event.preventDefault();
        const {name, value} = event.target;
        this.handleFormInputChange(name, value);
    }

    handleSelectChange(name, value){
        this.handleFormInputChange(name, value);
    }

    handleDatePickerChange(name, date, dateString){
        this.handleFormInputChange(name, dateString);
    }


    goNextForm(){
        let formData = StudentLoanSubForm.FnCreateFormData({
            provider: this.state.formData['provider'],
            apr: this.state.formData['apr'],
            firstPaymentDue: this.state.formData['firstPaymentDue'],
            amount: this.state.formData['amount'],
        })


        this.props.cbUpdateSubForm(formID, formData);

        this.props.cbGoSubForm("GoalInformationSubForm"); 
    }

    render() {
        const Providers = [
            'Federal Government',
            'Stafford',
            'Private',
            'School',
        ]
        const { size, formData } = this.state;
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <h2 className="text-center font-weight-bold mb-4">Student Loan Details</h2>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Provider">
                                <Select
                                    showSearch
                                    placeholder="-Select-"
                                    style={{width: '100%'}}
                                    value={formData.provider}
                                    size={size}
                                    onChange={(value) => this.handleSelectChange("provider", value)}
                                >
                                {
                                    Providers.map((provider, index) => <Option key={index} value={provider}>{provider}</Option>)
                                }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="APR (determined year loan taken)">
                                <DatePicker
                                    style={{width: '100%'}}
                                    format={dateFormat}
                                    size={size}
                                    onChange={(date, dateString) => this.handleDatePickerChange("apr", date, dateString)}
                                    value={formData.apr ? moment(formData.apr) : null}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="First Payment Due)">
                                <DatePicker
                                    style={{width: '100%'}}
                                    format={dateFormat}
                                    size={size}
                                    onChange={(date, dateString) => this.handleDatePickerChange("firstPaymentDue", date, dateString)}
                                    value={formData.firstPaymentDue ? moment(formData.firstPaymentDue) : null}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item  label="Amount of Payment">
                                <Currency 
                                    value={formData.amount}
                                    name="amount"
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
                <div className="d-flex justify-content-end">
                    <Button type="primary" size={'large'} onClick={() => this.goNextForm()}>
                        Next
                        <Icon type="right" />
                    </Button>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(StudentLoanSubForm);