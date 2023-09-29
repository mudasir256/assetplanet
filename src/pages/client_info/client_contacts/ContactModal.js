import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReportModal from '../../../components/ReportModal';
import { Button } from 'antd';
import ContactForm from './ContactForm';

class ContactModal extends Component {

    constructor(props) {
        super(props);
        
    }

    renderBody(){
        return (
            <ContactForm></ContactForm>
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
                title="Contact"
                cbToggle={this.props.cbToggle}
                body={this.renderBody()}
                footer={this.renderFooter()}
            ></ReportModal>
        )
    }
}


export default connect()(ContactModal);