import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Form, Button, Row, Col, DatePicker, Icon} from 'antd';

import Currency from '../../../../components/form/Currency';
import moment from 'moment';

const dateFormat = 'MM/DD/YYYY';

const formID = "CommittmentSubForm";
class CommittmentSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Committment Details',
            fields: [
                {
                    id: 'committmentDate',
                    title: 'When Future Committment Due',
                    value: data['committmentDate']
                },
                {
                    id: 'committmentAmount',
                    title: 'Future Committment Dollar Amount',
                    value: data['committmentAmount'],
                    type: 'currency'
                }
            ]
        }
    
        return formData;
    }

    constructor(props) {
        super(props);

        this.state = {
            enableNext: false,
            formData: {
                committmentDate: '',
                committmentAmount: ''
            }
        }

        this.goNextForm = this.goNextForm.bind(this);
        this.goPreviousForm = this.goPreviousForm.bind(this);
        this.updateFormData = this.updateFormData.bind(this);

        this.handleFormInputChange = this.handleFormInputChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);

    }

    componentDidMount() {
        this.updateFormData(this.props.subFormData);
    }

    updateFormData(newFormData){
        let formData = this.state.formData;
        if(newFormData.hasOwnProperty('fields')){
            for(var findex = 0; findex < newFormData.fields.length; findex++){
                if(newFormData.fields[findex]['id'] == 'committmentDate'){
                    formData['committmentDate'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'committmentAmount'){
                    formData['committmentAmount'] = newFormData.fields[findex]['value'];
                }
            }
    
            let enableNext = false;
            if(formData['committmentDate'] != '' && formData['committmentAmount'] != ''){
                enableNext = true;
            }

            this.setState({
                formData: formData,
                enableNext: enableNext
            })
        }
        
    }

    handleFormInputChange(name, value){
        
        let formData = this.state.formData;
        formData[name] = value;

        let newState = {
            formData: formData
        };

        if(formData['committmentDate'] != '' && formData['committmentAmount'] != ''){
            newState['enableNext'] = true;
        }
        else{
            newState['enableNext'] = false;
        }

        this.setState(newState);
    }

    handleInputChange(event){
        event.preventDefault();
        const {name, value} = event.target;
        this.handleFormInputChange(name, value);
    }

    handleSelectChange(name, value){
        this.handleFormInputChange(name, value);
    }

    handleDatePickerChange(name, date, dateString){
        this.handleFormInputChange(name, dateString);
    }


    goNextForm(bEnd = false){
        if(!this.state.enableNext){
            return;
        }

        let formData = CommittmentSubForm.FnCreateFormData({
            committmentDate: this.state.formData['committmentDate'],
            committmentAmount: this.state.formData['committmentAmount']
        })

        this.props.cbUpdateSubForm(formID, formData, true, bEnd);

        if(!bEnd){
            // this.props.cbGoSubForm("AssetPerformanceSubForm");
            this.props.cbGoNext(formID);
        }        
               
    }

    goPreviousForm(){
        // this.props.cbGoSubForm("VCSubForm");
        this.props.cbGoPrev(formID);
    }

    render() {
        
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Committment Details</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="When Future Committment Due">
                                <DatePicker 
                                    style={{ width: '100%' }} 
                                    format={dateFormat} 
                                    onChange={(date, dateString) => this.handleDatePickerChange('committmentDate', date, dateString)}
                                    value={this.state.formData.committmentDate == '' ? null : moment(this.state.formData.committmentDate, dateFormat)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Future Committment Dollar Amount">
                                <Currency 
                                    value={this.state.formData.committmentAmount} 
                                    name="committmentAmount" 
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
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


export default connect()(CommittmentSubForm);