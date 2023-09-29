import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Tag } from 'antd';
import Report from '../../components/Report';
import moment from 'moment';

class AmortizationSchedule extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const columns = [
            {
                title: 'Number of Months.',
                dataIndex: 'number_of_months'
            },
            {
                title: 'Month',
                dataIndex: 'month'
            },
            {
                title: 'Year',
                dataIndex: 'year',
            },
            {
                title: 'Beginning Balance',
                dataIndex: 'beginning_balance',
            },
            {
                title: 'Payment',
                dataIndex: 'payment',
            },
            {
                title: 'Principal',
                dataIndex: 'principal',
            },
            {
                title: 'Interest',
                dataIndex: 'interest',
            },
            {
                title: 'Cumulative Principal',
                dataIndex: 'cumulative_principal'
            },
            {
                title: 'Cumulative Interest',
                dataIndex: 'cumulative_interest'
            },
            {
                title: 'Ending Balance',
                dataIndex: 'ending_balance'
            }
        ];
        const month = ['November', ]
        const data = [];

        for (let i = 0; i < 60; i++) {
            data.push({
                key: i,
                number_of_months: `${1 + i}` ,
                month: moment('November', 'MMMM').add('month', i).format('MMMM'),
                year: moment(`November 2019`, 'MMMM YYYY').add('month', i).format('YYYY'),
                beginning_balance: `$ ${Math.floor(20000 + Math.random() * 100000)}.00`,
                payment: `$ ${Math.floor(20000 + Math.random() * 100000)}.00`,
                principal: `$ ${Math.floor(20000 + Math.random() * 100000)}.00`,
                interest: `$ ${Math.floor(20000 + Math.random() * 100000)}.00`,
                cumulative_principal: `$ ${Math.floor(20000 + Math.random() * 100000)}.00`,
                cumulative_interest: `$ ${Math.floor(20000 + Math.random() * 100000)}.00`,
                ending_balance: `$ ${Math.floor(20000 + Math.random() * 100000)}.00`
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
                    <Report rows={data} cols={columns}></Report>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(AmortizationSchedule);