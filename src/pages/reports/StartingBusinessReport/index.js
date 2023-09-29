import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';

/* *** Antd Components *** */
import { Row, Col } from 'antd';

/* *** Custom Components *** */
import PageTitle from '../../../components/layout/PageTitle';
import ReportInfoRow from '../../../components/shared/ReportInfo';
import Synopsis from '../../../components/layout/Synopsis/Synopsis';
import TableReport from '../../../components/layout/TableReport';
import InfoList from '../../../components/InfoList';
import GoalRow from './modals/GoalRow';

/* *** Images *** */
import Logo from '../../../assets/images/abstract-dynamic-logo-vector.jpg'

class StartingBusinessReport extends Component {
    render() {
        const reportInfoData = [
            {
                'title': 'Client Name',
                'value': 'Bill Client'
            },
            {
                'title': 'Plan Nickname',
                'value': 'First Plan'
            },
            {
                'title': 'Spouse Name',
                'value': 'Peggy Client'
            },
            {
                'title': 'Today\'s Date',
                'value': '11/20/2019'
            }
        ];

        const goalReportData = {
            'title': 'Goal 2',
            'have': '0',
            'need': '0',
            'color': 'purple',
            dataSets: [
                {
                    'label': 'Single/Multi Year Goal',
                    'value': 'Multi-Year Goal'
                },
                {
                    'label': 'Inflation Rate',
                    'value': ''
                },
                {
                    'label': 'Goal Start Date',
                    'value': '06/02/2025'
                },
                {
                    'label': 'Total Goal Cost',
                    'value': 'Frank Jones'
                },
                {
                    'label': 'Total Saved',
                    'value': ''
                },
                {
                    'label': 'Total Estimated Shortfall',
                    'value': ''
                },
            ]
        };

        const chartData = {
            labels: ['1. Testing Multiple dist to income', 'Dist', 'Adam\'s Dist', 'Brand New Rental', 'Dist Two', 'Early WD', 'Frank\'s Annuity'],
            datasets: [
              {
                label: '',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [0, 50000, 100000, 150000, 0, 50000, 100000]
              }
            ]
        };

        const estimatedCostsStartupData = [
            {
                'label': 'Initial Franchise Fees',
                'value': '0'
            },
            {
                'label': 'Initial Build Out Costs',
                'value': '0'
            },
            {
                'label': 'Initial Inventory',
                'value': '0'
            },
            {
                'label': 'Year One Burn Rate',
                'value': '0'
            },
            {
                'label': 'Total Start-up Costs',
                'value': '0'
            },
        ];

        const estimatedValuationsCols = [
            {
                title: 'Year',
                dataIndex: 'year',
                key: 'year'
            },
            {
                title: 'Valuation Type',
                dataIndex: 'valuation_type',
                key: 'valuation_type',
            },
            {
                title: 'Multiplier',
                dataIndex: 'multiplier',
                key: 'multiplier',
            },
            {
                title: 'Est . Value',
                dataIndex: 'est_Value',
                key: 'est_Value',
            }
        ];
          
        const estimatedValuationsRows = [
            {
                key: '1',
                year: '2025',
                valuation_type: 'Jane Smith',
                multiplier: 'Earned',
                est_Value: '$ 2,500'
            },
        ];

        const estimatedPLCols = [
            {
                title: 'Year',
                dataIndex: 'year',
                key: 'year'
            },
            {
                title: 'Costs',
                dataIndex: 'Costs',
                key: 'Costs',
            },
            {
                title: 'Gross',
                dataIndex: 'gross',
                key: 'gross',
            },
            {
                title: 'Growth %',
                dataIndex: 'growth',
                key: 'growth',
            },
            {
                title: 'Profits',
                dataIndex: 'profits',
                key: 'profits',
            }
        ];
          
        const estimatedPLRows = [
            {
                key: '1',
                year: '2025',
                Costs: '10000',
                gross: '10000',
                growth: '0.49',
                profits: '10000.00',
            },
            {
                key: '2',
                year: '2026',
                Costs: '10000',
                gross: '10000',
                growth: '0.49',
                profits: '10000.00',
            },
            {
                key: '3',
                year: '2027',
                Costs: '10000',
                gross: '10000',
                growth: '0.49',
                profits: '10000.00',
            },
        ];

        return (
            <div className="pageWrapper">
                <PageTitle title="Starting a Business Report" />
                <Synopsis content="Report on Starting Business" />
                <ReportInfoRow data={reportInfoData} />
                <Row type="flex" justify="center" style={{ margin: '12px 0 30px' }}>
                    <img src={Logo} alt="" style={{ height : '130px' }} /> 
                </Row>
                <GoalRow data={goalReportData} />
                <PageTitle title="Start Business Bar Graph" level={4} />
                <Row type="flex" justify="center" style={{ margin: '12px 0 30px', padding: '16px', border: '1px solid #ddd', backgroundColor: 'rgba(237, 237, 237, 0.40)' }}>
                    <Bar
                        data={chartData}
                        height={300}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />
                </Row>
                <Row type="flex" gutter={[20, 0]}>
                    <Col span={24}>
                        <InfoList column={1} title="Estimated Costs Start-up" data={estimatedCostsStartupData} />
                    </Col>
                </Row>
                <Row type="flex" gutter={[20, 0]}>
                    <Col span={12}>
                        <TableReport title="Estimated Valuations" rows={estimatedValuationsRows} cols={estimatedValuationsCols} />
                    </Col>
                    <Col span={12}>
                        <TableReport title="Estimated P&L" rows={estimatedPLRows} cols={estimatedPLCols} />
                    </Col>
                </Row>
            </div>
        )
    }
}


export default connect()(StartingBusinessReport);