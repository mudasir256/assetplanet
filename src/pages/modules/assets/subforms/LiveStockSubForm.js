import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Button, Icon, Row, Col } from 'antd';
import uuidv1 from 'uuid/v1';
import SubFormTable from '../../../../components/SubFormTable';
import Report from 'components/Report';
import ROLES from 'constants/roles';
import LiveStockSubFormModal from './LiveStockSubFormModal';

const formID = "LiveStockSubForm";
class LiveStockSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Livestock',
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
                animalType: '',
                count: ''
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
                    animalType: newFormData['rows'][index]['animalType'],
                    count: newFormData['rows'][index]['count']
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
                animalType: this.state.report_rows[index]['animalType'],
                count: parseInt(this.state.report_rows[index]['count'])
            })
        }
        this.props.cbUpdateSubForm(formID, LiveStockSubForm.FnCreateFormData(newFormData), true, bEnd);            

        if(!bEnd){
            // this.props.cbGoSubForm("AssetPerformanceSubForm");
            this.props.cbGoNext(formID);
        }        
    }

    goPreviousForm(){
        // this.props.cbGoSubForm("StepQuestionContributionDistributionSubForm");
        this.props.cbGoPrev(formID);
    }

    fnNew(){
        this.setState({
            popupVisible: true,
            popupFormData: {
                animalType: '',
                count: ''
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
                animalType: this.state.report_rows[delIndex]['animalType'],
                count: this.state.report_rows[delIndex]['count'],
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
                animalType: formData['animalType'],
                count: formData['count']
            });
        }
        else{
            let index= 0;
            for(index = 0; index < report_rows.length; index++){
                if(report_rows[index]['id'] == formData.id){
                    break;
                }
            }

            report_rows[index]['animalType'] = formData['animalType'];
            report_rows[index]['count'] = formData['count'];
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
                title: 'Animal Type',
                dataIndex: 'animalType',
                key: 'animalType'
            },
            {
                title: 'Count',
                dataIndex: 'count',
                key: 'count'
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
                <h2 className="text-center font-weight-bold">Live Stock</h2>
                <div className="subform-desc">Anything living of normal marketable value not a collectible or rare item. Cattle is a prime example, pun intended</div>
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
                    <LiveStockSubFormModal
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
export default connect(mapStateToProps, null)(LiveStockSubForm);