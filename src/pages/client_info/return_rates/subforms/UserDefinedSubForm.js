import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Form, Button, Row, Col, InputNumber, Icon } from 'antd';
import SubFormTable from '../../../../components/SubFormTable';

import moment from 'moment';
import uuidv1 from 'uuid/v1';

var formChanged = false;
var formData = [];

const formID = "UserDefinedSubForm";
class UserDefinedSubForm extends Component {

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

        this.goNextForm = this.goNextForm.bind(this);
        this.formChange = this.formChange.bind(this);

        this.updateFormData = this.updateFormData.bind(this);

        this.handleFormInputChange = this.handleFormInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);

    }

    componentDidMount() {
        this.updateFormData(this.props.subFormData);
    }

    updateFormData(newFormData){
        console.log('updateformdata:', newFormData);
        if(newFormData.hasOwnProperty('data')){
            let newRows = [];
            let years = '';
            for(var index = 0; index < newFormData['data'].length; index++){
                newRows.push({
                    key: newFormData['data'][index]['id'],
                    uuid: newFormData['data'][index]['id'],
                    id: newFormData['data'][index]['id'],
                    year: newFormData['data'][index]['year'],
                    percent: newFormData['data'][index]['percent']
                })

                years = newFormData['data'][index]['howManyYears'];
            }

            this.setState({
                rows: newRows,
                formData: {
                    years: years
                }
            })
        }
        
    }

    handleFormInputChange(name, value){
        
        let formData = this.state.formData;
        formData[name] = value;

        let newState = {
            formData: formData
        };

        this.setState(newState);
    }

    handleSelectChange(name, value){
        this.handleFormInputChange(name, value);
    }

    goNextForm(){
        if(!this.state.enableNext){
            return;
        }

        if(formChanged){
            let newFormData = [];
            for(var index = 0; index < formData.length; index++){
                newFormData.push({
                    year: '' + formData[index]['year'],
                    percent: formData[index]['percent'] != '' ? parseInt(formData[index]['percent']) : 0,
                    howManyYears: this.state.formData.years != '' ? parseInt(this.state.formData.years) : 0
                })
            }
            this.props.cbUpdateSubForm(formID, newFormData, false);
        }     

        this.props.cbGoSubForm("MonteCarloSubForm");
               
    }

    
     goPrevForm(){
        if(!this.state.enablePrev){
            return;
        }

//let formData = UserDefinedSubForm.FnCreateFormData({
  //          static: this.state.formData['static']
    //    })

        this.props.cbUpdateSubForm(formID, formData);

        this.props.cbGoSubForm("ChoosePredictionSubForm");
               
    }
    

    
    
    formChange(rows){
        formChanged = true;
        formData = rows;
    }

    applyYears(){
        let newRows = [];
        let years = parseInt(this.state.formData.years);

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

        this.setState({
            rows: newRows
        })
    }
    goPreviousForm(){
        this.props.cbGoSubForm("ChoosePredictionSubForm");
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
                <div className="info-form-block pl-5 pr-5">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">User Defined Return</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col>
                            <Form.Item label="How Many Years">
                                <Row gutter={16} type="flex" justify="center">
                                    <Col span={16}>
                                        <InputNumber 
                                            style={{ width: "100%"}} 
                                            value={this.state.formData.years} 
                                            name="years" 
                                            size={'large'}
                                            onChange={(value) => this.handleSelectChange("years", value)}
                                        />
                                    </Col>
                                    <Col span={16}>
                                        <Button type="primary" onClick={() => this.applyYears()}>Apply</Button>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Col>
                    </Row>
                    <SubFormTable 
                        title="User Defined Return" 
                        rows={this.state.rows} 
                        colsFormat={colsFormat}
                        addNewButton={false}
                        cbFormChange={this.formChange}
                    >
                    </SubFormTable>
                </div>
                <div className="row justify-content-between">
                    <div className="col-8">
                        <Button type="primary" size={'large'} onClick={() => this.goPreviousForm()}>
                            <Icon type="left" />
                            Previous
                        </Button>
                    </div>
                    <div className="col-4 d-flex justify-content-end">
                        {
                            this.props.dataID != null && 
                            <Button type="primary" size={'large'} style={{marginRight: '10px'}} onClick={() => this.goNextForm(true)}>
                                Update
                            </Button>
                        }
                        <Button type="primary" disabled={ !this.state.enableNext } size={'large'} onClick={() => this.goNextForm()}>
                            Next
                            <Icon type="right" />
                        </Button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(UserDefinedSubForm);