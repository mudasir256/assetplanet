import React, { Component } from 'react';
import AssetPlanet from 'assets/images/asset-planet-logo.jpg';
import ImageIcon from 'assets/images/asset.png';

class FormWizardHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerOptions: null,
    };
  }

  componentDidMount() {
    if (this.props.hasOwnProperty('steps')) {
      this.setState({ headerOptions: this.props.steps });
    }
  }

  checkIfAllAreNo = (obj) => {
    let isNo = true;
    if (
      obj['emergency_response_contact'] &&
      obj['emergency_response_contact'].length > 0
    ) {
      obj['emergency_response_contact'].map((item) => {
        if (item['police_report_fired'] === 'Yes') isNo = false;
      });
      return isNo;
    }
    return false;
  };

  render() {

    const { steps } = this.props
    console.log("steps", steps);

    const userRole =localStorage.getItem("role") != 'undefined' && JSON.parse(localStorage.getItem("role"))
    // let newRole=""
    // if(userRole.hasOwnProperty("trustee")){
    //   console.log("here in if")
    //   newRole=userRole.trustee.name;
    // }
    // else{
    //   console.log("here in else")
    //   newRole=userRole.trustee.name
    // }
    // const newRole=userRole.trustee.name;
    // console.log("userRole parse death create", newRole);
    return (
      <div className='steps'>
        <div className='logo-container align-items-top justify-content-center'>
          <img className='img-asset' src={AssetPlanet} />
        </div>
        <div className='process'>
          <div className='process-row'>
            {steps &&
              steps.map((option, index) => {
                return (
                  <div className='process-step' key={index}>
                    <button
                      type='button'
                      className={
                        (this.props.isPoliceReportDisable &&
                          this.checkIfAllAreNo(
                            this.props.object[
                            'EmergencyResponseContactInfoForm'
                            ]
                          ) &&
                          option.id === 'PoliceReportInformationForm') ||
                          (this.props.hasOwnProperty('object') &&
                            option.hasOwnProperty('disable') &&
                            this.props.object['IllustrationOrActualForm']
                              .illustration_disaster &&
                            (this.props.object['IllustrationOrActualForm']
                              .illustration_disaster === 'Natural Disaster' ||
                              this.props.object['IllustrationOrActualForm']
                                .illustration_disaster === 'Manmade Disaster'))
                          ? 'btn nav-items btn-circle disabled'
                          : index <= this.props.currentFormIndex
                            ? 'btn nav-items btn-circle active'
                            : option.type === 'death' && userRole === "trustee" ? 'btn nav-items btn-circle disabled' : 'btn nav-items btn-circle'
                      }
                      disabled={
                        (this.props.isPoliceReportDisable &&
                          this.checkIfAllAreNo(
                            this.props.object[
                            'EmergencyResponseContactInfoForm'
                            ]
                          ) &&
                          option.id === 'PoliceReportInformationForm') ||
                          (this.props.hasOwnProperty('object') &&
                            option.hasOwnProperty('disable') &&
                            this.props.object['IllustrationOrActualForm']
                              .illustration_disaster &&
                            (this.props.object['IllustrationOrActualForm']
                              .illustration_disaster === 'Natural Disaster' ||
                              this.props.object['IllustrationOrActualForm']
                                .illustration_disaster === 'Manmade Disaster'))
                          ? true
                          : false
                      }
                      data-toggle='tab'
                      onClick={userRole !== "trustee" ? () => {
                        this.props.getIndexOfCurrentComponent(option.id);
                        this.props.getHeaderClickedForm(option);
                      } : null}
                    >
                      <div style={{ fontSize: 30, color: '#006400' }}>
                        {index + 1}
                      </div>
                    </button>
                    <p className='step-title'>{option.title}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default FormWizardHeader;
