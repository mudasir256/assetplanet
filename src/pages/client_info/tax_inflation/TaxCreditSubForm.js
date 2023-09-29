import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import SubFormTable from '../../../components/SubFormTable';

import { Button, Input, Select } from 'antd';

const { Option } = Select;

class TaxCreditSubForm extends Component {

    constructor(props) {
        super(props);

    }

    render() {        

        const other_tax_credits = [
            'Adoption Credit', 'American Opportunity Credit and Lifetime Learning Credit', 'Child and Dependent Care Credit', 'Child Tax Credit', 'Credit for Tax on Undistributed Capital Gain', 'Credit for the Elderly or Disabled', 'Credit to Holders of Tax Credit Bonds', 'Earned Income Tax Credit', 'Excess Social Security and RRTA Tax Withheld', 'Foreign Tax Credit', 'Health Coverage Tax Credit', 'Low-Income Housing Credit (for Owners)', 'Nonbusiness Energy Property Credit', 'Nonrefundable Credit for Prior Year Minimum Tax', 'Premium Tax Credit (Affordable Care Act)', 'Residential Energy Efficient Property Credit', "Saver's Credit"
        ]
        
        const cols = [
            {
                title: 'Other Tax Credit',
                dataIndex: 'other_tax_credit',
                key: 'other_tax_credit',
                render: (text, record) => (
                    <Select
                        showSearch
                        placeholder="-Select-"
                    >
                    {
                        other_tax_credits.map((other_tax_credit, index) => <Option key={index} value={other_tax_credit}>{other_tax_credit}</Option>)
                    }
                    </Select>
                ),
            },
            {
                title: 'Account of Credit',
                dataIndex: 'credit_account',
                key: 'credit_account',
                render: (text, record) => (
                    <Input addonBefore="$"></Input>
                ),
            },
        ];
          
        const rows = [
            {
                key: '1',
            },
        ];
        return (
            <div>
                <SubFormTable title="New Tax Credit" rows={rows} cols={cols}></SubFormTable>
                <div style={{'textAlign': 'center'}}>
                    <Button type="link" onClick={this.addNewRow}>Add New</Button>
                </div>
            </div>
        )
    }
}


export default connect()(TaxCreditSubForm);