import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Form,
    Row,
    Col,
    Input,
    Button,
    Icon,
    Upload
} from 'antd';
import Country from '../../../components/form/Country';

var formData = [];
const { TextArea } = Input;
const formID = "RentalPropertySubForm";
class RentalPropertySubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Rental / Investment Property',
            fields: [
                {
                    id: 'purchase_price_property',
                    title: 'Purchase Price of Property',
                    value: data['purchase_price_property']
                },
                {
                    id: 'monthly_gross_income',
                    title: 'Monthly Gross Income',
                    value: data['monthly_gross_income']
                },
                {
                    id: 'improvements',
                    title: 'Improvements',
                    value: data['improvements']
                },
                {
                    id: 'monthly_property_taxes',
                    title: 'Monthly Property Taxes',
                    value: data['monthly_property_taxes']
                },
                {
                    id: 'monthly_insurance',
                    title: 'Monthly Insurance',
                    value: data['monthly_insurance']
                },
                {
                    id: 'monthly_loan_payment',
                    title: 'Monthly Loan Payment',
                    value: data['monthly_loan_payment']
                },
                {
                    id: 'monthly_maintenance',
                    title: 'Monthly Maintenance',
                    value: data['monthly_maintenance']
                }
            ]
        }
    
        return formData;
    }

    constructor(props) {
        super(props);

        this.state = {
            enableNext: true,
            formData: {},
            size: 'large'
        }

        this.goNextForm = this.goNextForm.bind(this);
        this.updateFormData = this.updateFormData.bind(this);

        this.handleFormInputChange = this.handleFormInputChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.cbFormChange = this.formChange.bind(this);

    }

    componentDidMount() {
        this.updateFormData(this.props.subFormData);
    }

    updateFormData(newFormData) {
        let formData = this.state.formData;
        if (newFormData.hasOwnProperty('fields')) {
            for (var findex = 0; findex < newFormData.fields.length; findex++) {
                if (newFormData.fields[findex]['id'] == 'purchase_price_property') {
                    formData['purchase_price_property'] = newFormData.fields[findex]['value'];
                }
                if (newFormData.fields[findex]['id'] == 'monthly_gross_income') {
                    formData['monthly_gross_income'] = newFormData.fields[findex]['value'];
                }
                if (newFormData.fields[findex]['id'] == 'improvements') {
                    formData['improvements'] = newFormData.fields[findex]['value'];
                }
                if (newFormData.fields[findex]['id'] == 'monthly_insurance') {
                    formData['monthly_insurance'] = newFormData.fields[findex]['value'];
                }
                if (newFormData.fields[findex]['id'] == 'monthly_loan_payment') {
                    formData['monthly_loan_payment'] = newFormData.fields[findex]['value'];
                }
                if (newFormData.fields[findex]['id'] == 'monthly_loan_payment') {
                    formData['monthly_loan_payment'] = newFormData.fields[findex]['value'];
                }
                if (newFormData.fields[findex]['id'] == 'monthly_maintenance') {
                    formData['monthly_maintenance'] = newFormData.fields[findex]['value'];
                }
            }

            let enableNext = false;

            this.setState({
                formData: formData,
                enableNext: enableNext
            })
        }

    }

    handleFormInputChange(name, value) {

        let formData = this.state.formData;
        formData[name] = value;

        let newState = {
            formData: formData
        };
        this.setState(newState);
    }

    handleInputChange(event) {
        event.preventDefault();
        const { name, value } = event.target;
        this.handleFormInputChange(name, value);
    }

    goNextForm() {
        let formData = RentalPropertySubForm.FnCreateFormData({
            purchase_price_property: this.state.formData['purchase_price_property'],
            monthly_gross_income: this.state.formData['monthly_gross_income'],
            improvements: this.state.formData['improvements'],
            monthly_property_taxes: this.state.formData['monthly_property_taxes'],
            monthly_insurance: this.state.formData['monthly_insurance'],
            monthly_loan_payment: this.state.formData['monthly_loan_payment'],
            monthly_maintenance: this.state.formData['monthly_maintenance']
        })

        this.props.cbUpdateSubForm(formID, formData);


        this.props.cbGoSubForm("GoalFinancingInformationSubForm");
    }

    formChange(rows) {
        formData = rows;
    }

    render() {
        const { size } = this.state;
        return (
            <React.Fragment>
                    <h2 className="text-center font-weight-bold mb-4">Rental / Investment Property</h2>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Purchase Price of Property">
                                <Input
                                    addonBefore="$"
                                    type="number"
                                    value={this.state.formData.purchase_price_property}
                                    name="purchase_price_property"
                                    size={size}
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item  label="Monthly Gross Income">
                                <Input
                                    addonBefore="$"
                                    type="number"
                                    value={this.state.formData.monthly_gross_income}
                                    name="monthly_gross_income"
                                    size={size}
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item  label="Improvements">
                                <Input
                                    addonBefore="$"
                                    type="number"
                                    value={this.state.formData.improvements}
                                    name="improvements"
                                    size={size}
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item  label="Monthly Property Taxes">
                                <Input
                                    addonBefore="$"
                                    type="number"
                                    value={this.state.formData.monthly_property_taxes}
                                    name="monthly_property_taxes"
                                    size={size}
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item  label="Monthly Insurance">
                                <Input
                                    addonBefore="$"
                                    type="number"
                                    value={this.state.formData.monthly_insurance}
                                    name="monthly_insurance"
                                    size={size}
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item  label="Monthly Loan Payment">
                                <Input
                                    addonBefore="$"
                                    type="number"
                                    value={this.state.formData.monthly_loan_payment}
                                    name="monthly_loan_payment"
                                    size={size}
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item  label="Monthly Maintenance">
                                <Input
                                    addonBefore="$"
                                    type="number"
                                    value={this.state.formData.monthly_maintenance}
                                    name="monthly_maintenance"
                                    size={size}
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Form.Item label="Upload an Image of the Property">
                                <Upload name="logo" action="/upload.do" listType="picture">
                                    <Button>
                                        <Icon type="upload" /> Click to upload
                                    </Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                        <Col span={24} >
                            <Form.Item  label="Property Description">
                                <TextArea 
                                    rows={4}
                                    value={this.state.formData.property_description}
                                    name="property_description"
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Address of Property">
                                <Row>
                                    <Col>
                                        <Input 
                                            placeholder="Address Line 1"
                                            value={this.state.formData.address_line1}
                                            name="address_line1"
                                            size={size}
                                            onChange={(event) => this.handleInputChange(event)}
                                        />
                                    </Col>
                                </Row>
                                <Row gutter={8}>
                                    <Col span={12}>
                                        <Input 
                                            placeholder="City / District"
                                            value={this.state.formData.city}
                                            name="city"
                                            size={size}
                                            onChange={(event) => this.handleInputChange(event)}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <Input 
                                            placeholder="State / Province"
                                            value={this.state.formData.province}
                                            name="province"
                                            size={size}
                                            onChange={(event) => this.handleInputChange(event)}
                                        />
                                    </Col>
                                </Row>
                                <Row gutter={8}>
                                    <Col span={12}>
                                        <Input 
                                            placeholder="Postal Code"
                                            value={this.state.formData.postal_code}
                                            name="postal_code"
                                            size={size}
                                            onChange={(event) => this.handleInputChange(event)}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <Country></Country>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Col>
                    </Row>
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


export default connect()(RentalPropertySubForm);