import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

import { useMutation, useQuery } from '@apollo/react-hooks';
import {
    QL_CLIENT_CONTACT_ADD,
    QL_CLIENT_CONTACT_UPDATE,
    QL_CLIENT_CONTACT_GET
} from '../../../constants/queries';

import { FormPagePose } from '../../../components/Animations';
import ContactInformationSubForm from './subforms/ContactInformationSubForm';
import QuestionAddContactSubForm from './subforms/QuestionAddContactSubForm';
import EndSubForm from './subforms/EndSubForm';

var fnMutationClientContactAdd = null;
var dataMutationClientContactAdd = null;
let prevPos = 0;
var fnMutationClientContactUpdate = null;
var dataMutationClientContactUpdate = null;

function HiddenHook(){
    [fnMutationClientContactAdd, { dataMutationClientContactAdd }] = useMutation(QL_CLIENT_CONTACT_ADD);
    [fnMutationClientContactUpdate, { dataMutationClientContactUpdate }] = useMutation(QL_CLIENT_CONTACT_UPDATE);

    return (
        <React.Fragment></React.Fragment>
    )
}

function convertDB2FormData(data){

    let formData = [];

    formData.push({
        id: 'ContactInformationSubForm',
        data: ContactInformationSubForm.FnCreateFormData({
            firstName: data['clientContact']['firstName'],
            lastName: data['clientContact']['lastName'],
            company: data['clientContact']['company'],
            addressLine1: data['clientContact']['address']['firstLine'],
            addressLine2: data['clientContact']['address']['secondLine'],
            cityDistrict: data['clientContact']['address']['city'],
            stateProvince: data['clientContact']['address']['state'],
            postalCode: data['clientContact']['address']['postalCode'],
            country: data['clientContact']['address']['country'],
            phone: data['clientContact']['primaryContactNumber'],
            alternatePhone: data['clientContact']['secondaryContactNumber'],
            relationship: data['clientContact']['relationship'],
            profession: data['clientContact']['profession'],
            partTeam: data['clientContact']['partOfMyProfessionalTeam'] ? 'Yes' : 'No',
            email: data['clientContact']['email'],
            notes: data['clientContact']['notes'],
        }),
        visible: true
    })

    return formData;
}

function LoadDBDataHook(props){
    if(props.dbID != null && props.dbID != ''){
        const {data, loading, error} = useQuery(QL_CLIENT_CONTACT_GET, { variables: { id: props.dbID} });
        if(data){
            console.log('call..', data);
            props.cbLoadDBData(convertDB2FormData(data));
        }
    }
    
    return (
        <React.Fragment></React.Fragment>
    )
}


class ClientContactNew extends Component {

    constructor(props) {
        super(props);

        let dbID = null;
        let dbLoaded = true;

        const { clientContactID } = this.props.match.params;        

        if( clientContactID ){
            dbID = clientContactID;
            dbLoaded = false;
        }      

        this.state = {
            dataID: dbID,
            curSubFormID: 'QuestionAddContactSubForm',
            curSubForm: QuestionAddContactSubForm,
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
                    id: 'ContactInformationSubForm',
                    icon: 'icon_ex.png',
                    title: 'Step1'
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
        this.goSubForm("QuestionAddContactSubForm");
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
            case 'ContactInformationSubForm': 
                varQL = {
                    "clientId" : '1',
                    "clientContact": {
                        "firstName": this.getSubFormFieldValue(subFormID, 'firstName'),
                        "lastName": this.getSubFormFieldValue(subFormID, 'lastName'),
                        "company": this.getSubFormFieldValue(subFormID, 'company'),
                        "primaryContactNumber": this.getSubFormFieldValue(subFormID, 'phone'),
                        "secondaryContactNumber": this.getSubFormFieldValue(subFormID, 'alternatePhone'),
                        "relationship": this.getSubFormFieldValue(subFormID, 'relationship'),
                        "profession": this.getSubFormFieldValue(subFormID, 'profession'),
                        "partOfMyProfessionalTeam": this.getSubFormFieldValue(subFormID, 'partTeam') == 'Yes' ? true : false,
                        "email": this.getSubFormFieldValue(subFormID, 'email'),
                        "notes": this.getSubFormFieldValue(subFormID, 'notes'),
                    },
                    "address": {
                        "firstLine": this.getSubFormFieldValue(subFormID, 'addressLine1'),
                        "secondLine": this.getSubFormFieldValue(subFormID, 'addressLine2'),
                        "city": this.getSubFormFieldValue(subFormID, 'cityDistrict'),
                        "state": this.getSubFormFieldValue(subFormID, 'stateProvince'),
                        "country": this.getSubFormFieldValue(subFormID, 'country'),
                        "postalCode": this.getSubFormFieldValue(subFormID, 'postalCode'),
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
                fnMutationClientContactAdd({ variables: { data: varQL } }).then((response) => {
                    instance.setState({
                        dataID: response['data']['createClientContact']['id']
                    })
                });
                
            }
            else{
                fnMutationClientContactUpdate({ variables: { id: this.state.dataID, data: varQL } })
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

        let nextSubForm = ContactInformationSubForm;
        let subFormData = this.getSubFormData(subFormID);

        switch(subFormID){
            case 'ContactInformationSubForm': 
                nextSubForm = ContactInformationSubForm;
                break;
            case 'QuestionAddContactSubForm': 
                nextSubForm = QuestionAddContactSubForm;
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
                href: '/client_contacts',
                title: 'Client Contacts'
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


                    {/* <div className="form-step-container">
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
                    </div> */}
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

export default connect()(ClientContactNew);