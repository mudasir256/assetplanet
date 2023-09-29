import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Form, Row, Col, Input, Radio, Button, Icon } from 'antd';

const formID = "VCSubForm";
class VCSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Private Placement & VC',
            fields: [
                {
                    id: 'nickname',
                    title: 'Nickname',
                    value: data['nickname']
                },
                {
                    id: 'additionalCommittments',
                    title: 'Additional Future Committments',
                    value: data['additionalCommittments']
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
                nickname: '',
                additionalCommittments: ''
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
                if(newFormData.fields[findex]['id'] == 'nickname'){
                    formData['nickname'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'additionalCommittments'){
                    formData['additionalCommittments'] = newFormData.fields[findex]['value'];
                }
            }
    
            let enableNext = false;
            if(formData['nickname'] != '' && formData['additionalCommittments'] != ''){
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

        if(formData['nickname'] != '' && formData['additionalCommittments'] != ''){
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

        let formData = VCSubForm.FnCreateFormData({
            nickname: this.state.formData['nickname'],
            additionalCommittments: this.state.formData['additionalCommittments']
        })

        this.props.cbUpdateSubForm(formID, formData, true, bEnd);

        if(!bEnd){
            // if(this.state.formData['additionalCommittments'] == 'Yes'){
            //     this.props.cbGoSubForm("CommittmentSubForm");
            // }
            // else{
            //     this.props.cbGoSubForm("AssetPerformanceSubForm");
            // }
            this.props.cbGoNext(formID);
        }       
               
    }

    goPreviousForm(){
        // this.props.cbGoSubForm("StepQuestionContributionDistributionSubForm");
        this.props.cbGoPrev(formID);
    }

    render() {
        
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Private Placement &amp; VC</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Nickname">
                                <Input value={this.state.formData.nickname} name="nickname" size={'large'} onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Additional Future Committments">
                                <Radio.Group name="additionalCommittments" size={'large'} onChange={(event) => this.handleInputChange(event)} value={this.state.formData.additionalCommittments}>
                                    <Radio value="Yes">Yes</Radio>
                                    <Radio value="No">No</Radio>
                                </Radio.Group>
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


export default connect()(VCSubForm);