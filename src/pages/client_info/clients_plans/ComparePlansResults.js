import React, {useEffect, useState} from 'react';
import { Row, Col} from 'antd';
import 'antd/dist/antd.css';
import { StyledComparePlans } from "../../../components/new-styled-components/ComparePlansStyling.js"

const ComparePlansResults = () =>  {
  return (
    <>
      <StyledComparePlans>
        <Row gutter={[{xs: 24, sm:32, md: 40}, {xs: 24, sm:32, md: 40}]}>
          <Col xs={24} md={12}>
            <div className="compared-plans white-bg">
              <h1 className='green'>Plan 1 - 2025</h1>
              <div className="data-row title-green">
                <div>Item</div>
                <div>Amount</div>
              </div>
              <div className="data-row">
                <div className="title-item">Assets</div>
                <div>######</div>
              </div>
              <div className="data-row">
                <div className="title-item">Liabilities</div>
                <div>$852,441.00</div>
              </div>
              <div className="data-row">
                <div>
                  <div className="title-item">Income TOTAL </div>
                  <div className="title-subitem">Social Security (Annual)</div>
                  <div className="title-subitem">Social Security-Spouse (Annual)</div>
                </div>
                <div>
                  <div>$65,000.00 </div>
                  <div className="title-subitem">$35,000.00 </div>
                  <div className="title-subitem">$15,000.00 </div>
                </div>
              </div>
              <div className="data-row">
                <div className="title-item">Expenses</div>
                <div>$45,000.00</div>
              </div>
              <div className="data-row">
                <div>
                  <div className="green sm-text">Goals</div> 
                  <div className="title-item sm-text"></div> 
                  <div className="title-item sm-text">Retirement</div>
                  <div className="title-item sm-text">Travel and Aventure</div>
                  <div className="title-item sm-text">Vocation Home</div>
                </div>
                <div>
                  <div className="data-row subrow">
                    <div>
                      <div className="green sm-text"></div> 
                      <div className="title-item sm-text">Needed</div>
                      <div className="sm-text">######</div>
                      <div className="sm-text">$150,000.00 </div>
                      <div className="sm-text">$650,000.00 </div>
                    </div>
                    <div>
                      <div className="green sm-text"></div> 
                      <div className="title-item sm-text">Have</div>
                      <div className="sm-text">$250,000.00 </div>
                      <div className="sm-text">$75,000.00 </div>
                      <div className="sm-text">$500,000.00 </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="extra-space"></div>
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div className="compared-plans blue-bg">
              <h1 className='blue'>Plan 2 - 2025</h1>
              <div className="data-row title-blue">
                <div>Item</div>
                <div>Amount</div>
              </div>
              <div className="data-row">
                <div className="title-item">Assets</div>
                <div>######</div>
              </div>
              <div className="data-row">
                <div className="title-item">Liabilities</div>
                <div>$852,441.00</div>
              </div>
              <div className="data-row">
                <div>
                  <div className="title-item">Income TOTAL </div>
                  <div className="title-subitem">Social Security (Annual)</div>
                  <div className="title-subitem">Social Security-Spouse (Annual)</div>
                </div>
                <div>
                  <div>$65,000.00 </div>
                  <div className="title-subitem">$35,000.00 </div>
                  <div className="title-subitem">$15,000.00 </div>
                </div>
              </div>
              <div className="data-row">
                <div className="title-item">Expenses</div>
                <div>$45,000.00</div>
              </div>
              <div className="data-row">
                <div>
                  <div className="blue sm-text">Goals</div> 
                  <div className="title-item sm-text"></div> 
                  <div className="title-item sm-text">Retirement</div>
                  <div className="title-item sm-text">Travel and Aventure</div>
                  <div className="title-item sm-text">Vocation Home</div>
                </div>
                <div>
                  <div className="data-row subrow">
                    <div>
                      <div className="blue sm-text"></div> 
                      <div className="title-item sm-text">Needed</div>
                      <div className="sm-text">######</div>
                      <div className="sm-text">$150,000.00 </div>
                      <div className="sm-text">$650,000.00 </div>
                    </div>
                    <div>
                      <div className="blue sm-text"></div> 
                      <div className="title-item sm-text">Have</div>
                      <div className="sm-text">$250,000.00 </div>
                      <div className="sm-text">$75,000.00 </div>
                      <div className="sm-text">$500,000.00 </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="extra-space"></div>
            </div>
          </Col>
        </Row>
      </StyledComparePlans>
    </>
  )
}


export default ComparePlansResults;