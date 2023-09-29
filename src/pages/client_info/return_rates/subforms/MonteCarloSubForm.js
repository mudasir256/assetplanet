import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Button, Row, Col, Icon } from 'antd';

import SubFormTable from '../../../../components/SubFormTable';

var formChanged = false;
var formData = [];

const formID = "MonteCarloSubForm";
class MonteCarloSubForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            enableNext: true,
            enablePrev: true,
            formData: {
                
            },
            rows: []
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
                    description: newFormData['data'][index]['description'],
                    years: newFormData['data'][index]['howManyYears'],
                    highBand: newFormData['data'][index]['highBand'],
                    lowBand: newFormData['data'][index]['lowBand'],
                    expectedAverage: newFormData['data'][index]['expectedAverage'],
                    startYear: newFormData['data'][index]['startYear'],
                    regenerate: newFormData['data'][index]['regenerate'],
                    average	: newFormData['data'][index]['average']
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
                    description: formData[index]['description'],
                    howManyYears: formData[index]['years'] != '' ? parseInt(formData[index]['years']) : 0,
                    highBand: formData[index]['highBand'] != '' ? parseInt(formData[index]['highBand']) : 0,
                    lowBand: formData[index]['lowBand'] != '' ? parseInt(formData[index]['lowBand']) : 0,
                    expectedAverage: formData[index]['expectedAverage'] != '' ? parseInt(formData[index]['expectedAverage']) : 0,
                    startYear: formData[index]['startYear'],
                    regenerate: formData[index]['regenerate'],
                    average: formData[index]['average'],
                })
            }
            this.props.cbUpdateSubForm(formID, newFormData, false);
        }     

        this.props.cbGoSubForm("EndSubForm");
               
    }

    
        goPrevForm(){
        if(!this.state.enablePrev){
            return;
        }

 //       let formData = StaticSubForm.FnCreateFormData({
//            static: this.state.formData['static']
  //      })

        this.props.cbUpdateSubForm(formID, formData);

        this.props.cbGoSubForm("UserDefinedSubForm");
               
    }
    
    
    
    
    
    formChange(rows){
        formChanged = true;
        formData = rows;
    }
    goPreviousForm(){
        this.props.cbGoSubForm("UserDefinedSubForm");
    }

    render() {
        
        const colsFormat = [
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
                fields: [
                    {
                        type: 'TextArea',
                        name: 'description'
                    }
                ]
            },
            {
                title: 'How Many Years',
                dataIndex: 'years',
                key: 'years',
                fields: [
                    {
                        type: 'Input',
                        name: 'years'
                    }
                ]
            },
            {
                title: 'High Band',
                dataIndex: 'highBand',
                key: 'highBand',
                fields: [
                    {
                        type: 'Percent',
                        name: 'highBand'
                    }
                ]
            },
            {
                title: 'Low Band',
                dataIndex: 'lowBand',
                key: 'lowBand',
                fields: [
                    {
                        type: 'Percent',
                        name: 'lowBand'
                    }
                ]
            },
            {
                title: 'Expected Average',
                dataIndex: 'expectedAverage',
                key: 'expectedAverage',
                fields: [
                    {
                        type: 'Input',
                        name: 'expectedAverage'
                    }
                ]
            },
            {
                title: 'Start Year',
                dataIndex: 'startYear',
                key: 'startYear',
                fields: [
                    {
                        type: 'Input',
                        name: 'startYear'
                    }
                ]
            },
            {
                title: 'Regenerate',
                dataIndex: 'regenerate',
                key: 'regenerate',
                fields: [
                    {
                        type: 'Checkbox',
                        name: 'regenerate'
                    }
                ]
            },
            {
                title: 'Average',
                dataIndex: 'average',
                key: 'average',
                fields: [
                    {
                        type: 'Input',
                        name: 'average'
                    }
                ]
            }
        ];
          
        return (
            <React.Fragment>
                <div className="info-form-block pl-5 pr-5">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Monte Carlo Rate of  Return</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col>
                            <SubFormTable 
                                title="Add New Monte Carlo" 
                                rows={this.state.rows} 
                                colsFormat={colsFormat}
                                addNewButton={true}
                                cbFormChange={this.formChange}
                            >
                            </SubFormTable>
                        </Col>
                    </Row>
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


export default connect()(MonteCarloSubForm);