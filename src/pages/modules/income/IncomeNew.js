import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import ImageIcon from 'assets/images/asset.png';
import AssetPlanet from 'assets/images/asset-planet-logo.jpg';

import { useMutation, useQuery } from '@apollo/react-hooks';
import {
    QL_INCOME_ADD,
    QL_INCOME_UPDATE,
    QL_INCOME_GET
} from '../../../constants/queries';

import { FormPagePose } from '../../../components/Animations';

import IncomeTypeSubForm from './subforms/IncomeTypeSubForm';
import IncomeDetailsSubForm from './subforms/IncomeDetailsSubForm';
import AnnuityDetailsSubForm from './subforms/AnnuityDetailsSubForm';
import IncomeTaxationSubForm from './subforms/IncomeTaxationSubForm';
import IndependantIncomeSubForm from './subforms/IndependantIncomeSubForm';
import MilitaryBenefitsSubForm from './subforms/MilitaryBenefitsSubForm';
import OtherIncomeDetailsSubForm from './subforms/OtherIncomeDetailsSubForm';
import PensionDetailsSubForm from './subforms/PensionDetailsSubForm';
import QuestionIncomeTypeSubForm from './subforms/QuestionIncomeTypeSubForm';
import W2IncomeSubForm from './subforms/W2IncomeSubForm';
import EndSubForm from './subforms/EndSubForm';


var fnMutationIncomeAdd = null;
var dataMutationIncomeAdd = null;

var fnMutationIncomeUpdate = null;
var dataMutationIncomeUpdate = null;
let prevPos = 0;

function HiddenHook(){
    [fnMutationIncomeAdd, { dataMutationIncomeAdd }] = useMutation(QL_INCOME_ADD);
    [fnMutationIncomeUpdate, { dataMutationIncomeUpdate }] = useMutation(QL_INCOME_UPDATE);

    return (
        <React.Fragment></React.Fragment>
    )
}

function convertDB2FormData(data){

    let formData = [];

    formData.push({
        id: 'IncomeTypeSubForm',
        data: IncomeTypeSubForm.FnCreateFormData({
            value: data['income']['incomeType']
        }),
        visible: true
    })

    formData.push({
        id: 'AnnuityDetailsSubForm',
        data: AnnuityDetailsSubForm.FnCreateFormData({
            percentToSurvivor: data['income']['percentToSurvivor']
        }),
        visible: true
    })

    formData.push({
        id: 'IncomeDetailsSubForm',
        data: IncomeDetailsSubForm.FnCreateFormData({
            nicknameIncome: data['income']['nicknameIncome'],
            owner: data['income']['owner'],
            frequencyPayPeriod: data['income']['frequencyOfPayPeriods'],
            grossWages: data['income']['grossWages'],
            dateIncomeStarts: data['income']['dateIncomeStarts'],
            dateIncomeEnds: data['income']['dateIncomeEnds'],
            yearlyIncrease: data['income']['percentageYearlyIncrease'],
            incomeSourceFromAssets: data['income']['incomeSourceFromAsset'],
            notes: data['income']['notes']
        }),
        visible: true
    })

    formData.push({
        id: 'IncomeTaxationSubForm',
        data: IncomeTaxationSubForm.FnCreateFormData({
            federalTaxationType: data['income']['incomeTaxation']['federalTaxationType'],
            stateTaxationType: data['income']['incomeTaxation']['stateTaxationType'],
            adjustedGrossIncome: data['income']['incomeTaxation']['adjustedGrossIncome'] ? 'Yes' : 'No',
            passiveEarned: data['income']['incomeTaxation']['passiveOrEarned'],
            amountFederalTaxation: data['income']['incomeTaxation']['amountSubjectToFederalTaxation']
        }),
        visible: true
    })

    formData.push({
        id: 'IndependantIncomeSubForm',
        data: IndependantIncomeSubForm.FnCreateFormData({
            lessAdjustment: data['income']['independentContractor']['lessSelfEmploymentAdjustment'],
            taxableEarnings: data['income']['independentContractor']['taxableSelfEmploymentEarnings']
        }),
        visible: true
    })

    formData.push({
        id: 'MilitaryBenefitsSubForm',
        data: MilitaryBenefitsSubForm.FnCreateFormData({
            stateTax: data['income']['militaryBenefit']['amountSubjectToStateTax'],
            payeeSurvivorBenefits: data['income']['militaryBenefit']['payeeOfSurvivorBenefits'],
            percentToSurvivor: data['income']['militaryBenefit']['percentToSurvivor']
        }),
        visible: true
    })

    formData.push({
        id: 'OtherIncomeDetailsSubForm',
        data: OtherIncomeDetailsSubForm.FnCreateFormData({
            otherIncomeType: data['income']['otherIncomeType']
        }),
        visible: true
    })

    formData.push({
        id: 'PensionDetailsSubForm',
        data: PensionDetailsSubForm.FnCreateFormData({
            percentToSurvivor: data['income']['percentToSurvivor']
        }),
        visible: true
    })

    formData.push({
        id: 'QuestionIncomeTypeSubForm',
        data: QuestionIncomeTypeSubForm.FnCreateFormData({
            typeEmployementIncome: ''
        }),
        visible: true
    })

    formData.push({
        id: 'W2IncomeSubForm',
        data: W2IncomeSubForm.FnCreateFormData({
            federalTaxes: data['income']['employee']['federalTaxes'],
            stateTaxes: data['income']['employee']['stateTaxes'],
            employmentRetirmentContributions: data['income']['employee']['employeeRetirementContributions']
        }),
        visible: true
    })

    return formData;
}

function LoadDBDataHook(props){
    if(props.dbID != null && props.dbID != ''){
        const {data, loading, error} = useQuery(QL_INCOME_GET, { variables: { id: props.dbID} });
        if(data){
            console.log('call..');
            props.cbLoadDBData(convertDB2FormData(data));
        }
    }
    
    return (
        <React.Fragment></React.Fragment>
    )
}

class IncomeNew extends Component {

    constructor(props) {
        super(props);

        let dbID = null;
        let dbLoaded = true;      

        const { incomeID } = this.props.match.params;        

        if( incomeID ){
            dbID = incomeID;
            dbLoaded = false;
        }

        this.state = {
            dataID: dbID,
            curSubFormID: 'IncomeTypeSubForm',
            curSubForm: IncomeTypeSubForm,
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
            formSteps: [
                {
                    id: 'IncomeTypeSubForm',
                    icon: 'icon_ex.png',
                    title: 'Type of Income'
                },
                {
                    id: 'IncomeDetailsSubForm',
                    icon: 'icon_ex.png',
                    title: 'Income Details'
                },
                {
                    id: 'StepAdditionalDetails',
                    icon: 'icon_ex.png',
                    title: 'Additional Details'
                },
                {
                    id: 'IncomeTaxationSubForm',
                    icon: 'icon_ex.png',
                    title: 'Taxation'
                }
            ],
            dbLoaded: dbLoaded,
            dbID: dbID,
            isEndForm: false,
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
        this.goSubForm("IncomeTypeSubForm");
        // this.goSubForm("IncomeTaxationSubForm");
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
            case 'IncomeTypeSubForm': 
                varQL = {
                    "income" : {
                        "incomeType": this.getSubFormFieldValue(subFormID, 'incomeType')
                    }
                };
                break;
            case 'AnnuityDetailsSubForm': 
                varQL = {
                    "income" : {
                        "percentToSurvivor": parseInt(this.getSubFormFieldValue(subFormID, 'percentToSurvivor'))
                    }
                };
                break;
            case 'IncomeDetailsSubForm':
                varQL = {
                    "income" : {
                        "nicknameIncome": this.getSubFormFieldValue(subFormID, 'nicknameIncome'),
                        "owner": this.getSubFormFieldValue(subFormID, 'owner'),
                        "frequencyOfPayPeriods": this.getSubFormFieldValue(subFormID, 'frequencyPayPeriod'),
                        "grossWages": parseInt(this.getSubFormFieldValue(subFormID, 'grossWages')),
                        "dateIncomeStarts": this.getSubFormFieldValue(subFormID, 'dateIncomeStarts'),
                        "dateIncomeEnds": this.getSubFormFieldValue(subFormID, 'dateIncomeEnds'),
                        "percentageYearlyIncrease": this.getSubFormFieldValue(subFormID, 'yearlyIncrease') != '' ? parseInt(this.getSubFormFieldValue(subFormID, 'yearlyIncrease')) : 0,
                        "incomeSourceFromAsset": this.getSubFormFieldValue(subFormID, 'incomeSourceFromAssets'),
                        "notes": this.getSubFormFieldValue(subFormID, 'notes'),
                    }
                };
                break;
            case 'IncomeTaxationSubForm':
                varQL = {
                    "incomeTaxation" : {
                        "federalTaxationType": this.getSubFormFieldValue(subFormID, 'federalTaxationType'),
                        "stateTaxationType": this.getSubFormFieldValue(subFormID, 'stateTaxationType'),
                        "adjustedGrossIncome": this.getSubFormFieldValue(subFormID, 'adjustedGrossIncome') == 'Yes' ? true : false,
                        "passiveOrEarned": this.getSubFormFieldValue(subFormID, 'passiveEarned'),
                        "amountSubjectToFederalTaxation": parseInt(this.getSubFormFieldValue(subFormID, 'amountFederalTaxation'))
                    }
                };
                break;
            case 'IndependantIncomeSubForm':
                varQL = {
                    "independentContractor" : {
                        "lessSelfEmploymentAdjustment": parseInt(this.getSubFormFieldValue(subFormID, 'lessAdjustment')),
                        // "annualSocialSecurityTax": parseInt(this.getSubFormFieldValue(subFormID, 'stateTaxationType')),
                        "taxableSelfEmploymentEarnings": parseInt(this.getSubFormFieldValue(subFormID, 'taxableEarnings')),
                        // "annualMedicareTax": parseInt(this.getSubFormFieldValue(subFormID, 'passiveEarned')),
                        // "annualAdditionalMedicareTax": parseInt(this.getSubFormFieldValue(subFormID, 'amountFederalTaxation')),
                        // "totalSelfEmploymentTax": parseInt(this.getSubFormFieldValue(subFormID, 'amountFederalTaxation')),
                        // "totalDeductionPortion": parseInt(this.getSubFormFieldValue(subFormID, 'amountFederalTaxation'))
                    }
                };
                break;
            case 'MilitaryBenefitsSubForm':
                varQL = {
                    "militaryBenefit" : {
                        "amountSubjectToStateTax": this.getSubFormFieldValue(subFormID, 'stateTax') != '' ? parseFloat(this.getSubFormFieldValue(subFormID, 'stateTax')) : 0,
                        "payeeOfSurvivorBenefits": this.getSubFormFieldValue(subFormID, 'payeeSurvivorBenefits') != '' ? parseFloat(this.getSubFormFieldValue(subFormID, 'payeeSurvivorBenefits')) : 0,
                        "percentToSurvivor": this.getSubFormFieldValue(subFormID, 'percentToSurvivor') != '' ? parseFloat(this.getSubFormFieldValue(subFormID, 'percentToSurvivor')) : 0,
                    },
                    "income" : {
                        "percentToSurvivor": this.getSubFormFieldValue(subFormID, 'percentToSurvivor') != '' ? parseInt(this.getSubFormFieldValue(subFormID, 'percentToSurvivor')) : 0
                    }
                };
                break;
            case 'OtherIncomeDetailsSubForm':
                varQL = {
                    "income" : {
                        "otherIncomeType": this.getSubFormFieldValue(subFormID, 'otherIncomeType')
                    }
                };
                break;
            case 'PensionDetailsSubForm':
                varQL = {
                    "income" : {
                        "percentToSurvivor": this.getSubFormFieldValue(subFormID, 'percentToSurvivor')
                    }
                };
                break;
            case 'QuestionIncomeTypeSubForm':
                varQL = {
                    "earnedIncomeInformation" : {
                        "typeOfEmploymentIncome": this.getSubFormFieldValue(subFormID, 'typeEmployementIncome')
                    }
                };
                break;
            case 'W2IncomeSubForm':
                varQL = {
                    "employee" : {
                        "federalTaxes": parseInt(this.getSubFormFieldValue(subFormID, 'federalTaxes')),
                        "stateTaxes": parseInt(this.getSubFormFieldValue(subFormID, 'stateTaxes')),
                        "employeeRetirementContributions": parseInt(this.getSubFormFieldValue(subFormID, 'employmentRetirmentContributions')),
                        // "totalAnnualFederalTaxes": parseInt(this.getSubFormFieldValue(subFormID, 'typeEmployementIncome')),
                        // "totalAnnualStateTaxes": parseInt(this.getSubFormFieldValue(subFormID, 'typeEmployementIncome')),
                        // "totalEmployeeRetirementContributions": parseInt(this.getSubFormFieldValue(subFormID, 'typeEmployementIncome')),
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

        // let varQL = this.createQLVariable(subFormID, subFormData);

        // console.log('varQL:', varQL, ', dataID:', this.state.dataID);
        
        var instance = this;
        // if(varQL != null){
        //     if(this.state.dataID == null){
        //         fnMutationIncomeAdd({ variables: { data: varQL } }).then((response) => {
        //             instance.setState({
        //                 dataID: response['data']['createIncome']['id']
        //             })
        //         });
                
        //     }
        //     else{
        //         fnMutationIncomeUpdate({ variables: { id: this.state.dataID, data: varQL } })
        //     }
        // }

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

        let nextSubForm = IncomeTypeSubForm;
        let subFormData = this.getSubFormData(subFormID);

        switch(subFormID){
            case 'IncomeTypeSubForm':
                nextSubForm = IncomeTypeSubForm;
                this.setState({isEndForm: false, formData: []})
                break;
            case 'AnnuityDetailsSubForm': 
                nextSubForm = AnnuityDetailsSubForm;
                break;
            case 'IncomeDetailsSubForm': 
                nextSubForm = IncomeDetailsSubForm;
                break;
            case 'IncomeTaxationSubForm': 
                nextSubForm = IncomeTaxationSubForm;
                break;
            case 'IndependantIncomeSubForm': 
                nextSubForm = IndependantIncomeSubForm;
                break;
            case 'MilitaryBenefitsSubForm': 
                nextSubForm = MilitaryBenefitsSubForm;
                break;
            case 'OtherIncomeDetailsSubForm': 
                nextSubForm = OtherIncomeDetailsSubForm;
                break;
            case 'PensionDetailsSubForm': 
                nextSubForm = PensionDetailsSubForm;
                break;
            case 'QuestionIncomeTypeSubForm': 
                nextSubForm = QuestionIncomeTypeSubForm;
                break;
            case 'W2IncomeSubForm': 
                nextSubForm = W2IncomeSubForm;
                break;
            case 'EndSubForm':
                nextSubForm = EndSubForm;
                this.setState({isEndForm: true})
                break;
            case 'StepAdditionalDetails':
                switch(this.getSubFormFieldValue('IncomeTypeSubForm', 'incomeType')){
                    case "Military Benefits":
                        nextSubForm = MilitaryBenefitsSubForm;    
                        break;
                    case "Pension":
                        nextSubForm = PensionDetailsSubForm;
                        break;
                    case "Annuity":
                        nextSubForm = AnnuityDetailsSubForm;    
                        break;
                    case "Other":
                        nextSubForm = OtherIncomeDetailsSubForm;    
                        break;
                    case "Bonus from Work":
                    case "Earned Income From Work":
                    case "Sales Commision from Work":
                        nextSubForm = QuestionIncomeTypeSubForm;    
                        break;
                    default:
                        nextSubForm = IncomeTaxationSubForm;    
                        break;
        
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
                href: '/income',
                title: 'Income'
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
                                        let classBtn = 'btn nav-items btn-circle'
                                        let elementPos = this.state.formSteps.map(function(x) {return x.id; }).indexOf(this.state.curSubFormID);

                                        if (elementPos === -1) {
                                            elementPos = prevPos+1;
                                        } else {
                                            prevPos = elementPos;
                                        }
                                        classBtn = elementPos >= index ? 'btn nav-items btn-circle active' : 'btn nav-items btn-circle'

                                        if((this.state.isEndForm && index > 0) || (elementPos === 0 && index > 0)) 
                                            classBtn = 'btn nav-items btn-circle disabled'
                                    
                                        return (
                                            <div className="process-step" key={index}>
                                                <button type="button" className={ classBtn } data-toggle="tab" onClick={() => {
                                                    if(classBtn !== 'btn nav-items btn-circle disabled')
                                                    this.goSubForm(formStep.id)
                                                } }>
                                                    {/* <img className="img-icon" src={ImageIcon} /> */}
                                                    <div style={{ fontSize: 30, color: '#006400' }}>
                                                        {index + 1}
                                                    </div>
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
                                            <Link key={index} to={navlink.href} className="page-nav-link">
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

export default connect()(IncomeNew);