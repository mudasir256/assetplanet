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

class ListOfLargeBillsView extends Component {
    render() {
        const viewDetailsData = [
            {
                label: 'Clients',
                value: 'Frank Jones'
            },
            {
                'label': 'Large Bill',
                'value': 'Property Taxes'
            },
            {
                'label': 'Dollar Amount',
                'value': '$ 5,000.00'
            },
            {
                'label': 'When Due',
                'value': '01/01/2020'
            },
            {
                'label': 'Occurrence',
                'value': 'Quarterly'
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
                        <PageTitle title="List of large bills" />
                        <Row type="flex" justify="center" style={{ margin: '12px 0 30px' }}>
                            <img src={Logo} alt="" style={{ height : '130px' }} /> 
                        </Row>
                        <Row style={{ margin: '10px 0 0' }}>
                            <InfoList column={2} data={viewDetailsData} />
                        </Row>
                        <ActionBar next="/litigation_lists_view" prev="/personal_instructions_view" />
                    </Col>
                    <Col span={5}>
                        <Sidebar />
                    </Col>
                </Row>
            </div>
        )
    }
}


export default ListOfLargeBillsView;