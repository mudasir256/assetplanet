import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReportModal from '../../../../components/ReportModal';
import { Button, Alert } from 'antd';

class ClientDeleteModal extends Component {

    constructor(props) {
        super(props);
        
    }

    renderBody(){
        return (
            <div><Alert message="Are you sure want to delete this client?" type="error" showIcon /></div>
        )
    }

    renderFooter(){
        return (
            <div>
                <Button type="danger">Yes</Button>{' '}
                <Button>No</Button>
            </div>
        )
    }

    render() {
        
        return (
            <ReportModal
                isOpen={this.props.isOpen}
                title="Alert Form"
                cbToggle={this.props.cbToggle}
                body={this.renderBody()}
                footer={this.renderFooter()}
            ></ReportModal>
        )
    }
}


export default connect()(ClientDeleteModal);