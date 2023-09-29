import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

import { useMutation } from '@apollo/react-hooks';
import {
    QL_ASSISTANCE_IN_ADD,
    QL_ASSISTANCE_IN_UPDATE,
    QL_ASSISTANCE_OUT_ADD,
    QL_ASSISTANCE_OUT_UPDATE
} from '../../../constants/queries';

import { FormPagePose } from '../../../components/Animations';

import QuestionAssistanceInOutSubForm from './QuestionAssistanceInOutSubForm';
import QuestionCurrentFutureSubForm from './assistance_in/subforms/QuestionCurrentFutureSubForm';
import CurrentAssistanceSubForm from './assistance_in/subforms/CurrentAssistanceSubForm';
import FutureAssistanceSubForm from './assistance_in/subforms/FutureAssistanceSubForm';
import EndSubForm from './EndSubForm';
import AssistanceOutSubForm from './assistance_out/subforms/AssistanceOutSubForm';

var fnMutationAssistanceInAdd = null;
var dataMutationAssistanceInAdd = null;

var fnMutationAssistanceInUpdate = null;
var dataMutationAssistanceInUpdate = null;

var fnMutationAssistanceOutAdd = null;
var dataMutationAssistanceOutAdd = null;

var fnMutationAssistanceOutUpdate = null;
var dataMutationAssistanceOutUpdate = null;

function HiddenHook(){
    [fnMutationAssistanceInAdd, { dataMutationAssistanceInAdd }] = useMutation(QL_ASSISTANCE_IN_ADD);
    [fnMutationAssistanceInUpdate, { dataMutationAssistanceInUpdate }] = useMutation(QL_ASSISTANCE_IN_UPDATE);

    [fnMutationAssistanceOutAdd, { dataMutationAssistanceOutAdd }] = useMutation(QL_ASSISTANCE_OUT_ADD);
    [fnMutationAssistanceOutUpdate, { dataMutationAssistanceOutUpdate }] = useMutation(QL_ASSISTANCE_OUT_UPDATE);

    return (
        <React.Fragment></React.Fragment>
    )
}

class AssistanceNew extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataID: null,
            assistanceType: 'In',
            curSubForm: QuestionAssistanceInOutSubForm,
            formVisible: false,
            subFormData: {},
            formData: [
                // {
                //     id: 'assetsInformation',
                //     data: {
                //         title: '',
                //         fields: [
                //             {
                //                 id: '' ,
                //                 title: '',
                //                 value: ''
                //              }   
                //         ]
                //     }
                // }
            ],
            isRightSideOpen: true,
            formSteps: [
                {
                    id: 'StaticSubForm',
                    icon: 'icon_ex.png',
                    title: 'Step1'
                },
                {
                    id: 'QuestionPredictionSubForm',
                    icon: 'icon_ex.png',
                    title: 'Step2'
                },
                {
                    id: 'ChoosePredictionSubForm',
                    icon: 'icon_ex.png',
                    title: 'Step3'
                },
                {
                    id: 'QuestionOwnRateSubForm',
                    icon: 'icon_ex.png',
                    title: 'Step4'
                },
                {
                    id: 'UserDefinedSubForm',
                    icon: 'icon_ex.png',
                    title: 'Step5'
                },
                {
                    id: 'QuestionMonteCarloSubForm',
                    icon: 'icon_ex.png',
                    title: 'Step6'
                },
                {
                    id: 'MonteCarloSubForm',
                    icon: 'icon_ex.png',
                    title: 'Step7'
                }
            ]
        }

        this.goSubForm = this.goSubForm.bind(this);
        this.updateSubForm = this.updateSubForm.bind(this);
        this.getSubFormData = this.getSubFormData.bind(this);
        this.getSubFormField = this.getSubFormField.bind(this);

        this.createQLVariable = this.createQLVariable.bind(this);
        this.getSubFormFieldValue = this.getSubFormFieldValue.bind(this);

        this.toggleRightSide = this.toggleRightSide.bind(this);
    }

    componentDidMount() {
        this.goSubForm("QuestionAssistanceInOutSubForm");
        // this.goSubForm("TaxLiquiditySubForm");
    }

    getSubFormField(formID, fieldID){
        let formData = this.state.formData;

        for(var index = 0; index < formData.length; index++){
            if(formData[index]['id'] == formID){
                let data = formData[index]['data'];
                let fields = data['fields'];
                for(var findex = 0; findex < fields.length; findex++){
                    if(fields[findex]['id'] == fieldID){
                        return fields[findex];
                    }
                }
            }
        }

        return null
    }

    getSubFormFieldValue(formID, fieldID){
        let field = this.getSubFormField(formID, fieldID);

        if(field == null){
            return '';
        }
        else{
            return field.value;
        }
    }

    createQLVariable(subFormID, subFormData){
        let varQL = null;

        switch(subFormID){
            case 'QuestionAssistanceInOutSubForm': 
                break;
            case 'QuestionCurrentFutureSubForm': 
                varQL = {
                    "assistanceIn" : {
                        "currentAssistance": this.getSubFormFieldValue(subFormID, 'isCurrent') == 'Current' ? true : false
                    }
                };
                break;
            case 'CurrentAssistanceSubForm':
                varQL = {
                    "assistanceIn" : {
                        "recipientFirstName": this.getSubFormFieldValue(subFormID, 'recipientFirstName'),
                        "recipientFirstName": this.getSubFormFieldValue(subFormID, 'recipientLastName'),
                        "personProvidingAssistanceFirstName": this.getSubFormFieldValue(subFormID, 'assistanceFirstName'),
                        "personProvidingAssistanceLastName": this.getSubFormFieldValue(subFormID, 'assistanceLastName'),
                        "relationship": this.getSubFormFieldValue(subFormID, 'relationship'),
                        "amountReceived": parseInt(this.getSubFormFieldValue(subFormID, 'amountRecieved')),
                        "frequency": this.getSubFormFieldValue(subFormID, 'frequency'),
                        "estimatedStartDate": this.getSubFormFieldValue(subFormID, 'estimatedStartDate'),
                        "assistanceEnds": this.getSubFormFieldValue(subFormID, 'assistanceEnds'),
                        // "goalBeingFunded":
                        // "estimatedEndDate"
                        // "totalAmountReceived"
                    }
                };
                break;
            case 'FutureAssistanceSubForm':
                varQL = {
                    "assistanceIn" : {
                        // "": this.getSubFormFieldValue(subFormID, 'inheritanceAmount'),
                        // "": this.getSubFormFieldValue(subFormID, 'yearExpectedIncome'),
                        // "": this.getSubFormFieldValue(subFormID, 'firstName'),
                        // "": this.getSubFormFieldValue(subFormID, 'lastName'),
                        // "": this.getSubFormFieldValue(subFormID, 'relationship'),
                    }
                };
                break;
            case 'AssistanceOutSubForm':
                varQL = {
                    "assistanceOut" : {
                        "recipientFirstName": this.getSubFormFieldValue(subFormID, 'firstName'),
                        "recipientLastName": this.getSubFormFieldValue(subFormID, 'lastName'),
                        "personProvidingAssistance": this.getSubFormFieldValue(subFormID, 'person'),
                        "relationship": this.getSubFormFieldValue(subFormID, 'relationship'),
                        "estimatedStartDate": this.getSubFormFieldValue(subFormID, 'estimatedStartDate'),
                        // "addToMonthlyBudget":
                        "annualGiftingAmount": this.getSubFormFieldValue(subFormID, 'annualGiftingAmount') != '' ? parseInt(this.getSubFormFieldValue(subFormID, 'annualGiftingAmount')) : 0,
                        "frequency": this.getSubFormFieldValue(subFormID, 'frequency'),
                        "assistanceEnds": this.getSubFormFieldValue(subFormID, 'assistanceEnds'),
                        "budgetItem": this.getSubFormFieldValue(subFormID, 'budgetItem'),
                        // "notes":
                        // "estimatedEndDate":
                        
                    }
                };
                break;
            case 'EndSubForm':
                
        }

        return varQL;
    }

    updateSubForm(subFormID, subFormData, visible = true){
        let formData = this.state.formData;

        var bFound = false;
        for(var findex = 0; findex < formData.length; findex++){
            if(formData[findex]['id'] == subFormID){
                formData[findex]['data'] = subFormData;
                bFound = true;
            }
        }

        if(!bFound){
            formData.push({
                id: subFormID,
                data: subFormData,
                visible: visible
            })
        }

        if(subFormID == 'QuestionAssistanceInOutSubForm'){
            this.setState({
                assistanceType: this.getSubFormFieldValue(subFormID, 'isAssistanceInOut')
            })
        }
        else {
            let varQL = this.createQLVariable(subFormID, subFormData);

            console.log('varQL:', varQL, ', dataID:', this.state.dataID);
            
            var instance = this;
            if(varQL != null){
                if(this.state.dataID == null){
                    if(this.state.assistanceType == 'In'){
                        fnMutationAssistanceInAdd({ variables: { data: varQL } }).then((response) => {
                            instance.setState({
                                dataID: response['data']['createAssistanceIn']['id']
                            })
                        });
                    }
                    else{
                        fnMutationAssistanceOutAdd({ variables: { data: varQL } }).then((response) => {
                            instance.setState({
                                dataID: response['data']['createAssistanceOut']['id']
                            })
                        });
                    }
                    
                }
                else{
                    if(this.state.assistanceType == 'In'){
                        fnMutationAssistanceInUpdate({ variables: { id: this.state.dataID, data: varQL } })
                    }
                    else{
                        fnMutationAssistanceOutUpdate({ variables: { id: this.state.dataID, data: varQL } })
                    }
                    
                }
            }
        }

        this.setState({
            formData: formData
        });
    }

    getSubFormData(subFormID){
        let formData = this.state.formData;

        for(var findex = 0; findex < formData.length; findex++){
            if(formData[findex]['id'] == subFormID){
                return formData[findex]['data'];
            }
        }

        return {};
    }

    goSubForm(subFormID){

        this.setState({
            formVisible: false,
        })

        let nextSubForm = QuestionAssistanceInOutSubForm;
        let subFormData = this.getSubFormData(subFormID);

        switch(subFormID){
            case 'QuestionAssistanceInOutSubForm':
                nextSubForm = QuestionAssistanceInOutSubForm;
                break;
            case 'QuestionCurrentFutureSubForm': 
                nextSubForm = QuestionCurrentFutureSubForm;
                break;
            case 'CurrentAssistanceSubForm': 
                nextSubForm = CurrentAssistanceSubForm;
                break;
            case 'FutureAssistanceSubForm': 
                nextSubForm = FutureAssistanceSubForm;
                break;
            case 'AssistanceOutSubForm':
                nextSubForm = AssistanceOutSubForm;
                break;
            case 'EndSubForm':
                nextSubForm = EndSubForm;
                break;
        }

        setTimeout(() => {
            this.setState({ 
                formVisible: true,
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
                href: '/modules',
                title: 'Modules'
            },
            {
                href: '/assistance',
                title: 'Assistance'
            }
        ]

        let SubForm = this.state.curSubForm;

        let formpageClassName = 'form-page-container-wrap';
        if(this.state.isRightSideOpen){
            formpageClassName = 'form-page-container-wrap right-side--opend';
        }
        else {
            formpageClassName = 'form-page-container-wrap right-side--collapsed';
        }

        return (
            <div className={formpageClassName}>
                <div className="form-page--main-side">
                    <HiddenHook />
                    <div className="page-nav-history">
                        {/* { 
                            navlinks.map((navlink, index) => {
                                return (
                                    <span key={index}>
                                        <Link key={index} to={navlink.href} className="page-nav-link">
                                            {navlink.title}
                                        </Link>
                                        {index != (navlinks.length - 1) ? "/" : null}
                                    </span>
                                    
                                )                            
                            }) 
                        } */}
                    </div>
                    <div className="form-step-container">
                        {
                            this.state.formSteps.map((formStep, index) => {
                                return (
                                    <div key={index} className="form-step-wrap" onClick={() => this.goSubForm(formStep.id)}>
                                        <img className="" src={require('../../../assets/images/page_icons/' + formStep.icon)}></img>
                                        <div className="">{formStep.title}</div>
                                    </div>            
                                )
                            })
                        }
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
                                />
                            </FormPagePose>
                        </div>
                    </div>
                </div>
                <div className="form-page--right-side">
                    <span className="right-side-collapse-icon" onClick={this.toggleRightSide}>
                        <i className="fe-menu"></i>
                    </span>
                    <div className="form-page--right-side-wrap">
                        {
                            this.state.formData.map((subForm, sindex) => {
                                if(subForm.visible == false){
                                    return (<div key={sindex}></div>)
                                }
                                
                                let subFormData = subForm.data;
                                return(
                                <div className="form-brief-block" key={sindex}>
                                    <div className="form-brief-top">
                                        <h4 className="form-brief-title">{subFormData.title}</h4>
                                        <span className="form-brief-edit-btn" onClick={() => this.goSubForm(subForm.id)}><Icon type="edit"></Icon></span>
                                    </div>
                                    <div className="form-brief-content">
                                    {
                                        subFormData.fields.map((field, ffindex) => {
                                            return(
                                                <div className="form-brief-item" key={ffindex}>
                                                    <p className="form-brief-item-title">{field.title != '' ? field.title + ":" : null} </p>
                                                    <p className="form-brief-item-value">{field.value}</p>
                                                </div>
                                            )
                                        })
                                    }
                                    </div>
                                </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(AssistanceNew);