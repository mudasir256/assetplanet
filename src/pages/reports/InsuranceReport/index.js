import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pie } from 'react-chartjs-2';

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

import ROLES from 'constants/roles';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
    QL_INSURANCE_PRODUCT_LIST,
    QL_INSURANCE_PRODUCT_DELETE
} from '../../../constants/queries';

import {float2Currency} from 'helpers/Utils';
import Report from '../../../components/Report';

function LoadDBDataHook(props){
    const {data, loading, error, refetch, networkStatus } = useQuery(QL_INSURANCE_PRODUCT_LIST, { notifyOnNetworkStatusChange: true });
    
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

class InsuranceReport extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            isOpenDelete: false,
            reload: true,
            rows_overall: [
                {
                    key: '1',
                    title: 'Investments',
                    policies: '',
                    annual_premium: '',
                    cash_value: '',
                },
                {
                    key: '2',
                    title: 'Protection',
                    policies: '',
                    annual_premium: '',
                    cash_value: '',
                },
                {
                    key: '3',
                    title: 'Total',
                    policies: '',
                    annual_premium: '',
                    cash_value: '',
                },
            ],
            dbLoaded: false,
            dbLoading: true,
            rows_investments: [],
            rows_risk: [],
            dbReload: false,
            networkStatus: 0
        }

        this.loadDBData = this.loadDBData.bind(this);
        this.updateNetworkStatus = this.updateNetworkStatus.bind(this);
    }

    loadDBData(networkStatus, data){        
        console.log('loadDBData:', data);

        if(this.state.networkStatus == networkStatus){
            return;
        }

        var insuranceProducts = data['insuranceProducts'];

        var investments_policies = 0;
        var investments_annual_premium = 0;
        var investments_cash_value = 0;

        var risk_policies = 0;
        var risk_annual_premium = 0;
        var risk_cash_value = 0;

        var total_policies = 0;
        var total_annual_premium = 0;
        var total_cash_value = 0;

        var rows_investments = [];
        var rows_risk = [];
        for(var index = 0; index < insuranceProducts.length; index++){

            switch(insuranceProducts[index]['productInformation']['insuranceType']){
                case "Annuity - Fixed":
                case "Annuity - Fixed Indexed":
                case "Final Expense":
                case "Term - 5 Year":
                case "Annuity - Defered":
                case "Annuity - Immediate":
                case "Annuity - Variable":
                case "Term - 10 Year":
                case "Term -  30 Year":
                case "Variable Life":
                case "Whole Life":
                case "Term - 20 year":
                case "Universal Life":
                case "Variable Universal Life":
                case "Term - 25 Year":
                case "Term - 15 Year":

                    investments_policies++;
                    var year_premium = 0;

                    if(insuranceProducts[index]['financialInformation']['monthlyPremium'] != null ){
                        year_premium = parseFloat(insuranceProducts[index]['financialInformation']['monthlyPremium']) * 12;
                    }
                    if(insuranceProducts[index]['financialInformation']['annualPremium'] != null){
                        year_premium = parseFloat(insuranceProducts[index]['financialInformation']['annualPremium']);
                    }

                    investments_annual_premium += year_premium;

                    var face_value = 0;
                    face_value = insuranceProducts[index]['financialInformation']['faceValue'] != null ? parseFloat(insuranceProducts[index]['financialInformation']['faceValue']) : 0;
                    total_cash_value += face_value;
                    

                    rows_investments.push(
                        {
                            key: index,
                            id: insuranceProducts[index]['id'],
                            insurance_products: insuranceProducts[index]['productInformation']['insuranceType'],
                            insured: insuranceProducts[index]['productInformation']['insured'],
                            carrier: insuranceProducts[index]['productInformation']['carrier'],
                            end_date: insuranceProducts[index]['productInformation']['policyEndDate'],
                            year_premium: year_premium,
                            cash_value: insuranceProducts[index]['financialInformation']['cashValue'],
                            monthly_income: insuranceProducts[index]['financialInformation']['monthlyPremium'],
                            death_benefit: face_value
                        }
                    )

                    break;
                case "Guaranteed Issue":
                case "Other":
                case "Dental":
                case "No Medical Exam":
                case "Speciality and Misc":
                case "Renters":
                case "Flood":
                case "Automobile":
                case "Fire":
                case "Earthquake":
                case "Umbrella":
                case "Homeowners":
                case "Long Term Care":
                case "Long Term Disability":
                case "Long Term Care - Hybrid":
                    risk_policies++;

                    var year_premium = 0;

                    if(insuranceProducts[index]['financialInformation']['monthlyPremium'] != null){
                        year_premium = parseFloat(insuranceProducts[index]['financialInformation']['monthlyPremium']) * 12;
                    }
                    if(insuranceProducts[index]['financialInformation']['annualPremium'] != null){
                        year_premium = parseFloat(insuranceProducts[index]['financialInformation']['annualPremium']);
                    }

                    risk_annual_premium += year_premium;

                    var face_value = 0;
                    face_value = insuranceProducts[index]['financialInformation']['faceValue'] != null ? parseFloat(insuranceProducts[index]['financialInformation']['faceValue']) : 0
                    total_cash_value += face_value;

                    rows_risk.push(
                        {
                            key: index,
                            id: insuranceProducts[index]['id'],
                            insurance_products: insuranceProducts[index]['productInformation']['insuranceType'],
                            insured: insuranceProducts[index]['productInformation']['insured'],
                            company_name: insuranceProducts[index]['productInformation']['carrier'],
                            policy: insuranceProducts[index]['productInformation']['lastFourOfPolicyNumber'],
                            end_date: insuranceProducts[index]['productInformation']['policyEndDate'],
                            deductible: insuranceProducts[index]['financialInformation']['deductible'],
                            year_premium: year_premium,
                            liability_coverage: face_value,
                        }
                    )
                    break;
                default:
                    break;
            }
        }

        total_policies = investments_policies + risk_policies;
        total_annual_premium = investments_annual_premium + risk_annual_premium;
        total_cash_value = investments_cash_value + risk_cash_value;

        var rows_overall = this.state.rows_overall;
        rows_overall[0]['policies'] = investments_policies;
        rows_overall[0]['annual_premium'] = float2Currency(investments_annual_premium);
        rows_overall[0]['cash_value'] = float2Currency(investments_cash_value);

        rows_overall[1]['policies'] = risk_policies;
        rows_overall[1]['annual_premium'] = float2Currency(risk_annual_premium);
        rows_overall[1]['cash_value'] = float2Currency(risk_cash_value);

        rows_overall[2]['policies'] = total_policies;
        rows_overall[2]['annual_premium'] = float2Currency(total_annual_premium);
        rows_overall[2]['cash_value'] = float2Currency(total_cash_value);

        var instance = this;
        setTimeout(function(){
            instance.setState({
                rows_overall: rows_overall,
                rows_investments: rows_investments,
                rows_risk: rows_risk,
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
          
        const investmentsData = {
            labels: [
                'Whole Life'
            ],
            datasets: [{
                data: [300],
                backgroundColor: [
                '#FF6384',
                ],
                hoverBackgroundColor: [
                '#FF6384',
                ]
            }]
        };

        const protectionData = {
            labels: [
                'Term 25 Year'
            ],
            datasets: [{
                data: [300],
                backgroundColor: [
                '#FF6384',
                ],
                hoverBackgroundColor: [
                '#FF6384',
                ]
            }]
        };

        const cols_overall = [
            {
                title: '',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: 'Policies',
                dataIndex: 'policies',
                key: 'policies',
            },
            {
                title: 'Annual Premium',
                dataIndex: 'annual_premium',
                key: 'annual_premium',
            },
            {
                title: 'Cash Value',
                dataIndex: 'cash_value',
                key: 'cash_value',
            },
        ];

        const cols_investments = [
            {
                title: 'Insurance Products',
                dataIndex: 'insurance_products',
                key: 'insurance_products'
            },
            {
                title: 'Insured',
                dataIndex: 'insured',
                key: 'insured',
            },
            {
                title: 'Carrier',
                dataIndex: 'carrier',
                key: 'carrier',
            },
            {
                title: 'Policy #',
                dataIndex: 'policy',
                key: 'policy',
            },
            {
                title: 'End Date',
                dataIndex: 'end_date',
                key: 'end_date',
            },
            {
                title: 'Year Premium',
                dataIndex: 'year_premium',
                key: 'year_premium',
            },
            {
                title: 'Cash Value',
                dataIndex: 'cash_value',
                key: 'cash_value',
            },
            {
                title: 'Monthly Income',
                dataIndex: 'monthly_income',
                key: 'monthly_income',
            },
            {
                title: 'Death Benefit',
                dataIndex: 'death_benefit',
                key: 'death_benefit',
            }
        ];
          
        const cols_risk = [
            {
                title: 'Insurance Products',
                dataIndex: 'insurance_products',
                key: 'insurance_products'
            },
            {
                title: 'Insured',
                dataIndex: 'insured',
                key: 'insured',
            },
            {
                title: 'Company Name',
                dataIndex: 'company_name',
                key: 'company_name',
            },
            {
                title: 'Policy #',
                dataIndex: 'policy',
                key: 'policy',
            },
            {
                title: 'End Date',
                dataIndex: 'end_date',
                key: 'end_date',
            },
            {
                title: 'Deductible',
                dataIndex: 'deductible',
                key: 'deductible',
            },
            {
                title: 'Year Premium',
                dataIndex: 'year_premium',
                key: 'year_premium',
            },
            {
                title: 'Liability Coverage',
                dataIndex: 'liability_coverage',
                key: 'liability_coverage',
            }
        ];

        
        return (
            <div className="pageWrapper">
                <LoadDBDataHook 
                    dbLoaded={this.state.dbLoaded}
                    dbReload={this.state.dbReload}
                    cbLoadDBData={this.loadDBData}
                    cbUpdateNetworkStatus={this.updateNetworkStatus}
                />
                <PageTitle title="Insurance Report" />
                <Synopsis content="Gross Income, Adjusted Gross Income, Modified Adjusted Gross Income, Passive or Earned" />
                <ReportInfoRow data={reportInfoData} />
                <Row type="flex" justify="center" style={{ margin: '12px 0' }}>
                    <img src={Logo} alt="" style={{ height : '130px' }} /> 
                </Row>
                <Row type="flex" gutter={[20, 0]} style={{ margin: '30px 0 40px' }}>
                    <Col span={7}>
                        <PageTitle title="Investments" level={4} />
                        <Pie data={investmentsData} height={200} />
                    </Col>
                    <Col span={10}>
                    <TableReport rows={this.state.rows_overall} cols={cols_overall} />
                    </Col>
                    <Col span={7}>
                        <PageTitle title="Protection" level={4} />
                        <Pie data={protectionData} height={200} />
                    </Col>
                </Row>
                <div className="fragment-assitance-received">
                    <PageTitle title={"Insurance Policies as Investments"} level={4} />
                    <SubTitle subTitle={"Annuity, Long Term Care Hybrid, Universal Life, Variable, Whole Life"} />
                    <Report 
                        loading={this.state.dbLoading}
                        cols={cols_investments} 
                        rows={this.state.rows_investments}
                    ></Report>
                    <PageTitle title={"Insurance Policies - Risk Only"} level={4} />
                    <SubTitle subTitle={"Final Expense, Guaranteed Issue, Automobile, Long Term Care, Long Term Disability, Term, Umbrella, Homeowners, Fire, Flood, Earthquake"} />
                    <Report 
                        loading={this.state.dbLoading}
                        cols={cols_risk} 
                        rows={this.state.rows_risk}
                    ></Report>
                </div>
            </div>
        )
    }
}

export default connect()(InsuranceReport);