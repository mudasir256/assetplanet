import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';
import { postStepsFields, postCompletedSteps } from "../../../../redux/slices/loginSlice";

import { Button, Icon } from 'antd';
import uuidv1 from 'uuid/v1';
import ROLES from 'constants/roles';
import SubFormTable from '../../../../components/SubFormTable';
import Report from 'components/Report';
import AdditionalPaymentInformationSubFormModal from './AdditionalPaymentInformationSubFormModal';
import {float2Currency} from 'helpers/Utils';

const formID = 'AdditionalPaymentInformationSubForm';
class AdditionalPaymentInformationSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Additional Principal Payments',
            rows: data
        }
    
        return formData;
    }

    constructor(props) {
        super(props);

        this.state = {
            enableNext: true,
            report_rows: [],
            popupVisible: false,
            popupFormData: {
                extra_payment_description: '',
                howMuch: '',
                howOften: '',
                startDate: '',
                occurrence: '',
                lastDate: ''
            }
        }

        this.goNextForm = this.goNextForm.bind(this);
        this.goPreviousForm = this.goPreviousForm.bind(this);

        this.updateFormData = this.updateFormData.bind(this);

        this.fnNew = this.fnNew.bind(this);
        this.fnEdit = this.fnEdit.bind(this);
        this.fnDelete = this.fnDelete.bind(this);

        this.doSave = this.doSave.bind(this);
        this.doCancel = this.doCancel.bind(this);
    }

    componentDidMount() {
        this.updateFormData(this.props.subFormData);
        console.log("this.props.CompletedSteps5",this.props.CompletedSteps)
    }

    updateFormData(newFormData){
        console.log('updateformdata:', newFormData);
        if(newFormData.hasOwnProperty('rows')){
            let newRows = [];
            for(var index = 0; index < newFormData['rows'].length; index++){
                newRows.push({
                    id: uuidv1(),
                    key: uuidv1(),
                    extra_payment_description: newFormData['rows'][index]['extraPrincipalPaymentDescription'],
                    howMuch: newFormData['rows'][index]['howMuch'],
                    howOften: newFormData['rows'][index]['howOften'],
                    startDate: newFormData['rows'][index]['whenWillPaymentStart'],
                    occurrence: newFormData['rows'][index]['numberOfOccurrences'],
                    lastDate: newFormData['rows'][index]['lastAdditionalPayment'],
                })
            }

            this.setState({
                report_rows: newRows
            })
        }
    }

    goNextForm(bEnd = false){
        if(!this.state.enableNext){
            return;
        }

        let newFormData = [];
        for(var index = 0; index < this.state.report_rows.length; index++){
            newFormData.push({
                extra_payment_description: this.state.report_rows[index]['extra_payment_description'],
                howMuch: parseFloat(this.state.report_rows[index]['howMuch']),
                howOften: this.state.report_rows[index]['howOften'],
                whenWillPaymentStart: this.state.report_rows[index]['startDate'],
                numberOfOccurrences: this.state.report_rows[index]['occurrence'],
                lastAdditionalPayment: this.state.report_rows[index]['lastDate']                
            })
        }
        this.props.cbUpdateSubForm(formID, AdditionalPaymentInformationSubForm.FnCreateFormData(newFormData), true, bEnd);

        if(!bEnd){
            // this.props.cbGoSubForm("EndSubForm");
            this.props.postCompletedSteps({
                ...this.props.CompletedSteps,
                ...this.state.report_rows,
            });
            this.props.cbGoNext(formID);
        }
        
    }

    goPreviousForm(){
        // this.props.cbGoSubForm("QuestionAdditionalPaymentSubForm");
        this.props.cbGoPrev(formID);
    }

    fnNew(){
        this.setState({
            popupVisible: true,
            popupFormData: {
                extra_payment_description: '',
                howMuch: '',
                howOften: '',
                startDate: '',
                occurrence: '',
                lastDate: ''
            }
        })
    }

    fnEdit(record){
        let report_rows = this.state.report_rows;
        let delIndex = 0;
        for(var index = 0; index < report_rows.length; index++){
            if(report_rows[index]['id'] == record.id){
                delIndex = index;
            }
        }

        this.setState({
            popupVisible: true,
            popupFormData: {
                id: this.state.report_rows[delIndex]['id'],
                key: this.state.report_rows[delIndex]['key'],
                extra_payment_description: this.state.report_rows[delIndex]['extra_payment_description'],
                howMuch: this.state.report_rows[delIndex]['howMuch'],
                howOften: this.state.report_rows[delIndex]['howOften'],
                startDate: this.state.report_rows[delIndex]['startDate'],
                occurrence: this.state.report_rows[delIndex]['occurrence'],
                lastDate: this.state.report_rows[delIndex]['lastDate']
            }
        })
    }

    fnDelete(record){
        let report_rows = this.state.report_rows;
        let delIndex = 0;
        for(var index = 0; index < report_rows.length; index++){
            if(report_rows[index]['id'] == record.id){
                delIndex = index;
            }
        }

        report_rows.splice(delIndex, 1);
        this.setState({
            report_rows: report_rows
        })
        
    }

    doSave(formData){
        let report_rows = this.state.report_rows;
        
        if(!formData.hasOwnProperty('id')){
            report_rows.push({
                id: uuidv1(),
                key: uuidv1(),
                extra_payment_description: formData['extra_payment_description'],
                howMuch: formData['howMuch'],
                howOften: formData['howOften'],
                startDate: formData['startDate'],
                occurrence: formData['occurrence'],
                lastDate: formData['lastDate']
            });
        }
        else{
            let index= 0;
            for(index = 0; index < report_rows.length; index++){
                if(report_rows[index]['id'] == formData.id){
                    break;
                }
            }

            report_rows[index]['extra_payment_description'] = formData['extra_payment_description'];
            report_rows[index]['howMuch'] = formData['howMuch'];
            report_rows[index]['howOften'] = formData['howOften'];
            report_rows[index]['startDate'] = formData['startDate'];
            report_rows[index]['occurrence'] = formData['occurrence'];
            report_rows[index]['lastDate'] = formData['lastDate'];
        }

        this.setState({
            popupVisible: false,
            report_rows: report_rows
        })
    }

    doCancel(){
        this.setState({
            popupVisible: false
        })
    }

    render() {

        const report_cols = [
            {
                title: 'Extra Principal Payment Description',
                dataIndex: 'extra_payment_description',
                key: 'extra_payment_description'
            },
            {
                title: 'How Much?',
                dataIndex: 'howMuch',
                key: 'howMuch',
                render: (record) => {
                    return float2Currency(record)
                }
            },
            {
                title: 'How Often',
                dataIndex: 'howOften',
                key: 'howOften'
            },
            {
                title: 'When Will Payment Start?',
                dataIndex: 'startDate',
                key: 'startDate'
            },
            {
                title: 'Number of Occurrences',
                dataIndex: 'occurrence',
                key: 'occurrence'
            },
            {
                title: 'Last Additional Payment',
                dataIndex: 'lastDate',
                key: 'lastDate'
            },
            {
                title: '',
                key: 'id',
                render: (record) => {
                    if(this.props.user.role != ROLES.VIEW_ONLY){
                        return(
                            <span>
                                <a className="report-action-btn report-action-btn--edit" onClick={() => this.fnEdit(record)}>Edit</a>
                                <a className="report-action-btn report-action-btn--delete" onClick={() => this.fnDelete(record)}>Delete</a>
                            </span>
                        )
                    }
                    else{
                        return (
                            <span>
                                <a className="report-action-btn report-action-btn--view" onClick={() => this.fnView(record)}>View</a>
                            </span>
                        )
                    }
                }
            }
        ];
          
        return (
            <React.Fragment>
                <h2 className="text-center font-weight-bold">Additional Principal Payments</h2>
                <Report 
                    loading={this.state.dbLoading}
                    cols={report_cols} 
                    rows={this.state.report_rows}
                ></Report>
                <div className="row justify-content-center mt-2">
                    <Button type="primary" size={'large'} onClick={() => this.fnNew()}>
                        Add
                    </Button>
                </div>
                <div className="row justify-content-between">
                    <div className="col-8">
                        <Button type="primary" size={'large'} onClick={() => this.goPreviousForm()}>
                            <Icon type="left" />
                            Previous
                        </Button>
                    </div>
                    <div className="col-4 d-flex justify-content-end">
                        {
                            this.props.dataID != null && 
                            <Button type="primary" size={'large'} style={{marginRight: '10px'}} onClick={() => this.goNextForm(true)}>
                                Update
                            </Button>
                        }
                        <Button type="primary" disabled={ !this.state.enableNext } size={'large'} onClick={() => this.goNextForm()}>
                            Next
                            <Icon type="right" />
                        </Button>
                    </div>
                </div>
                {
                    this.state.popupVisible &&
                    <AdditionalPaymentInformationSubFormModal
                        visible={this.state.popupVisible}
                        formData={this.state.popupFormData}
                        cbSave={this.doSave}
                        cbCancel={this.doCancel}
                    />
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
        user: state.rootReducer.loginUser.loginUserData,
        CompletedSteps: state.rootReducer.loginUser.CompletedSteps,

});
const mapDispatchToProps = { postStepsFields, postCompletedSteps };

export default connect(mapStateToProps, mapDispatchToProps)(AdditionalPaymentInformationSubForm);