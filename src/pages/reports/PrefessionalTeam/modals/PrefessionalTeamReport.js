import React, { Component } from 'react';

/* *** Antd Components *** */
import { Table } from 'antd';

/* *** Custom Components *** */

/* *** Styles *** */
import './PrefessionalTeamReport.css';

class PrefessionalTeamReport extends Component {
    render() {
        const cols = [
            {
                title: 'Client',
                dataIndex: 'client',
                key: 'client'
            },
            {
                title: 'Financial Advisor',
                dataIndex: 'financial_advisor',
                key: 'financial_advisor',
            },
            {
                title: 'Phone',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: 'Alternate Phone',
                dataIndex: 'alternate_phone',
                key: 'alternate_phone',
            },
        ];
          
        const rows = [
            {
                key: '1',
                client: 'Primary Home',
                financial_advisor: 'Trust',
                phone: 'Client',
                alternate_phone: '$392,938	',
            },
            {
                key: '2',
                client: 'Brokerage Account',
                financial_advisor: 'Individual',
                phone: 'AXA Advisors',
                alternate_phone: '$117,881',
            },
            {
                key: '3',
                client: 'Primary Home',
                financial_advisor: 'Trust',
                phone: 'Client',
                alternate_phone: '$392,938	',
            },
            {
                key: '4',
                client: 'Brokerage Account',
                financial_advisor: 'Individual',
                phone: 'AXA Advisors',
                alternate_phone: '$117,881',
            },
            {
                key: '5',
                client: 'Primary Home',
                financial_advisor: 'Trust',
                phone: 'Client',
                alternate_phone: '$392,938	',
            },
        ];

        return (
            <div className="prefessional-team-report">
                <Table bordered dataSource={rows} columns={cols} pagination={false} />
            </div>
        )
    }
}

export default PrefessionalTeamReport;