import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import ImageIcon from 'assets/images/asset.png';
import AssetPlanet from 'assets/images/asset-planet-logo.jpg';

import { useMutation, useQuery } from '@apollo/react-hooks';
import {
    QL_SOCIAL_SECURITY_ADD,
    QL_SOCIAL_SECURITY_UPDATE,
    QL_SOCIAL_SECURITY_GET
} from '../../../constants/queries';

import { FormPagePose } from '../../../components/Animations';

import ClientInformationSubForm from './subforms/ClientInformationSubForm';
import ItemsRelatedSubForm from './subforms/ItemsRelatedSubForm';
import QuestionEligibleSubForm from './subforms/QuestionEligibleSubForm';
import RetirementEarningsCalculatorSubForm from './subforms/RetirementEarningsCalculatorSubForm';
import SpouseRetirementInformationSubForm from './subforms/SpouseRetirementInformationSubForm';
import SpouseRetirementCalculatorSubForm from './subforms/SpouseRetirementCalculatorSubForm';
import EndSubForm from './subforms/EndSubForm';


var fnMutationSocialSecurityAdd = null;
var dataMutationSocialSecurityAdd = null;

var fnMutationSocialSecurityUpdate = null;
var dataMutationSocialSecurityUpdate = null;

function HiddenHook(){
    [fnMutationSocialSecurityAdd, { dataMutationSocialSecurityAdd }] = useMutation(QL_SOCIAL_SECURITY_ADD);
    [fnMutationSocialSecurityUpdate, { dataMutationSocialSecurityUpdate }] = useMutation(QL_SOCIAL_SECURITY_UPDATE);

    return (
        <React.Fragment></React.Fragment>
    )
}

function convertDB2FormData(data){

    let formData = [];

    formData.push({
        id: 'ClientInformationSubForm',
        data: ClientInformationSubForm.FnCreateFormData({
            clientBirthdate: data['socialSecurity']['clientBirthdate'],
            yearDeath: data['socialSecurity']['clientEstimatedYearOfDeath'],
            yearRetirement: data['socialSecurity']['clientEstimatedYearOfRetirement']
        }),
        visible: true
    })

    formData.push({
        id: 'ItemsRelatedSubForm',
        data: ItemsRelatedSubForm.FnCreateFormData({
            clientMonthlyBenefit: data['socialSecurity']['itemsRelatedToMoney']['clientMonthlyBenefitAtFullRetirementAge'],
            costLivingAdjustment: data['socialSecurity']['itemsRelatedToMoney']['costOfLivingAdjustment'],
            timeMoneyInterestRate: data['socialSecurity']['itemsRelatedToMoney']['timeValueOfMoneyInterestRate']
        }),
        visible: true
    })

    formData.push({
        id: 'QuestionEligibleSubForm',
        data: QuestionEligibleSubForm.FnCreateFormData({
            value: '',
        }),
        visible: true
    })

    formData.push({
        id: 'RetirementEarningsCalculatorSubForm',
        data: RetirementEarningsCalculatorSubForm.FnCreateFormData({
            recieveDate: data['socialSecurity']['retirementEarningsCalculator']['dateToBeginReceivingBenefits'] == null ? '' : data['socialSecurity']['retirementEarningsCalculator']['dateToBeginReceivingBenefits'],
            estimatedEarnings: data['socialSecurity']['retirementEarningsCalculator']['yourEstimatedEarnings']
        }),
        visible: true
    })
    
    formData.push({
        id: 'SpouseRetirementInformationSubForm',
        data: SpouseRetirementInformationSubForm.FnCreateFormData({
            spouseEstimatedYearRetirement: data['socialSecurity']['spouseSection']['spouseEstimatedYearOfRetirement'],
            spouseMonthlyBenefit: data['socialSecurity']['spouseSection']['spouseMonthlyBenefitAtFullRetirementAge'],
            spouseTimeValue: data['socialSecurity']['spouseSection']['spouseTimeValueOfMoneyInterestRate'],
            spouseCost: data['socialSecurity']['spouseSection']['spouseCostOfLivingAdjustment'],
        }),
        visible: true
    })

    formData.push({
        id: 'SpouseRetirementCalculatorSubForm',
        data: SpouseRetirementCalculatorSubForm.FnCreateFormData({
            dateReceivingBenefits: data['socialSecurity']['spouseRetirementEarningsCalculator']['dateToBeginReceivingBenefits'] == null ? '' : data['socialSecurity']['spouseRetirementEarningsCalculator']['dateToBeginReceivingBenefits'],
            estimatedEarnings: data['socialSecurity']['spouseRetirementEarningsCalculator']['yourEstimatedEarnings'],
            monthlyDecreaseBenefit1: data['socialSecurity']['spouseRetirementEarningsCalculator']['monthlyDecreaseInBenefit'],
            monthlyDecreaseBenefit2: data['socialSecurity']['spouseRetirementEarningsCalculator']['monthlyDecreaseInBenefit'],
        }),
        visible: true
    })

    return formData;
}


function LoadDBDataHook(props){
    if(props.dbID != null && props.dbID != ''){
        const {data, loading, error} = useQuery(QL_SOCIAL_SECURITY_GET, { variables: { id: props.dbID} });
        if(data){
            console.log('call..', data);
            props.cbLoadDBData(convertDB2FormData(data));
        }
    }
    
    return (
        <React.Fragment></React.Fragment>
    )
}

class SocialSecurityNew extends Component {

    constructor(props) {
        super(props);

        let dbID = null;
        let dbLoaded = true;

        const clientID = "1";

        if( clientID ){
            dbID = clientID;
            dbLoaded = false;
        }      

        this.state = {
            dataID: dbID,
            curSubFormID: 'ClientInformationSubForm',
            curSubForm: ClientInformationSubForm,
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
                    id: 'ClientInformationSubForm',
                    icon: 'icon_ex.png',
                    title: 'Client Information'
                },
                {
                    id: 'ItemsRelatedSubForm',
                    icon: 'icon_ex.png',
                    title: 'Items Related to Money'
                },
                {
                    id: 'QuestionEligibleSubForm',
                    icon: 'icon_ex.png',
                    title: 'Eligibility'
                },
                {
                    id: 'StepEarningsCalculator',
                    icon: 'icon_ex.png',
                    title: 'Earnings Calculator'
                },
                {
                    id: 'StepSpouseInformation',
                    icon: 'icon_ex.png',
                    title: 'Spouse Information'
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
        this.goSubForm("ClientInformationSubForm");
        // this.goSubForm("SpouseRetirementCalculatorSubForm");
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
            case 'ClientInformationSubForm': 
                varQL = {
                    "socialSecurity" : {
                        "clientBirthdate": this.getSubFormFieldValue(subFormID, 'clientBirthdate'),
                        "clientEstimatedYearOfDeath": this.getSubFormFieldValue(subFormID, 'yearDeath'),
                        "clientEstimatedYearOfRetirement": this.getSubFormFieldValue(subFormID, 'yearRetirement'),
                    }
                };
                break;
            case 'ItemsRelatedSubForm': 
                varQL = {
                    "itemsRelatedToMoney" : {
                        "clientMonthlyBenefitAtFullRetirementAge": parseInt(this.getSubFormFieldValue(subFormID, 'clientMonthlyBenefit')),
                        "costOfLivingAdjustment": parseInt(this.getSubFormFieldValue(subFormID, 'costLivingAdjustment')),
                        "timeValueOfMoneyInterestRate": parseInt(this.getSubFormFieldValue(subFormID, 'timeMoneyInterestRate'))
                    }
                };
                break;
            case 'QuestionEligibleSubForm':
                break;
            case 'RetirementEarningsCalculatorSubForm':
                varQL = {
                    "retirementEarningsCalculator" : {
                        "dateToBeginReceivingBenefits": this.getSubFormFieldValue(subFormID, 'recieveDate'),
                        "yourEstimatedEarnings": parseInt(this.getSubFormFieldValue(subFormID, 'estimatedEarnings')),
                    }
                };
                break;
            case 'SpouseRetirementInformationSubForm':
                varQL = {
                    "spouseSection" : {
                        "spouseEstimatedYearOfRetirement": this.getSubFormFieldValue(subFormID, 'spouseEstimatedYearRetirement'),
                        "spouseMonthlyBenefitAtFullRetirementAge": parseInt(this.getSubFormFieldValue(subFormID, 'spouseMonthlyBenefit')),
                        "spouseCostOfLivingAdjustment": parseInt(this.getSubFormFieldValue(subFormID, 'spouseCost')),
                        "spouseTimeValueOfMoneyInterestRate": parseInt(this.getSubFormFieldValue(subFormID, 'spouseTimeValue'))
                    }
                };
                break;
            case 'SpouseRetirementCalculatorSubForm':
                varQL = {
                    "spouseRetirementEarningsCalculator" : {
                        "dateToBeginReceivingBenefits": this.getSubFormFieldValue(subFormID, 'dateReceivingBenefits'),
                        "yourEstimatedEarnings": parseInt(this.getSubFormFieldValue(subFormID, 'estimatedEarnings')),
                        "monthlyDecreaseInBenefit": parseInt(this.getSubFormFieldValue(subFormID, 'monthlyDecreaseBenefit1'))
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
                fnMutationSocialSecurityAdd({ variables: { data: varQL } }).then((response) => {
                    instance.setState({
                        dataID: response['data']['createSocialSecurity']['id']
                    })
                });
                
            }
            else{
                fnMutationSocialSecurityUpdate({ variables: { id: this.state.dataID, data: varQL } })
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

        let nextSubForm = ClientInformationSubForm;
        let subFormData = this.getSubFormData(subFormID);

        switch(subFormID){
            case 'ClientInformationSubForm': 
                nextSubForm = ClientInformationSubForm;
                break;
            case 'ItemsRelatedSubForm': 
                nextSubForm = ItemsRelatedSubForm;
                break;
            case 'QuestionEligibleSubForm': 
                nextSubForm = QuestionEligibleSubForm;
                break;
            case 'RetirementEarningsCalculatorSubForm': 
                nextSubForm = RetirementEarningsCalculatorSubForm;                
                break;
            case 'SpouseRetirementInformationSubForm': 
                nextSubForm = SpouseRetirementInformationSubForm;
                break;
            case 'SpouseRetirementCalculatorSubForm': 
                nextSubForm = SpouseRetirementCalculatorSubForm;
                break;
            case 'EndSubForm':
                nextSubForm = EndSubForm;
                break;
            case 'StepEarningsCalculator': 
                if(this.getSubFormFieldValue('QuestionEligibleSubForm', 'isEligible') == 'Yes')
                {
                    nextSubForm = RetirementEarningsCalculatorSubForm;
                }
                else{
                    nextSubForm = EndSubForm
                }
                break;
            case 'StepSpouseInformation': 
                if(this.getSubFormFieldValue('QuestionEligibleSubForm', 'isEligible') == 'Yes'){
                    nextSubForm = SpouseRetirementInformationSubForm;
                }
                else {
                    nextSubForm = EndSubForm
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
                href: '/social_security',
                title: 'Social Security'
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
                                        return (
                                            <div className="process-step" key={index}>
                                                <button type="button" className="btn nav-items btn-circle" data-toggle="tab" onClick={() => this.goSubForm(formStep.id)}>
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

export default connect()(SocialSecurityNew);