import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Form, Icon, Button, Row, Col, Input, InputNumber, DatePicker, Select, Radio, Collapse } from 'antd';

import { INSURANCE_TYPES_PROPERTY_CASUALTY } from 'constants/types';
import SubFormTable from "../../../../components/SubFormTable";
import moment from 'moment';

const dateFormat = 'MM/DD/YYYY';

const { Option } = Select;
const { Panel } = Collapse;
var formChanged = false;
let formDataa = [];
const owners = [
    'Frank Jones', 'Tracy Jones', 'Joint'
]

const insures = [
    'Frank Jones', 'Tracy Jones', 'Joint'
]

const carriers = [
    'AIG', 'Allstate', 'Americal Family', 'American Financial','Amtrust',
'Assurant',
'Auto Owners Group',
'Berkshire Hathaway',
'Chubb Inc',
'Chubb Ltd',
'Cincinnati Financial',
'CNA',
'Erie Insurance',
'Farmers',
'Hartford',
'Liberty Mutual',
'Nationwide',
'Progressive',
'QBE',
'State Farm',
'Tokio Marine',
'Travelers',
'USAA',
'W. R. Berkley',
'Zurich',
]

const formID = "ProductInformationSubForm";
class ProductInformationSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Product Information',
            fields: [
                {
                    id: 'nickname',
                    title: 'Nickname',
                    value: data['nickname']
                },
                {
                    id: 'owner',
                    title: 'Owner',
                    value: data['owner']
                },
                {
                    id: 'policyStartDate',
                    title: 'Policy Start Date',
                    value: data['policyStartDate']
                },
                {
                    id: 'policyEndDate',
                    title: 'Policy End Date',
                    value: data['policyEndDate']
                },
                {
                    id: 'insure',
                    title: 'Insured',
                    value: data['insure']
                },                
                {
                    id: 'addBeneficiaries',
                    title: 'Add Beneficiaries',
                    value: data['addBeneficiaries']
                },
                // {
                //     id: 'beneficiaryName',
                //     title: 'Name of Beneficiary',
                //     value: data['beneficiaryName']
                // },
                // {
                //     id: 'percent',
                //     title: 'Percent',
                //     value: data['percent']
                // },
                {
                    id: 'carrier',
                    title: 'Carrier',
                    value: data['carrier']
                },
                {
                    id: 'policy',
                    title: 'Policy Number',
                    value: data['policy']
                },
                
            ],
              BeneficiaryAssignment: {
        tittle: "Asset Beneficiary Assignment",
        rows: data.rows,
      },
        }

        return formData
    }

    constructor(props) {
        super(props);

        this.state = {
            enableNext: false,
            formData: {
                nickname: '',
                owner: '',
                policyStartDate: '',
                policyEndDate: '',
                insure: '',                
                addBeneficiaries: '',
                beneficiaryName: '',
                percent: '',
                policy: '',
                carrier: '',
                rows: [],
            }
        }

        this.goNextForm = this.goNextForm.bind(this);
        this.goPreviousForm = this.goPreviousForm.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.formChange = this.formChange.bind(this);
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
         if (
      newFormData.BeneficiaryAssignment &&
      newFormData.BeneficiaryAssignment.rows
    )
      this.setState({ rows: newFormData.BeneficiaryAssignment.rows });
        if(newFormData.hasOwnProperty('fields')){
            for(var findex = 0; findex < newFormData.fields.length; findex++){
                if(newFormData.fields[findex]['id'] == 'nickname'){
                    formData['nickname'] = newFormData.fields[findex]['value'];
                }   
                if(newFormData.fields[findex]['id'] == 'owner'){
                    formData['owner'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'policyStartDate'){
                    formData['policyStartDate'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'policyEndDate'){
                    formData['policyEndDate'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'insure'){
                    formData['insure'] = newFormData.fields[findex]['value'];
                }                  
                if(newFormData.fields[findex]['id'] == 'addBeneficiaries'){
                    formData['addBeneficiaries'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'beneficiaryName'){
                    formData['beneficiaryName'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'percent'){
                    formData['percent'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'policy'){
                    formData['policy'] = newFormData.fields[findex]['value'];
                }    
                if(newFormData.fields[findex]['id'] == 'carrier'){
                    formData['carrier'] = newFormData.fields[findex]['value'];
                }             
            }
    
            let enableNext = false;
            if(formData['insuranceProduct'] != ''){
                enableNext = true;
            }

            this.setState({
                formData: formData,
                enableNext: enableNext
            });
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
 let newFormDataa = [];
    let depindex = 0;
    let rows = [];
    formDataa = [];
    let total = 0;
    rows = this.state.rows;
        let formData = ProductInformationSubForm.FnCreateFormData({
            nickname: this.state.formData['nickname'],
            owner: this.state.formData['owner'],
            policyStartDate: this.state.formData['policyStartDate'],
            policyEndDate: this.state.formData['policyEndDate'],
            insure: this.state.formData['insure'],
            addBeneficiaries: this.state.formData['addBeneficiaries'],
            // beneficiaryName: this.state.formData['beneficiaryName'],
            // percent: this.state.formData['percent'],
            carrier: this.state.formData['carrier'],
            policy: this.state.formData['policy'],
            rows: this.state.rows,
        })

        this.props.cbUpdateSubForm(formID, formData, true, bEnd);
        
        var insurceTypeField = this.props.cbGetSubFormField('InsuranceTypeSubForm', 'insuranceType');

        if(insurceTypeField != null){
            switch(insurceTypeField.value){
                case 'Long Term Disability':
                case 'Long Term Care':
                case 'Long Term Care - Hybrid':
                    this.props.cbGoSubForm("LongTermInformationSubForm");
                    break;
                case 'Automobile':
                    this.props.cbGoSubForm("AutoInsuranceInformationSubForm");
                    break;
                default: 
                    this.props.cbGoSubForm("FinancialInformationSubForm");
    
            }
        }
    // for (var index = 0; index < rows.length; index++) {
    //   newFormDataa.push({
    //     name: rows[index]["beneficiariesName"],
    //     percentage:
    //       rows[index]["percent"] != "" ? parseInt(rows[index]["percent"]) : 0,
    //   });
    //   depindex = index + 1;
    //   formDataa.push({
    //     title: "New " + depindex + " Information",
    //     uuid: rows[index]["uuid"],
    //     key: rows[index]["key"],
    //     fields: [
    //       {
    //         id: "beneficiariesName",
    //         title: "Trust Name",
    //         value: newFormDataa[index]["name"],
    //       },

    //       {
    //         id: "percent",
    //         title: "Beneficiaries Percentage",
    //         value: newFormDataa[index]["percentage"],
    //       },
    //     ],
    //   });
    //   console.log(formDataa[index]);
    //   this.props.cbUpdateSubForm(
    //     formID + "" + index,
    //     formDataa[index],
    //     true,
    //     bEnd
    //   );
    // }

        this.props.cbGoNext(formID);

    }

    goPreviousForm(){
        // this.props.cbGoSubForm("InsuranceTypeSubForm");
        this.props.cbGoPrev(formID);
    }
 formChange(rows) { 
     console.log(rows);
    formChanged = true;
    this.setState({ rows: rows });
    // formData = rows;
  }

    render() {

           const { size } = this.state;
    const colsFormat = [
      {
        title: "Beneficiaries",
        dataIndex: "beneficiariesName",
        key: "beneficiariesName",
        fields: [
          {
            type: "Select",
            name: "beneficiariesName",
            placeholder: "-Select Name-",
            values: ["Name 1", "Name 2"],
          },
        ],
      },
      {
        title: "Percent",
        dataIndex: "percent",
        key: "percent",
        fields: [
          {
            type: "Percent",
            name: "percent",
            placeholder: "Percentage",
          },
        ],
      },
    ];

        var insurceTypeField = this.props.cbGetSubFormField('InsuranceTypeSubForm', 'insuranceType');
        let bPropertyCasualty = false;
        if(insurceTypeField != null){
            for(var index = 0; index < INSURANCE_TYPES_PROPERTY_CASUALTY.length; index++){
                if(INSURANCE_TYPES_PROPERTY_CASUALTY[index]['name'] == insurceTypeField.value){
                    bPropertyCasualty = true;
                    break;
                }
            }
        }
        
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Product Information</h2>
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
                            <Form.Item label="Owner">
                                <Select
                                    showSearch
                                    placeholder="-Select-"
                                    value={this.state.formData.owner}
                                    size={'large'}
                                    onChange={(value) => this.handleSelectChange("owner", value)}
                                >
                                {
                                    owners.map((owner, index) => <Option key={index} value={owner}>{owner}</Option>)
                                }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Policy Start Date">
                                <DatePicker 
                                    style={{ width: '100%' }} 
                                    format={dateFormat} 
                                    onChange={(date, dateString) => this.handleDatePickerChange('policyStartDate', date, dateString)}
                                    size={'large'}
                                    value={this.state.formData.policyStartDate == null || this.state.formData.policyStartDate == '' ? null : moment(this.state.formData.policyStartDate, dateFormat)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Policy End Date">
                                <DatePicker 
                                    style={{ width: '100%' }} 
                                    format={dateFormat} 
                                    onChange={(date, dateString) => this.handleDatePickerChange('policyEndDate', date, dateString)}
                                    size={'large'}
                                    value={this.state.formData.policyEndDate == null || this.state.formData.policyEndDate == '' ? null : moment(this.state.formData.policyEndDate, dateFormat)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Insured">
                                <Select
                                    showSearch
                                    placeholder="-Frank Jones-"
                                    value={this.state.formData.insure}
                                    onChange={(value) => this.handleSelectChange("insure", value)}
                                    size={'large'}
                                >
                                {
                                    insures.map((insure, index) => <Option key={index} value={insure}>{insure}</Option>)
                                }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    {
                        !bPropertyCasualty &&
                        <Row gutter={16} type='flex' justify='center'>
                            <Col span={16}>
                            <Form.Item label="Add Beneficiaries">
                                <Radio.Group
                                name={`addBeneficiaries`}
                                size={'large'}
                                onChange={this.handleInputChange} 
                                value={this.state.formData.addBeneficiaries}
                                >
                                <Radio.Button value='Yes'>Yes</Radio.Button>
                                <Radio.Button value='No'>No</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                            </Col>
                        </Row>
                    }
                    
                    {
                        !bPropertyCasualty && this.state.formData.addBeneficiaries == 'Yes' &&
                        // <Row gutter={16} type="flex" justify="center">
                        //     <Col span={16}>
                        //         <Form.Item label="Name of Beneficiary">
                        //             <Input value={this.state.formData.beneficiaryName} name="beneficiaryName" size={'large'} onChange={(event) => this.handleInputChange(event)}/>
                        //         </Form.Item>
                        //     </Col>
                        // </Row>
                         <Row gutter={24} type="flex" justify="center">
            <SubFormTable
              title="Asset Beneficiary Assignment"
              rows={this.state.rows}
              colsFormat={colsFormat}
              addNewButtonben={true}
              cbFormChange={this.formChange}
            ></SubFormTable>
          </Row>
                    }
                    {/* {
                        !bPropertyCasualty && this.state.formData.addBeneficiaries == 'Yes' &&
                        <Row gutter={16} type="flex" justify="center">
                            <Col span={16}>
                                <Form.Item label="Percent">
                                    <InputNumber
                                        value={this.state.formData.percent}
                                        size={'large'}
                                        style={{ width: '100%' }}
                                        name="percent"
                                        min={0}
                                        max={100}
                                        formatter={value => `${value}%`}
                                        parser={value => value.replace('%', '')}
                                        onChange={(value) => this.handleFormInputChange("percent", value)}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    } */}
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Collapse accordion>
                                <Panel header="Advanced Information" key="1">
                                    <Row gutter={16}>
                                        <Col>
                                            <Form.Item label="Carrier">
                                                <Select
                                                    showSearch
                                                    placeholder="-Select-"
                                                    value={this.state.formData.carrier}
                                                    onChange={(value) => this.handleSelectChange("carrier", value)}
                                                    size={'large'}
                                                >
                                                {
                                                    carriers.map((carrier, index) => <Option key={index} value={carrier}>{carrier}</Option>)
                                                }
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>           
                                    <Row gutter={16}>
                                        <Col>
                                            <Form.Item label="Policy Number">
                                                <Input value={this.state.formData.policy} name="policy" maxLength={4} size={'large'} onChange={(event) => this.handleInputChange(event)}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                                             
                                </Panel>                        
                            </Collapse>
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


export default connect()(ProductInformationSubForm);