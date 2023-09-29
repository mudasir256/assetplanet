import React, { Component } from 'react';
import { Icon } from 'antd';
import FormWizardHeader from '../../../../components/FormWizardHeader';
import { FormPagePose } from '../../../../components/Animations';
import MessageForm from '../../../../components/form/disaster/MessageForm';
import Checklist1 from '../../../../components/form/disaster/Checklist1';
import DisasterBasiscsForm from '../../../../components/form/disaster/DisasterBasicsForm';
import InsuranceContactInfoForm from '../../../../components/form/disaster/InsuranceContactInfoForm';
import PoliceReportInformationForm from '../../../../components/form/disaster/PoliceReportInformationForm';
import HotelMealAndRelatedExpensesForm from '../../../../components/form/disaster/HotelMealAndRelatedExpensesForm';
import UrgentRepairsAndOtherExpensesForm from '../../../../components/form/disaster/UrgentRepairsAndOtherExpensesForm';
import EmergencyResponseContactInfoForm from '../../../../components/form/disaster/EmergencyResponseContactInfoForm';
import InsuranceCoverageForm from '../../../../components/form/disaster/InsuranceCoverageForm';
import IllustrationOrActualForm from '../../../../components/form/disaster/IllustrationOrActualForm';
import InventoryForm from '../../../../components/form/disaster/InventoryForm';
import DisasterSideDisplay from './DisasterSideDisplay';

class DisasterCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentForm: null,
      formVisible: true,
      currentFormIndex: 0,
      toggleClass: false,
      isPoliceReportDisable: true,

      disasterObject: {
        messageForm: {},
        checklist1: {},
        IllustrationOrActualForm: {},
        DisasterBasiscsForm: {},
        InsuranceContactInfoForm: {},
        PoliceReportInformationForm: {},
        HotelMealAndRelatedExpensesForm: {},
        UrgentRepairsAndOtherExpensesForm: {},
        EmergencyResponseContactInfoForm: {},
        InsuranceCoverageForm: {},
        InventoryForm: {},
      },

      formSteps: [
        {
          id: 'MessageForm',
          icon: 'icon_ex.png',
          title: 'Message',
          component: MessageForm,
        },
        {
          id: 'IllustrationOrActualForm',
          icon: 'icon_ex.png',
          title: 'Illustration or Actual',
          component: IllustrationOrActualForm,
        },
        {
          id: 'Checklist1 ',
          icon: 'icon_ex.png',
          title: 'Checklist',
          component: Checklist1,
          disable: true,
        },
        {
          id: 'DisasterBasiscsForm ',
          icon: 'icon_ex.png',
          title: 'Disaster Basics',
          component: DisasterBasiscsForm,
          disable: true,
        },
        {
          id: 'EmergencyResponseContactInfoForm ',
          icon: 'icon_ex.png',
          title: 'Emergency Response Contact Info',
          component: EmergencyResponseContactInfoForm,
          disable: true,
        },
        {
          id: 'PoliceReportInformationForm',
          icon: 'icon_ex.png',
          title: 'Police Report Info',
          component: PoliceReportInformationForm,
          disable: true,
        },
        {
          id: 'InsuranceContactInfoForm ',
          icon: 'icon_ex.png',
          title: 'Insurance Contact Info',
          component: InsuranceContactInfoForm,
          disable: true,
        },
        {
          id: 'UrgentRepairsAndOtherExpensesForm ',
          icon: 'icon_ex.png',
          title: 'Urgent Repair and Other Expenses',
          component: UrgentRepairsAndOtherExpensesForm,
          disable: true,
        },
        {
          id: 'HotelMealAndRelatedExpensesForm ',
          icon: 'icon_ex.png',
          title: 'Hotel Meal and Related Expenses',
          component: HotelMealAndRelatedExpensesForm,
          disable: true,
        },
        {
          id: 'InventoryForm ',
          icon: 'icon_ex.png',
          title: 'Inventory',
          component: InventoryForm,
        },
        {
          id: 'InsuranceCoverageForm ',
          icon: 'icon_ex.png',
          title: 'Insurane Coverages',
          component: InsuranceCoverageForm,
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

  policeReportDisable = () => {
    if (this.state.isPoliceReportDisable)
      this.setState({ isPoliceReportDisable: false });
    else this.setState({ isPoliceReportDisable: true });
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

  customNextForm = () => {
    this.setState({ formVisible: false });
    this.setState({
      currentForm: this.state.formSteps[this.state.formSteps.length - 2],
      currentFormIndex: this.state.formSteps.length - 2,
    });
    setTimeout(() => {
      this.setState({
        formVisible: true,
      });
    }, 100);
  };

  customPreviousForm = () => {
    this.setState({ formVisible: false });
    this.setState({
      currentForm: this.state.formSteps[1],
      currentFormIndex: 1,
    });
    setTimeout(() => {
      this.setState({
        formVisible: true,
      });
    }, 100);
  };

  customPoliceReportInfoNextForm = () => {
    this.setState({ formVisible: false });
    this.setState({
      currentForm: this.state.formSteps[this.state.formSteps.length - 5],
      currentFormIndex: this.state.formSteps.length - 5,
    });
    setTimeout(() => {
      this.setState({
        formVisible: true,
      });
    }, 100);
  };

  customPoliceReportInfoPreviousForm = () => {
    this.setState({ formVisible: false });
    this.setState({
      currentForm: this.state.formSteps[4],
      currentFormIndex: 4,
    });
    setTimeout(() => {
      this.setState({
        formVisible: true,
      });
    }, 100);
  };

  previousForm = () => {
    this.setState({ formVisible: false });
    this.setState({
      currentForm: this.state.formSteps[this.state.currentFormIndex - 1],
      currentFormIndex: this.state.currentFormIndex - 1,
    });
    setTimeout(() => {
      this.setState({
        formVisible: true,
      });
    }, 100);
  };

  toggleRightSide = () => {
    if (this.state.toggleClass) this.setState({ toggleClass: false });
    else this.setState({ toggleClass: true });
  };

  // Input Handler Start

  handleFormInputChange = (formName, name, value) => {
    let formData = this.state.disasterObject;
    formData[formName][name] = value;
    this.setState({ disasterObject: formData });
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
            object={this.state.disasterObject}
            isPoliceReportDisable={this.state.isPoliceReportDisable}
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
                    disasterObject={this.state.disasterObject}
                    handleDatePickerChange={this.handleDatePickerChange}
                    handleSelectChange={this.handleSelectChange}
                    handleFormInputChange={this.handleFormInputChange}
                    navigate={this.navigate}
                    customNextForm={this.customNextForm}
                    customPreviousForm={this.customPreviousForm}
                    policeReportDisable={this.policeReportDisable}
                    customPoliceReportInfoNextForm={this.customPoliceReportInfoNextForm}
                    customPoliceReportInfoPreviousForm={this.customPoliceReportInfoPreviousForm}
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
            <DisasterSideDisplay
              data={this.state.disasterObject}
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

export default DisasterCreate;
