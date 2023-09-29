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

class LitigationListsView extends Component {
    render() {
        const viewDetailsData = [
            {
                label: 'Clients',
                value: 'Frank Jones'
            },
            {
                label: 'Pending Litigation Nickname',
                value: 'Lawsuit against Jacoby and Meyers'
            },
            {
                'label': 'Potential $ Liability',
                'value': '$ 250,000.00'
            },
            {
                'label': 'Litigation Notes',
                'value': 'Suing for various reasons',
                span: 4
            },
            {
                'label': 'Financial Adviser',
                'value': 'adam@goto-financial.com',
                span: 4
            }
        ];
        
        return (
            <div className="pageWrapper">
                <Row>
                    <Col span={19} className="px-3">
                        <PageTitle title="All Litigation Lists" />
                        <Row type="flex" justify="center" style={{ margin: '12px 0 30px' }}>
                            <img src={Logo} alt="" style={{ height : '130px' }} /> 
                        </Row>
                        <Row style={{ margin: '10px 0 0' }}>
                            <InfoList column={2} data={viewDetailsData} />
                        </Row>
                        <ActionBar next="/list_of_passwords_view" prev="/list_of_large_bills_view" />
                    </Col>
                    <Col span={5}>
                        <Sidebar />
                    </Col>
                </Row>
            </div>
        )
    }
}


export default LitigationListsView;