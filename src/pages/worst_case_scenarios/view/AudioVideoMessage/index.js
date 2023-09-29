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

class AudioVideoMessageView extends Component {
    render() {
        const viewDetailsData = [
            {
                label: 'Clients',
                value: 'Frank Jones',
                span: 4
            },
            {
                label: 'If I Am Incapacitated',
                value: 'video.mp4'
            },
            {
                'label': 'If I Die - Spouse/Partner',
                'value': 'Complete'
            },
            {
                'label': 'If I Die - Family',
                'value': '$ 102,000'
            },
            {
                'label': 'If I Die - Friends',
                'value': 'Complete'
            }
        ];
        
        return (
          <div className='pageWrapper'>
            <Row>
              <Col span={19} className='px-3'>
                <PageTitle title='Audio/Video Message' />
                <Row type='flex' justify='center' style={{ margin: '12px 0 30px' }}>
                  <img src={Logo} alt='' style={{ height: '130px' }} />
                </Row>
                <Row style={{ margin: '10px 0 0' }}>
                  <InfoList column={2} data={viewDetailsData} />
                </Row>
                <ActionBar prev='/summary' next='/emails_to_send_view' />
              </Col>
              <Col span={5}>
                <Sidebar />
              </Col>
            </Row>
          </div>
        );
    }
}


export default AudioVideoMessageView;