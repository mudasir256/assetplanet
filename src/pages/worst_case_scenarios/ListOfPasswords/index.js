import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/* *** Antd Components *** */
import { Row, Col, Button, Drawer, Modal } from 'antd';

/* *** Custom Components *** */
import PageTitle from '../../../components/layout/PageTitle';
import TableReportWithCheckbox from '../../../components/layout/TableReport';
import InfoList from '../../../components/InfoList';
import Sidebar from '../Sidebar';
import AddListOfPasswordsForm from './Add/modals/Form';
import ActionBar from '../../worst_case_scenarios/view/ActionBar';

const { confirm } = Modal;

class ListOfPasswords extends Component {
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
        title: 'Password Location',
        dataIndex: 'password_location',
        key: 'password_location',
        sorter: (a, b) => a.password_location.length - b.password_location.length,
        sortDirections: ['descend']
      },
      {
        title: 'Password For',
        dataIndex: 'password_for',
        key: 'password_for',
        sorter: (a, b) => a.password_for.length - b.password_for.length,
        sortDirections: ['descend']
      },
      {
        title: 'Password Hint',
        dataIndex: 'password_hint',
        key: 'password_hint',
        sorter: (a, b) => a.password_hint.length - b.password_hint.length,
        sortDirections: ['descend']
      },
      {
        title: 'Type of Password',
        dataIndex: 'type_of_password',
        key: 'type_of_password',
        sorter: (a, b) => a.type_of_password.length - b.type_of_password.length,
        sortDirections: ['descend']
      },
      {
        title: 'Password Manager URL',
        dataIndex: 'password_manager_url',
        key: 'password_manager_url',
        sorter: (a, b) => a.password_manager_url.length - b.password_manager_url.length,
        sortDirections: ['descend']
      },
      {
        title: 'File upload',
        dataIndex: 'file_upload',
        key: 'file_upload',
        sorter: (a, b) => a.file_upload.length - b.file_upload.length,
        sortDirections: ['descend']
      },
      {
        title: 'File upload 2',
        dataIndex: 'file_upload_2',
        key: 'file_upload_2',
        sorter: (a, b) => a.file_upload_2.length - b.file_upload_2.length,
        sortDirections: ['descend']
      }
    ];

    const rows = [
      {
        key: '1',
        document_type: 'Will',
        password_location: 'My Will',
        password_hint: 'HINT',
        type_of_password: 'Digital',
        password_manager_url: '-',
        file_upload: 'All_Me_Passwords_Matey.xlsx',
        file_upload_2: '-'
      }
    ];

    const viewDetailsData = [
      {
        label: 'Password Location',
        value: 'View the uploaded file'
      },
      {
        label: 'Password For',
        value: 'Everything'
      },
      {
        label: 'Password Hint',
        value: 'HINT'
      },
      {
        label: 'Type of Password',
        value: 'Digital'
      },
      {
        label: 'Password Manager URL',
        value: '-'
      },
      {
        label: 'File upload',
        value: 'All_Me_Passwords_Matey.xlsx'
      },
      {
        label: 'File upload 2',
        value: '-'
      },
      {
        label: 'Financial adviser',
        value: 'adam@goto-financial.com'
      }
    ];

    return (
      <div className='pageWrapper'>
        <Row>
          <Col span={19} className='px-3'>
            <PageTitle title='List of passwords Report' className='transparent' />
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
            <Row className='pt-3'>
              <Col>
                <ActionBar next='/location_of_personal_items' prev='/litigation_lists' />
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
          title='List of Passwords'
          visible={this.state.isAdd}
          onCancel={this.onCloseAddModal}
          footer={false}
        >
          <AddListOfPasswordsForm />
        </Modal>
      </div>
    );
  }
}


export default ListOfPasswords;