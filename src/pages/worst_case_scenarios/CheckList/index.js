import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/* *** Antd Components *** */
import { Row, Button, Drawer, Modal, Col } from 'antd';

/* *** Custom Components *** */
import PageTitle from '../../../components/layout/PageTitle';
import TableReport from '../../../components/layout/TableReport';
import InfoList from '../../../components/InfoList';
import Sidebar from '../Sidebar';
import AddCheckListForm from './Add/modals/Form';

const { confirm } = Modal;

class CheckList extends Component {
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
        title: 'Checklist',
        dataIndex: 'checklist',
        key: 'checklist'
      },
      {
        title: 'Contact List',
        dataIndex: 'contact_list',
        key: 'contact_list'
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
        title: 'Personal Instructions',
        dataIndex: 'personal_instructions',
        key: 'personal_instructions'
      },
      {
        title: 'List of Large Bills',
        dataIndex: 'list_of_large_bills',
        key: 'list_of_large_bills'
      },
      {
        title: 'Litigation List',
        dataIndex: 'litigation_list',
        key: 'litigation_list'
      },
      {
        title: 'Location of Personal Items',
        dataIndex: 'location_of_personal_items',
        key: 'location_of_personal_items'
      },
      {
        title: 'List of Passwords',
        dataIndex: 'list_of_passwords',
        key: 'list_of_passwords'
      },
      {
        title: 'Prepaid Burial Expenses',
        dataIndex: 'prepaid_burial_expenses',
        key: 'prepaid_burial_expenses'
      }
    ];

    const rows = [
      {
        key: '1',
        video_message: 'Complete',
        checklist: 'Complete',
        contact_list: 'Complete',
        emails_to_send: 'Complete',
        important_documents: 'Complete',
        personal_instructions: 'Complete',
        list_of_large_bills: 'Complete',
        litigation_list: 'Complete',
        location_of_personal_items: 'Complete',
        list_of_passwords: 'Complete',
        prepaid_burial_expenses: 'Complete'
      },
      {
        key: '2',
        video_message: 'Complete',
        checklist: 'Complete',
        contact_list: 'Complete',
        emails_to_send: 'Complete',
        important_documents: 'Complete',
        personal_instructions: 'Complete',
        list_of_large_bills: 'Complete',
        litigation_list: 'Complete',
        location_of_personal_items: 'Complete',
        list_of_passwords: 'Complete',
        prepaid_burial_expenses: 'Complete'
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
        label: 'Contact List',
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
        label: 'List of Passwords	',
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
      }
    ];

    return (
      <div className='pageWrapper'>
        <Row>
          <Col span={19} className='px-3'>
            <PageTitle title='Check List Report' className='transparent' />
            <Row type='flex' justify='end' style={{ margin: '50px 0 20px' }}>
              <Button type='primary' size='large' onClick={this.onOpenAddModal}>
                Add
              </Button>
            </Row>
            <TableReport title='' rows={rows} cols={cols} scroll={{ x: 1500 }} />
            <Drawer
              width={720}
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
          </Col>
          <Col span={5}>
            <Sidebar />
          </Col>
        </Row>

        {/* Add Modal */}
        <Modal
          width={991}
          title='Add Check List'
          visible={this.state.isAdd}
          onCancel={this.onCloseAddModal}
          footer={false}
        >
          <AddCheckListForm />
        </Modal>
      </div>
    );
  }
}


export default CheckList;