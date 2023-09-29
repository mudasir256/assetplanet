import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/* *** Antd Components *** */
import { Row, Button, Drawer, Modal, Col } from 'antd';

/* *** Custom Components *** */
import PageTitle from '../../../components/layout/PageTitle';
import TableReportWithCheckbox from '../../../components/layout/TableReport';
import InfoList from '../../../components/InfoList';
import Sidebar from '../Sidebar';
import AddPrepaidBurialExpensesForm from './Add/modals/Form';
import ActionBar from '../../worst_case_scenarios/view/ActionBar';

const { confirm } = Modal;

class PrepaidBurialExpenses extends Component {
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
        title: 'Location/Plot',
        dataIndex: 'location_plot',
        key: 'location_plot',
        sorter: (a, b) => a.location_plot.length - b.location_plot.length,
        sortDirections: ['descend']
      },
      {
        title: 'How Much Paid',
        dataIndex: 'how_much_paid',
        key: 'how_much_paid',
        sorter: (a, b) => a.how_much_paid.length - b.how_much_paid.length,
        sortDirections: ['descend']
      },
      {
        title: 'Items Paid For',
        dataIndex: 'items_paid_for',
        key: 'items_paid_for',
        sorter: (a, b) => a.items_paid_for.length - b.items_paid_for.length,
        sortDirections: ['descend']
      },
      {
        title: 'When Paid',
        dataIndex: 'when_paid',
        key: 'when_paid',
        sorter: (a, b) => a.when_paid.length - b.when_paid.length,
        sortDirections: ['descend']
      },
      {
        title: 'Director',
        dataIndex: 'director',
        key: 'director',
        sorter: (a, b) => a.director.length - b.director.length,
        sortDirections: ['descend']
      },
      {
        title: 'Phone Number',
        dataIndex: 'phone_number',
        key: 'phone_number',
        sorter: (a, b) => a.phone_number.length - b.phone_number.length,
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
        location_plot: 'Location',
        director: 'Bob',
        notes: 'These are more notes',
        items_paid_for: 'Steve@msn.com',
        phone_number: 'Professional',
        when_paid: 'Lawyer - Divorce',
        how_much_paid: '-'
      }
    ];

    const viewDetailsData = [
      {
        label: 'Clients',
        value: 'Frank Jones'
      },
      {
        label: 'Financial Adviser',
        value: 'adam@goto-financial.com'
      },
      {
        label: 'Location/Plot',
        value: 'Location'
      },
      {
        label: 'Director',
        value: 'Bob'
      },
      {
        label: 'Notes',
        value: 'These are more notes'
      },
      {
        label: 'Items Paid For',
        value: '-'
      },
      {
        label: 'Phone Number',
        value: '+18886595598'
      },
      {
        label: 'When Paid',
        value: '11/21/2019'
      },
      {
        label: 'How Much Paid',
        value: '$ 1,500.00'
      }
    ];

    return (
      <div className='pageWrapper'>
        <Row>
          <Col span={19} className='px-3'>
            <PageTitle title='Prepaid Burial Expenses Report' className='transparent' />
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
                <ActionBar prev='/location_of_personal_items' />
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
          title='Prepaid Burial Expenses'
          visible={this.state.isAdd}
          onCancel={this.onCloseAddModal}
          footer={false}
        >
          <AddPrepaidBurialExpensesForm />
        </Modal>
      </div>
    );
  }
}


export default PrepaidBurialExpenses;