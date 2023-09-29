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

class LocationOfPersonalItemsView extends Component {
    render() {
        const viewDetailsData = [
            {
                label: 'Clients',
                value: 'Frank Jones'
            },
            {
                label: 'Personal Item Location',
                value: 'There is a fair bit of booty under the boat.',
                span: 4
            },
            {
                'label': 'Personal Item Notes',
                'value': 'Fourteen paces north, seven paces south, ten paces up, etc.',
                span: 4
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
                        <PageTitle title="Location of personal items report" />
                        <Row type="flex" justify="center" style={{ margin: '12px 0 30px' }}>
                            <img src={Logo} alt="" style={{ height : '130px' }} /> 
                        </Row>
                        <Row style={{ margin: '10px 0 0' }}>
                            <InfoList column={2} data={viewDetailsData} />
                        </Row>
                        <ActionBar next="/prepaid_burial_expenses_view" prev="/list_of_passwords_view" />
                    </Col>
                    <Col span={5}>
                        <Sidebar />
                    </Col>
                </Row>
            </div>
        )
    }
}


export default LocationOfPersonalItemsView;