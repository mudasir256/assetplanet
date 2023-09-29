import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/* *** Antd Components *** */
import { Row, Button, Drawer, Modal, Col } from 'antd';

/* *** Custom Components *** */
import PageTitle from '../../../components/layout/PageTitle';
import TableReportWithCheckbox from '../../../components/layout/TableReport';
import InfoList from '../../../components/InfoList';
import Sidebar from '../Sidebar';
import AddImportantDocumentsForm from './Add/modals/Form';
import ActionBar from '../../worst_case_scenarios/view/ActionBar';

const { confirm } = Modal;

class ImportantDocuments extends Component {
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
        title: 'Document Name',
        dataIndex: 'document_name',
        key: 'document_name',
        sorter: (a, b) => a.document_name.length - b.document_name.length,
        sortDirections: ['descend']
      },
      {
        title: 'Document Name',
        dataIndex: 'document_name',
        key: 'document_name',
        sorter: (a, b) => a.document_name.length - b.document_name.length,
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
        title: 'File Upload',
        dataIndex: 'file_upload',
        key: 'file_upload',
        sorter: (a, b) => a.file_upload.length - b.file_upload.length,
        sortDirections: ['descend']
      },
      {
        title: 'Storage/Location of Document',
        dataIndex: 'storage_location_of_document',
        key: 'storage_location_of_document',
        sorter: (a, b) => a.storage_location_of_document.length - b.storage_location_of_document.length,
        sortDirections: ['descend']
      },
      {
        title: 'Date Created',
        dataIndex: 'date_created',
        key: 'date_created',
        sorter: (a, b) => a.date_created.length - b.date_created.length,
        sortDirections: ['descend']
      },
      {
        title: 'Date Last Reviewed',
        dataIndex: 'date_last_reviewed',
        key: 'date_last_reviewed',
        sorter: (a, b) => a.date_last_reviewed.length - b.date_last_reviewed.length,
        sortDirections: ['descend']
      },
      {
        title: 'Get Death Certificate URL',
        dataIndex: 'get_death_certificate_url',
        key: 'get_death_certificate_url',
        sorter: (a, b) => a.get_death_certificate_url.length - b.get_death_certificate_url.length,
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
        document_type: 'Will',
        document_name: 'My Will',
        alternate_phone: '-',
        file_upload: '-',
        storage_location_of_document: '-',
        date_created: '05/23/2019',
        date_last_reviewed: '05/23/2019',
        get_death_certificate_url: '-',
        notes: '-'
      },
      {
        key: '2',
        document_type: 'Will',
        document_name: 'My Will',
        alternate_phone: '-',
        file_upload: '-',
        storage_location_of_document: '-',
        date_created: '05/23/2019',
        date_last_reviewed: '05/23/2019',
        get_death_certificate_url: '-',
        notes: '-'
      }
    ];

    const viewDetailsData = [
      {
        label: 'Document Name',
        value: 'will'
      },
      {
        label: 'File upload',
        value: ''
      },
      {
        label: 'Notes',
        value: ''
      },
      {
        label: 'Storage/Location of Document',
        value: ''
      },
      {
        label: 'Clients',
        value: 'Frank Jones'
      },
      {
        label: 'Document Type',
        value: 'will'
      },
      {
        label: 'Financial Adviser',
        value: 'adam@goto-financial.com'
      },
      {
        label: 'Get Death Certificate URL',
        value: ''
      },
      {
        label: 'Approx. Number of Death Certs Needed',
        value: '78'
      },
      {
        label: 'Date Created',
        value: '05/23/2019'
      },
      {
        label: 'Date Last Reviewed',
        value: '05/23/2019'
      },
      {
        label: 'Off Not Review Doc Notification',
        value: 'false'
      }
    ];

    return (
      <div className='pageWrapper'>
        <Row>
          <Col span={19} className='px-3'>
            <PageTitle title='All Important Documents' className='transparent' />
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
                <ActionBar next='/personal_instructions' prev='/emails_to_send' />
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
          title='Important Documents'
          visible={this.state.isAdd}
          onCancel={this.onCloseAddModal}
          footer={false}
        >
          <AddImportantDocumentsForm />
        </Modal>
      </div>
    );
  }
}


export default ImportantDocuments;