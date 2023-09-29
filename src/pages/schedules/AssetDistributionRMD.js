import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TransposedTable from '../../components/TransposedTable';

class AssetDistributionRMDReport extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const columns = [
            {
                title: 'Asset 1',
                dataIndex: 'year'
            },
            {
                title: 'Age of Client',
                dataIndex: 'age_of_client'
            },
            {
                title: 'Current Value',
                dataIndex: 'current_value',
            },
            {
                title: 'RMD Distributions',
                dataIndex: 'rmd_distributions',
            },
            {
                title: 'RMD Distributions Taxes Owed',
                dataIndex: 'rmd_distributions_taxes_owed',
            }
        ];
        const data = [];
        for (let i = 0; i < 50; i++) {
            data.push({
                key: i,
                year: `${2019 + i}`,
                age_of_client: `${70 + i}`,
                current_value: `$ ${Math.floor(20000 + Math.random() * 100000)}.00`,
                rmd_distributions: `$ ${Math.floor(10000 + Math.random() * 10000)}.00`,
                rmd_distributions_taxes_owed: `$ ${Math.floor(1000 + Math.random() * 1000)}.00`
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
                    <Link to="/asset_distribution_rmd" className="page-nav-link">
                        Asset Distribution with RMD
                    </Link> */}
                </div>
                <div>
                    <TransposedTable rows={data} cols={columns}></TransposedTable>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(AssetDistributionRMDReport);