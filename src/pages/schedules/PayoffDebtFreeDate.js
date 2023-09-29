import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import moment from 'moment';

class PayoffDebtFreeDate extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const columns = [
            {
                title: '',
                children: [
                    {
                        title: 'Name of Liabilities',
                        dataIndex: 'name_of_liabilities'
                    }
                ]
            },
            {
                title: 'ORIGINAL',
                children: [
                    {
                        title: 'Current Balance',
                        dataIndex: 'current_balance'
                    },
                    {
                        title: 'Interest Rate',
                        dataIndex: 'interest_rate'
                    },
                    {
                        title: 'Monthly Payment',
                        dataIndex: 'monthly_payment'
                    },
                    {
                        title: "Add'l Principal",
                        dataIndex: 'additional_principal'
                    },
                    {
                        title: 'Months to Payoff',
                        dataIndex: 'months_to_payoff'
                    },
                    {
                        title: 'Total Interest',
                        dataIndex: 'total_interest'
                    }
                ]
            },
            {
                title: 'ACCELERATED',
                children: [
                    {
                        title: 'New Payoff (Months)',
                        dataIndex: 'new_payoff'
                    },
                    {
                        title: 'New Monthly Payment',
                        dataIndex: 'new_montly_payment'
                    },
                    {
                        title: 'New Total Interest',
                        dataIndex: 'new_total_interest'
                    }
                ]
            },
            {
                title: 'TOTAL SAVINGS',
                children: [
                    {
                        title: '# Months Savings',
                        dataIndex: 'monthly_savings'
                    },
                    {
                        title: '$ Interest Savings',
                        dataIndex: 'interest_savings'
                    }
                ]
            }
        ];
        const data = [
            {
                key: 1,
                name_of_liabilities: "Tracy's Car",
                current_balance: '$ 20,000.00',
                interest_rate: '$ 20,000.00',
                monthly_payment: '$ 20,000.00',
                additional_principal: '$ 20,000.00',
                months_to_payoff: '$ 20,000.00',
                total_interest: '$ 20,000.00',
                new_payoff: '$ 20,000.00',
                new_montly_payment: '$ 20,000.00',
                new_total_interest: '$ 20,000.00',
                monthly_savings: '$ 20,000.00',
                interest_savings: '$ 20,000.00'
            }
        ];
        return (
            <React.Fragment>
                <div className="page-nav-history">
                    {/* <Link to="/" className="page-nav-link">
                        Home
                    </Link>
                    /
                    <Link to="/schedules" className="page-nav-link">
                        Schedules
                    </Link>
                    /
                    <Link to="/payoff_debt_free_date" className="page-nav-link">
                        Debt Free Date Information
                    </Link> */}
                </div>
                <div>
                    <Table dataSource={data} columns={columns} pagination={false} bordered></Table>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(PayoffDebtFreeDate);