import React, { Component } from 'react';
import { Icon } from 'antd';
import BreadCrumb from '../../../components/BreadCrumb';
import AssistanceSideDisplay from './AssistanceSideDisplay';
import FormWizardHeader from '../../../components/FormWizardHeaderAssistance';
import { FormPagePose } from '../../../components/Animations';
import ProvidingReceivingForm from '../../../components/form/assistance/ProvidingReceivingForm';
import CurrentFutureForm from '../../../components/form/assistance/CurrentFutureForm';
import CurrentAssistanceInformationForm from '../../../components/form/assistance/CurrentAssistanceInformationForm';
import FutureInheritanceInformationForm from '../../../components/form/assistance/FutureInheritanceInformation';
import ProvidingAssistanceInformationForm from '../../../components/form/assistance/ProvidingAssistanceInformationForm';

class AssistanceCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentForm: null,
      formVisible: true,
      currentFormIndex: 0,
      toggleClass: false,
      assistance: {
        ProvidingReceivingForm: {},
        CurrentFutureForm: {},
        CurrentAssistanceInformationForm: {},
        FutureInheritanceInformationForm: {},
        ProvidingAssistanceInformationForm: {},
      },

      formSteps: [
        {
          id: 'ProvidingReceivingForm',
          icon: 'icon_ex.png',
          title: 'Providing or Receiving',
          component: ProvidingReceivingForm,
        },
        {
          id: 'CurrentFutureForm',
          icon: 'icon_ex.png',
          title: 'Current or Future',
          component: CurrentFutureForm,
        },
        {
          id: 'CurrentAssistanceInformationForm',
          icon: 'icon_ex.png',
          title: 'Current Assistance Information',
          component: CurrentAssistanceInformationForm,
        },
        {
          id: 'FutureInheritanceInformationForm',
          icon: 'icon_ex.png',
          title: 'Future Inheritance Information',
          component: FutureInheritanceInformationForm,
        },
        {
          id: 'ProvidingAssistanceInformationForm',
          icon: 'icon_ex.png',
          title: 'Providing Assistance Information',
          component: ProvidingAssistanceInformationForm,
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

  // Custom Navigator
  isProviding = () => {
    this.setState({
      currentForm: this.state.formSteps[this.state.formSteps.length - 1],
      currentFormIndex: this.state.formSteps.length - 1,
    });
  };

  isProvidingBack = () => {
    this.setState({
      currentForm: this.state.formSteps[0],
      currentFormIndex: 0,
    });
  };

  isFutureInheritance = () => {
    this.setState({
      currentForm: this.state.formSteps[this.state.formSteps.length - 2],
      currentFormIndex: this.state.formSteps.length - 2,
    });
  };

  isFutureInheritanceBack = () => {
    this.setState({
      currentForm: this.state.formSteps[1],
      currentFormIndex: 1,
    });
  };

  isCurrentInheritance = () => {
    this.setState({
      currentForm: this.state.formSteps[this.state.formSteps.length - 1],
      currentFormIndex: this.state.formSteps.length - 1,
    });
  };

  isCurrentInheritanceBack = () => {
    this.setState({
      currentForm: this.state.formSteps[2],
      currentFormIndex: 2,
    });
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
    let formData = this.state.assistance;
    formData[formName][name] = value;
    this.setState({ assistance: formData });
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
            assistanceObject={this.state.assistance}
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
                    isProviding={this.isProviding}
                    isProvidingBack={this.isProvidingBack}
                    isFutureInheritance={this.isFutureInheritance}
                    isFutureInheritanceBack={this.isFutureInheritanceBack}
                    isCurrentInheritance={this.isCurrentInheritance}
                    isCurrentInheritanceBack={this.isCurrentInheritanceBack}
                    nextForm={this.nextForm}
                    previousForm={this.previousForm}
                    handleInputChange={this.handleInputChange}
                    assistanceObject={this.state.assistance}
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
            <AssistanceSideDisplay
              data={this.state.assistance}
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

export default AssistanceCreate;
