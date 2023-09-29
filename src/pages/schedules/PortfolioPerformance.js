import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TransposedTable from '../../components/TransposedTable';

class PortfolioPerformance extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const columns = [
            {
                title: 'Name of Asset',
                dataIndex: 'year'
            },
            {
                title: 'Testing Asset Creation',
                dataIndex: 'goal'
            }
        ];
        const data = [];
        for (let i = 0; i < 50; i++) {
            data.push({
                key: i,
                year: `${2019 + i}`,
                goal: `$ ${Math.floor(10000 + Math.random() * 10000)}.00`,
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
                    <Link to="/portfolio_performance_of_30_years" className="page-nav-link">
                        Portfolio Performance of 30 Years
                    </Link> */}
                </div>
                
                <div>
                    <TransposedTable rows={data} cols={columns}></TransposedTable>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(PortfolioPerformance);