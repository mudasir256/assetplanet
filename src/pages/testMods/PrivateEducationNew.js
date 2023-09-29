import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon, Collapse, Timeline, Layout, Steps } from 'antd';
import ImageIcon from '../../assets/images/asset.png';
import AssetPlanet from '../../assets/images/asset-planet-logo.jpg';
import { useMutation } from '@apollo/react-hooks';
import {
    QL_GOAL_ADD,
    QL_GOAL_UPDATE
} from '../../constants/queries';

import { FormPagePose } from '../../components/Animations';

////////IMPORT ALL SUBFORMS THAT WILL BE USED

import GoalInformationSubForm from './GoalInformationSubForm';

import PrivateEducationDetails from './privateEducationDetails/privateEducationDetails';
import PrivateEducationK12 from './privateEducationDetails/privateEducationK12';
import QuestionOtherCosts from './privateEducationDetails/questionOtherCosts';
import Room_board_misc from './privateEducationDetails/room_board_misc';

import FriendsFamily from './contributions_savings/friendsFamily';
import MultiplePayments from './contributions_savings/multiplePayments';
import OneTimePayments from './contributions_savings/oneTimePayments';
import CSQuestionLoopAdd from './contributions_savings/questionLoopAdd';

import AssignSavingsToGoal from './AssignAssets/assignSavingsToGoal';
import AAQuestionLoopAdd from './AssignAssets/questionLoopAdd';

import StudentLoanDetails from './StudentLoan/studentLoanDetails';
import SLQuestionLoopAdd from './StudentLoan/questionLoopAdd';

import Schlolarships_grants from './Scholarships_Grants/schlolarships_grants';
import SGQuestionLoopAdd from './Scholarships_Grants/questionLoopAdd';

import Loan_details from './personal_loan_heloc/loan_details';
import Parent_plus_loan from './personal_loan_heloc/parent_plus_loan';
import Personal_loan_heloc from './personal_loan_heloc/personal_loan_heloc';
import PLHQuestionLoopAdd from './personal_loan_heloc/questionLoopAdd';

import WorkStudy from './workStudy/workStudy';
import WSQuestionLoopAdd from './workStudy/questionLoopAdd';

import TuitionCosts from './tuitionCosts/tuitionCosts';

import TuitionChecklist from './checklist/checkList';

import TuitionSummary from './summary/tuitionSummary';



var fnMutationRatesReturnAdd = null;
var dataMutationRatesReturnAdd = null;

var fnMutationRatesReturnUpdate = null;
var dataMutationRatesReturnUpdate = null;
let prevPos = 0;

const { Panel } = Collapse;


//////// ARRAY BUILT TO REFERENCE EACH SUBFORM for STEPS // top navigation
const goals =   [{
                    id: 'PrivateEducationDetails',
                    icon: 'icon_ex.png',
                    title: 'Private Education Details'
                },
                {
                    id: 'PrivateEducationK12Details',
                    icon: 'icon_ex.png',
                    title: 'K-12 Details'
                },
                {
                    id: 'QuestionOtherCosts',
                    icon: 'icon_ex.png',
                    title: 'Question Other Costs'
                },
                 {
                    id: 'RoomBoardMiscDetails',
                    icon: 'icon_ex.png',
                    title: 'Room, Board, Misc'
                },
                 {
                    id: 'FriendsFamily',
                    icon: 'icon_ex.png',
                    title: 'Friends Family'
                },
                 {
                    id: 'MultiplePayments',
                    icon: 'icon_ex.png',
                    title: 'Multiple Payments'
                },
                 {
                    id: 'OneTimePayments',
                    icon: 'icon_ex.png',
                    title: 'One Time Payments'
                },
                 {
                    id: 'CSQuestionLoopAdd',
                    icon: 'icon_ex.png',
                    title: 'Add More'
                },
                 {
                    id: 'AssignSavingsToGoal',
                    icon: 'icon_ex.png',
                    title: 'Assign Savings To Goal'
                },
                 {
                    id: 'AAQuestionLoopAdd',
                    icon: 'icon_ex.png',
                    title: 'Add More'
                },
                 {
                    id: 'StudentLoanDetails',
                    icon: 'icon_ex.png',
                    title: 'Student Loan Details'
                },
                 {
                    id: 'SLQuestionLoopAdd',
                    icon: 'icon_ex.png',
                    title: 'Add More'
                },
                 {
                    id: 'Schlolarships_grants',
                    icon: 'icon_ex.png',
                    title: 'Schlolarships \ Grants'
                },
                 {
                    id: 'SGQuestionLoopAdd',
                    icon: 'icon_ex.png',
                    title: 'Add More'
                },
                 {
                    id: 'Loan_details',
                    icon: 'icon_ex.png',
                    title: 'Loan Details'
                },
                 {
                    id: 'Parent_plus_loan',
                    icon: 'icon_ex.png',
                    title: 'Parent Plus Loan'
                },
                 {
                    id: 'Personal_loan_heloc',
                    icon: 'icon_ex.png',
                    title: 'Personal Loan Heloc'
                },
                 {
                    id: 'PLHQuestionLoopAdd',
                    icon: 'icon_ex.png',
                    title: 'Add More'
                },
                 {
                    id: 'WorkStudy',
                    icon: 'icon_ex.png',
                    title: 'Work Study'
                },
                 {
                    id: 'WSQuestionLoopAdd',
                    icon: 'icon_ex.png',
                    title: 'Goal Details'
                },
                 {
                    id: 'TuitionCosts',
                    icon: 'icon_ex.png',
                    title: 'Funding Sources'
                },
                 {
                    id: 'TuitionChecklist',
                    icon: 'icon_ex.png',
                    title: 'Funding Checklist'
                },
                 {
                    id: 'TuitionSummary',
                    icon: 'icon_ex.png',
                    title: 'Summary'
                }
                 
            ];

function HiddenHook() {
    [fnMutationRatesReturnAdd, { dataMutationRatesReturnAdd }] = useMutation(QL_GOAL_ADD);
    [fnMutationRatesReturnUpdate, { dataMutationRatesReturnUpdate }] = useMutation(QL_GOAL_UPDATE);

    return (
        <React.Fragment></React.Fragment>
    )
}



//////////////////

class PrivateEducationNew extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataID: "1",
            curSubFormID: 'PrivateEducationDetails',
            curSubForm: PrivateEducationDetails,
            formVisible: false,
            subFormData: {},
            isRightSideOpen: true,
            formData: [],
            formSteps: []
        }

        this.goSubForm = this.goSubForm.bind(this);
        this.updateSubForm = this.updateSubForm.bind(this);
        this.getSubFormData = this.getSubFormData.bind(this);
        this.getSubFormField = this.getSubFormField.bind(this);

        this.createQLVariable = this.createQLVariable.bind(this);
        this.getSubFormFieldValue = this.getSubFormFieldValue.bind(this);

        this.toggleRightSide = this.toggleRightSide.bind(this);
    }

    
///////////////FORM STEPS BASED ON GOALS ARRAY
    componentDidMount() {
        if (this.props.location.state.title === 'Private Education') {
            this.setState({
                formSteps: [
                    goals[0],
                    goals[1],
                    goals[3],
                    goals[20],
                    goals[21],
                    goals[22]
                ]
            });
            this.goSubForm("PrivateEducationDetails");
        } else {
            this.setState({
                formSteps: [
                    goals[0],
                    goals[1],
                    goals[2],
                    goals[3],
                    goals[4],
                    goals[5]
                ]
            });
            this.goSubForm("GoalInformationSubForm");
        }
    }

    getSubFormField(formID, fieldID) {
        let formData = this.state.formData;

        for (var index = 0; index < formData.length; index++) {
            if (formData[index]['id'] == formID) {
                let data = formData[index]['data'];
                let fields = data['fields'];
                for (var findex = 0; findex < fields.length; findex++) {
                    if (fields[findex]['id'] == fieldID) {
                        return fields[findex];
                    }
                }
            }
        }

        return null
    }

    getSubFormFieldValue(formID, fieldID) {
        let field = this.getSubFormField(formID, fieldID);

        if (field == null) {
            return '';
        }
        else {
            return field.value;
        }
    }

    
    
    
    
    createQLVariable(subFormID, subFormData) {
        let varQL = null;
 ////////// SAVING DATA????       
        switch (subFormID) {
            case 'PrivateEducationDetails':
                varQL = {
                    "pe": {
                        "person_attending": this.getSubFormFieldValue(subFormID, 'pe_person_attending'),
                        "institutionName": this.getSubFormFieldValue(subFormID, 'pe_institution_name'),
                        "educationLevel": this.getSubFormFieldValue(subFormID, 'pe_education_level'),
                        "numberYears": this.getSubFormFieldValue(subFormID, 'pe_numb_years'),
                        "tuitionCost": this.getSubFormFieldValue(subFormID, 'pe_tuition_cost'),
                        "inflationRate": this.getSubFormFieldValue(subFormID, 'pe_inflation_rate')
                    }
                };
                break;
            case 'RoomBoardMiscDetails':
                 varQL = {
                    "pe": {
                        "rbm_meal": this.getSubFormFieldValue(subFormID, 'rbm_meal'),
                        "rbm_equipment": this.getSubFormFieldValue(subFormID, 'rbm_equipment'),
                        "rbm_personal": this.getSubFormFieldValue(subFormID, 'rbm_personal'),
                        "rbm_transportation": this.getSubFormFieldValue(subFormID, 'rbm_transportation'),
                        "rbm_school_activity": this.getSubFormFieldValue(subFormID, 'rbm_school_activity'),
                        "rbm_housing": this.getSubFormFieldValue(subFormID, 'rbm_housing'),
                        "rbm_meal": this.getSubFormFieldValue(subFormID, 'rbm_meal'),
                        "rbm_inflation": this.getSubFormFieldValue(subFormID, 'rbm_inflation')
                    }
                 };
                
                break;
            case 'GoalFinancingInformationSubForm':
                
                break;
            case 'QuestionFinancialAssitanceSubForm':
                break;
            case 'AssistanceReceivedSubForm':
               
                break;
            case 'AssetsToGoalSubForm':
               
                break;
            case 'RetirementSubForm':
               
                break;
            case 'QuestionAssignAssetSubForm':
                
                break;
            case 'AssignSavingsToGoalSubForm':
                
                break;
            case 'QuestionApplySavingSubForm':
                break;
            case 'QuestionLoanSubForm':
                break;
            case 'LoanSubForm':
                
                break;
            case 'RentalPropertySubForm':
                // no fields
                break;
            case 'QuestionAddChildSubForm':
                break;
            case 'AdoptionSubForm':
                // no fields
                break;
            case 'BirthDetailSubForm':
                // no fields
                break;
            case 'BreastFeedingFormulaSubForm':
                // no fields
                break;
            case 'GroomingSubForm':
                // no fields
                break;
            case 'TransportationSubForm':
                // no fields
                break;
            case 'ChildcareSubForm':
                // no fields
                break;
            case 'ClothingDiaperSubForm':
                // no fields
                break;
            case 'HealthEntertainmentSubForm':
                // no fields
                break;
            case 'CollegeSubForm':
                // no fields
                break;
            case 'TuitionPaymentSubForm':
                // no fields
                break;
            case 'PrivateEducationSubForm':
                // no fields
                break;
            case 'RoomBoardMiscSubForm':
                // no fields
                break;
        }

        return varQL;
    }
    updateSubForm(subFormID, subFormData, visible = true) {
        let formData = this.state.formData;

        var bFound = false;
        for (var findex = 0; findex < formData.length; findex++) {
            if (formData[findex]['id'] == subFormID) {
                formData[findex]['data'] = subFormData;
                bFound = true;
            }
        }

        if (!bFound) {
            formData.push({
                id: subFormID,
                data: subFormData,
                visible: visible
            })
        }

        let varQL = this.createQLVariable(subFormID, subFormData);

        console.log('varQL:', varQL, ', dataID:', this.state.dataID);
        
        var instance = this;
        if (varQL != null) {
            if (this.state.dataID == null) {
                fnMutationRatesReturnAdd({ variables: { data: varQL } }).then((response) => {
                    instance.setState({
                        dataID: response['data']['createGoal']['id']
                    })
                });

            }
            else {
                fnMutationRatesReturnUpdate({ variables: { id: this.state.dataID, data: varQL } })
            }
        }

        this.setState({
            formData: formData
        });
    }

    getSubFormData(subFormID) {
        let formData = this.state.formData;

        for (var findex = 0; findex < formData.length; findex++) {
            if (formData[findex]['id'] == subFormID) {
                return formData[findex]['data'];
            }
        }

        return {};
    }

    genExtra = (id) => (
        <Icon type="form" onClick={() => this.goSubForm(id)}></Icon>
    );

    goSubForm(subFormID) {

        this.setState({
            formVisible: false,
        })
 
        let nextSubForm = PrivateEducationDetails;
        let subFormData = this.getSubFormData(subFormID);

//// MATCHES CBGOSUBFORM IN OTHER SUBFORM ///  NEXT SUBFORM REFERS TO IMPORT //       
        switch (subFormID) {

            case 'PrivateEducationDetails':
                nextSubForm = PrivateEducationDetails;
                break;
            case 'RoomBoardMiscDetails':
                nextSubForm = Room_board_misc;
                break;
            case 'PrivateEducationK12Details':
                nextSubForm = PrivateEducationK12;
                break;
            case 'CSQuestionLoopAdd':
                nextSubForm = CSQuestionLoopAdd;
                break;
            case 'QuestionOtherCosts':
                nextSubForm = QuestionOtherCosts;
                break;
            case 'FriendsFamily':
                nextSubForm = FriendsFamily;
                break;
            case 'MultiplePayments':
                nextSubForm = MultiplePayments;
                break;
            case 'OneTimePayments':
                nextSubForm = OneTimePayments;
                break;
            case 'CSQuestionLoopAdd':
                nextSubForm = CSQuestionLoopAdd;
                break;
            case 'AAQuestionLoopAdd':
                nextSubForm = AAQuestionLoopAdd;
                break;
                
                
            case 'FriendsFamily':
                nextSubForm = FriendsFamily;
                break;
            case 'AssignSavingsToGoal':
                nextSubForm = AssignSavingsToGoal;
                break;
            case 'StudentLoanDetails':
                nextSubForm = StudentLoanDetails;
                break;
            case 'Schlolarships_grants':
                nextSubForm = Schlolarships_grants;
                break;
            case 'Loan_details':
                nextSubForm = Loan_details;
                break;
            case 'WorkStudy':
                nextSubForm = WorkStudy;
                break;
            case 'TuitionCosts':
                nextSubForm = TuitionCosts;
                break;
            case 'SLQuestionLoopAdd':
                nextSubForm = SLQuestionLoopAdd;
                break;
            case 'SGQuestionLoopAdd':
                nextSubForm = SGQuestionLoopAdd;
                break;
            case 'PLHQuestionLoopAdd':
                nextSubForm = PLHQuestionLoopAdd;
                break;
                
            case 'Parent_plus_loan':
                nextSubForm = Parent_plus_loan;
                break;
            case 'Personal_loan_heloc':
                nextSubForm = Personal_loan_heloc;
                break;
            case 'PLHQuestionLoopAdd':
                nextSubForm = PLHQuestionLoopAdd;
                break;
            case 'TuitionCosts':
                nextSubForm = TuitionCosts;
                break;    
            case 'TuitionChecklist':
                nextSubForm = TuitionChecklist;
                break;
                
            case 'TuitionSummary':
                nextSubForm = TuitionSummary;
                break;
   
        }

        

        setTimeout(() => {
            this.setState({
                formVisible: true,
                curSubFormID: subFormID,
                curSubForm: nextSubForm,
                subFormData: subFormData
            });
        }, 100);

    }

    toggleRightSide = (e) => {
        e.preventDefault();
        this.setState({ isRightSideOpen: !this.state.isRightSideOpen });
    }

    render() {

        const navlinks = [
            {
                href: '/',
                title: 'Home'
            },
            {
                href: '/goals',
                title: 'Goals'
            }
        ]

        let SubForm = this.state.curSubForm;

        let formpageClassName = 'form-page-container-wrap';
        if (this.state.isRightSideOpen) {
            formpageClassName = 'form-page-container-wrap right-side--opend';
        }
        else {
            formpageClassName = 'form-page-container-wrap right-side--collapsed';
        }
        return (
            <div className={formpageClassName}>
                <div className="form-page--main-side">
                    <div className="steps">
                        <div className="logo-container align-items-top justify-content-center">
                            <img className="img-asset" src={AssetPlanet} />
                        </div>
                        <div className="process">
                            <div className="process-row">
                                {
                                    this.state.formSteps.map((formStep, index) => {
                                        let elementPos = this.state.formSteps.map(function(x) {return x.id; }).indexOf(this.state.curSubFormID);
                                        if (elementPos === -1) {
                                            // elementPos = prevPos+1;
                                            elementPos = prevPos;
                                        } else {
                                            prevPos = elementPos;
                                        }
                                        return (
                                            <div className="process-step" key={index}>
                                                <button type="button" className={ elementPos >= index ? 'btn nav-items btn-circle active' : 'btn nav-items btn-circle' } data-toggle="tab" onClick={() => this.goSubForm(formStep.id)}>
                                                    <img className="img-icon" src={ImageIcon} />
                                                </button>
                                                <p className="step-title">{formStep.title}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <HiddenHook />
                    <div className="container">
                        <div className="page-nav-history">
                            {/* {
                                navlinks.map((navlink, index) => {
                                    return (
                                        <span key={index}>
                                            <Link key={index} to={navlink.href} className="page-nav-link text-uppercase">
                                                {navlink.title}
                                            </Link>
                                            {index != (navlinks.length - 1) ? "/" : null}
                                        </span>

                                    )
                                })
                            } */}
                        </div>
                        <div className="form-page-container">
                            <div className="form-page--left-side">
                                <FormPagePose className="info-form-block" pose={this.state.formVisible ? 'visible' : 'hidden'}>
                                    <SubForm
                                        subFormData={this.state.subFormData}
                                        cbGoSubForm={this.goSubForm}
                                        cbUpdateSubForm={this.updateSubForm}
                                        formData={this.state.formData}
                                        cbGetSubFormField={this.getSubFormField}
                                        selectedGoal={this.props.location.state.title}
                                        tuitionCosts={this.getSubFormFieldValue('PrivateEducationDetails', 'pe_tuition_cost')}
                                        rbmCosts={this.getSubFormFieldValue('RoomBoardMiscDetails', 'rbm_housing')}
                                    />
                                </FormPagePose>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-page--right-side custom">
                    <span className="right-side-collapse-icon" onClick={this.toggleRightSide}>
                        <i className="fe-menu"></i>
                    </span>
                    <Collapse expandIconPosition='right'>
                        {
                            this.state.formData.map((subForm, sindex) => {
                                if (subForm.visible == false) {
                                    return (<div key={sindex}></div>)
                                }

                                let subFormData = subForm.data;
                                return (
                                    <Panel header={subFormData.title} key={sindex} extra={this.genExtra(subForm.id)}>
                                        <Timeline>
                                            {
                                                subFormData.fields.map((field, ffindex) => {
                                                    return (
                                                        <Timeline.Item key={{ffindex}}>{field.title != '' ? field.title + ":" : null} {field.value}</Timeline.Item>
                                                    )
                                                })
                                            }
                                        </Timeline>
                                    </Panel>
                                )
                            })
                        }
                    </Collapse>
                </div>
            </div>
        )
    }
}
export default connect()(PrivateEducationNew);