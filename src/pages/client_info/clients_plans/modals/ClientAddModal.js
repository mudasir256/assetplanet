import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReportModal from '../../../../components/ReportModal';
import { Button } from 'antd';
import ClientForm from './ClientForm';

import { useMutation } from '@apollo/react-hooks';

import {
    QL_CLIENT_ADD
} from '../../../../constants/queries';

const ql_var = {
    client: {
        // id:
        firstName: 'String!',
        lastName: 'String!',
        birthdate: 'String!',
        estimatedDeathAge: 20, //'Int!',
        primaryContactNumber: 'String',
        secondaryContactNumber: 'String',
        workContactNumber: 'String',
        emailAddress: 'String',
        secondaryEmailAddress: 'String',
        gender: 'String',
        investmentKnowledge: 'String',
        retirementDate: 'String!'
    },
    address: {
        // id: String
        firstLine: 'String!',
        secondLine: 'String',
        city: 'String!',
        state: 'String!',
        country: 'String!',
        postalCode: 'String'
    },
    spouse: {
        // id: String
        firstName: 'String!',
        lastName: 'String!',
        birthdate: 'String',
        estimatedDeathAge: 20, //'Int',
        primaryContactNumber: 'String',
        secondaryContactNumber: 'String',
        workContactNumber: 'String',
        emailAddress: 'String',
        secondaryEmailAddress: 'String',
        gender: 'String',
        investmentKnowledge: 'String',
        retirementDate: 'String',
        partner: false, //'Boolean'
    },
    dependents: [
        {
            // id: String
            firstName: 'String!',
            lastName: 'String!',
            birthdate: 'String!',
            relationship: 'String!',
            childTaxCreditEndAt: 'String',
            gender: 'String',
            disability: true, //'Boolean!'
        }
    ],
    trusts: [
        {
            // id: String
            name: 'String!',
            firstName: 'String!',
            lastName: 'String!',
            percentage: 80, //'Int!'
        }
    ],
    corporates: [
        {
            // id: String
            name: 'String!',
            corporateType: 'String!',
            creationDate: 'String!',
            stateIncorporated: 'String!'
        }
    ],
    charities: [
        {
            // id: 'String'
            contactNumber: 'String!',
            website: 'String',
            emailAddress: 'String',
            contactPersonFirstName: 'String!',
            contactPersonLastName: 'String!',
            notes: 'String'
        }
    ],
    financiallyImpacteds: [
        {
            // id: String
            relationship: 'String!',
            firstName: 'String!',
            lastName: 'String!',
            contactNumber: 'String!',
            website: 'String',
            emailAddress: 'String',
            contactPersonFirstName: 'String!',
            contactPersonLastName: 'String!',
            notes: 'String'
        }
    ],
    professionalContacts: [
        {
            // id: String
            firstName: 'String!',
            lastName: 'String!',
            company: 'String',
            emailAddress: 'String',
            officeContactNumber: 'String',
            mobileContactNumber: 'String!',
            profession: 'String!'
        }
    ]
};

var fn_mutation_client_add = null;
var mutation_data = null;

function HiddenHook(){
    [fn_mutation_client_add, { mutation_data }] = useMutation(QL_CLIENT_ADD);

    return (
        <React.Fragment></React.Fragment>
    )
}

class ClientAddModal extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            client: {
            }    
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
    }

    handleSubmit(){
        console.log('handle submit');

        //update form data
        let client = this.state.client;
        client['client'].estimatedDeathAge = parseInt(client['client'].estimatedDeathAge);
        client['spouse'].estimatedDeathAge = parseInt(client['spouse'].estimatedDeathAge);

        for(var dindex = 0; dindex < client['dependents'].length; dindex ++){
            client['dependents'][dindex].disability = client['dependents'][dindex].disability == 'Yes' ? true : false;
            delete client['dependents'][dindex]['uuid'];
            delete client['dependents'][dindex]['key'];
        }

        for(var tindex = 0; tindex < client['trusts'].length; tindex ++){
            client['trusts'][tindex].percentage = parseInt(client['trusts'][tindex].percentage);
            delete client['trusts'][tindex]['uuid'];
            delete client['trusts'][tindex]['key'];
        }

        for(var cindex = 0; cindex < client['corporates'].length; cindex ++){
            delete client['corporates'][cindex]['uuid'];
            delete client['corporates'][cindex]['key'];
        }

        for(var cindex = 0; cindex < client['charities'].length; cindex ++){
            delete client['charities'][cindex]['uuid'];
            delete client['charities'][cindex]['key'];
        }

        for(var findex = 0; findex < client['financiallyImpacteds'].length; findex ++){
            delete client['financiallyImpacteds'][findex]['uuid'];
            delete client['financiallyImpacteds'][findex]['key'];
        }

        for(var pindex = 0; pindex < client['professionalContacts'].length; pindex ++){
            delete client['professionalContacts'][pindex]['uuid'];
            delete client['professionalContacts'][pindex]['key'];
        }

        fn_mutation_client_add({ variables: { client: client } });
    }

    handleFormChange(newForm){
        this.setState({
            client: newForm
        });
        console.log('handleFormChange:', newForm);
    }

    renderBody(){
        return (
            <div>
                <ClientForm cbFormChange={this.handleFormChange}></ClientForm>
            </div>
        )
    }

    renderFooter(){

        return (
            <div>
                <HiddenHook />
                <Button type="primary" onClick={this.handleSubmit}>Submit</Button>
            </div>
        )
    }

    render() {
                
        return (
            <ReportModal
                width="80vw"
                isOpen={this.props.isOpen}
                title="Clients"
                cbToggle={this.props.cbToggle}
                body={this.renderBody()}
                footer={this.renderFooter()}
            ></ReportModal>
        )
    }
}


export default connect()(ClientAddModal);