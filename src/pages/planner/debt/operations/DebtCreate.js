import React, { Component } from 'react';
import { Icon } from 'antd';
import DebtPayoffForm from '../../../../components/form/debt/DebtPayoffForm';
import BreadCrumb from '../../../../components/BreadCrumb';
import FormWizardHeader from '../../../../components/FormWizardHeader';
import { FormPagePose } from '../../../../components/Animations';
import DebtSideDisplay from './DebtSideDisplay';

class DebtCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentForm: null,
      formVisible: true,
      currentFormIndex: 0,
      toggleClass: false,

      debtObject: {
        DebtPayoffForm: {},
      },

      formSteps: [
        {
          id: 'DebtPayoffForm ',
          icon: 'icon_ex.png',
          title: 'Debt Payoff',
          component: DebtPayoffForm,
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
    let formData = this.state.debtObject;
    formData[formName][name] = value;
    this.setState({ debtObject: formData });
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
                    debtObject={this.state.debtObject}
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
            <DebtSideDisplay
              data={this.state.debtObject}
              steps={this.state.formSteps}
              currentFormIndex={this.state.currentFormIndex}
              getHeaderClickedForm={this.getHeaderClickedForm}
              getIndexOfCurrentComponent={this.getIndexOfCurrentComponent}
              genExtra={this.genExtra}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default DebtCreate;
