import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Button, Row, Col, Form, Radio, DatePicker, InputNumber, Icon, Input, Select } from 'antd';
import PrivateEducationDetailsSubForm, {tuitionCostsss} from '../privateEducationDetails/privateEducationDetails';
import Currency from '../../../components/form/Currency';
import moment from 'moment';
import { FAMILY_RELATIONSHIPS, FREQUNCIES } from '../../../constants/types';
// import PrivateEducationNew, {tuitionCosts} from '../PrivateEducationNew';

const { Option } = Select;
const InputGroup = Input.Group;






const dateFormat = 'MM/DD/YYYY';
//const tuitionCosts = '7';
// const TuitionCosts = tuitionCosts;
const formID = 'TuitionCosts';

class TuitionCostsSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Tuition Costs',
            fields: [
                {
                    id: 'tc_friends',
                    title: 'Complete Details Now or Later',
                    value: data['tc_friends'],
                },
                {
                    id: 'tc_contributions',
                    title: 'Complete Details Now or Later',
                    value: data['tc_contributions']
                },
                {
                    id: 'tc_student_loan',
                    title: 'Complete Details Now or Later',
                    value: data['tc_student_loan']
                },
                {
                    id: 'tc_scholarships_grants',
                    title: 'Complete Details Now or Later',
                    value: data['tc_scholarships_grants']
                },
                {
                    id: 'tc_personal_heloc',
                    title: 'Complete Details Now or Later',
                    value: data['tc_personal_heloc']
                },
                {
                    id: 'tc_assign_asset',
                    title: 'Complete Details Now or Later',
                    value: data['tc_assign_asset']
                },
                {
                    id: 'tc_work_study',
                    title: 'Complete Details Now or Later',
                    value: data['tc_work_study']
                },
                 {
                    id: 'pe_tuition_cost',
                    title: 'Estimated Annual Tuition Cost',
                    value: data['pe_tuition_cost']
                },
            ]
        }
    
        return formData;
    }

    constructor(props) {
        super(props);

        this.state = {
            enableNext: false,
            formData: {
                tc_friends: '',
                tc_contributions: '',
                tc_student_loan: '',
                tc_scholarships_grants: '',
                tc_personal_heloc:'',
                tc_assign_asset:'',
                tc_work_study:''
               
            },
            
            size: 'large'
        }
        
     //   this.goNextForm = this.goNextForm.bind(this);
     //   this.goPreviousForm = this.goPreviousForm.bind(this);

        this.updateFormData = this.updateFormData.bind(this);

        this.handleFormInputChange = this.handleFormInputChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);

   //     this.setConditionValue = this.setConditionValue.bind(this);
//
    }

    componentDidMount() {
        this.updateFormData(this.props.subFormData);
    }


    updateFormData(newFormData){
        let formData = this.state.formData;
        if(newFormData.hasOwnProperty('fields')){
            for(var findex = 0; findex < newFormData.fields.length; findex++){
                if(newFormData.fields[findex]['id'] == 'tc_friends'){
                    formData['tc_friends'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'tc_contributions'){
                    formData['tc_contributions'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'tc_student_loan'){
                    formData['tc_student_loan'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'tc_scholarships_grants'){
                    formData['tc_scholarships_grants'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'tc_personal_heloc'){
                    formData['tc_personal_heloc'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'tc_assign_asset'){
                    formData['tc_assign_asset'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'tc_work_study'){
                    formData['tc_work_study'] = newFormData.fields[findex]['value'];
                }
            }

            // formData = this.setConditionValue(formData);
    
            let enableNext = false;
            if(formData['tc_friends'] != '' && formData['tc_contributions'] != '' && formData['tc_student_loan'] != '' && formData['tc_scholarships_grants'] != '' && formData['tc_personal_heloc'] != '' && formData['tc_assign_asset'] != '' && formData['tc_work_study'] != ''){
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

        if(formData['tc_friends'] != '' && formData['tc_contributions'] != '' && formData['tc_student_loan'] != '' && formData['tc_scholarships_grants'] != '' && formData['tc_personal_heloc'] != '' && formData['tc_assign_asset'] != '' && formData['tc_work_study'] != ''  ){
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


        let formData = TuitionCostsSubForm.FnCreateFormData({
            tc_friends: this.state.formData['tc_friends'],
            tc_contributions: this.state.formData['tc_contributions'],
            tc_student_loan: this.state.formData['tc_student_loan'],
            tc_scholarships_grants: this.state.formData['tc_scholarships_grants'],
            tc_personal_heloc: this.state.formData['tc_personal_heloc'],
            tc_assign_asset: this.state.formData['tc_assign_asset'],
            tc_work_study: this.state.formData['tc_work_study']
        })

        this.props.cbUpdateSubForm(formID, formData);
        // this.props.cbGoSubForm("TuitionChecklist");
   ////// NEXT FORM SELECTION SETUP IN ONCLICK IN EACH BUTTON /////
        
    }
    

    goPreviousForm(){
        this.props.cbGoSubForm("RoomBoardMiscDetails");
       
    }


                
                
    render() {
        const { size } = this.state;
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Tuition Costs</h2>
            <p>You have determined that your costs will be:</p>
                <h3>Tuition: {this.props.tuitionCosts}
            </h3>
                <h3>Room and Board: {this.props.rbmCosts}</h3>
            
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
            <h3>Friends \ Family</h3>
                        <Form.Item label="Complete Details Now?">
                                <Radio.Group name="tc_friends" size={'large'} onChange={(event) => this.handleInputChange(event)} value={this.state.formData.tc_friends}>
                                    
            <Radio.Button value="Now" onClick={() => this.goNextForm(this.props.cbGoSubForm("FriendsFamily"))}>Now</Radio.Button>
                                    

            <Radio.Button value="Later">Later</Radio.Button>
            



</Radio.Group>
                            </Form.Item>
                        </Col>
                        
            
            <Col span={16}>
                <h3>Contributions / Savings</h3>
                        <Form.Item label="Complete Details Now?">
                                <Radio.Group name="tc_contributions" size={'large'} onChange={(event) => this.handleInputChange(event)} value={this.state.formData.tc_contributions}>
                                    <Radio.Button value="Now" onClick={() => this.goNextForm(this.props.cbGoSubForm("AssignSavingsToGoal"))}>Now</Radio.Button>
                                    <Radio.Button value="Later">Later</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    
            
            <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <h3>Student Loan</h3>
                          <Form.Item label="Complete Details Now?">
                                <Radio.Group name="tc_student_loan" size={'large'} onChange={(event) => this.handleInputChange(event)} value={this.state.formData.tc_student_loan}>
                                    <Radio.Button value="Now" onClick={() => this.goNextForm(this.props.cbGoSubForm("StudentLoanDetails"))}>Now</Radio.Button>
                                    <Radio.Button value="Later">Later</Radio.Button>
                                </Radio.Group>
                            </Form.Item>  
                        </Col>
                        
            <Col span={16} type="flex" justify="center">
                <h3>Scholarships \ Grants</h3>
                        <Form.Item label="Complete Details Now?">
                                <Radio.Group name="tc_scholarships_grants" size={'large'} onChange={(event) => this.handleInputChange(event)} value={this.state.formData.tc_scholarships_grants}>
                                    <Radio.Button value="Now" onClick={() => this.goNextForm(this.props.cbGoSubForm("Schlolarships_grants"))}>Now</Radio.Button>
                                    <Radio.Button value="Later">Later</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    
            
            <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <h3>Personal Loan/HELOC</h3>
                            <Form.Item label="Complete Details Now?">
                                <Radio.Group name="tc_personal_heloc" size={'large'} onChange={(event) => this.handleInputChange(event)} value={this.state.formData.tc_personal_heloc}>
                                    <Radio.Button value="Now" onClick={() => this.goNextForm(this.props.cbGoSubForm("Loan_details"))}>Now</Radio.Button>
                                    <Radio.Button value="Later">Later</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        
                        <Col span={16}>
                            <h3>Assign an Asset</h3>
                            <Form.Item label="Complete Details Now?">
                                <Radio.Group name="tc_assign_asset" size={'large'} onChange={(event) => this.handleInputChange(event)} value={this.state.formData.tc_assign_asset}>
                                    <Radio.Button value="Now" onClick={() => this.goNextForm(this.props.cbGoSubForm("TuitionCosts"))}>Now</Radio.Button>
                                    <Radio.Button value="Later">Later</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>

                        <Col span={16}>
                            <h3>Work Study</h3>
                            <Form.Item label="Complete Details Now?">
                                <Radio.Group name="tc_work_study" size={'large'} onChange={(event) => this.handleInputChange(event)} value={this.state.formData.tc_work_study}>
                                    <Radio.Button value="Now" onClick={() => this.goNextForm(this.props.cbGoSubForm("WorkStudy"))}>Now</Radio.Button>
                                    <Radio.Button value="Later">Later</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
            

                    </Row>
                </div>
                
            
            
            
            
            
            
            <div className="row justify-content-between">
                    <div className="col-8">
                        <Button type="primary" size={'large'} onClick={() => this.goPreviousForm()}>
                            <Icon type="left" />
                            Previous
                        </Button>
                    </div>
                    <div className="col-4 d-flex justify-content-end">
                        {
                            this.props.dataID != null && 
                            <Button type="primary" size={'large'} style={{marginRight: '10px'}} onClick={() => this.goNextForm(true)}>
                                Update
                            </Button>
                        }
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


export default connect()(TuitionCostsSubForm);