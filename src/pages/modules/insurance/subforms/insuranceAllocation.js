import React, { useEffect, Fragment, useState } from "react";
import { Row, Col } from "reactstrap";
import { MODULE_API } from "../../../../apis";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Loader from "../../../../components/styled-components/loader/loader";
import { Link } from "react-router-dom";
import Trust from '../../../../assets/images/latest/Trust.png'
import Insurance from '../../../../assets/images/latest/Insurance.png'
import Networth2 from '../../../../assets/images/latest/Networth2.png'
import Vacation from '../../../../assets/images/latest/Vacation-Home.png'

const InsuranceAllocation = () => {
  const [data, setData] = useState();
  const [loading, setIsLoading] = useState(true);
  const history = useHistory();


  const [annuitydata, setAnnuityData] = useState([]);
  const [healthdata, setHealthData] = useState([]);
  const [casualtydata, setCasualtyData] = useState([]);
  const [insurancedata, setDataInsurance] = useState([]);


  async function getAllInsuranceAssets() {
    setIsLoading(true);
    let data = await MODULE_API.insuraceAllocation("Insurance Products")
    if (data && data.data) {
      console.log("data inside insuarce", data.data)
      data.data.map(item => {
        if (item.name === "Annuity") {
          console.log("item.child", item.child)
          setAnnuityData(item.child)
        }
        if (item.name === "Life and Health") {
          setHealthData(item.child)
        }
        if (item.name === "Property and Casualty") {
          setCasualtyData(item.child)
        }
        if (item.name === "Long Term Care Insurance") {
          setDataInsurance(item.child)
        }
      })
    }
    setIsLoading(false);
  }

  function handleAssetSelect(name) {
    history.push(`/insurance_new/attributes/${name}`)
   
  }
  useEffect(() => {
    getAllInsuranceAssets();
  }, []);

  return (
    <Fragment>
      <div className="info-form-block">
        <Row gutter={16}>
          <Col span={24}>
            <h2 className="text-center font-weight-bold mb-4">
              Select the Type of Insurance
            </h2>
          </Col>
        </Row>
        <Row gutter={16} style={{ margin: "0px" }}>
          <Col span={6}>
            <h3 className="text-center font-weight-bold insurace-group-title">Annuity</h3>
            <div className="buttons-container">
              <div className={'button-wrap-cust'}>
                <div style={{ flexDirection: 'column' }}>
                  <div className='col-12'>
                    <img src={Trust} height="80px" width="80px" />
                  </div>
                </div>
              </div>
              {
                annuitydata.map((insuranceType, index) => {
                  let className = 'button-wrap width--full';
                  // if (this.state.formData['insuranceType'] == insuranceType.name) {
                  //   className = className + ' selected';
                  // }

                  return (
                    <div key={index} className={className} onClick={() => {
                      handleAssetSelect(insuranceType.name);
                    }}>
                      {insuranceType.name}
                    </div>

                  )
                })
              }
            </div>
          </Col>
          <Col span={6}>
            <h3 className="text-center font-weight-bold mb-2 insurace-group-title">Life and Health</h3>
            <div className="buttons-container">
              {/* <div className={'button-wrap-cust'} style={{ width: '100%' }}>
                                    <div style={{ flexDirection: 'column' }}>
                                        <div className='col-12'>
                                            <img src={Insurance} height='100px' width='80px' />
                                        </div>
                                    </div>
                                </div> */}
              <div className={'button-wrap-cust'} style={{ width: '100%' }}>
                <div className='col-12'>
                  <img src={Insurance} height="80px" width="80px" />
                </div>
              </div>
              {
                healthdata.map((insuranceType, index) => {
                  let className = 'button-wrap width--full';
                  // if (this.state.formData['insuranceType'] == insuranceType.name) {
                  //   className = className + ' selected';
                  // }

                  return (
                    <div key={index} className={className} onClick={() => {
                      handleAssetSelect(insuranceType.name);
                    }}>
                      {insuranceType.name}
                    </div>

                  )
                })
              }
            </div>
          </Col>
          <Col span={6}>
            <h3 className="text-center font-weight-bold mb-2 insurace-group-title">Property and Casualty</h3>
            <div className="buttons-container">
              <div className={'button-wrap-cust'}>
                <div style={{ flexDirection: 'column' }}>
                  <div className='col-12'>
                    <img src={Networth2} height="80px" width="80px" />
                  </div>
                </div>
              </div>
              {
                casualtydata.map((insuranceType, index) => {
                  let className = 'button-wrap width--full';
                  // if (this.state.formData['insuranceType'] == insuranceType.name) {
                  //   className = className + ' selected';
                  // }

                  return (
                    <div key={index} className={className} onClick={() => {
                      handleAssetSelect(insuranceType.name);
                    }}>
                      {insuranceType.name}
                    </div>

                  )
                })
              }
            </div>
          </Col>
          <Col span={6}>
            <h3 className="text-center font-weight-bold mb-2 insurace-group-title">Long Term Care</h3>
            <div className="buttons-container">
              <div className={'button-wrap-cust'}>
                <div style={{ flexDirection: 'column' }}>
                  <div className='col-12'>
                    <img src={Vacation} height="80px" width="80px" />
                  </div>
                </div>
              </div>
              {
                insurancedata.map((insuranceType, index) => {
                  let className = 'button-wrap width--full';
                  // if (this.state.formData['insuranceType'] == insuranceType.name) {
                  //   className = className + ' selected';
                  // }

                  return (
                    <div key={index} className={className} onClick={() => {
                      handleAssetSelect(insuranceType.name);
                    }}>
                      {insuranceType.name}
                    </div>

                  )
                })
              }
            </div>
          </Col>
        </Row>
      </div>
      <Loader isLoading={loading} />
    </Fragment>
  );
};

export default InsuranceAllocation;
