import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HorizontalBar } from 'react-chartjs-2';

/* *** Antd Components *** */
import { Row, Col } from 'antd';

/* *** Custom Components *** */
import PageTitle from '../../../components/layout/PageTitle';
import SubTitle from 'components/layout/SubTitle';
import ReportInfoRow from '../../../components/shared/ReportInfo';
import Synopsis from '../../../components/layout/Synopsis/Synopsis';
import TableReport from '../../../components/layout/TableReport';

/* *** Images *** */
import Logo from '../../../assets/images/abstract-dynamic-logo-vector.jpg'

import { useQuery, useMutation } from '@apollo/react-hooks';
import {
    QL_LIABILITIES_CREDIT_LIST
} from '../../../constants/queries';
import {float2Currency} from 'helpers/Utils';
import Report from '../../../components/Report';

function LoadDBDataHook(props){
    const {data, loading, error, refetch, networkStatus } = useQuery(QL_LIABILITIES_CREDIT_LIST, { notifyOnNetworkStatusChange: true });
    
    if(props.dbReload){
        console.log('reload..');
        refetch();
    }

    props.cbUpdateNetworkStatus(networkStatus);
    console.log('networkStatus:', networkStatus);
    if(data){
        props.cbLoadDBData(networkStatus, data);
    }
    
    return (
        <React.Fragment></React.Fragment>
    )
}

class LiabilitiesCreditReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows_overall: [
                {
                    key: '1',
                    title: 'Credit Cards and Lines of Credit',
                    active_accounts: '',
                    current_payments: '',
                    total_credit_available: '',
                    current_debts: '',
                },
                {
                    key: '2',
                    title: 'Loans',
                    active_accounts: '',
                    current_payments: '',
                    total_credit_available: '',
                    current_debts: '',
                },
                {
                    key: '3',
                    title: 'Total',
                    active_accounts: '',
                    current_payments: '',
                    total_credit_available: '',
                    current_debts: '',
                },
            ],
            dbLoaded: false,
            dbLoading: true,
            rows_credit: [],
            rows_liabilities: [],
            dbReload: false,
            networkStatus: 0
        };

        this.loadDBData = this.loadDBData.bind(this);
        this.updateNetworkStatus = this.updateNetworkStatus.bind(this);
    }

    loadDBData(networkStatus, data){
        console.log('loadDBData:', data);
        if(this.state.networkStatus == networkStatus){
            return;
        }

        var liabilitiesAndCredits = data['liabilitiesAndCredits'];

        var credit_active_accounts = 0;
        var credit_current_payments = 0;
        var credit_total_credit_available = 0;
        var credit_current_debts = 0;

        var loan_active_accounts = 0;
        var loan_current_payments = 0;
        var loan_total_credit_available = 0;
        var loan_current_debts = 0;

        var total_active_accounts = 0;
        var total_current_payments = 0;
        var total_total_credit_available = 0;
        var total_current_debts = 0;

        var rows_credit = [];
        var rows_liabilities = [];
        for(var index = 0; index < liabilitiesAndCredits.length; index++){

            switch(liabilitiesAndCredits[index]['liabilityType']){
                case "Credit - HELOC":
                case "Credit Card - Buxiness":
                case "Credit Card - Peresonal":
                    credit_active_accounts ++;
                    var total_credit_available = liabilitiesAndCredits[index]['additionalCreditCardInformation']['totalCreditAvailable'] != null ? parseFloat(liabilitiesAndCredits[index]['additionalCreditCardInformation']['totalCreditAvailable']) : 0;
                    credit_total_credit_available += total_credit_available;

                    var current_payments = 0;
                    credit_current_payments += current_payments;

                    var current_debts = liabilitiesAndCredits[index]['additionalCreditCardInformation']['creditBalance'] != null ? parseFloat(liabilitiesAndCredits[index]['additionalCreditCardInformation']['creditBalance']) : 0;
                    credit_current_debts += current_debts;

                    rows_credit.push(
                        {
                            key: index,
                            id: data['liabilitiesAndCredits'][index]['id'],
                            credit_description: data['liabilitiesAndCredits'][index]['liabilityType'],
                            whose_debt: data['liabilitiesAndCredits'][index]['nameOfLiability'],
                            bank: '',
                            monthly_payment: data['liabilitiesAndCredits'][index]['monthlyPayment'],
                            credit_balance: data['liabilitiesAndCredits'][index]['additionalCreditCardInformation']['creditBalance'],
                            credit_limit: data['liabilitiesAndCredits'][index]['additionalCreditCardInformation']['creditLimit'],
                            as_date: ''
                        }
                    )

                    break;
                default: 
                    loan_active_accounts ++;
                    
                    var current_payments = liabilitiesAndCredits[index]['monthlyPayment'] != null ? parseFloat(liabilitiesAndCredits[index]['monthlyPayment']) : 0;
                    loan_current_payments += current_payments;

                    var total_credit_available = 0;
                    loan_total_credit_available += total_credit_available;

                    var loan_amount = liabilitiesAndCredits[index]['initialLoanAmount'] != null ? parseFloat(liabilitiesAndCredits[index]['initialLoanAmount']) : 0;
                    var months = 1;
                    var current_debts = loan_amount - current_payments * months;

                    loan_current_debts += loan_current_debts;

                    rows_liabilities.push(
                        {
                            key: index,
                            id: data['liabilitiesAndCredits'][index]['id'],
                            liability_name: data['liabilitiesAndCredits'][index]['nameOfLiability'],
                            initial_loan_amount: data['liabilitiesAndCredits'][index]['initialLoanAmount'],
                            credit_balance: data['liabilitiesAndCredits'][index]['additionalCreditCardInformation']['creditBalance'],
                            monthly_payment: data['liabilitiesAndCredits'][index]['monthlyPayment'],
                            interest_rate: data['liabilitiesAndCredits'][index]['interestRate'],
                            maturity_date: data['liabilitiesAndCredits'][index]['maturityDate'],
                            liability_type: data['liabilitiesAndCredits'][index]['liabilityType'],
                            liability_status: data['liabilitiesAndCredits'][index]['statusOfLiability'],
                        }
                    )

                    break;
            }
        }

        total_active_accounts = credit_active_accounts + loan_active_accounts;
        total_current_payments = credit_current_payments + loan_current_payments;
        total_total_credit_available = credit_total_credit_available + loan_total_credit_available;
        total_current_debts = credit_current_debts + loan_current_debts;


        var rows_overall = this.state.rows_overall;
        rows_overall[0]['active_accounts'] = credit_active_accounts;
        rows_overall[0]['current_payments'] = float2Currency(credit_current_payments);
        rows_overall[0]['total_credit_available'] = float2Currency(credit_total_credit_available);
        rows_overall[0]['current_debts'] = float2Currency(credit_current_debts);

        rows_overall[1]['active_accounts'] = loan_active_accounts;
        rows_overall[1]['current_payments'] = float2Currency(loan_current_payments);
        rows_overall[1]['total_credit_available'] = float2Currency(loan_total_credit_available);
        rows_overall[1]['current_debts'] = float2Currency(loan_current_debts);

        rows_overall[2]['active_accounts'] = total_active_accounts;
        rows_overall[2]['current_payments'] = float2Currency(total_current_payments);
        rows_overall[2]['total_credit_available'] = float2Currency(total_total_credit_available);
        rows_overall[2]['current_debts'] = float2Currency(total_current_debts);
        
        var instance = this;
        setTimeout(function(){
            instance.setState({
                rows_overall: rows_overall,
                rows_credit: rows_credit,
                rows_liabilities: rows_liabilities,
                dbLoading: false,
                dbLoaded: true,
                dbReload: false
            })
        }, 500);
        
        
    }

    updateNetworkStatus(networkStatus){
        if(this.state.networkStatus != networkStatus){
            var instance = this;
            setTimeout(function(){
                instance.setState({
                    networkStatus: networkStatus
                });
            }, 1000);
        }
    }

    render() {
        const reportInfoData = [
            {
                'title': 'Client Name',
                'value': 'Bill Client'
            },
            {
                'title': 'Plan Nickname',
                'value': 'First Plan'
            },
            {
                'title': 'Spouse Name',
                'value': 'Peggy Client'
            },
            {
                'title': 'Today\'s Date',
                'value': '11/20/2019'
            }
        ];
        
        const report_cols_credit = [
            {
              title: 'Credit Description',
              dataIndex: 'credit_description',
              key: 'credit_description'
            },
            {
              title: 'Whose Debt',
              dataIndex: 'whose_debt',
              key: 'whose_debt',
            },
            {
              title: 'Bank',
              dataIndex: 'bank',
              key: 'bank',
            },
            {
                title: 'Monthly Payment',
                dataIndex: 'monthly_payment',
                key: 'monthly_payment',
            },
            {
                title: 'Credit Balance',
                dataIndex: 'credit_balance',
                key: 'credit_balance'
            },
            {
                title: 'Credit Limit',
                dataIndex: 'credit_limit',
                key: 'credit_limit'
            },
            {
                title: 'As of Date',
                dataIndex: 'as_date',
                key: 'as_date'
            }
        ];

        const report_cols_liabilities = [
            {
              title: 'Name of Liability ',
              dataIndex: 'liability_name',
              key: 'liability_name'
            },
            {
              title: 'Initial Loan Amount',
              dataIndex: 'initial_loan_amount',
              key: 'initial_loan_amount',
            },
            {
              title: 'Credit Balance',
              dataIndex: 'credit_balance',
              key: 'credit_balance',
            },
            {
                title: 'Monthly Payment',
                dataIndex: 'monthly_payment',
                key: 'monthly_payment',
            },
            {
                title: 'Interest Rate(or APR%)',
                dataIndex: 'interest_rate',
                key: 'interest_rate'
            },
            {
                title: 'Maturity Date',
                dataIndex: 'maturity_date',
                key: 'maturity_date'
            },
            {
                title: 'Liability Type',
                dataIndex: 'liability_type',
                key: 'liability_type'
            },
            {
                title: 'Status of Liability',
                dataIndex: 'liability_status',
                key: 'liability_status'
            }
        ];
        
        const cols_overall = [
            {
                title: '',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: 'Active Accounts',
                dataIndex: 'active_accounts',
                key: 'active_accounts',
            },
            {
                title: 'Current Payments',
                dataIndex: 'current_payments',
                key: 'current_payments',
            },
            {
                title: 'Total Credit Available',
                dataIndex: 'total_credit_available',
                key: 'total_credit_available',
            },
            {
                title: 'Current Debts',
                dataIndex: 'current_debts',
                key: 'current_debts',
            },
        ];

        const barData = {
            labels: ['John\'s House', 'Asset to sell'],
            datasets: [
                {
                  label: 'My First dataset',
                  backgroundColor: 'rgba(255,99,132,0.2)',
                  borderColor: 'rgba(255,99,132,1)',
                  borderWidth: 1,
                  hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                  hoverBorderColor: 'rgba(255,99,132,1)',
                  data: [65, 59, 80]
                }
            ]
        };

        return (
            <div className="pageWrapper">
                <LoadDBDataHook 
                    dbLoaded={this.state.dbLoaded}
                    dbReload={this.state.dbReload}
                    cbLoadDBData={this.loadDBData}
                    cbUpdateNetworkStatus={this.updateNetworkStatus}
                />
                <PageTitle title="Liabilities and Credit Report" />
                <Synopsis content="Details of current debt or potential debt using bank credit line or credit cards" />
                <ReportInfoRow data={reportInfoData} />
                <Row type="flex" justify="center" style={{ margin: '12px 0' }}>
                    <img src={Logo} alt="" style={{ height : '130px' }} /> 
                </Row>
                <Row type="flex" gutter={[20, 0]} style={{ margin: '30px 0 40px' }} justify="center">
                    <Col span={20}>
                        <TableReport rows={this.state.rows_overall} cols={cols_overall} />
                    </Col>
                </Row>
                <PageTitle title="All Loans" level={4} />
                <Row type="flex" justify="center" style={{ margin: '12px 0 40px', padding: '16px', border: '1px solid #ddd', backgroundColor: 'rgba(237, 237, 237, 0.40)' }}>
                    <HorizontalBar
                        data={barData}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />
                </Row>
                <div className="fragment-assitance-received">
                    <PageTitle title={"All Credit (Credit Cards and Lines of Credit)"} level={4} />
                    <SubTitle subTitle={"Final Expense, Guaranteed Issue, Automobile, Long Term Care, Long Term Disability, Term, Umbrella, Homeowners, Fire, Flood, Earthquake"} />
                    <Report 
                        loading={this.state.dbLoading}
                        cols={report_cols_credit} 
                        rows={this.state.rows_credit}
                    ></Report>
                    <PageTitle title={"Liabilities"} level={4} />
                    <Report 
                        loading={this.state.dbLoading}
                        cols={report_cols_liabilities} 
                        rows={this.state.rows_liabilities}
                    ></Report>
                </div>
            </div>
        )
    }
}

export default connect()(LiabilitiesCreditReport);