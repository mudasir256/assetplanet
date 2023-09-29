import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

import { useMutation, useQuery } from '@apollo/react-hooks';
import {
    QL_CLIENT_PLAN_ADD,
    QL_CLIENT_PLAN_UPDATE,
    QL_CLIENT_PLAN_GET
} from '../../../constants/queries';

import { FormPagePose } from '../../../components/Animations';

import PlanInformationSubForm from './subforms/PlanInformationSubForm';
import EndSubForm from './subforms/EndSubForm';

var fnMutationClientPlanAdd = null;
var dataMutationClientPlanAdd = null;
let prevPos = 0;

var fnMutationClientPlanUpdate = null;
var dataMutationClientPlanUpdate = null;

function HiddenHook(){
    [fnMutationClientPlanAdd, { dataMutationClientPlanAdd }] = useMutation(QL_CLIENT_PLAN_ADD);
    [fnMutationClientPlanUpdate, { dataMutationClientPlanUpdate }] = useMutation(QL_CLIENT_PLAN_UPDATE);

    return (
        <React.Fragment></React.Fragment>
    )
}

function convertDB2FormData(data){

    console.log('readData:', data);
    let formData = [];

    formData.push({
        id: 'PlanInformationSubForm',
        data: PlanInformationSubForm.FnCreateFormData({
            planNumber: data['plan']['number'],
            nickName: data['plan']['nickname'],
            planDescription: data['plan']['description'],
            replicatePlan: data['plan']['replicate'] ? 'Yes' : 'No'
        }),
        visible: true
    })

    return formData;
}

function LoadDBDataHook(props){
    if(props.dbID != null && props.dbID != ''){
        const {data, loading, error} = useQuery(QL_CLIENT_PLAN_GET, { variables: { clientId: '1', id: props.dbID} });
        if(data){
            console.log('call..');
            props.cbLoadDBData(convertDB2FormData(data));
        }
    }
    
    return (
        <React.Fragment></React.Fragment>
    )
}

class ClientPlanNew extends Component {

    constructor(props) {
        super(props);

        let dbID = null;
        let dbLoaded = true;      

        const { planID } = this.props.match.params;        

        if( planID ){
            dbID = planID;
            dbLoaded = false;
        }

        this.state = {
            dataID: dbID,
            curSubFormID: 'PlanInformationSubForm',
            curSubForm: PlanInformationSubForm,
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
                    id: 'PlanInformationSubForm',
                    icon: 'icon_ex.png',
                    title: 'Step1'
                },
                // {
                //     id: 'EndSubForm',
                //     icon: 'icon_ex.png',
                //     title: 'Step11'
                // }
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
        this.goSubForm("PlanInformationSubForm");
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
            case 'PlanInformationSubForm': 
                varQL = {
                    "clientId" : '1',
                    "plan" : {
                        "number": this.getSubFormFieldValue(subFormID, 'planNumber'),
                        "nickname": this.getSubFormFieldValue(subFormID, 'nickName'),
                        "description": this.getSubFormFieldValue(subFormID, 'planDescription'),
                        "replicate": this.getSubFormFieldValue(subFormID, 'replicatePlan') == 'Yes' ? true : false,
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
                fnMutationClientPlanAdd({ variables: { data: varQL } }).then((response) => {
                    instance.setState({
                        dataID: response['data']['createPlan']['id']
                    })
                });
                
            }
            else{
                fnMutationClientPlanUpdate({ variables: { id: this.state.dataID, data: varQL } })
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

        let nextSubForm = PlanInformationSubForm;
        let subFormData = this.getSubFormData(subFormID);

        switch(subFormID){
            case 'PlanInformationSubForm':
                nextSubForm = PlanInformationSubForm;
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
                href: '/clients/plans', //new='/clients/plans' old='/clients_plans'
                title: 'Client and Plans'
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
                    {
                        !this.state.dbLoaded && 
                        <LoadDBDataHook 
                            dbLoaded={this.state.dbLoaded}
                            dbID={this.state.dbID}
                            cbLoadDBData={this.loadDBData}
                        />
                    }
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
                    
                    <div className='steps'>
                        <div className='process'>
                            <div className='process-row'>
                                    {/* <div className="form-step-container"> */}
                                        {
                                            this.state.formSteps.map((formStep, index) => {
                                                let elementPos = this.state.formSteps
                                                .map(function (x) {
                                                return x.id;
                                                })
                                                .indexOf(this.state.curSubFormID);
                            
                                                if (elementPos === -1) {
                                                    elementPos = prevPos;
                                                } else {
                                                    prevPos = elementPos;
                                                }
                                                return(
                                                    <div className='process-step' key={index}>
                                                    <button
                                                    type='button'
                                                    // className={
                                                    //     elementPos >= index
                                                    //     ? 'btn nav-items btn-circle active'
                                                    //     : 'btn nav-items btn-circle'
                                                    // }
                                                    className='btn nav-items btn-circle active'
                                                    data-toggle='tab'
                                                    onClick={() => this.goSubForm(formStep.id)}
                                                    >
                                                    {/* <img className="img-icon" src={ImageIcon} /> */}
                                                    <div style={{ fontSize: 30, color: '#006400' }}>
                                                        {index + 1}
                                                    </div>
                                                    </button>
                                                    <p className='step-title'>{formStep.title}</p>
                                                </div>
                                                )
                                                // return (
                                                //     <div key={index} className="form-step-wrap" onClick={() => this.goSubForm(formStep.id)}>
                                                //         <img className="" src={require('../../../assets/images/page_icons/' + formStep.icon)}></img>
                                                //         <div className="">{formStep.title}</div>
                                                //     </div>            
                                                // )
                                            })
                                        }
                                    {/* </div> */}

                            </div>
                        </div>
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

export default connect()(ClientPlanNew);