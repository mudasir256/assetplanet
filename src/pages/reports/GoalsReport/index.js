import React, { Component } from 'react';
import { connect } from 'react-redux';

/* *** Antd Components *** */
import { Row } from 'antd';

/* *** Custom Components *** */
import PageTitle from '../../../components/layout/PageTitle';
import ReportInfoRow from '../../../components/shared/ReportInfo';
import Synopsis from '../../../components/layout/Synopsis/Synopsis';
import GoalRow from './modals/GoalRow';

/* *** Images *** */
import Logo from '../../../assets/images/abstract-dynamic-logo-vector.jpg'

class GoalsReport extends Component {
    render() {
        const goalReportData = [
            {
                'title': 'Goal 1 : Gettin\' Hitched',
                'have': '20,000',
                'need': '0',
                'color': 'purple',
                dataSets: [
                    {
                        'label': 'Amount Needed',
                        'value': ''
                    },
                    {
                        'label': 'Assets Assigned to Goal ',
                        'value': ''
                    },
                    {
                        'label': 'Goal Date',
                        'value': '06/02/2025'
                    },
                    {
                        'label': 'Goal Assigned To',
                        'value': 'Frank Jones'
                    },
                    {
                        'label': 'Inflation Rate',
                        'value': ''
                    },
                ]
            },
            {
                'title': 'Goal 2 : Sparkles EVERYWHERE!',
                'have': '20,000',
                'need': '0',
                'color': 'green',
                dataSets: [
                    {
                        'label': 'Amount Needed',
                        'value': ''
                    },
                    {
                        'label': 'Assets Assigned to Goal ',
                        'value': ''
                    },
                    {
                        'label': 'Goal Date',
                        'value': '06/02/2025'
                    },
                    {
                        'label': 'Goal Assigned To',
                        'value': 'Frank Jones'
                    },
                    {
                        'label': 'Inflation Rate',
                        'value': ''
                    },
                ]
            },
            {
                'title': 'Goal 3 : Pants Optional',
                'have': '20,000',
                'need': '0',
                'color': 'maroon',
                dataSets: [
                    {
                        'label': 'Amount Needed',
                        'value': ''
                    },
                    {
                        'label': 'Assets Assigned to Goal ',
                        'value': ''
                    },
                    {
                        'label': 'Goal Date',
                        'value': '06/02/2025'
                    },
                    {
                        'label': 'Goal Assigned To',
                        'value': 'Frank Jones'
                    },
                    {
                        'label': 'Inflation Rate',
                        'value': ''
                    },
                ]
            },
            {
                'title': 'Goal 4 : BEWBS',
                'have': '20,000',
                'need': '0',
                'color': 'blue',
                dataSets: [
                    {
                        'label': 'Amount Needed',
                        'value': ''
                    },
                    {
                        'label': 'Assets Assigned to Goal ',
                        'value': ''
                    },
                    {
                        'label': 'Goal Date',
                        'value': '06/02/2025'
                    },
                    {
                        'label': 'Goal Assigned To',
                        'value': 'Frank Jones'
                    },
                    {
                        'label': 'Inflation Rate',
                        'value': ''
                    },
                ]
            },
            {
                'title': 'Goal 5 : Muscle. Tough.',
                'have': '20,000',
                'need': '0',
                'color': 'orange',
                dataSets: [
                    {
                        'label': 'Amount Needed',
                        'value': ''
                    },
                    {
                        'label': 'Assets Assigned to Goal ',
                        'value': ''
                    },
                    {
                        'label': 'Goal Date',
                        'value': '06/02/2025'
                    },
                    {
                        'label': 'Goal Assigned To',
                        'value': 'Frank Jones'
                    },
                    {
                        'label': 'Inflation Rate',
                        'value': ''
                    },
                ]
            },
            {
                'title': 'Goal 6 : ROAD TRIP',
                'have': '20,000',
                'need': '0',
                'color': 'navy',
                dataSets: [
                    {
                        'label': 'Amount Needed',
                        'value': ''
                    },
                    {
                        'label': 'Assets Assigned to Goal ',
                        'value': ''
                    },
                    {
                        'label': 'Goal Date',
                        'value': '06/02/2025'
                    },
                    {
                        'label': 'Goal Assigned To',
                        'value': 'Frank Jones'
                    },
                    {
                        'label': 'Inflation Rate',
                        'value': ''
                    },
                ]
            },
            {
                'title': 'Goal 7 : Testing',
                'have': '20,000',
                'need': '0',
                'color': 'gray',
                dataSets: [
                    {
                        'label': 'Amount Needed',
                        'value': ''
                    },
                    {
                        'label': 'Assets Assigned to Goal ',
                        'value': ''
                    },
                    {
                        'label': 'Goal Date',
                        'value': '06/02/2025'
                    },
                    {
                        'label': 'Goal Assigned To',
                        'value': 'Frank Jones'
                    },
                    {
                        'label': 'Inflation Rate',
                        'value': ''
                    },
                ]
            },
            {
                'title': 'Goal 8 : Corvette\'s for Christmas',
                'have': '20,000',
                'need': '0',
                'color': 'purple',
                dataSets: [
                    {
                        'label': 'Amount Needed',
                        'value': ''
                    },
                    {
                        'label': 'Assets Assigned to Goal ',
                        'value': ''
                    },
                    {
                        'label': 'Goal Date',
                        'value': '06/02/2025'
                    },
                    {
                        'label': 'Goal Assigned To',
                        'value': 'Frank Jones'
                    },
                    {
                        'label': 'Inflation Rate',
                        'value': ''
                    },
                ]
            },
            {
                'title': 'Goal 9 : Just Buying Stuff',
                'have': '20,000',
                'need': '0',
                'color': 'green',
                dataSets: [
                    {
                        'label': 'Amount Needed',
                        'value': ''
                    },
                    {
                        'label': 'Assets Assigned to Goal ',
                        'value': ''
                    },
                    {
                        'label': 'Goal Date',
                        'value': '06/02/2025'
                    },
                    {
                        'label': 'Goal Assigned To',
                        'value': 'Frank Jones'
                    },
                    {
                        'label': 'Inflation Rate',
                        'value': ''
                    },
                ]
            },
            {
                'title': 'Goal 10 : TESTING LOAN',
                'have': '20,000',
                'need': '0',
                'color': 'maroon',
                dataSets: [
                    {
                        'label': 'Amount Needed',
                        'value': ''
                    },
                    {
                        'label': 'Assets Assigned to Goal ',
                        'value': ''
                    },
                    {
                        'label': 'Goal Date',
                        'value': '06/02/2025'
                    },
                    {
                        'label': 'Goal Assigned To',
                        'value': 'Frank Jones'
                    },
                    {
                        'label': 'Inflation Rate',
                        'value': ''
                    },
                ]
            },
            {
                'title': 'Goal 11 : Surgery test loan',
                'have': '20,000',
                'need': '0',
                'color': 'blue',
                dataSets: [
                    {
                        'label': 'Amount Needed',
                        'value': ''
                    },
                    {
                        'label': 'Assets Assigned to Goal ',
                        'value': ''
                    },
                    {
                        'label': 'Goal Date',
                        'value': '06/02/2025'
                    },
                    {
                        'label': 'Goal Assigned To',
                        'value': 'Frank Jones'
                    },
                    {
                        'label': 'Inflation Rate',
                        'value': ''
                    },
                ]
            },
            {
                'title': 'Goal 12 : Vacation Home',
                'have': '20,000',
                'need': '0',
                'color': 'orange',
                dataSets: [
                    {
                        'label': 'Amount Needed',
                        'value': ''
                    },
                    {
                        'label': 'Assets Assigned to Goal ',
                        'value': ''
                    },
                    {
                        'label': 'Goal Date',
                        'value': '06/02/2025'
                    },
                    {
                        'label': 'Goal Assigned To',
                        'value': 'Frank Jones'
                    },
                    {
                        'label': 'Inflation Rate',
                        'value': ''
                    },
                ]
            },
            {
                'title': 'Goal 13 : Buy Vacation Home',
                'have': '20,000',
                'need': '0',
                'color': 'navy',
                dataSets: [
                    {
                        'label': 'Amount Needed',
                        'value': ''
                    },
                    {
                        'label': 'Assets Assigned to Goal ',
                        'value': ''
                    },
                    {
                        'label': 'Goal Date',
                        'value': '06/02/2025'
                    },
                    {
                        'label': 'Goal Assigned To',
                        'value': 'Frank Jones'
                    },
                    {
                        'label': 'Inflation Rate',
                        'value': ''
                    },
                ]
            },
            {
                'title': 'Goal 14 : 135 Main St',
                'have': '20,000',
                'need': '0',
                'color': 'gray',
                dataSets: [
                    {
                        'label': 'Amount Needed',
                        'value': ''
                    },
                    {
                        'label': 'Assets Assigned to Goal ',
                        'value': ''
                    },
                    {
                        'label': 'Goal Date',
                        'value': '06/02/2025'
                    },
                    {
                        'label': 'Goal Assigned To',
                        'value': 'Frank Jones'
                    },
                    {
                        'label': 'Inflation Rate',
                        'value': ''
                    },
                ]
            },
            {
                'title': 'Goal 15 : Let\'s Buy a Rental',
                'have': '20,000',
                'need': '0',
                'color': 'purple',
                dataSets: [
                    {
                        'label': 'Amount Needed',
                        'value': ''
                    },
                    {
                        'label': 'Assets Assigned to Goal ',
                        'value': ''
                    },
                    {
                        'label': 'Goal Date',
                        'value': '06/02/2025'
                    },
                    {
                        'label': 'Goal Assigned To',
                        'value': 'Frank Jones'
                    },
                    {
                        'label': 'Inflation Rate',
                        'value': ''
                    },
                ]
            },
            {
                'title': 'Goal 16 : Testing Asset Assoc',
                'have': '20,000',
                'need': '0',
                'color': 'green',
                dataSets: [
                    {
                        'label': 'Amount Needed',
                        'value': ''
                    },
                    {
                        'label': 'Assets Assigned to Goal ',
                        'value': ''
                    },
                    {
                        'label': 'Goal Date',
                        'value': '06/02/2025'
                    },
                    {
                        'label': 'Goal Assigned To',
                        'value': 'Frank Jones'
                    },
                    {
                        'label': 'Inflation Rate',
                        'value': ''
                    },
                ]
            },
            {
                'title': 'Goal 17 : Testing Asset Creation',
                'have': '20,000',
                'need': '0',
                'color': 'maroon',
                dataSets: [
                    {
                        'label': 'Amount Needed',
                        'value': ''
                    },
                    {
                        'label': 'Assets Assigned to Goal ',
                        'value': ''
                    },
                    {
                        'label': 'Goal Date',
                        'value': '06/02/2025'
                    },
                    {
                        'label': 'Goal Assigned To',
                        'value': 'Frank Jones'
                    },
                    {
                        'label': 'Inflation Rate',
                        'value': ''
                    },
                ]
            },
            {
                'title': 'Goal 18 : test goal',
                'have': '20,000',
                'need': '0',
                'color': 'blue',
                dataSets: [
                    {
                        'label': 'Amount Needed',
                        'value': ''
                    },
                    {
                        'label': 'Assets Assigned to Goal ',
                        'value': ''
                    },
                    {
                        'label': 'Goal Date',
                        'value': '06/02/2025'
                    },
                    {
                        'label': 'Goal Assigned To',
                        'value': 'Frank Jones'
                    },
                    {
                        'label': 'Inflation Rate',
                        'value': ''
                    },
                ]
            },
            {
                'title': 'Goal 19 : new goal',
                'have': '20,000',
                'need': '0',
                'color': 'orange',
                dataSets: [
                    {
                        'label': 'Amount Needed',
                        'value': ''
                    },
                    {
                        'label': 'Assets Assigned to Goal ',
                        'value': ''
                    },
                    {
                        'label': 'Goal Date',
                        'value': '06/02/2025'
                    },
                    {
                        'label': 'Goal Assigned To',
                        'value': 'Frank Jones'
                    },
                    {
                        'label': 'Inflation Rate',
                        'value': ''
                    },
                ]
            },
            {
                'title': 'Goal 20 : Gonna Retire',
                'have': '20,000',
                'need': '0',
                'color': 'navy',
                dataSets: [
                    {
                        'label': 'Amount Needed',
                        'value': ''
                    },
                    {
                        'label': 'Assets Assigned to Goal ',
                        'value': ''
                    },
                    {
                        'label': 'Goal Date',
                        'value': '06/02/2025'
                    },
                    {
                        'label': 'Goal Assigned To',
                        'value': 'Frank Jones'
                    },
                    {
                        'label': 'Inflation Rate',
                        'value': ''
                    },
                ]
            },
        ];

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

        return (
            <div className="pageWrapper">
                <PageTitle title="Goals Report" />
                <Synopsis content="Analysis of each Goal" />
                <ReportInfoRow data={reportInfoData} />
                <Row type="flex" justify="center" style={{ margin: '12px 0 30px' }}>
                    <img src={Logo} alt="" style={{ height : '130px' }} /> 
                </Row>
                {goalReportData.map((data, index) => (
                    <GoalRow data={data} />
                ))}
            </div>
        )
    }
}


export default connect()(GoalsReport);