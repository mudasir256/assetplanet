import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HorizontalBar } from 'react-chartjs-2';

/* *** Antd Components *** */
import { Row, Col, Descriptions } from 'antd';

/* *** Custom Components *** */
import PageTitle from '../../../components/layout/PageTitle';
import ReportInfoRow from '../../../components/shared/ReportInfo';
import Synopsis from '../../../components/layout/Synopsis/Synopsis';
import HighlightedReportBlock from '../../../components/layout/HighlightedReportBlock';
import TableReport from '../../../components/layout/TableReport';
import InfoList from '../../../components/InfoList';

/* *** Images *** */
import Logo from '../../../assets/images/abstract-dynamic-logo-vector.jpg'
import highlightedIcon from '../../../assets/images/contributions.png';

class BudgetReport extends Component {
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

        const monthlyBudgetData = [
            {
                'label': 'Expenses/Budget',
                'value': '$ 0',
                'span': 3
            },
            {
                'label': 'Assigned To',
                'value': '$ 102,000'
            },
            {
                'label': '2019',
                'value': '$ 204,000'
            }
        ];

        const savingsPotentialData = [
            {
                'label': 'All Income',
                'value': '$0'
            },
            {
                'label': 'All Budget',
                'value': '$ 234,000'
            },
            {
                'label': 'Savings Potential',
                'value': '$ 234,000'
            },
        ];

        const barData = {
            labels: ['John\'s House', 'Asset to sell'],
            datasets: [
                {
                  label: 'My First dataset',
                  backgroundColor: 'rgba(255,99,132,0.2)',
                  borderColor: 'rgba(255,99,132,1)',
                  borderWidth: 1,
                  hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                  hoverBorderColor: 'rgba(255,99,132,1)',
                  data: [65, 59, 80]
                }
            ]
        };

        const cols = [
            {
                title: 'Category',
                dataIndex: 'category',
                key: 'category'
            },
            {
                title: 'Sub Category',
                dataIndex: 'sub_category',
                key: 'sub_category',
            },
            {
                title: 'Monthly Amount',
                dataIndex: 'monthly_amount',
                key: 'monthly_amount',
            },
            {
                title: 'Monthly Actual',
                dataIndex: 'monthly_actual',
                key: 'monthly_actual',
            }
        ];
          
        const rows = [
            {
                key: '1',
                category: 'Primary Home',
                sub_category: 'Trust',
                monthly_amount: 'Frank Jones',
                monthly_actual: '$392,938'
            },
            {
                key: '2',
                category: 'Brokerage Account',
                sub_category: 'Individual',
                monthly_amount: 'AXA Advisors',
                monthly_actual: '$117,881'
            },
            {
                key: '3',
                category: 'Primary Home',
                sub_category: 'Trust',
                monthly_amount: 'Frank Jones',
                monthly_actual: '$392,938'
            }
        ];
        
        return (
            <div className="pageWrapper">
                <PageTitle title="Budget Report" />
                <Synopsis content="All Expenses and Goal Savings" />
                <ReportInfoRow data={reportInfoData} />
                <Row type="flex" justify="center" style={{ margin: '12px 0' }}>
                    <img src={Logo} alt="" style={{ height : '130px' }} /> 
                </Row>
                <Row type="flex" gutter={[20, 0]} style={{ margin: '20px 0' }}>
                    <Col span={7} style={{ paddingTop: '20px'}}>
                        <InfoList column={1} title="Monthly Budget Total" data={monthlyBudgetData} />
                    </Col>
                    <Col span={10}>
                        <HighlightedReportBlock title="Monthly Budget Total" value="204,000">
                            <img src={highlightedIcon} alt="" style={{ height: '100px' }} />     
                        </HighlightedReportBlock>
                    </Col>
                    <Col span={7} style={{ paddingTop: '20px'}}>
                        <InfoList column={1} title="Savings Potential" data={savingsPotentialData} />
                    </Col>
                </Row>
                <Row type="flex" justify="center" style={{ margin: '12px 0 30px', padding: '16px', border: '1px solid #ddd', backgroundColor: 'rgba(237, 237, 237, 0.40)' }}>
                <HorizontalBar
                    data={barData}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
                </Row>
                <Row style={{ marginBottom: '35px'}}>
                    <Descriptions className="info-list" bordered title="All Monthly Budget Items" size="small" column="3" layout="vertical">
                        <Descriptions.Item label="Expenses/Budget">Personal Loan</Descriptions.Item>
                        <Descriptions.Item label="Assigned To">Victor Pena</Descriptions.Item>
                        <Descriptions.Item label="2019">$1,437.50</Descriptions.Item>
                    </Descriptions>
                    <Descriptions className="info-list" bordered title="" size="small" column="4">
                        <Descriptions.Item label="Debts Total">$1,437.50</Descriptions.Item>
                        <Descriptions.Item label="Subtotal of Expenses">$1,437.50</Descriptions.Item>
                        <Descriptions.Item label="Total Expenses and Goal Funding">$1,437.50</Descriptions.Item>
                    </Descriptions>
                </Row>
                <TableReport title="2019 12 Budget Items" rows={rows} cols={cols} />
            </div>
        )
    }
}


export default connect()(BudgetReport);