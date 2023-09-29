import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import ImageIcon from 'assets/images/asset.png';
import AssetPlanet from 'assets/images/asset-planet-logo.jpg';

import { useMutation, useQuery } from '@apollo/react-hooks';
import {
    QL_ASSISTANCE_OUT_ADD,
    QL_ASSISTANCE_OUT_UPDATE,
    QL_ASSISTANCE_OUT_GET
} from '../../../../constants/queries';

import { FormPagePose } from '../../../../components/Animations';

import AssistanceOutSubForm from './subforms/AssistanceOutSubForm';
import EndSubForm from './subforms/EndSubForm';

var fnMutationAssistanceOutAdd = null;
var dataMutationAssistanceOutAdd = null;

var fnMutationAssistanceOutUpdate = null;
var dataMutationAssistanceOutUpdate = null;
let prevPos = 0;

function HiddenHook(){
    [fnMutationAssistanceOutAdd, { dataMutationAssistanceOutAdd }] = useMutation(QL_ASSISTANCE_OUT_ADD);
    [fnMutationAssistanceOutUpdate, { dataMutationAssistanceOutUpdate }] = useMutation(QL_ASSISTANCE_OUT_UPDATE);

    return (
        <React.Fragment></React.Fragment>
    )
}

function convertDB2FormData(data){

    let formData = [];

    formData.push({
        id: 'AssistanceOutSubForm',
        data: AssistanceOutSubForm.FnCreateFormData({
            firstName: data['assistanceOut']['recipientFirstName'],
            lastName: data['assistanceOut']['recipientLastName'],
            person: data['assistanceOut']['personProvidingAssistance'],
            relationship: data['assistanceOut']['relationship'],
            estimatedStartDate: data['assistanceOut']['estimatedStartDate'] == null ? '' : data['assistanceOut']['estimatedStartDate'],
            assistanceEnds: data['assistanceOut']['assistanceEnds'],
            frequency: data['assistanceOut']['frequency'],
            annualGiftingAmount: data['assistanceOut']['annualGiftingAmount']
        }),
        visible: true
    })

    return formData;
}

function LoadDBDataHook(props){
    if(props.dbID != null && props.dbID != ''){
        const {data, loading, error} = useQuery(QL_ASSISTANCE_OUT_GET, { variables: { id: props.dbID} });
        if(data){
            console.log('call..', data);
            props.cbLoadDBData(convertDB2FormData(data));
        }
    }
    
    return (
        <React.Fragment></React.Fragment>
    )
}

class AssistanceOutNew extends Component {

    constructor(props) {
        super(props);

        let dbID = null;
        let dbLoaded = true;

        const { assistanceOutID } = this.props.match.params;        

        if( assistanceOutID ){
            dbID = assistanceOutID;
            dbLoaded = false;
        }      

        this.state = {
            dataID: dbID,
            curSubFormID: 'AssistanceOutSubForm',
            curSubForm: AssistanceOutSubForm,
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
                    id: 'AssistanceOutSubForm',
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
        this.goSubForm("AssistanceOutSubForm");
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
            case 'AssistanceOutSubForm': 
                varQL = {
                    "assistanceOut" : {
                        "recipientFirstName": this.getSubFormFieldValue(subFormID, 'firstName'),
                        "recipientLastName": this.getSubFormFieldValue(subFormID, 'lastName'),
                        "personProvidingAssistance": this.getSubFormFieldValue(subFormID, 'person'),
                        "relationship": this.getSubFormFieldValue(subFormID, 'relationship'),
                        "estimatedStartDate": this.getSubFormFieldValue(subFormID, 'estimatedStartDate'),
                        "assistanceEnds": this.getSubFormFieldValue(subFormID, 'assistanceEnds'),
                        "frequency": this.getSubFormFieldValue(subFormID, 'frequency'),
                        "annualGiftingAmount": this.getSubFormFieldValue(subFormID, 'annualGiftingAmount') != '' ? parseInt(this.getSubFormFieldValue(subFormID, 'annualGiftingAmount')) : 0,
                        // "budgetItem": this.getSubFormFieldValue(subFormID, 'budgetItem')
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
                data: subFormData
            })
        }

        let varQL = this.createQLVariable(subFormID, subFormData);

        console.log('varQL:', varQL, ', dataID:', this.state.dataID);
        
        var instance = this;
        if(varQL != null){
            if(this.state.dataID == null){
                fnMutationAssistanceOutAdd({ variables: { data: varQL } }).then((response) => {
                    instance.setState({
                        dataID: response['data']['createAssistanceOut']['id']
                    })
                });
            }
            else{
                fnMutationAssistanceOutUpdate({ variables: { id: this.state.dataID, data: varQL } })
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

        let nextSubForm = AssistanceOutSubForm;
        let subFormData = this.getSubFormData(subFormID);

        switch(subFormID){
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

export default connect()(AssistanceOutNew);