import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TransposedTable from '../../components/TransposedTable';

class AssetDistributionReport extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const columns = [
            {
                title: '',
                dataIndex: 'year'
            },
            {
                title: 'Current Value',
                dataIndex: 'current_value'
            },
            {
                title: 'Contributions To Assets',
                dataIndex: 'contribution_to_assets',
            },
            {
                title: 'Goal : ROAD TRIP',
                width: 100,
                dataIndex: 'goal_road_trip',
            },
            {
                title: 'Goal : TEST',
                dataIndex: 'goal_test',
            },
            {
                title: 'Distributions From Assets',
                dataIndex: 'distributions_from_assets',
            },
            {
                title: 'Taxed Owed',
                dataIndex: 'taxed_owed',
            },
            {
                title: 'Penalty Before 59 1/2',
                dataIndex: 'penalty',
            },
            {
                title: 'Total Cost Basis Taken',
                dataIndex: 'total_cost_basis_taken',
            },
            {
                title: 'Total Cost Basis Left',
                dataIndex: 'total_cost_basis_left',
            },
            {
                title: 'Total Realized Gains Taken',
                dataIndex: 'total_realized_gains_taken',
            },
            {
                title: 'Total Unrealized Gains Left',
                dataIndex: 'total_unrealized_gains_left',
            }
        ];
        const data = [];
        for (let i = 0; i < 50; i++) {
            data.push({
                key: i,
                year: `${2019 + i}`,
                current_value: `$ ${Math.floor(1000 + Math.random() * 1000)}.00`,
                contribution_to_assets: `$ ${Math.floor(10 + Math.random() * 10)}.00`,
                goal_road_trip: '$ 0',
                goal_test: '$ 0',
                distributions_from_assets: '$ 0',
                taxed_owed: '$ 0',
                penalty: '$ 0',
                total_cost_basis_taken: '$ 0',
                total_cost_basis_left: '$ 0',
                total_realized_gains_taken: '$ 0',
                total_unrealized_gains_left: '$ 0',
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
                    <Link to="/asset_distribution" className="page-nav-link">
                        Asset Distribution
                    </Link> */}
                </div>
                
                <div>
                    <TransposedTable rows={data} cols={columns}></TransposedTable>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(AssetDistributionReport);