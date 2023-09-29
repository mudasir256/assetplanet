import React, { Component } from 'react';
import { connect } from 'react-redux';

/* *** Antd Components *** */
import { Row, Col } from 'antd';

/* *** Custom Components *** */
import PageTitle from '../../../../components/layout/PageTitle';
import ReportInfoRow from '../../../../components/shared/ReportInfo';
import InfoList from '../../../../components/InfoList';
import ActionBar from '../ActionBar';
import Sidebar from '../Sidebar';

/* *** Images *** */
import Logo from '../../../../assets/images/abstract-dynamic-logo-vector.jpg'

class Summary extends Component {
    render() {
        const reportInfoData = [
            {
                'title': 'Client Name',
                'value': 'Bill Client'
            },
            {
                'title': 'Plan Nickname',
                'value': 'First Plan'
            }
        ];

        const companyInformation = [
            {
                'label': 'Company Name',
                'value': '',
                'span': 1
            },
            {
                'label': 'Presented By',
                'value': ''
            },
            {
                'label': 'Title',
                'value': ''
            }
        ];

        const clientInformation = [
            {
                'label': 'Client Name',
                'value': 'Victor',
                'span': 1
            },
            {
                'label': 'Spouse/Partner',
                'value': 'Maria'
            }
        ];

        const assumptions = [
            {
                'label': 'Plan Nickname',
                'value': 'Initial Plan'
            },
            {
                'label': 'Date',
                'value': '12-08-2000'
            },
            {
                'label': 'Static Inflation Rate',
                'value': '22'
            }
        ];

        const presentNetWorth = [
            {
                'label': 'Assets',
                'value': '$200000'
            },
            {
                'label': 'Liabilities',
                'value': '$3000'
            },
            {
                'label': 'Total Net Worth',
                'value': '$300000'
            }
        ];

        const presentCashFlow = [
            {
                'label': 'All Income Sources',
                'value': '$200000'
            },
            {
                'label': 'All Budget Expenses',
                'value': '$3000'
            },
            {
                'label': 'Net Savings Or Shortfall',
                'value': '$300000'
            }
        ];

        const presentLiquidity = [
            {
                'label': 'Taxatie Asset',
                'value': '$200000'
            },
            {
                'label': 'Tax-Defence Assets',
                'value': '$3000'
            },
            {
                'label': 'Total Liquid Assets',
                'value': '$300000'
            }
        ];
        
        return (
          <div className='pageWrapper'>
            <Row>
              <Col span={19} className='px-3'>
                <PageTitle title='Summary' />
                <ReportInfoRow data={reportInfoData} />
                <Row type='flex' justify='center' style={{ margin: '12px 0' }}>
                  <img src={Logo} alt='' style={{ height: '130px' }} />
                </Row>
                <Row type='flex' gutter={[20, 0]}>
                  <Col span={12}>
                    <InfoList column={1} title='Company Information' data={companyInformation} />
                  </Col>
                  <Col span={12}>
                    <InfoList column={1} title='Client Information' data={clientInformation} />
                  </Col>
                </Row>
                <Row type='flex' gutter={[20, 0]}>
                  <Col span={12}>
                    <InfoList column={1} title='Assumptions' data={assumptions} />
                  </Col>
                  <Col span={12}>
                    <InfoList column={1} title='Present Net Worth' data={presentNetWorth} />
                  </Col>
                </Row>
                <Row type='flex' gutter={[20, 0]}>
                  <Col span={12}>
                    <InfoList column={1} title='Present Cash Flow' data={presentCashFlow} />
                  </Col>
                  <Col span={12}>
                    <InfoList column={1} title='Present Liquidity' data={presentLiquidity} />
                  </Col>
                </Row>
                <ActionBar next='/audio_video_message_view' prev='/asset_planet_message' />
              </Col>
              <Col span={5}>
                <Sidebar />
              </Col>
            </Row>
          </div>
        );
    }
}


export default connect()(Summary);