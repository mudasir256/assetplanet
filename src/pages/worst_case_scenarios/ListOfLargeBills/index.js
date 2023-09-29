import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/* *** Antd Components *** */
import { Row, Col, Button, Drawer, Modal } from 'antd';

/* *** Custom Components *** */
import PageTitle from '../../../components/layout/PageTitle';
import TableReportWithCheckbox from '../../../components/layout/TableReport';
import InfoList from '../../../components/InfoList';
import Sidebar from '../Sidebar';
import AddListOfLargeBillsForm from './Add/modals/Form';
import ActionBar from '../../worst_case_scenarios/view/ActionBar';

const { confirm } = Modal;

class ListOfLargeBills extends Component {
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
        title: 'Large Bill',
        dataIndex: 'large_bill',
        key: 'large_bill',
        sorter: (a, b) => a.large_bill.length - b.large_bill.length,
        sortDirections: ['descend']
      },
      {
        title: 'Dollar Amount',
        dataIndex: 'dollar_amount',
        key: 'dollar_amount',
        sorter: (a, b) => a.dollar_amount.length - b.dollar_amount.length,
        sortDirections: ['descend']
      },
      {
        title: 'When Due',
        dataIndex: 'when_due',
        key: 'when_due',
        sorter: (a, b) => a.when_due.length - b.when_due.length,
        sortDirections: ['descend']
      },
      {
        title: 'Occurrence',
        dataIndex: 'occurrence',
        key: 'occurrence',
        sorter: (a, b) => a.occurrence.length - b.occurrence.length,
        sortDirections: ['descend']
      }
    ];

    const rows = [
      {
        key: '1',
        large_bill: 'Property Taxes',
        dollar_amount: '$ 12,000.00',
        when_due: '01/01/2020',
        occurrence: 'Annual'
      },
      {
        key: '2',
        large_bill: 'Property Taxes',
        dollar_amount: '$ 12,000.00',
        alternate_phone: '01/01/2020',
        occurrence: 'Annual'
      }
    ];

    const viewDetailsData = [
      {
        label: 'Clients',
        value: 'Frank Jones'
      },
      {
        label: 'Large Bill',
        value: 'Property Taxes'
      },
      {
        label: 'Dollar Amount',
        value: '$ 5,000.00'
      },
      {
        label: 'When Due',
        value: '01/01/2020'
      },
      {
        label: 'Occurrence',
        value: 'Quarterly'
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
            <PageTitle title='List of large bills' className='transparent' />
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
                <ActionBar next='/litigation_lists' prev='/personal_instructions' />
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
          title='List of Large Bills'
          visible={this.state.isAdd}
          onCancel={this.onCloseAddModal}
          footer={false}
        >
          <AddListOfLargeBillsForm />
        </Modal>
      </div>
    );
  }
}


export default ListOfLargeBills;