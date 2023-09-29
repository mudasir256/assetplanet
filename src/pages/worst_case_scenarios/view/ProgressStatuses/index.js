import React, { Component } from 'react';

/* *** Antd Components *** */
import { Row, Col } from 'antd';

/* *** Custom Components *** */
import PageTitle from '../../../../components/layout/PageTitle';
import InfoList from '../../../../components/InfoList';
import ActionBar from '../ActionBar';
import Sidebar from '../Sidebar';

/* *** Images *** */
import Logo from '../../../../assets/images/abstract-dynamic-logo-vector.jpg'

class ProgressStatusesView extends Component {
    render() {
        const viewDetailsData = [
            {
                label: 'Client Name',
                value: 'Frank Jones',
                span: 4
            },
            {
                'label': 'Video Message',
                'value': 'Complete'
            },
            {
                'label': 'Date',
                'value': '$ 102,000'
            },
            {
                'label': 'Checklist',
                'value': 'Complete'
            },
            {
                'label': 'Date',
                'value': '$ 102,000'
            },
            {
                'label': 'Emails to Send',
                'value': 'Complete'
            },
            {
                'label': 'Date',
                'value': '$ 102,000'
            },
            {
                'label': 'Important Documents',
                'value': 'Complete'
            },
            {
                'label': 'Date',
                'value': '$ 102,000'
            },
            {
                'label': 'Personal Instructions',
                'value': 'Complete'
            },
            {
                'label': 'Date',
                'value': '$ 102,000'
            },
            {
                'label': 'List of Large Bills',
                'value': 'Complete'
            },
            {
                'label': 'Date',
                'value': '$ 102,000'
            },
            {
                'label': 'Litigation List',
                'value': 'Complete'
            },
            {
                'label': 'Date',
                'value': '$ 102,000'
            },
            {
                'label': 'Location of Personal Items',
                'value': 'Complete'
            },
            {
                'label': 'Date',
                'value': '$ 102,000'
            },
            {
                'label': 'List of Passwords',
                'value': 'Complete'
            },
            {
                'label': 'Date',
                'value': '$ 102,000'
            },
            {
                'label': 'Prepaid Burial Expenses',
                'value': 'Complete'
            },
            {
                'label': 'Date',
                'value': '$ 102,000'
            },
            {
                'label': 'Contact List',
                'value': 'Complete'
            },
            {
                'label': 'Date',
                'value': '$ 102,000'
            },
            {
                'label': 'Video Message Notification off',
                'value': 'false',
                'span': 2
            },
            {
                'label': 'Checklist Notification off',
                'value': 'false',
                'span': 2
            },
            {
                'label': 'Contact List Notification off',
                'value': 'false',
                'span': 2
            },
            {
                'label': 'Email To Send Notification off',
                'value': 'false',
                'span': 2
            },
            {
                'label': 'Important Documents Notification off',
                'value': 'false',
                'span': 2
            },
            {
                'label': 'Personal Instructions Notification off',
                'value': 'false',
                'span': 2
            },
            {
                'label': 'Large Bill List Notification off',
                'value': 'false',
                'span': 2
            },
            {
                'label': 'Litigation List Notification off',
                'value': 'false',
                'span': 2
            },
            {
                'label': 'Location of Personal Items Notification off',
                'value': 'false',
                'span': 2
            },
            {
                'label': 'List of Passwords Notification off',
                'value': 'false',
                'span': 2
            },
            {
                'label': 'Prepaid Burial Expenses Notification off',
                'value': 'false',
                'span': 2
            },
            {
                'label': 'Video Message Snooze Date',
                'value': '',
                'span': 2
            },
            {
                'label': 'Checklist Snooze Date',
                'value': '',
                'span': 2
            },
            {
                'label': 'Contact List Snooze Date',
                'value': '',
                'span': 2
            },
            {
                'label': 'Email to Send Snooze Date',
                'value': '',
                'span': 2
            },
            {
                'label': 'Important Documents Snooze Date',
                'value': '',
                'span': 2
            },
            {
                'label': 'Personal Instructions Snooze Date',
                'value': '',
                'span': 2
            },
            {
                'label': 'Large Bill Snooze Date',
                'value': '',
                'span': 2
            },
            {
                'label': 'Litigation List Snooze Date',
                'value': '',
                'span': 2
            },
            {
                'label': 'Location of Personal Items Snooze Date',
                'value': '',
                'span': 2
            },
            {
                'label': 'Password List Snooze Date',
                'value': '',
                'span': 2
            },
            {
                'label': 'Burial Expenses Snooze Date',
                'value': '',
                'span': 2
            },
            {
                'label': 'Progress Status Type',
                'value': '',
                'span': 2
            }
        ];
        
        return (
            <div className="pageWrapper">
                <Row>
                    <Col span={19} className="px-3">
                        <PageTitle title="All Progress Statuses" />
                        <Row type="flex" justify="center" style={{ margin: '12px 0 30px' }}>
                            <img src={Logo} alt="" style={{ height : '130px' }} /> 
                        </Row>
                        <Row style={{ margin: '10px 0 0' }}>
                            <InfoList column={2} data={viewDetailsData} />
                        </Row>
                        <ActionBar prev="/prepaid_burial_expenses_view" />
                    </Col>
                    <Col span={5}>
                        <Sidebar />
                    </Col>
                </Row>
            </div>
        )
    }
}


export default ProgressStatusesView;