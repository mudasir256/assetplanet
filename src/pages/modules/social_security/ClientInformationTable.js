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

        this.state = {
            dbData: {}
        }
    }

    componentDidMount() {
        this.setState({
            dbData: this.props.dbData
        })
    }

    render() {
        
        const general = [
            {
                'title': 'Client Birthdate',
                'value': ''
            },
            {
                'title': 'Cost of Living Adjustment',
                'value': ''
            },
            {
                'title': 'Client Retirement Year',
                'value': ''
            },
            {
                'title': 'Time value of Money Interest Rate',
                'value': ''
            },
            {
                'title': 'Client Mondthly Benefit at Full Retirement Age',
                'value': ''
            },
            {
                'title': 'Time until Full Retirement Age',
                'value': ''
            },
            {
                'title': 'Full Retirement Age',
                'value': ''
            },
        ]

        const earnings = [
            {
                'title': 'Enter date you would like to begin receiving benefits',
                'value': ''
            },
            {
                'title': 'Monthly decrease in benefit',
                'value': ''
            },
            {
                'title': 'Your estimated earnings',
                'value': ''
            },
            {
                'title': 'Monthly decrease in benefit',
                'value': '  '
            }
        ]

        return (
            <React.Fragment>                
                <h4 className="title">Client Information</h4>
                <PersonInfo infos={general} title="General"></PersonInfo>
                <PersonInfo infos={earnings} title="Retirement Earnning"></PersonInfo>
            </React.Fragment>
        )
    }
}


export default connect()(ClientInformationTable);