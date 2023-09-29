import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, Button, Card, Row, Col } from 'antd';

import { useQuery, useMutation } from '@apollo/react-hooks';
import {
    QL_CLIENT_CONTACT_GET
} from '../../../constants/queries';

import ContactInformationSubForm from './subforms/ContactInformationSubForm';
import EndSubForm from './subforms/EndSubForm';

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

function ViewInformation(props){
    if(props.dbID != null && props.dbID != ''){
        const {data, loading, error} = useQuery( QL_CLIENT_CONTACT_GET, { variables: { id: props.dbID} });
        let formData = null;
        if(data){
            console.log('data:', data);
            formData = convertDB2FormData(data);
        }

        return (
            <React.Fragment>
                <h4 className="title">Client Contacts View</h4>
                {
                    !data && <p>Loading...</p>
                }
                {
                    data &&
                    formData.map((subForm, sindex) => {
                        let subFormData = subForm.data;
                        return(
                            <Row gutter={16} className="view-form-card-container">
                                <Col span={12} key={sindex}>
                                    <Card size="small" title={subFormData.title}>
                                    {
                                        subFormData.hasOwnProperty('fields') && subFormData.fields.map((field, ffindex) => {
                                            return(
                                                <div className="info-wrap" key={ffindex}>
                                                    <div className="info-title">{field.title}</div>
                                                    <div className="info-value">{field.value}</div>
                                                </div>
                                            )
                                        })
                                    }
                                    </Card>
                                </Col>
                            </Row>
                        )
                    })
                }                
            </React.Fragment>
        )
    }
    
    return (
        <React.Fragment>
            <h4 className="title">Client Contacts View</h4>
        </React.Fragment>
    )
    
}

class ClientContactView extends Component {

    constructor(props) {
        super(props);
        const { clientContactID } = this.props.match.params;        

        this.state = {
            clientContactID: clientContactID
        };

    }

    componentDidMount(){
        // const { assetsID } = this.props.match.params;
        // console.log('assetsID', assetsID);

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
                    dbID={this.state.clientContactID}
                />

            </React.Fragment>
        )
    }
}


export default connect()(ClientContactView);