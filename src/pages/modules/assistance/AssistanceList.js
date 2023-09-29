import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, Button, Row, Col } from 'antd';
import ROLES from 'constants/roles';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
    QL_ASSISTANCE_IN_LIST,
    QL_ASSISTANCE_IN_DELETE,
    QL_ASSISTANCE_OUT_LIST,
    QL_ASSISTANCE_OUT_DELETE
} from '../../../constants/queries';

import Report from '../../../components/Report';
import PageTitle from 'components/layout/PageTitle';
import HighlightedReportBlock from 'components/layout/HighlightedReportBlock';
import TableReport from 'components/layout/TableReport';
import InfoList from 'components/InfoList';

import { Bar } from 'react-chartjs-2';
import highlightedIcon from 'assets/images/contributions.png';
import {float2Currency} from 'helpers/Utils';

var fnMutationAssistanceInDelete = null;
var dataMutationAssistanceInDelete = null;

var fnMutationAssistanceOutDelete = null;
var dataMutationAssistanceOutDelete = null;

function HiddenHook(){
    [fnMutationAssistanceInDelete, { dataMutationAssistanceInDelete }] = useMutation(QL_ASSISTANCE_IN_DELETE);
    [fnMutationAssistanceOutDelete, { dataMutationAssistanceOutDelete }] = useMutation(QL_ASSISTANCE_OUT_DELETE);

    return (
        <React.Fragment></React.Fragment>
    )
}


function LoadDBDataHookIn(props){
    const {data, loading, error, refetch, networkStatus } = useQuery(QL_ASSISTANCE_IN_LIST, { notifyOnNetworkStatusChange: true });
    
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

function LoadDBDataHook(props){
    const {data, loading, error, refetch, networkStatus } = useQuery(props.query, { notifyOnNetworkStatusChange: true });
    
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

class AssistanceList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenDeleteIn: false,
            isOpenDeleteOut: false,
            
            overall_in: [
                {
                    'label': 'Total Assistance',
                    'value': ''
                },
                {
                    'label': 'Total Value',
                    'value': ''
                }
            ],
            total_value_in: 0,
            overall_out: [
                {
                    'label': 'Total Assisting',
                    'value': '5'
                },
                {
                    'label': 'Total Value',
                    'value': '$ 234,000'
                }
            ],
            total_value_out: 0,
            dbLoadedIn: false,
            dbLoadedOut: false,
            dbLoadingIn: true,
            dbLoadingOut: true,
            rows_in: [],
            rows_out: [],
            dbReloadIn: false,
            dbReloadOut: false,
            networkStatusIn: 0,
            networkStatusOut: 0
        };

        this.fnAdd = this.fnAdd.bind(this);

        this.fnEditIn = this.fnEditIn.bind(this);
        this.fnDeleteIn = this.fnDeleteIn.bind(this);
        this.fnViewIn = this.fnViewIn.bind(this);

        this.fnEditOut = this.fnEditOut.bind(this);
        this.fnDeleteOut = this.fnDeleteOut.bind(this);
        this.fnViewOut = this.fnViewOut.bind(this);

        this.loadDBDataIn = this.loadDBDataIn.bind(this);
        this.loadDBDataOut = this.loadDBDataOut.bind(this);
        this.updateNetworkStatusIn = this.updateNetworkStatusIn.bind(this);
        this.updateNetworkStatusOut = this.updateNetworkStatusOut.bind(this);

    }

    fnAdd(){
        this.props.history.push("/assistance_new");
    }

    fnEditIn(record){
        this.props.history.push("/assistance_in_edit/" + record.id);
    }

    fnViewIn(record){
        this.props.history.push("/assistance_in_view/" + record.id);
    }

    fnDeleteIn(record){
        window.localStorage.setItem('assistance_in_delete_id', record.id);
        this.setState({
            isOpenDeleteIn: !this.state.isOpenDeleteIn
        })
    }

    confirmDeleteIn = e => {        

        let dbID = window.localStorage.getItem('assistance_in_delete_id');
        if(dbID != null && dbID != ''){
            fnMutationAssistanceInDelete({ variables: { id: dbID } })
            this.setState({
                dbReloadIn: false,
                isOpenDeleteIn: false
            });

            var instance = this;

            setTimeout(function(){
                instance.setState({
                    dbReloadIn: true,
                    dbLoadingIn: true
                })
            }, 1000);
            
        }
        else{
            this.setState({
                isOpenDeleteIn: false,
            });
        }
    };
    
    handleCancelIn = e => {
        this.setState({
            isOpenDeleteIn: false,
        });
    };

    fnEditOut(record){
        this.props.history.push("/assistance_out_edit/" + record.id);
    }

    fnViewOut(record){
        this.props.history.push("/assistance_out_view/" + record.id);
    }

    fnDeleteOut(record){
        window.localStorage.setItem('assistance_out_delete_id', record.id);
        this.setState({
            isOpenDeleteOut: !this.state.isOpenDeleteOut
        })
    }

    confirmDeleteOut = e => {        

        let dbID = window.localStorage.getItem('assistance_out_delete_id');
        if(dbID != null && dbID != ''){
            fnMutationAssistanceOutDelete({ variables: { id: dbID } })
            this.setState({
                dbReloadOut: false,
                isOpenDeleteOut: false
            });

            var instance = this;

            setTimeout(function(){
                instance.setState({
                    dbReloadOut: true,
                    dbLoadingOut: true
                })
            }, 1000);
            
        }
        else{
            this.setState({
                isOpenDeleteOut: false,
            });
        }
    };
    
    handleCancelOut = e => {
        this.setState({
            isOpenDeleteOut: false,
        });
    };

    loadDBDataIn(networkStatusIn, data){        
        console.log('loadDBData:', data);

        if(this.state.networkStatusIn == networkStatusIn){
            return;
        }

        var rows_in = [];
        var total_count = 0;
        var total_value = 0;
        for(var index = 0; index < data['assistanceIns'].length; index++){
            total_count ++;

            var amount_received = 0;
            amount_received = data['assistanceIns'][index]['amountReceived'] != null ? parseFloat(data['assistanceIns'][index]['amountReceived']) : 0;
            total_value += amount_received;
            rows_in.push(
                {
                    key: index,
                    id: data['assistanceIns'][index]['id'],
                    recipient: (data['assistanceIns'][index]['personInheritingFromFirstName'] == null ? '' : data['assistanceIns'][index]['personInheritingFromFirstName']) + " " + (data['assistanceIns'][index]['personInheritingFromLastName'] == null ? '' : data['assistanceIns'][index]['personInheritingFromLastName']),
                    person_providing_assistance: (data['assistanceIns'][index]['personProvidingAssistanceFirstName'] == null ? '' : data['assistanceIns'][index]['personProvidingAssistanceFirstName']) + " " + (data['assistanceIns'][index]['personProvidingAssistanceLastName'] == null ? '' : data['assistanceIns'][index]['personProvidingAssistanceLastName']),
                    amount_received: float2Currency(amount_received),
                    estimated_start_date: data['assistanceIns'][index]['estimatedStartDate'],
                    estimated_end_data: '',
                    total_amount_received: data['assistanceIns'][index]['amountReceived'] != null ? float2Currency(data['assistanceIns'][index]['amountReceived']) : '',
                }
            )
        }       

        var overall_in = this.state.overall_in;
        overall_in[0]['value'] = total_count;
        overall_in[1]['value'] = float2Currency(total_value);

        var instance = this;
        setTimeout(function(){
            instance.setState({
                overall_in: overall_in,
                rows_in: rows_in,
                dbLoadingIn: false,
                dbLoadedIn: true,
                dbReloadIn: false,
                total_value_in: total_value
            })
        }, 500);
        
        
    }

    updateNetworkStatusIn(networkStatusIn){
        if(this.state.networkStatusIn != networkStatusIn){
            var instance = this;
            setTimeout(function(){
                instance.setState({
                    networkStatusIn: networkStatusIn
                });
            }, 1000);
        }
    }
    
    loadDBDataOut(networkStatusOut, data){        
        console.log('loadDBData:', data);

        if(this.state.networkStatusOut == networkStatusOut){
            return;
        }

        var rows_out = [];
        var total_count = 0;
        var total_value = 0;
        for(var index = 0; index < data['assistanceOuts'].length; index++){
            total_count ++;

            var addToMonthlyBudget = 0;

            addToMonthlyBudget = data['assistanceOuts'][index]['addToMonthlyBudget'] != null ? parseFloat(data['assistanceOuts'][index]['addToMonthlyBudget']) : 0;

            total_value += addToMonthlyBudget;

            rows_out.push(
                {
                    key: index,
                    id: data['assistanceOuts'][index]['id'],
                    recipient: data['assistanceOuts'][index]['recipientFirstName'] == null ? '' : data['assistanceOuts'][index]['recipientFirstName'] + " " + data['assistanceOuts'][index]['recipientLastName'] == null ? '' : data['assistanceOuts'][index]['recipientLastName'],
                    personProvidingAssistance: data['assistanceOuts'][index]['personProvidingAssistance'],
                    annual_gifting_amount: data['assistanceOuts'][index]['annualGiftingAmount'] == null ? '' : float2Currency(data['assistanceOuts'][index]['annualGiftingAmount']),
                    estimated_start_date: data['assistanceOuts'][index]['estimatedStartDate'],
                    estimated_end_date: data['assistanceOuts'][index]['estimatedEndDate'],
                    totalAmountSent: float2Currency(data['assistanceOuts'][index]['annualGiftingAmount'])
                }
            )
        }     

        var instance = this;
        var overall_out = this.state.overall_out;
        overall_out[0]['value'] = total_count;
        overall_out[1]['value'] = float2Currency(total_value);
            
        setTimeout(function(){
            instance.setState({
                overall_out: overall_out,
                rows_out: rows_out,
                dbLoadingOut: false,
                dbLoadedOut: true,
                dbReloadOut: false,
                total_value_out: total_value
            })
        }, 500);
        
        
    }

    updateNetworkStatusOut(networkStatusOut){
        if(this.state.networkStatusOut != networkStatusOut){
            var instance = this;
            setTimeout(function(){
                instance.setState({
                    networkStatusOut: networkStatusOut
                });
            }, 1000);
        }
    }

    render() {
        const navlinks = [
            {
                href: '/',
                title: 'Home'
            },
            {
                href: '/modules',
                title: 'Modules'
            }
        ]

        var report_actions_in = [];
        if(this.props.user.role != ROLES.VIEW_ONLY){
            report_actions_in = [
                {
                    title: 'Add',
                    fnClick: this.fnAdd
                }
            ]
        }

        const report_cols_in = [
            {
              title: 'Recipient',
              dataIndex: 'recipient',
              key: 'recipient'
            },
            {
              title: 'Person Providing Assistance',
              dataIndex: 'person_providing_assistance',
              key: 'person_providing_assistance',
            },
            {
              title: 'Amount Received',
              dataIndex: 'amount_received',
              key: 'amount_received',
            },
            {
                title: 'Estimated Start Date',
                dataIndex: 'estimated_start_date',
                key: 'estimated_start_date',
            },
            {
                title: 'Estimated End Data',
                dataIndex: 'estimated_end_data',
                key: 'estimated_end_data'
            },
            {
                title: 'Total Amount Received',
                dataIndex: 'total_amount_received',
                key: 'total_amount_received'
            },
            {
              title: '',
              key: 'id',
              render: (text, record) => {if(this.props.user.role != ROLES.VIEW_ONLY){
                return(
                    <span>
                        <a className="report-action-btn report-action-btn--view" onClick={() => this.fnViewIn(record)}>View</a>
                        <a className="report-action-btn report-action-btn--edit" onClick={() => this.fnEditIn(record)}>Edit</a>
                        <a className="report-action-btn report-action-btn--delete" onClick={() => this.fnDeleteIn(record)}>Delete</a>
                    </span>
                )
            }
            else{
                return (
                    <span>
                        <a className="report-action-btn report-action-btn--view" onClick={() => this.fnViewIn(record)}>View</a>
                    </span>
                )
            }}
            },
        ];
        
        const report_cols_out = [
            {
              title: 'Recipient',
              dataIndex: 'recipient',
              key: 'recipient'
            },
            {
                title: 'Person Providing Assistance',
                dataIndex: 'personProvidingAssistance',
                key: 'personProvidingAssistance'
            },
            {
              title: 'Annual Gifting Amount',
              dataIndex: 'annual_gifting_amount',
              key: 'annual_gifting_amount',
            },
            {
              title: 'Estimated Start Date',
              dataIndex: 'estimated_start_date',
              key: 'estimated_start_date',
            },
            {
                title: 'Estimated End Data',
                dataIndex: 'estimated_end_date',
                key: 'estimated_end_date',
            },
            {
                title: 'Total Amount Sent',
                dataIndex: 'totalAmountSent',
                key: 'totalAmountSent'
            },
            {
              title: '',
              key: 'action',
              render: (text, record) => {
                if(this.props.user.role != ROLES.VIEW_ONLY){
                    return(
                        <span>
                            <a className="report-action-btn report-action-btn--view" onClick={() => this.fnViewOut(record)}>View</a>
                            <a className="report-action-btn report-action-btn--edit" onClick={() => this.fnEditOut(record)}>Edit</a>
                            <a className="report-action-btn report-action-btn--delete" onClick={() => this.fnDeleteOut(record)}>Delete</a>
                        </span>
                    )
                }
                else{
                    return (
                        <span>
                            <a className="report-action-btn report-action-btn--view" onClick={() => this.fnViewOut(record)}>View</a>
                        </span>
                    )
                }
              }
            },
        ];

        const barData = {
            labels: ['1. Testing Multiple dist to income', 'Dist', 'Adam\'s Dist', 'Brand New Rental', 'Dist Two', 'Early WD', 'Frank\'s Annuity'],
            datasets: [
              {
                label: '',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [0, 50000, 100000, 150000, 0, 50000, 100000]
              }
            ]
        };


        return (
            <React.Fragment>
                <HiddenHook />
                <LoadDBDataHook
                    query={QL_ASSISTANCE_IN_LIST}
                    dbLoaded={this.state.dbLoadedIn}
                    dbReload={this.state.dbReloadIn}
                    cbLoadDBData={this.loadDBDataIn}
                    cbUpdateNetworkStatus={this.updateNetworkStatusIn}
                />
                <LoadDBDataHook 
                    query={QL_ASSISTANCE_OUT_LIST}
                    dbLoaded={this.state.dbLoadedOut}
                    dbReload={this.state.dbReloadOut}
                    cbLoadDBData={this.loadDBDataOut}
                    cbUpdateNetworkStatus={this.updateNetworkStatusOut}
                />
                <div className="page-nav-history">
                    {/* { 
                        navlinks.map((navlink, index) => {
                            return (
                                <span key={index}>
                                    <Link key={index} to={navlink.href} className="page-nav-link">
                                        {navlink.title}
                                    </Link>
                                    {index != (navlinks.length - 1) ? "/" : null}
                                </span>
                                
                            )                            
                        }) 
                    } */}
                </div>
                {
                    this.props.user.role != ROLES.VIEW_ONLY &&
                    <div className="top-btn-area">
                        <Button type="primary" className="float-right" onClick={this.fnAdd}>Add</Button>
                    </div>
                }
                <PageTitle title="Assistance" />
                <Row type="flex" gutter={[20, 0]} style={{ margin: '20px 0' }}>
                    <Col span={7} style={{ paddingTop: '20px'}}>
                        {
                            this.state.dbLoadingIn && <p>Loading...</p>
                        }
                        {
                            !this.state.dbLoadingIn &&
                            <InfoList column={1} title="Assistance In" data={this.state.overall_in} />
                        }
                        
                    </Col>
                    <Col span={10}>
                        <HighlightedReportBlock title="" value={float2Currency(this.state.total_value_in + this.state.total_value_out)}>
                            <img src={highlightedIcon} alt="" style={{ height: '100px' }} />     
                        </HighlightedReportBlock>
                    </Col>
                    <Col span={7} style={{ paddingTop: '20px'}}>
                        {
                            this.state.dbLoadingOut && <p>Loading...</p>
                        }
                        {
                            !this.state.dbLoadingOut &&
                            <InfoList column={1} title="Assistance Out" data={this.state.overall_out} />
                        }
                    </Col>
                </Row>
                <Row gutter={16} type="flex" justify="center">
                    <Col span={12} style={{ margin: '12px 0', padding: '16px', border: '1px solid #ddd', backgroundColor: 'rgba(237, 237, 237, 0.40)' }}>
                        <Bar
                            data={barData}
                            height={300}
                            options={{
                                maintainAspectRatio: false
                            }}
                        />
                    </Col>
                    <Col span={12} style={{ margin: '12px 0', padding: '16px', border: '1px solid #ddd', backgroundColor: 'rgba(237, 237, 237, 0.40)' }}>
                        <Bar
                            data={barData}
                            height={300}
                            options={{
                                maintainAspectRatio: false
                            }}
                        />
                    </Col>
                </Row>
                <div className="fragment-assitance-received">
                    <PageTitle title={"Current Assistance"} level={4} />                    
                    <Report 
                        loading={this.state.dbLoadingIn}
                        cols={report_cols_in} 
                        rows={this.state.rows_in}
                    ></Report>
                    <PageTitle title={"Sending Out"} level={4} />                    
                    <Report 
                        loading={this.state.dbLoadingOut}
                        cols={report_cols_out} 
                        rows={this.state.rows_out}
                    ></Report>
                </div>
                <Modal
                    title="Alert"
                    visible={this.state.isOpenDeleteIn}
                    onOk={this.confirmDeleteIn}
                    onCancel={this.handleCancelIn}
                    >
                    <p>Are you sure to delete?(in)</p>
                </Modal>
                <Modal
                    title="Alert"
                    visible={this.state.isOpenDeleteOut}
                    onOk={this.confirmDeleteOut}
                    onCancel={this.handleCancelOut}
                    >
                    <p>Are you sure to delete?(out)</p>
                </Modal>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.rootReducer.loginUser.loginUserData

    }
}
export default connect(mapStateToProps, null)(AssistanceList);