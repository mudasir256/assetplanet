import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ROLES from 'constants/roles';
import { Button, Row, Col } from 'antd';
import ClientInformationTable from './ClientInformationTable';
import ClientsPlansReport from './ClientsPlansReport';
import ClientAddModal from './modals/ClientAddModal';
import ClientChangeModal from './modals/ClientChangeModal';
import ClientEditModal from './modals/ClientEditModal';
import ClientDeleteModal from './modals/ClientDeleteModal';

import PlanNewModal from './modals/PlanNewModal';
import PlanChangeModal from './modals/PlanChangeModal';
import PlanCompareModal from './modals/PlanCompareModal';

import { useQuery } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';

import { gql } from 'apollo-boost';

import {
    QL_CLIENT_LIST
} from '../../../constants/queries';

const MODAL = {
    QL_CLIENT_LIST: 'client_add',
    CLIENT_CHANGE: 'client_change',
    CLIENT_EDIT: 'client_edit',
    CLIENT_DELETE: 'client_delete',

    PLAN_NEW: 'plan_new',
    PLAN_CHANGE: 'plan_change',
    PLAN_COMPARE: 'plan_compare',
    
    CLIENTS_ALL: 'clients_all'
}

function Clients() {
    const { loading, error, data } = useQuery(QL_CLIENT_LIST);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
}

class MyInformation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen_ClientAdd: false,
            isOpen_ClientChange: false,
            isOpen_ClientEdit: false,
            isOpen_ClientDelete: false,

            isOpen_PlanNew: false,
            isOpen_PlanChange: false,
            isOpen_PlanCompare: false
        }

        this.fnToggleModal = this.fnToggleModal.bind(this);

    }

    componentDidMount() {
    }

    fnToggleModal(modal){
        var newState = {};
        if(modal == MODAL.CLIENT_ADD){
            window.location.href = '/clients/create';
        }
        else if(modal == MODAL.CLIENT_CHANGE){
            newState = {
                isOpen_ClientChange: !this.state.isOpen_ChangeClient
            }
        }
        else if(modal == MODAL.CLIENT_EDIT){
            newState = {
                isOpen_ClientEdit: !this.state.isOpen_ClientEdit
            }
        }
        else if(modal == MODAL.CLIENT_DELETE){
            newState = {
                isOpen_ClientDelete: !this.state.isOpen_ClientDelete
            }
        }
        else if(modal == MODAL.PLAN_NEW){
            window.location.href = '/client_plan_new';
        }
        else if(modal == MODAL.PLAN_CHANGE){
            newState = {
                isOpen_PlanChange: !this.state.isOpen_PlanChange
            }
        }
        else if(modal == MODAL.PLAN_COMPARE){
            newState = {
                isOpen_PlanCompare: !this.state.isOpen_PlanCompare
            }
        }
        console.log('fnToggleModal', newState);

        this.setState(newState);

    }

    render() {
        
        return (
            <React.Fragment>           
                {/* <ExchangeRates     /> */}
                <div className="page-nav-history">
                    {/* <Link to="/" className="page-nav-link">
                        Home
                    </Link>
                    /
                    <Link to="/client_info" className="page-nav-link">
                        User Info
                    </Link> */}
                </div>
                <div className="top-btns-container">
                {
                    this.props.user.role != ROLES.VIEW_ONLY &&
                    <React.Fragment> 
                        <Button type="primary" onClick={() => this.fnToggleModal(MODAL.CLIENT_EDIT)}>Edit Information</Button>
                        <Button type="primary" onClick={() => this.fnToggleModal(MODAL.CLIENT_DELETE)}>Delete Information</Button>
                        <Button type="primary" onClick={() => this.fnToggleModal(MODAL.PLAN_NEW)}>Create New Plan</Button>
                        <Button type="primary" onClick={() => this.fnToggleModal(MODAL.PLAN_CHANGE)}>Change Plan</Button>
                        <Button type="primary" onClick={() => this.fnToggleModal(MODAL.PLAN_COMPARE)}>Compare Plans</Button>
                    </React.Fragment> 
                }
                </div>
                <Row gutter={16}>
                    <Col span={10}>
                        <ClientInformationTable></ClientInformationTable>
                    </Col>
                    <Col span={14}>
                        <ClientsPlansReport></ClientsPlansReport>
                    </Col>
                </Row>
                <ClientAddModal 
                    isOpen={this.state.isOpen_ClientAdd}
                    cbToggle={(toggle) => this.setState({isOpen_ClientAdd: toggle})}
                ></ClientAddModal>
                <ClientChangeModal 
                    isOpen={this.state.isOpen_ClientChange}
                    cbToggle={(toggle) => this.setState({isOpen_ClientChange: toggle})}
                ></ClientChangeModal>
                <ClientEditModal 
                    isOpen={this.state.isOpen_ClientEdit}
                    cbToggle={(toggle) => this.setState({isOpen_ClientEdit: toggle})}
                ></ClientEditModal>
                <ClientDeleteModal 
                    isOpen={this.state.isOpen_ClientDelete}
                    cbToggle={(toggle) => this.setState({isOpen_ClientDelete: toggle})}
                ></ClientDeleteModal>

                <PlanNewModal 
                    isOpen={this.state.isOpen_PlanNew}
                    cbToggle={(toggle) => this.setState({isOpen_PlanNew: toggle})}
                ></PlanNewModal>
                <PlanChangeModal 
                    isOpen={this.state.isOpen_PlanChange}
                    cbToggle={(toggle) => this.setState({isOpen_PlanChange: toggle})}
                ></PlanChangeModal>
                <PlanCompareModal 
                    isOpen={this.state.isOpen_PlanCompare}
                    cbToggle={(toggle) => this.setState({isOpen_PlanCompare: toggle})}
                ></PlanCompareModal>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.rootReducer.loginUser.loginUserData

    }
}
export default connect(mapStateToProps, null)(MyInformation);