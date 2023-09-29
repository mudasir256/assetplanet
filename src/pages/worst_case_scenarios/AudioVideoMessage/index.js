import React, { Component } from 'react';

/* *** Antd Components *** */
import { Row, Col } from 'antd';
/**
 * Custom Components
 */
import PageTitle from '../../../components/layout/PageTitle';
import ActionBar from '../../worst_case_scenarios/view/ActionBar';
import AddAudioVideoMessageForm from './Add/modals/Form';
import Sidebar from '../Sidebar';

class AddAudioVideoMessage extends Component {

    render() {
        return (
          <div className='pageWrapper'>
            <Row>
              <Col span={19} className='px-3'>
                <PageTitle title='Audio/Video Message' className='transparent' />
                <AddAudioVideoMessageForm />
                <Row>
                  <Col className='px-3'>
                    <ActionBar next='/emails_to_send' prev='/executor_trustee_start' />
                  </Col>
                </Row>
              </Col>
              <Col span={5}>
                <Sidebar />
              </Col>
            </Row>
          </div>
        );
    }
}


export default AddAudioVideoMessage;