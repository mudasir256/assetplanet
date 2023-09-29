import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Table } from 'antd';
import ROLES from 'constants/roles';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
    QL_CLIENT_PLAN_LIST,
    QL_CLIENT_PLAN_DELETE
} from '../../../constants/queries';

import Report from '../../../components/Report';

function QLReport(props) {
    const {data, loading, error, refetch} = useQuery(QL_CLIENT_PLAN_LIST, { variables: { clientId: "1" } });

    let rows = [];
    console.log('data:', data);
    if(props.reload){
        refetch();        
    }
    if(data){
        rows = [];
        for(var index = 0; index < data['plans'].length; index++){
            rows.push(
                {
                    key: index,
                    id: data['plans'][index]['id'],
                    existing_plan_number: data['plans'][index]['number'],
                    plan_nickname: data['plans'][index]['nickname'],
                    date_plan_created: data['plans'][index]['createdAt'],
                    plan_notes: data['plans'][index]['notes'],
                }
            )
        }
        
    }
    
    return (
        <Report 
            loading={loading}
            cols={props.cols} 
            rows={rows}
            title={props.title}
            actions={props.actions}
        ></Report>
    )
}

var fnMutationClientPlanDelete = null;
var dataMutationClientPlanDelete = null;

function HiddenHook(){
    [fnMutationClientPlanDelete, { dataMutationClientPlanDelete }] = useMutation(QL_CLIENT_PLAN_DELETE);

    return (
        <React.Fragment></React.Fragment>
    )
}

class ClientsPlansReport extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            isOpenDelete: false,
            reload: true
        }

        this.fnAdd = this.fnAdd.bind(this);
        this.fnEdit = this.fnEdit.bind(this);
    }

    componentDidMount() {
    }

    fnAdd(){
        window.location.href = '/client_plan_new';
    }

    fnEdit(record){
        window.location.href = '/client_plan_new' + record.id;
    }

    fnDelete(record){
        window.localStorage.setItem('client_plan_delete_id', record.id);
        this.setState({
            isOpenDelete: !this.state.isOpenDelete
        })
    }

    confirmDelete = e => {

        let dbID = window.localStorage.getItem('client_plan_delete_id');
        if(dbID != null && dbID != ''){
            fnMutationClientPlanDelete({ variables: { id: dbID } })
            this.setState({
                reload: false,
                isOpenDelete: false
            })

            var instance = this;
            setTimeout(function(){
                instance.setState({
                    reload: true
                })
            }, 100)
        }
        else{
            this.setState({
                isOpenDelete: false,
            });
        }
    };
    
    handleCancel = e => {
        this.setState({
            isOpenDelete: false,
        });
    };

    render() {
        
        const cols = [
            {
              title: 'Existing Plan Number',
              dataIndex: 'existing_plan_number',
              key: 'existing_plan_number'
            },
            {
              title: 'Plan Nickname',
              dataIndex: 'plan_nickname',
              key: 'plan_nickname',
            },
            {
              title: 'Date Plan Created',
              dataIndex: 'date_plan_created',
              key: 'date_plan_created',
            },
            {
                title: 'Plan Notes',
                dataIndex: 'plan_notes',
                key: 'plan_notes',
            },
            {
              title: '',
              key: 'delete',
              render: (text, record) => (
                    <span><a>Delete</a></span>
              ),
            },
            {
                title: '',
                key: 'edit',
                render: (text, record) => (
                    <span><a>Edit</a></span>
                ),
              },
        ];
          
        const rows = [
            {
                key: '1',
                existing_plan_number: '1',
                plan_nickname: 'First Plan',
                date_plan_created: '07/12/2019',
            },
            {
                key: '2',
                existing_plan_number: '2',
                plan_nickname: 'Plan 2',
                date_plan_created: '07/12/2019',
            },
        ];

        var report_actions = [
            // {
            //     title: 'Add',
            //     fnClick: this.fnAdd
            // }
        ]

        const report_cols = [
            {
              title: 'Existing Plan Number',
              dataIndex: 'existing_plan_number',
              key: 'existing_plan_number'
            },
            {
              title: 'Plan Nickname',
              dataIndex: 'plan_nickname',
              key: 'plan_nickname',
            },
            {
              title: 'Date Plan Created',
              dataIndex: 'date_plan_created',
              key: 'date_plan_created',
            },
            {
                title: 'Plan Notes',
                dataIndex: 'plan_notes',
                key: 'plan_notes',
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
                            <></>                
                        )
                    }
                }
            },
        ];

        return (
            <>     
                <HiddenHook />
                <h4 className="title">Client and Spouse Plans</h4>          
                <QLReport 
                    cols={report_cols} 
                    title=""
                    actions={report_actions}
                    reload={this.state.reload}
                ></QLReport> 
                <Modal
                    title="Alert"
                    visible={this.state.isOpenDelete}
                    onOk={this.confirmDelete}
                    onCancel={this.handleCancel}
                    >
                    <p>Are you sure to delete?</p>
                </Modal>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    user: state.rootReducer.loginUser.loginUserData
        
    }
}
export default connect(mapStateToProps, null)(ClientsPlansReport);