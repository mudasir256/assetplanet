import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import ImageIcon from 'assets/images/asset.png';
import AssetPlanet from 'assets/images/asset-planet-logo.jpg';

import { useMutation, useQuery } from '@apollo/react-hooks';
import {
    QL_ASSISTANCE_IN_ADD,
    QL_ASSISTANCE_IN_UPDATE,
    QL_ASSISTANCE_IN_GET
} from '../../../../constants/queries';

import { FormPagePose } from '../../../../components/Animations';

import QuestionCurrentFutureSubForm from './subforms/QuestionCurrentFutureSubForm';
import CurrentAssistanceSubForm from './subforms/CurrentAssistanceSubForm';
import FutureAssistanceSubForm from './subforms/FutureAssistanceSubForm';
import EndSubForm from './subforms/EndSubForm';

var fnMutationAssistanceInAdd = null;
var dataMutationAssistanceInAdd = null;

var fnMutationAssistanceInUpdate = null;
var dataMutationAssistanceInUpdate = null;
let prevPos = 0;

function HiddenHook(){
    [fnMutationAssistanceInAdd, { dataMutationAssistanceInAdd }] = useMutation(QL_ASSISTANCE_IN_ADD);
    [fnMutationAssistanceInUpdate, { dataMutationAssistanceInUpdate }] = useMutation(QL_ASSISTANCE_IN_UPDATE);

    return (
        <React.Fragment></React.Fragment>
    )
}

function convertDB2FormData(data){

    let formData = [];

    formData.push({
        id: 'CurrentAssistanceSubForm',
        data: CurrentAssistanceSubForm.FnCreateFormData({
            recipientFirstName: data['assistanceIn']['recipientFirstName'],
            recipientLastName: data['assistanceIn']['recipientLastName'],
            assistanceFirstName: data['assistanceIn']['personProvidingAssistanceFirstName'],
            assistanceLastName: data['assistanceIn']['personProvidingAssistanceLastName'],
            relationship: data['assistanceIn']['relationship'],
            amountRecieved: data['assistanceIn']['amountReceived'],
            frequency: data['assistanceIn']['frequency'],
            estimatedStartDate: data['assistanceIn']['estimatedStartDate'] == null ? '' : data['assistanceIn']['estimatedStartDate'],
            assistanceEnds: data['assistanceIn']['assistanceEnds']
        }),
        visible: true
    })

    formData.push({
        id: 'FutureAssistanceSubForm',
        data: FutureAssistanceSubForm.FnCreateFormData({
            inheritanceAmount: data['assistanceIn']['inheritanceAmount'],
            yearExpectedIncome: data['assistanceIn']['yearOfExpectedIncome'],
            firstName: data['assistanceIn']['personInheritingFromFirstName'],
            lastName: data['assistanceIn']['personInheritingFromLastName'],
            relationship: data['assistanceIn']['relationship']
        }),
        visible: true
    })

    return formData;
}

function LoadDBDataHook(props){
    if(props.dbID != null && props.dbID != ''){
        const {data, loading, error} = useQuery(QL_ASSISTANCE_IN_GET, { variables: { id: props.dbID} });
        if(data){
            console.log('call..', data);
            props.cbLoadDBData(convertDB2FormData(data));
        }
    }
    
    return (
        <React.Fragment></React.Fragment>
    )
}

class AssistanceReceivedNew extends Component {

    constructor(props) {
        super(props);

        let dbID = null;
        let dbLoaded = true;

        const { assistanceInID } = this.props.match.params;        

        if( assistanceInID ){
            dbID = assistanceInID;
            dbLoaded = false;
        }      

        this.state = {
            dataID: dbID,
            curSubFormID: 'QuestionCurrentFutureSubForm',
            curSubForm: QuestionCurrentFutureSubForm,
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
                    id: 'QuestionCurrentFutureSubForm',
                    icon: 'icon_ex.png',
                    title: 'Assistance Current or Future'
                },
                {
                    id: 'StepDetails',
                    icon: 'icon_ex.png',
                    title: 'Details'
                }                
            ],
            dbLoaded: dbLoaded,
            dbID: dbID
        }

        this.goSubForm = this.goSubForm.bind(this);
        this.updateSubForm = this.updateSubForm.bind(this);
        this.getSubFormData = this.getSubFormData.bind(this);
        this.getSubFormField = this.getSubFormField.bind(this);

        this.createQLVariable = this.createQLVariable.bind(this);
        this.getSubFormFieldValue = this.getSubFormFieldValue.bind(this);

        this.toggleRightSide = this.toggleRightSide.bind(this);

        this.loadDBData = this.loadDBData.bind(this);
    }

    componentDidMount() {
        this.goSubForm("QuestionCurrentFutureSubForm");
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
                        "recipientLastName": this.getSubFormFieldValue(subFormID, 'recipientLastName'),
                        "personProvidingAssistanceFirstName": this.getSubFormFieldValue(subFormID, 'assistanceFirstName'),
                        "personProvidingAssistanceLastName": this.getSubFormFieldValue(subFormID, 'assistanceLastName'),
                        "relationship": this.getSubFormFieldValue(subFormID, 'relationship'),
                        "amountReceived": this.getSubFormFieldValue(subFormID, 'amountRecieved') != '' ? parseInt(this.getSubFormFieldValue(subFormID, 'amountRecieved')) : 0,
                        "frequency": this.getSubFormFieldValue(subFormID, 'frequency'),
                        "estimatedStartDate": this.getSubFormFieldValue(subFormID, 'estimatedStartDate'),
                        "assistanceEnds": this.getSubFormFieldValue(subFormID, 'assistanceEnds'),
                    }
                };
                break;
            case 'FutureAssistanceSubForm':
                varQL = {
                    "assistanceIn" : {
                        "inheritanceAmount": this.getSubFormFieldValue(subFormID, 'inheritanceAmount') != '' ? parseFloat(this.getSubFormFieldValue(subFormID, 'inheritanceAmount')) : 0,
                        "yearOfExpectedIncome": this.getSubFormFieldValue(subFormID, 'yearExpectedIncome'),
                        "personInheritingFromFirstName": this.getSubFormFieldValue(subFormID, 'firstName'),
                        "personInheritingFromLastName": this.getSubFormFieldValue(subFormID, 'lastName'),
                        "relationship": this.getSubFormFieldValue(subFormID, 'relationship'),
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

        
        let varQL = this.createQLVariable(subFormID, subFormData);

        console.log('varQL:', varQL, ', dataID:', this.state.dataID);
        
        var instance = this;
        if(varQL != null){
            if(this.state.dataID == null){
                fnMutationAssistanceInAdd({ variables: { data: varQL } }).then((response) => {
                    instance.setState({
                        dataID: response['data']['createAssistanceIn']['id']
                    })
                });
            }
            else{
                fnMutationAssistanceInUpdate({ variables: { id: this.state.dataID, data: varQL } })
            }
        }

        this.setState({
            formData: formData
        });
    }

    getSubFormData(subFormID, fromState = true, pformData){
        let formData;
        if(fromState){
            formData = this.state.formData;
        }
        else{
            formData = pformData;
        }

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

        let nextSubForm = QuestionCurrentFutureSubForm;
        let subFormData = this.getSubFormData(subFormID);

        switch(subFormID){
            case 'QuestionCurrentFutureSubForm': 
                nextSubForm = QuestionCurrentFutureSubForm;
                break;
            case 'CurrentAssistanceSubForm': 
                nextSubForm = CurrentAssistanceSubForm;
                break;
            case 'FutureAssistanceSubForm': 
                nextSubForm = FutureAssistanceSubForm;
                break;
            case 'EndSubForm':
                nextSubForm = EndSubForm;
                break;
            case 'StepDetails':
                if(this.getSubFormFieldValue('QuestionCurrentFutureSubForm', 'isCurrent') == 'Current'){
                    nextSubForm = CurrentAssistanceSubForm;
                }
                else {
                    nextSubForm = FutureAssistanceSubForm;
                }
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

    loadDBData(formData){
        console.log('formData:', formData);

        var instance = this;
        setTimeout(function(){
            instance.setState({ 
                formVisible: true,
                dbLoaded: true,
                formData: formData,
                subFormData: instance.getSubFormData(instance.state.curSubFormID, false, formData)
            });
        }, 100)        

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
                                            elementPos = prevPos+1;
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
                    {
                        !this.state.dbLoaded && 
                        <LoadDBDataHook 
                            dbLoaded={this.state.dbLoaded}
                            dbID={this.state.dbID}
                            cbLoadDBData={this.loadDBData}
                        />
                    }
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
                        {
                            !this.state.dbLoaded && <div>Loading...</div>
                        }
                        {
                            this.state.dbLoaded && 
                            <div className="form-page-container">
                                <div className="form-page--left-side">
                                    <FormPagePose className="info-form-block" pose={ this.state.formVisible ? 'visible' : 'hidden'}>
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
                        }
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

export default connect()(AssistanceReceivedNew);