import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Form, Icon, Button, Row, Col, Input,Select } from 'antd';
import Currency from '../../../../components/form/Currency';
import {
  CLIENT_TYPE,

} from "constants/types";
const formID = "MilitaryBenefitsSubForm";
const { Option } = Select;
// const { Panel } = Collapse;
class MilitaryBenefitsSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Military Benefits',
            fields: [
                {
                    id: 'stateTax',
                    title: 'Amount Subject to State Tax',
                    value: data['stateTax']
                },
                {
                    id: 'payeeSurvivorBenefits',
                    title: 'Payee of Survivor Benefits',
                    value: data['payeeSurvivorBenefits']
                },
                {
                    id: 'percentToSurvivor',
                    title: 'Percent To Survivor',
                    value: data['percentToSurvivor']
                }
            ]
        }

        return formData
    }

    constructor(props) {
        super(props);

        this.state = {
            enableNext: false,
            formData: {
                stateTax: '',
                payeeSurvivorBenefits: '',
                percentToSurvivor: ''
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
                if(newFormData.fields[findex]['id'] == 'stateTax'){
                    formData['stateTax'] = newFormData.fields[findex]['value'];
                }   
                if(newFormData.fields[findex]['id'] == 'payeeSurvivorBenefits'){
                    formData['payeeSurvivorBenefits'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'percentToSurvivor'){
                    formData['percentToSurvivor'] = newFormData.fields[findex]['value'];
                }        
            }
    
            let enableNext = false;
            // if(formData['insuranceProduct'] != ''){
            //     enableNext = true;
            // }

            enableNext = true;

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

        if(formData['insuranceProduct'] != ''){
            newState['enableNext'] = true;
        }
        else{
            newState['enableNext'] = false;
        }

        newState['enableNext'] = true;

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

        let formData = MilitaryBenefitsSubForm.FnCreateFormData({
            stateTax: this.state.formData['stateTax'],
            payeeSurvivorBenefits: this.state.formData['payeeSurvivorBenefits'],
            percentToSurvivor: this.state.formData['percentToSurvivor']
        })

        this.props.cbUpdateSubForm(formID, formData);
        
        this.props.cbGoSubForm("IncomeTaxationSubForm");

    }

    goPreviousForm(){
        this.props.cbGoSubForm("IncomeDetailsSubForm");
    }

    render() {
        
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Military Benefits</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Amount Subject to State Tax">   
                                <Currency value={this.state.formData.stateTax} name="stateTax" onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Col>
                <Form.Item label="Payee of Survivor Benefits">
                  <Select
                    showSearch
                    placeholder="-Select-"
                    value={this.state.formData.payeeSurvivorBenefits}
                    name="payeeSurvivorBenefits" onChange={(value) =>
                      this.handleSelectChange("payeeSurvivorBenefits", value)
                    }
                    // size={size}
                  >
                    {CLIENT_TYPE.map((client, index) => (
                      <Option key={index} value={client}>
                        {client}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Col>
          </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Percent To Survivor">   
                                <Input addonAfter="%" size={'large'} value={this.state.formData.percentToSurvivor} name="percentToSurvivor" onChange={(event) => this.handleInputChange(event)}/>
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


export default connect()(MilitaryBenefitsSubForm);