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


class AssetsItemReport extends Component {

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
          return <h5 style={{color: '#292323'}} className="text-center font-weight-bold" >{data[1]}</h5>;
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

        const assetsCols = [
            {
                title: 'Assets',
                dataIndex: 'assets',
                key: 'assets',
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
            {
                title: '2023',
                dataIndex: '2023',
                key: '2023',
                render: (text) => this.totalText(text)
            },
            {
                title: '2024',
                dataIndex: '2024',
                key: '2024',
                render: (text) => this.totalText(text)
            },
            {
                title: '2025',
                dataIndex: '2025',
                key: '2025',
                render: (text) => this.totalText(text)
            },
            {
                title: '2026',
                dataIndex: '2026',
                key: '2026',
                render: (text) => this.totalText(text)
            },
            {
                title: '2027',
                dataIndex: '2027',
                key: '2027',
                render: (text) => this.totalText(text)
            },
            {
                title: '2028',
                dataIndex: '2028',
                key: '2028',
                render: (text) => this.totalText(text)
            },
            {
                title: '2029',
                dataIndex: '2029',
                key: '2029',
                render: (text) => this.totalText(text)
            },
            {
                title: '2030',
                dataIndex: '2030',
                key: '2030',
                render: (text) => this.totalText(text)
            },
            {
                title: '2031',
                dataIndex: '2031',
                key: '2031',
                render: (text) => this.totalText(text)
            },
            {
                title: '2032',
                dataIndex: '2032',
                key: '2032',
                render: (text) => this.totalText(text)
            },
            {
                title: '2033',
                dataIndex: '2033',
                key: '2033',
                render: (text) => this.totalText(text)
            },
            {
                title: '2034',
                dataIndex: '2034',
                key: '2034',
                render: (text) => this.totalText(text)
            },
            {
                title: '2035',
                dataIndex: '2035',
                key: '2035',
                render: (text) => this.totalText(text)
            },
            {
                title: '2036',
                dataIndex: '2036',
                key: '2036',
                render: (text) => this.totalText(text)
            },
            {
                title: '2037',
                dataIndex: '2037',
                key: '2037',
                render: (text) => this.totalText(text)
            },
            {
                title: '2038',
                dataIndex: '2038',
                key: '2038',
                render: (text) => this.totalText(text)
            },
            {
                title: '2039',
                dataIndex: '2039',
                key: '2039',
                render: (text) => this.totalText(text)
            },
        ];

        const assetsRows = [
            {
                key: '1',
                assets: 'Checking Account',
                '2019': this.valueFunc(),
                '2020': this.valueFunc(),
                '2021': this.valueFunc(),
                '2022': this.valueFunc(),
                '2023': this.valueFunc(),
                '2024': this.valueFunc(),
                '2025': this.valueFunc(),
                '2026': this.valueFunc(),
                '2027': this.valueFunc(),
                '2028': this.valueFunc(),
                '2029': this.valueFunc(),
                '2030': this.valueFunc(),
                '2031': this.valueFunc(),
                '2032': this.valueFunc(),
                '2033': this.valueFunc(),
                '2034': this.valueFunc(),
                '2035': this.valueFunc(),
                '2036': this.valueFunc(),
                '2037': this.valueFunc(),
                '2038': this.valueFunc(),
                '2039': this.resetFunction(),
            },
            {
                key: '2',
                assets: 'Brokerage Account',
                '2019': this.valueFunc(),
                '2020': this.valueFunc(),
                '2021': this.valueFunc(),
                '2022': this.valueFunc(),
                '2023': this.valueFunc(),
                '2024': this.valueFunc(),
                '2025': this.valueFunc(),
                '2026': this.valueFunc(),
                '2027': this.valueFunc(),
                '2028': this.valueFunc(),
                '2029': this.valueFunc(),
                '2030': this.valueFunc(),
                '2031': this.valueFunc(),
                '2032': this.valueFunc(),
                '2033': this.valueFunc(),
                '2034': this.valueFunc(),
                '2035': this.valueFunc(),
                '2036': this.valueFunc(),
                '2037': this.valueFunc(),
                '2038': this.valueFunc(),
                '2039': this.resetFunction(),
            },
            {
                key: '3',
                assets: 'Principal Home',
                '2019': this.valueFunc(),
                '2020': this.valueFunc(),
                '2021': this.valueFunc(),
                '2022': this.valueFunc(),
                '2023': this.valueFunc(),
                '2024': this.valueFunc(),
                '2025': this.valueFunc(),
                '2026': this.valueFunc(),
                '2027': this.valueFunc(),
                '2028': this.valueFunc(),
                '2029': this.valueFunc(),
                '2030': this.valueFunc(),
                '2031': this.valueFunc(),
                '2032': this.valueFunc(),
                '2033': this.valueFunc(),
                '2034': this.valueFunc(),
                '2035': this.valueFunc(),
                '2036': this.valueFunc(),
                '2037': this.valueFunc(),
                '2038': this.valueFunc(),
                '2039': this.resetFunction(),
            },
            {
                key: '4',
                assets: '401k',
                '2019': this.valueFunc(),
                '2020': this.valueFunc(),
                '2021': this.valueFunc(),
                '2022': this.valueFunc(),
                '2023': this.valueFunc(),
                '2024': this.valueFunc(),
                '2025': this.valueFunc(),
                '2026': this.valueFunc(),
                '2027': this.valueFunc(),
                '2028': this.valueFunc(),
                '2029': this.valueFunc(),
                '2030': this.valueFunc(),
                '2031': this.valueFunc(),
                '2032': this.valueFunc(),
                '2033': this.valueFunc(),
                '2034': this.valueFunc(),
                '2035': this.valueFunc(),
                '2036': this.valueFunc(),
                '2037': this.valueFunc(),
                '2038': this.valueFunc(),
                '2039': this.resetFunction(),
            },
            {
                key: '5',
                assets: '529',
                '2019': this.valueFunc(),
                '2020': this.valueFunc(),
                '2021': this.valueFunc(),
                '2022': this.valueFunc(),
                '2023': this.valueFunc(),
                '2024': this.valueFunc(),
                '2025': this.valueFunc(),
                '2026': this.valueFunc(),
                '2027': this.valueFunc(),
                '2028': this.valueFunc(),
                '2029': this.valueFunc(),
                '2030': this.valueFunc(),
                '2031': this.valueFunc(),
                '2032': this.valueFunc(),
                '2033': this.valueFunc(),
                '2034': this.valueFunc(),
                '2035': this.valueFunc(),
                '2036': this.valueFunc(),
                '2037': this.valueFunc(),
                '2038': this.valueFunc(),
                '2039': this.resetFunction(),
            },
            {
                key: '6',
                assets: 'Car',
                '2019': this.valueFunc(),
                '2020': this.valueFunc(),
                '2021': this.valueFunc(),
                '2022': this.valueFunc(),
                '2023': this.valueFunc(),
                '2024': this.valueFunc(),
                '2025': this.valueFunc(),
                '2026': this.valueFunc(),
                '2027': this.valueFunc(),
                '2028': this.valueFunc(),
                '2029': this.valueFunc(),
                '2030': this.valueFunc(),
                '2031': this.valueFunc(),
                '2032': this.valueFunc(),
                '2033': this.valueFunc(),
                '2034': this.valueFunc(),
                '2035': this.valueFunc(),
                '2036': this.valueFunc(),
                '2037': this.valueFunc(),
                '2038': this.valueFunc(),
                '2039': this.resetFunction(),
            },
            {
                key: '7',
                assets: <h5 style={{color: '#ff726f'}} className="text-center font-weight-bold">{'Total Assets'}</h5>,
                '2019': 'total-$122.00',
                '2020': 'total-$152.30',
                '2021': 'total-$312.00',
                '2022': 'total-$512.00',
                '2023': 'total-$732.00',
                '2024': 'total-$913.00',
                '2025': 'total-$1562.00',
                '2026': 'total-$1232.00',
                '2027': 'total-$1442.00',
                '2028': 'total-$1642.00',
                '2029': 'total-$1656.00',
                '2030': 'total-$1710.00',
                '2031': 'total-$1758.00',
                '2032': 'total-$1812.00',
                '2033': 'total-$1866.00',
                '2034': 'total-$1920.00',
                '2035': 'total-$1980.00',
                '2036': 'total-$2040.00',
                '2037': 'total-$2100.00',
                '2038': 'total-$2166.00',
                '2039': 'total-$2232.00',
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
                <MainTitle title="Asset Items" level={4} />
                <div>
                    <TableReport title="Assets" rows={assetsRows} cols={assetsCols} />
                </div>
            </div>
        )
    }
}

export default AssetsItemReport;