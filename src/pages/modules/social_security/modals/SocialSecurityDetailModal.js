import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReportModal from '../../../../components/ReportModal';
import { Select, Button, Row, Col } from 'antd';
import SocialSecurityDetailForm from './SocialSecurityDetailForm';

const { Option } = Select;

class SocialSecurityDetailModal extends Component {

    constructor(props) {
        super(props);
        
    }

    renderBody(){
        return (
            <SocialSecurityDetailForm></SocialSecurityDetailForm>
        )
    }

    renderFooter(){
        return (
            <div>
                <Button type="primary">Submit</Button>
                <Button>Reset</Button>
            </div>
        )
    }

    render() {
        
        return (
            <ReportModal
                width="50vw"
                isOpen={this.props.isOpen}
                title="Social Security"
                cbToggle={this.props.cbToggle}
                body={this.renderBody()}
                footer={this.renderFooter()}
            ></ReportModal>
        )
    }
}


export default connect()(SocialSecurityDetailModal);