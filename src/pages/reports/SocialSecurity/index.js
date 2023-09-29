import React, { Component } from 'react';
import { connect } from 'react-redux';
/* *** Antd Components *** */
import { Row } from 'antd';

/* *** Custom Components *** */
import PageTitle from '../../../components/layout/PageTitle';
import Synopsis from '../../../components/layout/Synopsis/Synopsis';
import InfoList from '../../../components/InfoList';
import ReportInfoRow from '../../../components/shared/ReportInfo';

/* *** Images *** */
import Logo from '../../../assets/images/abstract-dynamic-logo-vector.jpg'

class SocialSecurity extends Component {
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

        const clientInfoGeneralData = [
            {
                'label': 'Client Birthdate',
                'value': 'Bill Client'
            },
            {
                'label': 'Cost of Living Adjustment',
                'value': 'First Plan'
            },
            {
                'label': 'Client Retirement Year',
                'value': ''
            },
            {
                'label': 'Time Value of Money Interest Rate',
                'value': ''
            },
            {
                'label': 'Client Monthly Benefit at Full Retirement Age',
                'value': '$ 0.00'
            },
            {
                'label': 'Time until Full Retirement Age',
                'value': ''
            },
            {
                'label': 'Full Retirement Age',
                'value': '66 and 2 months'
            },
        ];

        const retirementEarningsData = [
            {
                'label': 'Enter date you would like to begin receiving benefits',
                'value': ''
            },
            {
                'label': 'Monthly decrease in benefit',
                'value': '$ 0.00'
            },
            {
                'label': 'Your estimated earnings',
                'value': '$ 0.00'
            },
            {
                'label': 'Monthly decrease in benefit',
                'value': '$ 0.00'
            },
        ];

        const spouseInfoGeneralData = [
            {
                'label': 'Spouse Birthdate',
                'value': ''
            },
            {
                'label': 'Cost of Living Adjustment',
                'value': 'First Plan'
            },
            {
                'label': 'Spouse Retirement Year',
                'value': ''
            },
            {
                'label': 'Time Value of Money Interest Rate',
                'value': ''
            },
            {
                'label': 'Spouse Monthly Benefit at Full Retirement Age',
                'value': '$ 0.00'
            },
            {
                'label': 'Time until Full Retirement Age',
                'value': ''
            },
            {
                'label': 'Full Retirement Age',
                'value': ''
            },
        ];

        const SpouseRetirementEarningsData = [
            {
                'label': 'Enter date you would like to begin receiving benefits',
                'value': ''
            },
            {
                'label': 'Monthly decrease in benefit',
                'value': '$ 0.00'
            },
            {
                'label': 'Your estimated earnings',
                'value': '$ 0.00'
            },
            {
                'label': 'Monthly decrease in benefit',
                'value': '$ 0.00'
            },
        ];

        const lifetimeBenefitsData = [
            {
                'label': 'Lifetime Benefits At Age 62',
                'value': '$ 0.00'
            },
            {
                'label': 'Lifetime Benefits At Full Retirement Age',
                'value': '$ 0.00'
            },
            {
                'label': 'Lifetime Benefits At 70',
                'value': '$ 0.00'
            },
        ];

        return (
            <div className="pageWrapper">
                <PageTitle title="Social Security Report" />
                <Synopsis content="Client and Spouse (if applicable) Social Security Information including optimal time to take benefits" />
                <ReportInfoRow data={reportInfoData} />
                <Row type="flex" justify="center" style={{ margin: '12px 0 20px' }}>
                    <img src={Logo} alt="" style={{ height : '130px' }} /> 
                </Row>
                <div className="pageContent">
                    <InfoList title="Client Information - General" data={clientInfoGeneralData} />
                    <InfoList title="Client Information - Retirement Earnings" data={retirementEarningsData} />
                    <InfoList className="overall-info" data={lifetimeBenefitsData} notes="These values consider a COLA of 0% per year. Click HERE for information on COLA from the Social Security Administration." layout="vertical" column={3} />
                    <InfoList title="Spouse/Partner Information - General" data={spouseInfoGeneralData} />
                    <InfoList title="Spouse/Partner Information - Retirement Earnings" data={SpouseRetirementEarningsData} />
                    <InfoList className="overall-info" data={lifetimeBenefitsData} notes="These values consider a COLA of 0% per year. Click HERE for information on COLA from the Social Security Administration." layout="vertical" column={3} />
                </div>
            </div>
        )
    }
}


export default connect()(SocialSecurity);