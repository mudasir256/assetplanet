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

class ContactListView extends Component {
    render() {
        const viewDetailsData = [
            {
                label: 'Phone',
                value: '+1 805-623-6655'
            },
            {
                'label': 'Alternate Phone',
                'value': '-'
            },
            {
                'label': 'Email',
                'value': 'Steve@msn.com'
            },
            {
                'label': 'Notes',
                'value': 'Complete'
            },
            {
                'label': 'Client',
                'value': 'Frank Jones'
            },
            {
                'label': 'Financial Adviser',
                'value': 'adam@goto-financial.com'
            },
            {
                'label': 'Part of My Professional Team',
                'value': '-'
            },
            {
                'label': 'Relationship',
                'value': 'Professional'
            },
            {
                'label': 'Address',
                'value': '951 Main St, Anytown, CA, 90210, United States'
            },
            {
                'label': 'Company',
                'value': 'Norris and Co.'
            },
            {
                'label': 'Name',
                'value': 'Steve Norris'
            },
            {
                'label': 'Profession',
                'value': 'Lawyer - Divorce'
            }
        ];
        
        return (
            <div className="pageWrapper">
                <Row>
                    <Col span={19} className="px-3">
                        <PageTitle title="Client Contacts" />
                        <Row type="flex" justify="center" style={{ margin: '12px 0 30px' }}>
                            <img src={Logo} alt="" style={{ height : '130px' }} /> 
                        </Row>
                        <Row style={{ margin: '10px 0 0' }}>
                            <InfoList column={2} data={viewDetailsData} />
                        </Row>
                        <ActionBar next="/important_documents_view" prev="/emails_to_send_view" />
                    </Col>
                    <Col span={5}>
                        <Sidebar />
                    </Col>
                </Row>
            </div>
        )
    }
}


export default ContactListView;