import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Card, List } from 'antd';

import { useMutation, useQuery } from '@apollo/react-hooks';
import {
    QL_LIABILITIES_CREDIT_GET
} from '../../../constants/queries';

import { FormPagePose } from '../../../components/Animations';
import LiabilityCreditTypeSubForm from './subforms/LiabilityCreditTypeSubForm';
import MainSubForm from './subforms/MainSubForm';
import CreditCardInformationSubForm from './subforms/CreditCardInformationSubForm';
import LoanInformationSubForm from './subforms/LoanInformationSubForm';
import LoanPaybackSubForm from './subforms/LoanPaybackSubForm';
import AdjustableLoanDetailsSubForm from './subforms/AdjustableLoanDetailsSubForm';
import QuestionAdditionalPaymentSubForm from './subforms/QuestionAdditionalPaymentSubForm';
import AdditionalPaymentInformationSubForm from './subforms/AdditionalPaymentInformationSubForm';
import EndSubForm from './subforms/EndSubForm';


function convertDB2FormData(data){

    let formData = [];

    formData.push({
        id: 'LiabilityCreditTypeSubForm',
        data: LiabilityCreditTypeSubForm.FnCreateFormData({
            value: data['liabilitiesAndCredit']['liabilityType']
        }),
        visible: true
    })

    formData.push({
        id: 'MainSubForm',
        data: MainSubForm.FnCreateFormData({
            name: data['liabilitiesAndCredit']['nameOfLiability'],
            owner: data['liabilitiesAndCredit']['owner']
        }),
        visible: true
    })

    formData.push({
        id: 'LoanInformationSubForm',
        data: LoanInformationSubForm.FnCreateFormData({
            initialAmount: data['liabilitiesAndCredit']['initialLoanAmount'],
            maturityDate: data['liabilitiesAndCredit']['maturityDate'],
            startDate: data['liabilitiesAndCredit']['startDate'],
            interestRate: data['liabilitiesAndCredit']['interestRate'],
            monthlyPayment: data['liabilitiesAndCredit']['monthlyPayment'],
            accountDigits: data['liabilitiesAndCredit']['last4DigitsOfAccount'],
            financialName: data['liabilitiesAndCredit']['nameOfFinancialInstitution'],
            loanLength: data['liabilitiesAndCredit']['lengthOfLoan'],
            associatedAsset: data['liabilitiesAndCredit']['associatedAsset']
        }),
        visible: true
    })

    formData.push({
        id: 'CreditCardInformationSubForm',
        data: CreditCardInformationSubForm.FnCreateFormData({
            creditLimit: data['liabilitiesAndCredit']['additionalCreditCardInformation']['creditLimit'],
            totalCredit: data['liabilitiesAndCredit']['additionalCreditCardInformation']['totalCreditAvailable'],
            creditBalance: data['liabilitiesAndCredit']['additionalCreditCardInformation']['creditBalance'],
            phoneNumber: data['liabilitiesAndCredit']['additionalCreditCardInformation']['phoneNumberOfIssuer'],
            annualFee: data['liabilitiesAndCredit']['additionalCreditCardInformation']['annualFee'],
            pointBalance: data['liabilitiesAndCredit']['additionalCreditCardInformation']['pointBalance'],
            creditRewards: data['liabilitiesAndCredit']['additionalCreditCardInformation']['creditCardRewardsProgram'],
            creditNotes: data['liabilitiesAndCredit']['additionalCreditCardInformation']['additionalNotesAboutCreditCard'],
            expiration: data['liabilitiesAndCredit']['additionalCreditCardInformation']['pointExpiration']
        }),
        visible: true
    })
    
    formData.push({
        id: 'LoanPaybackSubForm',
        data: LoanPaybackSubForm.FnCreateFormData({
            loanPaybackType: data['liabilitiesAndCredit']['loanPaybackType'],
            loanType: data['liabilitiesAndCredit']['typeOfLoan']
        }),
        visible: true
    })
    


    formData.push({
        id: 'AdjustableLoanDetailsSubForm',
        data: {
            title: 'Loan and Payback Type',
            data: data['liabilitiesAndCredit']['adjustableLoanDetails']
        },
        visible: false
    })

    formData.push({
        id: 'QuestionAdditionalPaymentSubForm',
        data: LoanPaybackSubForm.FnCreateFormData({
            // value: data['liabilitiesAndCredit']['']
        }),
        visibile: true
    })

    formData.push({
        id: 'AdditionalPaymentInformationSubForm',
        data: {
            title: 'Additional Principal Payments?',
            data: data['liabilitiesAndCredit']['additionalPrincipals']
        },
        visible: false
    })

    return formData;
}

function ViewInformation(props){
    if(props.dbID != null && props.dbID != ''){
        const {data, loading, error} = useQuery(QL_LIABILITIES_CREDIT_GET, { variables: { id: props.dbID} });
        let formData = null;
        if(data){
            console.log('data:', data);
            formData = convertDB2FormData(data);
        }

        return (
            <React.Fragment>
                <h4 className="title">Liabilities and Credit View</h4>
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
            <h4 className="title">Liabilities and Credit View</h4>
        </React.Fragment>
    )
    
}

class LiabilityCreditView extends Component {

    constructor(props) {
        super(props);

        const { liabilitiesCreditID } = this.props.match.params;        

        this.state = {
            liabilitiesCreditID: liabilitiesCreditID
        };

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
                href: '/liabilities_credit',
                title: 'Liabilities and Credit'
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
                    dbID={this.state.liabilitiesCreditID}
                />

            </React.Fragment>
        )
    }
}

export default connect()(LiabilityCreditView);