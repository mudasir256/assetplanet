import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';


class ReportModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modal: false
        }

        this.fnToggleModal = this.fnToggleModal.bind(this);
    }

    componentDidMount(){
        this.setState({
            modal: this.props.isOpen
        })
    }

    componentDidUpdate(prevProps) {
        if(this.props.isOpen !== prevProps.isOpen){
            this.setState({
                modal: this.props.isOpen
            })
        }
        
    }

    fnToggleModal(){
        this.setState({
            modal: !this.state.modal
        })

        this.props.cbToggle(!this.state.modal)
    }

    render() {

        return (
            <Modal 
                width="600px"
                centered
                visible={this.state.modal}
                title={this.props.title}
                footer={this.props.footer}
                onOk={this.fnToggleModal}
                onCancel={this.fnToggleModal}
                className='styled-report-modal'
            >
                {this.props.body}
            </Modal>
        )
    }
}


export default connect()(ReportModal);