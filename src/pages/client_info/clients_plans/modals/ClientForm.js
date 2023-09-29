import React, { Component } from "react";
import { states } from "../../../../constants/moving_states";
import Footer from "../../../../components/form/components/footer";
import Header from "../../../../components/form/components/header";
import support from "../../../../assets/images/support.png";
import Add from "../../../../components/form/components/add";
import AddModal from "../../../../components/form/components/addmodal";
import UpdateModal from "../../../../components/form/components/updatemodal";
import { Icon, Row, Col, Input, Form, Tooltip, Cascader, Select, Checkbox, Button, AutoComplete, DatePicker, Switch, Radio, Table } from 'antd';
import moment from 'moment';
import PhoneNumber from '../../../../components/form/PhoneNumber';
import Email from '../../../../components/form/Email';
import TextArea from 'antd/lib/input/TextArea';
import { CORPORATE_TYPES } from '../../../../constants/types';
import { StyledForm } from "../../../../components/new-styled-components/FormStyling"

const { Option } = Select;
const { MonthPicker, RangePicker } = DatePicker;
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const dateFormat = 'MM/DD/YYYY';
const monthFormat = 'YYYY/MM';
const formName = "clientForm";

class ClientForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dependents_subform_list: [
        { 
          firstName: "John", 
          lastName: "Wick", 
          gender: "Male",
          dob: moment().format(dateFormat), 
          relationship: "Child", 
          childAge: "15", 
          disability: "No", 
          childTaxCreditsEndAts: "17 (lives at home - Child Credit)" 
        }
      ],
      
      trust_subform_list: [
        { 
          trustName: "Open Hands", 
          beneficiariesFirstName: "John", 
          beneficiariesLastName: "Wick", 
          percentage: 6.2
        }
      ],
      
      corporate_subform_list: [
        { 
          corporateName: "Trust for test client - 03/25/2019", 
          corporateType: "Investment", 
          dateCreated: moment().format(dateFormat), 
          stateIncorporated: "Alabama"
        }
      ],

      charity_subform_list: [
        { 
          charityName: "Golden Arc", 
          phone: "+1 320 141184", 
          web: "htttps://goldenarc.com", 
          email: "goldenarc@gmail.com", 
          personFirstName: "Gold", 
          personLastName: "Smith", 
          notes: "This is my personal information."}
      ],

      financial_subform_list: [
        { 
          relationship: "Child", 
          firstName: "John", 
          lastName: "Wick", 
          phone: "+1 92 320 1411", 
          web: "https://finances.com", 
          email: "others@gmail.com", 
          personFirstName: "John", 
          personLastName: "Wick", 
          notes: "This is final."}
      ],
      professional_subform_list: [
        { 
          firstName:"John", 
          lastName:"Wick", 
          company:"Napster", 
          email: "john@gmail.com", 
          officePhone: "+1 92 320 1411", 
          mobilePhone: "+1 92 320 1411", 
          profession: "Enterpreneur"}
      ],

      formData: {},

      isDependentsSubformAddModalVisible: false,
      isDependentsSubformUpdateModalVisible: false,
      isTrustSubformAddModalVisible: false,
      isTrustSubformUpdateModalVisible: false,
      isCorporateSubformAddModalVisible: false,
      isCorporateSubformUpdateModalVisible: false,
      isCharitySubformAddModalVisible: false,
      isCharitySubformUpdateModalVisible: false,
      isFinancialSubformAddModalVisible: false,
      isFinancialSubformUpdateModalVisible: false,
      isProfessionalSubformAddModalVisible: false,
      isProfessionalSubformUpdateModalVisible: false,
      updateObject: null,
      selectedIndex:null
    };
  }

  componentDidMount() {
      if ( this.props.checklistObject.clientForm &&
        this.props.checklistObject.clientForm.hasOwnProperty("dependents_subform_list")
      ){
        this.setState({ dependents_subform_list: this.props.checklistObject.clientForm.dependents_subform_list, });
      }else if ( this.props.checklistObject.clientForm &&
        this.props.checklistObject.clientForm.hasOwnProperty("trust_subform_list")
      ){
        this.setState({ trust_subform_list: this.props.checklistObject.clientForm.trust_subform_list, });
      }else if ( this.props.checklistObject.clientForm &&
        this.props.checklistObject.clientForm.hasOwnProperty("corporate_subform_list")
      ){
        this.setState({ corporate_subform_list: this.props.checklistObject.clientForm.corporate_subform_list, });
      }else if ( this.props.checklistObject.clientForm &&
        this.props.checklistObject.clientForm.hasOwnProperty("charity_subform_list")
      ){
        this.setState({ charity_subform_list: this.props.checklistObject.clientForm.charity_subform_list, });
      }else if ( this.props.checklistObject.clientForm &&
        this.props.checklistObject.clientForm.hasOwnProperty("financial_subform_list")
      ){
        this.setState({ financial_subform_list: this.props.checklistObject.clientForm.financial_subform_list, });
      }else if ( this.props.checklistObject.clientForm &&
        this.props.checklistObject.clientForm.hasOwnProperty("professional_subform_list")
      ){
        this.setState({ professional_subform_list: this.props.checklistObject.clientForm.professional_subform_list, });
      }
        
      this.props.handleChecklistObject(this.props.currentForm, this.state.dependents_subform_list)
      this.props.handleChecklistObject(this.props.currentForm, this.state.trust_subform_list)
      this.props.handleChecklistObject(this.props.currentForm, this.state.corporate_subform_list)
      this.props.handleChecklistObject(this.props.currentForm, this.state.charity_subform_list)
      this.props.handleChecklistObject(this.props.currentForm, this.state.financial_subform_list)
      this.props.handleChecklistObject(this.props.currentForm, this.state.professional_subform_list)
  }

  handleFormChange(key, rows) {
    let formData = this.state.formData;

    formData[key] = rows;
    this.setState({
      formData: formData,
    });
  }


  // to handle hide and show for dependents subform add modal
  setDependentsSubformAddModalVisible = () => {
    if (this.state.isDependentsSubformAddModalVisible)
      this.setState({ isDependentsSubformAddModalVisible: false });
    else this.setState({ isDependentsSubformAddModalVisible: true });
  };

  // to handle hide and show for dependents subform update modal
  setDependentsSubformUpdateModalVisible = () => {
    if (this.state.isDependentsSubformUpdateModalVisible)
      this.setState({ isDependentsSubformUpdateModalVisible: false });
    else this.setState({ isDependentsSubformUpdateModalVisible: true });
  };

  // to handle hide and show for dependents subform add modal
  setTrustSubformAddModalVisible = () => {
    if (this.state.isTrustSubformAddModalVisible)
      this.setState({ isTrustSubformAddModalVisible: false });
    else this.setState({ isTrustSubformAddModalVisible: true });
  };

  // to handle hide and show for dependents subform update modal
  setTrustSubformUpdateModalVisible = () => {
    if (this.state.isTrustSubformUpdateModalVisible)
      this.setState({ isTrustSubformUpdateModalVisible: false });
    else this.setState({ isTrustSubformUpdateModalVisible: true });
  };

  // to handle hide and show for dependents subform add modal
  setCorporateSubformAddModalVisible = () => {
    if (this.state.isCorporateSubformAddModalVisible)
      this.setState({ isCorporateSubformAddModalVisible: false });
    else this.setState({ isCorporateSubformAddModalVisible: true });
  };

  // to handle hide and show for dependents subform update modal
  setCorporateSubformUpdateModalVisible = () => {
    if (this.state.isCorporateSubformUpdateModalVisible)
      this.setState({ isCorporateSubformUpdateModalVisible: false });
    else this.setState({ isCorporateSubformUpdateModalVisible: true });
  };

  // to handle hide and show for charity subform add modal
  setCharitySubformAddModalVisible = () => {
    if (this.state.isCharitySubformAddModalVisible)
      this.setState({ isCharitySubformAddModalVisible: false });
    else this.setState({ isCharitySubformAddModalVisible: true });
  };

  // to handle hide and show for charity subform update modal
  setCharitySubformUpdateModalVisible = () => {
    if (this.state.isCharitySubformUpdateModalVisible)
      this.setState({ isCharitySubformUpdateModalVisible: false });
    else this.setState({ isCharitySubformUpdateModalVisible: true });
  };

  // to handle hide and show for financial subform add modal
  setFinancialSubformAddModalVisible = () => {
    if (this.state.isFinancialSubformAddModalVisible)
      this.setState({ isFinancialSubformAddModalVisible: false });
    else this.setState({ isFinancialSubformAddModalVisible: true });
  };

  // to handle hide and show for financial subform update modal
  setFinancialSubformUpdateModalVisible = () => {
    if (this.state.isFinancialSubformUpdateModalVisible)
      this.setState({ isFinancialSubformUpdateModalVisible: false });
    else this.setState({ isFinancialSubformUpdateModalVisible: true });
  };

  // to handle hide and show for professional subform add modal
  setProfessionalSubformAddModalVisible = () => {
    if (this.state.isProfessionalSubformAddModalVisible)
      this.setState({ isProfessionalSubformAddModalVisible: false });
    else this.setState({ isProfessionalSubformAddModalVisible: true });
  };

  // to handle hide and show for professional subform update modal
  setProfessionalSubformUpdateModalVisible = () => {
    if (this.state.isProfessionalSubformUpdateModalVisible)
      this.setState({ isProfessionalSubformUpdateModalVisible: false });
    else this.setState({ isProfessionalSubformUpdateModalVisible: true });
  };


  // function to store updated values of all fields in updateObject
  onUpdateChange = (val, index) => {
    this.setState({
      updateObject: {
        ...this.state.updateObject,
        [index]: val,
      },
    });
  };

  // capture date change of datepicker of update modal
  handleDateChange = (date, dateString, index) => {
    this.onUpdateChange(dateString, index);
  };

  // Function to delete selected row
  deleteSelectedRow = (idx, all_rows, name) => {
    const updatedRows = all_rows.filter((row, index) => {
      return index !== idx - 1;
    });

   if (name === "dependents_subform") {
      this.setState(
          { dependents_subform_list: updatedRows, },
          () => { this.props.handleChecklistObject(this.props.currentForm, this.state.dependents_subform_list) }
      );
    }else if (name === "trust_subform") {
      this.setState(
          { trust_subform_list: updatedRows, },
          () => { this.props.handleChecklistObject(this.props.currentForm, this.state.trust_subform_list) }
      );
    }else if (name === "corporate_subform") {
      this.setState(
          { corporate_subform_list: updatedRows, },
          () => { this.props.handleChecklistObject(this.props.currentForm, this.state.corporate_subform_list) }
      );
    }else if (name === "charity_subform") {
      this.setState(
          { charity_subform_list: updatedRows, },
          () => { this.props.handleChecklistObject(this.props.currentForm, this.state.charity_subform_list) }
      );
    }else if (name === "financial_subform") {
      this.setState(
          { financial_subform_list: updatedRows, },
          () => { this.props.handleChecklistObject(this.props.currentForm, this.state.financial_subform_list) }
      );
    }else if (name === "professional_subform") {
      this.setState(
          { professional_subform_list: updatedRows, },
          () => { this.props.handleChecklistObject(this.props.currentForm, this.state.professional_subform_list) }
      );
    }
  };
    
    
  // Function to get selected  array (row)
  getSelectedRow = (idx, rows, name) => {
    this.setState({
      selectedIndex: idx,
    });

    // get selected row (this will return array of object)
    let selectedRow = rows.filter((row, index) => {
      return index === idx - 1;
    });

    // get first and only element from list and store it in update object
    this.setState({
      updateObject: { ...this.state.updateObject, ...selectedRow[0] },
    });
  };
  
   
  // function to update a specific dependents subform row
  updateDependentsSubformRow = () => {
    let obj = {
      ...this.state.updateObject,
    };

    let { dependents_subform_list, selectedIndex } = this.state;
    let index = selectedIndex - 1;

    dependents_subform_list = [...this.state.dependents_subform_list]; // important to create a copy, otherwise you'll modify state outside of setState call
    dependents_subform_list[index] = obj; // replace current updated object in dependents_subform_list based on index
    this.setState({ dependents_subform_list },()=>{
    this.props.handleChecklistObject(this.props.currentForm,this.state.dependents_subform_list)
      
    });
  };  

  // function to update a specific trust subform row
  updateTrustSubformRow = () => {
    let obj = {
      ...this.state.updateObject,
    };

    let { trust_subform_list, selectedIndex } = this.state;
    let index = selectedIndex - 1;

    trust_subform_list = [...this.state.trust_subform_list]; // important to create a copy, otherwise you'll modify state outside of setState call
    trust_subform_list[index] = obj; // replace current updated object in trust_subform_list based on index
    this.setState({ trust_subform_list },()=>{
    this.props.handleChecklistObject(this.props.currentForm,this.state.trust_subform_list)
      
    });
  };
  
  // function to update a specific corporate subform row
  updateCorporateSubformRow = () => {
    let obj = {
      ...this.state.updateObject,
    };

    let { corporate_subform_list, selectedIndex } = this.state;
    let index = selectedIndex - 1;

    corporate_subform_list = [...this.state.corporate_subform_list]; // important to create a copy, otherwise you'll modify state outside of setState call
    corporate_subform_list[index] = obj; // replace current updated object in corporate_subform_list based on index
    this.setState({ corporate_subform_list },()=>{
    this.props.handleChecklistObject(this.props.currentForm,this.state.corporate_subform_list)
      
    });
  }; 

 // function to update a specific charity subform row
 updateCharitySubformRow = () => {
  let obj = {
    ...this.state.updateObject,
  };

  let { charity_subform_list, selectedIndex } = this.state;
  let index = selectedIndex - 1;

  charity_subform_list = [...this.state.charity_subform_list]; // important to create a copy, otherwise you'll modify state outside of setState call
  charity_subform_list[index] = obj; // replace current updated object in charity_subform_list based on index
  this.setState({ charity_subform_list },()=>{
  this.props.handleChecklistObject(this.props.currentForm,this.state.charity_subform_list)
  });
}; 

 // function to update a specific financial subform row
 updateFinancialSubformRow = () => {
  let obj = {
    ...this.state.updateObject,
  };

  let { financial_subform_list, selectedIndex } = this.state;
  let index = selectedIndex - 1;

  financial_subform_list = [...this.state.financial_subform_list]; // important to create a copy, otherwise you'll modify state outside of setState call
  financial_subform_list[index] = obj; // replace current updated object in financial_subform_list based on index
  this.setState({ financial_subform_list },()=>{
  this.props.handleChecklistObject(this.props.currentForm,this.state.financial_subform_list)
  });
}; 

 // function to update a specific other financial subform row
 updateProfessionalSubformRow = () => {
  let obj = {
    ...this.state.updateObject,
  };

  let { professional_subform_list, selectedIndex } = this.state;
  let index = selectedIndex - 1;

  professional_subform_list = [...this.state.professional_subform_list]; // important to create a copy, otherwise you'll modify state outside of setState call
  professional_subform_list[index] = obj; // replace current updated object in professional_subform_list based on index
  this.setState({ professional_subform_list },()=>{
  this.props.handleChecklistObject(this.props.currentForm, this.state.professional_subform_list)
  });
}; 

  

  // function to create dependents subform row(data)
  createDependentsSubform = (currentFormData) => {
  
    // checxk if already formData contains some data then initialize it with empty
    if (Object.keys(this.state.formData).length > 0) {
      this.setState({
        formData: {},
      });
    }
  
    // add current form data in dependents list with keeping old data
    this.setState({
      dependents_subform_list: [...this.state.dependents_subform_list, currentFormData.formData],
    },()=>{
      this.props.handleChecklistObject(this.props.currentForm, this.state.dependents_subform_list)
    });
  };

  // function to create trust subform row(data)
  createTrustSubform = (currentFormData) => {
  
    // checxk if already formData contains some data then initialize it with empty
    if (Object.keys(this.state.formData).length > 0) {
      this.setState({
        formData: {},
      });
    }
  
    // add current form data in trust list with keeping old data
    this.setState({
      trust_subform_list: [...this.state.trust_subform_list, currentFormData.formData],
    },()=>{
      this.props.handleChecklistObject(this.props.currentForm, this.state.trust_subform_list)
    });
  };

  // function to create corporate subform row(data)
  createCorporateSubform = (currentFormData) => {
  
    // checxk if already formData contains some data then initialize it with empty
    if (Object.keys(this.state.formData).length > 0) {
      this.setState({
        formData: {},
      });
    }
  
    // add current form data in corporate subform list with keeping old data
    this.setState({
      corporate_subform_list: [...this.state.corporate_subform_list, currentFormData.formData],
    },()=>{
      this.props.handleChecklistObject(this.props.currentForm, this.state.corporate_subform_list)
    });
  };
  
  // function to create charity subform row(data)
  createCharitySubform = (currentFormData) => {
  
    // checxk if already formData contains some data then initialize it with empty
    if (Object.keys(this.state.formData).length > 0) {
      this.setState({
        formData: {},
      });
    }
  
    // add current form data in charity subform list with keeping old data
    this.setState({
      charity_subform_list: [...this.state.charity_subform_list, currentFormData.formData],
    },()=>{
      this.props.handleChecklistObject(this.props.currentForm, this.state.charity_subform_list)
    });
  };

  // function to create financial subform row(data)
  createFinancialSubform = (currentFormData) => {
  
    // check if already formData contains some data then initialize it with empty
    if (Object.keys(this.state.formData).length > 0) {
      this.setState({
        formData: {},
      });
    }
  
    // add current form data in financial subform list with keeping old data
    this.setState({
      financial_subform_list: [...this.state.financial_subform_list, currentFormData.formData],
    },()=>{
      this.props.handleChecklistObject(this.props.currentForm, this.state.financial_subform_list)
    });
  };

  // function to create other professional subform row(data)
  createProfessionalSubform = (currentFormData) => {
  
    // check if already formData contains some data then initialize it with empty
    if (Object.keys(this.state.formData).length > 0) {
      this.setState({
        formData: {},
      });
    }
  
    // add current form data in charity subform list with keeping old data
    this.setState({
      professional_subform_list: [...this.state.professional_subform_list, currentFormData.formData],
    },()=>{
      this.props.handleChecklistObject(this.props.currentForm, this.state.professional_subform_list)
    });
  };
  
  
  // store all modal data in formData state
  setFormData = (value) => {
    this.setState({
      formData: {
        ...this.state.formData,
        ...value,
      },
    });
  };


  getDependentsSubformRow = ({data,index}) => {
    return (
      <Row key={index} type="flex" className="custom-sub-container">
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Dependent</span>
            <span className="custom-table-value-text">{data.firstName} {data.lastName}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">DOB</span>
            <span className="custom-table-value-text">{data.dob}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Relationship</span>
            <span className="custom-table-value-text">{data.relationship}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Child Age</span>
            <span className="custom-table-value-text">{data.childAge}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Gender</span>
            <span className="custom-table-value-text">{data.gender}</span>
          </div>
        </Col>
      
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Actions</span>
                <div className="custom-table-icon-align">
                    <Icon style={{ fontSize: "20px" }} 
                        type="edit"
                        onClick={() => {
                            const { dependents_subform_list } = this.state;
                            this.getSelectedRow(index, dependents_subform_list);

                            this.setDependentsSubformUpdateModalVisible();
                        }}
                    >
                    </Icon>

                    <Icon style={{ fontSize: "20px" }}
                        type="delete"
                        onClick={() => {
                            const { dependents_subform_list } = this.state;
                            const name = "dependents_subform";
                            this.deleteSelectedRow(index, dependents_subform_list, name);
                        }}
                    >
                    </Icon>

                    <Icon style={{ fontSize: "20px" }} type="save"></Icon>
                    <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
                </div>
          </div>
        </Col>
      </Row>
    );
  };

  getTrustSubformRow = ({data,index}) => {
    return (
      <Row key={index} type="flex" className="custom-sub-container">
        <Col span={7}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Trust Name</span>
            <span className="custom-table-value-text">{data.trustName}</span>
          </div>
        </Col>
        <Col span={7}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Beneficiaries</span>
            <span className="custom-table-value-text">{data.beneficiariesFirstName} {data.beneficiariesLastName}</span>
          </div>
        </Col>
        <Col span={6}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Percent</span>
            <span className="custom-table-value-text">{data.percentage}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Actions</span>
                <div className="custom-table-icon-align">
                    <Icon style={{ fontSize: "20px" }} 
                        type="edit"
                        onClick={() => {
                            const { trust_subform_list } = this.state;
                            this.getSelectedRow(index, trust_subform_list);

                            this.setTrustSubformUpdateModalVisible();
                        }}
                    >
                    </Icon>

                    <Icon style={{ fontSize: "20px" }}
                        type="delete"
                        onClick={() => {
                            const { trust_subform_list } = this.state;
                            const name = "trust_subform";
                            this.deleteSelectedRow(index, trust_subform_list, name);
                        }}
                    >
                    </Icon>

                    <Icon style={{ fontSize: "20px" }} type="save"></Icon>
                    <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
                </div>
          </div>
        </Col>
      </Row>
    );
  };

  getCorporateSubformRow = ({data,index}) => {
    return (
      <Row key={index} type="flex" className="custom-sub-container">
        <Col span={5}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Corporate Name</span>
            <span className="custom-table-value-text">{data.corporateName}</span>
          </div>
        </Col>
        <Col span={5}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Corporate Type</span>
            <span className="custom-table-value-text">{data.corporateType}</span>
          </div>
        </Col>
        <Col span={5}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Date Created</span>
            <span className="custom-table-value-text">{data.dateCreated}</span>
          </div>
        </Col>
        <Col span={5}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">State Incorporated</span>
            <span className="custom-table-value-text">{data.stateIncorporated}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Actions</span>
                <div className="custom-table-icon-align">
                    <Icon style={{ fontSize: "20px" }} 
                        type="edit"
                        onClick={() => {
                            const { corporate_subform_list } = this.state;
                            this.getSelectedRow(index, corporate_subform_list);

                            this.setCorporateSubformUpdateModalVisible();
                        }}
                    >
                    </Icon>

                    <Icon style={{ fontSize: "20px" }}
                        type="delete"
                        onClick={() => {
                            const { corporate_subform_list } = this.state;
                            const name = "corporate_subform";
                            this.deleteSelectedRow(index, corporate_subform_list, name);
                        }}
                    >
                    </Icon>

                    <Icon style={{ fontSize: "20px" }} type="save"></Icon>
                    <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
                </div>
          </div>
        </Col>
      </Row>
    );
  };

  getCharitySubformRow = ({data,index}) => {
    return (
      <Row key={index} type="flex" className="custom-sub-container">
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Charity Name</span>
            <span className="custom-table-value-text">{data.charityName}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Phone</span>
            <span className="custom-table-value-text">{data.phone}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Web</span>
            <span className="custom-table-value-text">{data.web}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Email</span>
            <span className="custom-table-value-text">{data.email}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Contact</span>
            <span className="custom-table-value-text">{data.personFirstName} {data.personLastName}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Actions</span>
                <div className="custom-table-icon-align">
                    <Icon style={{ fontSize: "20px" }} 
                        type="edit"
                        onClick={() => {
                            const { charity_subform_list } = this.state;
                            this.getSelectedRow(index, charity_subform_list);

                            this.setCharitySubformUpdateModalVisible();
                        }}
                    >
                    </Icon>

                    <Icon style={{ fontSize: "20px" }}
                        type="delete"
                        onClick={() => {
                            const { charity_subform_list } = this.state;
                            const name = "charity_subform";
                            this.deleteSelectedRow(index, charity_subform_list, name);
                        }}
                    >
                    </Icon>

                    <Icon style={{ fontSize: "20px" }} type="save"></Icon>
                    <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
                </div>
          </div>
        </Col>
      </Row>
    );
  };

  getFinancialSubformRow = ({data,index}) => {
    return (
      <Row key={index} type="flex" className="custom-sub-container">
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Relationship</span>
            <span className="custom-table-value-text">{data.relationship}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Name</span>
            <span className="custom-table-value-text">{data.firstName} {data.LastName}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Phone</span>
            <span className="custom-table-value-text">{data.phone}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Web</span>
            <span className="custom-table-value-text">{data.web}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Email</span>
            <span className="custom-table-value-text">{data.email}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Actions</span>
                <div className="custom-table-icon-align">
                    <Icon style={{ fontSize: "20px" }} 
                        type="edit"
                        onClick={() => {
                            const { financial_subform_list } = this.state;
                            this.getSelectedRow(index, financial_subform_list);

                            this.setFinancialSubformUpdateModalVisible();
                        }}
                    >
                    </Icon>

                    <Icon style={{ fontSize: "20px" }}
                        type="delete"
                        onClick={() => {
                            const { financial_subform_list } = this.state;
                            const name = "financial_subform";
                            this.deleteSelectedRow(index, financial_subform_list, name);
                        }}
                    >
                    </Icon>

                    <Icon style={{ fontSize: "20px" }} type="save"></Icon>
                    <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
                </div>
          </div>
        </Col>
      </Row>
    );
  };

  getProfessionalSubformRow = ({data,index}) => {
    return (
      <Row key={index} type="flex" className="custom-sub-container">
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Name</span>
            <span className="custom-table-value-text">{data.firstName} {data.lastName}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Company</span>
            <span className="custom-table-value-text">{data.company}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Email</span>
            <span className="custom-table-value-text">{data.email}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Office No.</span>
            <span className="custom-table-value-text">{data.officePhone}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Mobile No.</span>
            <span className="custom-table-value-text">{data.mobilePhone}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Actions</span>
                <div className="custom-table-icon-align">
                    <Icon style={{ fontSize: "20px" }} 
                        type="edit"
                        onClick={() => {
                            const { professional_subform_list } = this.state;
                            this.getSelectedRow(index, professional_subform_list);

                            this.setOtherProfessionalSubformUpdateModalVisible();
                        }}
                    >
                    </Icon>

                    <Icon style={{ fontSize: "20px" }}
                        type="delete"
                        onClick={() => {
                            const { professional_subform_list } = this.state;
                            const name = "professional_subform";
                            this.deleteSelectedRow(index, professional_subform_list, name);
                        }}
                    >
                    </Icon>

                    <Icon style={{ fontSize: "20px" }} type="save"></Icon>
                    <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
                </div>
          </div>
        </Col>
      </Row>
    );
  };

  render() {
    const dependentsSubformFields = [
      {
        title: "First Name",
        type: "input",
        index:"firstName"
      },
      {
        title: "Last Name",
        type: "input",
        index:"lastName"
      },
      {
        title: "Date of Birth",
        type: "date",
        index:"dob"
      },
      {
        title: "relationship",
        type: "select",
        options: ["Child", "Parent", "Grandparent", "GrandChild"],
        index: "relationship"
      },
      {
        title: "Child Age",
        type: "input",
        index: "childAge"
      },
      {
        title: "Gender",
        type: "select",
        options: ["Male", "Female"],
        index: "gender"
      },
      {
        title: "Disability",
        type: "select",
        options: ["Yes", "No"],
        index: "disability"
      },
      {
        title: "Child Tax Credits End At",
        type: "select",
        options: ["17 (lives at home - Child Credit)", "24 (Goes to College - Child Credit)", "Over 17 (Qualifies as Dependent Deduction)"],
        index:"childTaxCreditsEndAts"
      }
    ];

    const updateDependentsSubformFields = [
      {
        title: "First Name",
        type: "input",
        index:"firstName"
      },
      {
        title: "Last Name",
        type: "input",
        index:"lastName"
      },
      {
        title: "Date of Birth",
        type: "date",
        index:"dob"
      },
      {
        title: "relationship",
        type: "select",
        options: ['Child', 'Parent', 'Grandparent', 'GrandChild'],
        index: "relationship"
      },
      {
        title: "Child Age",
        type: "input",
        index: "childAge"
      },
      {
        title: "Gender",
        type: "select",
        options: ['Male', 'Female'],
        index: "gender"
      },
      {
        title: "Disability",
        type: "select",
        options: ['Yes', 'No'],
        index: "disability"
      },
      {
        title: "Child Tax Credits End At",
        type: "select",
        options: ['17 (lives at home - Child Credit)', '24 (Goes to College - Child Credit)', 'Over 17 (Qualifies as Dependent Deduction)'],
        index:"childTaxCreditsEndAts"
      }
    ];

    const trustSubformFields = [
      {
        title: "Trust Name",
        type: "select",
        options: ['Frank and Tracy Trust - 03/27/2019', 'Trust for test client - 03/25/2019'],
        index:"trustName"
      },
      {
        title: "First Name",
        type: "input",
        index:"firstName"
      },
      {
        title: "Last Name",
        type: "input",
        index:"lastName"
      },
      {
        title: "Percent",
        type: "percent",
        index:"percentage"
      },
    ];

    const updateTrustSubformFields = [
      {
        title: "Trust Name",
        type: "select",
        options: ['Frank and Tracy Trust - 03/27/2019', 'Trust for test client - 03/25/2019'],
        index:"trustName"
      },
      {
        title: "First Name",
        type: "input",
        index:"firstName"
      },
      {
        title: "Last Name",
        type: "input",
        index:"lastName"
      },
      {
        title: "Percent",
        type: "percent",
        index:"percentage"
      },
    ];

    const corporateSubformFields = [
      {
        title: "Corporate Name",
        type: "select",
        options: ['Frank and Tracy Trust - 03/27/2019', 'Trust for test client - 03/25/2019'],
        index:"corporateName"
      },
      {
        title: "Corporate Type",
        type: "select",
        options: CORPORATE_TYPES,
        index:"corporateType"
      },
      {
        title: "Date Created",
        type: "date",
        index:"dateCreated"
      },
      {
        title: "State Incorporated",
        type: "select",
        options: [ 'Alabama', 'Alaska', 'Arizona' ],
        index:"stateIncorporated"
      },
    ];

    const updateCorporateSubformFields = [
      {
        title: "Corporate Name",
        type: "select",
        options: ['Frank and Tracy Trust - 03/27/2019', 'Trust for test client - 03/25/2019'],
        index:"corporateName"
      },
      {
        title: "Corporate Type",
        type: "select",
        options: CORPORATE_TYPES,
        index:"corporateType"
      },
      {
        title: "Date Created",
        type: "date",
        index:"dateCreated"
      },
      {
        title: "State Incorporated",
        type: "select",
        options: [ 'Alabama', 'Alaska', 'Arizona' ],
        index:"stateIncorporated"
      },
    ];

    const charitySubformFields = [
      {
        title: "Charity Name",
        type: "input",
        index:"charityName"
      },
      {
        title: "Phone",
        type: "phone",
        index:"corporateType"
      },
      {
        title: "Website",
        type: "web",
        index:"web"
      },
      {
        title: "Email",
        type: "input",
        index: "email"
      },
      {
        title: "Person First Name",
        type: "input",
        index: "personFirstName"
      },
      {
        title: "Person Last Name",
        type: "input",
        index: "personLastName"
      },
      {
        title: "Notes",
        type: "textarea",
        index: "notes"
      },
    ];

    const updateCharitySubformFields = [
      {
        title: "Charity Name",
        type: "input",
        index:"charityName"
      },
      {
        title: "Phone",
        type: "phone",
        index:"corporateType"
      },
      {
        title: "Website",
        type: "web",
        index:"web"
      },
      {
        title: "Email",
        type: "input",
        index: "email"
      },
      {
        title: "Person First Name",
        type: "input",
        index: "personFirstName"
      },
      {
        title: "Person Last Name",
        type: "input",
        index: "personLastName"
      },
      {
        title: "Notes",
        type: "textarea",
        index: "notes"
      },
    ];

    const financialSubformFields = [
      {
        title: "Relationship",
        type: "select",
        options: [ 'Child', 'Parent', 'Grandparent', 'GrandChild' ],
        index:"relationship"
      },
      {
        title: "First Name",
        type: "input",
        index: "firstName"
      },
      {
        title: "Last Name",
        type: "input",
        index: "lastName"
      },
      {
        title: "Phone",
        type: "phone",
        index: "phone"
      },
      {
        title: "Website",
        type: "web",
        index: "web"
      },
      {
        title: "Email",
        type: "input",
        index: "email"
      },
      {
        title: "Person First Name",
        type: "input",
        index: "personFirstName"
      },
      {
        title: "Person Last Name",
        type: "input",
        index: "personLastName"
      },
      {
        title: "Notes",
        type: "textarea",
        index: "notes"
      },
    ];

    const updateFinancialSubformFields = [
      {
        title: "Relationship",
        type: "select",
        options: [ 'Child', 'Parent', 'Grandparent', 'GrandChild' ],
        index:"relationship"
      },
      {
        title: "First Name",
        type: "input",
        index: "firstName"
      },
      {
        title: "Last Name",
        type: "input",
        index: "lastName"
      },
      {
        title: "Phone",
        type: "phone",
        index: "phone"
      },
      {
        title: "Website",
        type: "web",
        index: "web"
      },
      {
        title: "Email",
        type: "input",
        index: "email"
      },
      {
        title: "Person First Name",
        type: "input",
        index: "personFirstName"
      },
      {
        title: "Person Last Name",
        type: "input",
        index: "personLastName"
      },
      {
        title: "Notes",
        type: "textarea",
        index: "notes"
      },
    ];

    const professionalSubformFields = [
      {
        title: "First Name",
        type: "input",
        index:"firstName"
      },
      {
        title: "Last Name",
        type: "input",
        index:"lastName"
      },
      {
        title: "Company",
        type: "input",
        index:"company"
      },
      {
        title: "Email",
        type: "input",
        index:"email"
      },
      {
        title: "Office Number",
        type: "phone",
        index:"officeNumber"
      },
      {
        title: "Mobile Number",
        type: "phone",
        index: "mobileNumber"
      },
      {
        title: "Profession",
        type: "select",
        options: ['Bookkeeper', 'CPA', 'Financial Advisor', 'Insurance Agent', 'Lawyer - Corporate', 'Lawyer - Divorce', 'Lawyer - Estate', 'Tax Professional'],
        index: "profession"
      }
    ];

    const updateProfessionalSubformFields = [
      {
        title: "First Name",
        type: "input",
        index:"firstName"
      },
      {
        title: "Last Name",
        type: "input",
        index:"lastName"
      },
      {
        title: "Company",
        type: "input",
        index:"company"
      },
      {
        title: "Email",
        type: "input",
        index:"email"
      },
      {
        title: "Office Number",
        type: "phone",
        index:"officeNumber"
      },
      {
        title: "Mobile Number",
        type: "phone",
        index: "mobileNumber"
      },
      {
        title: "Profession",
        type: "select",
        options: ['Bookkeeper', 'CPA', 'Financial Advisor', 'Insurance Agent', 'Lawyer - Corporate', 'Lawyer - Divorce', 'Lawyer - Estate', 'Tax Professional'],
        index: "profession"
      }
    ];


    // const { handleFormInputChange, role } = this.props;
    const {
      currentForm,
      handleInputChange,
      divorceObject,
      handleDatePickerChange,
      handleSelectChange,
      handleFormInputChange,
      handleCurrencyChange,
      handleDocumentChange,
      handlePhoneChange,
      role
    } = this.props;

    return (
      <React.Fragment>

          <Row>
            <Col>
              <Row type="flex" justify="center">
                <Col span={23}>
                  <StyledForm style={{"padding-top": "0"}}>
                    <Row gutter={[{ xs: 24, sm:32, md: 40 }, {xs: 24, sm:32, md: 40}]} type="flex">
                        {/* Form Title */}
                        <Col xs={24}>
                          <h2>Client and Spouse</h2>
                        </Col>
                    </Row>
                    <Form 
                      name="basic"
                      initialValues={{
                          remember: true,
                      }}
                      autoComplete="off"
                    >
                      <Row gutter={[{ xs: 24, sm:32, md: 40 }, {xs: 24, sm:32, md: 40}]} type="flex">
                        <Col xs={24}>
                          <Form.Item label="Client">
                            <Row gutter={24} type="flex">
                              <Col xs={24} md={12}>
                                <Input placeholder="First Name" name="client_firstName" onChange={this.handleInputChange}/>
                              </Col>
                              <Col xs={24} md={12}>
                                <Input placeholder="Last Name" name="client_lastName" onChange={this.handleInputChange}/>
                              </Col>
                            </Row>
                          </Form.Item>
                        </Col>
                        <Col xs={24}>
                          <Form.Item label="Spouse/Partner">
                              <Row gutter={24} type="flex">
                                <Col xs={24} md={12}>
                                  <Input placeholder="First Name" name="spouse_firstName" onChange={this.handleInputChange}/>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Input placeholder="Last Name" name="spouse_lastName" onChange={this.handleInputChange}/>
                                </Col>
                              </Row>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </StyledForm>
                
                  <AddModal
                    title={"Add Dependents"}
                    fields={dependentsSubformFields}
                    isVisible={this.state.isDependentsSubformAddModalVisible}
                    cbClose={this.setDependentsSubformAddModalVisible}
                    handleFormInputChange={handleFormInputChange}
                    handleInputChange={handleInputChange}
                    handleSelectChange={handleSelectChange}
                    handleDatePickerChange={handleDatePickerChange}
                    handleCurrencyChange={handleCurrencyChange}
                    handleDocumentChange={handleDocumentChange}
                    currentForm={currentForm}
                    setFormData={this.setFormData}
                    formData={this.state.formData}
                    create={this.createDependentsSubform}
                  />


                  <UpdateModal
                    title={"Update Dependents"}
                    fields={updateDependentsSubformFields}
                    isVisible={this.state.isDependentsSubformUpdateModalVisible}
                    cbClose={this.setDependentsSubformUpdateModalVisible}
                    cbUpdate={this.updateDependentsSubformRow}
                    // onLoad={this.get}
                    obj={this.state.updateObject}
                    onUpdateChange={this.onUpdateChange}
                    handleDateChange={this.handleDateChange}

                    // onConstraints={this.onConstraints}
                  />

                  <Add
                    title={"Dependents"}
                    button={"Add Dependents"}
                    cbAdd={this.setDependentsSubformAddModalVisible}
                  />         

                  {
                    // get dependents subform row
                    this.state.dependents_subform_list.map((data, index) =>
                        this.getDependentsSubformRow({ data, index: index + 1 })
                    )
                  }


                  <StyledForm>
                    <Row gutter={24} type="flex">
                        {/* Form Title */}
                        <Col xs={24}>
                          <h2>Client Information</h2>
                        </Col>
                    </Row>
                    <Form 
                      name="basic"
                      initialValues={{
                          remember: true,
                      }}
                      autoComplete="off"
                    >
                      <Row gutter={[{ xs: 24, sm:32, md: 40 }, {xs: 24, sm:32, md: 40}]} type="flex">
                        <Col xs={24} md={12}>
                          <Form.Item label="Client DOB:">
                              <DatePicker style={{ width: '100%' }} format={dateFormat} onChange={(date, dateString) => this.handleDatePickerChange('client_birthdate', date, dateString)}/>
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item label="Client Estimated Age at Death">
                              <Input placeholder="Enter Age Here..." name="client_estimatedDeathAge" onChange={this.handleInputChange}/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item label="Client Age:">
                              <Input placeholder="Enter Age Here..." name="client_age" onChange={this.handleInputChange} defaultValue={"0"} disabled/>
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item label="Client Phone #:">
                            <PhoneNumber 
                              className="input-with-icon"
                              placeholder="Enter Phone Number Here..." 
                              name="client_primaryContactNumber" 
                              value={this.state.formData.client_primaryContactNumber}
                              onChange={this.handleInputChange}>
                            </PhoneNumber>
                          </Form.Item>
                        </Col>
                        {/* <Col xs={24} md={12}>
                          <Form.Item label="Client Phone Number - Secondary">
                              <PhoneNumber name="client_secondaryContactNumber" onChange={this.handleInputChange}></PhoneNumber>
                          </Form.Item>
                        </Col> */}
                        <Col xs={24} md={12}>
                          <Form.Item label="Client Work Phone #:">
                              <PhoneNumber 
                                className="input-with-icon"
                                value={this.state.formData.client_workContactNumber}
                                placeholder="Enter Phone Number Here..." 
                                name="client_workContactNumber" 
                                onChange={this.handleInputChange}>
                              </PhoneNumber>
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item label="Client Email Address - Primary:">
                            <Email placeholder="Enter Primary Email ID Here..." name="client_emailAddress" onChange={this.handleInputChange}></Email>
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item label="Client Email Address - Other:">
                            <Email placeholder="Enter Other Email ID Here..." name="client_secondaryEmailAddress" onChange={this.handleInputChange}></Email>
                          </Form.Item>
                        </Col>
                        <Col xs={24}>
                          <Form.Item label="Gender:">
                            <Radio.Group name="client_gender" onChange={this.handleInputChange} size={'large'}>
                              <Radio.Button value={"Male"}>Male</Radio.Button>
                              <Radio.Button value={"Female"}>Female</Radio.Button>
                            </Radio.Group>
                          </Form.Item>
                        </Col>
                        <Col xs={24}>
                          <Form.Item label="Address:">
                            <TextArea 
                              name="client_address_firstLine"
                              style={{"resize": "none"}}
                              rows={5}
                              value={this.state.formData.client_address_firstLine}
                              onChange={this.handleInputChange}
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item label="City:">
                            <Input placeholder="Enter City Name Here..." name="client_address_city" onChange={this.handleInputChange}/>
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item label="Postal Code:">
                            <Input placeholder="Enter Postal Code Here..." name="client_address_postalCode" onChange={this.handleInputChange}/>
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item label="Country:">
                            <Select
                              showSearch
                              placeholder="Select Country..."
                              onChange={(value) => this.handleSelectChange('client_address_country', value)}
                            >
                              <Option value="Aunt">Alabama</Option>
                              <Option value="Charity">Arkansas</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item label="State:">
                            <Select
                              showSearch
                              placeholder="Select State..."
                              onChange={(value) => this.handleSelectChange('client_address_state', value)}
                            >
                               <Option key={0} disabled value="" > Select State... </Option>
                                <Option value="AL">Alabama</Option>
                                <Option value="AK">Alaska</Option>
                                <Option value="AZ">Arizona</Option>
                                <Option value="AR">Arkansas</Option>
                                <Option value="CA">California</Option>
                                <Option value="CO">Colorado</Option>
                                <Option value="CT">Connecticut</Option>
                                <Option value="DE">Delaware</Option>
                                <Option value="DC">District Of Columbia</Option>
                                <Option value="FL">Florida</Option>
                                <Option value="GA">Georgia</Option>
                                <Option value="HI">Hawaii</Option>
                                <Option value="ID">Idaho</Option>
                                <Option value="IL">Illinois</Option>
                                <Option value="IN">Indiana</Option>
                                <Option value="IA">Iowa</Option>
                                <Option value="KS">Kansas</Option>
                                <Option value="KY">Kentucky</Option>
                                <Option value="LA">Louisiana</Option>
                                <Option value="ME">Maine</Option>
                                <Option value="MD">Maryland</Option>
                                <Option value="MA">Massachusetts</Option>
                                <Option value="MI">Michigan</Option>
                                <Option value="MN">Minnesota</Option>
                                <Option value="MS">Mississippi</Option>
                                <Option value="MO">Missouri</Option>
                                <Option value="MT">Montana</Option>
                                <Option value="NE">Nebraska</Option>
                                <Option value="NV">Nevada</Option>
                                <Option value="NH">New Hampshire</Option>
                                <Option value="NJ">New Jersey</Option>
                                <Option value="NM">New Mexico</Option>
                                <Option value="NY">New York</Option>
                                <Option value="NC">North Carolina</Option>
                                <Option value="ND">North Dakota</Option>
                                <Option value="OH">Ohio</Option>
                                <Option value="OK">Oklahoma</Option>
                                <Option value="OR">Oregon</Option>
                                <Option value="PA">Pennsylvania</Option>
                                <Option value="RI">Rhode Island</Option>
                                <Option value="SC">South Carolina</Option>
                                <Option value="SD">South Dakota</Option>
                                <Option value="TN">Tennessee</Option>
                                <Option value="TX">Texas</Option>
                                <Option value="UT">Utah</Option>
                                <Option value="VT">Vermont</Option>
                                <Option value="VA">Virginia</Option>
                                <Option value="WA">Washington</Option>
                                <Option value="WV">West Virginia</Option>
                                <Option value="WI">Wisconsin</Option>
                                <Option value="WY">Wyoming</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item label="Investment Knowledge:">
                            <Select
                              showSearch
                              placeholder="Select..."
                              onChange={(value) => this.handleSelectChange('client_investmentKnowledge', value)}
                            >
                              <Option value="" disabled>Select...</Option>
                              <Option value="Highly Experienced">Highly Experienced</Option>
                              <Option value="Enthusiast">Enthusiast</Option>
                              <Option value="Some Experience/General">Some Experience/General</Option>
                              <Option value="Novice/Beginner">Novice/Beginner</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item label="Date of Retirement">
                            <DatePicker style={{ width: '100%' }} format={dateFormat} onChange={(date, dateString) => this.handleDatePickerChange('client_retirementDate', date, dateString)}/>
                          </Form.Item>
                        </Col>
                        <Col xs={24}>
                          <Form.Item label="General Notes">
                            <TextArea 
                              name="client_notes" 
                              style={{"resize": "none"}}
                              rows={5}
                              value={this.state.formData.clientNotes}
                              onChange={this.handleInputChange}
                            />
                          </Form.Item>
                        </Col>
                          
                      </Row>
                    </Form>
                  </StyledForm>
                

                  <StyledForm style={{"padding-top": "0"}}>
                    <Row gutter={24} type="flex">
                        {/* Form Title */}
                        <Col xs={24}>
                          <h2>Spouse Information</h2>
                        </Col>
                    </Row>
                    <Form 
                      name="basic"
                      initialValues={{
                          remember: true,
                      }}
                      autoComplete="off"
                    >
                      <Row gutter={[{ xs: 24, sm:32, md: 40 }, {xs: 24, sm:32, md: 40}]} type="flex">
                        <Col xs={24} md={12}>
                          <Form.Item label="Spouse/Partner DOB:">
                            <DatePicker style={{ width: '100%' }} format={dateFormat} onChange={(date, dateString) => this.handleDatePickerChange('spouse_birthdate', date, dateString)}/>
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item label="Spouse/Partner Estimated Age at Death:">
                            <Input placeholder="Enter Age Here..." name="spouse_estimatedDeathAge" onChange={this.handleInputChange}/>
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item label="Spouse/Partner Current Age:">
                            <Input placeholder="Enter Age Here..." name="spouse_age" onChange={this.handleInputChange} disabled/>
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item label="Spouse/Partner Email Address - Primary:">
                            <Email placeholder="Enter Email ID Here..." name="spouse_emailAddress" onChange={this.handleInputChange}></Email>
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item label="Spouse/Partner Email Address - Other:">
                            <Email placeholder="Enter Other Email ID Here..." name="spouse_secondaryEmailAddress" onChange={this.handleInputChange}></Email>
                          </Form.Item>
                        </Col>
                        <Col xs={24}>
                          <Form.Item label="Gender:">
                            <Radio.Group name="spouse_gender" onChange={this.handleInputChange}>
                              <Radio.Button value={"Male"}>Male</Radio.Button>
                              <Radio.Button value={"Female"}>Female</Radio.Button>
                            </Radio.Group>
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item label="Spouse/Partner Phone #:">
                              <PhoneNumber 
                                className="input-with-icon"
                                placeholder="Enter Phone Number Here..." 
                                name="spouse_primaryContactNumber" 
                                value={this.state.spouse_primaryContactNumber}
                                onChange={this.handleInputChange}></PhoneNumber>
                          </Form.Item>
                        </Col>
                        {/* <Col xs={24} md={12}>
                          <Form.Item label="Spouse/Partner Phone Number - Secondary">
                              <PhoneNumber name="spouse_secondaryContactNumber" onChange={this.handleInputChange}></PhoneNumber>
                          </Form.Item>
                        </Col> */}
                        <Col xs={24} md={12}>
                          <Form.Item label="Spouse/Partner Work Phone #:">
                              <PhoneNumber 
                                className="input-with-icon"
                                placeholder="Enter Phone Number Here..." 
                                name="spouse_workContactNumber"
                                value={this.state.spouse_workContactNumber}
                                onChange={this.handleInputChange}>
                              </PhoneNumber>
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item label="Investment Knowledge:">
                            <Select
                                showSearch
                                placeholder="Select..."
                                onChange={(value) => this.handleSelectChange('spouse_investmentKnowledge', value)}
                            >
                                <Option value="" disabled>Select...</Option>
                                <Option value="Highly Experienced">Highly Experienced</Option>
                                <Option value="Enthusiast">Enthusiast</Option>
                                <Option value="Some Experience/General">Some Experience/General</Option>
                                <Option value="Novice/Beginner">Novice/Beginner</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item label="Date of Retirement:">
                            <DatePicker style={{ width: '100%' }} format={dateFormat} onChange={(date, dateString) => this.handleDatePickerChange('spouse_retirementDate', date, dateString)}/>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </StyledForm>


                <div style={{"marginBottom": "80px"}}>             
                  {/* Trust Subform Modal */}
                  <AddModal
                    title={"Add Trust Inforamtion"}
                    fields={trustSubformFields}
                    isVisible={this.state.isTrustSubformAddModalVisible}
                    cbClose={this.setTrustSubformAddModalVisible}
                    handleFormInputChange={handleFormInputChange}
                    handleInputChange={handleInputChange}
                    handleSelectChange={handleSelectChange}
                    handleDatePickerChange={handleDatePickerChange}
                    handleCurrencyChange={handleCurrencyChange}
                    handleDocumentChange={handleDocumentChange}
                    currentForm={currentForm}
                    setFormData={this.setFormData}
                    formData={this.state.formData}
                    create={this.createTrustSubform}
                  />

                  <UpdateModal
                    title={"Update Trust Information"}
                    fields={updateTrustSubformFields}
                    isVisible={this.state.isTrustSubformUpdateModalVisible}
                    cbClose={this.setTrustSubformUpdateModalVisible}
                    cbUpdate={this.updateTrustSubformRow}
                    // onLoad={this.get}
                    obj={this.state.updateObject}
                    onUpdateChange={this.onUpdateChange}
                    handleDateChange={this.handleDateChange}

                    // onConstraints={this.onConstraints}
                  />

                  <Add
                    title={"Trust Information"}
                    button={"Add Trust Subform"}
                    cbAdd={this.setTrustSubformAddModalVisible}
                  />         

                  {
                    // get trust subform row
                    this.state.trust_subform_list.map((data, index) =>
                        this.getTrustSubformRow({ data, index: index + 1 })
                    )
                  }
                </div>



              <div style={{"marginBottom": "80px"}}>
                  {/* Corporate Subform Modal */}
                  <AddModal
                    title={"Add Corporate Information"}
                    fields={corporateSubformFields}
                    isVisible={this.state.isCorporateSubformAddModalVisible}
                    cbClose={this.setCorporateSubformAddModalVisible}
                    handleFormInputChange={handleFormInputChange}
                    handleInputChange={handleInputChange}
                    handleSelectChange={handleSelectChange}
                    handleDatePickerChange={handleDatePickerChange}
                    handleCurrencyChange={handleCurrencyChange}
                    handleDocumentChange={handleDocumentChange}
                    currentForm={currentForm}
                    setFormData={this.setFormData}
                    formData={this.state.formData}
                    create={this.createCorporateSubform}
                  />

                  <UpdateModal
                    title={"Update Corporate Subform"}
                    fields={updateCorporateSubformFields}
                    isVisible={this.state.isCorporateSubformUpdateModalVisible}
                    cbClose={this.setCorporateSubformUpdateModalVisible}
                    cbUpdate={this.updateCorporateSubformRow}
                    // onLoad={this.get}
                    obj={this.state.updateObject}
                    onUpdateChange={this.onUpdateChange}
                    handleDateChange={this.handleDateChange}

                    // onConstraints={this.onConstraints}
                  />

                  <Add
                    title={"Corporate Information"}
                    button={"Add Corporate Information"}
                    cbAdd={this.setCorporateSubformAddModalVisible}
                  />         

                  {
                    // get corporate subform row
                    this.state.corporate_subform_list.map((data, index) =>
                        this.getCorporateSubformRow({ data, index: index + 1 })
                    )
                  }
                </div>
               


                <div style={{"marginBottom": "80px"}}>
                  {/* Charity Information Modal */}
                  <AddModal
                    title={"Add Charity Information"}
                    fields={charitySubformFields}
                    isVisible={this.state.isCharitySubformAddModalVisible}
                    cbClose={this.setCharitySubformAddModalVisible}
                    handleFormInputChange={handleFormInputChange}
                    handleInputChange={handleInputChange}
                    handleSelectChange={handleSelectChange}
                    handleDatePickerChange={handleDatePickerChange}
                    handleCurrencyChange={handleCurrencyChange}
                    handleDocumentChange={handleDocumentChange}
                    currentForm={currentForm}
                    setFormData={this.setFormData}
                    formData={this.state.formData}
                    create={this.createCharitySubform}
                  />


                  <UpdateModal
                    title={"Update Charity Information"}
                    fields={updateCharitySubformFields}
                    isVisible={this.state.isCharitySubformUpdateModalVisible}
                    cbClose={this.setCharitySubformUpdateModalVisible}
                    cbUpdate={this.updateCharitySubformRow}
                    // onLoad={this.get}
                    obj={this.state.updateObject}
                    onUpdateChange={this.onUpdateChange}
                    handleDateChange={this.handleDateChange}

                    // onConstraints={this.onConstraints}
                  />

                  <Add
                    title={"Charity Information"}
                    button={"Add Charity Subform"}
                    cbAdd={this.setCharitySubformAddModalVisible}
                  />         

                  {
                    // get charity subform row
                    this.state.charity_subform_list.map((data, index) =>
                        this.getCharitySubformRow({ data, index: index + 1 })
                    )
                  }
                </div>


                <div style={{"marginBottom": "80px"}}>
                  {/* Others Impacted Modal */}
                  <AddModal
                    title={"Add Others Impacted"}
                    fields={financialSubformFields}
                    isVisible={this.state.isFinancialSubformAddModalVisible}
                    cbClose={this.setFinancialSubformAddModalVisible}
                    handleFormInputChange={handleFormInputChange}
                    handleInputChange={handleInputChange}
                    handleSelectChange={handleSelectChange}
                    handleDatePickerChange={handleDatePickerChange}
                    handleCurrencyChange={handleCurrencyChange}
                    handleDocumentChange={handleDocumentChange}
                    currentForm={currentForm}
                    setFormData={this.setFormData}
                    formData={this.state.formData}
                    create={this.createFinancialSubform}
                  />


                  <UpdateModal
                    title={"Update Others Impacted"}
                    fields={updateFinancialSubformFields}
                    isVisible={this.state.isFinancialSubformUpdateModalVisible}
                    cbClose={this.setFinancialSubformUpdateModalVisible}
                    cbUpdate={this.updateFinancialSubformRow}
                    // onLoad={this.get}
                    obj={this.state.updateObject}
                    onUpdateChange={this.onUpdateChange}
                    handleDateChange={this.handleDateChange}

                    // onConstraints={this.onConstraints}
                  />

                  <Add
                    title={"Others Impacted"}
                    button={"Add Financial Subform"}
                    cbAdd={this.setFinancialSubformAddModalVisible}
                  />         

                  {
                    // get financial subform row
                    this.state.financial_subform_list.map((data, index) =>
                        this.getFinancialSubformRow({ data, index: index + 1 })
                    )
                  }
                </div>


                <div style={{"marginBottom": "80px"}}>
                  {/* Professional Information Modal */}
                  <AddModal
                    title={"Add Professional Information"}
                    fields={professionalSubformFields}
                    isVisible={this.state.isProfessionalSubformAddModalVisible}
                    cbClose={this.setProfessionalSubformAddModalVisible}
                    handleFormInputChange={handleFormInputChange}
                    handleInputChange={handleInputChange}
                    handleSelectChange={handleSelectChange}
                    handleDatePickerChange={handleDatePickerChange}
                    handleCurrencyChange={handleCurrencyChange}
                    handleDocumentChange={handleDocumentChange}
                    currentForm={currentForm}
                    setFormData={this.setFormData}
                    formData={this.state.formData}
                    create={this.createProfessionalSubform}
                  />

                  <UpdateModal
                    title={"Update Professional Information"}
                    fields={updateProfessionalSubformFields}
                    isVisible={this.state.isProfessionalSubformUpdateModalVisible}
                    cbClose={this.setProfessionalSubformUpdateModalVisible}
                    cbUpdate={this.updateProfessionalSubformRow}
                    // onLoad={this.get}
                    obj={this.state.updateObject}
                    onUpdateChange={this.onUpdateChange}
                    handleDateChange={this.handleDateChange}

                    // onConstraints={this.onConstraints}
                  />

                  <Add
                    title={"Professional Information"}
                    button={"Add Professional Information"}
                    cbAdd={this.setProfessionalSubformAddModalVisible}
                  />         

                  {
                    // get professional subform row
                    this.state.professional_subform_list.map((data, index) =>
                        this.getProfessionalSubformRow({ data, index: index + 1 })
                    )
                  }
                </div>
                
                  <div className="row justify-content-between">
                    <div className="col-8"></div>
                    <div className="col-4 d-flex justify-content-end">
                      <Button
                        type="submit"
                        size={"large"}
                        onClick={() => {
                          // this.props.nextForm();
                        }}
                        style={{ background: "#39b54a", width: "30%" }}
                      >
                        {/* <Icon type="left" /> */}
                        <span className="custom-footer-text">Submit</span>
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>


      </React.Fragment>
    );
  }
}

export default ClientForm;
