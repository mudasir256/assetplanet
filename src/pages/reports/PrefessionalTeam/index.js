import React, { Component } from 'react';
import { connect } from 'react-redux';
/* *** Antd Components *** */

/* *** Custom Components *** */
import PageTitle from '../../../components/layout/PageTitle';
import Synopsis from '../../../components/layout/Synopsis/Synopsis';
import PrefessionalTeamReport from './modals/PrefessionalTeamReport';

import { useQuery, useMutation } from '@apollo/react-hooks';
import {
    QL_CLIENT_CONTACT_LIST
} from '../../../constants/queries';
import Report from '../../../components/Report';

import {float2Currency} from 'helpers/Utils';

function LoadDBDataHook(props){
    const {data, loading, error, refetch, networkStatus } = useQuery(QL_CLIENT_CONTACT_LIST, { notifyOnNetworkStatusChange: true });
    
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

class PrefessionalTeam extends Component {

    constructor(props){
        super(props);

        this.state = {
            total_assets: 0,
            dbLoaded: false,
            dbLoading: true,
            report_rows: [],
            dbReload: false,
            networkStatus: 0
        }

        this.loadDBData = this.loadDBData.bind(this);
        this.updateNetworkStatus = this.updateNetworkStatus.bind(this);
    }

    loadDBData(networkStatus, data){        
        console.log('loadDBData:', data);

        if(this.state.networkStatus == networkStatus){
            return;
        }

        var report_rows = [];

        for(var index = 0; index < data['clientContacts'].length; index++){
            report_rows.push(
                {
                    key: index,
                    id: data['clientContacts'][index]['id'],
                    name: data['clientContacts'][index]['firstName'] + ' ' + data['clientContacts'][index]['lastName'],
                    phone: data['clientContacts'][index]['primaryContactNumber'],
                    alternate_phone: data['clientContacts'][index]['secondaryContactNumber'],
                    email: data['clientContacts'][index]['email'],
                    relationship: data['clientContacts'][index]['relationship'],
                    profession: data['clientContacts'][index]['profession'],
                }
            )
        }
        

        var instance = this;
        setTimeout(function(){
            instance.setState({
                report_rows: report_rows,
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
        const report_cols = [
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name'
            },
            {
              title: 'Phone',
              dataIndex: 'phone',
              key: 'phone',
            },
            {
              title: 'Alternate Phone',
              dataIndex: 'alternate_phone',
              key: 'alternate_phone',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Relationship',
                dataIndex: 'relationship',
                key: 'relationship'
            },
            {
                title: 'Profession',
                dataIndex: 'profession',
                key: 'profession'
            }
        ];
        return (
            <React.Fragment>
                <LoadDBDataHook 
                    dbLoaded={this.state.dbLoaded}
                    dbReload={this.state.dbReload}
                    cbLoadDBData={this.loadDBData}
                    cbUpdateNetworkStatus={this.updateNetworkStatus}
                />
                <div className="pageWrapper">
                    <PageTitle title="Report - Prefessional Team" />
                    <Synopsis content="Detailed listing of Prefessional Team" />
                    <div className="fragment-assitance-received" style={{marginTop: 20}}>
                        <PageTitle title="Asset Details" level={4}/>
                        <Report 
                            loading={this.state.dbLoading}
                            cols={report_cols} 
                            rows={this.state.report_rows}
                        ></Report>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(PrefessionalTeam);