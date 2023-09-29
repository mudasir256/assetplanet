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

class ImportantDocumentsView extends Component {
    render() {
        const viewDetailsData = [
            {
                label: 'Document Name',
                value: 'will'
            },
            {
                'label': 'File upload',
                'value': ''
            },
            {
                'label': 'Notes',
                'value': ''
            },
            {
                'label': 'Storage/Location of Document',
                'value': ''
            },
            {
                'label': 'Clients',
                'value': 'Frank Jones'
            },
            {
                'label': 'Document Type',
                'value': 'will'
            },
            {
                'label': 'Financial Adviser',
                'value': 'adam@goto-financial.com'
            },
            {
                'label': 'Get Death Certificate URL',
                'value': ''
            },
            {
                'label': 'Approx. Number of Death Certs Needed',
                'value': '78'
            },
            {
                'label': 'Date Created',
                'value': '05/23/2019'
            },
            {
                'label': 'Date Last Reviewed',
                'value': '05/23/2019'
            },
            {
                'label': 'Off Not Review Doc Notification',
                'value': 'false'
            }
        ];
        
        return (
            <div className="pageWrapper">
                <Row>
                    <Col span={19} className="px-3">
                        <PageTitle title="All Important Documents" />
                        <Row type="flex" justify="center" style={{ margin: '12px 0 30px' }}>
                            <img src={Logo} alt="" style={{ height : '130px' }} /> 
                        </Row>
                        <Row style={{ margin: '10px 0 0' }}>
                            <InfoList column={2} data={viewDetailsData} />
                        </Row>
                        <ActionBar next="/personal_instructions_view" prev="/contact_list_view" />
                    </Col>
                    <Col span={5}>
                        <Sidebar />
                    </Col>
                </Row>
            </div>
        )
    }
}


export default ImportantDocumentsView;