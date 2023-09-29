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

class PrepaidBurialExpensesView extends Component {
    render() {
        const viewDetailsData = [
            {
                label: 'Clients',
                value: 'Frank Jones'
            },
            {
                'label': 'Financial Adviser',
                'value': 'adam@goto-financial.com'
            },
            {
                'label': 'Location/Plot',
                'value': 'Location'
            },
            {
                'label': 'Director',
                'value': 'Bob'
            },
            {
                'label': 'Notes',
                'value': 'These are more notes',
                span: 4
            },
            {
                'label': 'Items Paid For',
                'value': '-'
            },
            {
                'label': 'Phone Number',
                'value': '+18886595598'
            },
            {
                'label': 'When Paid',
                'value': '11/21/2019'
            },
            {
                'label': 'How Much Paid',
                'value': '$ 1,500.00'
            }
        ];
        
        return (
            <div className="pageWrapper">
                <Row>
                    <Col span={19} className="px-3">
                        <PageTitle title="Prepaid Burial Expenses Report" />
                        <Row type="flex" justify="center" style={{ margin: '12px 0 30px' }}>
                            <img src={Logo} alt="" style={{ height : '130px' }} /> 
                        </Row>
                        <Row style={{ margin: '10px 0 0' }}>
                            <InfoList column={2} data={viewDetailsData} />
                        </Row>
                        <ActionBar prev="/location_of_personal_items_view" />
                    </Col>
                    <Col span={5}>
                        <Sidebar />
                    </Col>
                </Row>
            </div>
        )
    }
}


export default PrepaidBurialExpensesView;