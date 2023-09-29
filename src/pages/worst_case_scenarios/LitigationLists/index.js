import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/* *** Antd Components *** */
import { Row, Col, Button, Drawer, Modal } from 'antd';

/* *** Custom Components *** */
import PageTitle from '../../../components/layout/PageTitle';
import TableReportWithCheckbox from '../../../components/layout/TableReport';
import InfoList from '../../../components/InfoList';
import Sidebar from '../Sidebar';
import AddLitigationListsForm from './Add/modals/Form';
import ActionBar from '../../worst_case_scenarios/view/ActionBar';

const { confirm } = Modal;

class LitigationLists extends Component {
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
        title: 'Pending Litigation Nickname',
        dataIndex: 'pending_litigation_nickname',
        key: 'pending_litigation_nickname',
        sorter: (a, b) => a.pending_litigation_nickname.length - b.pending_litigation_nickname.length,
        sortDirections: ['descend']
      },
      {
        title: 'Potential $ Liability',
        dataIndex: 'potential_liability',
        key: 'potential_liability',
        sorter: (a, b) => a.potential_liability.length - b.potential_liability.length,
        sortDirections: ['descend']
      },
      {
        title: 'Litigation Notes',
        dataIndex: 'litigation_notes',
        key: 'litigation_notes',
        sorter: (a, b) => a.litigation_notes.length - b.litigation_notes.length,
        sortDirections: ['descend']
      }
    ];

    const rows = [
      {
        key: '1',
        pending_litigation_nickname: 'Lawsuit against Jacoby and Meyers',
        potential_liability: '$ 250,000.00',
        litigation_notes: 'Suing for various reasons'
      }
    ];

    const viewDetailsData = [
      {
        label: 'Clients',
        value: 'Frank Jones'
      },
      {
        label: 'Pending Litigation Nickname',
        value: 'Lawsuit against Jacoby and Meyers'
      },
      {
        label: 'Potential $ Liability',
        value: '$ 250,000.00'
      },
      {
        label: 'Litigation Notes',
        value: 'Suing for various reasons'
      },
      {
        label: 'Financial Adviser',
        value: 'adam@goto-financial.com'
      }
    ];

    return (
      <div className='pageWrapper'>
        <Row>
          <Col span={19} className='px-3'>
            <PageTitle title='All Litigation Lists' className='transparent' />
            <Row type='flex' justify='end' style={{ margin: '50px 0 20px' }}>
              <Button type='primary' size='large' onClick={this.onOpenAddModal}>
                Add
              </Button>
            </Row>
            <TableReportWithCheckbox title='' rows={rows} cols={cols} />
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
                <ActionBar next='/list_of_passwords' prev='/list_of_large_bills' />
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
          title='Litigation List'
          visible={this.state.isAdd}
          onCancel={this.onCloseAddModal}
          footer={false}
        >
          <AddLitigationListsForm />
        </Modal>
      </div>
    );
  }
}


export default LitigationLists;