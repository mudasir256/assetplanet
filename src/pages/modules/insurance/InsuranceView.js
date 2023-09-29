import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Card, List } from 'antd';

import { useMutation, useQuery } from '@apollo/react-hooks';
import {
    QL_INSURANCE_PRODUCT_GET
} from '../../../constants/queries';

import { FormPagePose } from '../../../components/Animations';
import InsuranceTypeSubForm from './subforms/InsuranceTypeSubForm';
import ProductInformationSubForm from './subforms/ProductInformationSubForm';
import LongTermInformationSubForm from './subforms/LongTermInformationSubForm';
import AutoInsuranceInformationSubForm from './subforms/AutoInsuranceInformationSubForm';
import FinancialInformationSubForm from './subforms/FinancialInformationSubForm';
import IncomeInformationSubForm from './subforms/IncomeInformationSubForm';
import EndSubForm from './subforms/EndSubForm';

function convertDB2FormData(data){

    let formData = [];

    formData.push({
        id: 'InsuranceTypeSubForm',
        data: InsuranceTypeSubForm.FnCreateFormData({
            value: data['insuranceProduct']['productInformation']['insuranceType']
        }),
        visible: true
    })

    formData.push({
        id: 'ProductInformationSubForm',
        data: ProductInformationSubForm.FnCreateFormData({
            nickname: data['insuranceProduct']['productInformation']['nicknameOfInsuranceProduct'],
            owner: data['insuranceProduct']['productInformation']['owner'],
            policyStartDate: data['insuranceProduct']['productInformation']['policyStartDate'] == null ? '' : data['insuranceProduct']['productInformation']['policyStartDate'],
            policyEndDate: data['insuranceProduct']['productInformation']['policyEndDate'] == null ? '' : data['insuranceProduct']['productInformation']['policyEndDate'],
            insure: data['insuranceProduct']['productInformation']['insured'],
            addBeneficiaries: data['insuranceProduct']['productInformation']['addBeneficiaries'] ? 'Yes' : 'No',
            beneficiaryName: data['insuranceProduct']['productInformation']['nameOfBeneficiary'],
            percent: data['insuranceProduct']['productInformation']['percent'],
            carrier: data['insuranceProduct']['productInformation']['carrier'],
            policy: data['insuranceProduct']['productInformation']['lastFourOfPolicyNumber']
        }),
        visible: true
    })

    formData.push({
        id: 'LongTermInformationSubForm',
        data: LongTermInformationSubForm.FnCreateFormData({
            dailyBenefit: data['insuranceProduct']['longTermCare']['dailyBenefit'],
            monthlyBenefit: data['insuranceProduct']['longTermCare']['monthlyBenefit'],
            lifetimeBenefit: data['insuranceProduct']['longTermCare']['lifetimeBenefit'],
            inflationRider: data['insuranceProduct']['longTermCare']['inflationRider'],
            eliminationPeriod: data['insuranceProduct']['longTermCare']['eliminationPeriod']
        }),
        visible: true
    })

    formData.push({
        id: 'AutoInsuranceInformationSubForm',
        data: AutoInsuranceInformationSubForm.FnCreateFormData({
            bodilyInjuryPerIncident: data['insuranceProduct']['autoInsuranceInformation']['bodilyInjuryPerIncident'],
            bodilyInjuryAggregate: data['insuranceProduct']['autoInsuranceInformation']['bodilyInjuryAggregate'],
            propertyDamagePerIncident: data['insuranceProduct']['autoInsuranceInformation']['propertyDamagePerIncident']
        }),
        visible: true
    })

    formData.push({
        id: 'FinancialInformationSubForm',
        data: FinancialInformationSubForm.FnCreateFormData({
            annualPremium: data['insuranceProduct']['financialInformation']['annualPremium'],
            monthlyPremium: data['insuranceProduct']['financialInformation']['monthlyPremium'],
            deductible: data['insuranceProduct']['financialInformation']['deductible'],
            cashValue: data['insuranceProduct']['financialInformation']['cashValue'],
            cashValueDate: data['insuranceProduct']['financialInformation']['cashValueDate'] == null ? '' : data['insuranceProduct']['financialInformation']['cashValueDate'],
            faceValue: data['insuranceProduct']['financialInformation']['faceValue']
        }),
        visible: true
    })

    formData.push({
        id: 'IncomeInformationSubForm',
        data: IncomeInformationSubForm.FnCreateFormData({
            frequencyCurrentIncome: data['insuranceProduct']['incomeInformation']['frequencyOfCurrentIncome'],
            currentMonthlyIncome: data['insuranceProduct']['incomeInformation']['currentMonthlyIncome'],
            currentAnnualIncome: data['insuranceProduct']['incomeInformation']['currentAnnualIncome'],
            lumpsumPaymentDate: data['insuranceProduct']['incomeInformation']['lumpSumPaymentDate'] == null ? '' : data['insuranceProduct']['incomeInformation']['lumpSumPaymentDate'],
            futureLumpsumPayment: data['insuranceProduct']['incomeInformation']['futureLumpSumPayment'],
            futureAnnualIncome: data['insuranceProduct']['incomeInformation']['futureAnnualIncome'],
            dateFutureIncomeEnds: data['insuranceProduct']['incomeInformation']['dateFutureIncomeEnds'] == null ? '' : data['insuranceProduct']['incomeInformation']['dateFutureIncomeEnds'],
            futureIncomeDate: data['insuranceProduct']['incomeInformation']['futureIncomeDate'] == null ? '' : data['insuranceProduct']['incomeInformation']['futureIncomeDate'],
            incomeEndsDeath: data['insuranceProduct']['incomeInformation']['incomeEndsAtDeath'],
            incomeStartsRetirement: data['insuranceProduct']['incomeInformation']['incomeStartsAtRetirement'],
            taxable: data['insuranceProduct']['incomeInformation']['taxable'] ? 'Yes' : 'No'
        }),
        visible: true
    })

    return formData;
}

function ViewInformation(props){
    if(props.dbID != null && props.dbID != ''){
        const {data, loading, error} = useQuery(QL_INSURANCE_PRODUCT_GET, { variables: { id: props.dbID} });
        let formData = null;
        if(data){
            console.log('data:', data);
            formData = convertDB2FormData(data);
        }

        return (
            <React.Fragment>
                <h4 className="title">Insurance Product View</h4>
                {
                    !data && <p>Loading...</p>
                }
                {
                    <div class="card-columns">
                        {
                        data &&
                        formData.map((subForm, sindex) => {
                            let subFormData = subForm.data;

                            if(subFormData.hasOwnProperty('fields') && subFormData.fields){
                                var filtered = subFormData.fields.filter(function (el) {
                                    return el.value !== '' && el.value !== null && el.value !== undefined;
                                });
                                if(filtered.length){
                                    return(
                                        <div class="card">
                                            <Card title={subFormData.title} bordered={false}>                                    
                                                {
                                                    filtered.map((field, ffindex) => {
                                                        return(
                                                            <div className="info-wrap" key={ffindex}>
                                                                <div className="info-title text-left">{field.title}</div>
                                                                <div className="info-value">{field.value.toString()}</div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </Card>
                                        </div>
                                    )
                                }
                            }
                        })}
                    </div>
                }                
            </React.Fragment>
        )
    }
    
    return (
        <React.Fragment>
            <h4 className="title">Asset View</h4>
        </React.Fragment>
    )
    
}

class InsuranceView extends Component {

    constructor(props) {
        super(props);

        const { insuranceID } = this.props.match.params;        

        this.state = {
            insuranceID: insuranceID
        }

    }

    componentDidMount() {
     
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
                href: '/insurance',
                title: 'Insurance Products'
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
                <ViewInformation 
                    dbID={this.state.insuranceID}
                />

            </React.Fragment>
        )
    }
}

export default connect()(InsuranceView);