import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'antd';

import { useQuery, useMutation } from '@apollo/react-hooks';
import {
    QL_ASSISTANCE_IN_LIST,
    QL_ASSISTANCE_IN_DELETE
} from '../../../../constants/queries';

import Report from '../../../../components/Report';

function QLReport(props) {   
    let rows = [];

    const {data, loading, error, refetch} = useQuery(QL_ASSISTANCE_IN_LIST);
    console.log('data:', data);
    if(props.reload){
        refetch();        
    }

    if(data){
        rows = [];
        for(var index = 0; index < data['assistanceIns'].length; index++){
            rows.push(
                {
                    key: index,
                    id: data['assistanceIns'][index]['id'],
                    recipient: data['assistanceIns'][index]['personInheritingFromFirstName'] == null ? '' : data['assistanceIns'][index]['personInheritingFromFirstName'] + " " + data['assistanceIns'][index]['personInheritingFromLastName'] == null ? '' : data['assistanceIns'][index]['personInheritingFromLastName'],
                    person_providing_assistance: data['assistanceIns'][index]['personProvidingAssistanceFirstName'] == null ? '' : data['assistanceIns'][index]['personProvidingAssistanceFirstName'] + " " + data['assistanceIns'][index]['personProvidingAssistanceLastName'] == null ? '' : data['assistanceIns'][index]['personProvidingAssistanceLastName'],
                    amount_received: data['assistanceIns'][index]['amountReceived'],
                    estimated_start_date: data['assistanceIns'][index]['estimatedStartDate'],
                    estimated_end_data: '',
                    total_amount_received: '',
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

var fnMutationAssistanceInDelete = null;
var dataMutationAssistanceInDelete = null;

function HiddenHook(){
    [fnMutationAssistanceInDelete, { dataMutationAssistanceInDelete }] = useMutation(QL_ASSISTANCE_IN_DELETE);

    return (
        <React.Fragment></React.Fragment>
    )
}
class AssistanceReceived extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isOpenDelete: false,
            reload: true
        };

        this.fnAdd = this.fnAdd.bind(this);
        this.fnEdit = this.fnEdit.bind(this);
    }

    fnAdd(){
        this.props.history.push("/assistance_new");
    }

    fnEdit(record){
        this.props.history.push("/assistance_in_edit/" + record.id);
    }

    fnDelete(record){
        window.localStorage.setItem('assistance_in_delete_id', record.id);
        this.setState({
            isOpenDelete: !this.state.isOpenDelete
        })
    }

    confirmDelete = e => {        

        let dbID = window.localStorage.getItem('assistance_in_delete_id');
        if(dbID != null && dbID != ''){
            fnMutationAssistanceInDelete({ variables: { id: dbID } })
            this.setState({
                reload: false,
                isOpenDelete: false
            });

            var instance = this;

            setTimeout(function(){
                instance.setState({
                    reload: true
                })
            }, 1000);
            
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
        const navlinks = [
            {
                href: '/',
                title: 'Home'
            },
            {
                href: '/modules',
                title: 'Modules'
            },
            {
                href: '/assistance',
                title: 'Assistance'
            }
        ]

        var report_actions = [
            {
                title: 'Add',
                fnClick: this.fnAdd
            }
        ]

        const report_cols = [
            {
              title: 'Recipient',
              dataIndex: 'recipient',
              key: 'recipient'
            },
            {
              title: 'Person Providing Assistance',
              dataIndex: 'person_providing_assistance',
              key: 'person_providing_assistance',
            },
            {
              title: 'Amount Received',
              dataIndex: 'amount_received',
              key: 'amount_received',
            },
            {
                title: 'Estimated Start Date',
                dataIndex: 'estimated_start_date',
                key: 'estimated_start_date',
            },
            {
                title: 'Estimated End Data',
                dataIndex: 'estimated_end_data',
                key: 'estimated_end_data'
            },
            {
                title: 'Total Amount Received',
                dataIndex: 'total_amount_received',
                key: 'total_amount_received'
            },
            {
              title: '',
              key: 'id',
              render: (text, record) => (
                <span>
                    <a className="report-action-btn report-action-btn--edit" onClick={() => this.fnEdit(record)}>Edit</a>
                    <a className="report-action-btn report-action-btn--delete" onClick={() => this.fnDelete(record)}>Delete</a>
                </span>
              ),
            },
        ];
        
        return (
            <React.Fragment>
                <HiddenHook />
                <div className="page-nav-history">
                    {/* { 
                        navlinks.map((navlink, index) => {
                            return (
                                <span key={index}>
                                    <Link key={index} to={navlink.href} className="page-nav-link">
                                        {navlink.title}
                                    </Link>
                                    {index != (navlinks.length - 1) ? "/" : null}
                                </span>
                                
                            )                            
                        }) 
                    } */}
                </div>
                <div className="fragment-assitance-received">
                    <QLReport 
                        cols={report_cols} 
                        title="Current Assistance"
                        actions={report_actions}
                        reload={this.state.reload}
                    ></QLReport>
                    <QLReport 
                        cols={report_cols} 
                        title="Future Assistance"
                        actions={report_actions}
                        reload={this.state.reload}
                    ></QLReport>
                </div>
                <Modal
                    title="Alert"
                    visible={this.state.isOpenDelete}
                    onOk={this.confirmDelete}
                    onCancel={this.handleCancel}
                    >
                    <p>Are you sure to delete?</p>
                </Modal>
            </React.Fragment>
        )
    }
}


export default connect()(AssistanceReceived);