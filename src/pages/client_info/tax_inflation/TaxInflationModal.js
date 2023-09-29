import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReportModal from '../../../components/ReportModal';
import TaxInflationForm from './TaxInflationForm';
import { Button } from 'antd';

class TaxInflationModal extends Component {

    // constructor(props) {
    //     super(props);
        
    // }

    renderBody(){
        return (
            <div>
                <TaxInflationForm></TaxInflationForm>
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
                title="Tax and Inflation"
                cbToggle={this.props.cbToggle}
                body={this.renderBody()}
                footer={this.renderFooter()}
            ></ReportModal>
        )
    }
}


export default connect()(TaxInflationModal);