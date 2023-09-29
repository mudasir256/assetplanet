import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Table, Divider, Tag, Button, Row, Col, Input, DatePicker, Select, Icon } from 'antd';

import SubFormTable from '../../../../components/SubFormTable';
import PhoneNumber from '../../../../components/form/PhoneNumber';
import WebAddress from '../../../../components/form/WebAddress';
import Email from '../../../../components/form/Email';

const { Option } = Select;

class CharitySubForm extends Component {

    constructor(props) {
        super(props);

    }

    render() {        

        const colsFormat = [
            {
                title: 'Name of Charity',
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
                        name: 'notes',
                        placeholder: 'notes'
                    }
                ]
            },
        ];
          
        const rows = [];
        return (
            <div>
                <SubFormTable 
                    title="Add All Charities Here"
                    rows={rows}
                    colsFormat={colsFormat}
                    addNewButton={true}
                    cbFormChange={this.props.cbFormChange}
                ></SubFormTable>
            </div>
        )
    }
}


export default connect()(CharitySubForm);