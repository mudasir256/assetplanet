import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';

import './ReturnRateTable.css';

function InfoRow(props){
    return (
        <div className="info-wrap">
            <div className="info-title">{props.info.title}</div>
            <div className="info-value">{props.info.value}</div>
        </div>
    );
}

function InfoList(props){
    return (
        <Card title={props.title} size="small" className="card-information">
            {
                props.infos.map((info, index) => (<InfoRow key={index} info={info}></InfoRow>))
            }
        </Card>
    )
}

class StaticTable extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        
        const infos = [
            {
                'title': 'Static',
                'value': this.props.data['static']
            }
        ]

        return (
            <React.Fragment>                
                <h4 className="title">Static</h4>
                <InfoList infos={infos} title=""></InfoList>
            </React.Fragment>
        )
    }
}


export default connect()(StaticTable);