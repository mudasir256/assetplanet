import React, { Component } from 'react';

/* *** Antd Components *** */
import { Table } from 'antd';

/* *** Custom Components *** */

/* *** Styles *** */
import './AllInsuranceProductsReport.css';

import { useQuery, useMutation } from '@apollo/react-hooks';
import {
    QL_INSURANCE_PRODUCT_LIST
} from 'constants/queries';

import {float2Currency} from 'helpers/Utils';

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

class AllInsuranceProductsReport extends Component {
    constructor(props){
        super(props);

        this.state = {    
            dbLoaded: false,
            dbLoading: true,
            rows: [],
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
        var rows = [];
        for(var index = 0; index < insuranceProducts.length; index++){
            var year_premium = 0;

            if(insuranceProducts[index]['financialInformation']['monthlyPremium'] != null){
                year_premium = parseFloat(insuranceProducts[index]['financialInformation']['monthlyPremium']) * 12;
            }
            if(insuranceProducts[index]['financialInformation']['annualPremium'] != null){
                year_premium = parseFloat(insuranceProducts[index]['financialInformation']['annualPremium']);
            }
            var face_value = 0;
            face_value = insuranceProducts[index]['financialInformation']['faceValue'] != null ? parseFloat(insuranceProducts[index]['financialInformation']['faceValue']) : 0

            rows.push(
                {
                    key: index,
                    id: insuranceProducts[index]['id'],
                    nick_name: insuranceProducts[index]['productInformation']['nicknameOfInsuranceProduct'],
                    owner: insuranceProducts[index]['productInformation']['owner'],
                    insured: insuranceProducts[index]['productInformation']['insured'],
                    policy_end_date: insuranceProducts[index]['productInformation']['policyEndDate'],
                    carrier: insuranceProducts[index]['productInformation']['carrier'],
                    annual_premium: float2Currency(insuranceProducts[index]['financialInformation']['annualPremium']),
                    cash_value: float2Currency(insuranceProducts[index]['financialInformation']['cashValue']),
                    face_value: float2Currency(face_value),
                    daily_benefit: float2Currency(insuranceProducts[index]['longTermCare']['dailyBenefit']),
                    lifetime_benefit: float2Currency(insuranceProducts[index]['longTermCare']['lifetimeBenefit']),
                    monthly_benefit: float2Currency(insuranceProducts[index]['longTermCare']['monthlyBenefit']),
                    current_monthly_income: float2Currency(insuranceProducts[index]['incomeInformation']['currentMonthlyIncome']),
                    elimination_period: float2Currency(insuranceProducts[index]['longTermCare']['eliminationPeriod']),
                    bodily_injury_per_incident: float2Currency(insuranceProducts[index]['autoInsuranceInformation']['bodilyInjuryPerIncident']),
                    bodily_injury_aggregate: float2Currency(insuranceProducts[index]['autoInsuranceInformation']['bodilyInjuryAggregate']),
                    property_damage_per_incident: float2Currency(insuranceProducts[index]['autoInsuranceInformation']['propertyDamagePerIncident'])

                }
            )
        }

        var instance = this;
        setTimeout(function(){
            instance.setState({
                rows: rows,
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
        const cols = [
            {
                title: 'Nick Name',
                dataIndex: 'nick_name',
                key: 'nick_name'
            },
            {
                title: 'Owner',
                dataIndex: 'owner',
                key: 'owner',
            },
            {
                title: 'Insured',
                dataIndex: 'insured',
                key: 'insured',
            },
            {
                title: 'Policy End Date',
                dataIndex: 'policy_end_date',
                key: 'policy_end_date',
            },
            {
                title: 'Carrier',
                dataIndex: 'carrier',
                key: 'carrier',
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
            {
                title: 'Face Value',
                dataIndex: 'face_value',
                key: 'face_value',
            },
            {
                title: 'Daily Benefit',
                dataIndex: 'daily_benefit',
                key: 'daily_benefit',
            },
            {
                title: 'Lifetime Benefit',
                dataIndex: 'lifetime_benefit',
                key: 'lifetime_benefit',
            },
            {
                title: 'Monthly Benefit',
                dataIndex: 'monthly_benefit',
                key: 'monthly_benefit',
            },
            {
                title: 'Current Monthly Income',
                dataIndex: 'current_monthly_income',
                key: 'current_monthly_income',
            },
            {
                title: 'Elimination Period',
                dataIndex: 'elimination_period',
                key: 'elimination_period',
            },
            {
                title: 'Bodily Injury Per Incident',
                dataIndex: 'bodily_injury_per_incident',
                key: 'bodily_injury_per_incident',
            },
            {
                title: 'Bodily Injury Aggregate',
                dataIndex: 'bodily_injury_aggregate',
                key: 'bodily_injury_aggregate',
            },
            {
                title: 'Property Damage Per Incident',
                dataIndex: 'property_damage_per_incident',
                key: 'property_damage_per_incident',
            },
        ];

        return (
            <React.Fragment>
                <LoadDBDataHook 
                    dbLoaded={this.state.dbLoaded}
                    dbReload={this.state.dbReload}
                    cbLoadDBData={this.loadDBData}
                    cbUpdateNetworkStatus={this.updateNetworkStatus}
                />
                <div className="all-insurance-products-report-wrapper">
                    <Table bordered 
                        loading={this.state.dbLoading}
                        dataSource={this.state.rows} 
                        columns={cols} 
                        pagination={false} 
                    />
                </div>
            </React.Fragment>
        )
    }
}

export default AllInsuranceProductsReport;