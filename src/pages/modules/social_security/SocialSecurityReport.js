import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';

class SocialSecurityReport extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        
        const cols = [
            {
              title: '',
              dataIndex: 'col1',
              key: 'col1'
            },
            {
                title: '',
                key: 'edit',
                render: (text, record) => (
                    <a onClick={this.props.cbToggle}>SHOW ME</a>
                ),
              },
        ];
          
        const rows = [
            {
                key: '1',
                col1: 'Enter an age (with months) to compare taking early benefits to Full Retirement Age benefits',
            },
            {
                key: '2',
                col1: 'Enter an age (with months) to compare taking benefits to age 70 benefits',
            },
            {
                key: '3',
                col1: 'For Spouse: Enter age (with months) to compare taking spousal benefits early to Full Retirement Age benefits',
            },
            {
                key: '4',
                col1: 'Compare Social Security benefits using to any two ages',
            },
        ];

        return (
            <React.Fragment>      
                <Table bordered showHeader={false} dataSource={rows} columns={cols} pagination={false}/>
            </React.Fragment>
        )
    }
}


export default connect()(SocialSecurityReport);