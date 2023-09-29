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

class BudgetDetailed extends Component {
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
                title: 'Expenses/Budget',
                dataIndex: 'expenses_budget',
                key: 'expenses_budget'
            },
            {
                title: '2019',
                dataIndex: '2019',
                key: '2019',
            },
            {
                title: '2020',
                dataIndex: '2020',
                key: '2020',
            },
            {
                title: '2021',
                dataIndex: '2021',
                key: '2021',
            },
            {
                title: '2022',
                dataIndex: '2022',
                key: '2022',
            }
        ];
          
        const rows = [
            {
                key: '1',
                expenses_budget: 'Personal Loan',
                '2019': '$1,437.50',
                '2020': '$1,437.50',
                '2021': '$1,437.50',
                '2022': '$1,437.50',
            },
            {
                key: '2',
                expenses_budget: 'Subtotal of Expenses',
                '2019': '$1,437.50',
                '2020': '$1,437.50',
                '2021': '$1,437.50',
                '2022': '$1,437.50',
            },
            {
                key: '3',
                expenses_budget: 'Total Expenses and Goal Funding',
                '2019': '$1,437.50',
                '2020': '$1,437.50',
                '2021': '$1,437.50',
                '2022': '$1,437.50',
            }
        ];
        
        return (
            <div className="pageWrapper">
                <PageTitle title="Report - Budget Detailed" />
                <ReportInfoRow data={reportInfoData} />
                <Row type="flex" justify="center" style={{ margin: '12px 0' }}>
                    <img src={Logo} alt="" style={{ height : '130px' }} /> 
                </Row>
                <TableReport title="" rows={rows} cols={cols} />
            </div>
        )
    }
}


export default connect()(BudgetDetailed);