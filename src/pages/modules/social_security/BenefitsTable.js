import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'antd';

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

class BenefitsTable extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
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
                'value': ''
            }
        ]

        return (
            <React.Fragment>                
                <h4 className="title">Benefits</h4>
                <Row gutter={16}>
                    <Col span={12}>
                        <PersonInfo infos={general} title="Client"></PersonInfo>
                        <p className="form-label">
                        These values consider a COLA of 1.25% per year. Click <Link to="">HERE</Link> for information on COLA from the Social Security Administration.
                        </p>
                    </Col>
                    <Col span={12}>
                        <PersonInfo infos={general} title="Spouse"></PersonInfo>
                        <p className="form-label">
                        These values consider a COLA of 1.25% per year. Click <Link to="">HERE</Link> for information on COLA from the Social Security Administration.
                        </p>
                    </Col>
                </Row>
                
            </React.Fragment>
        )
    }
}


export default connect()(BenefitsTable);