import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Card, List } from 'antd';

import { useMutation, useQuery } from '@apollo/react-hooks';
import {
    QL_ASSISTANCE_IN_GET
} from '../../../../constants/queries';

import CurrentAssistanceSubForm from './subforms/CurrentAssistanceSubForm';
import FutureAssistanceSubForm from './subforms/FutureAssistanceSubForm';


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

function ViewInformation(props){
    if(props.dbID != null && props.dbID != ''){
        const {data, loading, error} = useQuery(QL_ASSISTANCE_IN_GET, { variables: { id: props.dbID} });
        let formData = null;
        if(data){
            console.log('data:', data);
            formData = convertDB2FormData(data);
        }

        return (
            <React.Fragment>
                <h4 className="title">Assistance In View</h4>
                {
                    !data && <p>Loading...</p>
                }
                {
                    <div className="card-columns">
                        {
                        data &&
                        formData.map((subForm, sindex) => {
                            let subFormData = subForm.data;

                            if(subFormData.hasOwnProperty('fields') && subFormData.fields){
                                var filtered = subFormData.fields.filter(function (el) {
                                    return el.value !== '' && el.value !== null && el.value !== undefined;
                                });
                                if(filtered.length){
                                    return(
                                        <div className="card">
                                            <Card title={subFormData.title} bordered={false}>                                    
                                                {
                                                    filtered.map((field, ffindex) => {
                                                        return(
                                                            <div className="info-wrap" key={ffindex}>
                                                                <div className="info-title text-left">{field.title}</div>
                                                                <div className="info-value">{field.value.toString()}</div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </Card>
                                        </div>
                                    )
                                }
                            }
                        })}
                    </div>
                }              
            </React.Fragment>
        )
    }
    
    return (
        <React.Fragment>
            <h4 className="title">Assistance In View</h4>
        </React.Fragment>
    )
    
}

class AssistanceReceivedView extends Component {

    constructor(props) {
        super(props);

        const { assistanceInID } = this.props.match.params;        

        this.state = {
            assistanceInID: assistanceInID
        }

    }

    componentDidMount() {
     
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

        return (
            <React.Fragment>
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
                <ViewInformation 
                    dbID={this.state.assistanceInID}
                />
            </React.Fragment>
        )
    }
}

export default connect()(AssistanceReceivedView);