import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Form,
    Icon,
    Row,
    Col,
    Input,
    InputNumber,
    Button
} from 'antd';
import Currency from '../../../components/form/Currency';

var formData = [];
const InputGroup = Input.Group;
const formID = "PrivateEducationSubForm";
class PrivateEducationSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Assistance Received Details (Financial Gift)',
            fields: [
                {
                    id: 'assets_goal',
                    title: 'Assets to Assign to Goal',
                    value: data['assets_goal']
                },
                {
                    id: 'amount_goal',
                    title: 'Amount to Use for this Goal',
                    value: data['amount_goal']
                },
                {
                    id: 'amount_other_goal',
                    title: 'Amount Used In Other Goals',
                    value: data['amount_other_goal']
                },
                {
                    id: 'taxes',
                    title: 'Taxes',
                    value: data['taxes']
                }
            ]
        }
    
        return formData;
    }

    constructor(props) {
        super(props);

        this.state = {
            enableNext: true,
            formData: {
                amount_goal: '',
                amount_other_goal: '',
                taxes: ''
            },
            size: 'large'
        }

        this.goNextForm = this.goNextForm.bind(this);
        this.updateFormData = this.updateFormData.bind(this);

        this.handleFormInputChange = this.handleFormInputChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);

        this.formChange = this.formChange.bind(this);

    }

    componentDidMount() {
        this.updateFormData(this.props.subFormData);
    }

    updateFormData(newFormData) {
        let formData = this.state.formData;
        if (newFormData.hasOwnProperty('fields')) {
            for (var findex = 0; findex < newFormData.fields.length; findex++) {
                if (newFormData.fields[findex]['id'] === 'assets_goal') {
                    formData['assets_goal'] = newFormData.fields[findex]['value'];
                }
                if (newFormData.fields[findex]['id'] === 'amount_goal') {
                    formData['amount_goal'] = newFormData.fields[findex]['value'];
                }
                if (newFormData.fields[findex]['id'] === 'amount_other_goal') {
                    formData['amount_other_goal'] = newFormData.fields[findex]['value'];
                }
                if (newFormData.fields[findex]['id'] === 'taxes') {
                    formData['taxes'] = newFormData.fields[findex]['value'];
                }
            }

            let enableNext = false;
            if (formData['committmentDate'] !== '' && formData['committmentAmount'] !== '') {
                enableNext = true;
            }

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

    handleSelectChange(name, value) {
        this.handleFormInputChange(name, value);
    }

    handleDatePickerChange(name, date, dateString) {
        this.handleFormInputChange(name, dateString);
    }


    goNextForm() {

        let formData = PrivateEducationSubForm.FnCreateFormData({
            assets_goal: this.state.formData['assets_goal'],
            value_goal_date: this.state.formData['value_goal_date'],
            loan_goal_date: this.state.formData['loan_goal_date'],
            amount_goal: this.state.formData['amount_goal'],
            amount_other_goal: this.state.formData['amount_other_goal'],
            taxes: this.state.formData['taxes'],
        })

        this.props.cbUpdateSubForm(formID, formData);

        this.props.cbGoSubForm("QuestionApplySavingSubForm");

    }

    goPreviousForm(){
        this.props.cbGoSubForm("GoalInformationSubForm");
    }

    formChange(rows) {
        formData = rows;
    }

    render() {
        const { size } = this.state;
        return (
            <React.Fragment>
                <h2 className="text-center font-weight-bold mb-4">Private Education Details</h2>
                <Row gutter={16} type="flex" justify="center">
                    <Col span={16}>
                        <Col>
                            <InputGroup>
                                <Form.Item label="Person Attending School">
                                    <Row gutter={8}>
                                        <Col span={12}>
                                            <Input 
                                                value={this.state.formData.personFirstName}
                                                name="personFirstName"
                                                placeholder="First Name"
                                                size={size}
                                                onChange={(event) => this.handleInputChange(event)}
                                            />
                                        </Col>
                                        <Col span={12}>
                                            <Input 
                                                value={this.state.formData.personLastName}
                                                name="personLastName"
                                                placeholder="Last Name"
                                                size={size}
                                                onChange={(event) => this.handleInputChange(event)}
                                            />
                                        </Col>
                                    </Row>
                                </Form.Item>
                            </InputGroup>
                        </Col>
                    </Col>
                </Row>
                <Row gutter={24} type="flex" justify="center">
                    <Col span={16}>
                        <Form.Item  label="Name Of Institution">
                            <Input 
                                value={this.state.formData.nameOfInstitution}
                                name="nameOfInstitution"
                                placeholder="Name of Institution"
                                size={size}
                                onChange={(event) => this.handleInputChange(event)}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24} type="flex" justify="center">
                    <Col span={16}>
                        <Form.Item  label="Level of Education">
                            <Input 
                                value={this.state.formData.levelOfEducation}
                                name="levelOfEducation"
                                placeholder="Level of Education"
                                size={size}
                                onChange={(event) => this.handleInputChange(event)}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24} type="flex" justify="center">
                    <Col span={16}>
                        <Form.Item  label="For How Many Years?">
                            <InputNumber style={{ width: "100%"}} value={this.state.formData.years} name="years" size={size} onChange={(value) => this.handleSelectChange("years", value)}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24} type="flex" justify="center">
                    <Col span={16}>
                        <Form.Item  label="Estimated Annual Tuition Cost">
                            <Currency value={this.state.formData.estimatedAnnualCost} name="estimatedAnnualCost" onChange={(value) => this.handleFormInputChange("estimatedAnnualCost", value)}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24} type="flex" justify="center">
                    <Col span={16}>
                        <Form.Item  label="Inflation Rate">
                            <Currency value={this.state.formData.inflationRate} name="inflationRate" onChange={(value) => this.handleFormInputChange("inflationRate", value)}/>
                        </Form.Item>
                    </Col>
                </Row>
                <div className="row justify-content-between">
                    <div className="col-8">
                        <Button type="primary" size={'large'} onClick={() => this.goPreviousForm()}>
                            <Icon type="left" />
                            Previous
                        </Button>
                    </div>
                    <div className="col-4 d-flex justify-content-end">
                        <Button type="primary" disabled={ !this.state.enableNext } size={'large'} onClick={() => this.goNextForm()}>
                            Next
                            <Icon type="right" />
                        </Button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(PrivateEducationSubForm);