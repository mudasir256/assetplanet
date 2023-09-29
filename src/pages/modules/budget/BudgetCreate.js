import React, { Component } from 'react';
import { Icon } from 'antd';
import BreadCrumb from '../../../components/BreadCrumb';
import FormWizardHeader from '../../../components/FormWizardHeader';
import { FormPagePose } from '../../../components/Animations';
import CharityForm from '../../../components/form/budget/CharityForm';
import ChildandFamilyCareForm from '../../../components/form/budget/ChildandFamilyCareForm';
import DebtPaymentForm from '../../../components/form/budget/DebtPaymentForm';
import EntertainmentForm from '../../../components/form/budget/EntertainmentForm';
import ProfessionalForm from '../../../components/form/budget/ProfessionalForm';
import HomeForm from '../../../components/form/budget/HomeForm';
import InsuranceForm from '../../../components/form/budget/InsuranceForm';
import PersonalCareForm from '../../../components/form/budget/PersonalCareForm';
import PetForm from '../../../components/form/budget/PetForm';
import ShoppingForm from '../../../components/form/budget/ShoppingForm';
import TransportationForm from '../../../components/form/budget/TransportationForm';
import UtilitiesForm from '../../../components/form/budget/UtilitiesForm';
import FinanceForm from '../../../components/form/budget/FinanceForm';
import BusinessForm from '../../../components/form/budget/BusinessForm';
import SavingGoalForm from '../../../components/form/budget/SavingGoalForm';
import BudgetSideDisplay from './BudgetSideDisplay';

class BudgetCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentForm: null,
      formVisible: true,
      currentFormIndex: 0,
      toggleClass: false,
      budget: {
        CharityForm: {},
        ChildandFamilyCareForm: {},
        DebtPaymentForm: {},
        EntertainmentForm: {},
        ProfessionalForm: {},
        HomeForm: {},
        InsuranceForm: {},
        PersonalCareForm: {},
        PetForm: {},
        ShoppingForm: {},
        TransportationForm: {},
        UtilitiesForm: {},
        FinanceForm: {},
        BusinessForm: {},
        SavingGoalForm: {},
      },

      formSteps: [
        {
          id: 'CharityForm',
          icon: 'icon_ex.png',
          title: 'Charity',
          component: CharityForm,
        },
        {
          id: 'ChildandFamilyCareForm',
          icon: 'icon_ex.png',
          title: 'Child and Family Care',
          component: ChildandFamilyCareForm,
        },
        {
          id: 'DebtPaymentForm',
          icon: 'icon_ex.png',
          title: 'Debt Payments',
          component: DebtPaymentForm,
        },
        {
          id: 'EntertainmentForm',
          icon: 'icon_ex.png',
          title: 'Entertainment Details',
          component: EntertainmentForm,
        },
        {
          id: 'ProfessionalForm',
          icon: 'icon_ex.png',
          title: 'Professional Details',
          component: ProfessionalForm,
        },
        {
          id: 'HomeForm',
          icon: 'icon_ex.png',
          title: 'Home Details',
          component: HomeForm,
        },
        {
          id: 'InsuranceForm',
          icon: 'icon_ex.png',
          title: 'Insurance Details',
          component: InsuranceForm,
        },
        {
          id: 'PersonalCareForm',
          icon: 'icon_ex.png',
          title: 'Personal Care',
          component: PersonalCareForm,
        },
        {
          id: 'PetForm',
          icon: 'icon_ex.png',
          title: 'Pet Details',
          component: PetForm,
        },
        {
          id: 'ShoppingForm',
          icon: 'icon_ex.png',
          title: 'Shopping Details',
          component: ShoppingForm,
        },
        {
          id: 'TransportationForm',
          icon: 'icon_ex.png',
          title: 'Transportation Details',
          component: TransportationForm,
        },
        {
          id: 'UtilitiesForm',
          icon: 'icon_ex.png',
          title: 'Utilities Details',
          component: UtilitiesForm,
        },
        {
          id: 'FinanceForm',
          icon: 'icon_ex.png',
          title: 'Finance Details',
          component: FinanceForm,
        },
        {
          id: 'BusinessForm',
          icon: 'icon_ex.png',
          title: 'Business Details',
          component: BusinessForm,
        },
        {
          id: 'SavingGoalForm',
          icon: 'icon_ex.png',
          title: 'Saving Goal',
          component: SavingGoalForm,
        },
      ],
    };
  }

  componentWillMount() {
    this.setState({ currentForm: this.state.formSteps[0] });
    console.log("inside budget create");
    console.log(this.state.formSteps[1]);
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

  handleChange = () => {
    console.log(this.state.checklistObject);
  }

  handleBudgetObject = (formName, pageData) => {
    // console.log("in handleChecklistObjecthandleChecklistObjecthandleChecklistObjecthandleChecklistObject",personal_instructions);
    // console.log(personal_instructions);

    // console.log("checlistobject",this.state.checklistObject);
    let formData = this.state.budget;


    formData[formName.id] = pageData;
    // console.log("formdata",formData["personalInstructionsForm"]);
    // console.log("form data", formData);

    this.setState({ checklistObject: formData }, () => {
      // console.log(this.state.checklistObject);
      this.handleChange()
    });

  }


  // Input Handler Start

  handleFormInputChange = (formName, name, value) => {
    let formData = this.state.budget;
    formData[formName.id][name] = value;
    this.setState({ budget: formData });
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

  handleRadioChange = (name, value, formName) => {
    this.handleFormInputChange(formName, name, value);
  };

  handleCurrencyChange = (name, value, formName) => {
    this.handleFormInputChange(formName, name, value);
  };

  // Input Handler End

  navigate = (path) => {
    this.props.history.push(path);
  };

  componentDidMount() {
    // console.log("in budget create did mount");
    // console.log(this.state.budget);
  }

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
            <div
              style={{
                marginTop: '2em',
              }}
            ></div>
            {/* <BreadCrumb /> */}

            <div className='form-page-container'>
              <div className='form-page--left-side'>
                <FormPagePose
                  className='info-form-block'
                  pose={this.state.formVisible ? 'visible' : 'hidden'}
                >
                  <CurrentForm
                    currentForm={this.state.currentForm}
                    nextForm={this.nextForm}
                    previousForm={this.previousForm}
                    handleInputChange={this.handleInputChange}
                    budgetObject={this.state.budget}
                    handleDatePickerChange={this.handleDatePickerChange}
                    handleSelectChange={this.handleSelectChange}
                    handleFormInputChange={this.handleFormInputChange}
                    handleRadioChange={this.handleRadioChange}
                    handleCurrencyChange={this.handleCurrencyChange}
                    navigate={this.navigate}
                    handleBudgetObject={this.handleBudgetObject}

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
            <BudgetSideDisplay
              data={this.state.budget}
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

export default BudgetCreate;
