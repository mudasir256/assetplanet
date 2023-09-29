import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/* *** Antd Components *** */
import { Row, Button, Drawer, Modal, Col } from 'antd';

/* *** Custom Components *** */
import PageTitle from '../../../components/layout/PageTitle';
import TableReport from '../../../components/layout/TableReport';
import InfoList from '../../../components/InfoList';
import Sidebar from '../Sidebar';
import AddProgressStatusesForm from './Add/modals/Form';
import ActionBar from '../../worst_case_scenarios/view/ActionBar';

const { confirm } = Modal;

class ProgressStatuses extends Component {
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
        title: 'Video Message',
        dataIndex: 'video_message',
        key: 'video_message'
      },
      {
        title: 'Date',
        dataIndex: 'video_message_date',
        key: 'video_message_date'
      },
      {
        title: 'Checklist',
        dataIndex: 'checklist',
        key: 'checklist'
      },
      {
        title: 'Date',
        dataIndex: 'checklist_date',
        key: 'checklist_date'
      },
      {
        title: 'Emails to Send',
        dataIndex: 'emails_to_send',
        key: 'emails_to_send'
      },
      {
        title: 'Important Documents',
        dataIndex: 'important_documents',
        key: 'important_documents'
      },
      {
        title: 'Date',
        dataIndex: 'important_documents_date',
        key: 'important_documents_date'
      }
    ];

    const rows = [
      {
        key: '1',
        video_message: 'Complete',
        video_message_date: 'Complete',
        checklist: 'Complete',
        checklist_date: 'Complete',
        emails_to_send: 'Complete',
        important_documents: 'Complete',
        important_documents_date: 'Complete'
      }
    ];

    const viewDetailsData = [
      {
        label: 'Client Name',
        value: 'Frank Jones',
        span: 4
      },
      {
        label: 'Video Message',
        value: 'Complete'
      },
      {
        label: 'Date',
        value: '$ 102,000'
      },
      {
        label: 'Checklist',
        value: 'Complete'
      },
      {
        label: 'Date',
        value: '$ 102,000'
      },
      {
        label: 'Emails to Send',
        value: 'Complete'
      },
      {
        label: 'Date',
        value: '$ 102,000'
      },
      {
        label: 'Important Documents',
        value: 'Complete'
      },
      {
        label: 'Date',
        value: '$ 102,000'
      },
      {
        label: 'Personal Instructions',
        value: 'Complete'
      },
      {
        label: 'Date',
        value: '$ 102,000'
      },
      {
        label: 'List of Large Bills',
        value: 'Complete'
      },
      {
        label: 'Date',
        value: '$ 102,000'
      },
      {
        label: 'Litigation List',
        value: 'Complete'
      },
      {
        label: 'Date',
        value: '$ 102,000'
      },
      {
        label: 'Location of Personal Items',
        value: 'Complete'
      },
      {
        label: 'Date',
        value: '$ 102,000'
      },
      {
        label: 'List of Passwords',
        value: 'Complete'
      },
      {
        label: 'Date',
        value: '$ 102,000'
      },
      {
        label: 'Prepaid Burial Expenses',
        value: 'Complete'
      },
      {
        label: 'Date',
        value: '$ 102,000'
      },
      {
        label: 'Contact List',
        value: 'Complete'
      },
      {
        label: 'Date',
        value: '$ 102,000'
      },
      {
        label: 'Video Message Notification off',
        value: 'false',
        span: 2
      },
      {
        label: 'Checklist Notification off',
        value: 'false',
        span: 2
      },
      {
        label: 'Contact List Notification off',
        value: 'false',
        span: 2
      },
      {
        label: 'Email To Send Notification off',
        value: 'false',
        span: 2
      },
      {
        label: 'Important Documents Notification off',
        value: 'false',
        span: 2
      },
      {
        label: 'Personal Instructions Notification off',
        value: 'false',
        span: 2
      },
      {
        label: 'Large Bill List Notification off',
        value: 'false',
        span: 2
      },
      {
        label: 'Litigation List Notification off',
        value: 'false',
        span: 2
      },
      {
        label: 'Location of Personal Items Notification off',
        value: 'false',
        span: 2
      },
      {
        label: 'List of Passwords Notification off',
        value: 'false',
        span: 2
      },
      {
        label: 'Prepaid Burial Expenses Notification off',
        value: 'false',
        span: 2
      },
      {
        label: 'Video Message Snooze Date',
        value: '',
        span: 2
      },
      {
        label: 'Checklist Snooze Date',
        value: '',
        span: 2
      },
      {
        label: 'Contact List Snooze Date',
        value: '',
        span: 2
      },
      {
        label: 'Email to Send Snooze Date',
        value: '',
        span: 2
      },
      {
        label: 'Important Documents Snooze Date',
        value: '',
        span: 2
      },
      {
        label: 'Personal Instructions Snooze Date',
        value: '',
        span: 2
      },
      {
        label: 'Large Bill Snooze Date',
        value: '',
        span: 2
      },
      {
        label: 'Litigation List Snooze Date',
        value: '',
        span: 2
      },
      {
        label: 'Location of Personal Items Snooze Date',
        value: '',
        span: 2
      },
      {
        label: 'Password List Snooze Date',
        value: '',
        span: 2
      },
      {
        label: 'Burial Expenses Snooze Date',
        value: '',
        span: 2
      },
      {
        label: 'Progress Status Type',
        value: '',
        span: 2
      }
    ];

    return (
      <div className='pageWrapper'>
        <Row>
          <Col span={19} className='px-3'>
            <PageTitle title='All Progress Statuses' className='transparent' />
            <Row type='flex' justify='end' style={{ margin: '50px 0 20px' }}>
              <Button type='primary' size='large' onClick={this.onOpenAddModal}>
                Add
              </Button>
            </Row>
            <TableReport title='' rows={rows} cols={cols} />
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
              <InfoList column={2} data={viewDetailsData} />
            </Drawer>
            <Row className='pt-3'>
              <Col>
                <ActionBar next='/important_documents' prev='/emails_to_send' />
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
          title='Progress Statuses'
          visible={this.state.isAdd}
          onCancel={this.onCloseAddModal}
          footer={false}
        >
          <AddProgressStatusesForm />
        </Modal>
      </div>
    );
  }
}


export default ProgressStatuses;