import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReportModal from '../../../../components/ReportModal';
import AssistanceInForm from './AssistanceInForm';
import { Button } from 'antd';

class AssistanceInModal extends Component {

    constructor(props) {
        super(props);
        
    }

    renderBody(){
        return (
            <AssistanceInForm></AssistanceInForm>
        )
    }

    renderFooter(){
        return (
            <div>
                <Button type="primary">Save</Button>{' '}
                <Button>Reset</Button>
            </div>
        )
    }

    render() {
        
        return (
            <ReportModal
                isOpen={this.props.isOpen}
                title="Assistance In"
                cbToggle={this.props.cbToggle}
                body={this.renderBody()}
                footer={this.renderFooter()}
            ></ReportModal>
        )
    }
}


export default connect()(AssistanceInModal);