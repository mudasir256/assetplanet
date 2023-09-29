import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/* *** Antd Components *** */
import { Row, Button, Drawer, Modal, Col } from 'antd';

/* *** Custom Components *** */
import PageTitle from '../../../components/layout/PageTitle';
import TableReportWithCheckbox from '../../../components/layout/TableReport';
import InfoList from '../../../components/InfoList';
import Sidebar from '../Sidebar';
import AddPersonalInstructionsForm from './Add/modals/Form';
import ActionBar from '../../worst_case_scenarios/view/ActionBar';

const { confirm } = Modal;

class PersonalInstructions extends Component {
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
        title: 'Clients',
        dataIndex: 'clients',
        key: 'clients',
        sorter: (a, b) => a.clients.length - b.clients.length,
        sortDirections: ['descend']
      },
      {
        title: 'Personal Instructions',
        dataIndex: 'personal_instructions',
        key: 'personal_instructions',
        sorter: (a, b) => a.personal_instructions.length - b.personal_instructions.length,
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
        title: 'Financial Adviser',
        dataIndex: 'financial_adviser',
        key: 'financial_adviser',
        sorter: (a, b) => a.financial_adviser.length - b.financial_adviser.length,
        sortDirections: ['descend']
      }
    ];

    const rows = [
      {
        key: '1',
        clients: 'Will',
        personal_instructions: 'Please follow all instructions listed in the Asset Planet Estate Module.',
        file_upload: '',
        financial_adviser: 'adam@goto-financial.com'
      }
    ];

    const viewDetailsData = [
      {
        label: 'Clients',
        value: 'will'
      },
      {
        label: 'Personal Instructions',
        value: 'Please follow all instructions listed in the Asset Planet Estate Module.'
      },
      {
        label: 'File upload',
        value: ''
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
            <PageTitle title='All Personal Instructions' className='transparent' />
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
                <ActionBar next='/list_of_large_bills' prev='/important_documents' />
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
          title='Personal Instructions'
          visible={this.state.isAdd}
          onCancel={this.onCloseAddModal}
          footer={false}
        >
          <AddPersonalInstructionsForm />
        </Modal>
      </div>
    );
  }
}


export default PersonalInstructions;