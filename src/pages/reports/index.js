import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { BlockLink } from '../../components/Animations';

class ClientInfo extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        
        return (
            <React.Fragment>                
                <div className="page-nav-history">
                    {/* <Link to="/" className="page-nav-link">
                        Home
                    </Link> */}
                </div>
                <div className="module-blocks">
                    <BlockLink className="module-block-link" link="/asset_item_report" title="All Items Report" />
                    <BlockLink className="module-block-link" link="/report_prefessional_team" title="Professional Team Report" />
                    <BlockLink className="module-block-link" link="/report_all_insurance_products" title="All Insurance Products" />
                    <BlockLink className="module-block-link" link="/report_asset" title="Report Asset" />
                    <BlockLink className="module-block-link" link="/budget_report" title="Budget Report" />
                    <BlockLink className="module-block-link" link="/budget_detailed" title="Budget Detailed" />
                    <BlockLink className="module-block-link" link="/add_asset" title="Add Asset" />
                    <BlockLink className="module-block-link" link="/report_general_information" title="Report - General Information" />
                    <BlockLink className="module-block-link" link="/income_report" title="Income Report" />
                    <BlockLink className="module-block-link" link="/goals_report" title="Goals Report" />
                    <BlockLink className="module-block-link" link="/insurance_report" title="Insurance Report" />
                    <BlockLink className="module-block-link" link="/liabilities_credit_report" title="Liabilities and Credit Report" />
                    <BlockLink className="module-block-link" link="/liquidity_report" title="Liquidity Report" />
                    <BlockLink className="module-block-link" link="/net_worth_report" title="Net Worth Report" />
                    <BlockLink className="module-block-link" link="/report_monthly_savings" title="Report Monthly Savings" />
                    <BlockLink className="module-block-link" link="/social_security_report" title="Social Security Report" />
                    <BlockLink className="module-block-link" link="/starting_a_business_report" title="Starting a Business Report" />
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(ClientInfo);