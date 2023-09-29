import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postStepsFields, postCompletedSteps } from "../../../../redux/slices/loginSlice";
import { Button, Icon } from 'antd';
import uuidv1 from 'uuid/v1';
import ROLES from 'constants/roles';
import SubFormTable from '../../../../components/SubFormTable';
import Report from 'components/Report';
import AdjustableLoanDetailsSubFormModal from './AdjustableLoanDetailsSubFormModal';
import {float2Currency} from 'helpers/Utils';

const formID = 'AdjustableLoanDetailsSubForm';
class AdjustableLoanDetailsSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Adjustable Loan Details',
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
                adjustableLoanDetails: '',
                dateRateChange: '',
                newPercent: '',
                monthlyPaymentChanges: ''
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
        console.log("this.props.CompletedSteps4",this.props.CompletedSteps)

    }

    updateFormData(newFormData){
        console.log('updateformdata:', newFormData);
        if(newFormData.hasOwnProperty('rows')){
            let newRows = [];
            for(var index = 0; index < newFormData['rows'].length; index++){
                newRows.push({
                    id: uuidv1(),
                    key: uuidv1(),
                    adjustableLoanDetails: newFormData['rows'][index]['adjustableLoanDetails'],
                    dateRateChange: newFormData['rows'][index]['dateRateChange'],
                    newPercent: newFormData['rows'][index]['newPercent'],
                    monthlyPaymentChanges: newFormData['rows'][index]['monthlyPaymentChanges'],
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
                adjustableLoanDetails: this.state.report_rows[index]['adjustableLoanDetails'],
                dateRateChange: this.state.report_rows[index]['dateRateChange'],
                newPercent: parseInt(this.state.report_rows[index]['newPercent']),
                monthlyPaymentChanges: this.state.report_rows[index]['monthlyPaymentChanges']
            })
        }
        this.props.cbUpdateSubForm(formID, AdjustableLoanDetailsSubForm.FnCreateFormData(newFormData), true, bEnd);

        if(!bEnd){
            this.props.postCompletedSteps({
                ...this.props.CompletedSteps,
                ...this.state.report_rows,
            });
            // this.props.cbGoSubForm("AdditionalPaymentInformationSubForm");
            this.props.cbGoNext(formID);
        }
        
    }

    goPreviousForm(){
        // this.props.cbGoSubForm("LoanPaybackSubForm");
        this.props.cbGoPrev(formID);
    }

    fnNew(){
        this.setState({
            popupVisible: true,
            popupFormData: {
                adjustableLoanDetails: '',
                dateRateChange: '',
                newPercent: '',
                monthlyPaymentChanges: ''
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
                adjustableLoanDetails: this.state.report_rows[delIndex]['adjustableLoanDetails'],
                dateRateChange: this.state.report_rows[delIndex]['dateRateChange'],
                newPercent: this.state.report_rows[delIndex]['newPercent'],
                monthlyPaymentChanges: this.state.report_rows[delIndex]['monthlyPaymentChanges']
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
                adjustableLoanDetails: formData['adjustableLoanDetails'],
                dateRateChange: formData['dateRateChange'],
                newPercent: formData['newPercent'],
                monthlyPaymentChanges: formData['monthlyPaymentChanges']
            });
        }
        else{
            let index= 0;
            for(index = 0; index < report_rows.length; index++){
                if(report_rows[index]['id'] == formData.id){
                    break;
                }
            }

            report_rows[index]['adjustableLoanDetails'] = formData['adjustableLoanDetails'];
            report_rows[index]['dateRateChange'] = formData['dateRateChange'];
            report_rows[index]['newPercent'] = formData['newPercent'];
            report_rows[index]['monthlyPaymentChanges'] = formData['monthlyPaymentChanges'];
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
                title: 'Adjustable Loan Details',
                dataIndex: 'adjustableLoanDetails',
                key: 'adjustableLoanDetails'
            },
            {
                title: 'Date of Rate Change',
                dataIndex: 'dateRateChange',
                key: 'dateRateChange'
            },
            {
                title: 'New %',
                dataIndex: 'newPercent',
                key: 'newPercent',
                render: (record) => {
                    return record + ' %';
                }
            },
            {
                title: 'Monthly Payment Changes',
                dataIndex: 'monthlyPaymentChanges',
                key: 'monthlyPaymentChanges',
                render: (record) => {
                    return float2Currency(record)
                }
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
                <h2 className="text-center font-weight-bold">Adjustable Loan Details</h2>
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
                    <AdjustableLoanDetailsSubFormModal
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

export default connect(mapStateToProps, mapDispatchToProps)(AdjustableLoanDetailsSubForm);