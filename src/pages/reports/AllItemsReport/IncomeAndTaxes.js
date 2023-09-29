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


class IncomeAndTaxes extends Component {

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

        const incomeCols = [
            {
                title: 'Income',
                dataIndex: 'income',
                key: 'income',
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

        const incomeRows = [
            {
                key: '1',
                income: 'Work Income',
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
                income: 'Spouse Work Income',
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
                income: 'Rental Income',
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
                income: 'Assistance Received',
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
                income: <h5 style={{color: '#ff726f'}} className="text-center font-weight-bold">{'Total Income'}</h5>,
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

        const taxesCols = [
            {
                title: 'Taxes',
                dataIndex: 'taxes',
                key: 'taxes',
            },
            {
                title: '2019',
                dataIndex: '2019',
                key: '2019',
            },
            {
                title: '2020',
                dataIndex: '2020',
                key: '2020',
            },
            {
                title: '2021',
                dataIndex: '2021',
                key: '2021',
            },
            {
                title: '2022',
                dataIndex: '2022',
                key: '2022',
            },
            {
                title: '2023',
                dataIndex: '2023',
                key: '2023',
            },
            {
                title: '2024',
                dataIndex: '2024',
                key: '2024',
            },
            {
                title: '2025',
                dataIndex: '2025',
                key: '2025',
            },
            {
                title: '2026',
                dataIndex: '2026',
                key: '2026',
            },
            {
                title: '2027',
                dataIndex: '2027',
                key: '2027',
            },
            {
                title: '2028',
                dataIndex: '2028',
                key: '2028',
            },
            {
                title: '2029',
                dataIndex: '2029',
                key: '2029',
            },
            {
                title: '2030',
                dataIndex: '2030',
                key: '2030',
            },
            {
                title: '2031',
                dataIndex: '2031',
                key: '2031',
            },
            {
                title: '2032',
                dataIndex: '2032',
                key: '2032',
            },
            {
                title: '2033',
                dataIndex: '2033',
                key: '2033',
            },
            {
                title: '2034',
                dataIndex: '2034',
                key: '2034',
            },
            {
                title: '2035',
                dataIndex: '2035',
                key: '2035',
            },
            {
                title: '2036',
                dataIndex: '2036',
                key: '2036',
            },
            {
                title: '2037',
                dataIndex: '2037',
                key: '2037',
            },
            {
                title: '2038',
                dataIndex: '2038',
                key: '2038',
            },
            {
                title: '2039',
                dataIndex: '2039',
                key: '2039',
            },
        ];

        const taxesRows = [
            {
                key: '1',
                taxes: '# Dependents',
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
                taxes: 'Total $ Deduction',
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
                taxes: 'Itemized or Standard',
                '2019': 'Standard',
                '2020': 'Standard',
                '2021': 'Standard',
                '2022': 'Standard',
                '2023': 'Standard',
                '2024': 'Standard',
                '2025': 'Standard',
                '2026': 'Standard',
                '2027': 'Standard',
                '2028': 'Standard',
                '2029': 'Standard',
                '2030': 'Standard',
                '2031': 'Standard',
                '2032': 'Standard',
                '2033': 'Standard',
                '2034': 'Standard',
                '2035': 'Standard',
                '2036': 'Standard',
                '2037': 'Standard',
                '2038': 'Standard',
                '2039': 'Standard',
            },
            {
                key: '4',
                taxes: 'Carry Forward',
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
                taxes: 'Filing Status',
                '2019': 'Jointly',
                '2020': 'Jointly',
                '2021': 'Jointly',
                '2022': 'Jointly',
                '2023': 'Jointly',
                '2024': 'Jointly',
                '2025': 'Jointly',
                '2026': 'Jointly',
                '2027': 'Jointly',
                '2028': 'Jointly',
                '2029': 'Jointly',
                '2030': 'Jointly',
                '2031': 'Jointly',
                '2032': 'Jointly',
                '2033': 'Jointly',
                '2034': 'Jointly',
                '2035': 'Jointly',
                '2036': 'Jointly',
                '2037': 'Jointly',
                '2038': 'Jointly',
                '2039': 'Jointly',
            },
            {
                key: '6',
                taxes: 'State',
                '2019': 'CA',
                '2020': 'CA',
                '2021': 'CA',
                '2022': 'CA',
                '2023': 'CA',
                '2024': 'CA',
                '2025': 'CA',
                '2026': 'CA',
                '2027': 'CA',
                '2028': 'CA',
                '2029': 'CA',
                '2030': 'CA',
                '2031': 'CA',
                '2032': 'CA',
                '2033': 'CA',
                '2034': 'CA',
                '2035': 'CA',
                '2036': 'CA',
                '2037': 'CA',
                '2038': 'CA',
                '2039': 'CA',
            },
            {
                key: '7',
                taxes: 'Federal Tax Rate',
                '2019': '24',
                '2020': '24',
                '2021': '24',
                '2022': '24',
                '2023': '24',
                '2024': '24',
                '2025': '24',
                '2026': '24',
                '2027': '24',
                '2028': '24',
                '2029': '24',
                '2030': '24',
                '2031': '24',
                '2032': '24',
                '2033': '24',
                '2034': '24',
                '2035': '24',
                '2036': '24',
                '2037': '24',
                '2038': '24',
                '2039': '24',
            },
            {
                key: '8',
                taxes: 'State Eff %',
                '2019': '9.3',
                '2020': '9.3',
                '2021': '9.3',
                '2022': '9.3',
                '2023': '9.3',
                '2024': '9.3',
                '2025': '9.3',
                '2026': '9.3',
                '2027': '9.3',
                '2028': '9.3',
                '2029': '9.3',
                '2030': '9.3',
                '2031': '9.3',
                '2032': '9.3',
                '2033': '9.3',
                '2034': '9.3',
                '2035': '9.3',
                '2036': '9.3',
                '2037': '9.3',
                '2038': '9.3',
                '2039': '9.3',

            },
            {
                key: '9',
                taxes: 'Federal $',
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
                key: '10',
                taxes: 'State $',
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
        ];

        return (
            <div className="pageWrapper">
                <PageTitle title="All Items Report" />
                <ReportInfoRow data={reportInfoData} />
                <Row type="flex" justify="center" style={{ margin: '12px 0' }}>
                    <img src={Logo} alt="" style={{ height : '130px' }} /> 
                </Row>
                <Navigation />
                <MainTitle title="Income and Taxes" level={4} />
                <div>
                    <TableReport title="Income" rows={incomeRows} cols={incomeCols} />
                </div>
                <div>
                    <TableReport title="Taxes" rows={taxesRows} cols={taxesCols} />
                </div>
            </div>
        )
    }
}

export default IncomeAndTaxes;