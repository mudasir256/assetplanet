import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pie, HorizontalBar } from 'react-chartjs-2';

/* *** Antd Components *** */
import { Row, Col } from 'antd';

/* *** Custom Components *** */
import PageTitle from '../../../components/layout/PageTitle';
import ReportInfoRow from '../../../components/shared/ReportInfo';
import Synopsis from '../../../components/layout/Synopsis/Synopsis';
import TableReport from '../../../components/layout/TableReport';

/* *** Images *** */
import Logo from '../../../assets/images/abstract-dynamic-logo-vector.jpg'

class MonthlySavings extends Component {
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

        const overallInsuranceCols = [
            {
                title: '',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: 'Monthly Totals',
                dataIndex: 'monthly_totals',
                key: 'monthly_totals',
            }
        ];

        const overallInsuranceRows = [
            {
                key: '1',
                title: 'All Income',
                monthly_totals: '$ 23,152'
            },
            {
                key: '2',
                title: 'All Monthly Expenses',
                monthly_totals: '$ 23,152',
            },
            {
                key: '3',
                title: 'All Goal Savings (need formula)',
                monthly_totals: '$ 23,152',
            },
            {
                key: '4',
                title: 'Saving Potential',
                monthly_totals: '$ 23,152',
            },
        ];

        const budgetCategoryDetailsCols = [
            {
                title: 'Category',
                dataIndex: 'category',
                key: 'category'
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                key: 'amount',
            }
        ];
          
        const budgetCategoryDetailsRows = [
            {
                key: '1',
                category: 'Charity',
                amount: '$ 346',
            },
            {
                key: '2',
                category: 'Charity',
                amount: '$ 346',
            },
            {
                key: '3',
                category: 'Charity',
                amount: '$ 346',
            },
        ];

        const existingIncomeCols = [
            {
                title: 'Income Source',
                dataIndex: 'income_source',
                key: 'income_source'
            },
            {
                title: 'Whose Income',
                dataIndex: 'whose_income',
                key: 'whose_income',
            },
            {
                title: 'Passive or Earned',
                dataIndex: 'passive_or_earned',
                key: 'passive_or_earned',
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                key: 'amount',
            }
        ];
          
        const existingIncomeRows = [
            {
                key: '1',
                income_source: 'Earned Income From Work',
                whose_income: 'Jane Smith',
                passive_or_earned: 'Earned',
                amount: '$ 2,500'
            },
            {
                key: '2',
                income_source: 'Real Estate Rental',
                whose_income: 'Jane Smith',
                passive_or_earned: 'Earned',
                amount: '$ 2,500'
            },
            {
                key: '3',
                income_source: 'Military Benefits',
                whose_income: 'Jane Smith',
                passive_or_earned: 'Earned',
                amount: '$ 2,500'
            },
        ];
        
        const allMonthlyIncomeData = {
            labels: [
                '1. Testing multiple dist to income',
                '2. Dist',
                '3. Adam\'s Dist'
            ],
            datasets: [{
                data: [300, 50, 100],
                backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ]
            }]
        };

        const allExpensesData = {
            labels: ['Transportation', 'Pets', 'Insurance', 'Goal', 'Charity'],
            datasets: [
                {
                  label: 'My First dataset',
                  backgroundColor: 'rgba(255,99,132,0.2)',
                  borderColor: 'rgba(255,99,132,1)',
                  borderWidth: 1,
                  hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                  hoverBorderColor: 'rgba(255,99,132,1)',
                  data: [65, 59, 80, 100, 340]
                }
            ]
        };

        return (
            <div className="pageWrapper">
                <PageTitle title="Savings Ability" />
                <Synopsis content="Details of Income Less Expenses" />
                <ReportInfoRow data={reportInfoData} />
                <Row type="flex" justify="center" style={{ margin: '12px 0' }}>
                    <img src={Logo} alt="" style={{ height : '130px' }} /> 
                </Row>
                <Row type="flex" gutter={[20, 0]} style={{ margin: '30px 0 40px' }} justify="center">
                    <Col span={10}>
                        <TableReport rows={overallInsuranceRows} cols={overallInsuranceCols} />
                    </Col>
                </Row>
                <PageTitle title="All Monthly Income" level={4} />
                <Row type="flex" justify="center" style={{ margin: '12px 0 40px', padding: '16px', border: '1px solid #ddd', backgroundColor: 'rgba(237, 237, 237, 0.40)' }}>
                    <Pie
                        data={allMonthlyIncomeData}
                        options={{
                            maintainAspectRatio: false
                        }}
                        height={250}
                    />
                </Row>
                <PageTitle title="All Expenses" level={4} />
                <Row type="flex" justify="center" style={{ margin: '12px 0 40px', padding: '16px', border: '1px solid #ddd', backgroundColor: 'rgba(237, 237, 237, 0.40)' }}>
                    <HorizontalBar
                        data={allExpensesData}
                        options={{
                            maintainAspectRatio: false
                        }}
                        height={300}
                    />
                </Row>
                <Row type="flex" gutter={[20, 0]}>
                    <Col span={12}>
                        <TableReport title="Budget Category Details" rows={budgetCategoryDetailsRows} cols={budgetCategoryDetailsCols} />
                    </Col>
                    <Col span={12}>
                        <TableReport title="Existing Income - Summary Monthly" rows={existingIncomeRows} cols={existingIncomeCols} />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default connect()(MonthlySavings);