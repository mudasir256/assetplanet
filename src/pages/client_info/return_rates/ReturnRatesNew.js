import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import ImageIcon from 'assets/images/asset.png';
import AssetPlanet from 'assets/images/asset-planet-logo.jpg';

import { useMutation, useQuery } from '@apollo/react-hooks';
import {
    QL_RATES_OF_RETURN_ADD,
    QL_RATES_OF_RETURN_UPDATE,
    QL_RATES_OF_RETURN_GET
} from '../../../constants/queries';

import { FormPagePose } from '../../../components/Animations';
import StaticSubForm from './subforms/StaticSubForm';
import QuestionPredictionSubForm from './subforms/QuestionPredictionSubForm';
import ChoosePredictionSubForm from './subforms/ChoosePredictionSubForm';
import QuestionOwnRateSubForm from './subforms/QuestionOwnRateSubForm';
import UserDefinedSubForm from './subforms/UserDefinedSubForm';
import QuestionMonteCarloSubForm from './subforms/QuestionMonteCarloSubForm';
import MonteCarloSubForm from './subforms/MonteCarloSubForm';
import EndSubForm from './subforms/EndSubForm';

var fnMutationRatesOfReturnAdd = null;
var dataMutationRatesOfReturnAdd = null;

var fnMutationRatesOfReturnUpdate = null;
var dataMutationRatesOfReturnUpdate = null;
let prevPos = 0;

function HiddenHook(){
    [fnMutationRatesOfReturnAdd, { dataMutationRatesOfReturnAdd }] = useMutation(QL_RATES_OF_RETURN_ADD);
    [fnMutationRatesOfReturnUpdate, { dataMutationRatesOfReturnUpdate }] = useMutation(QL_RATES_OF_RETURN_UPDATE);

    return (
        <React.Fragment></React.Fragment>
    )
}

function convertDB2FormData(data){

    console.log('readData:', data);
    let formData = [];

    formData.push({
        id: 'StaticSubForm',
        data: StaticSubForm.FnCreateFormData({
            static: data['ratesOfReturn']['ratesOfReturn']['static']
        }),
        visible: true
    })

  

    formData.push({
        id: 'ChoosePredictionSubForm',
        data: ChoosePredictionSubForm.FnCreateFormData({
            prediction: data['ratesOfReturn']['ratesOfReturn']['professionalPrediction'],
        }),
        visible: true
    })

 

    formData.push({
        id: 'UserDefinedSubForm',
        data: {
            title: 'User Defined Return',
            data: data['ratesOfReturn']['userDefinedRateOfReturns']
        },
        visible: false
    })

 


    formData.push({
        id: 'MonteCarloSubForm',
        data: {
            title: 'Monte Carlo Rate of  Return',
            data: data['ratesOfReturn']['monteCarloRateOfReturns']
        },
        visible: false
    })

    return formData;
}

function LoadDBDataHook(props){
    if(props.dbID != null && props.dbID != ''){
        const {data, loading, error} = useQuery(QL_RATES_OF_RETURN_GET, { variables: { id: props.dbID} });
        if(data){
            console.log('call..');
            props.cbLoadDBData(convertDB2FormData(data));
        }
    }
    
    return (
        <React.Fragment></React.Fragment>
    )
}

class ReturnRatesNew extends Component {

    constructor(props) {
        super(props);

        let dbID = null;
        let dbLoaded = true;      

        const { ratesOfReturnID } = this.props.match.params;        

        if( ratesOfReturnID ){
            dbID = ratesOfReturnID;
            dbLoaded = false;
        }

        this.state = {
            dataID: dbID,
            curSubFormID: 'StaticSubForm',
            curSubForm: StaticSubForm,
            formVisible: false,
            subFormData: {},
            formData: [
  
            ],
            isRightSideOpen: false,
            formSteps: [
                {
                    id: 'StaticSubForm',
                    icon: 'icon_ex.png',
                    title: 'Static Rate of Return'
                },
                {
                    id: 'ChoosePredictionSubForm',
                    icon: 'icon_ex.png',
                    title: 'Professional Prediction'
                },
                {
                    id: 'UserDefinedSubForm',
                    icon: 'icon_ex.png',
                    title: 'User Defined'
                },
                {
                    id: 'MonteCarloSubForm',
                    icon: 'icon_ex.png',
                    title: 'Monte Carlo'
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
        this.goSubForm("StaticSubForm");
        // this.goSubForm("UserDefinedSubForm");
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
            case 'StaticSubForm': 
                varQL = {
                    "ratesOfReturn" : {
                        "static": this.getSubFormFieldValue(subFormID, 'static') != '' ? parseInt(this.getSubFormFieldValue(subFormID, 'static')) : 0
                    }
                };
                break;
            case 'QuestionPredictionSubForm': 
                break;
            case 'ChoosePredictionSubForm':
                varQL = {
                    "ratesOfReturn" : {
                        "professionalPrediction": this.getSubFormFieldValue(subFormID, 'prediction')
                    }
                };
                break;
            case 'QuestionOwnRateSubForm':
                break;
            case 'UserDefinedSubForm':
                varQL = {
                    "userDefinedRateOfReturns" : subFormData
                };
                break;
            case 'QuestionMonteCarloSubForm':
                break;
            case 'MonteCarloSubForm':
                varQL = {
                    "monteCarloRateOfReturns" : subFormData
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
                fnMutationRatesOfReturnAdd({ variables: { data: varQL } }).then((response) => {
                    instance.setState({
                        dataID: response['data']['createRatesOfReturn']['ratesOfReturn']['id']
                    })
                });
                
            }
            else{
                fnMutationRatesOfReturnUpdate({ variables: { id: this.state.dataID, data: varQL } })
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

        let nextSubForm = StaticSubForm;
        let subFormData = this.getSubFormData(subFormID);

        switch(subFormID){
            case 'StaticSubForm': 
                nextSubForm = StaticSubForm;
                break;
            case 'QuestionPredictionSubForm': 
                nextSubForm = QuestionPredictionSubForm;
                break;
            case 'ChoosePredictionSubForm':
                nextSubForm = ChoosePredictionSubForm;
                break;
            case 'QuestionOwnRateSubForm':
                nextSubForm = QuestionOwnRateSubForm;
                break;
            case 'UserDefinedSubForm':
                nextSubForm = UserDefinedSubForm;
                break;
            case 'QuestionMonteCarloSubForm':
                nextSubForm = QuestionMonteCarloSubForm;
                break;
            case 'MonteCarloSubForm':
                nextSubForm = MonteCarloSubForm;
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

                                        classBtn = elementPos >= index ? 'btn nav-items btn-circle active' : 'btn nav-items btn-circle';
                                        if(this.state.isEndForm)
                                            classBtn = 'btn nav-items btn-circle disabled'

                                        return (
                                            <div className="process-step" key={index}>
                                                <button type="button" className={ classBtn } data-toggle="tab" onClick={() => {
                                                    if(classBtn !== 'btn nav-items btn-circle disabled')
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
                                            cbGoNext={this.goNext}
                                                cbGoPrev={this.goPrev}
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

export default connect()(ReturnRatesNew);