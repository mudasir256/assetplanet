import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Card, List } from 'antd';

import { useMutation, useQuery } from '@apollo/react-hooks';
import {
    QL_ASSISTANCE_OUT_GET
} from '../../../../constants/queries';

import AssistanceOutSubForm from './subforms/AssistanceOutSubForm';
import EndSubForm from './subforms/EndSubForm';


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
            annualGiftingAmount: data['assistanceOut']['annualGiftingAmount'],
            budgetItem: data['assistanceOut']['budgetItem']
        }),
        visible: true
    })

    return formData;
}

function ViewInformation(props){
    if(props.dbID != null && props.dbID != ''){
        const {data, loading, error} = useQuery(QL_ASSISTANCE_OUT_GET, { variables: { id: props.dbID} });
        let formData = null;
        if(data){
            console.log('data:', data);
            formData = convertDB2FormData(data);
        }

        return (
            <React.Fragment>
                <h4 className="title">Assistance Out View</h4>
                {
                    !data && <p>Loading...</p>
                }
                {
                    <div class="card-columns">
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
                                        <div class="card">
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
            <h4 className="title">Assistance Out View</h4>
        </React.Fragment>
    )
    
}

class AssistanceOutView extends Component {

    constructor(props) {
        super(props);

        const { assistanceOutID } = this.props.match.params;        

        this.state = {
            assistanceOutID: assistanceOutID
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
                href: '/income',
                title: 'Income'
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
                    dbID={this.state.assistanceOutID}
                />
            </React.Fragment>
        )
    }
}

export default connect()(AssistanceOutView);