import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Card, List } from 'antd';

import { useMutation, useQuery } from '@apollo/react-hooks';
import {
    QL_INCOME_GET
} from '../../../constants/queries';

import { FormPagePose } from '../../../components/Animations';

import IncomeTypeSubForm from './subforms/IncomeTypeSubForm';
import IncomeDetailsSubForm from './subforms/IncomeDetailsSubForm';
import AnnuityDetailsSubForm from './subforms/AnnuityDetailsSubForm';
import IncomeTaxationSubForm from './subforms/IncomeTaxationSubForm';
import IndependantIncomeSubForm from './subforms/IndependantIncomeSubForm';
import MilitaryBenefitsSubForm from './subforms/MilitaryBenefitsSubForm';
import OtherIncomeDetailsSubForm from './subforms/OtherIncomeDetailsSubForm';
import PensionDetailsSubForm from './subforms/PensionDetailsSubForm';
import QuestionIncomeTypeSubForm from './subforms/QuestionIncomeTypeSubForm';
import W2IncomeSubForm from './subforms/W2IncomeSubForm';
import EndSubForm from './subforms/EndSubForm';


function convertDB2FormData(data){

    let formData = [];

    formData.push({
        id: 'IncomeTypeSubForm',
        data: IncomeTypeSubForm.FnCreateFormData({
            value: data['income']['incomeType']
        }),
        visible: true
    })

    formData.push({
        id: 'AnnuityDetailsSubForm',
        data: AnnuityDetailsSubForm.FnCreateFormData({
            percentToSurvivor: data['income']['percentToSurvivor']
        }),
        visible: true
    })

    formData.push({
        id: 'IncomeDetailsSubForm',
        data: IncomeDetailsSubForm.FnCreateFormData({
            nicknameIncome: data['income']['nicknameIncome'],
            owner: data['income']['owner'],
            frequencyPayPeriod: data['income']['frequencyOfPayPeriods'],
            grossWages: data['income']['grossWages'],
            dateIncomeStarts: data['income']['dateIncomeStarts'],
            dateIncomeEnds: data['income']['dateIncomeEnds'],
            yearlyIncrease: data['income']['percentageYearlyIncrease'],
            incomeSourceFromAssets: data['income']['incomeSourceFromAsset'],
            notes: data['income']['notes']
        }),
        visible: true
    })

    formData.push({
        id: 'IncomeTaxationSubForm',
        data: IncomeTaxationSubForm.FnCreateFormData({
            federalTaxationType: data['income']['incomeTaxation']['federalTaxationType'],
            stateTaxationType: data['income']['incomeTaxation']['stateTaxationType'],
            adjustedGrossIncome: data['income']['incomeTaxation']['adjustedGrossIncome'] ? 'Yes' : 'No',
            passiveEarned: data['income']['incomeTaxation']['passiveOrEarned'],
            amountFederalTaxation: data['income']['incomeTaxation']['amountSubjectToFederalTaxation']
        }),
        visible: true
    })

    formData.push({
        id: 'IndependantIncomeSubForm',
        data: IndependantIncomeSubForm.FnCreateFormData({
            lessAdjustment: data['income']['independentContractor']['lessSelfEmploymentAdjustment'],
            taxableEarnings: data['income']['independentContractor']['taxableSelfEmploymentEarnings']
        }),
        visible: true
    })

    formData.push({
        id: 'MilitaryBenefitsSubForm',
        data: MilitaryBenefitsSubForm.FnCreateFormData({
            stateTax: data['income']['militaryBenefit']['amountSubjectToStateTax'],
            payeeSurvivorBenefits: data['income']['militaryBenefit']['payeeOfSurvivorBenefits'],
            percentToSurvivor: data['income']['militaryBenefit']['percentToSurvivor']
        }),
        visible: true
    })

    formData.push({
        id: 'OtherIncomeDetailsSubForm',
        data: OtherIncomeDetailsSubForm.FnCreateFormData({
            otherIncomeType: data['income']['otherIncomeType']
        }),
        visible: true
    })

    formData.push({
        id: 'PensionDetailsSubForm',
        data: PensionDetailsSubForm.FnCreateFormData({
            percentToSurvivor: data['income']['percentToSurvivor']
        }),
        visible: true
    })

    formData.push({
        id: 'QuestionIncomeTypeSubForm',
        data: QuestionIncomeTypeSubForm.FnCreateFormData({
            typeEmployementIncome: ''
        }),
        visible: true
    })

    formData.push({
        id: 'W2IncomeSubForm',
        data: W2IncomeSubForm.FnCreateFormData({
            federalTaxes: data['income']['employee']['federalTaxes'],
            stateTaxes: data['income']['employee']['stateTaxes'],
            employmentRetirmentContributions: data['income']['employee']['employeeRetirementContributions']
        }),
        visible: true
    })

    return formData;
}

function ViewInformation(props){
    if(props.dbID != null && props.dbID != ''){
        const {data, loading, error} = useQuery(QL_INCOME_GET, { variables: { id: props.dbID} });
        let formData = null;
        if(data){
            console.log('data:', data);
            formData = convertDB2FormData(data);
        }

        return (
            <React.Fragment>
                <h4 className="title">Asset View</h4>
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

class IncomeView extends Component {

    constructor(props) {
        super(props);

        const { incomeID } = this.props.match.params;        

        this.state = {
            incomeID: incomeID
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
                href: '/income',
                title: 'Income'
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
                    dbID={this.state.incomeID}
                />
            </React.Fragment>
        )
    }
}

export default connect()(IncomeView);