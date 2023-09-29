import React, { Component } from "react";
import { Icon } from "antd";
import ClientSpouseInformationSubForm from './subforms/ClientSpouseInformationSubForm';
import ClientInformationSubForm from './subforms/ClientInformationSubForm';
import SpouseInformationSubForm from './subforms/SpouseInformationSubForm';
import DependentsSubForm from './subforms/DependentsSubForm';
import TrustInformationSubForm from './subforms/TrustInformationSubForm';
import CorporateInformationSubForm from './subforms/CorporateInformationSubForm';
import CharityInformationSubForm from './subforms/CharityInformationSubForm';
import OthersImpactedSubForm from './subforms/OthersImpactedSubForm';
import ProfessionalContactsSubForm from './subforms/ProfessionalContactsSubForm';
import MyDetailsInformationSubForm from './subforms/MyDetailsInformationSubForm';
import FormWizardHeader from "../../../components/FormWizardHeader";
import { FormPagePose } from "../../../components/Animations";
// import EndSubForm from './subforms/EndSubForm';
import ClientInfoSideDisplay from './operations/ClientInfoSideDisplay';
import Loader from "../../../components/styled-components/loader/loader";

class ClientDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentForm: null,
      formVisible: true,
      currentFormIndex: 0,
      toggleClass: false,
      currentRole: "",
      isLoading: false,

      checklistObject: {
        checkList: {},
        clientInformationForm: {},
        spouseInformationForm: {},
        dependentsForm: {},
        trustInformationForm: {},
        corporateInformationForm: {},
        charityInformationForm: {},
        othersImpactedForm: {},
      },

      formSteps: [
        {
          id: "ClientInformationSubForm",
          icon: "icon_ex.png",
          title: "Client Information",
          component: ClientInformationSubForm,
        },
        {
          id: "SpouseInformationSubForm",
          icon: "icon_ex.png",
          title: "Spouse Information",
          component: SpouseInformationSubForm,
        },
        {
          id: "DependentsSubForm",
          icon: "icon_ex.png",
          title: "Dependents",
          component: DependentsSubForm,
        },
        {
          id: "TrustInformationSubForm",
          icon: "icon_ex.png",
          title: "Trust Information",
          component: TrustInformationSubForm,
        },
        {
          id: "CorporateInformationSubForm",
          icon: "icon_ex.png",
          title: "Corporate Information",
          component: CorporateInformationSubForm,
        },
        {
          id: "CharityInformationSubForm",
          icon: "icon_ex.png",
          title: "Charity Information",
          component: CharityInformationSubForm,
        },
        {
          id: "OthersImpactedSubForm",
          icon: "icon_ex.png",
          title: "Others Impacted",
          component: OthersImpactedSubForm,
        },
      ],

      formStepsOther: [
        {
          id: "ClientInformationSubForm",
          icon: "icon_ex.png",
          title: "Client Information",
          component: ClientInformationSubForm,
        },
        {
          id: "SpouseInformationSubForm",
          icon: "icon_ex.png",
          title: "Spouse Information",
          component: SpouseInformationSubForm,
        },
        {
          id: "DependentsSubForm",
          icon: "icon_ex.png",
          title: "Dependents",
          component: DependentsSubForm,
        },
        {
          id: "TrustInformationSubForm",
          icon: "icon_ex.png",
          title: "Trust Information",
          component: TrustInformationSubForm,
        },
        {
          id: "CorporateInformationSubForm",
          icon: "icon_ex.png",
          title: "Corporate Information",
          component: CorporateInformationSubForm,
        },
        {
          id: "CharityInformationSubForm",
          icon: "icon_ex.png",
          title: "Charity Information",
          component: CharityInformationSubForm,
        },
        {
          id: "OthersImpactedSubForm",
          icon: "icon_ex.png",
          title: "Others Impacted",
          component: OthersImpactedSubForm,
        },
      ],
    };
  }

  componentWillMount() {
    this.setState({
      currentForm:
        this.state.currentRole === "ROLE"
          ? this.state.formStepsOther[0]
          : this.state.formSteps[0],
    });
  }
  

  componentDidUpdate(){


  }
  handleLoader = () => this.setState({ isLoading: !this.state.isLoading });

  getIndexOfCurrentComponent = (id) => {
    this.state.currentRole === "ROLE"
      ? this.state.formStepsOther.map((step, index) => {
          if (id === step.id) this.setState({ currentFormIndex: index });
        })
      : this.state.formSteps.map((step, index) => {
          if (id === step.id) this.setState({ currentFormIndex: index });
        });
  };

  getHeaderClickedForm = (form) => {
    this.setState({ formVisible: false });
    this.setState({ currentForm: form });
    setTimeout(() => {
      this.setState({
        formVisible: true,
      });
    }, 100);
  };

  changeRole = () => {
    if (this.state.currentRole === "") this.setState({ currentRole: "ROLE" });
    else this.setState({ currentRole: "" });
  };
  nextForm = () => {
    this.setState({ formVisible: false });
    this.setState({
      currentForm:
        this.state.currentRole === "ROLE"
          ? this.state.formStepsOther[this.state.currentFormIndex + 1]
          : this.state.formSteps[this.state.currentFormIndex + 1],
      currentFormIndex: this.state.currentFormIndex + 1,
    });
    setTimeout(() => {
      this.setState({
        formVisible: true,
      });
    }, 100);
  };

  previousForm = () => {
    this.setState({
      currentForm:
        this.state.currentRole === "ROLE"
          ? this.state.formStepsOther[this.state.currentFormIndex - 1]
          : this.state.formSteps[this.state.currentFormIndex - 1],
      currentFormIndex: this.state.currentFormIndex - 1,
    });
  };

  toggleRightSide = () => {
    if (this.state.toggleClass) this.setState({ toggleClass: false });
    else this.setState({ toggleClass: true });
  };
 handleChange = () => {
console.log(this.state.checklistObject);
 }

  handleChecklistObject=(formName,personal_instructions) =>{
    // console.log("in handleChecklistObjecthandleChecklistObjecthandleChecklistObjecthandleChecklistObject",personal_instructions);
    // console.log(personal_instructions);
      
        // console.log("checlistobject",this.state.checklistObject);
        let formData = this.state.checklistObject;

        
        formData[formName.id] = personal_instructions;    
        // console.log("formdata",formData["personalInstructionsForm"]);
        // console.log("form data", formData);
    
        this.setState({ checklistObject: formData },()=>{
          // console.log(this.state.checklistObject);
          this.handleChange()
        });      
        
  }


  // Input Handler Start

  handleFormInputChange = (formName, name, value) => {
    let formData = this.state.checklistObject;

    // console.log("name",name);
    // console.log("value",value);
    // console.log("formname",formName);
    
    formData[formName.id][name] = value;    
    // console.log("formdata",formData);
    // this.setState({ checklistObject: formData });
  };

  handleInputChange = (event, formName) => {



    const { name, value } = event.target;
    this.handleFormInputChange(formName, name, value);

  };

  handleDatePickerChange = (name, date, dateString, formName) => {
    this.handleFormInputChange(formName, name, dateString);
  };

  handleSelectChange = (name, value, formName) => {
    this.handleFormInputChange(formName, name, value);
  };

  handleRadioChange = (name, value, formName) => {
    this.handleFormInputChange(formName, name, value);
  };

  handleCurrencyChange = (name, value, formName) => {
    this.handleFormInputChange(formName, name, value);
  };

  handleToggleCustomChange = (name, value, formName) => {
 
    this.handleFormInputChange(formName, name, value);
  };

  handlePhoneChange = (name, value, formName) => {
 
    this.handleFormInputChange(formName, name, value);
  };


  handleDocumentChange = (name, value, formName) => {
    const val = value.name
 
    this.handleFormInputChange(formName, name, val);
  };

  handleWebChange = (name, value, formName) => {
 
    this.handleFormInputChange(formName, name, value);
  };


  handleChecklistChange = (name, value, formName) => {
   
    this.handleFormInputChange(formName, name, value);
  };

  handleRichTextChange = (name, value, formName) => {
   
    this.handleFormInputChange(formName, name, value);
  };


  // Input Handler End

  naviagte = (path) => {
    this.props.history.push(path);
  };

  genExtra = (id) => <Icon type="form"></Icon>;

  componentDidMount(){
    console.log("in client create did mount");
    console.log(this.state.checklistObject);
  }

  render() {
    const CurrentForm = this.state.currentForm.component;

    return (
      <div
        className={
          this.state.toggleClass
            ? "form-page-container-wrap right-side--opend"
            : "form-page-container-wrap right-side--collapsed"
        }
      >
        <div className="form-page--main-side">
          <FormWizardHeader
            steps={
              this.state.currentRole === "ROLE"
                ? this.state.formStepsOther
                : this.state.formSteps
            }
            getHeaderClickedForm={this.getHeaderClickedForm}
            currentFormIndex={this.state.currentFormIndex}
            getIndexOfCurrentComponent={this.getIndexOfCurrentComponent}
          />

          <div className="container">
            {/* <BreadCrumb /> */}
            <div
              style={{
                marginTop: "45px",
              }}
            ></div>

            <div className="form-page-container">
              <div className="form-page--left-side">
                <FormPagePose
                  className="info-form-block"
                  pose={this.state.formVisible ? "visible" : "hidden"}
                >
                  <CurrentForm
                    currentForm={this.state.currentForm}
                    nextForm={this.nextForm}
                    previousForm={this.previousForm}
                    handleInputChange={this.handleInputChange}
                    checklistObject={this.state.checklistObject}
                    handleDatePickerChange={this.handleDatePickerChange}
                    handleSelectChange={this.handleSelectChange}
                    handleFormInputChange={this.handleFormInputChange}
                    handleCurrencyChange={this.handleCurrencyChange}
                    handlePhoneChange={this.handlePhoneChange}
                    handleDocumentChange={this.handleDocumentChange}
                    handleRadioChange={this.handleRadioChange}
                    handleWebChange={this.handleWebChange}
                    handleRichTextChange={this.handleRichTextChange}
                    navigate={this.naviagte}
                    role={this.state.currentRole}
                    changeRole={this.changeRole}
                    handleChecklistObject={this.handleChecklistObject}
                    handleLoader={this.handleLoader}

                  />
                </FormPagePose>
              </div>
            </div>
          </div>
        </div>
        <div className="form-page--right-side custom">
          <span
            className="right-side-collapse-icon"
            onClick={this.toggleRightSide}
          >
            <i className="fe-menu"></i>
          </span>
          <div className="form-page--right-side-wrap">
            <ClientInfoSideDisplay
              data={this.state.checklistObject}
              steps={
                this.state.currentRole === "ROLE"
                  ? this.state.formStepsOther
                  : this.state.formSteps
              }
              currentFormIndex={this.state.currentFormIndex}
              getHeaderClickedForm={this.getHeaderClickedForm}
              getIndexOfCurrentComponent={this.getIndexOfCurrentComponent}
              genExtra={this.genExtra}
            />
          </div>
        </div>
        <Loader isLoading={this.state.isLoading}></Loader>
      </div>
    );
  }
}

export default ClientDetail;
