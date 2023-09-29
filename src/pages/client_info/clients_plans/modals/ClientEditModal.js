import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReportModal from '../../../../components/ReportModal';
import { Button } from 'antd';

import ClientForm from './ClientForm';

class ClientEditModal extends Component {

    constructor(props) {
        super(props);
        
    }

    renderBody(){
        return (
            <div>
                <ClientForm></ClientForm>
            </div>
        )
    }

    renderFooter(){
        return (
            <div>
                <Button type="primary">Submit</Button>
            </div>
        )
    }

    render() {
        
        return (
            <ReportModal
                width="80vw"
                isOpen={this.props.isOpen}
                title="Clients"
                cbToggle={this.props.cbToggle}
                body={this.renderBody()}
                footer={this.renderFooter()}
            ></ReportModal>
        )
    }
}


export default connect()(ClientEditModal);