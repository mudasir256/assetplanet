import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Button, Icon } from 'antd';
import uuidv1 from 'uuid/v1';
import SubFormTable from '../../../../components/SubFormTable';

import { FREQUNCIES } from 'constants/types';
import ROLES from 'constants/roles';
import Report from 'components/Report';
import PageTitle from 'components/layout/PageTitle';
import ContributionSubFormModal from './ContributionSubFormModal';
import {float2Currency} from 'helpers/Utils';

const formID = 'ContributionSubForm';
class ContributionSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Contribution or Distribution',
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
                contribution_distribution: '',
                amount: '',
                description: '',
                startDate: '',
                endDate: '',
                orderDistribute: '',
                frequency: ''
            }
        }

        this.goNextForm = this.goNextForm.bind(this);

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
                    contribution_distribution: newFormData['rows'][index]['contributionOrDistribution'],
                    description: newFormData['rows'][index]['description'],
                    amount: newFormData['rows'][index]['amount'],
                    startDate: newFormData['rows'][index]['startDate'],
                    endDate: newFormData['rows'][index]['endDate'],
                    frequency: newFormData['rows'][index]['frequency'],
                    orderDistribute: newFormData['rows'][index]['orderToDistribute'],
                    monthlyBudget: newFormData['rows'][index]['addToMonthlyBudget'] ? 'Yes' : 'No'
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
                contributionOrDistribution: this.state.report_rows[index]['contribution_distribution'],
                description: this.state.report_rows[index]['description'],
                amount: parseInt(this.state.report_rows[index]['amount']),
                startDate: this.state.report_rows[index]['startDate'],
                endDate: this.state.report_rows[index]['endDate'],
                frequency: this.state.report_rows[index]['frequency'],
                orderToDistribute: this.state.report_rows[index]['orderDistribute'],
                // addToMonthlyBudget: '',
            })
        }
        this.props.cbUpdateSubForm(formID, ContributionSubForm.FnCreateFormData(newFormData), true, bEnd);            

        if(!bEnd){
            // this.props.cbGoSubForm("StepAdditionalAssetInformation");
            this.props.cbGoNext(formID);
        }
        
    }

    goPreviousForm(){
        // this.props.cbGoSubForm("QuestionContributionDistributionSubForm");
        this.props.cbGoPrev(formID);
    }

    fnNew(){
        this.setState({
            popupVisible: true,
            popupFormData: {
                contribution_distribution: '',
                amount: '',
                description: '',
                startDate: '',
                endDate: '',
                orderDistribute: '',
                frequency: ''
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
                contribution_distribution: this.state.report_rows[delIndex]['contribution_distribution'],
                amount: this.state.report_rows[delIndex]['amount'],
                description: this.state.report_rows[delIndex]['description'],
                startDate: this.state.report_rows[delIndex]['startDate'],
                endDate: this.state.report_rows[delIndex]['endDate'],
                orderDistribute: this.state.report_rows[delIndex]['orderDistribute'],
                frequency: this.state.report_rows[delIndex]['frequency']
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
                contribution_distribution: formData['contribution_distribution'],
                amount: formData['amount'],
                description: formData['description'],
                startDate: formData['startDate'],
                endDate: formData['endDate'],
                orderDistribute: formData['orderDistribute'],
                frequency: formData['frequency'],
            });
        }
        else{
            let index= 0;
            for(index = 0; index < report_rows.length; index++){
                if(report_rows[index]['id'] == formData.id){
                    break;
                }
            }

            report_rows[index]['contribution_distribution'] = formData['contribution_distribution'];
            report_rows[index]['amount'] = formData['amount'];
            report_rows[index]['description'] = formData['description'];
            report_rows[index]['startDate'] = formData['startDate'];
            report_rows[index]['endDate'] = formData['endDate'];
            report_rows[index]['orderDistribute'] = formData['orderDistribute'];
            report_rows[index]['frequency'] = formData['frequency'];
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
                title: 'Contribution or Distribution',
                dataIndex: 'contribution_distribution',
                key: 'contribution_distribution'
            },
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description'
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
                title: 'End Date',
                dataIndex: 'endDate',
                key: 'endDate'
            },
            {
                title: 'Frequency',
                dataIndex: 'frequency',
                key: 'frequency'
            },
            {
                title: 'Order to Distribute',
                dataIndex: 'orderDistribute',
                key: 'orderDistribute'
            },
            // {
            //     title: 'Add to Monthly Budget',
            //     dataIndex: 'monthlyBudget',
            //     key: 'monthlyBudget',
            //     fields: [
            //         {
            //             type: 'Select',
            //             name: 'monthlyBudget',
            //             placeholder: '-Select-',
            //             values: ['Yes', "No"]
            //         }
            //     ]
            // },
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
                <h2 className="text-center font-weight-bold">Contribution or Distribution</h2>
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
                    <ContributionSubFormModal
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
export default connect(mapStateToProps, null)(ContributionSubForm);