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

class PersonalInstructionsView extends Component {
    render() {
        const viewDetailsData = [
            {
                label: 'Clients',
                value: 'will'
            },
            {
                'label': 'Personal Instructions',
                'value': 'Please follow all instructions listed in the Asset Planet Estate Module.'
            },
            {
                'label': 'File upload',
                'value': ''
            },
            {
                'label': 'Financial Adviser',
                'value': 'adam@goto-financial.com'
            }
        ];
        
        return (
            <div className="pageWrapper">
                <Row>
                    <Col span={19} className="px-3">
                        <PageTitle title="All Personal Instructions" />
                        <Row type="flex" justify="center" style={{ margin: '12px 0 30px' }}>
                            <img src={Logo} alt="" style={{ height : '130px' }} /> 
                        </Row>
                        <Row style={{ margin: '10px 0 0' }}>
                            <InfoList column={1} data={viewDetailsData} />
                        </Row>
                        <ActionBar next="/list_of_large_bills_view" prev="/important_documents_view" />
                    </Col>
                    <Col span={5}>
                        <Sidebar />
                    </Col>
                </Row>
            </div>
        )
    }
}


export default PersonalInstructionsView;