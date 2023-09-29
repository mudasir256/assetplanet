import React, { Component } from 'react';
import { Icon } from 'antd';
import BreadCrumb from '../../../../components/BreadCrumb';
import FormWizardHeader from '../../../../components/FormWizardHeader';
import { FormPagePose } from '../../../../components/Animations';
import DivorceDetailForm from '../../../../components/form/divorce/DivorceDetailForm';
import PropertyListForm from '../../../../components/form/divorce/PropertyListForm';
import SpousalDetailForm from '../../../../components/form/divorce/SpousalDetailForm';
import BudgetChangesForm from '../../../../components/form/divorce/BudgetChanges';
import UnequalResolutionDetailForm from '../../../../components/form/divorce/UnequalResolutionDetailForm';
import PropertyDetailForm from '../../../../components/form/divorce/PropertyDetailForm';
import SeparatePropertyAccountDetailsForm from '../../../../components/form/divorce/SeparatePropertyAccountDetailsForm';
import CustodyDetailsForm from '../../../../components/form/divorce/CustodyDetailsForm';
import TaxReturnDetailsForm from '../../../../components/form/divorce/TaxReturnDetailsForm';
import ChildSupportDetailsForm from '../../../../components/form/divorce/ChildSupportDetailsForm';
import CheckList from '../../../../components/form/divorce/CheckList';
import DivorceSideBar from './DivoreSideDisplay';

class DivorceCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentForm: null,
      formVisible: true,
      currentFormIndex: 0,
      toggleClass: false,

      divorceObject: {
        divorceDetails: {},
        propertyList: {},
        propertyDetail: {},
        unequalResolution: {},
        budgetChanges: {},
        spousalDetail: {},
        childCustody: {},
        taxReturn: {},
        retirementDetails: {},
        checkList: {},

        childSupport: {},
      },

      formSteps: [
        {
          id: 'divorceDetails',
          icon: 'icon_ex.png',
          title: 'Divorce Details',
          component: DivorceDetailForm,
        },
        {
          id: 'propertyList',
          icon: 'icon_ex.png',
          title: 'Property List',
          component: PropertyListForm,
        },
        {
          id: 'propertyDetail',
          icon: 'icon_ex.png',
          title: 'Property Details',
          component: PropertyDetailForm,
        },
        {
          id: 'retirementDetails',
          icon: 'icon_ex.png',
          title: 'Retirement Details',
          component: SeparatePropertyAccountDetailsForm,
        },
        {
          id: 'unequalResolution',
          icon: 'icon_ex.png',
          title: 'Unequal Resolution Detail',
          component: UnequalResolutionDetailForm,
        },
        {
          id: 'budgetChanges',
          title: 'Budget Changes',
          component: BudgetChangesForm,
        },
        {
          id: 'spousalDetail',
          icon: 'icon_ex.png',
          title: 'Spousal Support Details',
          component: SpousalDetailForm,
        },
        {
          id: 'childCustody',
          icon: 'icon_ex.png',
          title: 'Custody Details',
          component: CustodyDetailsForm,
        },
        {
          id: 'childSupport',
          icon: 'icon_ex.png',
          title: 'Child Support Details',
          component: ChildSupportDetailsForm,
        },
        {
          id: 'taxReturn',
          icon: 'icon_ex.png',
          title: 'Tax Return Details',
          component: TaxReturnDetailsForm,
        },
        {
          id: 'checkList',
          icon: 'icon_ex.png',
          title: 'CheckList',
          component: CheckList,
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
    let formData = this.state.divorceObject;

    formData[formName.id][name] = value;
    this.setState({ divorceObject: formData });
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


  handleChecklistChange = (name, value, formName) => {
    console.log("in checkilist change name", name);
    console.log("in checkilist change", value);

    this.handleFormInputChange(formName, name, value);
  };

  // Input Handler End

  navigate = (path) => {
    this.props.history.push(path);
  };

  componentDidMount() {
    console.log("in divorce create did mount");
    console.log(this.state.divorceObject);
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
            <BreadCrumb />

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
                    divorceObject={this.state.divorceObject}
                    handleDatePickerChange={this.handleDatePickerChange}
                    handleCurrencyChange={this.handleCurrencyChange}
                    handleSelectChange={this.handleSelectChange}
                    handleFormInputChange={this.handleFormInputChange}
                    handleToggleCustomChange={this.handleToggleCustomChange}
                    handleChecklistChange={this.handleChecklistChange}
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
            <DivorceSideBar
              divorceObject={this.state.divorceObject}
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

export default DivorceCreate;
