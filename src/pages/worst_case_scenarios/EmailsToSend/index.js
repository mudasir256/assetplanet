import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/* *** Antd Components *** */
import { Row, Button, Drawer, Modal, Col } from 'antd';

/* *** Custom Components *** */
import PageTitle from '../../../components/layout/PageTitle';
import TableReportWithCheckbox from '../../../components/layout/TableReport';
import InfoList from '../../../components/InfoList';
import Sidebar from '../Sidebar';
import ActionBar from '../../worst_case_scenarios/view/ActionBar';
import AddEmailsToSendForm from './Add/modals/Form';

const { confirm } = Modal;

class EmailsToSend extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEdit: false
    };
  }

  onActionClick = () => {
    const { isEdit } = this.state;
    this.setState({
      isEdit: !isEdit
    });
  };

  onActionClose = () => {
    const { isEdit } = this.state;
    this.setState({
      isEdit: !isEdit
    });
  };

  onOpenAddModal = () => {
    const { isAdd } = this.state;
    this.setState({
      isAdd: !isAdd
    });
  };

  onCloseAddModal = () => {
    const { isAdd } = this.state;
    this.setState({
      isAdd: !isAdd
    });
  };

  showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure you want to delete the selected 1 record ?',
      content: '',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  };

  render() {
    const cols = [
      {
        title: 'Actions',
        key: 'operation',
        fixed: 'left',
        width: 130,
        render: () => <Button icon='copy'>Duplicate</Button>
      },
      {
        title: 'Email Templates Nickname',
        dataIndex: 'email_templates_nickname',
        key: 'email_templates_nickname',
        sorter: (a, b) => a.email_templates_nickname.length - b.email_templates_nickname.length,
        sortDirections: ['descend']
      },
      {
        title: 'Relationship',
        dataIndex: 'relationship',
        key: 'relationship',
        sorter: (a, b) => a.relationship.length - b.relationship.length,
        sortDirections: ['descend']
      },
      {
        title: 'Subject of Email',
        dataIndex: 'subject_of_email',
        key: 'subject_of_email',
        sorter: (a, b) => a.subject_of_email.length - b.subject_of_email.length,
        sortDirections: ['descend']
      },
      {
        title: 'To',
        dataIndex: 'to',
        key: 'to',
        sorter: (a, b) => a.to.length - b.to.length,
        sortDirections: ['descend']
      },
      {
        title: 'CC',
        dataIndex: 'cc',
        key: 'cc',
        sorter: (a, b) => a.cc.length - b.cc.length,
        sortDirections: ['descend']
      },
      {
        title: 'Body of Email',
        dataIndex: 'body_of_email',
        key: 'body_of_email',
        sorter: (a, b) => a.body_of_email.length - b.body_of_email.length,
        sortDirections: ['descend']
      },
      {
        title: 'Send History - Click for Details',
        key: 'email_templates',
        fixed: 'right',
        width: 100,
        render: () => (
          <a href='/'>
            <Button type='link'>Email Template</Button>
          </a>
        )
      }
    ];

    const rows = [
      {
        key: '1',
        email_templates_nickname: 'Lawsuit against Jacoby and Meyers',
        relationship: 'Family',
        subject_of_email: '$ 250,000.00',
        litigation_notes: 'Suing for various reasons',
        body_of_email:
          'Dear James, I have left a personal video message that I would like to share with you by clicking here.',
        to: 'James@msn.com',
        cc: 'James@msn.com'
      }
    ];

    const viewDetailsData = [
      {
        label: 'Email Templates Nickname',
        value: 'Frank Jones'
      },
      {
        label: 'Relationship',
        value: 'Family'
      },
      {
        label: 'Subject of Email',
        value: 'Lawsuit against Jacoby and Meyers'
      },
      {
        label: 'To',
        value: 'James@msn.com'
      },
      {
        label: 'CC',
        value: 'James@msn.com'
      },
      {
        label: 'Body of Email',
        value: 'Dear James, I have left a personal video message that I would like to share with you by clicking here.'
      }
    ];

    return (
      <div className='pageWrapper'>
        <Row>
          <Col span={19} className='px-3'>
            <PageTitle title='Emails to Send' className='transparent' />
            <Row type='flex' justify='end' style={{ margin: '50px 0 20px' }}>
              <Button type='primary' size='large' onClick={this.onOpenAddModal}>
                Add
              </Button>
            </Row>
            <TableReportWithCheckbox title='' rows={rows} cols={cols} scroll={{ x: 1300 }} />
            <Drawer
              width={600}
              title='View Details'
              placement='right'
              onClose={this.onActionClose}
              visible={this.state.isEdit}
            >
              <Row type='flex' justify='end' style={{ marginBottom: 20 }}>
                <Button type='primary' icon='edit' theme='filled' style={{ margin: '0 5px' }}>
                  Edit
                </Button>
                <Button icon='copy' theme='filled' style={{ margin: '0 5px' }}>
                  Duplicate
                </Button>
                <Button icon='printer' theme='filled' style={{ margin: '0 5px' }}>
                  Print
                </Button>
                <Button
                  type='danger'
                  icon='delete'
                  theme='filled'
                  style={{ margin: '0 5px' }}
                  onClick={this.showDeleteConfirm}
                >
                  Delete
                </Button>
              </Row>
              <InfoList column={1} data={viewDetailsData} />
            </Drawer>
            <Row className="pt-3">
              <Col>
                <ActionBar next='/contact_list' prev='/audio_video_message' />
              </Col>
            </Row>
          </Col>
          <Col span={5}>
            <Sidebar />
          </Col>
        </Row>

        {/* Add Modal */}
        <Modal
          width={991}
          title='Email Templates'
          visible={this.state.isAdd}
          onCancel={this.onCloseAddModal}
          footer={false}
        >
          <AddEmailsToSendForm />
        </Modal>
      </div>
    );
  }
}


export default EmailsToSend;