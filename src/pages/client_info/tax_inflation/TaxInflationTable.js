import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';

function InfoRow(props){
    return (
        <div className="info-wrap">
            <div className="info-title">{props.info.title}</div>
            <div className="info-value">{props.info.value}</div>
        </div>
    );
}

function TaxInfo(props){
    return (
        <Card title={props.title} size="small" className="card-information">
            {
                props.infos.map((info, index) => (<InfoRow key={index} info={info}></InfoRow>))
            }
        </Card>
    )
}

class TaxInflationTable extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        
        const tax_inflation = [
            {
                'title': 'State Taxation',
                'value': 'California'
            },
            {
                'title': 'Tax Filing Election',
                'value': 'Married Filing Jointly'
            },
            {
                'title': 'Deductions',
                'value': 'Itemized'
            },
            {
                'title': 'State Tax Effective Rate',
                'value': '7.5'
            },
            {
                'title': 'Federal Tax Rate',
                'value': '24.0'
            },
            {
                'title': 'Total Tax Rate',
                'value': '31.5'
            },
            {
                'title': 'General Inflation Rate',
                'value': '2.2'
            },
            {
                'title': 'Medical Inflatio Rate',
                'value': '6.0'
            },
            {
                'title': 'Education Inflation Rate',
                'value': '7.0'
            },
            {
                'title': 'Luxury Inflation Rate',
                'value': '6.0'
            },
            {
                'title': 'Housing Inflation Rate',
                'value': '3.0'
            }
        ]
        return (
            <React.Fragment>                
                <TaxInfo infos={tax_inflation} title="Tax and Inflation"></TaxInfo>
            </React.Fragment>
        )
    }
}


export default connect()(TaxInflationTable);