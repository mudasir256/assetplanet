import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, Button, Row, Col } from 'antd';
import Plaid from './Plaid';
import Report from 'components/Report';
import FakeData from 'helpers/fakedata';

import { useMutation, useQuery } from '@apollo/react-hooks';
import {
    QL_PLAID_ACCOUNT_LIST
} from '../../../constants/queries';

function LoadAccountsHook(props){
    if(props.userID != null && props.userID != ''){
        const {data, loading, error} = useQuery(QL_PLAID_ACCOUNT_LIST, { variables: { accountId: '' + props.userID} });
        if(data){
            console.log('call..');
            props.cbloadAccounts(data['plaidAccounts']);
        }
    }
    
    return (
        <React.Fragment></React.Fragment>
    )
}

class BudgetAccountList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loadedAccounts: false,
            accounts: [],
            changingAccount: false,
            curAccount: {},
            loadingAccountInfo: false
        }

        this.loadAccounts = this.loadAccounts.bind(this);
        this.changeAccount = this.changeAccount.bind(this);
        this.loadAccountInformation = this.loadAccountInformation.bind(this);
    }

    componentDidMount() {
        
    }

    loadAccountInformation(account){
        var instance = this;
        setTimeout(function(){
            instance.setState({
                loadingAccountInfo: false
            })
        }, 1500);
    }

    changeAccount(account){
        console.log('changeAccount:', account);
        this.setState({
            curAccount: account,
            loadingAccountInfo: true
        })

        this.loadAccountInformation(account);
    }

    loadAccounts(accounts){
        console.log('accounts:', accounts);

        var instance = this;
        setTimeout(function(){
            instance.setState({ 
                loadedAccounts: true,
                accounts: accounts
            });
        }, 100)        

    }

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
                href: '/budget',
                title: 'Budgets'
            }
        ]

        const cols = [
            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date'
            },
            {
                title: 'Category',
                dataIndex: 'category',
                key: 'category'
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                key: 'amount'
            }
        ]
        return (
            <React.Fragment>
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
                <div className="budget-page-container">
                    {
                        !this.state.loadedAccounts && 
                        <React.Fragment>
                            <p>Loading...</p>
                            <LoadAccountsHook 
                                dbLoaded={this.state.loadedAccounts}
                                userID={this.props.user.id}
                                cbloadAccounts={this.loadAccounts}
                            />
                        </React.Fragment>
                    }
                    {
                        this.state.loadedAccounts && 
                        <React.Fragment>
                            <div className="budget-page-account-list">
                                {
                                    this.state.accounts.map((account, index) => {
                                        return (
                                            <div className="account-wrap" key={index} onClick={() => this.changeAccount(account)}>
                                                <div className="account__name">{account.official_name != null ? account.official_name : account.name}</div>
                                                <div className="account__info">
                                                    <div><span className="account__info-name">Type: </span>{account.type}</div>
                                                    <div><span className="account__info-name">Sub type: </span>{account.subtype}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="budget-page-account-report">
                                {
                                    this.state.curAccount['uuid'] && 
                                    <React.Fragment>
                                        {
                                            this.state.loadingAccountInfo && <p>Loading...</p>
                                        }
                                        {
                                            !this.state.loadingAccountInfo &&
                                            <React.Fragment>
                                                <Report 
                                                    cols={cols} 
                                                    rows={FakeData.Budget.transactions}
                                                    title="Transactions"
                                                ></Report>
                                                <Report 
                                                    cols={cols} 
                                                    rows={FakeData.Budget.transactions}
                                                    title="Balance"
                                                ></Report>
                                                <Report 
                                                    cols={cols} 
                                                    rows={FakeData.Budget.transactions}
                                                    title="Investment"
                                                ></Report>
                                            </React.Fragment>
                                        }
                                    </React.Fragment>
                                }
                            </div>
                        </React.Fragment>
                    }
                    
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.rootReducer.loginUser.loginUserData

    }
}
export default connect(mapStateToProps, null)(BudgetAccountList);