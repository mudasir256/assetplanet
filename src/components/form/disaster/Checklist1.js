import React, { Component } from 'react';
import { Row, Col, Form, Radio, Button, Icon } from 'antd';

const formName = 'messageForm';

class Checklist1 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      handleInputChange,
      disasterObject,
      handleDatePickerChange,
      handleSelectChange,
      handleFormInputChange,
    } = this.props;

    return (
      <React.Fragment>
        <div className='info-form-block'>
          <Row gutter={16}>
            <Col span={24}>
              <h2 className='text-center font-weight-bold mb-4'>Checklist</h2>
            </Col>

            {disasterObject['IllustrationOrActualForm'].actual_disaster &&
            disasterObject['IllustrationOrActualForm'].actual_disaster ===
              'Natural Disaster' ? (
              <React.Fragment>
                <Col span={24}>
                  <h3 className='text-center mb-4'>
                    If your property is involved in a fire, flood or other
                    NATURAL DISASTER, here is a checklist that may help put the
                    pieces back together:
                  </h3>
                </Col>
                <Col span={24}>
                  <h4 className='text-center mb-4'>
                    - Check with authorities to make ensure your property is
                    safe before entering.
                  </h4>
                </Col>
                <Col span={24}>
                  <h4 className='text-center mb-4'>
                    - Emergency responders may have turned off utilities. Allow
                    them to turn them back on. If utilities are still connected,
                    call all utility providers and inform them of the incident.
                  </h4>
                </Col>
                <Col span={24}>
                  <h4 className='text-center mb-4'>
                    - Contact your insurance company to determine the types of
                    documentation needed to start a claim and what they can do
                    for you.
                  </h4>
                </Col>
                <Col span={24}>
                  <h4 className='text-center mb-4'>
                    - Take photos and videos of the damage before you begin
                    clean up. These records may be needed for insurance
                    purposes.
                  </h4>
                </Col>
                <Col span={24}>
                  <h4 className='text-center mb-4'>
                    - Get all repair estimates in writing. Ask your insurer
                    whether your policy covers cleaning and repairing your
                    property.
                  </h4>
                </Col>
                <Col span={24}>
                  <h4 className='text-center mb-4'>
                    - Your water supply may be contaminated. It may be safer to
                    use bottled water to wash or prepare food
                  </h4>
                </Col>
                <Col span={24}>
                  <h4 className='text-center mb-4'>
                    - Ask the responding departments for a fire or police
                    report, if applicable.
                  </h4>
                </Col>
                <Col span={24}>
                  <h4 className='text-center mb-4'>
                    - If your home is damaged and uninhabitable, contact your
                    local police department to notify them that your home will
                    be temporarily vacant. Contact the post office to hold or
                    forward your mail. Make contact with your children?s school
                    to advise them of the stressful situation your children are
                    going through.
                  </h4>
                </Col>
                <Col span={24}>
                  <h4 className='text-center mb-4'>
                    - Contact your mortgage lender and inform them about the
                    incident.
                  </h4>
                </Col>

                <Col span={24}>
                  <h4 className='text-center mb-4'>
                    - Saving receipts is critical and you may need them later to
                    prove losses to the insurance company or claim losses on tax
                    returns.
                  </h4>
                </Col>

                <Col span={24}>
                  <h4 className='text-center mb-4'>
                    - All valuable documents and records should be stored
                    securely in this software, but if there are any that were
                    not replace them as soon as possible.
                  </h4>
                </Col>

                <Col span={24}>
                  <h4 className='text-center mb-4'>
                    - Cash and coins that were damaged may be replaced by a
                    regional Federal Reserve Bank. Check with your local bank to
                    determine next steps.
                  </h4>
                </Col>

                <Col span={24}>
                  <h4 className='text-center mb-4'>
                    - Your accountant may know of special benefits available
                    from the IRS regarding your loss
                  </h4>
                </Col>
              </React.Fragment>
            ) : (
              ''
            )}

            {disasterObject['IllustrationOrActualForm'].actual_disaster &&
            disasterObject['IllustrationOrActualForm'].actual_disaster ===
              'Manmade Disaster' ? (
              <React.Fragment>
                <Col span={24}>
                  <h3 className='text-center mb-4'>
                    If property was involved in MANMADE DISASTER, here is a
                    checklist to help put the pieces back together:
                  </h3>
                </Col>
                <Col span={24}>
                  <h4 className='text-center mb-4'>
                    - File a police report immediately, if needed
                  </h4>
                </Col>
                <Col span={24}>
                  <h4 className='text-center mb-4'>
                    - Notify your insurance company
                  </h4>
                </Col>
                <Col span={24}>
                  <h4 className='text-center mb-4'>
                    - Make any urgent repairs. Some policies require urgent
                    repairs be made such as a tarp over a leaking roof to
                    prevent further damage.
                  </h4>
                </Col>
                <Col span={24}>
                  <h4 className='text-center mb-4'>
                    - Document all stolen or damaged items by taking photos and
                    videos of each area and room affected.
                  </h4>
                </Col>
                <Col span={24}>
                  <h4 className='text-center mb-4'>
                    - If property is uninhabitable, make sure to keep any
                    receipts for hotels, meals and related expenses so you can
                    be reimbursed.
                  </h4>
                </Col>
              </React.Fragment>
            ) : (
              ''
            )}
          </Row>
        </div>
        <div className='row justify-content-between'>
          <div className='col-8'>
            <Button
              type='primary'
              size={'large'}
              onClick={() => this.props.previousForm()}
            >
              <Icon type='left' />
              Previous
            </Button>
          </div>
          <div className='col-4 d-flex justify-content-end'>
            <Button
              type='primary'
              size={'large'}
              onClick={() => {
                console.log('FORM DATA ', this.props.disasterObject);
                this.props.nextForm();
              }}
            >
              Next
              <Icon type='right' />
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Checklist1;
