import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Table, Divider, Tag, Button, Row, Col, Input, DatePicker, Select } from 'antd';

import PhoneNumber from '../../../../components/form/PhoneNumber';

import SubFormTable from '../../../../components/SubFormTable';

const { Option } = Select;



class ProfessionalContactSubForm extends Component {

    constructor(props) {
        super(props);

    }

    render() {        
        
        const professions = [
            'Bookkeeper', 'CPA', 'Financial Advisor', 'Insurance Agent', 'Lawyer - Corporate', 'Lawyer - Divorce', 'Lawyer - Estate', 'Tax Professional'
        ]

        const colsFormat = [
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
                title: 'Company Name',
                dataIndex: 'company',
                key: 'company',
                fields: [
                    {
                        type: 'Input',
                        name: 'company'
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
                title: 'Phone Number - Office',
                dataIndex: 'officeContactNumber',
                key: 'officeContactNumber',
                fields: [
                    {
                        type: 'PhoneNumber',
                        name: 'officeContactNumber'
                    }
                ]
            },
            {
                title: 'Phone Number - Mobile',
                dataIndex: 'mobileContactNumber',
                key: 'mobileContactNumber',
                fields: [
                    {
                        type: 'PhoneNumber',
                        name: 'mobileContactNumber'
                    }
                ]
            },
            {
                title: 'Profession',
                dataIndex: 'profession',
                key: 'profession',
                fields: [
                    {
                        type: 'Select',
                        name: 'profession',
                        placeholder: '-Select-',
                        values: professions
                    }
                ]
            },
        ];
        const rows = [];
        return (
            <div>
                <SubFormTable 
                    title="Professional Contacts" 
                    rows={rows}
                    colsFormat={colsFormat}
                    addNewButton={true}
                    cbFormChange={this.props.cbFormChange}
                ></SubFormTable>
            </div>
        )
    }
}


export default connect()(ProfessionalContactSubForm);