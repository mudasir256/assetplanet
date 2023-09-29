import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Form,
    Row,
    Col,
    Input,
    Button,
    Icon
} from 'antd';
import Currency from '../../../components/form/Currency';


var formData = [];
const formID = "RetirementSubForm";
class RetirementSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Retirement',
            fields: [
                {
                    id: 'percent_budget_retirement',
                    title: 'Precent of Pre-retirement Budget For Retirement',
                    value: data['percent_budget_retirement']
                },
                {
                    id: 'inflation_rate_goal',
                    title: 'Inflation Rate for this Goal',
                    value: data['inflation_rate_goal']
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
                inflation_rate_goal: ''
            },
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
                if (newFormData.fields[findex]['id'] == 'percent_budget_retirement') {
                    formData['percent_budget_retirement'] = newFormData.fields[findex]['value'];
                }
                if (newFormData.fields[findex]['id'] == 'inflation_rate_goal') {
                    formData['inflation_rate_goal'] = newFormData.fields[findex]['value'];
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

        let formData = RetirementSubForm.FnCreateFormData({
            percent_budget_retirement: this.state.formData['percent_budget_retirement'],
            inflation_rate_goal: this.state.formData['inflation_rate_goal']
        })


        this.props.cbUpdateSubForm(formID, formData);


        this.props.cbGoSubForm("QuestionAssignAssetSubForm");
    }

    formChange(rows) {
        formData = rows;
    }

    render() {
        const { size } = this.state;
        return (
            <React.Fragment>
                    <h2 className="text-center font-weight-bold mb-4">Retirement</h2>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Col>
                                <Form.Item label="Precent of Pre-retirement Budget For Retirement">
                                    <Input
                                        addonBefore="%"
                                        type="number"
                                        value={this.state.formData.percent_budget_retirement}
                                        name="percent_budget_retirement"
                                        size={size}
                                        onChange={(event) => this.handleInputChange(event)}
                                    />
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item  label="Inflation Rate for this Goal">
                                    <Currency 
                                        value={this.state.formData.inflation_rate_goal}
                                        name="inflation_rate_goal"
                                        onChange={(event) => this.handleInputChange(event)}
                                    />
                                </Form.Item>
                            </Col>
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


export default connect()(RetirementSubForm);