import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Tag } from 'antd';
import TransposedTable from '../../components/TransposedTable';

class AmortizationReport extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const columns = [
            {
                title: 'All balances are as of the last day of the year indicated.',
                dataIndex: 'year'
            },
            {
                title: 'Ending Balance',
                dataIndex: 'ending_balance'
            },
            {
                title: 'Principal Payment',
                dataIndex: 'principal_payment',
            },
            {
                title: 'Interest Payment',
                dataIndex: 'interest_payment',
            },
            {
                title: 'Total Liabilities and Credit',
                dataIndex: 'total_liabilities_and_credit',
            },
            {
                title: 'Total Principal Paid',
                dataIndex: 'total_principal_paid',
            },
            {
                title: 'Total Interest Paid',
                dataIndex: 'total_interest_paid',
            }
        ];
        const data = [];
        for (let i = 0; i < 6; i++) {
            data.push({
                key: i,
                year: `${2019 + i}`,
                ending_balance:  `$ ${Math.floor(10000 + Math.random() * 1000)}.00`,
                principal_payment: `$ ${Math.floor(10000 + Math.random() * 1000)}.00`,
                interest_payment: `$ ${Math.floor(20000 + Math.random() * 100000)}.00`,
                total_liabilities_and_credit: `$ ${Math.floor(10000 + Math.random() * 10000)}.00`,
                total_principal_paid: `$ ${Math.floor(1000 + Math.random() * 1000)}.00`,
                total_interest_paid: `$ ${Math.floor(10 + Math.random() * 10)}.00`,
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
                        Amortization Report Summary
                    </Link> */}
                </div>
                <div>
                    <TransposedTable rows={data} cols={columns}></TransposedTable>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(AmortizationReport);