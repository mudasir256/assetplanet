import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Input, Button, Checkbox, Icon } from 'antd';

import SubFormTable from '../../../components/SubFormTable';


class MonteCarloRateSubForm extends Component {

    constructor(props) {
        super(props);

    }
    goPreviousForm(){
        this.props.cbGoSubForm("UserDefinedSubForm");
    }

    render() {        

        const cols = [
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
                render: (text, record) => (
                    <Input />
                ),
            },
            {
                title: 'How Many Years',
                dataIndex: 'years',
                key: 'years',
                render: (text, record) => (
                    <Input />
                ),
            },
            {
                title: 'High Band',
                dataIndex: 'high_band',
                key: 'high_band',
                render: (text, record) => (
                    <Input addonAfter="%"  defaultValue="" />
                ),
            },
            {
                title: 'Low Band',
                dataIndex: 'low_band',
                key: 'low_band',
                render: (text, record) => (
                    <Input addonAfter="%"  defaultValue="" />
                ),
            },
            {
                title: 'Expected Average',
                dataIndex: 'expected_average',
                key: 'expected_average',
                render: (text, record) => (
                    <Input />
                ),
            },
            {
                title: 'Start Year',
                dataIndex: 'start_year',
                key: 'start_year',
                render: (text, record) => (
                    <Input />
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
            },
        ]; 
        return (
            <React.Fragment>
                <div>
                    <SubFormTable title="Add New Monte Carlo" rows={rows} cols={cols}></SubFormTable>
                    <div style={{'textAlign': 'center'}}>
                        <Button type="link" onClick={this.addNewRow}>Add New</Button>
                    </div>
                </div>
                <div className="row justify-content-between">
                    <div className="col-8">
                        <Button type="primary" size={'large'} onClick={() => this.goPreviousForm()}>
                            <Icon type="left" />
                            Previous
                        </Button>
                    </div>
                    <div className="col-4 d-flex justify-content-end">
                        {
                            this.props.dataID != null && 
                            <Button type="primary" size={'large'} style={{marginRight: '10px'}} onClick={() => this.goNextForm(true)}>
                                Update
                            </Button>
                        }
                        <Button type="primary" disabled={ !this.state.enableNext } size={'large'} onClick={() => this.goNextForm()}>
                            Next
                            <Icon type="right" />
                        </Button>
                    </div>
                </div>
            </React.Fragment>       
        )
    }
}


export default connect()(MonteCarloRateSubForm);