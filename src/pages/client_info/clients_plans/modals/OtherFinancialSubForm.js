import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Table, Divider, Tag, Button, Row, Col, Input, DatePicker, Select, Icon } from 'antd';
import PhoneNumber from '../../../../components/form/PhoneNumber';

import SubFormTable from '../../../../components/SubFormTable';
import Email from '../../../../components/form/Email';
import WebAddress from '../../../../components/form/WebAddress';

const { Option } = Select;

class OtherFinancialSubForm extends Component {

    constructor(props) {
        super(props);

    }

    render() {        

        const relations = [
            'Child', 'Parent', 'Grandparent', 'GrandChild'
        ]
        
        const colsFormat = [
            {
                title: 'Relationship',
                dataIndex: 'relationship',
                key: 'relationship',
                fields: [
                    {
                        type: 'Select',
                        name: 'relationship',
                        placeholder: '-Select-',
                        values: relations
                    }
                ]
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                fields: [
                    {
                        type: 'Input',
                        name: 'firstName',
                        placeholder: 'First Name'
                    },
                    {
                        type: 'Input',
                        name: 'lastName',
                        placeholder: 'Last Name'
                    }
                ]
            },
            {
                title: 'Phone Number',
                dataIndex: 'contactNumber',
                key: 'contactNumber',
                fields: [
                    {
                        type: 'PhoneNumber',
                        name: 'contactNumber'
                    }
                ]
            },
            {
                title: 'Web Address',
                dataIndex: 'website',
                key: 'website',
                fields: [
                    {
                        type: 'WebAddress',
                        name: 'website'
                    }
                ]
            },
            {
                title: 'Email',
                dataIndex: 'emailAddress',
                key: 'emailAddress',
                fields: [
                    {
                        type: 'Email',
                        name: 'emailAddress'
                    }
                ]
            },
            {
                title: 'Contact Person',
                dataIndex: 'contact_person',
                key: 'contact_person',
                fields: [
                    {
                        type: 'Input',
                        name: 'contactPersonFirstName',
                        placeholder: 'First Name'
                    },
                    {
                        type: 'Input',
                        name: 'contactPersonLastName',
                        placeholder: 'Last Name'
                    }
                ]
            },
            {
                title: 'Notes',
                dataIndex: 'notes',
                key: 'notes',
                fields: [
                    {
                        type: 'TextArea',
                        name: 'notes'
                    }
                ]
            },
        ];
          
        const rows = [];
        return (
            <div>
                <SubFormTable 
                    title="Others Financially Impacted By This Plan"
                    rows={rows}
                    colsFormat={colsFormat}
                    addNewButton={true}
                    cbFormChange={this.props.cbFormChange}
                ></SubFormTable>
            </div>
        )
    }
}


export default connect()(OtherFinancialSubForm);