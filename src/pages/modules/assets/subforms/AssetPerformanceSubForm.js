import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Button, Row, Col, Form, Icon, DatePicker, Select,Radio } from 'antd';
import Currency from '../../../../components/form/Currency';
import moment from 'moment';
import { RETURN_RATES } from 'constants/types';

const dateFormat = 'MM/DD/YYYY';
const { Option } = Select;
const stat = ["STFrank Jones"];

const pp = ["PPFrank Jones", "PPTracy Jones", "PPJoint"];

const ud = ["UDAIG", "UDAllstate", "UDAmerical Family", "UDAmerican Financial"];
const mc = ["MCAIG", "MCAllstate", "MCAmerical Family", "MCAmerican Financial"];
const formID = 'AssetPerformanceSubForm';
class AssetPerformanceSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Asset Performance',
            fields: [
                {
          id: "ror",
          title: "Rate Of Return",
          value: data["ror"],
        },
                {
                    id: 'monetaryValue',
                    title: 'Monetary Value',
                    value: data['monetaryValue'],
                    type: 'currency'
                },
                {
                    id: 'dateValue',
                    title: 'Value as of Date',
                    value: data['dateValue']
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
                returnRate: '',
                monetaryValue: '',
                dateValue: '',
                stat: "",
                pp: "",
                ud: "",
                mc: "",
                ror: ""
            }
        }

        this.goNextForm = this.goNextForm.bind(this);
        this.goPreviousForm = this.goPreviousForm.bind(this);
        this.updateFormData = this.updateFormData.bind(this);

        this.handleFormInputChange = this.handleFormInputChange.bind(this);
        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    componentDidMount() {
        this.updateFormData(this.props.subFormData);
    }

    updateFormData(newFormData){
        let formData = this.state.formData;
        if(newFormData.hasOwnProperty('fields')){
                    for(var findex = 0; findex < newFormData.fields.length; findex++){
                        if (newFormData.fields[findex]["id"] == "ror") {
                formData["ror"] = newFormData.fields[findex]["value"];
                }
              
                if(newFormData.fields[findex]['id'] == 'monetaryValue'){
                    formData['monetaryValue'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'dateValue'){
                    formData['dateValue'] = newFormData.fields[findex]['value'];
                }
            }
    
            let enableNext = false;
            if(formData['returnRate'] != '' && formData['monetaryValue'] != '' && formData['dateValue'] != ''){
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

        if(formData['returnRate'] != '' && formData['monetaryValue'] != '' && formData['dateValue'] != ''){
            newState['enableNext'] = true;
        }
        else{
            newState['enableNext'] = false;
        }

        this.setState(newState);

    }

    handleInputChange(event){
         if (event.target.name == "ror") {
      if (event.target.value == "Static") {
        this.setState({
          stat: true,
          pp: false,
          ud: false,
          mc: false,
        });
      } else if (event.target.value == "Professional Prediction") {
        this.setState({
          stat: false,
          pp: true,
          ud: false,
          mc: false,
        });
      } else if (event.target.value == "User Defined") {
        this.setState({
          stat: false,
          pp: false,
          ud: true,
          mc: false,
        });
      } else if (event.target.value == "Monte Carlo") {
        this.setState({
          stat: false,
          pp: false,
          ud: false,
          mc: true,
        });
      }
    }
   
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

    goNextForm(bEnd = false){

        if(!this.state.enableNext){
            return;
        }

        let formData = AssetPerformanceSubForm.FnCreateFormData({
            returnRate: this.state.formData['returnRate'],
            monetaryValue: this.state.formData['monetaryValue'],
            dateValue: this.state.formData['dateValue'],
             ror: this.state.formData["ror"],
        })
        this.props.cbUpdateSubForm(formID, formData, true, bEnd);

        if(!bEnd){
            // this.props.cbGoSubForm("TaxLiquiditySubForm");
            this.props.cbGoNext(formID);
        }
        
    }

    goPreviousForm(){
        // this.props.cbGoSubForm("StepAdditionalAssetInformation");
        this.props.cbGoPrev(formID);
    }

    getStatic() {
    return (
      <Row gutter={16} type="flex" justify="center">
        <Col span={16}>
          <Form.Item label="Static">
            <Select
              showSearch
              placeholder="-Select-"
              value={this.state.formData.stat}
              size={"large"}
              onChange={(value) => this.handleSelectChange("stat", value)}
            >
              {stat.map((stat, index) => (
                <Option key={index} value={stat}>
                  {stat}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    );
  }
  getPP() {
    return (
      <Row gutter={16} type="flex" justify="center">
        <Col span={16}>
          <Form.Item label="Professional Prediction">
            <Select
              showSearch
              placeholder="-Select-"
              value={this.state.formData.pp}
              size={"large"}
              onChange={(value) => this.handleSelectChange("pp", value)}
            >
              {pp.map((pp, index) => (
                <Option key={index} value={pp}>
                  {pp}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    );
  }
  getUD() {
    return (
      <Row gutter={16} type="flex" justify="center">
        <Col span={16}>
          <Form.Item label="User Defined">
            <Select
              showSearch
              placeholder="-Select-"
              value={this.state.formData.ud}
              size={"large"}
              onChange={(value) => this.handleSelectChange("ud", value)}
            >
              {ud.map((ud, index) => (
                <Option key={index} value={ud}>
                  {ud}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    );
  }
  getMC() {
    return (
      <Row gutter={16} type="flex" justify="center">
        <Col span={16}>
          <Form.Item label="Monte Carlo">
            <Select
              showSearch
              placeholder="-Select-"
              value={this.state.formData.mc}
              size={"large"}
              onChange={(value) => this.handleSelectChange("mc", value)}
            >
              {mc.map((mc, index) => (
                <Option key={index} value={mc}>
                  {mc}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    );
  }

    render() {
        return (
            <React.Fragment>
                <div className="info-form-block">    
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Asset Performance</h2>
                        </Col>
                    </Row> 
                    <Row gutter={16} type="flex" justify="center">
              <Col span={16}>
                <Form.Item label="Rate Of Return(if applicable)">
                  <Radio.Group
                    name="ror"
                    size={"large"}
                    onChange={(event) => this.handleInputChange(event)}
                    value={this.state.formData.ror}
                  >
                    <Radio.Button value="Static">Static</Radio.Button>
                    <Radio.Button value="Professional Prediction">
                      Professional Prediction
                    </Radio.Button>
                    <Radio.Button value="User Defined">
                      User Defined
                    </Radio.Button>
                    <Radio.Button value="Monte Carlo">Monte Carlo</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row> 
             {this.state.stat ? this.getStatic() : null}
                    {this.state.pp ? this.getPP() : null}
                    {this.state.ud ? this.getUD() : null}
                    {this.state.mc ? this.getMC() : null}            
                    {/* <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Rate of Return">
                                <Select
                                    showSearch
                                    placeholder="-Select-"
                                    value={this.state.formData.returnRate}
                                    onChange={(value) => this.handleSelectChange("returnRate", value)}
                                    size={'large'}
                                >
                                {
                                    RETURN_RATES.map((return_rate, index) => <Option key={index} value={return_rate}>{return_rate}</Option>)
                                }
                                </Select>                                
                            </Form.Item>
                        </Col>
                    </Row> */}
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Monetary Value">
                                <Currency 
                                    value={this.state.formData.monetaryValue} 
                                    name="monetaryValue" 
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Value as of Date">
                                <DatePicker 
                                    style={{ width: '100%' }} 
                                    size={'large'}
                                    format={dateFormat} 
                                    onChange={(date, dateString) => this.handleDatePickerChange('dateValue', date, dateString)}
                                    value={this.state.formData.dateValue == null || this.state.formData.dateValue == '' ? null : moment(this.state.formData.dateValue, dateFormat)}/>
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


export default connect()(AssetPerformanceSubForm);