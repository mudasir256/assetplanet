import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Table, Divider, Tag, Button, Row, Col, Input, DatePicker, Select } from 'antd';

import SubFormTable from '../../../../components/SubFormTable';

import { CORPORATE_TYPES } from 'constants/types';

const { Option } = Select;

class TrustSubForm extends Component {

    constructor(props) {
        super(props);

    }

    render() {        

        const states = [
            'Alabama', 'Alaska', 'Arizona'
        ]
        const colsFormat = [
            {
                title: 'Corporate Name',
                dataIndex: 'name',
                key: 'name',
                fields: [
                    {
                        type: 'Input',
                        name: 'name'
                    }
                ]
            },
            {
                title: 'Corporate Type',
                dataIndex: 'corporateType',
                key: 'corporateType',
                fields: [
                    {
                        type: 'Select',
                        name: 'corporateType',
                        placeholder: '-Select-',
                        values: CORPORATE_TYPES
                    }
                ]
            },
            {
                title: 'Date Created',
                dataIndex: 'creationDate',
                key: 'creationDate',
                fields: [
                    {
                        type: 'DatePicker',
                        name: 'creationDate'
                    }
                ]
            },
            {
                title: 'State Incorporated',
                dataIndex: 'stateIncorporated',
                key: 'stateIncorporated',
                fields: [
                    {
                        type: 'Select',
                        name: 'stateIncorporated',
                        placeholder: '-Select-',
                        values: states
                    }
                ]
            },
        ];
          
        const rows = [];

        return (
            <div>
                <SubFormTable 
                    title="Add Corporate Information Here" 
                    rows={rows} 
                    colsFormat={colsFormat}
                    addNewButton={true}
                    cbFormChange={this.props.cbFormChange}
                ></SubFormTable>
            </div>
        )
    }
}


export default connect()(TrustSubForm);