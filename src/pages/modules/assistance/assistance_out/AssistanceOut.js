import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'antd';

import { useQuery, useMutation } from '@apollo/react-hooks';
import {
    QL_ASSISTANCE_OUT_LIST,
    QL_ASSISTANCE_OUT_DELETE
} from '../../../../constants/queries';

import Loader from '../../../../components/Loader';
import Report from '../../../../components/Report';
import AssistanceOutModal from './AssistanceOutModal';

function QLReport(props) {   
    let rows = [];

    const {data, loading, error, refetch} = useQuery(QL_ASSISTANCE_OUT_LIST);
    console.log('data:', data);
    if(props.reload){
        refetch();        
    }

    if(data){
        rows = [];
        for(var index = 0; index < data['assistanceOuts'].length; index++){
            rows.push(
                {
                    key: index,
                    id: data['assistanceOuts'][index]['id'],
                    recipient: data['assistanceOuts'][index]['recipientFirstName'] == null ? '' : data['assistanceOuts'][index]['recipientFirstName'] + " " + data['assistanceOuts'][index]['recipientLastName'] == null ? '' : data['assistanceOuts'][index]['recipientLastName'],
                    annual_gifting_amount: data['assistanceOuts'][index]['annualGiftingAmount'] == null ? '' : data['assistanceOuts'][index]['annualGiftingAmount'],
                    estimated_start_date: data['assistanceOuts'][index]['estimatedStartDate'],
                    estimated_end_date: data['assistanceOuts'][index]['estimatedEndDate'],
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

var fnMutationAssistanceOutDelete = null;
var dataMutationAssistanceOutDelete = null;

function HiddenHook(){
    [fnMutationAssistanceOutDelete, { dataMutationAssistanceOutDelete }] = useMutation(QL_ASSISTANCE_OUT_DELETE);

    return (
        <React.Fragment></React.Fragment>
    )
}

class AssistanceOut extends Component {

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
        this.props.history.push("/assistance_out_edit/" + record.id);
    }

    fnDelete(record){
        window.localStorage.setItem('assistance_out_delete_id', record.id);
        this.setState({
            isOpenDelete: !this.state.isOpenDelete
        })
    }

    confirmDelete = e => {        

        let dbID = window.localStorage.getItem('assistance_out_delete_id');
        if(dbID != null && dbID != ''){
            fnMutationAssistanceOutDelete({ variables: { id: dbID } })
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
              title: 'Annual Gifting Amount',
              dataIndex: 'annual_gifting_amount',
              key: 'annual_gifting_amount',
            },
            {
              title: 'Estimated Start Date',
              dataIndex: 'estimated_start_date',
              key: 'estimated_start_date',
            },
            {
                title: 'Estimated End Data',
                dataIndex: 'estimated_end_date',
                key: 'estimated_end_date',
            },
            {
              title: '',
              key: 'action',
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
                        title="Financial Assistance Sending Out"
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


export default connect()(AssistanceOut);