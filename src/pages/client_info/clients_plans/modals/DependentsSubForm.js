import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Table, Divider, Tag, Button, Icon, Row, Col, Input, DatePicker, Select } from 'antd';

import SubFormTable from '../../../../components/SubFormTable';
import uuidv1 from 'uuid/v1';

const { Option } = Select;

const dateFormat = 'MM/DD/YYYY';

class DependentsSubForm extends Component {

    constructor(props) {
        super(props);
     
    }

    render() {
        const relations = [
            'Child', 'Parent', 'Grandparent', 'GrandChild'
        ]

        const genders = [
            'Male', 'Female'
        ]

        const child_tax_credits_end_ats = [
            '17 (lives at home - Child Credit)', '24 (Goes to College - Child Credit)', 'Over 17 (Qualifies as Dependent Deduction)'
        ]

        const colsFormat = [
            {
                title: 'Dependent Name',
                dataIndex: 'dependent_name',
                key: 'dependent_name',
                fields: [
                    {
                        type: 'Input',
                        name: 'firstName',
                        placeholder: "First Name"
                    },
                    {
                        type: 'Input',
                        name: 'lastName',
                        placeholder: "Last Name"
                    }
                ]
            },
            {
                title: 'Date of Birth',
                dataIndex: 'birthdate',
                key: 'birthdate',
                fields: [
                    {
                        type: 'DatePicker',
                        name: 'birthdate',
                        placeholder: ""
                    }
                ]
            },
            {
                title: 'Relationship',
                dataIndex: 'relationship',
                key: 'relationship',
                fields: [
                    {
                        type: 'Select',
                        name: 'relationship',
                        placeholder: "-Select-",
                        values: relations
                    }
                ]
            },
            {
                title: 'Child Current Age',
                dataIndex: 'currentAge',
                key: 'currentAge',
                fields: [
                    {
                        type: 'Input',
                        name: 'currentAge',
                        placeholder: ""
                    }
                ]
            },
            {
                title: 'Gender',
                dataIndex: 'gender',
                key: 'gender',
                fields: [
                    {
                        type: 'Select',
                        name: 'gender',
                        placeholder: "-Select-",
                        values: genders
                    }
                ]
            },
            {
                title: 'Disability?',
                dataIndex: 'disability',
                key: 'disability',
                fields: [
                    {
                        type: 'Select',
                        name: 'disability',
                        placeholder: "-Select-",
                        values: ['Yes', 'No']
                    }
                ]
            },
            {
                title: 'Child Tax Credits End At',
                dataIndex: 'childTaxCreditsEndAt',
                key: 'childTaxCreditsEndAt',
                fields: [
                    {
                        type: 'Select',
                        name: 'childTaxCreditsEndAt',
                        placeholder: "-Select-",
                        values: child_tax_credits_end_ats
                    }
                ]
            },
        ]

        const rows = [];
        return (
            <div>
                <SubFormTable 
                    title="Include your children and any other dependents" 
                    rows={rows} 
                    colsFormat={colsFormat}
                    addNewButton={true}
                    cbFormChange={this.props.cbFormChange}
                ></SubFormTable>
                {/* <div style={{'textAlign': 'center'}}>
                    <Button type="link" onClick={this.addNewRow}>Add New</Button>
                </div> */}
            </div>
        )
    }
}


export default connect()(DependentsSubForm);