import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';
import FETCH from "../../../../utils/fetch";
import Loader from "../../../../components/styled-components/loader/loader";
import { postStepsFields, postStep1,postStep2,postStep3,postStep4,postStep5,postselectedCollection } from "../../../../redux/slices/loginSlice";

import { Row, Col } from 'antd';
import {
  LIABILITY_CREDIT_TYPES,
  LIABILITY_TYPES,
  CREDIT_TYPES,
  LIABILITY_TYPES_IMAGES,
  CREDIT_TYPES_IMAGES,
} from 'constants/types';
import { MobileView, BrowserView } from 'react-device-detect';

const formID = 'LiabilityCreditTypeSubForm';
class LiabilityCreditTypeSubForm extends Component {
  static FnCreateFormData(data) {
    let formData = {
      title: 'Liabilities and Credit',
      fields: [
        {
          id: 'liabilityCreditType',
          title: '',
          value: data['value'],
        },
      ],
    };
    console.log("create formdata>>", formData);
    return formData;
  }
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        liabilityCreditType: '',
      },
      liabilities: [],
      credits: [],
      loading: false,
      attributes: [],
    };
    this.handleFormInputChange = this.handleFormInputChange.bind(this);
    this.updateFormData = this.updateFormData.bind(this);
  }

  componentDidMount() {
    try {
      (async () => {
        this.setState({
          loading: true,
        });
        let datares = await FETCH.get({
          url: "module/asset-allocation",
          id: `?module=Liabilities and Credit`,
          body: {},
        });
        this.setState({
          loading: false,
        });
        if (datares && datares.liability) {
          this.setState({
            liabilities: datares.liability

          })
        }
        if (datares && datares.credit) {
          this.setState({
            credits: datares.credit

          })
        }

      })()
    } catch (error) {
      console.log(error)
      this.setState({
        loading: false,
      });
    }

    this.updateFormData(this.props.subFormData);
  }

  updateFormData(newFormData) {
    console.log('updateformdata:', newFormData);
    if (newFormData.hasOwnProperty('fields')) {
      this.setState({
        formData: {
          liabilityCreditType: newFormData['fields'][0]['value'],
        },
      });
    }
  }

  handleFormInputChange(name, value) {
    console.log("value",value);
    this.props.postselectedCollection(value);
    
    try {
      (async () => {
        this.setState({
          loading: true,
        });
        let datares = await FETCH.post({
          url: "attribute/detail",
          id: `?module=${value}`,
          body: {},
        });
        // this.setState({
        //   loading: false,
        // });
        console.log("Account Asset and libalities...", datares.attributes);
        if (datares && datares.attributes) {
          this.setState({
            attributes: datares.attributes

          })
          localStorage.setItem("fields",datares.attributes);
          this.props.postStepsFields(datares.attributes);
          let StepArray1 = datares.attributes.filter(function (el) {
            return el.groupPriorityValue === 2
          }
          )
          this.props.postStep1(StepArray1);
          console.log("StepArray1", StepArray1);
          let StepArray2 = datares.attributes.filter(function (el) {
            return el.groupPriorityValue === 3
          }
          )
          
          this.props.postStep2(StepArray2);
          console.log("StepArray2", StepArray2);
          let StepArray3 = datares.attributes.filter(function (el) {
            return el.groupPriorityValue === 4
          }
          )
          this.props.postStep3(StepArray3);
          console.log("StepArray3", StepArray3);

          let StepArray4 = datares.attributes.filter(function (el) {
            return el.groupPriorityValue === 5
          }
          )
          this.props.postStep4(StepArray4);
          console.log("StepArray4", StepArray4);

          let StepArray5 = datares.attributes.filter(function (el) {
            return el.groupPriorityValue === 6
          }
          )
          this.props.postStep5(StepArray5);
          console.log("StepArray5", StepArray5);

          this.handleSubform({fields: [...datares.attributes]})
          this.setState({
            loading: false,
          });
        }
        this.setState({
          loading: false,
        });

      })()
    } catch (error) {
      console.log(error)
      this.setState({
        loading: false,
      });
    }
    this.setState({
      formData: {
        liabilityCreditType: value,
      },
    });

    let formData = LiabilityCreditTypeSubForm.FnCreateFormData({
      value: value,
    });

    console.log("formData update", formData, formID)
    console.log("this.state.attributes", this.state.attributes)
    this.props.cbUpdateSubForm(formID, formData);
    // this.props.cbGoSubForm('MainSubForm');
    // this.handleSubform()
    this.props.cbGoNext(formID);
  }
  handleSubform(data) {
    console.log("attributes data", data);
    // this.props.cbUpdateSubForm(formID, data);
  }

  render() {

    return (
      <React.Fragment>
        <div className='info-form-block'>
          <BrowserView>
            <Row gutter={16}>
              <Col span={24}>
                <h2 className="text-center font-weight-bold mb-4">Select the Type of Liability</h2>
              </Col>
            </Row>
            <Row gutter={16} type='flex' justify='center'>
              <Col span={12}>
                <h2 className='text-center font-weight-bold mb-4'>
                  Liabilities
                </h2>
                <div className='buttons-container'>
                  {this.state.liabilities.map((item, index) => {
                    let className = 'button-wrap';
                    if (
                      this.state.formData['liabilityCreditType'] ==
                      item.name
                    ) {
                      className = className + ' selected';
                    }
                    return (
                      <div
                        key={index}
                        className={className}
                        onClick={() =>
                          this.handleFormInputChange(
                            'liabilityCreditType',
                            item.name
                          )
                        }
                      >
                        <div style={{ flexDirection: 'column' }}>
                          <div className='col-12 mt-2'>
                            <img
                              src={item.image}
                              height='40px'
                              width='40px'
                            />
                          </div>
                          <div className='col-12 mb-2 mt-2'>
                            {item.name}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Col>
              <Col span={12}>
                <h2 className='text-center font-weight-bold mb-4'>Credit</h2>
                <div className='buttons-container'>
                  {this.state.credits.map((item, index) => {
                    let className = 'button-wrap-liability';
                    if (
                      this.state.formData['liabilityCreditType'] ==
                      item.name
                    ) {
                      className = className + ' selected';
                    }
                    return (
                      <div
                        key={index}
                        className={className}
                        onClick={() =>
                          this.handleFormInputChange(
                            'liabilityCreditType',
                            item.name
                          )
                        }
                      >
                        <div style={{ flexDirection: 'column' }}>
                          <div className='col-12 mt-2'>
                            <img
                              src={item.image}
                              height='40px'
                              width='40px'
                            />
                          </div>
                          <div className='col-12 mb-2 mt-2'>
                            {item.name}
                          </div>
                        </div>
                      </div>
                    );
                  })}


                </div>
              </Col>
            </Row>
          </BrowserView>
          <MobileView>
            <Row gutter={16} type='flex' justify='center'>
              <Col span={16}>
                <h2 className='text-center font-weight-bold mb-4'>
                  Liabilities
                </h2>
                <div className='buttons-container'>
                  {this.state.liabilities.map((item, index) => {
                    let className = 'button-wrap';
                    if (
                      this.state.formData['liabilityCreditType'] ==
                      item.name
                    ) {
                      className = className + ' selected';
                    }
                    return (
                      <div
                        key={index}
                        className={className}
                        onClick={() =>
                          this.handleFormInputChange(
                            'liabilityCreditType',
                            item.name
                          )
                        }
                      >
                        {item.name}
                      </div>
                    );
                  })}
                </div>
              </Col>
              <Col span={16}>
                <h2 className='text-center font-weight-bold mb-4'>Credit</h2>
                <div className='buttons-container'>
                  {this.state.credits.map((item, index) => {
                    let className = 'button-wrap';
                    if (
                      this.state.formData['liabilityCreditType'] ==
                      item.name
                    ) {
                      className = className + ' selected';
                    }
                    return (
                      <div
                        key={index}
                        className={className}
                        onClick={() =>
                          this.handleFormInputChange(
                            'liabilityCreditType',
                            item.name
                          )
                        }
                      >
                        {item.name}
                      </div>
                    );
                  })}
                </div>
              </Col>
            </Row>
          </MobileView>
        </div>
        <Loader isLoading={this.state.loading}></Loader>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
stepsFields: state.rootReducer.loginUser.stepsFields,

});

const mapDispatchToProps = { postStepsFields, postStep1,postStep2,postStep3,postStep4,postStep5,postselectedCollection };
export default connect(mapStateToProps, mapDispatchToProps)(LiabilityCreditTypeSubForm);
