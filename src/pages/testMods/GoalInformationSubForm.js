import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Row, Col, Input, DatePicker, Select, Icon } from 'antd';
import moment from "moment";
const { Option } = Select;
const dateFormat = 'MM/DD/YYYY';

const formID = "GoalInformationSubForm";
class GoalInformationSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Goal Information',
            fields: [
                {
                    id: 'goal_description',
                    title: 'Goal Information',
                    value: data['goal_description']
                },
                {
                    id: 'goal_date',
                    title: 'Start a Business Date',
                    value: data['goal_date']
                },
                {
                    id: 'goal_assigned_to',
                    title: 'Goal Assigned To',
                    value: data['goal_assigned_to']
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
                goal_description: '',
                goal_date: '',
                goal_assigned_to: ''
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
                if(newFormData.fields[findex]['id'] == 'goal_description'){
                    formData['goal_description'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'goal_date'){
                    formData['goal_date'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'goal_assigned_to'){
                    formData['goal_assigned_to'] = newFormData.fields[findex]['value'];
                }
            }
    
            let enableNext = false;
            if(formData['goal_description'] != ''){
                enableNext = true;
            }

            this.setState({
                formData: formData,
                enableNext: enableNext
            })
        }
        
    }

    handleFormInputChange(name, value){
        
        let formData = this.state.formData;
        formData[name] = value;

        let newState = {
            formData: formData
        };

        if(formData['goal_description'] != ''){
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

    getFormValue(name){
        if(this.state.formData.length){
            return this.state.formData[name];
        }
        else{
            return null;
        }
        
    }


    goNextForm(){

        let formData = GoalInformationSubForm.FnCreateFormData({
            goal_description: this.state.formData['goal_description'],
            goal_date: this.state.formData['goal_date'],
            goal_assigned_to: this.state.formData['goal_assigned_to']
        })

        this.props.cbUpdateSubForm(formID, formData);
        if(this.props.selectedGoal === 'Moving State'){
            this.props.cbGoSubForm("MovingStateSubForm"); 
        } else if (this.props.selectedGoal === 'Moving Country') {
            this.props.cbGoSubForm("MovingCountrySubForm"); 
        } else if (this.props.selectedGoal === 'Retirement') {
            this.props.cbGoSubForm("RetirementSubForm"); 
        } else if (this.props.selectedGoal === 'Rental / Investment Property') {
            this.props.cbGoSubForm("RentalPropertySubForm"); 
        } else if (this.props.selectedGoal === 'Private Education') {
            this.props.cbGoSubForm("PrivateEducationDetails"); 
        } else {
            this.props.cbGoSubForm("GoalFinancingInformationSubForm");
        }
    }

    render() {
        const { size } = this.state;
        return (
            <React.Fragment>
                <div className="info-form-block pl-5 pr-5">
                    <h2 className="text-center font-weight-bold mb-4">Goal Information</h2>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Description of Goal">
                                <Input size={size} value={this.state.formData.goal_description} name="goal_description" onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                        <Col span={16}>
                            <Form.Item label={`${this.props.selectedGoal} Date`}>
                            <DatePicker
                                size={size}
                                style={{width: '100%'}}
                                format={dateFormat} 
                                onChange={(date, dateString) => this.handleDatePickerChange("goal_date", date, dateString)}
                                value={this.state.formData.goal_date ? moment(this.state.formData.goal_date) : null}
                            />
                            </Form.Item>
                        </Col>
                        <Col span={16}>
                            <Form.Item label="Goal Assigned To">
                                <Select
                                    size={size}
                                    showSearch
                                    onChange={(value) => this.handleSelectChange("goal_assigned_to", value)}
                                    value={this.state.formData.goal_assigned_to}
                                >
                                    <Option value="Ava Jones">Ava Jones</Option>
                                    <Option value="Frank Jones">Frank Jones</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
                <div className="d-flex justify-content-end">
                    <Button type="primary" size={size} onClick={() => this.goNextForm()}>
                        Next

                        <Icon type="right" />
                    </Button>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(GoalInformationSubForm);