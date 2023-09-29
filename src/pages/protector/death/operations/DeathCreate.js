import React, { Component } from "react";
import { Icon } from "antd";
import ChecklistForm from "../../../../components/form/death/Checklist";
import MessageForm from "../../../../components/form/death/MessageForm";
import AudioVideoMessage from "../../../../components/form/death/AudioVideoMessageForm";
import ContactListForm from "../../../../components/form/death/ContactListForm";
import EmailToSendForm from "../../../../components/form/death/EmailToSendForm";
import DocumentsForm from "../../../../components/form/death/DocumentsForm";
import PersonalInstructionsForm from "../../../../components/form/death/PersonalInstructionsForm";
import LargeBillsForm from "../../../../components/form/death/LargeBillsForm";
import LitigationForm from "../../../../components/form/death/LitigationForm";
import ProgrammingStatusForm from "../../../../components/form/death/ProgrammingStatusForm";
import ListOfPasswordsForm from "../../../../components/form/death/ListOfPasswordsForm";
import PrepaidBurialExpenseForm from "../../../../components/form/death/PrepaidBurialExpenseForm";
import PersonalItemLocationForm from "../../../../components/form/death/PersonalItemLocationForm";
import BreadCrumb from "../../../../components/BreadCrumb";
import FormWizardHeader from "../../../../components/FormWizardHeader";
import { FormPagePose } from "../../../../components/Animations";
import DeathSideDisplay from "./DeathSideDisplay";
import AccountAssetForm from "../../../../components/form/death/AccountAssetForm";
import BillsToPayForm from "../../../../components/form/death/BillsToPayForm";
import Loader from "../../../../components/styled-components/loader/loader";
import { connect } from 'react-redux';

import swal from "sweetalert";
import moment from "moment";

class DeathCreate extends Component {
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
        messageForm: {},
        accountAssetForm: {},
        audioVideoForm: {},
        contactListForm: {},
        emailToSendForm: {},
        documentsForm: {},
        personalInstructionsForm: {},
        largeBillsForm: {},
        litigationForm: {},
        personalItemLocationForm: {},
        listOfPasswordsForm: {},
        prepaidBurialExpenseForm: {},
        programmingStatusForm: {},
        billsToPayForm: {},
      },
      formSteps: [
        {
          id: "MessageForm ",
          icon: "icon_ex.png",
          title: "Executer/Trustee Start Here ",
          component: MessageForm,
          type: "death",
        },
        {
          id: "AudioVideoMessage",
          icon: "icon_ex.png",
          title: "Audio Video Message",
          component: AudioVideoMessage,
          type: "death",
        },
        {
          id: "checkList",
          icon: "icon_ex.png",
          title: "CheckList",
          component: ChecklistForm,
          type: "death",
        },


        {
          id: "personalInstructionsForm",
          icon: "icon_ex.png",
          title: "Personal Instructions",
          component: PersonalInstructionsForm,
          type: "death",
        },
        {
          id: "contactListForm",
          icon: "icon_ex.png",
          title: "Contact List",
          component: ContactListForm,
          type: "death",
        },
        {
          id: "emailToSendForm",
          icon: "icon_ex.png",
          title: "Emails & Text to Send",
          component: EmailToSendForm,
          type: "death",
        },
        {
          id: "prepaidBurialExpenseForm",
          icon: "icon_ex.png",
          title: "Funeral Wishes",
          component: PrepaidBurialExpenseForm,
          type: "death",
        },
        {
          id: "listOfPasswordsForm",
          icon: "icon_ex.png",
          title: "List of Passwords",
          component: ListOfPasswordsForm,
          type: "death",
        },
        {
          id: "billsToPayForm",
          icon: "icon_ex.png",
          title: "Bills to Pay",
          component: BillsToPayForm,
          type: "death",
        },
        {
          id: "accountAssetForm",
          icon: "icon_ex.png",
          title: "Assets and Liabilities",
          component: AccountAssetForm,
          type: "death",
        },
        {
          id: "documentsForm",
          icon: "icon_ex.png",
          title: "Important Documents",
          component: DocumentsForm,
          type: "death",
        },
        {
          id: "litigationForm",
          icon: "icon_ex.png",
          title: "Litigation List",
          component: LitigationForm,
          type: "death",
        },
        {
          id: "personalItemLocationForm",
          icon: "icon_ex.png",
          title: "Location of Personal Items",
          component: PersonalItemLocationForm,
          type: "death",
        },
      ],

      formStepsOther: [
        {
          id: "MessageForm ",
          icon: "icon_ex.png",
          title: "Executer/Trustee Start Here ",
          component: MessageForm,
          type: "death",
        },
        {
          id: "checkList",
          icon: "icon_ex.png",
          title: "CheckList",
          component: ChecklistForm,
          type: "death",
        },
        {
          id: "AudioVideoMessage",
          icon: "icon_ex.png",
          title: "Audio Video Message",
          component: AudioVideoMessage,
          type: "death",
        },
        {
          id: "personalInstructionsForm",
          icon: "icon_ex.png",
          title: "Personal Instructions",
          component: PersonalInstructionsForm,
          type: "death",
        },

        {
          id: "emailToSendForm",
          icon: "icon_ex.png",
          title: "Emails & Text to Send",
          component: EmailToSendForm,
          type: "death",
        },
        {
          id: "contactListForm",
          icon: "icon_ex.png",
          title: "Contact List",
          component: ContactListForm,
          type: "death",
        },
        {
          id: "prepaidBurialExpenseForm",
          icon: "icon_ex.png",
          title: "Funeral Wishes",
          component: PrepaidBurialExpenseForm,
          type: "death",
        },
        {
          id: "listOfPasswordsForm",
          icon: "icon_ex.png",
          title: "List of Passwords",
          component: ListOfPasswordsForm,
          type: "death",
        },
        {
          id: "billsToPayForm",
          icon: "icon_ex.png",
          title: "Bills to Pay",
          component: BillsToPayForm,
          type: "death",
        },
        {
          id: "accountAssetForm",
          icon: "icon_ex.png",
          title: "Assets and Liabilities",
          component: AccountAssetForm,
          type: "death",
        },
        {
          id: "documentsForm",
          icon: "icon_ex.png",
          title: "Important Documents",
          component: DocumentsForm,
          type: "death",
        },
        {
          id: "litigationForm",
          icon: "icon_ex.png",
          title: "Litigation List",
          component: LitigationForm,
          type: "death",
        },
        {
          id: "personalItemLocationForm",
          icon: "icon_ex.png",
          title: "Location of Personal Items",
          component: PersonalItemLocationForm,
          type: "death",
        },
      ],
    };
  }

  componentWillMount() {
    const userRole = localStorage.getItem("role") != 'undefined' && JSON.parse(localStorage.getItem("role"))

    this.setState({
      currentForm:
        userRole === "trustee" || userRole === "protrustee"
          ? this.state.formStepsOther[0]
          : this.state.formSteps[0],
    });
    // console.log("userlogin Role", this.props.loginUserRole.user.roles.hasOwnProperty("trustee"));
    // console.log("userRole parse death create", JSON.parse(userRole).trustee.name);
  }
  componentDidMount() {
    // console.log("userlogin Role", this.props.loginUserRole?.user);
  }
  componentDidUpdate() { }

  getIndexOfCurrentComponent = (id) => {
    const userRole = JSON.parse(localStorage.getItem("role"))
    userRole === "trustee" || userRole === "protrustee"
      ? this.state.formStepsOther.find((step, index) => {
        if (id === step.id) this.setState({ currentFormIndex: index });
      })
      : this.state.formSteps.find((step, index) => {
        if (id === step.id) this.setState({ currentFormIndex: index });
      });
  };
  handleLoader = () => this.setState({ isLoading: !this.state.isLoading });
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
    const userRole = localStorage.getItem("role")
    // const newRole=JSON.parse(userRole).trustee.name;
    // console.log("userRole parse death create", newRole);

    if (this.state.currentRole === "") this.setState({ currentRole: "ROLE" });
    else this.setState({ currentRole: "" });
  };

  nextForm = async (submitFunction) => {
    // Submitting form on Next Form Click
    const userRole = JSON.parse(localStorage.getItem("role"))

    try {
      if (submitFunction instanceof Function) {
        await submitFunction();
        this.setState({ isLoading: false })
        // swal("Success!", "You data has been saved!", "success");
        this.setState({
          currentForm:
            userRole === "trustee" || userRole === "protrustee"
              ? this.state.formStepsOther[this.state.currentFormIndex + 1]
              : this.state.formSteps[this.state.currentFormIndex + 1],
          currentFormIndex: this.state.currentFormIndex + 1,
        });
      } else {
        this.setState({
          currentForm:
            userRole === "trustee" || userRole === "protrustee"
              ? this.state.formStepsOther[this.state.currentFormIndex + 1]
              : this.state.formSteps[this.state.currentFormIndex + 1],
          currentFormIndex: this.state.currentFormIndex + 1,
        });
      }
    } catch (error) {
      swal("Error!", "Could Not Save Data!", "error");
      console.log("Error Calling Api", error);
    }
  };

  previousForm = () => {
    const userRole = JSON.parse(localStorage.getItem("role"))

    this.setState({
      currentForm:
        userRole === "trustee" || userRole === "protrustee"
          ? this.state.formStepsOther[this.state.currentFormIndex - 1]
          : this.state.formSteps[this.state.currentFormIndex - 1],
      currentFormIndex: this.state.currentFormIndex - 1,
    });
  };

  toggleRightSide = () => {
    if (this.state.toggleClass) this.setState({ toggleClass: false });
    else this.setState({ toggleClass: true });
  };
  handleChange = () => { };

  handleChecklistObject = (formName, personal_instructions) => {
    let formData = this.state.checklistObject;
    formData[formName.id] = personal_instructions;
    this.setState({ checklistObject: formData }, () => {
      this.handleChange();
    });
  };

  // Input Handler Start

  handleFormInputChange = (formName, name, value) => {
    let formData = this.state.checklistObject;
    formData[formName.id][name] = value;
  };

  handleInputChange = (event, formName) => {
    const { name, value } = event.target;
    this.handleFormInputChange(formName, name, value);
  };

  handleDatePickerChange = (name, date, dateString, formName) => {

    this.handleFormInputChange(formName, name, moment(dateString).format('LL'));
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
    this.handleFormInputChange(formName, name, value);
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

  navigate = (path) => {
    this.props.history.push(path);
  };

  genExtra = (id) => <Icon type="form"></Icon>;
  componentDidMount() { }
  render() {
    const CurrentForm = this.state.currentForm.component;
    const userRole =localStorage.getItem("role") != 'undefined' && JSON.parse(localStorage.getItem("role"))

    return (
      <div
        className={
          this.state.toggleClass
            ? "form-page-container-wrap right-side--opend"
            : "form-page-container-wrap right-side--collapsed"
        }
      >
        <div className="form-page--main-side" >
          <FormWizardHeader

            steps={
              userRole === "trustee" || userRole === "protrustee"
                ? this.state.formStepsOther
                : this.state.formSteps
            }
            getHeaderClickedForm={this.getHeaderClickedForm}
            currentFormIndex={this.state.currentFormIndex}
            getIndexOfCurrentComponent={this.getIndexOfCurrentComponent}
          />
          <div className={this.state.currentFormIndex === 0 ? "container1" : "container"} >
            {/* <BreadCrumb /> */}
            {console.log("current step", this.state.currentFormIndex)}
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
                    navigate={this.navigate}
                    role={userRole}
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
            <DeathSideDisplay
              data={this.state.checklistObject}
              steps={
                userRole === "trustee" || userRole === "protrustee"
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
const mapStateToProps = (state) => ({
  loginUserRole: state.rootReducer.loginUser.loginUserData
});

export default connect(mapStateToProps)(DeathCreate);
