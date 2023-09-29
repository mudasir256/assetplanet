import React, { Component } from 'react';
import { Icon } from 'antd';
// import DebtPayoffForm from '../../../../components/form/debt/DebtPayoffForm';
import ClientInformationForm from '../../../components/form/social-security/ClientInformationForm';
import SpouseInformationForm from '../../../components/form/social-security/SpouseInformationForm';
import RetirementEarningForm from '../../../components/form/social-security/RetirementEarningForm';
import RetirementEarningSpouseForm from '../../../components/form/social-security/RetirementEarningSpouseForm';
import ResultsForm from '../../../components/form/social-security/ResultsForm';
import EarlyvsFullForm from '../../../components/form/social-security/EarlyvsFullForm';
import EarlyvsAgeForm from '../../../components/form/social-security/EarlyvsAgeForm';
import CustomScenariosForm from '../../../components/form/social-security/CustomScenariosForm';
import SpousevsFullForm from '../../../components/form/social-security/SpousevsFullForm';
import BreakevenFullForm from '../../../components/form/social-security/BreakevenFullForm';
import BreadCrumb from '../../../components/BreadCrumb';
import FormWizardHeader from '../../../components/FormWizardHeader';
import { FormPagePose } from '../../../components/Animations';
import SocialSecuritySideDisplay from './SocialSecuritySideDisplay';

class SocialSecurityCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentForm: null,
      formVisible: true,
      currentFormIndex: 0,
      toggleClass: false,

      socialSecurityObject: {
        ClientInformationForm: {},
        SpouseInformationForm: {},
        RetirementEarningForm: {},
        RetirementEarningSpouseForm: {},
        EarlyvsFullForm: {},
        EarlyvsAgeForm: {},
        SpousevsFullForm: {},
        BreakevenFullForm: {},
        CustomScenariosForm: {},
        ResultsForm: {},
      },

      formSteps: [
        {
          id: 'ClientInformationForm ',
          icon: 'icon_ex.png',
          title: 'Client Information',
          component: ClientInformationForm,
        },
        {
          id: 'SpouseInformationForm ',
          icon: 'icon_ex.png',
          title: 'Spouse Information',
          component: SpouseInformationForm,
        },
        {
          id: 'RetirementEarningForm ',
          icon: 'icon_ex.png',
          title: 'Retirement Earning Calculator',
          component: RetirementEarningForm,
        },
        {
          id: 'RetirementEarningSpouseForm ',
          icon: 'icon_ex.png',
          title: 'Retirement Earning Calculator Spouse',
          component: RetirementEarningSpouseForm,
        },
        {
          id: 'CustomScenariosForm ',
          icon: 'icon_ex.png',
          title: 'Create Custom Scenarios',
          component: CustomScenariosForm,
        },
        {
          id: 'EarlyvsFullForm ',
          icon: 'icon_ex.png',
          title: 'Early vs Full Retirement Age',
          component: EarlyvsFullForm,
        },
        {
          id: 'EarlyvsAgeForm ',
          icon: 'icon_ex.png',
          title: 'Early vs Age 70',
          component: EarlyvsAgeForm,
        },
        {
          id: 'SpousevsFullForm ',
          icon: 'icon_ex.png',
          title: 'Spousal Early bs Full Retirement Age',
          component: SpousevsFullForm,
        },
        {
          id: 'BreakevenFullForm ',
          icon: 'icon_ex.png',
          title: 'Breakeven with Full Retirement Age',
          component: BreakevenFullForm,
        },
        {
          id: 'ResultsForm ',
          icon: 'icon_ex.png',
          title: 'Results',
          component: ResultsForm,
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
    this.setState({ formVisible: false });
    this.setState({ currentForm: form });
    setTimeout(() => {
      this.setState({
        formVisible: true,
      });
    }, 100);
  };

  nextForm = () => {
    this.setState({ formVisible: false });
    this.setState({
      currentForm: this.state.formSteps[this.state.currentFormIndex + 1],
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
    let formData = this.state.socialSecurityObject;
    formData[formName][name] = value;
    this.setState({ socialSecurityObject: formData });
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

  genExtra = (id) => <Icon type='form'></Icon>;

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
            {/* <BreadCrumb /> */}
            <div
              style={{
                marginTop: '45px',
              }}
            ></div>

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
                    socialSecurityObject={this.state.socialSecurityObject}
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
            <SocialSecuritySideDisplay
              data={this.state.socialSecurityObject}
              steps={this.state.formSteps}
              currentFormIndex={this.state.currentFormIndex}
              getHeaderClickedForm={this.getHeaderClickedForm}
              getIndexOfCurrentComponent={this.getIndexOfCurrentComponent}
            // genExtra={this.genExtra}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SocialSecurityCreate;
