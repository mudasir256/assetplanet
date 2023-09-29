import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReportModal from '../../../../components/ReportModal';
import { Select, Button, Row, Col } from 'antd';
import SocialSecurityForm from './SocialSecurityForm';

const { Option } = Select;

class SocialSecurityModal extends Component {

    constructor(props) {
        super(props);
        
    }

    renderBody(){
        return (
            <SocialSecurityForm></SocialSecurityForm>
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
                isOpen={this.props.isOpen}
                title="Social Security Form"
                cbToggle={this.props.cbToggle}
                body={this.renderBody()}
                footer={this.renderFooter()}
            ></ReportModal>
        )
    }
}


export default connect()(SocialSecurityModal);