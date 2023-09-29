import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pie } from 'react-chartjs-2';

/* *** Antd Components *** */
import { Row, Col, Statistic, Card, Icon } from 'antd';

/* *** Custom Components *** */
import PageTitle from '../../../components/layout/PageTitle';
import ReportInfoRow from '../../../components/shared/ReportInfo';
import Synopsis from '../../../components/layout/Synopsis/Synopsis';
import TableReport from '../../../components/layout/TableReport';

/* *** Images *** */
import Logo from '../../../assets/images/abstract-dynamic-logo-vector.jpg'

class LiquidityReport extends Component {
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
                title: 'Policies',
                dataIndex: 'policies',
                key: 'policies',
            },
            {
                title: 'Annual Premium',
                dataIndex: 'annual_premium',
                key: 'annual_premium',
            },
            {
                title: 'Cash Value',
                dataIndex: 'cash_value',
                key: 'cash_value',
            },
        ];

        const overallInsuranceRows = [
            {
                key: '1',
                title: 'Investments',
                policies: '1',
                annual_premium: '$ 2,000',
                cash_value: '$ 20,000',
            },
            {
                key: '2',
                title: 'Protection',
                policies: '2',
                annual_premium: '$ 2,000',
                cash_value: '$ 20,000',
            },
            {
                key: '3',
                title: 'Protection',
                policies: '2',
                annual_premium: '$ 4,000',
                cash_value: '$ 90,000',
            },
        ];

        const liquidityReportCols = [
            {
                title: 'Name of Asset',
                dataIndex: 'name_of_asset',
                key: 'name_of_asset'
            },
            {
                title: 'Held Where',
                dataIndex: 'held_where',
                key: 'held_where',
            },
            {
                title: 'Current Value',
                dataIndex: 'current_value',
                key: 'current_value',
            },
            {
                title: 'Value As of Date',
                dataIndex: 'value_as_of_date',
                key: 'value_as_of_date',
            },
            {
                title: 'This Asset is Liquid',
                dataIndex: 'this_asset_is_liquid',
                key: 'this_asset_is_liquid',
            },
            {
                title: 'Tax Penalty Applied',
                dataIndex: 'tax_penalty_applied',
                key: 'tax_penalty_applied',
            },
            {
                title: 'Taxes Deducted',
                dataIndex: 'taxes_deducted',
                key: 'taxes_deducted',
            },
            {
                title: 'Net Liquid',
                dataIndex: 'net_liquid',
                key: 'net_liquid',
            }
        ];
          
        const liquidityReportRows = [
            {
                key: '1',
                name_of_asset: 'Whole Life',
                held_where: 'Ameriprise Financial',
                current_value: 'Amtrust',
                value_as_of_date: '0',
                this_asset_is_liquid: '01/01/2040',
                tax_penalty_applied: '$ 2,000',
                taxes_deducted: '$ 2,000',
                net_liquid: '$ 0'
            },
        ];

        const investmentsData = {
            labels: [
                'Whole Life'
            ],
            datasets: [{
                data: [300],
                backgroundColor: [
                '#FF6384',
                ],
                hoverBackgroundColor: [
                '#FF6384',
                ]
            }]
        };

        const protectionData = {
            labels: [
                'Term 25 Year'
            ],
            datasets: [{
                data: [300],
                backgroundColor: [
                '#FF6384',
                ],
                hoverBackgroundColor: [
                '#FF6384',
                ]
            }]
        };
        
        return (
            <div className="pageWrapper">
                <PageTitle title="Liquidity Report" />
                <Synopsis content="Detailed listing of Assets" />
                <ReportInfoRow data={reportInfoData} />
                <Row type="flex" justify="center" style={{ margin: '12px 0 30px' }}>
                    <img src={Logo} alt="" style={{ height : '130px' }} /> 
                </Row>
                <div style={{ background: 'rgba(236, 236, 236, 0.6)', padding: 16 }}>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Card>
                            <Statistic
                                title="Net Liquidity"
                                value={123000}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<Icon type="dollar" />}
                            />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card>
                            <Statistic
                                title="Liquid"
                                value={11000}
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<Icon type="dollar" />}
                            />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card>
                            <Statistic
                                title="Tax and Penalties"
                                value={9.3}
                                precision={2}value={11000}
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<Icon type="dollar" />}
                            />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card>
                            <Statistic
                                title="Illiquid"
                                value={11000}
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<Icon type="dollar" />}
                            />
                            </Card>
                        </Col>
                    </Row>
                </div>
                <div style={{ marginBottom: 40}}>
                    <TableReport title="Asset Details" rows={liquidityReportRows} cols={liquidityReportCols} />
                </div>
            </div>
        )
    }
}

export default connect()(LiquidityReport);