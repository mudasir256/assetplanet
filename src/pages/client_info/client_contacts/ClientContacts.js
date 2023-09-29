import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'antd';
import ROLES from 'constants/roles';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
    QL_CLIENT_CONTACT_LIST,
    QL_CLIENT_CONTACT_DELETE
} from '../../../constants/queries';

import Report from '../../../components/Report';
import ContactModal from './ContactModal';

import PageTitle from 'components/layout/PageTitle';
import PrefessionalTeamReport from 'pages/reports/PrefessionalTeam/modals/PrefessionalTeamReport';

function QLReport(props) {
    const {data, loading, error} = useQuery(QL_CLIENT_CONTACT_LIST);

    let rows = [];
    console.log('data:', data);
    if(data){
        rows = [];
        for(var index = 0; index < data['clientContacts'].length; index++){
            rows.push(
                {
                    key: index,
                    id: data['clientContacts'][index]['id'],
                    name: data['clientContacts'][index]['firstName'] + ' ' + data['clientContacts'][index]['lastName'],
                    phone: data['clientContacts'][index]['primaryContactNumber'],
                    alternate_phone: data['clientContacts'][index]['secondaryContactNumber'],
                    email: data['clientContacts'][index]['email'],
                    relationship: data['clientContacts'][index]['relationship'],
                    profession: data['clientContacts'][index]['profession'],
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

var fnMutationClientContactDelete = null;
var dataMutationClientContactDelete = null;

function HiddenHook(){
    [fnMutationClientContactDelete, { dataMutationClientContactDelete }] = useMutation(QL_CLIENT_CONTACT_DELETE);

    return (
        <React.Fragment></React.Fragment>
    )
}

class ClientContacts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            isOpenDelete: false,
            dbUpdated: true
        }

        this.fnAdd = this.fnAdd.bind(this);
        this.fnEdit = this.fnEdit.bind(this);
        this.fnView = this.fnView.bind(this);
    }

    fnAdd(){
        this.props.history.push("/client_contact_new");
    }

    fnEdit(record){
        this.props.history.push("/client_contact_edit/1");
    }

    fnView(record){
        this.props.history.push("/client_contact_view/1");
    }

    fnDelete(record){
        window.localStorage.setItem('client_contact_delete_id', record.id);
        this.setState({
            isOpenDelete: !this.state.isOpenDelete
        })
    }

    confirmDelete = e => {
        let dbID = window.localStorage.getItem('client_contact_delete_id');
        if(dbID != null && dbID != ''){
            fnMutationClientContactDelete({ variables: { id: dbID } })
            this.setState({
                reload: false,
                isOpenDelete: false
            })

            var instance = this;
            setTimeout(function(){
                instance.setState({
                    reload: true
                })
            }, 1000)
        }
        else {
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
            }
        ]

        var report_actions = [
            // {
            //     title: 'Edit',
            //     fnClick: this.fnEdit
            // }
        ]

        const report_cols = [
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name'
            },
            {
              title: 'Phone',
              dataIndex: 'phone',
              key: 'phone',
            },
            {
              title: 'Alternate Phone',
              dataIndex: 'alternate_phone',
              key: 'alternate_phone',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Relationship',
                dataIndex: 'relationship',
                key: 'relationship'
            },
            {
                title: 'Profession',
                dataIndex: 'profession',
                key: 'profession'
            },
            {
                title: '',
                key: 'id',
                render: (text, record) => {
                    if(this.props.user.role != ROLES.VIEW_ONLY){
                        return (
                            <span>
                                <a className="report-action-btn report-action-btn--view" onClick={() => this.fnView(record)}>View</a>
                                <a className="report-action-btn report-action-btn--edit" onClick={() => this.fnEdit(record)}>Edit</a>
                                {/* <a className="report-action-btn report-action-btn--delete" onClick={() => this.fnDelete(record)}>Delete</a> */}
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
                {
                    this.props.user.role != ROLES.VIEW_ONLY &&
                    <div className="top-btn-area">
                        <Button type="primary" className="float-right" onClick={this.fnAdd}>Add</Button>
                    </div>
                }
                <PageTitle title="Report - Prefessional Team" />
                <div style={{marginBottom: 40}}>
                    <PrefessionalTeamReport />
                </div>
                
                <div className="fragment-assitance-received">
                    <QLReport 
                        cols={report_cols} 
                        title="Client Contacts"
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

const mapStateToProps = (state) => {
    return {
        user: state.rootReducer.loginUser.loginUserData
    }
}
export default connect(mapStateToProps, null)(ClientContacts);