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

class CheckListView extends Component {
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
                'label': 'Contact List',
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
                'label': 'List of Passwords	',
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
        ];
        
        return (
            <div className="pageWrapper">
                <Row>
                    <Col span={19} className="px-3">
                        <PageTitle title="Check List Report" />
                        <Row type="flex" justify="center" style={{ margin: '12px 0 30px' }}>
                            <img src={Logo} alt="" style={{ height : '130px' }} /> 
                        </Row>
                        <Row style={{ margin: '10px 0 0' }}>
                            <InfoList column={2} data={viewDetailsData} />
                        </Row>
                        <ActionBar next="/contact_list_view" prev="/audio_video_message_view" />
                    </Col>
                    <Col span={5}>
                        <Sidebar />
                    </Col>
                </Row>
            </div>
        )
    }
}


export default CheckListView;