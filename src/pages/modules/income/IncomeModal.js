import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReportModal from '../../../components/ReportModal';
import { Button } from 'antd';
import IncomeForm from './IncomeForm';

class IncomeModal extends Component {

    constructor(props) {
        super(props);
        
    }

    renderBody(){
        return (
            <IncomeForm></IncomeForm>
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
                width="80vw"
                isOpen={this.props.isOpen}
                title="Income"
                cbToggle={this.props.cbToggle}
                body={this.renderBody()}
                footer={this.renderFooter()}
            ></ReportModal>
        )
    }
}


export default connect()(IncomeModal);