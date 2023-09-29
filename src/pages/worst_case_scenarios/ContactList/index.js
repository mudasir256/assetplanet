import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/* *** Antd Components *** */
import { Row, Button, Drawer, Modal, Col } from 'antd';

/* *** Custom Components *** */
import PageTitle from '../../../components/layout/PageTitle';
import TableReportWithCheckbox from '../../../components/layout/TableReport';
import InfoList from '../../../components/InfoList';
import Sidebar from '../Sidebar';
import AddContactListForm from './Add/modals/Form';
import ActionBar from '../../worst_case_scenarios/view/ActionBar';

const { confirm } = Modal;

class ContactList extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isEdit: false,
        isAdd: false
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
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend']
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        sorter: (a, b) => a.phone.length - b.phone.length,
        sortDirections: ['descend']
      },
      {
        title: 'Alternate Phone',
        dataIndex: 'alternate_phone',
        key: 'alternate_phone',
        sorter: (a, b) => a.alternate_phone.length - b.alternate_phone.length,
        sortDirections: ['descend']
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        sorter: (a, b) => a.email.length - b.email.length,
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
        title: 'Profession',
        dataIndex: 'profession',
        key: 'profession',
        sorter: (a, b) => a.profession.length - b.profession.length,
        sortDirections: ['descend']
      },
      {
        title: 'Notes',
        dataIndex: 'notes',
        key: 'notes',
        sorter: (a, b) => a.notes.length - b.notes.length,
        sortDirections: ['descend']
      }
    ];

    const rows = [
      {
        key: '1',
        name: 'Steve Norris',
        phone: '+1 805-623-6655',
        alternate_phone: '-',
        email: 'Steve@msn.com',
        relationship: 'Professional',
        profession: 'Lawyer - Divorce',
        notes: '-'
      },
      {
        key: '2',
        name: 'Steve Norris',
        phone: '+1 805-623-6655',
        alternate_phone: '-',
        email: 'Steve@msn.com',
        relationship: 'Professional',
        profession: 'Lawyer - Divorce',
        notes: '-'
      }
    ];

    const viewDetailsData = [
      {
        label: 'Phone',
        value: '+1 805-623-6655'
      },
      {
        label: 'Alternate Phone',
        value: '-'
      },
      {
        label: 'Email',
        value: 'Steve@msn.com'
      },
      {
        label: 'Notes',
        value: 'Complete'
      },
      {
        label: 'Client',
        value: 'Frank Jones'
      },
      {
        label: 'Financial Adviser',
        value: 'adam@goto-financial.com'
      },
      {
        label: 'Part of My Professional Team',
        value: '-'
      },
      {
        label: 'Relationship',
        value: 'Professional'
      },
      {
        label: 'Address',
        value: '951 Main St, Anytown, CA, 90210, United States'
      },
      {
        label: 'Company',
        value: 'Norris and Co.'
      },
      {
        label: 'Name',
        value: 'Steve Norris'
      },
      {
        label: 'Profession',
        value: 'Lawyer - Divorce'
      }
    ];

    return (
      <div className='pageWrapper'>
        <Row>
          <Col span={19} className='px-3'>
            <PageTitle title='Client Contacts' className='transparent' />
            <Row type='flex' justify='end' style={{ margin: '50px 0 20px' }}>
              <Button type='primary' size='large' onClick={this.onOpenAddModal}>
                Add
              </Button>
            </Row>
            <TableReportWithCheckbox title='' rows={rows} cols={cols} scroll={{ x: 1300 }} />
            <Drawer
              width={800}
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
          title='Contacts List'
          visible={this.state.isAdd}
          onCancel={this.onCloseAddModal}
          footer={false}
        >
          <AddContactListForm />
        </Modal>
      </div>
    );
  }
}


export default ContactList;