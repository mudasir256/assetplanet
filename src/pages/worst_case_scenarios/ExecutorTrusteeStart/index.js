import React, { Component } from 'react';

/* *** Antd Components *** */
import { Row, Typography, Col } from 'antd';

/* *** Custom Components *** */
import PageTitle from '../../../components/layout/PageTitle';
import ActionBar from '../../worst_case_scenarios/view/ActionBar';
const { Text } = Typography;

const TextCommon = props => (
    <Col span={24} style={{marginBottom: 15}}>
        <Text style={{fontSize: 16}} {...props} />
    </Col>
)
class ExecutorTrusteeStart extends Component {
    render() {        
        return (
          <div className='pageWrapper'>
            <PageTitle title='Executor/Trustee Start here' className='transparent' />
            <Row type='flex' style={{ margin: '50px 0 30px', padding: '0 20px' }}>
              <TextCommon>
                On behalf of everyone at Asset Planet we extend our deepest sympathies for the difficulties you are
                facing if you are reading this introduction. This event was triggered by a recent death or incapacity by
                someone that loved or trusted you. Our client has empowered you with helping carry out their final
                wishes using this program in connection with any legal documents they have created and left behind.
              </TextCommon>
              <TextCommon>
                Each topic within this estate planning module has help features found on each page (top right side under
                the help icon). You were given a specific user access code that locked your ability to delete or make
                changes to program. You don’t have to worry over making mistakes and you can’t break anything by
                clicking or exploring. If you get lost within the program just get back here by going to the menu top
                menu bar for – Worst Case Scenarios.
              </TextCommon>
              <TextCommon>
                To ease your burden our Asset Planet client has prepared for this possibility by using our software and
                this specific module. On the left side of this screen you will see 14 different topics starting with the
                message that you are reading right now. After this topic, go to Audio/Video message as our user was
                given the opportunity to leave a voice or video message for their family, friends and loved ones and
                this is where it will be located.
              </TextCommon>
              <TextCommon>
                Following this message is your checklist that has been crafted by our user to help make this difficult
                process easier. The checklist can be electronically updated in this planner and changes will be
                reflected from any web-based browser that can access assetplanet.com. You can also print out the
                checklist if this is more convenient for you.
              </TextCommon>
              <TextCommon>
                Keep following down the list as everything has been carefully arranged and details completed as per our
                clients wishes. The final topic for Programming Status reflects the progress made by user in completing
                this module. It is possible that this may not be complete and this knowledge will help you understand
                what remains to be done based on what the user was able to finish.
              </TextCommon>
            </Row>
            <Row>
              <Col className='px-3'>
                <ActionBar next='/audio_video_message' />
              </Col>
            </Row>
          </div>
        );
    }
}


export default ExecutorTrusteeStart;