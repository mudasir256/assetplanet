import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Form, Table, Divider, Tag, Button, Row, Col, Input, DatePicker, Select, Radio, InputNumber, Modal } from 'antd';
import SubFormTable from '../../../../components/SubFormTable';

import Currency from '../../../../components/form/Currency';

import uuidv1 from 'uuid/v1';
import moment from 'moment';
const dateFormat = 'MM/DD/YYYY';   

var formChanged = false;
var formData = [];

class UserDefinedSubFormModalForm extends Component {
     constructor(props) {
        super(props);

        this.state = {
            enableNext: true,
            enablePrev: true,
            formData: {
                years: '',
            },
            rows: []
        }
        this.handleFormInputChange = this.handleFormInputChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);

    }

    componentDidMount(){
        
    } 
   
    handleFormInputChange(name, value){
        
        let formData = this.state.formData;
        formData[name] = value;

        let newState = {
            formData: formData
        };

        this.setState(newState);
        this.props.cbUpdatedForm(formData);
    }

    handleInputChange(event){
        event.preventDefault();
        const {name, value} = event.target;
        this.handleFormInputChange(name, value);
    }

    handleDatePickerChange(name, date, dateString){
        this.handleFormInputChange(name, dateString);
    }

    handleSelectChange(name, value){
        this.handleFormInputChange(name, value);
    }

//
//    let formData = UserDefinedSubForm.FnCreateFormData({
//            static: this.state.formData['static']
//        })
//
//        this.props.cbUpdateSubForm(formID, formData);
//
//        this.props.cbGoSubForm("ChoosePredictionSubForm");
//               
//    }
//    
    
      formChange(rows){
        formChanged = true;
        formData = rows;
    }

    applyYears(){
        
        let newRows = [];
        let years = parseInt(this.state.formData.years);
        //let years = parseInt(this.state.formData.years);
console.log('hello', years);
        console.log('hello', newRows);
        var year = parseInt(moment().format('YYYY'));

        for(var index = 0; index < years; index++){
            newRows.push({
                uuid: uuidv1(),
                key: uuidv1(),
                id: uuidv1(),
                year: year + index,
                // percent: index
            })
        }
        
        console.log('newRows.push', newRows.push);
        console.log('newRows', newRows);
        this.setState({
            rows: newRows          
        })
        
    }

    render() {

        
            const colsFormat = [
            {
                title: 'Year',
                dataIndex: 'year',
                key: 'year',
                fields: [
                    {
                        type: 'Input',
                        name: 'year',
                        disabled: true
                    }
                ]
            },
            {
                title: 'Percent',
                dataIndex: 'percent',
                key: 'percent',
                fields: [
                    {
                        type: 'Percent',
                        name: 'percent'
                    }
                ]
            }
        ];

        
        
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <h4 className="title">User Defined Return</h4>
                    <Row gutter={16}>
                        <Col>
                            <Form.Item label="How Many Years">
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <InputNumber style={{ width: "100%"}} value={this.state.formData.howManyYears} name="years" onChange={(value) => this.handleSelectChange("howManyYears", value)}/>
                                    </Col>
                                    <Col span={8}>
                                        <Button type="primary" onClick={() => this.applyYears()}>Apply</Button>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}

class UserDefinedSubFormModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formData: {}
        }

        this.updatedForm = this.updatedForm.bind(this);
    }

    
    
    
    
    componentDidMount(){
        
    }

    renderBody(){
        return (
            <UserDefinedSubFormModalForm
                cbUpdatedForm={this.updatedForm}
                formData={this.props.formData}
            ></UserDefinedSubFormModalForm>
        )
    }

    updatedForm(formData){
        this.setState({
            formData: formData
        })
    }

    renderFooter(){
        return (
            <React.Fragment>
                <Button type="primary" onClick={() => this.props.cbSave(this.state.formData)}>
                    {
                        this.props.formData.hasOwnProperty('id') && 
                        <React.Fragment>Update</React.Fragment>
                    }
                    {
                        !this.props.formData.hasOwnProperty('id') && 
                        <React.Fragment>Add</React.Fragment>
                    }
                </Button>{' '}
                <Button onClick={this.props.cbCancel}>Cancel</Button>
            </React.Fragment>
        )
    }

    render() {
        
         const colsFormat = [
            {
                title: 'Years',
                dataIndex: 'year',
                key: 'year',
                fields: [
                    {
                        type: 'Input',
                        name: 'year',
                        disabled: true
                    }
                ]
            },
            {
                title: 'Percent',
                dataIndex: 'percent',
                key: 'percent',
                fields: [
                    {
                        type: 'Percent',
                        name: 'percent'
                    }
                ]
            }
        ];
        
        
        
        
        
        
        return (
            <Modal 
                width="80vw"
                centered
                visible={this.props.visible}
                footer={this.renderFooter()}
                onCancel={this.props.cbCancel}
            >
                {this.renderBody()}
            </Modal>
        )
    }
}




export default connect()(UserDefinedSubFormModal);





////                    <SubFormTable 
////                        title="User Defined Return" 
////                        rows={this.state.rows} 
////                        colsFormat={colsFormat}
////                        addNewButton={false}
////                        cbFormChange={this.formChange}
////                    >
////                    </SubFormTable>
//                </div>
//                <div>
//                    <Button type="primary" disabled={ !this.state.enablePrev } onClick={() => this.goPrevForm()}>Previous</Button>       
//                            
//                    <Button type="primary" disabled={ !this.state.enableNext } onClick={() => this.goNextForm()}>Next</Button>
//                </div>



//
//    
//     goPrevForm(){
//        if(!this.state.enablePrev){
//            return;
//        }