import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Form, Button, Row, Col, Input, Icon } from 'antd';

const formID = "StaticSubForm";
class StaticSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'State Rate of Return',
            fields: [
                {
                    id: 'static',
                    title: 'Static',
                    value: data['static']
                }
            ]
        }

        return formData
    }

    constructor(props) {
        super(props);

        this.state = {
            enableNext: false,
            enablePrev: true,
            formData: {
                static: '',
            }
        }

        this.goNextForm = this.goNextForm.bind(this);
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
                if(newFormData.fields[findex]['id'] == 'static'){
                    formData['static'] = newFormData.fields[findex]['value'];
                }                
            }
    
            let enableNext = false;
            if(formData['static'] != ''){
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

        if(formData['static'] != ''){
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


    goNextForm(){
        if(!this.state.enableNext){
            return;
        }

        let formData = StaticSubForm.FnCreateFormData({
            static: this.state.formData['static']
        })

        this.props.cbUpdateSubForm(formID, formData);

        this.props.cbGoSubForm("ChoosePredictionSubForm");
               
    }

    render() {
        return (
            <React.Fragment>
                <div className="info-form-block pl-5 pr-5">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Static Rate of Return</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={8}>
                            <Form.Item label="Static">
                                <Input 
                                    addonAfter="%" 
                                    value={this.state.formData.static} 
                                    name="static" 
                                    size={'large'}
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
                <div className="d-flex justify-content-end">
                    <Button type="primary" size={'large'} onClick={() => this.goNextForm()}>
                        Next
                        <Icon type="right" />
                    </Button>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(StaticSubForm);