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

class EmailsToSendView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEdit: false
        }
    }

    render() {
        const viewDetailsData = [
            {
                label: 'Email Templates Nickname',
                value: 'Frank Jones'
            },
            {
                'label': 'Relationship',
                'value': 'Family'
            },
            {
                label: 'Subject of Email',
                value: 'Lawsuit against Jacoby and Meyers',
                span: 4
            },
            {
                'label': 'To',
                'value': 'James@msn.com'
            },
            {
                'label': 'CC',
                'value': 'James@msn.com'
            },
            {
                'label': 'Body of Email',
                'value': 'Dear James, I have left a personal video message that I would like to share with you by clicking here.',
                span: 4
            },
        ];
        
        return (
          <div className='pageWrapper'>
            <Row>
              <Col span={19} className='px-3'>
                <PageTitle title='Emails to Send' />
                <Row type='flex' justify='center' style={{ margin: '12px 0 30px' }}>
                  <img src={Logo} alt='' style={{ height: '130px' }} />
                </Row>
                <Row style={{ margin: '10px 0 0' }}>
                  <InfoList column={2} data={viewDetailsData} />
                </Row>
                <ActionBar next='/contact_list_view' prev='/audio_video_message_view' />
              </Col>
              <Col span={5}>
                <Sidebar />
              </Col>
            </Row>
          </div>
        );
    }
}


export default EmailsToSendView;