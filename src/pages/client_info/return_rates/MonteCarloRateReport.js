import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Row, Col, Input, Select, Button, Checkbox } from 'antd';

import SubFormTable from '../../../components/SubFormTable';

const { Option } = Select;

class MonteCarloRateReport extends Component {

    constructor(props) {
        super(props);

    }

    render() {        

        const cols = [
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
                render: (text, record) => (
                    <Input value={text}/>
                ),
            },
            {
                title: 'How Many Years',
                dataIndex: 'years',
                key: 'years',
                render: (text, record) => (
                    <Input value={text}/>
                ),
            },
            {
                title: 'High Band',
                dataIndex: 'high_band',
                key: 'high_band',
                render: (text, record) => (
                    <Input addonAfter="%"  defaultValue="" value={text} />
                ),
            },
            {
                title: 'Low Band',
                dataIndex: 'low_band',
                key: 'low_band',
                render: (text, record) => (
                    <Input addonAfter="%"  defaultValue="" value={text}/>
                ),
            },
            {
                title: 'Expected Average',
                dataIndex: 'expected_average',
                key: 'expected_average',
                render: (text, record) => (
                    <Input value={text}/>
                ),
            },
            {
                title: 'Start Year',
                dataIndex: 'start_year',
                key: 'start_year',
                render: (text, record) => (
                    <Input value={text}/>
                ),
            },
            {
                title: 'Regenerate',
                dataIndex: 'regenerate',
                key: 'regenerate',
                render: (text, record) => (
                    <Checkbox />
                ),
            },
            {
                title: 'Average',
                dataIndex: 'average',
                key: 'average',
                render: (text, record) => (
                    <Input />
                ),
            }
        ];
          
        const rows = [
            {
                key: '1',
                description: 'Monte Carlo #1',
                years: 30,
                high_band: 25,
                low_band: -20,
                expected_average: 7.00,
                start_year: 2019,
                average: 7.10
            },
        ];

        var list1_cols = [
            {
                title: 'Year',
                dataIndex: 'year',
                key: 'year'
            },
            // {
            //     title: 'Year1',
            //     dataIndex: 'year1',
            //     key: 'year1',
            //     children:[
            //         {
            //             title: '1',
            //             dataIndex: 'year1_1',
            //             key: 'year1_1'    
            //         }
            //     ]
            // },
        ]

        var list1_rows = [
            {
                key: '1',
                year: 'Return',
            }
        ]

        for(var index = 2019; index < 2048; index++){
            list1_cols.push({
                title: 'Year' + (index - 2018),
                dataIndex: 'year' + (index - 2018),
                key: 'year' + (index - 2018),
                children: [
                    {
                        title: (index - 2018),
                        dataIndex: 'year' + (index - 2018) + '_1',
                        key: 'year' + (index - 2018) + '_1'
                    }
                ]
            })
            list1_rows[0]['year' + (index - 2018) + '_1'] = 5;
        }
        
        return (
            <div>
                <SubFormTable title="Monte Carlo Simulation (Limit 20)" rows={rows} cols={cols}></SubFormTable>
                <SubFormTable title="Monte Carlo #1" rows={list1_rows} cols={list1_cols}></SubFormTable>
                <SubFormTable title="Monte Carlo #2" rows={list1_rows} cols={list1_cols}></SubFormTable>
            </div>
        )
    }
}


export default connect()(MonteCarloRateReport);