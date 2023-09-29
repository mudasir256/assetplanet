import React, { Component } from 'react';

/* *** Antd Components *** */
import { Row
 } from 'antd';

/* *** Custom Components *** */
import PageTitle from '../../../components/layout/PageTitle';
import ReportInfoRow from '../../../components/shared/ReportInfo';
import TableReport from '../../../components/layout/TableReport';
import MainTitle from '../../../components/layout/MainTitle';
import Navigation from './modals/Navigation';

/* *** Images *** */
import Logo from '../../../assets/images/abstract-dynamic-logo-vector.jpg'

const percent = 3;
const percentage = percent/100;


function calculation(x = 200) {
    var value = x;
    return () => {
        value = value + (value*percentage)
        return '$'+value.toFixed(2);
    }
}

class InsurancePayout extends Component {

    constructor(props){
        super(props)
        this.valueFunc = calculation();
    }

    resetFunction () {
        let tempVal = this.valueFunc();
        this.valueFunc = calculation();
        return tempVal;
    }
    totalText (text) {
        let data = text.split("-");
        if (data.length > 1)
          return <h5 style={{color: '#292323'}} className="font-weight-bold" >{data[1]}</h5>;
        else return text;
    }

    render() {
        const reportInfoData = [
            {
                'title': 'Company Name',
                'value': 'Asset Planet'
            },
            {
                'title': 'Presented By',
                'value': 'Adam Meyers'
            },
            {
                'title': 'Title',
                'value': 'Financial Advisor'
            },
            {
                'title': 'Client Name',
                'value': 'Bill Client'
            },
            {
                'title': 'Plan Nickname',
                'value': 'First Plan'
            },
        ];

        const insurancePayoutCols = [
            {
                title: 'Insurance Payout',
                dataIndex: 'insurance_payout',
                key: 'insurance_payout',
            },
            {
                title: '2019',
                dataIndex: '2019',
                key: '2019',
                render: (text) => this.totalText(text)
            },
            {
                title: '2020',
                dataIndex: '2020',
                key: '2020',
                render: (text) => this.totalText(text)
            },
            {
                title: '2021',
                dataIndex: '2021',
                key: '2021',
                render: (text) => this.totalText(text)
            },
            {
                title: '2022',
                dataIndex: '2022',
                key: '2022',
                render: (text) => this.totalText(text)
            },
        ];

        const insurancePayoutRows = [
            {
                key: '1',
                insurance_payout: 'Term for Victor',
                '2019': this.valueFunc(),
                '2020': this.valueFunc(),
                '2021': this.valueFunc(),
                '2022': this.valueFunc(),
            },
            {
                key: '2',
                insurance_payout: <h5 style={{color: '#ff726f'}} className="font-weight-bold">{'Total Insurance Payout'}</h5>,
                '2019': 'total-$122.00',
                '2020': 'total-$152.30',
                '2021': 'total-$312.00',
                '2022': 'total-$512.00',
            },
        ];

        return (
            <div className="pageWrapper">
                <PageTitle title="All Items Report" />
                <ReportInfoRow data={reportInfoData} />
                <Row type="flex" justify="center" style={{ margin: '12px 0' }}>
                    <img src={Logo} alt="" style={{ height : '130px' }} /> 
                </Row>
                <Navigation />
                <MainTitle title="Insurance Payout" level={4} />
                <div>
                    <TableReport title="Insurance Payout" rows={insurancePayoutRows} cols={insurancePayoutCols} />
                </div>
            </div>
        )
    }
}

export default InsurancePayout;