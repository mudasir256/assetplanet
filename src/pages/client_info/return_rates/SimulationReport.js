import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';

class SimulationReport extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rows: []
        }
    }

    componentDidMount() {
        let rows = [];
        for(var index = 0; index < this.props.data.length; index++)
        {
            rows.push({
                key: '' + index,
                description: this.props.data[index]['description'],
                years: this.props.data[index]['howManyYears'],
                high_band: this.props.data[index]['highBand'],
                low_band: this.props.data[index]['lowBand'],
                expected_average: this.props.data[index]['expectedAverage'],
                start_year: this.props.data[index]['startYear'],
                average: this.props.data[index]['average'],
            })
        }

        this.setState({
            rows: rows
        })
    }

    render() {
        
        const cols = [
            {
              title: 'Description',
              dataIndex: 'description',
              key: 'description'
            },
            {
              title: 'How Many Years',
              dataIndex: 'years',
              key: 'years',
            },
            {
                title: 'High Band',
                dataIndex: 'high_band',
                key: 'high_band',
            },
            {
                title: 'Low Band',
                dataIndex: 'low_band',
                key: 'low_band',
            },
            {
                title: 'Expected Average',
                dataIndex: 'expected_average',
                key: 'expected_average',
            },
            {
                title: 'Start Year',
                dataIndex: 'start_year',
                key: 'start_year',
            },
            {
                title: 'Average',
                dataIndex: 'average',
                key: 'average',
            }
        ];
          
        return (
            <React.Fragment>      
                <h4 className="title">Monte Carlo Simulation (Limit 20)</h4>          
                <Table bordered dataSource={this.state.rows} columns={cols} pagination={false}/>
            </React.Fragment>
        )
    }
}


export default connect()(SimulationReport);