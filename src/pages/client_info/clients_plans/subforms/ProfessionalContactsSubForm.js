import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Form, Table, Divider, Tag, Button, Row, Col, Input, DatePicker, Select, Radio } from 'antd';

import SubFormTable from '../../../../components/SubFormTable';
import Currency from '../../../../components/form/Currency';
import moment from 'moment';

const dateFormat = 'MM/DD/YYYY';

const professions = [
    'Bookkeeper', 'CPA', 'Financial Advisor', 'Insurance Agent', 'Lawyer - Corporate', 'Lawyer - Divorce', 'Lawyer - Estate', 'Tax Professional'
]

var formChanged = false;
var formData = [];

const formID = "ProfessionalContactsSubForm";
class ProfessionalContactsSubForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            enableNext: true,
            formData: {
                
            },
            rows:[]
        }

        this.goNextForm = this.goNextForm.bind(this);
        this.formChange = this.formChange.bind(this);

        this.updateFormData = this.updateFormData.bind(this);

    }

    componentDidMount() {
        this.updateFormData(this.props.subFormData);
    }

    updateFormData(newFormData){
        console.log('updateformdata:', newFormData);
        if(newFormData.hasOwnProperty('data')){
            let newRows = [];
            for(var index = 0; index < newFormData['data'].length; index++){
                newRows.push({
                    key: newFormData['data'][index]['id'],
                    uuid: newFormData['data'][index]['id'],
                    id: newFormData['data'][index]['id'],
                    firstName: newFormData['data'][index]['firstName'],
                    lastName: newFormData['data'][index]['lastName'],
                    company: newFormData['data'][index]['company'],
                    emailAddress: newFormData['data'][index]['emailAddress'],
                    officeContactNumber: newFormData['data'][index]['officeContactNumber'],
                    mobileContactNumber: newFormData['data'][index]['mobileContactNumber'],
                    profession: newFormData['data'][index]['profession'],
                })
            }

            this.setState({
                rows: newRows
            })
        }
    }

    goNextForm(){
        if(!this.state.enableNext){
            return;
        }

        if(formChanged){
            let newFormData = [];
            for(var index = 0; index < formData.length; index++){
                newFormData.push({
                    firstName: formData[index]['firstName'],
                    lastName: formData[index]['lastName'],
                    company: formData[index]['company'],
                    emailAddress: formData[index]['emailAddress'],
                    officeContactNumber: formData[index]['officeContactNumber'],
                    mobileContactNumber: formData[index]['mobileContactNumber'],
                    profession: formData[index]['profession']
                })
            }
            this.props.cbUpdateSubForm(formID, newFormData, false);
        }     

        this.props.cbGoSubForm("EndSubForm");
               
    }

    formChange(rows){
        formChanged = true;
        formData = rows;
    }

    render() {
        
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

        return (
            <React.Fragment>
                <SubFormTable 
                    title="Professional Contacts" 
                    rows={this.state.rows} 
                    colsFormat={colsFormat}
                    addNewButton={true}
                    cbFormChange={this.formChange}
                >
                </SubFormTable>
                <div>
                    <Button type="primary" onClick={() => this.goNextForm()}>Next</Button>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(ProfessionalContactsSubForm);