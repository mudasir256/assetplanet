import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, Button, Icon, Divider, Typography } from 'antd';
  
const { Title } = Typography;

class AddAudioVideoMessage extends Component {
    render() {
        return (
          <div className='form-wrapper'>
            <Form>
              <Row gutter={24} type='flex' align='middle'>
                <Col span={10} offset={3}>
                  <Form.Item label='If I Am Incapacitated' justify=''>
                    <Button style={{ width: 200 }}>
                      <Icon type='upload' /> Click to Upload
                    </Button>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <iframe
                    title='Personal Instructions'
                    src='https://www.youtube.com/embed/op7LC2LECn4?rel=0'
                    style={{ width: '100%', height: 200 }}
                  />
                  <Title level={4} style={{ textAlign: 'center' }}>
                    file-name.mov
                  </Title>
                </Col>
              </Row>
              <Row>
                <Col span={16} offset={4}>
                  <Divider style={{ background: '#222222' }} />
                </Col>
              </Row>
              <Row gutter={24} type='flex' align='middle'>
                <Col span={10} offset={3}>
                  <Form.Item label='If I Die - Spouse/Partner' justify=''>
                    <Button style={{ width: 200 }}>
                      <Icon type='upload' /> Click to Upload
                    </Button>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <iframe
                    title='Personal Instructions'
                    src='https://www.youtube.com/embed/op7LC2LECn4?rel=0'
                    style={{ width: '100%', height: 200 }}
                  />
                  <Title level={4} style={{ textAlign: 'center' }}>
                    file-name.mov
                  </Title>
                </Col>
              </Row>
              <Row>
                <Col span={16} offset={4}>
                  <Divider style={{ background: '#222222' }} />
                </Col>
              </Row>
              <Row gutter={24} type='flex' align='middle'>
                <Col span={10} offset={3}>
                  <Form.Item label='If I Die - Family' justify=''>
                    <Button style={{ width: 200 }}>
                      <Icon type='upload' /> Click to Upload
                    </Button>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <iframe
                    title='Personal Instructions'
                    src='https://www.youtube.com/embed/op7LC2LECn4?rel=0'
                    style={{ width: '100%', height: 200 }}
                  />
                  <Title level={4} style={{ textAlign: 'center' }}>
                    file-name.mov
                  </Title>
                </Col>
              </Row>
              <Row>
                <Col span={16} offset={4}>
                  <Divider style={{ background: '#222222' }} />
                </Col>
              </Row>
              <Row gutter={24} type='flex' align='middle'>
                <Col span={10} offset={3}>
                  <Form.Item label='If I Die - Friends' justify=''>
                    <Button style={{ width: 200 }}>
                      <Icon type='upload' /> Click to Upload
                    </Button>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <iframe
                    title='Personal Instructions'
                    src='https://www.youtube.com/embed/op7LC2LECn4?rel=0'
                    style={{ width: '100%', height: 200 }}
                  />
                  <Title level={4} style={{ textAlign: 'center' }}>
                    file-name.mov
                  </Title>
                </Col>
              </Row>
            </Form>
          </div>
        );
    }
}

const AddImportantDocumentForm = Form.create({ name: 'register' })(AddAudioVideoMessage);

export default connect()(AddImportantDocumentForm);