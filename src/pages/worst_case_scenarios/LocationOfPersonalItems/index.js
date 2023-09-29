import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/* *** Antd Components *** */
import { Row, Col, Button, Drawer, Modal } from 'antd';

/* *** Custom Components *** */
import PageTitle from '../../../components/layout/PageTitle';
import TableReportWithCheckbox from '../../../components/layout/TableReport';
import InfoList from '../../../components/InfoList';
import Sidebar from '../Sidebar';
import AddLocationOfPersonalItemsForm from './Add/modals/Form';
import ActionBar from '../../worst_case_scenarios/view/ActionBar';

const { confirm } = Modal;

class LocationOfPersonalItems extends Component {
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
        title: 'Personal Item Location',
        dataIndex: 'personal_item_location',
        key: 'personal_item_location',
        sorter: (a, b) => a.personal_item_location.length - b.personal_item_location.length,
        sortDirections: ['descend']
      },
      {
        title: 'Personal Item Notes',
        dataIndex: 'personal_item_notes',
        key: 'personal_item_notes',
        sorter: (a, b) => a.personal_item_notes.length - b.personal_item_notes.length,
        sortDirections: ['descend']
      }
    ];

    const rows = [
      {
        key: '1',
        personal_item_location: 'There is a fair bit of booty under the boat.',
        personal_item_notes: 'Fourteen paces north, seven paces south, ten paces up, etc.',
        litigation_notes: 'Suing for various reasons'
      }
    ];

    const viewDetailsData = [
      {
        label: 'Clients',
        value: 'Frank Jones'
      },
      {
        label: 'Personal Item Location',
        value: 'There is a fair bit of booty under the boat.'
      },
      {
        label: 'Personal Item Notes',
        value: 'Fourteen paces north, seven paces south, ten paces up, etc.'
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
            <PageTitle title='Location of personal items report' className='transparent' />
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
                <ActionBar next='/prepaid_burial_expenses' prev='/list_of_passwords' />
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
          title='Location of Personal Items'
          visible={this.state.isAdd}
          onCancel={this.onCloseAddModal}
          footer={false}
        >
          <AddLocationOfPersonalItemsForm />
        </Modal>
      </div>
    );
  }
}


export default LocationOfPersonalItems;