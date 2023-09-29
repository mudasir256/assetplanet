import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Report from '../../components/Report';
import moment from 'moment';

class DebtPayoffAmount extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const columns = [
            {
                title: 'Month & Year',
                dataIndex: 'month_year'
            },
            {
                title: 'Name of Liabilities',
                dataIndex: 'name_of_liabilities'
            },
            {
                title: 'Current Monthly Payment',
                dataIndex: 'current_monthly_payment',
            },
            {
                title: "Add'l Principal Payments",
                dataIndex: 'pricinpal_payments',
            },
            {
                title: 'Push for Debt Free',
                dataIndex: 'push_for_debt_free',
            },
            {
                title: 'Monthly and Additional',
                dataIndex: 'monthly_and_additional',
            },
            {
                title: 'Current Balance',
                dataIndex: 'current_balance',
            },
            {
                title: "Excess Add'l Principal Payments",
                dataIndex: 'excess_pricinpal_payments'
            },
            {
                title: 'Excess Push for Debt Free',
                dataIndex: 'excess_push_for_debt_free'
            }
        ];
        const data = [];

        for (let i = 0; i < 44; i++) {
            data.push({
                key: i,
                month_year: moment(`November 2019`, 'MMMM YYYY').add('month', i).format('MMM YYYY'),
                name_of_liabilities: 'Personal Loan',
                current_monthly_payment: '$ 753.86',
                pricinpal_payments: '$ 0.00',
                push_for_debt_free: '$200.00',
                monthly_and_additional: '$953.86',
                current_balance:  `$ ${Math.floor(30000 + Math.random() * 10000)}.00`,
                excess_pricinpal_payments: null,
                excess_push_for_debt_free: '$ 0.00'
            });
        }
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
                    <Link to="/amortization" className="page-nav-link">
                        Debt Payoff - $Amount
                    </Link> */}
                </div>
                <div>
                    <Report rows={data} cols={columns}></Report>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(DebtPayoffAmount);