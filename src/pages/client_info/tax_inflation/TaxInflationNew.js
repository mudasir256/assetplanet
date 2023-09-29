import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import ImageIcon from 'assets/images/asset.png';
import AssetPlanet from 'assets/images/asset-planet-logo.jpg';

import { useMutation, useQuery } from '@apollo/react-hooks';
import {
    QL_TAX_INFLATION_ADD,
    QL_TAX_INFLATION_UPDATE,
    QL_TAX_INFLATION_GET,
} from '../../../constants/queries';

import { FormPagePose } from '../../../components/Animations';
import TaxInformationSubForm from './subforms/TaxInformationSubForm';
import NewTaxCreditSubForm from './subforms/NewTaxCreditSubForm';
import CapitalGainsSubForm from './subforms/CapitalGainsSubForm';
import QuestionCarryForwardLossSubForm from './subforms/QuestionCarryForwardLossSubForm';
import CarryForwardInformationSubForm from './subforms/CarryForwardInformationSubForm';
import InflationsSubForm from './subforms/InflationsSubForm';
import EndSubForm from './subforms/EndSubForm';

var fnMutationTaxInflationAdd = null;
var dataMutationTaxInflationAdd = null;

var fnMutationTaxInflationUpdate = null;
var dataMutationTaxInflationUpdate = null;
let prevPos = 0;

function HiddenHook(){
    [fnMutationTaxInflationAdd, { dataMutationTaxInflationAdd }] = useMutation(QL_TAX_INFLATION_ADD);
    [fnMutationTaxInflationUpdate, { dataMutationTaxInflationUpdate }] = useMutation(QL_TAX_INFLATION_UPDATE);

    return (
        <React.Fragment></React.Fragment>
    )
}

function convertDB2FormData(data){

    console.log('readData:', data);
    let formData = [];

    formData.push({
        id: 'TaxInformationSubForm',
        data: TaxInformationSubForm.FnCreateFormData({
            stateTaxation: data['taxAndInflation']['stateTaxation'],
            taxFilingElection: data['taxAndInflation']['taxFilingElection'],
            deduction: data['taxAndInflation']['deductions'],
            stateTax: data['taxAndInflation']['stateTaxEffectiveRate'],
            federalTax: data['taxAndInflation']['federalTaxRate'],
            totalTax: data['taxAndInflation']['totalTaxRate'],
            federalCollectibleTax: data['taxAndInflation']['federalCollectibleTaxRate'],
            totalAdjustedIncome: data['taxAndInflation']['totalAdjustedGrossIncome'],
        }),
        visible: true
    })

    formData.push({
        id: 'NewTaxCreditSubForm',
        data: {
            title: 'New Tax Credit',
            data: data['taxAndInflation']['taxCredits']
        },
        visible: false
    })

    formData.push({
        id: 'CapitalGainsSubForm',
        data: CapitalGainsSubForm.FnCreateFormData({
            amount: data['taxAndInflation']['amountWithdrawnSubjectToCapGains'],
            rateFederal: data['taxAndInflation']['capGainsRateFederal'],
            rateState: data['taxAndInflation']['capGainsRateState'],
        }),
        visible: true
    })

    formData.push({
        id: 'QuestionCarryForwardLossSubForm',
        data: QuestionCarryForwardLossSubForm.FnCreateFormData({
            value: data['taxAndInflation']['doYouHaveCarryForwardLoss'] ? 'Yes' : 'No',
        }),
        visible: true
    })

    formData.push({
        id: 'CarryForwardInformationSubForm',
        data: CarryForwardInformationSubForm.FnCreateFormData({
            amount: data['taxAndInflation']['amountOfCarryForward'],
            updatedDate: data['taxAndInflation']['carryForwardDate'] == null ? '' : data['taxAndInflation']['carryForwardDate'],
            notes: data['taxAndInflation']['carryForwardLossNotes']
        }),
        visible: true
    })

    formData.push({
        id: 'InflationsSubForm',
        data: InflationsSubForm.FnCreateFormData({
            generalInflation: data['taxAndInflation']['generalInflation'],
            generalRate: data['taxAndInflation']['generalInflationRate'],
            medicalInflation: data['taxAndInflation']['medicalInflation'],
            medicalRate: data['taxAndInflation']['medicalInflationRate'],
            educationInflation: data['taxAndInflation']['educationInflation'],
            educationRate: data['taxAndInflation']['educationInflationRate'],
            luxuryInflation: data['taxAndInflation']['luxuryInflation'],
            luxuryRate: data['taxAndInflation']['luxuryInflationRate'],
            housingInflation: data['taxAndInflation']['housingInflation'],
            housingRate: data['taxAndInflation']['housingInflationRate']
        }),
        visible: true
    })

    return formData;
}

function LoadDBDataHook(props){
    if(props.dbID != null && props.dbID != ''){
        const {data, loading, error} = useQuery(QL_TAX_INFLATION_GET, { variables: { id: props.dbID} });
        if(data){
            console.log('call..');
            props.cbLoadDBData(convertDB2FormData(data));
        }
    }
    
    return (
        <React.Fragment></React.Fragment>
    )
}

class TaxInflationNew extends Component {

    constructor(props) {
        super(props);

        let dbID = null;
        let dbLoaded = true;      

        const { taxInflationID } = this.props.match.params;        

        if( taxInflationID ){
            dbID = taxInflationID;
            dbLoaded = false;
        }

        this.state = {
            dataID: dbID,
            curSubFormID: 'TaxInformationSubForm',
            curSubForm: TaxInformationSubForm,
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
                    id: 'TaxInformationSubForm',
                    icon: 'icon_ex.png',
                    title: 'Tax Information'
                },
                {
                    id: 'NewTaxCreditSubForm',
                    icon: 'icon_ex.png',
                    title: 'Tax Credits'
                },
                {
                    id: 'CapitalGainsSubForm',
                    icon: 'icon_ex.png',
                    title: 'Capital Gains'
                },
                {
                    id: 'QuestionCarryForwardLossSubForm',
                    icon: 'icon_ex.png',
                    title: 'Carry Forward'
                },
                {
                    id: 'InflationsSubForm',
                    icon: 'icon_ex.png',
                    title: 'Inflation Rates'
                }
            ],
            dbLoaded: dbLoaded,
            dbID: dbID,
            isEndForm: false
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
        this.goSubForm("TaxInformationSubForm");
        // this.goSubForm("NewTaxCreditSubForm");
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
            case 'TaxInformationSubForm': 
                varQL = {
                    "taxAndInflation" : {
                        "stateTaxation": this.getSubFormFieldValue(subFormID, 'stateTaxation'),
                        "taxFilingElection": this.getSubFormFieldValue(subFormID, 'taxFilingElection'),
                        "deductions": this.getSubFormFieldValue(subFormID, 'deduction'),
                        "stateTaxEffectiveRate": this.getSubFormFieldValue(subFormID, 'stateTax') != '' ? parseInt(this.getSubFormFieldValue(subFormID, 'stateTax')) : 0,
                        "federalTaxRate": this.getSubFormFieldValue(subFormID, 'federalTax') != '' ? parseInt(this.getSubFormFieldValue(subFormID, 'federalTax')) : 0,
                        "totalTaxRate": this.getSubFormFieldValue(subFormID, 'totalTax') != '' ? parseInt(this.getSubFormFieldValue(subFormID, 'totalTax')) : 0,
                        "federalCollectibleTaxRate": this.getSubFormFieldValue(subFormID, 'federalCollectibleTax') != '' ? parseInt(this.getSubFormFieldValue(subFormID, 'federalCollectibleTax')) : 0,
                        "totalAdjustedGrossIncome": this.getSubFormFieldValue(subFormID, 'totalAdjustedIncome') != '' ? parseInt(this.getSubFormFieldValue(subFormID, 'totalAdjustedIncome')) : 0
                    }
                };
                break;
            case 'NewTaxCreditSubForm': 
                varQL = {
                    "taxCredits" : subFormData
                };
                break;
            case 'CapitalGainsSubForm':
                varQL = {
                    "taxAndInflation" : {
                        "amountWithdrawnSubjectToCapGains": this.getSubFormFieldValue(subFormID, 'amount') != '' ? parseInt(this.getSubFormFieldValue(subFormID, 'amount')) : 0,
                        "capGainsRateFederal": this.getSubFormFieldValue(subFormID, 'rateFederal') != '' ? parseInt(this.getSubFormFieldValue(subFormID, 'rateFederal')) : 0,
                        "capGainsRateState": this.getSubFormFieldValue(subFormID, 'rateState') != '' ? parseInt(this.getSubFormFieldValue(subFormID, 'rateState')) : 0
                    }
                };
                break;
            case 'QuestionCarryForwardLossSubForm':
                varQL = {
                    "taxAndInflation" : {
                        "doYouHaveCarryForwardLoss": this.getSubFormFieldValue(subFormID, 'haveCarryForwardLoss') == 'Yes' ? true : false
                    }
                };
                break;
            case 'CarryForwardInformationSubForm':
                varQL = {
                    "taxAndInflation" : {
                        "amountOfCarryForward": this.getSubFormFieldValue(subFormID, 'amount') != '' ? parseInt(this.getSubFormFieldValue(subFormID, 'amount')) : 0,
                        "carryForwardDate": this.getSubFormFieldValue(subFormID, 'updatedDate'),
                        "carryForwardLossNotes": this.getSubFormFieldValue(subFormID, 'notes')
                    }
                };
                break;
            case 'InflationsSubForm':
                varQL = {
                    "taxAndInflation" : {
                        "generalInflation": this.getSubFormFieldValue(subFormID, 'generalInflation'),
                        "generalInflationRate": this.getSubFormFieldValue(subFormID, 'generalRate') != '' ? parseInt(this.getSubFormFieldValue(subFormID, 'generalRate')) : 0,
                        "medicalInflation": this.getSubFormFieldValue(subFormID, 'medicalInflation'),
                        "medicalInflationRate": this.getSubFormFieldValue(subFormID, 'medicalRate') != '' ? parseInt(this.getSubFormFieldValue(subFormID, 'medicalRate')) : 0,
                        "educationInflation": this.getSubFormFieldValue(subFormID, 'educationInflation'),
                        "educationInflationRate": this.getSubFormFieldValue(subFormID, 'educationRate') != '' ? parseInt(this.getSubFormFieldValue(subFormID, 'educationRate')) : 0,
                        "luxuryInflation": this.getSubFormFieldValue(subFormID, 'luxuryInflation'),
                        "luxuryInflationRate": this.getSubFormFieldValue(subFormID, 'luxuryRate') != '' ? parseInt(this.getSubFormFieldValue(subFormID, 'luxuryRate')) : 0,
                        "housingInflation": this.getSubFormFieldValue(subFormID, 'housingInflation'),
                        "housingInflationRate": this.getSubFormFieldValue(subFormID, 'housingRate') != '' ? parseInt(this.getSubFormFieldValue(subFormID, 'housingRate')) : 0
                    }
                };
                break;
                
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
                fnMutationTaxInflationAdd({ variables: { data: varQL } }).then((response) => {
                    instance.setState({
                        dataID: response['data']['createTaxAndInflation']['id']
                    })
                });
                
            }
            else{
                fnMutationTaxInflationUpdate({ variables: { id: this.state.dataID, data: varQL } })
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

        let nextSubForm = TaxInformationSubForm;
        let subFormData = this.getSubFormData(subFormID);

        switch(subFormID){
            case 'TaxInformationSubForm': 
                nextSubForm = TaxInformationSubForm;
                break;
            case 'NewTaxCreditSubForm': 
                nextSubForm = NewTaxCreditSubForm;
                break;
            case 'CapitalGainsSubForm':
                nextSubForm = CapitalGainsSubForm;
                break;
            case 'QuestionCarryForwardLossSubForm':
                nextSubForm = QuestionCarryForwardLossSubForm;
                break;
            case 'CarryForwardInformationSubForm':
                nextSubForm = CarryForwardInformationSubForm;
                break;
            case 'InflationsSubForm':
                nextSubForm = InflationsSubForm;
                break;
            case 'EndSubForm':
                nextSubForm = EndSubForm;
                this.setState({isEndForm: true})
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
                href: '/tax_inflation',
                title: 'Tax and Inflation'
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
                                        let classBtn = 'btn nav-items btn-circle'

                                        if (elementPos === -1) {
                                            elementPos = prevPos;
                                        } else {
                                            prevPos = elementPos;
                                        }

                                        classBtn = elementPos >= index ? 'btn nav-items btn-circle active' : 'btn nav-items btn-circle'
                                        if(this.state.isEndForm)
                                            classBtn ='btn nav-items btn-circle disabled'


                                        return (
                                            <div className="process-step" key={index}>
                                                <button type="button" className={ classBtn } data-toggle="tab" onClick={() => {
                                                    if(classBtn !=='btn nav-items btn-circle disabled')
                                                        this.goSubForm(formStep.id)}}>
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
                        {/* {
                            !this.state.dbLoaded && <div>Loading...</div>
                        } */}
                        {
                            // this.state.dbLoaded && 
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
                                        subFormData.fields && subFormData.fields.map((field, ffindex) => {
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

export default connect()(TaxInflationNew);