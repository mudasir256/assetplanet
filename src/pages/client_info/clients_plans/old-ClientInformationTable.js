import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';

import './ClientInformationTable.css';

function InfoRow(props){
    return (
        <div className="info-wrap">
            <div className="info-title">{props.info.title}</div>
            <div className="info-value">{props.info.value}</div>
        </div>
    );
}

function PersonInfo(props){
    return (
        <Card title={props.title} size="small" className="card-information">
            {
                props.infos.map((info, index) => (<InfoRow key={index} info={info}></InfoRow>))
            }
        </Card>
    )
}

class ClientInformationTable extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        
        const client = [
            {
                'title': 'Name',
                'value': 'Frank Jones'
            },
            {
                'title': 'Client Date of Birth',
                'value': '01/01/1980'
            },
            {
                'title': 'Client Phone Number - Primary',
                'value': ''
            },
            {
                'title': 'Client Email Address - Primary',
                'value': 'hideinplainsight@yahoo.com'
            },
            {
                'title': 'Address',
                'value': '123 Main St., Anytown, California, 00010, United States'
            },
        ]

        const spouse = [
            {
                'title': 'Name',
                'value': 'Tracy Jones'
            },
            {
                'title': 'Spouse Date of Birth',
                'value': '01/01/1970'
            },
            {
                'title': 'Spouse Phone Number - Primary',
                'value': ''
            },
            {
                'title': 'Spouse Email Address - Primary',
                'value': 'hideinplainsight@yahoo.com'
            }
        ]

        const other = [
            {
                'title': 'Children and Other Dependents',
                'value': 'Ava Jones'
            },
            {
                'title': 'General Notes',
                'value': ''
            },
            {
                'title': 'Trusts Associated with Client',
                'value': ' Frank and Tracy Trust - 03/27/2019'
            },
            {
                'title': 'Corporations Associated with Client',
                'value': 'Jones, LLC'
            },
            {
                'title': 'Charities Associated with Client',
                'value': 'Audobon Society'
            },
            {
                'title': 'Others Financially Impacted By This Plan',
                'value': 'Joe Friend'
            }
        ]

        return (
            <React.Fragment>                
                <h4 className="title">Client and Spouse Information</h4>
                <PersonInfo infos={client} title="Client"></PersonInfo>
                <PersonInfo infos={spouse} title="Spouse"></PersonInfo>
                <PersonInfo infos={other} title="Other"></PersonInfo>
            </React.Fragment>
        )
    }
}


export default connect()(ClientInformationTable);