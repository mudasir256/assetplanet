import React, { Component } from 'react';

/* *** Antd Components *** */
import { Table } from 'antd';

/* *** Custom Components *** */
import PageTitle from '../../../../components/layout/PageTitle';

/* *** Styles *** */
import './AssetDetails.css';

class AssetDetails extends Component {
    render() {
        const cols = [
            {
                title: 'Name of Asset',
                dataIndex: 'name_of_asset',
                key: 'name_of_asset'
            },
            {
                title: 'Account Type',
                dataIndex: 'account_type',
                key: 'account_type',
            },
            {
                title: 'Held Where',
                dataIndex: 'held_where',
                key: 'held_where',
            },
            {
                title: 'Monetary Value',
                dataIndex: 'monetary_value',
                key: 'monetary_value',
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
                title: 'Taxability',
                dataIndex: 'taxability',
                key: 'taxability',
            },
            {
                title: 'Taxability on Distribution',
                dataIndex: 'taxability_on_distribution',
                key: 'taxability_on_distribution',
            },
        ];
          
        const rows = [
            {
                key: '1',
                name_of_asset: 'Primary Home',
                account_type: 'Trust',
                held_where: 'Client',
                monetary_value: '$392,938	',
                value_as_of_date: '12/03/2018	',
                this_asset_is_liquid: 'No',
                taxability: 'Taxable',
                taxability_on_distribution: 'Capital Gains',
            },
            {
                key: '2',
                name_of_asset: 'Brokerage Account',
                account_type: 'Individual',
                held_where: 'AXA Advisors',
                monetary_value: '$117,881',
                value_as_of_date: '12/03/2018',
                this_asset_is_liquid: 'Yes',
                taxability: 'Taxable',
                taxability_on_distribution: 'Capital Gains',
            },
            {
                key: '3',
                name_of_asset: 'Primary Home',
                account_type: 'Trust',
                held_where: 'Client',
                monetary_value: '$392,938	',
                value_as_of_date: '12/03/2018	',
                this_asset_is_liquid: 'No',
                taxability: 'Taxable',
                taxability_on_distribution: 'Capital Gains',
            },
            {
                key: '4',
                name_of_asset: 'Brokerage Account',
                account_type: 'Individual',
                held_where: 'AXA Advisors',
                monetary_value: '$117,881',
                value_as_of_date: '12/03/2018',
                this_asset_is_liquid: 'Yes',
                taxability: 'Taxable',
                taxability_on_distribution: 'Capital Gains',
            },
            {
                key: '5',
                name_of_asset: 'Primary Home',
                account_type: 'Trust',
                held_where: 'Client',
                monetary_value: '$392,938	',
                value_as_of_date: '12/03/2018	',
                this_asset_is_liquid: 'No',
                taxability: 'Taxable',
                taxability_on_distribution: 'Capital Gains',
            },
            {
                key: '6',
                name_of_asset: 'Brokerage Account',
                account_type: 'Individual',
                held_where: 'AXA Advisors',
                monetary_value: '$117,881',
                value_as_of_date: '12/03/2018',
                this_asset_is_liquid: 'Yes',
                taxability: 'Taxable',
                taxability_on_distribution: 'Capital Gains',
            },
        ];

        return (
            <div className="asset-details-wrapper">
                <PageTitle title="Asset Details" level={4} />
                <Table bordered dataSource={rows} columns={cols} pagination={false}/>
            </div>
        )
    }
}


export default AssetDetails;