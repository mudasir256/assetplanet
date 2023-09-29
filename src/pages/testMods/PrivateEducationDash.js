import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ROLES from 'constants/roles';
/* *** Antd Components *** */
import { Modal, Row, Button, Col, Progress, Typography } from 'antd';

/* *** Custom Components *** */
import PageTitle from 'components/layout/PageTitle';
import ReportInfoRow from 'components/shared/ReportInfo';
import Synopsis from 'components/layout/Synopsis/Synopsis';
import GoalRow from 'pages/reports/GoalsReport/modals/GoalRow';

/* *** Images *** */
import Logo from 'assets/images/abstract-dynamic-logo-vector.jpg';

import { useQuery, useMutation } from '@apollo/react-hooks';
import {
    QL_GOAL_LIST,
    QL_GOAL_DELETE
} from 'constants/queries';

import Report from 'components/Report';

var fnMutationAssetsDelete = null;
var dataMutationAssetsDelete = null;

function HiddenHook(){
    [fnMutationAssetsDelete, { dataMutationAssetsDelete }] = useMutation(QL_GOAL_DELETE);

    return (
        <React.Fragment></React.Fragment>
    )
}

function LoadDBDataHook(props){
    const {data, loading, error, refetch, networkStatus } = useQuery(QL_GOAL_LIST, { notifyOnNetworkStatusChange: true });
    
    if(props.dbReload){
        console.log('reload..');
        refetch();
    }

    props.cbUpdateNetworkStatus(networkStatus);
    console.log('networkStatus:', networkStatus);
    if(data){
        props.cbLoadDBData(networkStatus, data);
    }
    
    return (
        <React.Fragment></React.Fragment>
    )
}

const { Title, Text } = Typography;

const TitleGoal = ({ color, ...rest}) => (
    <Title {...rest} style={{ fontSize: 26, color: color, marginBottom: 16 }} />
);

const ProgressTitle = ({ color, ...rest}) => (
    <Text {...rest} style={{ fontSize: 20, fontWeight: 600, color: color, textAlign: 'center' }} />
);

const ChartText = ({ color, ...rest}) => (
    <Text {...rest} style={{ fontSize: 16, color: color }} />
);

class GoalsList extends Component {
    constructor(props){
        super(props);
        this.state = {
            isOpenDelete: false,
            reload: true,

            total_assets: 0,
            dbLoaded: false,
            dbLoading: true,
            goals: [],
            report_rows: [],
            dbReload: false,
            networkStatus: 0
        }
        
        this.fnEdit = this.fnEdit.bind(this);
        this.fnView = this.fnView.bind(this);

        this.loadDBData = this.loadDBData.bind(this);
        this.updateNetworkStatus = this.updateNetworkStatus.bind(this);
    }

    fnEdit(record){
        this.props.history.push("/assets_edit/" + record.id);
    }

    fnView(record){
        this.props.history.push("/assets_view/" + record.id);
    }

    fnDelete(record){
        window.localStorage.setItem('assets_delete_id', record.id);
        this.setState({
            isOpenDelete: !this.state.isOpenDelete
        })
    }

    confirmDelete = e => {
        
        let dbID = window.localStorage.getItem('assets_delete_id');
        if(dbID != null && dbID != ''){
            fnMutationAssetsDelete({ variables: { id: dbID } })
            this.setState({
                dbReload: false,
                isOpenDelete: false
            })

            var instance = this;
            setTimeout(function(){
                instance.setState({
                    dbReload: true,
                    dbLoading: true
                })
            }, 1000)
        }
        else{
            this.setState({
                isOpenDelete: false,
            });
        }

    };
    
    handleCancel = e => {
        this.setState({
            isOpenDelete: false,
        });
    };

    loadDBData(networkStatus, data){        
        console.log('loadDBData:', data);
        
        if(this.state.networkStatus == networkStatus){
            return;
        }

        var total_assets = 0;
        var goals = [];

        for(var index = 0; index < data['goals'].length; index++){

            goals.push({
                title: data['goals'][index]['description'],
                need: index,
                have: index,
                report_rows: [
                    {
                        key: index,
                        id: data['goals'][index]['id'],
                        amount_needed: data['goals'][index]['goalFinancingInformation']['amountNeededInFutureWithInflation'] != null ? parseFloat(data['goals'][index]['goalFinancingInformation']['amountNeededInFutureWithInflation']) : 0,
                        assetsAssignedToGoal: data['goals'][index]['assetsToAssignToGoal']['assetsToAssignToGoal'],
                        goalDate: data['goals'][index]['date'],
                        assignedTo: data['goals'][index]['assignedTo'],
                        inflation: data['goals'][index]['goalFinancingInformation']['inflationRateForThisGoal']
                    }
                ]
            })
        }

        var instance = this;
        setTimeout(function(){
            instance.setState({
                goals: goals,
                dbLoading: false,
                dbLoaded: true,
                dbReload: false
            })
        }, 500);
        
        
    }

    updateNetworkStatus(networkStatus){
        if(this.state.networkStatus != networkStatus){
            var instance = this;
            setTimeout(function(){
                instance.setState({
                    networkStatus: networkStatus
                });
            }, 1000);
        }
    }

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

        const report_cols = [
            {
              title: 'Amount Needed',
              dataIndex: 'amount_needed',
              key: 'amount_needed'
            },
            {
              title: 'Assets Assigned to Goal',
              dataIndex: 'assetsAssignedToGoal',
              key: 'assetsAssignedToGoal',
            },
            {
                title: 'Goal Date',
                dataIndex: 'goalDate',
                key: 'goalDate',
              },
            {
              title: 'Assigned To',
              dataIndex: 'assignedTo',
              key: 'assignedTo',
            },
            {
                title: 'Inflation',
                dataIndex: 'inflation',
                key: 'inflation',
            },
            {
                title: '',
                key: 'id',
                render: (record) => {
                    if(this.props.user.role != ROLES.VIEW_ONLY){
                        return(
                            <span>
                                <a className="report-action-btn report-action-btn--view" onClick={() => this.fnView(record)}>View</a>
                                <a className="report-action-btn report-action-btn--edit" onClick={() => this.fnEdit(record)}>Edit</a>
                                <a className="report-action-btn report-action-btn--delete" onClick={() => this.fnDelete(record)}>Delete</a>
                            </span>
                        )
                    }
                    else{
                        return (
                            <span>
                                <a className="report-action-btn report-action-btn--view" onClick={() => this.fnView(record)}>View</a>
                            </span>
                        )
                    }
                }
            },
        ];

        return (
            <div className="pageWrapper">
                <HiddenHook />
                <LoadDBDataHook 
                    dbLoaded={this.state.dbLoaded}
                    dbReload={this.state.dbReload}
                    cbLoadDBData={this.loadDBData}
                    cbUpdateNetworkStatus={this.updateNetworkStatus}
                />
                <PageTitle title="Goals Report" />
                <div className="" style={{'textAlign': 'right'}}>
                {
                    this.props.user.role != ROLES.VIEW_ONLY &&
                    <React.Fragment> 
                        <Link to="/goals_add"><Button type="primary">Add</Button></Link>
                    </React.Fragment> 
                }
                </div>
                {
                    this.state.dbLoading && <p>Loading...</p>
                }
                {
                    this.state.goals.map((goal, index) => {
                        return (
                            <React.Fragment key={index}>
                                <Row align="middle" justify="space-around" type="flex" gutter={[100, 0]} style={{ margin: '20px 0 30px' }}>
                                    <Col span={24}>
                                        <TitleGoal color="purple">{goal.title}</TitleGoal>
                                    </Col>
                                    <Col span={9} style={{ margin: '12px 0', padding: '16px', textAlign: 'center', border: '1px solid #ddd', backgroundColor: 'rgba(237, 237, 237, 0.40)', borderRadius: '10px' }}>
                                        <Row style={{ marginBottom: 16 }}>
                                            <Col>
                                                <ProgressTitle color='purple'>{goal.title}</ProgressTitle>
                                            </Col>
                                        </Row>
                                        <Progress type="circle" percent={75} width={150} strokeColor='purple' />
                                        <Row style={{ marginTop: 20 }}>
                                            <Col>
                                                <ChartText color='purple'>Need : ${goal.need}</ChartText>
                                            </Col>
                                            <Col>
                                                <ChartText color='purple'>Have : ${goal.have}</ChartText>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={15}>
                                        <Report 
                                            loading={this.state.dbLoading}
                                            cols={report_cols} 
                                            rows={goal.report_rows}
                                        ></Report>
                                    </Col>                    
                                </Row>
                            </React.Fragment>
                        )  
                    })
                }
                
                <Modal
                    title="Alert"
                    visible={this.state.isOpenDelete}
                    onOk={this.confirmDelete}
                    onCancel={this.handleCancel}
                    >
                    <p>Are you sure to delete?</p>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.rootReducer.loginUser.loginUserData

    }
}
export default connect(mapStateToProps, null)(GoalsList);