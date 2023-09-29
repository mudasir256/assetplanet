import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Modal, Button } from 'antd';
import ROLES from 'constants/roles';
import PlaidLink from "react-plaid-link";
import axios from "axios";
import Report from 'components/Report';
import Config from 'Config';
import { plaidLogin } from 'redux/actions';

import { useMutation, useQuery } from '@apollo/react-hooks';
import {
    QL_PLAID_ACCOUNT_ADD,
    QL_PLAID_INCOME_ADD,
    QL_PLAID_INVESTMENT_ADD,
    QL_PLAID_ITEM_ADD
} from '../../../constants/queries';

var fnMutationPlaidAccountAdd = null;
var fnMutationPlaidIncomeAdd = null;
var fnMutationPlaidInvestmentAdd = null;
var fnMutationPlaidItemAdd = null;


function HiddenHook(){
    [fnMutationPlaidAccountAdd] = useMutation(QL_PLAID_ACCOUNT_ADD);
    [fnMutationPlaidIncomeAdd] = useMutation(QL_PLAID_INCOME_ADD);
    [fnMutationPlaidInvestmentAdd] = useMutation(QL_PLAID_INVESTMENT_ADD);
    [fnMutationPlaidItemAdd] = useMutation(QL_PLAID_ITEM_ADD);

    return (
        <React.Fragment></React.Fragment>
    )
}

const PLAID = {
    IMPORT_TRANSACTION: 'PLAID_IMPORT_TRANSACTION',
    IMPORT_ACCOUNT: 'PLAID_IMPORT_ACCOUNT',
    IMPORT_INCOME: 'PLAID_IMPORT_INCOME',
    IMPORT_INVESTMENT: 'PLAID_IMPORT_INVESTMENT',
    IMPORT_ITEM: 'PLAID_IMPORT_ITEM',
    IMPORT_BALANCE: 'PLAID_IMPORT_BALANCE'
}
class Plaid extends Component {

    constructor() {
        super();
    
        this.state = {
            reports: {
                reportData: [],
                reportCols: {},
                reportTitle: ''
            },
            dataLoaded: false
        };
    
        this.handleOnSuccess = this.handleOnSuccess.bind(this);
        this.handleOnExit = this.handleOnExit.bind(this);

        this.getTransactions = this.getTransactions.bind(this);
        this.getIncome = this.getIncome.bind(this);
        this.getBalance = this.getBalance.bind(this);
        this.getAssets = this.getAssets.bind(this);
        this.getInvestments = this.getInvestments.bind(this);
        this.getLiabilities = this.getLiabilities.bind(this);

        this.fnImportPlaid = this.fnImportPlaid.bind(this);
        this.fnImportAccounts = this.fnImportAccounts.bind(this);
    }
    
    componentDidMount(){
        
    }

    fnImportAccounts(){

        axios.get(Config.backend_server + "/plaid/accounts").then(res => {
            var accounts = res.data['accounts'];

            console.log('accounts:', accounts);
            let varQL = null;
            for(var index = 0; index < accounts.length; index++){
                varQL = {
                    accountId: '' + this.props.user.id,
                    plaidAccount: {
                        uuid: accounts[index]['account_id'],
                        balances: {
                            available: accounts[index]['balances']['available'],
                            current: accounts[index]['balances']['current'],
                            iso_currency_code: accounts[index]['balances']['iso_currency_code'],
                            limit: accounts[index]['balances']['limit'],
                            unofficial_currency_code: accounts[index]['balances']['unofficial_currency_code'],
                        },
                        mask: accounts[index]['mask'],
                        name: accounts[index]['name'],
                        officialName: accounts[index]['offical_name'],
                        subtype: accounts[index]['subtype'],
                        plaidAccountType: accounts[index]['type'],
                    }
                }
                console.log('varQL:', varQL);
                fnMutationPlaidAccountAdd({ variables: { data: varQL } }).then((response) => {
                });
            }
        });

        
    }

    fnImportPlaid(plaidImportType, data){
        console.log(plaidImportType, data);
        let varQL = null;
        switch(plaidImportType){
            case PLAID.IMPORT_TRANSACTION: 
                break;
            case PLAID.IMPORT_ACCOUNT: 
                // varQL = {

                // }
                // fnMutationPlaidAccountAdd(this.props.user.id, { variables: { data: varQL } }).then((response) => {
                // });
                break;
            case PLAID.IMPORT_INCOME: 
                varQL = {
                    accountId: '' + this.props.user.id,
                    plaidIncome: {
                        // incomeStreams: 
                        lastYearIncome: data.raw.last_year_income,
                        lastYearIncomeBeforeTax: data.raw.last_year_income_before_tax,
                        maxNumberOfOverlappingIncomeStreams: data.raw.max_number_of_overlapping_income_streams,
                        numberOfIncomeStreams: data.raw.number_of_income_streams,
                        projectedYearlyIncome: data.raw.projected_yearly_income,
                        projectedYearlyIncomeBeforeTax: data.raw.projected_yearly_income_before_tax
                    }
                }
                console.log('varQL:', varQL);
                fnMutationPlaidIncomeAdd({ variables: { data: varQL } }).then((response) => {
                });
                break;

            case PLAID.IMPORT_INVESTMENT: 
                
                varQL = {
                    accountId: '' + this.props.user.id,
                    plaidInvestment: {
                        uuid: data.raw.account_id,
                        amount: data.raw.amount,
                        cancelTransactionId: data.raw.cancel_transaction_id,
                        date: data.raw.date,
                        fees: data.raw.fees,
                        investmentTransactionId: data.raw.investment_transaction_id,
                        isoCurrencyCode: data.raw.iso_currency_code,
                        name: data.raw.name,
                        price: data.raw.price,
                        quantity: data.raw.quantity,
                        securityId: data.raw.security_id,
                        investmentType: data.raw.type,
                        // investmentType: data.raw.subtype,
                        unofficialCurrencyCode: data.raw.unofficial_currency_code
                    }
                }
                console.log('varQL:', varQL);
                fnMutationPlaidInvestmentAdd({ variables: { data: varQL } }).then((response) => {
                });
                break;

            case PLAID.IMPORT_ITEM: 
                
                // fnMutationPlaidItemAdd(this.props.user.id, { variables: { data: varQL } }).then((response) => {
                // });
                break;

            case PLAID.IMPORT_BALANCE: 
                break;
        }
    }

    handleOnSuccess(public_token, metadata) {
        // send token to client server

        window.localStorage.setItem('plaid_connected', true);
        window.localStorage.setItem('plaid_public_token', public_token);

        this.props.plaidLogin(true, public_token);
        var instance = this;
        axios.post(Config.backend_server + "/plaid/auth/public_token", {
            public_token: public_token
        }).then(function(resp){
            instance.fnImportAccounts();
        });
    }
    
    handleOnExit() {
        // handle the case when your user exits Link
        // For the sake of this tutorial, we're not going to be doing anything here.
    }
    
    getTransactions() {
        axios.get(Config.backend_server + "/plaid/transactions").then(res => {
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
                },
                {
                    title: '',
                    key: 'id',
                    render: (record) => {
                        if(this.props.user.role != ROLES.VIEW_ONLY){
                            return(
                                <span>
                                    <a className="report-action-btn report-action-btn--view" onClick={() => this.fnImportPlaid(PLAID.IMPORT_TRANSACTION, record)}>Import</a>
                                </span>
                            )
                        }
                        else{
                            return (
                                <React.Fragment>
                                </React.Fragment>
                            )
                        }
                    }
                }
            ]

            var reports = [];
            if(res.data.hasOwnProperty('transactions')){
                var accounts = res.data['accounts'];
                var transactions = res.data['transactions'];
                for(var aindex = 0; aindex < accounts.length; aindex++){
                    var account_id = accounts[aindex]['account_id'];
                    var filterTransactions = [];
                    for(var index = 0; index < transactions.length; index++){
                        if(transactions[index]['account_id'] == account_id){
                            var category = '';
                            for(var cindex = 0; cindex < transactions[index]['category'].length; cindex++){
                                if(cindex == (transactions[index]['category'].length - 1)){
                                    category = category + transactions[index]['category'][cindex];
                                }
                                else{
                                    category = category + transactions[index]['category'][cindex] + ', ';
                                }
                            }
                            filterTransactions.push({
                                key: index,
                                date: transactions[index]['date'],
                                category: category,
                                name: transactions[index]['name'],
                                amount: transactions[index]['amount'],
                                raw: transactions[index]
                            })
                        }
                    }

                    reports.push({
                        reportData: filterTransactions,
                        reportCols: cols,
                        reportTitle: 'Transactions (' + accounts[aindex]['official_name'] + ')'
                    })
                }
                                
            }
            
            

            this.setState({ 
                reports: reports,
                dataLoaded: true
            });
        });
    }

    getIncome() {
        axios.get(Config.backend_server + "/plaid/income").then(res => {
            var incomes;
            var filterIncome = [];
            
            if(res.data.hasOwnProperty('income')){
                incomes = res.data['income']['income_streams'];
                for(var index = 0; index < incomes.length; index++){

                    filterIncome.push({
                        key: index,
                        confidence: incomes[index]['confidence'],
                        days: incomes[index]['days'],
                        monthly_income: incomes[index]['monthly_income'],
                        name: incomes[index]['name'],
                        raw: res.data['income']
                    })
                }
            }

            const cols = [
                {
                    title: 'Confidence',
                    dataIndex: 'confidence',
                    key: 'confidence'
                },
                {
                    title: 'Days',
                    dataIndex: 'days',
                    key: 'days'
                },
                {
                    title: 'Monthly Income',
                    dataIndex: 'monthly_income',
                    key: 'monthly_income'
                },
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: '',
                    key: 'id',
                    render: (record) => {
                        if(this.props.user.role != ROLES.VIEW_ONLY){
                            return(
                                <span>
                                    <a className="report-action-btn report-action-btn--view" onClick={() => this.fnImportPlaid(PLAID.IMPORT_INCOME, record)}>Import</a>
                                </span>
                            )
                        }
                        else{
                            return (
                                <React.Fragment>
                                </React.Fragment>
                            )
                        }
                    }
                }
            ]
            
            this.setState({ 
                reports: [
                    {
                        reportData: filterIncome,
                        reportCols: cols,
                        reportTitle: 'Income'
                    }
                ],
                dataLoaded: true
            });
        });
    }

    getBalance() {
        axios.get(Config.backend_server + "/plaid/balance").then(res => {
            var accounts;
            var filterBalances = [];
            
            if(res.data.hasOwnProperty('accounts')){
                accounts = res.data['accounts'];
                for(var index = 0; index < accounts.length; index++){
                    filterBalances.push({
                        key: index,
                        account_id: accounts[index]['account_id'],
                        name: accounts[index]['name'],
                        official_name: accounts[index]['official_name'],
                        type: accounts[index]['type'],
                        subtype: accounts[index]['subtype'],
                        balance_available: accounts[index]['balances']['available'],
                        balance_current: accounts[index]['balances']['current'],
                        raw: accounts[index]
                    })
                }
            }
            
            const cols = [
                {
                    title: 'Account ID',
                    dataIndex: 'account_id',
                    key: 'account_id'
                },
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: 'Official Name',
                    dataIndex: 'official_name',
                    key: 'official_name'
                },
                {
                    title: 'Type',
                    dataIndex: 'type',
                    key: 'type'
                },
                {
                    title: 'Subtype',
                    dataIndex: 'subtype',
                    key: 'subtype'
                },
                {
                    title: 'Balance Available',
                    dataIndex: 'balance_available',
                    key: 'balance_available'
                },
                {
                    title: 'Balance Current',
                    dataIndex: 'balance_current',
                    key: 'balance_current'
                },
                {
                    title: '',
                    key: 'id',
                    render: (record) => {
                        if(this.props.user.role != ROLES.VIEW_ONLY){
                            return(
                                <span>
                                    <a className="report-action-btn report-action-btn--view" onClick={() => this.fnImportPlaid(PLAID.IMPORT_BALANCE, record)}>Import</a>
                                </span>
                            )
                        }
                        else{
                            return (
                                <React.Fragment>
                                </React.Fragment>
                            )
                        }
                    }
                }
            ]
            
            this.setState({ 
                reports: [
                    {
                        reportData: filterBalances,
                        reportCols: cols,
                        reportTitle: 'Balance'
                    }
                ],
                dataLoaded: true
            });
        });
    }

    getAssets() {

    }

    getInvestments() {
        axios.get(Config.backend_server + "/plaid/investments").then(res => {
            var investments;
            var filterInvestments = [];
            
            if(res.data.hasOwnProperty('investment_transactions')){
                investments = res.data['investment_transactions'];
                for(var index = 0; index < investments.length; index++){

                    filterInvestments.push({
                        key: index,
                        account_id: investments[index]['account_id'],
                        amount: investments[index]['amount'],
                        date: investments[index]['date'],
                        name: investments[index]['name'],
                        price: investments[index]['price'],
                        quantity: investments[index]['quantity'],
                        type: investments[index]['type'],
                        raw: investments[index]
                    })
                }
            }
            
            const cols = [
                {
                    title: 'Account ID',
                    dataIndex: 'account_id',
                    key: 'account_id'
                },
                {
                    title: 'Amount',
                    dataIndex: 'amount',
                    key: 'amount'
                },
                {
                    title: 'Date',
                    dataIndex: 'date',
                    key: 'date'
                },
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: 'Price',
                    dataIndex: 'price',
                    key: 'price'
                },
                {
                    title: 'Quantity',
                    dataIndex: 'quantity',
                    key: 'quantity'
                },
                {
                    title: 'Type',
                    dataIndex: 'type',
                    key: 'type'
                },
                {
                    title: '',
                    key: 'id',
                    render: (record) => {
                        if(this.props.user.role != ROLES.VIEW_ONLY){
                            return(
                                <span>
                                    <a className="report-action-btn report-action-btn--view" onClick={() => this.fnImportPlaid(PLAID.IMPORT_INVESTMENT, record)}>Import</a>
                                </span>
                            )
                        }
                        else{
                            return (
                                <React.Fragment>
                                </React.Fragment>
                            )
                        }
                    }
                }
            ]
            
            this.setState({ 
                reports: [
                    {
                        reportData: filterInvestments,
                        reportCols: cols,
                        reportTitle: 'Investment',
                    }
                ],
                dataLoaded: true
            });
        });
    }

    getLiabilities() {
        axios.get(Config.backend_server + "/plaid/liabilities").then(res => {            
            var reports = [];
            
            if(res.data.hasOwnProperty('liabilities')){
                if(res.data['liabilities'].hasOwnProperty('credit')){
                    var credits = res.data['liabilities']['credit'];
                    var filterCredits = [];
                    for(var index = 0; index < credits.length; index++){                        
                        filterCredits.push({
                            key: index,
                            account_id: credits[index]['account_id'],
                            last_payment_amount: credits[index]['last_payment_amount'],
                            last_payment_date: credits[index]['last_payment_date'],
                            last_statement_balance: credits[index]['last_statement_balance'],
                            minimum_payment_amount: credits[index]['minimum_payment_amount'],
                            next_payment_due_date: credits[index]['next_payment_due_date'],
                            raw: credits[index]
                        })
                    }

                    var creditCols = [
                        {
                            title: 'Account ID',
                            dataIndex: 'account_id',
                            key: 'account_id'
                        },
                        {
                            title: 'Last Payment Amount',
                            dataIndex: 'last_payment_amount',
                            key: 'last_payment_amount'
                        },
                        {
                            title: 'Last Payment Date',
                            dataIndex: 'last_payment_date',
                            key: 'last_payment_date'
                        },
                        {
                            title: 'Last Statement Balance',
                            dataIndex: 'last_statement_balance',
                            key: 'last_statement_balance'
                        },
                        {
                            title: 'Minimum Payment Amount',
                            dataIndex: 'minimum_payment_amount',
                            key: 'minimum_payment_amount'
                        },
                        {
                            title: 'Next Payment Due Date',
                            dataIndex: 'next_payment_due_date',
                            key: 'next_payment_due_date'
                        }
                    ]

                    reports.push({
                        reportData: filterCredits,
                        reportCols: creditCols,
                        reportTitle: 'Liabilities (Credit)',
                    })
                }

                if(res.data['liabilities'].hasOwnProperty('student')){
                    var students = res.data['liabilities']['student'];
                    var filterStudents = [];
                    for(var index = 0; index < students.length; index++){                        
                        filterStudents.push({
                            key: index,
                            account_id: students[index]['account_id'],
                            guarantor: students[index]['guarantor'],
                            interest_rate_percentage: students[index]['interest_rate_percentage'],
                            last_payment_date: students[index]['last_payment_date'],
                            last_statement_balance: students[index]['last_statement_balance'],
                            minimum_payment_amount: students[index]['minimum_payment_amount'],
                            next_payment_due_date: students[index]['next_payment_due_date'],
                            origination_date: students[index]['origination_date'],
                            origination_principal_amount: students[index]['origination_principal_amount'],
                            outstanding_interest_amount: students[index]['outstanding_interest_amount'],
                            ytd_interest_paid: students[index]['ytd_interest_paid'],
                            ytd_principal_paid: students[index]['ytd_principal_paid'],
                            raw: students[index]
                        })
                    }

                    var studentCols = [
                        {
                            title: 'Account ID',
                            dataIndex: 'account_id',
                            key: 'account_id'
                        },
                        {
                            title: 'Guarantor',
                            dataIndex: 'guarantor',
                            key: 'guarantor'
                        },
                        {
                            title: 'Interest Rate Percentage',
                            dataIndex: 'interest_rate_percentage',
                            key: 'interest_rate_percentage'
                        },
                        {
                            title: 'Last Payment Date',
                            dataIndex: 'last_payment_date',
                            key: 'last_payment_date'
                        },
                        {
                            title: 'Last Statement Balance',
                            dataIndex: 'last_statement_balance',
                            key: 'last_statement_balance'
                        },
                        {
                            title: 'Minimum Payment Amount',
                            dataIndex: 'minimum_payment_amount',
                            key: 'minimum_payment_amount'
                        },
                        {
                            title: 'Next Payment Due Date',
                            dataIndex: 'next_payment_due_date',
                            key: 'next_payment_due_date'
                        },
                        {
                            title: 'Origination Date',
                            dataIndex: 'origination_date',
                            key: 'origination_date'
                        },
                        {
                            title: 'Origination Principal Amount',
                            dataIndex: 'origination_principal_amount',
                            key: 'origination_principal_amount'
                        },
                        {
                            title: 'Outstanding InterestAmount',
                            dataIndex: 'outstanding_interest_amount',
                            key: 'outstanding_interest_amount'
                        },
                        {
                            title: 'Ytd Interest Paid',
                            dataIndex: 'ytd_interest_paid',
                            key: 'ytd_interest_paid'
                        },
                        {
                            title: 'Ytd Principal Paid',
                            dataIndex: 'ytd_principal_paid',
                            key: 'ytd_principal_paid'
                        }
                    ]

                    reports.push({
                        reportData: filterStudents,
                        reportCols: studentCols,
                        reportTitle: 'Liabilities (Student)',
                    })
                }
                
            }
            
            this.setState({ 
                reports: reports,
                dataLoaded: true
            });
        });
    }
    
    render() {
        
        return (
            <React.Fragment>         
                <HiddenHook />
                <div className="top-btns-container">
                    {
                        <PlaidLink
                            clientName="React Plaid Setup"
                            env="sandbox"
                            product={["auth", "transactions"]}
                            publicKey="bd7569502deea3990dfc3886d403cf"
                            onExit={this.handleOnExit}
                            onSuccess={this.handleOnSuccess}
                            className="plaid-connect-btn ant-btn ant-btn-primary"
                        >
                            Connect Plaid
                        </PlaidLink>
                    }
                    {
                        this.props.plaid_connected &&
                        <React.Fragment>
                            <Button type="primary" onClick={() => this.fnImportAccounts()}>Import Accounts</Button>
                            <Button type="primary" onClick={() => this.getTransactions()}>Get Transactions</Button>
                            <Button type="primary" onClick={() => this.getIncome()}>Get Income</Button>
                            <Button type="primary" onClick={() => this.getBalance()}>Get Balance</Button>
                            <Button type="primary" onClick={() => this.getAssets()}>Get Assets</Button>
                            <Button type="primary" onClick={() => this.getInvestments()}>Get Investments</Button>
                            <Button type="primary" onClick={() => this.getLiabilities()}>Get Liabilities</Button>
                        </React.Fragment>
                    }       
                </div>
                {
                    this.state.dataLoaded &&
                    this.state.reports.map((report, index) => {
                        return (
                            <Report 
                                key={index}
                                cols={report.reportCols} 
                                rows={report.reportData}
                                title={report.reportTitle}
                            ></Report>
                        )
                    })
                }             
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.rootReducer.loginUser.loginUserData,

        plaid_connected: state.User.plaid_connected,
        plaid_public_token: state.User.plaid_public_token
    }
}

export default connect(mapStateToProps, { plaidLogin })(Plaid);