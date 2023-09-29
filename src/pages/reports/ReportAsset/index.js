import React, { Component } from 'react';
import { connect } from 'react-redux';
/* *** Antd Components *** */
import { Row } from 'antd';

/* *** Custom Components *** */
import PageTitle from '../../../components/layout/PageTitle';
import ReportInfoRow from '../../../components/shared/ReportInfo';
import Synopsis from '../../../components/layout/Synopsis/Synopsis';
import AssetDetails from './modals/AssetDetails';
import AllAssets from './modals/AllAssets';

/* *** Images *** */
import Logo from '../../../assets/images/abstract-dynamic-logo-vector.jpg'

import { useQuery, useMutation } from '@apollo/react-hooks';
import {
    QL_ASSETS_LIST
} from '../../../constants/queries';
import Report from '../../../components/Report';

import {float2Currency} from 'helpers/Utils';

function LoadDBDataHook(props){
    const {data, loading, error, refetch, networkStatus } = useQuery(QL_ASSETS_LIST, { notifyOnNetworkStatusChange: true });
    
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

class ReportAsset extends Component {

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
        var total_assets = 0;

        for(var index = 0; index < data['assets'].length; index++){
            var monetary_value = 0;
            if(data['assets'][index]['assetPerformance'] != null){
                monetary_value = data['assets'][index]['assetPerformance']['monetaryValue'] != null ? parseFloat(data['assets'][index]['assetPerformance']['monetaryValue']) : 0;
            }            

            total_assets += monetary_value;
            report_rows.push(
                {
                    key: index,
                    id: data['assets'][index]['id'],
                    asset_name: data['assets'][index]['name'],
                    account_type: data['assets'][index]['accountType'],
                    held_where: data['assets'][index]['heldWhere'],
                    monetary_value: monetary_value,
                    value_date: data['assets'][index]['assetPerformance'] ? data['assets'][index]['assetPerformance']['valueAsOfDate'] : '',
                    asset_liquid: data['assets'][index]['taxAndLiquidity'] ? data['assets'][index]['taxAndLiquidity']['thisAssetIsLiquid'] : '',
                    taxability: data['assets'][index]['taxAndLiquidity'] ? data['assets'][index]['taxAndLiquidity']['taxibility'] : '',
                    taxability_on_distribution: data['assets'][index]['taxAndLiquidity'] ? data['assets'][index]['taxAndLiquidity']['taxabilityOnDistribution'] : ''
                }
            )
        }

        var instance = this;
        setTimeout(function(){
            instance.setState({
                report_rows: report_rows,
                total_assets: total_assets,
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
              title: 'Name of Asset ',
              dataIndex: 'asset_name',
              key: 'asset_name'
            },
            {
              title: 'Account Type',
              dataIndex: 'account_type',
              key: 'account_type',
            },
            {
                title: 'Held Where',
                dataIndex: 'held_where',
                key: 'held_where',
              },
            {
              title: 'Monetary Value',
              dataIndex: 'monetary_value',
              key: 'monetary_value',
            },
            {
                title: 'Value As of Date',
                dataIndex: 'value_date',
                key: 'value_date',
            },
            {
                title: 'This Asset is Liquid',
                dataIndex: 'asset_liquid',
                key: 'asset_liquid'
            },
            {
                title: 'Taxability',
                dataIndex: 'taxability',
                key: 'taxability'
            },
            {
                title: 'Taxability on Distribution',
                dataIndex: 'taxability_on_distribution',
                key: 'taxability_on_distribution'
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
                    <PageTitle title="Asset Report" />
                    <Synopsis content="Detailed listing of Assets" />
                    <ReportInfoRow data={reportInfoData} />
                    <Row type="flex" justify="center" style={{ margin: '12px 0' }}>
                        <img src={Logo} alt="" style={{ height : '130px' }} /> 
                    </Row>
                    <AllAssets allAssetsValue={float2Currency(this.state.total_assets)} />
                    <Row type="flex" justify="center" style={{ margin: '12px 0', padding: '16px', border: '1px solid #ddd', backgroundColor: 'rgba(237, 237, 237, 0.40)' }}>
                        Chart....
                    </Row>
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


export default connect()(ReportAsset);