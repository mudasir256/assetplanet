import React, { Component } from 'react';
import { Icon } from 'antd';
import BreadCrumb from '../../../../components/BreadCrumb';
import FormWizardHeader from '../../../../components/FormWizardHeader';
import { FormPagePose } from '../../../../components/Animations';
import MessageForm from '../../../../components/form/disability/MessageForm';
import ExpensesAndIncomeForm from '../../../../components/form/disability/ExpensesAndIncomeForm';
import DisabilityInformationForm from '../../../../components/form/disability/DisabilityInformation';
import CoverageInformationForm from '../../../../components/form/disability/CoverageInformationForm';
// import DivorceDetailForm from '../../../../components/form/divorce/DivorceDetailForm';
// import PropertyListForm from '../../../../components/form/divorce/PropertyListForm';
// import SpousalDetailForm from '../../../../components/form/divorce/SpousalDetailForm';
// import BudgetChangesForm from '../../../../components/form/divorce/BudgetChanges';
// import UnequalResolutionDetailForm from '../../../../components/form/divorce/UnequalResolutionDetailForm';
// import PropertyDetailForm from '../../../../components/form/divorce/PropertyDetailForm';
// import SeparatePropertyAccountDetailsForm from '../../../../components/form/divorce/SeparatePropertyAccountDetailsForm';
// import CustodyDetailsForm from '../../../../components/form/divorce/CustodyDetailsForm';
// import TaxReturnDetailsForm from '../../../../components/form/divorce/TaxReturnDetailsForm';
// import ChildSupportDetailsForm from '../../../../components/form/divorce/ChildSupportDetailsForm';
// import CheckList from '../../../../components/form/divorce/CheckList';
import DisabilitySideDisplay from './DisabilitySideDisplay';

class DisabilityCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentForm: null,
      formVisible: true,
      currentFormIndex: 0,
      toggleClass: false,

      disabilityObject: {
        MessageForm: {},
        ExpensesAndIncomeForm: {},
        DisabilityInformationForm: {},
        CoverageInformationForm: {},
      },

      formSteps: [
        {
          id: 'MessageForm',
          icon: 'icon_ex.png',
          title: 'Message',
          component: MessageForm,
        },
        {
          id: 'DisabilityInformationForm',
          icon: 'icon_ex.png',
          title: 'Disability Information',
          component: DisabilityInformationForm,
        },
        {
          id: 'ExpensesAndIncomeForm',
          icon: 'icon_ex.png',
          title: 'Expenses and Income',
          component: ExpensesAndIncomeForm,
        },
        {
          id: 'CoverageInformationForm',
          icon: 'icon_ex.png',
          title: 'Coverage Information',
          component: CoverageInformationForm,
        },
      ],
    };
  }

  componentWillMount() {
    this.setState({ currentForm: this.state.formSteps[0] });
  }

  getIndexOfCurrentComponent = (id) => {
    this.state.formSteps.map((step, index) => {
      if (id === step.id) this.setState({ currentFormIndex: index });
    });
  };

  getHeaderClickedForm = (form) => {
    this.setState({ currentForm: form });
  };

  nextForm = () => {
    this.setState({
      currentForm: this.state.formSteps[this.state.currentFormIndex + 1],
      currentFormIndex: this.state.currentFormIndex + 1,
    });
  };

  previousForm = () => {
    this.setState({
      currentForm: this.state.formSteps[this.state.currentFormIndex - 1],
      currentFormIndex: this.state.currentFormIndex - 1,
    });
  };

  toggleRightSide = () => {
    if (this.state.toggleClass) this.setState({ toggleClass: false });
    else this.setState({ toggleClass: true });
  };

  // Input Handler Start

  handleFormInputChange = (formName, name, value) => {
    let formData = this.state.disabilityObject;
    formData[formName][name] = value;
    this.setState({ disabilityObject: formData });
  };

  handleInputChange = (event, formName) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.handleFormInputChange(formName, name, value);
  };

  handleDatePickerChange = (name, date, dateString, formName) => {
    this.handleFormInputChange(formName, name, dateString);
  };

  handleSelectChange = (name, value, formName) => {
    this.handleFormInputChange(formName, name, value);
  };

  // Input Handler End

  navigate = (path) => {
    this.props.history.push(path);
  };

  render() {
    const CurrentForm = this.state.currentForm.component;

    return (
      <div
        className={
          this.state.toggleClass
            ? 'form-page-container-wrap right-side--opend'
            : 'form-page-container-wrap right-side--collapsed'
        }
      >
        <div className='form-page--main-side'>
          <FormWizardHeader
            steps={this.state.formSteps}
            getHeaderClickedForm={this.getHeaderClickedForm}
            currentFormIndex={this.state.currentFormIndex}
            getIndexOfCurrentComponent={this.getIndexOfCurrentComponent}
          />

          <div className='container'>
            <div style={{
              marginTop: '2em'
            }}>

            </div>
            {/* <BreadCrumb /> */}

            <div className='form-page-container'>
              <div className='form-page--left-side'>
                <FormPagePose
                  className='info-form-block'
                  pose={this.state.formVisible ? 'visible' : 'hidden'}
                >
                  <CurrentForm
                    nextForm={this.nextForm}
                    previousForm={this.previousForm}
                    handleInputChange={this.handleInputChange}
                    disabilityObject={this.state.disabilityObject}
                    handleDatePickerChange={this.handleDatePickerChange}
                    handleSelectChange={this.handleSelectChange}
                    handleFormInputChange={this.handleFormInputChange}
                    navigate={this.navigate}
                  />
                </FormPagePose>
              </div>
            </div>
          </div>
        </div>
        <div className='form-page--right-side custom'>
          <span
            className='right-side-collapse-icon'
            onClick={this.toggleRightSide}
          >
            <i className='fe-menu'></i>
          </span>
          <div className='form-page--right-side-wrap'>
            <DisabilitySideDisplay
              data={this.state.disabilityObject}
              steps={this.state.formSteps}
              currentFormIndex={this.state.currentFormIndex}
              getHeaderClickedForm={this.getHeaderClickedForm}
              getIndexOfCurrentComponent={this.getIndexOfCurrentComponent}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default DisabilityCreate;
