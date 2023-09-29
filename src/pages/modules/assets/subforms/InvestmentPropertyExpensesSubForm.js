import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Button, Icon } from 'antd';
import uuidv1 from 'uuid/v1';
import SubFormTable from '../../../../components/SubFormTable';
import Report from 'components/Report';
import ROLES from 'constants/roles';
import InvestmentPropertyExpensesSubFormModal from './InvestmentPropertyExpensesSubFormModal';
import {float2Currency} from 'helpers/Utils';

const formID = 'InvestmentPropertyExpensesSubForm';
class InvestmentPropertyExpensesSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Investment Property Expenses',
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
                rentalExpenses: '',
                amount: '',
                startDate: '',
                frequency: '',
                endDate: ''
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
    }

    updateFormData(newFormData){
        if(newFormData.hasOwnProperty('rows')){
            let newRows = [];
            for(var index = 0; index < newFormData['rows'].length; index++){
                newRows.push({
                    id: uuidv1(),
                    key: uuidv1(),
                    rentalExpenses: newFormData['rows'][index]['rentalExpenses'],
                    amount: newFormData['rows'][index]['amount'],
                    startDate: newFormData['rows'][index]['startDate'],
                    frequency: newFormData['rows'][index]['frequency'],
                    endDate: newFormData['rows'][index]['endDate'],
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
                rentalExpenses: this.state.report_rows[index]['rentalExpenses'],
                amount: this.state.report_rows[index]['amount'] != '' ? parseFloat(this.state.report_rows[index]['amount']) : 0,
                startDate: this.state.report_rows[index]['startDate'],
                frequency: this.state.report_rows[index]['frequency'],
                endDate: this.state.report_rows[index]['endDate'],
            })
        }
        this.props.cbUpdateSubForm(formID, InvestmentPropertyExpensesSubForm.FnCreateFormData(newFormData), true, bEnd);

        if(!bEnd){
            // this.props.cbGoSubForm("AssetPerformanceSubForm");
            this.props.cbGoNext(formID);
        }
        
    }

    goPreviousForm(){
        // this.props.cbGoSubForm("InvestmentPropertySubForm");
        this.props.cbGoPrev(formID);
    }

    fnNew(){
        this.setState({
            popupVisible: true,
            popupFormData: {
                rentalExpenses: '',
                amount: '',
                startDate: '',
                frequency: '',
                endDate: ''
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
                rentalExpenses: this.state.report_rows[delIndex]['rentalExpenses'],
                amount: this.state.report_rows[delIndex]['amount'],
                startDate: this.state.report_rows[delIndex]['startDate'],
                frequency: this.state.report_rows[delIndex]['frequency'],
                endDate: this.state.report_rows[delIndex]['endDate']
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
                rentalExpenses: formData['rentalExpenses'],
                amount: formData['amount'],
                startDate: formData['startDate'],
                frequency: formData['frequency'],
                endDate: formData['endDate']
            });
        }
        else{
            let index= 0;
            for(index = 0; index < report_rows.length; index++){
                if(report_rows[index]['id'] == formData.id){
                    break;
                }
            }

            report_rows[index]['rentalExpenses'] = formData['rentalExpenses'];
            report_rows[index]['amount'] = formData['amount'];
            report_rows[index]['startDate'] = formData['startDate'];
            report_rows[index]['frequency'] = formData['frequency'];
            report_rows[index]['endDate'] = formData['endDate'];
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
        const rental_expenses = [
            'Accounting/Bookkeeping Fees', 'Advertising/Marketing', 'Broker Fees', 'Budget for Future'
        ]

        const frequncies = [
            'Annually', 'Bi-Monthly', 'Bi-Weekly', 'Monthly'
        ]

        const report_cols = [
            {
                title: 'Rental Expenses',
                dataIndex: 'rentalExpenses',
                key: 'rentalExpenses'
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                key: 'amount',
                render: (record) => {
                    return float2Currency(record)
                }
            },
            {
                title: 'Start Date',
                dataIndex: 'startDate',
                key: 'startDate'
            },           
            {
                title: 'Frequency',
                dataIndex: 'frequency',
                key: 'frequency'
            },
            {
                title: 'End Date',
                dataIndex: 'endDate',
                key: 'endDate'
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
                <h2 className="text-center font-weight-bold">Investment Property Expenses</h2>
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
                <div className="row justify-content-between mt-4">
                    <div className="col-8">
                        <Button type="primary" size={'large'} onClick={() => this.goPreviousForm()}>
                            <Icon type="left" />
                            Previous
                        </Button>
                    </div>
                    <div className="col-4 d-flex justify-content-end">
                        <Button type="primary" disabled={ !this.state.enableNext } size={'large'} onClick={() => this.goNextForm()}>
                            Next
                            <Icon type="right" />
                        </Button>
                    </div>
                </div>
                {
                    this.state.popupVisible &&
                    <InvestmentPropertyExpensesSubFormModal
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

const mapStateToProps = (state) => {
    return {
        user: state.rootReducer.loginUser.loginUserData

    }
}
export default connect(mapStateToProps, null)(InvestmentPropertyExpensesSubForm);