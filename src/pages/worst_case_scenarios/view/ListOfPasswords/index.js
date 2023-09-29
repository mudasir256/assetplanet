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

class ListOfPasswordsView extends Component {
    render() {
        const viewDetailsData = [
            {
                label: 'Password Location',
                value: 'View the uploaded file'
            },
            {
                'label': 'Password For',
                'value': 'Everything'
            },
            {
                'label': 'Password Hint',
                'value': 'HINT'
            },
            {
                'label': 'Type of Password',
                'value': 'Digital'
            },
            {
                'label': 'Password Manager URL',
                'value': '-'
            },
            {
                'label': 'File upload',
                'value': 'All_Me_Passwords_Matey.xlsx'
            },
            {
                'label': 'File upload 2',
                'value': '-'
            },
            {
                'label': 'Financial adviser',
                'value': 'adam@goto-financial.com'
            }
        ];
        
        return (
            <div className="pageWrapper">
                <Row>
                    <Col span={19} className="px-3">
                        <PageTitle title="List of passwords Report" />
                        <Row type="flex" justify="center" style={{ margin: '12px 0 30px' }}>
                            <img src={Logo} alt="" style={{ height : '130px' }} /> 
                        </Row>
                        <Row style={{ margin: '10px 0 0' }}>
                            <InfoList column={2} data={viewDetailsData} />
                        </Row>
                        <ActionBar next="/location_of_personal_items_view" prev="/litigation_lists_view" />
                    </Col>
                    <Col span={5}>
                        <Sidebar />
                    </Col>
                </Row>
            </div>
        )
    }
}


export default ListOfPasswordsView;