import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReportModal from '../../../../components/ReportModal';
import { Button } from 'antd';
import PlanForm from './PlanForm';

class PlanNewModal extends Component {

    // constructor(props) {
    //     super(props);
        
    // }

    renderBody(){
        return (
            <div>
                <PlanForm></PlanForm>
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
                isOpen={this.props.isOpen}
                title="Create New Plan"
                cbToggle={this.props.cbToggle}
                body={this.renderBody()}
                footer={this.renderFooter()}
            ></ReportModal>
        )
    }
}


export default connect()(PlanNewModal);