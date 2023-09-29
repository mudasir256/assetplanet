import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';

/* *** Antd Components *** */
import { Row, Col } from 'antd';

/* *** Custom Components *** */
import PageTitle from '../../../components/layout/PageTitle';
import ReportInfoRow from '../../../components/shared/ReportInfo';
import Synopsis from '../../../components/layout/Synopsis/Synopsis';
import HighlightedReportBlock from '../../../components/layout/HighlightedReportBlock';
import TableReport from '../../../components/layout/TableReport';
import InfoList from '../../../components/InfoList';

/* *** Images *** */
import Logo from '../../../assets/images/abstract-dynamic-logo-vector.jpg'
import highlightedIcon from '../../../assets/images/contributions.png';

import { useQuery, useMutation } from '@apollo/react-hooks';
import {
    QL_INCOME_LIST
} from '../../../constants/queries';
import Report from '../../../components/Report';

import {float2Currency} from 'helpers/Utils';


function LoadDBDataHook(props){
    const {data, loading, error, refetch, networkStatus } = useQuery(QL_INCOME_LIST, { notifyOnNetworkStatusChange: true });
    
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

class IncomeReport extends Component {
    constructor(props) {
        super(props);

        this.state = {
            overall_income: [
                {
                    'label': 'Passive Income',
                    'value': ''
                },
                {
                    'label': 'Earned Income',
                    'value': ''
                },
                {
                    'label': 'Gross Income Total',
                    'value': ''
                }
            ],
            overall_adj_income: [
                {
                    'label': 'Gross Income',
                    'value': ''
                },
                {
                    'label': 'Adjusted Growth Income(AGI)',
                    'value': ''
                }
            ],
            dbLoaded: false,
            dbLoading: true,
            report_rows: [],
            dbReload: false,
            networkStatus: 0
        }

        this.loadDBData = this.loadDBData.bind(this);
        this.updateNetworkStatus = this.updateNetworkStatus.bind(this);
    }

    loadDBData(networkStatusIn, data){        
        console.log('loadDBData:', data);

        if(this.state.networkStatusIn == networkStatusIn){
            return;
        }

        var rows = [];
        var total_passive_income = 0;
        var total_earned_income = 0;
        var total_income = 0;

        var total_gross_income = 0;
        var total_a_gross_income = 0;

        for(var index = 0; index < data['incomes'].length; index++){
            var gross_income = 0;
            gross_income = data['incomes'][index]['grossWages'] != null ? parseFloat(data['incomes'][index]['grossWages']) : 0;

            switch(data['incomes'][index]['incomeType']){
                case "Bonus from Work":
                case "Sales Commision from Work":
                case "Earned Income From Work":
                    // earned income
                    total_passive_income += gross_income; 
                    break;
                default:
                    // passive income
                    total_earned_income += gross_income;
                    break;
            }

            

            var a_gross_income = 0;
            a_gross_income = data['incomes'][index]['incomeTaxation']['adjustedGrossIncome'] != null ? parseFloat(data['incomes'][index]['incomeTaxation']['adjustedGrossIncome']) : 0;
            console.log('a_gross_income:', a_gross_income);
            // total_a_gross_income += a_gross_income;
            rows.push(
                {
                    key: index,
                    id: data['incomes'][index]['id'],
                    income_type: data['incomes'][index]['incomeType'],
                    nickname_income: data['incomes'][index]['nicknameIncome'],
                    owner: data['incomes'][index]['owner'],
                    est_amt_remaining_first_year: data['incomes'][index]['estimatedAmountRemainingFirstYear'],
                    feterdal_taxation_type: data['incomes'][index]['incomeTaxation']['federalTaxationType'],
                    passive: data['incomes'][index]['incomeTaxation']['passiveOrEarned'],
                    income_ends_at: data['incomes'][index]['incomeEndsAt']
                }
            )
        }  

        var overall_income = this.state.overall_income;
        overall_income[0]['value'] = float2Currency(total_passive_income);
        overall_income[1]['value'] = float2Currency(total_earned_income);
        overall_income[2]['value'] = float2Currency(total_passive_income + total_earned_income);

        var overall_adj_income = this.state.overall_adj_income;
        overall_adj_income[0]['value'] = float2Currency(total_gross_income);
        overall_adj_income[1]['value'] = float2Currency(total_a_gross_income);
        
        var instance = this;
        setTimeout(function(){
            instance.setState({
                overall_income: overall_income,
                overall_adj_income: overall_adj_income,
                report_rows: rows,
                dbLoading: false,
                dbLoaded: true,
                dbReload: false
            })
        }, 500);        
    }

    updateNetworkStatus(networkStatusIn){
        if(this.state.networkStatusIn != networkStatusIn){
            var instance = this;
            setTimeout(function(){
                instance.setState({
                    networkStatusIn: networkStatusIn
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

        const report_cols = [
            {
              title: 'Income Type',
              dataIndex: 'income_type',
              key: 'income_type'
            },
            {
              title: 'Nickname Income',
              dataIndex: 'nickname_income',
              key: 'nickname_income',
            },
            {
                title: 'Owner',
                dataIndex: 'owner',
                key: 'owner',
            },
            {
              title: 'Estimate Amount Per Year',
              dataIndex: 'est_amt_remaining_first_year',
              key: 'est_amt_remaining_first_year',
            },
            {
                title: 'Federal Taxation Type',
                dataIndex: 'feterdal_taxation_type',
                key: 'feterdal_taxation_type',
            },
            {
                title: 'Passive/Earned',
                dataIndex: 'passive',
                key: 'passive',
            },
            {
                title: 'Income Ends At',
                dataIndex: 'income_ends_at',
                key: 'income_ends_at'
            }
        ];

        const barData = {
            labels: ['1. Testing Multiple dist to income', 'Dist', 'Adam\'s Dist', 'Brand New Rental', 'Dist Two', 'Early WD', 'Frank\'s Annuity'],
            datasets: [
              {
                label: '',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [0, 50000, 100000, 150000, 0, 50000, 100000]
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
                <PageTitle title="Income Report" />
                <Synopsis content="Gross Income, Adjusted Gross Income, Modified Adjusted Gross Income, Passive or Earned" />
                <ReportInfoRow data={reportInfoData} />
                <Row type="flex" justify="center" style={{ margin: '12px 0' }}>
                    <img src={Logo} alt="" style={{ height : '130px' }} /> 
                </Row>
                <Row type="flex" gutter={[20, 0]} style={{ margin: '20px 0' }}>
                    <Col span={7} style={{ paddingTop: '20px'}}>
                        <InfoList column={1} title="Gross Income" data={this.state.overall_income} />
                    </Col>
                    <Col span={10}>
                        <HighlightedReportBlock title="Total Gross Income" value={this.state.overall_income[2]['value']}>
                            <img src={highlightedIcon} alt="" style={{ height: '100px' }} />     
                        </HighlightedReportBlock>
                    </Col>
                    <Col span={7} style={{ paddingTop: '20px'}}>
                        <InfoList column={1} title="Adjusted Gross Income" data={this.state.overall_adj_income} />
                    </Col>
                </Row>
                <Row type="flex" justify="center" style={{ margin: '12px 0', padding: '16px', border: '1px solid #ddd', backgroundColor: 'rgba(237, 237, 237, 0.40)' }}>
                    <Bar
                        data={barData}
                        height={300}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />
                </Row>
                <div className="fragment-assitance-received">
                    <PageTitle title={"All Income Information"} level={4} />
                    <Report 
                        loading={this.state.dbLoading}
                        cols={report_cols} 
                        rows={this.state.report_rows}
                    ></Report>
                </div>
            </div>
        )
    }
}


export default connect()(IncomeReport);