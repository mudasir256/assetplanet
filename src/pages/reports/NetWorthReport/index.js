import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HorizontalBar, Bar } from 'react-chartjs-2';

/* *** Antd Components *** */
import { Row, Col, Descriptions } from 'antd';

/* *** Custom Components *** */
import PageTitle from '../../../components/layout/PageTitle';
import ReportInfoRow from '../../../components/shared/ReportInfo';
import Synopsis from '../../../components/layout/Synopsis/Synopsis';
import HighlightedReportBlock from '../../../components/layout/HighlightedReportBlock';
import TableReport from '../../../components/layout/TableReport';

/* *** Images *** */
import Logo from '../../../assets/images/abstract-dynamic-logo-vector.jpg'
import highlightedIcon from '../../../assets/images/contributions.png';

class NetWorthReport extends Component {
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

        const assetDetailsCols = [
            {
                title: 'Name of Asset',
                dataIndex: 'nameofAsset',
                key: 'nameofAsset'
            },
            {
                title: 'Owner',
                dataIndex: 'owner',
                key: 'owner',
            },
            {
                title: 'Account Titled',
                dataIndex: 'account_titled',
                key: 'account_titled',
            },
            {
                title: 'Asset Allocation',
                dataIndex: 'asset_allocation',
                key: 'asset_allocation',
            },
            {
                title: 'Monetary Value',
                dataIndex: 'monetary_value',
                key: 'monetary_value',
            },
            {
                title: 'Value As of Date',
                dataIndex: 'value_as_of_date',
                key: 'value_as_of_date',
            },
        ];
          
        const assetDetailsRows = [
            {
                key: '1',
                nameofAsset: 'Primary Home',
                owner: 'Trust',
                account_titled: 'Frank Jones',
                asset_allocation: '$392,938',
                monetary_value: '$392,938',
                value_as_of_date: '$392,938',
            },
            {
                key: '2',
                nameofAsset: 'Brokerage Account',
                owner: 'Individual',
                account_titled: 'AXA Advisors',
                asset_allocation: '$117,881',
                monetary_value: '$392,938',
                value_as_of_date: '$392,938',
            },
            {
                key: '3',
                nameofAsset: 'Primary Home',
                owner: 'Trust',
                account_titled: 'Frank Jones',
                asset_allocation: '$392,938',
                monetary_value: '$392,938',
                value_as_of_date: '$392,938',
            }
        ];

        const debtDetailsCols = [
            {
                title: 'Debt Type',
                dataIndex: 'debtType',
                key: 'debtType'
            },
            {
                title: 'Whose Debt',
                dataIndex: 'whose_debt',
                key: 'whose_debt',
            },
            {
                title: 'Bank',
                dataIndex: 'bank',
                key: 'bank',
            },
            {
                title: 'Debt Balance',
                dataIndex: 'debt_balance',
                key: 'debt_balance',
            },
            {
                title: 'As of Date',
                dataIndex: 'as_of_date',
                key: 'as_of_date',
            }
        ];
          
        const debtDetailsRows = [
            {
                key: '1',
                debtType: 'Primary Home',
                whose_debt: 'Trust',
                bank: 'Frank Jones',
                debt_balance: '$392,938',
                as_of_date: '$392,938'
            },
            {
                key: '2',
                debtType: 'Brokerage Account',
                whose_debt: 'Individual',
                bank: 'AXA Advisors',
                debt_balance: '$117,881',
                as_of_date: '$392,938'
            },
            {
                key: '3',
                debtType: 'Primary Home',
                whose_debt: 'Trust',
                bank: 'Frank Jones',
                debt_balance: '$392,938',
                as_of_date: '$392,938'
            }
        ];
        
        return (
            <div className="pageWrapper">
                <PageTitle title="Net Worth Report" />
                <Synopsis content="All Assets Less All Liabilities" />
                <ReportInfoRow data={reportInfoData} />
                <Row type="flex" justify="center" style={{ margin: '12px 0' }}>
                    <img src={Logo} alt="" style={{ height : '130px' }} /> 
                </Row>
                <Row type="flex" justify="center" gutter={[20, 0]} style={{ margin: '20px 0' }}>
                    <Col span={10}>
                        <HighlightedReportBlock title="Net Worth INCLUDING Principal Residence" value="204,000">
                            <img src={highlightedIcon} alt="" style={{ height: '100px' }} />     
                        </HighlightedReportBlock>
                    </Col>
                    <Col span={10}>
                        <HighlightedReportBlock title="Net Worth WITHOUT Principal Residence" value="204,000">
                            <img src={highlightedIcon} alt="" style={{ height: '100px' }} />     
                        </HighlightedReportBlock>
                    </Col>
                </Row>
                <Row type="flex" justify="center" gutter={[20, 0]} style={{ margin: '20px 0' }}>
                    <Col span={12}>
                        <PageTitle title="Asset by Name" level={4} />
                        <div>
                            <Bar
                                data={barData}
                                height={300}
                                options={{
                                    maintainAspectRatio: false
                                }}
                            />
                        </div>
                    </Col>
                    <Col span={12}>
                        <PageTitle title="Asset by Name" level={4} />
                        <div>
                            <Bar
                                data={barData}
                                height={300}
                                options={{
                                    maintainAspectRatio: false
                                }}
                            />
                        </div>
                    </Col>
                </Row>
                <PageTitle title="Liabilities by Name" level={4} />
                <Row type="flex" justify="center" style={{ margin: '12px 0 30px', padding: '16px', border: '1px solid #ddd', backgroundColor: 'rgba(237, 237, 237, 0.40)' }}>
                    <HorizontalBar
                        data={barData}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />
                </Row>
                <TableReport title="Asset Details" rows={assetDetailsRows} cols={assetDetailsCols} />
                <TableReport title="Debt Details" rows={debtDetailsRows} cols={debtDetailsCols} />
            </div>
        )
    }
}


export default connect()(NetWorthReport);