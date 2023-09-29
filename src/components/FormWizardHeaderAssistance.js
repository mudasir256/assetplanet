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

  HeaderChecks = (obj) => {
    if (
      obj['ProvidingReceivingForm'].assistance &&
      obj['ProvidingReceivingForm'].assistance === 'Providing'
    )
      return '1';
    if (
      obj['CurrentFutureForm'].type &&
      obj['CurrentFutureForm'].type === 'Future Inheritance'
    )
      return '2';
    if (
      obj['CurrentFutureForm'].type &&
      obj['CurrentFutureForm'].type === 'Current Assistance'
    )
      return '3';
    if (
      obj['ProvidingReceivingForm'].assistance &&
      obj['ProvidingReceivingForm'].assistance === 'Receiving'
    )
      return '4';
  };

  checkHeader = (index) => {
    if (this.HeaderChecks(this.props.assistanceObject) === '1') {
      if (index === 1 || index === 2 || index === 3)
        return 'btn nav-items btn-circle disabled';
    } else if (this.HeaderChecks(this.props.assistanceObject) === '2') {
      if (index === 2) return 'btn nav-items btn-circle disabled';
    } else if (this.HeaderChecks(this.props.assistanceObject) === '3') {
      if (index === 3) return 'btn nav-items btn-circle disabled';
    } else if (this.HeaderChecks(this.props.assistanceObject) === '4') {
      if (index === 4) return 'btn nav-items btn-circle disabled';
    }
    return index <= this.props.currentFormIndex
      ? 'btn nav-items btn-circle active'
      : 'btn nav-items btn-circle';
  };

  checkHeaderDisable = (index) => {
    if (this.HeaderChecks(this.props.assistanceObject) === '1') {
      if (index === 1 || index === 2 || index === 3) return true;
    } else if (this.HeaderChecks(this.props.assistanceObject) === '2') {
      if (index === 2) return true;
    } else if (this.HeaderChecks(this.props.assistanceObject) === '3') {
      if (index === 3) return true;
    } else if (this.HeaderChecks(this.props.assistanceObject) === '4') {
      if (index === 4) return true;
    }
    return false;
  };

  render() {
    return (
      <div className='steps'>
        <div className='logo-container align-items-top justify-content-center'>
          <img className='img-asset' src={AssetPlanet} />
        </div>
        <div className='process'>
          <div className='process-row'>
            {this.state.headerOptions &&
              this.state.headerOptions.map((option, index) => {
                return (
                  <div className='process-step' key={index}>
                    <button
                      type='button'
                      className={this.checkHeader(index)}
                      disabled={this.checkHeaderDisable(index)}
                      data-toggle='tab'
                      onClick={() => {
                        this.props.getIndexOfCurrentComponent(option.id);
                        this.props.getHeaderClickedForm(option);
                      }}
                    >
                      {/* <img className='img-icon' src={ImageIcon} /> */}
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
