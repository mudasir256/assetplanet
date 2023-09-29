import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReportModal from '../../../../components/ReportModal';
import AssistanceOutForm from './AssistanceOutForm';
import { Button } from 'antd';

class AssistanceOutModal extends Component {

    // constructor(props) {
    //     super(props);
        
    // }

    renderBody(){
        return (
            <AssistanceOutForm></AssistanceOutForm>
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
                title="Financial Assistance Sending Out"
                cbToggle={this.props.cbToggle}
                body={this.renderBody()}
                footer={this.renderFooter()}
            ></ReportModal>
        )
    }
}


export default connect()(AssistanceOutModal);