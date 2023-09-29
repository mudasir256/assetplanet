import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
    DatePicker ,
    Switch,
    Radio ,
    Table
  } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import DependentsSubForm from './DependentsSubForm';
import TrustSubForm from './TrustSubForm';
import CorporateSubForm from './CorporateSubForm';
import CharitySubForm from './CharitySubForm';
import OtherFinancialSubForm from './OtherFinancialSubForm';
import ProfessionalContactSubForm from './ProfessionalContactSubForm';
import PhoneNumber from '../../../../components/form/PhoneNumber';
import Email from '../../../../components/form/Email';


const { Option } = Select;
const { MonthPicker, RangePicker } = DatePicker;

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const dateFormat = 'MM/DD/YYYY';
const monthFormat = 'YYYY/MM';


class ClientFormWrap extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            forms: {
                client: {
                    // id:
                    firstName: 'String!',
                    lastName: 'String!',
                    birthdate: 'String!',
                    estimatedDeathAge: 20, //'Int!',
                    primaryContactNumber: 'String',
                    secondaryContactNumber: 'String',
                    workContactNumber: 'String',
                    emailAddress: 'String',
                    secondaryEmailAddress: 'String',
                    gender: 'String',
                    investmentKnowledge: 'String',
                    retirementDate: 'String!'
                },
                address: {
                    // id: String
                    firstLine: 'String!',
                    secondLine: 'String',
                    city: 'String!',
                    state: 'String!',
                    country: 'String!',
                    postalCode: 'String'
                },
                spouse: {
                    // id: String
                    firstName: 'String!',
                    lastName: 'String!',
                    birthdate: 'String',
                    estimatedDeathAge: 20, //'Int',
                    primaryContactNumber: 'String',
                    secondaryContactNumber: 'String',
                    workContactNumber: 'String',
                    emailAddress: 'String',
                    secondaryEmailAddress: 'String',
                    gender: 'String',
                    investmentKnowledge: 'String',
                    retirementDate: 'String',
                    partner: false, //'Boolean'
                },
                dependents: [
                    {
                        // id: String
                        firstName: 'String!',
                        lastName: 'String!',
                        birthdate: 'String!',
                        relationship: 'String!',
                        childTaxCreditEndAt: 'String',
                        gender: 'String',
                        disability: true, //'Boolean!'
                    }
                ],
                trusts: [
                    {
                        // id: String
                        name: 'String!',
                        firstName: 'String!',
                        lastName: 'String!',
                        percentage: 80, //'Int!'
                    }
                ],
                corporates: [
                    {
                        // id: String
                        name: 'String!',
                        corporateType: 'String!',
                        creationDate: 'String!',
                        stateIncorporated: 'String!'
                    }
                ],
                charities: [
                    {
                        // id: 'String'
                        contactNumber: 'String!',
                        website: 'String',
                        emailAddress: 'String',
                        contactPersonFirstName: 'String!',
                        contactPersonLastName: 'String!',
                        notes: 'String'
                    }
                ],
                financiallyImpacteds: [
                    {
                        // id: String
                        relationship: 'String!',
                        firstName: 'String!',
                        lastName: 'String!',
                        contactNumber: 'String!',
                        website: 'String',
                        emailAddress: 'String',
                        contactPersonFirstName: 'String!',
                        contactPersonLastName: 'String!',
                        notes: 'String'
                    }
                ],
                professionalContacts: [
                    {
                        // id: String
                        firstName: 'String!',
                        lastName: 'String!',
                        company: 'String',
                        emailAddress: 'String',
                        officeContactNumber: 'String',
                        mobileContactNumber: 'String!',
                        profession: 'String!'
                    }
                ]
            }
        }

        this.handleFormChange = this.handleFormChange.bind(this);

    }

    handleFormChange(key, rows){
        
        let forms = this.state.forms;

        forms[key] = rows;
        this.setState({
            forms: forms
        })
        
        this.props.cbFormChange(forms);
    }

    handleFormInputChange(name, value){
        let client = this.state.forms.client;
        let address = this.state.forms.address;
        let spouse = this.state.forms.spouse;

        switch (name) {
            case 'client_firstName':
                client['firstName'] = value;
                this.handleFormChange('client', client);
                break;
            case 'client_lastName':
                client['lastName'] = value;
                this.handleFormChange('client', client);
                break;
            case 'client_birthdate':
                client['birthdate'] = value;
                this.handleFormChange('client', client);
                break;
            case 'client_estimatedDeathAge':
                client['estimatedDeathAge'] = parseInt(value);
                this.handleFormChange('client', client);
                break;
            case 'client_primaryContactNumber':
                client['primaryContactNumber'] = value;
                this.handleFormChange('client', client);
                break;
            case 'client_secondaryContactNumber':
                client['secondaryContactNumber'] = value;
                this.handleFormChange('client', client);
                break;
            case 'client_workContactNumber':
                client['workContactNumber'] = value;
                this.handleFormChange('client', client);
                break;
            case 'client_emailAddress':
                client['emailAddress'] = value;
                this.handleFormChange('client', client);
                break;
            case 'client_secondaryEmailAddress':
                client['secondaryEmailAddress'] = value;
                this.handleFormChange('client', client);
                break;
            case 'client_gender':
                client['gender'] = value;
                this.handleFormChange('client', client);
                break;
            case 'client_retirementDate':
                client['retirementDate'] = value;
                this.handleFormChange('client', client);
                break;
            case 'client_investmentKnowledge':
                client['investmentKnowledge'] = value;
                this.handleFormChange('client', client);
                break;
                

            case 'client_address_firstLine':
                address['firstLine'] = value;
                this.handleFormChange('address', address);
                break;
            case 'client_address_secondLine':
                address['secondLine'] = value;
                this.handleFormChange('address', address);
                break;
            case 'client_address_city':
                address['city'] = value;
                this.handleFormChange('address', address);
                break;
            case 'client_address_state':
                address['state'] = value;
                this.handleFormChange('address', address);
                break;
            case 'client_address_country':
                address['country'] = value;
                this.handleFormChange('address', address);
                break;
            case 'client_address_postalCode':
                address['postalCode'] = value;
                this.handleFormChange('address', address);
                break;
            // case 'client_notes':
            //     client['firstName'] = value;
            //     this.handleFormChange('client', client);
            //     break;

            case 'spouse_firstName':
                spouse['firstName'] = value;
                this.handleFormChange('spouse', spouse);
                break;
            case 'spouse_lastName':
                spouse['lastName'] = value;
                this.handleFormChange('spouse', spouse);
                break;
            case 'spouse_estimatedDeathAge':
                spouse['estimatedDeathAge'] = parseInt(value);
                this.handleFormChange('spouse', spouse);
                break;
            case 'spouse_birthdate':
                spouse['birthdate'] = value;
                this.handleFormChange('spouse', spouse);
                break;
            case 'spouse_emailAddress':
                spouse['emailAddress'] = value;
                this.handleFormChange('spouse', spouse);
                break;
            case 'spouse_secondaryEmailAddress':
                spouse['secondaryEmailAddress'] = value;
                this.handleFormChange('spouse', spouse);
                break;
            case 'spouse_gender':
                spouse['gender'] = value;
                this.handleFormChange('spouse', spouse);
                break;
            case 'spouse_primaryContactNumber':
                spouse['primaryContactNumber'] = value;
                this.handleFormChange('spouse', spouse);
                break;
            case 'spouse_secondaryContactNumber':
                spouse['secondaryContactNumber'] = value;
                this.handleFormChange('spouse', spouse);
                break;
            case 'spouse_workContactNumber':
                spouse['workContactNumber'] = value;
                this.handleFormChange('spouse', spouse);
                break;
            case 'spouse_investmentKnowledge':
                spouse['investmentKnowledge'] = value;
                this.handleFormChange('spouse', spouse);
                break;
            case 'spouse_retirementDate':
                spouse['retirementDate'] = value;
                this.handleFormChange('spouse', spouse);
                break;               
                
            default:
                break;
        }
    }

    handleInputChange = event => {
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

    render() {
        const { getFieldDecorator } = this.props.form;
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
          })(
            <Select style={{ width: 70 }}>
              <Option value="86">+86</Option>
              <Option value="87">+87</Option>
            </Select>,
          );
         
        return (            
            <Form>
                <div className="info-form-block">
                    <h4 className="title">Client and Spouse</h4>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Client">
                                <Row gutter={8}>
                                    <Col span={12}>
                                        <Input placeholder="First Name" name="client_firstName" onChange={this.handleInputChange}/>
                                    </Col>
                                    <Col span={12}>
                                        <Input placeholder="Last Name" name="client_lastName" onChange={this.handleInputChange}/>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Spouse/Partner">
                                <Row gutter={8}>
                                    <Col span={12}>
                                        <Input placeholder="First Name" name="spouse_firstName" onChange={this.handleInputChange}/>
                                    </Col>
                                    <Col span={12}>
                                        <Input placeholder="Last Name" name="spouse_lastName" onChange={this.handleInputChange}/>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
                <div className="info-form-block">
                    <h4 className="title">Dependents Subform</h4>
                    <DependentsSubForm
                        cbFormChange={(rows) => this.handleFormChange('dependents' , rows)}
                    ></DependentsSubForm>
                </div>
                <div className="info-form-block">
                    <h4 className="title">Client Information</h4>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Client Date of Birth">
                                <DatePicker style={{ width: '100%' }} format={dateFormat} onChange={(date, dateString) => this.handleDatePickerChange('client_birthdate', date, dateString)}/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Client Estimated Age at Death">
                                <Input name="client_estimatedDeathAge" onChange={this.handleInputChange}/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Client Current Age">
                                <Input defaultValue={"0"} disabled/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Client Phone Number - Primary">
                                <PhoneNumber name="client_primaryContactNumber" onChange={this.handleInputChange}></PhoneNumber>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Client Phone Number - Secondary">
                                <PhoneNumber name="client_secondaryContactNumber" onChange={this.handleInputChange}></PhoneNumber>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Client Phone Number - Work">
                                <PhoneNumber name="client_workContactNumber" onChange={this.handleInputChange}></PhoneNumber>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Client Email Address - Primary">
                                <Email name="client_emailAddress" onChange={this.handleInputChange}></Email>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Client Email Address - Other">
                                <Email name="client_secondaryEmailAddress" onChange={this.handleInputChange}></Email>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Gender">
                                <Radio.Group name="client_gender" onChange={this.handleInputChange}>
                                    <Radio value={"Male"}>Male</Radio>
                                    <Radio value={"Female"}>Female</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Address">
                                <Input placeholder="Address Line1" name="client_address_firstLine" onChange={this.handleInputChange}/>
                                <Input placeholder="Address Line2" name="client_address_secondLine" onChange={this.handleInputChange}/>
                                <Row gutter={8}>
                                    <Col span={12}>
                                        <Input placeholder="City / District" name="client_address_city" onChange={this.handleInputChange}/>
                                    </Col>
                                    <Col span={12}>
                                        <Input placeholder="Postal Code" name="client_address_postalCode" onChange={this.handleInputChange}/>
                                    </Col>
                                </Row>
                                <Select
                                    showSearch
                                    placeholder="Select Country"
                                    onChange={(value) => this.handleSelectChange('client_address_country', value)}
                                >
                                    <Option value="Aunt">Alabama</Option>
                                    <Option value="Charity">Arkansas</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="State">
                                <Select
                                    showSearch
                                    placeholder="Select State"
                                    onChange={(value) => this.handleSelectChange('client_address_state', value)}
                                >
                                    <Option value="Aunt">Alabama</Option>
                                    <Option value="Charity">Arkansas</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Investment Knowledge">
                                <Select
                                    showSearch
                                    placeholder="-Select-"
                                    onChange={(value) => this.handleSelectChange('client_investmentKnowledge', value)}
                                >
                                    <Option value="Highly Experienced">Highly Experienced</Option>
                                    <Option value="Enthusiast">Enthusiast</Option>
                                    <Option value="Some Experience/General">Some Experience/General</Option>
                                    <Option value="Novice/Beginner">Novice/Beginner</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Date of Retirement">
                                <DatePicker style={{ width: '100%' }} format={dateFormat} onChange={(date, dateString) => this.handleDatePickerChange('client_retirementDate', date, dateString)}/>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item label="General Notes">
                                <TextArea name="client_notes" onChange={this.handleInputChange}/>
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
                <div className="info-form-block">
                    <h4 className="title">Spouse Information</h4>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Spouse/Partner Date of Birth">
                                <DatePicker style={{ width: '100%' }} format={dateFormat} onChange={(date, dateString) => this.handleDatePickerChange('spouse_birthdate', date, dateString)}/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Spouse/Partner Estimated Age at Death">
                                <Input name="spouse_estimatedDeathAge" onChange={this.handleInputChange}/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Spouse/Partner Current Age">
                                <Input disabled/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Spouse/Partner Email Address - Primary">
                                <Email name="spouse_emailAddress" onChange={this.handleInputChange}></Email>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Spouse/Partner Email Address - Other">
                                <Email name="spouse_secondaryEmailAddress" onChange={this.handleInputChange}></Email>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Gender">
                                <Radio.Group name="spouse_gender" onChange={this.handleInputChange}>
                                    <Radio value={"Male"}>Male</Radio>
                                    <Radio value={"Female"}>Female</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Spouse/Partner Phone Number - Primary">
                                <PhoneNumber name="spouse_primaryContactNumber" onChange={this.handleInputChange}></PhoneNumber>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Spouse/Partner Phone Number - Secondary">
                                <PhoneNumber name="spouse_secondaryContactNumber" onChange={this.handleInputChange}></PhoneNumber>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Spouse/Partner Phone Number - Work">
                                <PhoneNumber  name="spouse_workContactNumber" onChange={this.handleInputChange}></PhoneNumber>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Investment Knowledge">
                                <Select
                                    showSearch
                                    placeholder="-Select-"
                                    onChange={(value) => this.handleSelectChange('spouse_investmentKnowledge', value)}
                                >
                                    <Option value="Highly Experienced">Highly Experienced</Option>
                                    <Option value="Enthusiast">Enthusiast</Option>
                                    <Option value="Some Experience/General">Some Experience/General</Option>
                                    <Option value="Novice/Beginner">Novice/Beginner</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Date of Retirement">
                                <DatePicker style={{ width: '100%' }} format={dateFormat} onChange={(date, dateString) => this.handleDatePickerChange('spouse_retirementDate', date, dateString)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                </div>

                <div className="info-form-block">
                    <h4 className="title">Trust Information</h4>
                    <TrustSubForm
                        cbFormChange={(rows) => this.handleFormChange('trusts' , rows)}
                    ></TrustSubForm>
                </div>
                <div className="info-form-block">
                    <h4 className="title">Coporate Information</h4>
                    <CorporateSubForm
                        cbFormChange={(rows) => this.handleFormChange('corporates' , rows)}
                    ></CorporateSubForm>
                </div>
                <div className="info-form-block">
                    <h4 className="title">Charity Information</h4>
                    <CharitySubForm
                        cbFormChange={(rows) => this.handleFormChange('charities' , rows)}
                    ></CharitySubForm>
                </div>
                <div className="info-form-block">
                    <h4 className="title">Others Financially Impacted</h4>
                    <OtherFinancialSubForm
                        cbFormChange={(rows) => this.handleFormChange('financiallyImpacteds' , rows)}
                    ></OtherFinancialSubForm>
                </div>
                <div className="info-form-block">
                    <h4 className="title">Professional Contacts</h4>
                    <ProfessionalContactSubForm
                        cbFormChange={(rows) => this.handleFormChange('professionalContacts' , rows)}
                    ></ProfessionalContactSubForm>
                </div>
            </Form>            
        )
    }
}

const ClientForm = Form.create({ name: 'register' })(ClientFormWrap);

export default connect()(ClientForm);