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

class GeneralInformation extends Component {
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

        const clientDetailsData = [
            {
                'label': 'Client',
                'value': 'Bill Client'
            },
            {
                'label': 'Client Date of Birth',
                'value': '01/01/1980'
            },
            {
                'label': 'Client Phone Number - Primary',
                'value': ''
            },
            {
                'label': 'Client Email Address - Primary',
                'value': 'hideinplainsight@yahoo.com'
            },
            {
                'label': 'Address',
                'value': '123 Main St., Anytown, California, 00010, United States'
            }
        ];

        const spouseDetailsData = [
            {
                'label': 'Spouse',
                'value': 'Tracy Jones'
            },
            {
                'label': 'Spouse Date of Birth',
                'value': '01/01/1980'
            },
            {
                'label': 'Spouse Phone Number - Primary',
                'value': ''
            },
            {
                'label': 'Spouse Email Address - Primary',
                'value': 'hideinplainsight@yahoo.com'
            },
            {
                'label': 'Address',
                'value': '123 Main St., Anytown, California, 00010, United States'
            }
        ];

        const clientOtherDetailsData = [
            {
                'label': 'Children and Other Dependents',
                'value': 'Ava Jones'
            },
            {
                'label': 'General Notes',
                'value': '01/01/1980'
            },
            {
                'label': 'Trusts Associated with Client',
                'value': 'Frank and Tracy Trust - 03/27/2019 - Trust for test client - 03/25/2019'
            },
            {
                'label': 'Corporations Associated with Client',
                'value': 'Jones, LLC'
            },
            {
                'label': 'Charities Associated with Client',
                'value': 'Audobon Society National Parks'
            },
            {
                'label': 'Others Financially Impacted By This Plan',
                'value': 'Joe Friend'
            },
        ];

        const taxAndInflationDetails = [
            {
                'label': 'State Taxation',
                'value': 'CA'
            },
            {
                'label': 'Tax Filing Election',
                'value': 'Married Filing Jointly'
            },
            {
                'label': 'Deductions',
                'value': 'Itemized'
            },
            {
                'label': 'State Tax Effective Rate',
                'value': '7.5%'
            },
            {
                'label': 'Federal Tax Rate',
                'value': '24.0%'
            },
            {
                'label': 'Total Tax Rate',
                'value': '31.5%'
            },
            {
                'label': 'General Inflation Rate',
                'value': '2.2%'
            },
            {
                'label': 'Medical Inflation Rate',
                'value': '6.00%'
            },
            {
                'label': 'Education Inflation Rate',
                'value': '7.00%'
            },
            {
                'label': 'Luxury Inflation Rate',
                'value': '6.00%'
            },
            {
                'label': 'Housing Inflation Rate',
                'value': '3.00%'
            }
        ];

        return (
            <div className="pageWrapper">
                <PageTitle title="General Information Report" />
                <Synopsis content="General Information, Taxation and Inflation" />
                <ReportInfoRow data={reportInfoData} />
                <Row type="flex" justify="center" style={{ margin: '12px 0 20px' }}>
                    <img src={Logo} alt="" style={{ height : '130px' }} /> 
                </Row>
                <div className="pageContent">
                    <InfoList title="Client and Spouse Details" data={clientDetailsData} />
                    <InfoList title="" data={spouseDetailsData} />
                    <InfoList title="" data={clientOtherDetailsData} />
                    <InfoList title="Tax and Inflation Details" data={taxAndInflationDetails} />
                </div>
            </div>
        )
    }
}


export default connect()(GeneralInformation);