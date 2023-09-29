import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';

class UserDefinedReturnReport extends Component {

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
                year: this.props.data[index]['year'],
                percent: this.props.data[index]['percent']
            })
        }

        this.setState({
            rows: rows
        })
    }

    render() {
        
        const cols = [
            {
              title: 'Year',
              dataIndex: 'year',
              key: 'year'
            },
            {
              title: 'Percent(+ or -)',
              dataIndex: 'percent',
              key: 'percent',
            }
        ];        

        return (
            <React.Fragment>      
                <h4 className="title">User Defined Return</h4>          
                <Table bordered dataSource={this.state.rows} columns={cols} pagination={false}/>
            </React.Fragment>
        )
    }
}


export default connect()(UserDefinedReturnReport);