import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Row, Col, Input, Select, Button } from 'antd';

import SubFormTable from '../../../../components/SubFormTable';

const { Option } = Select;

class TrustSubForm extends Component {

    constructor(props) {
        super(props);

    }

    render() {        

        const colsFormat = [
            {
                title: 'Trust Name',
                dataIndex: 'name',
                key: 'name',
                fields: [
                    {
                        type: 'Select',
                        name: 'name',
                        placeholder: '-Select-',
                        values: ['Frank and Tracy Trust - 03/27/2019', 'Trust for test client - 03/25/2019']
                    }
                ]
            },
            {
                title: 'Beneficiaries',
                dataIndex: 'beneficiaries',
                key: 'beneficiaries',
                fields: [
                    {
                        type: 'Input',
                        name: 'firstName',
                        placeholder: 'First Name',
                    },
                    {
                        type: 'Input',
                        name: 'lastName',
                        placeholder: 'Last Name',
                    }
                ]
            },
            {
                title: 'Percent',
                dataIndex: 'percentage',
                key: 'percentage',
                fields: [
                    {
                        type: 'Percent',
                        name: 'percentage'
                    }
                ]
            }
        ];
          
        const rows = [];
        return (
            <div>
                <SubFormTable 
                    title="Add All Trusts Here" 
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