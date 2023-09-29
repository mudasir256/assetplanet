import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ROLES from 'constants/roles';
import { Button, Row, Col } from 'antd';

import { useMutation, useQuery } from '@apollo/react-hooks';
import {
    QL_SOCIAL_SECURITY_GET
} from '../../../constants/queries';

import ClientInformationTable from './ClientInformationTable';
import SpouseInformationTable from './SpouseInformationTable';

import SocialSecurityReport from './SocialSecurityReport';
import SocialSecurityModal from './modals/SocialSecurityModal';
import SocialSecurityDetailModal from './modals/SocialSecurityDetailModal';
import ClientInformationSubForm from './subforms/ClientInformationSubForm';
import ItemsRelatedSubForm from './subforms/ItemsRelatedSubForm';
import QuestionEligibleSubForm from './subforms/QuestionEligibleSubForm';
import RetirementEarningsCalculatorSubForm from './subforms/RetirementEarningsCalculatorSubForm';
import SpouseRetirementInformationSubForm from './subforms/SpouseRetirementInformationSubForm';
import SpouseRetirementCalculatorSubForm from './subforms/SpouseRetirementCalculatorSubForm';
import BenefitsTable from './BenefitsTable';

import PageTitle from 'components/layout/PageTitle';
import InfoList from 'components/InfoList';

function LoadDBDataHook(props){
    if(props.dbID != null && props.dbID != ''){
        const {data, loading, error} = useQuery(QL_SOCIAL_SECURITY_GET, { variables: { id: props.dbID} });
        if(data){
            console.log('call..', data);
            props.cbLoadDBData(data['socialSecurity']);
        }
    }
    
    return (
        <React.Fragment></React.Fragment>
    )
}

class SocialSecurityModule extends Component {

    constructor(props) {
        super(props);

        let dbID = null;
        let dbLoaded = true;

        const clientID = "1";

        if( clientID ){
            dbID = clientID;
            dbLoaded = false;
        }      

        this.state = {
            dataID: dbID,
            isOpen_SocialSecurityDetail: false,
            isOpen_SocialSecurity: false,
            dbData: [],
            dbLoaded: dbLoaded,
            dbID: dbID
        }

        this.fnToggleModal = this.fnToggleModal.bind(this);

        this.loadDBData = this.loadDBData.bind(this);

    }

    componentDidMount() {
    }

    fnToggleModal(){
        this.props.history.push('/social_security_edit');
    }

    loadDBData(dbData){
        console.log('dbData:', dbData);

        var instance = this;
        setTimeout(function(){
            instance.setState({ 
                dbLoaded: true,
                dbData: dbData
            });
        }, 100)        

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

        const clientInfoGeneralData = [
            {
                'label': 'Client Birthdate',
                'value': 'Bill Client'
            },
            {
                'label': 'Cost of Living Adjustment',
                'value': 'First Plan'
            },
            {
                'label': 'Client Retirement Year',
                'value': ''
            },
            {
                'label': 'Time Value of Money Interest Rate',
                'value': ''
            },
            {
                'label': 'Client Monthly Benefit at Full Retirement Age',
                'value': '$ 0.00'
            },
            {
                'label': 'Time until Full Retirement Age',
                'value': ''
            },
            {
                'label': 'Full Retirement Age',
                'value': '66 and 2 months'
            },
        ];

        const retirementEarningsData = [
            {
                'label': 'Enter date you would like to begin receiving benefits',
                'value': ''
            },
            {
                'label': 'Monthly decrease in benefit',
                'value': '$ 0.00'
            },
            {
                'label': 'Your estimated earnings',
                'value': '$ 0.00'
            },
            {
                'label': 'Monthly decrease in benefit',
                'value': '$ 0.00'
            },
        ];

        const spouseInfoGeneralData = [
            {
                'label': 'Spouse Birthdate',
                'value': ''
            },
            {
                'label': 'Cost of Living Adjustment',
                'value': 'First Plan'
            },
            {
                'label': 'Spouse Retirement Year',
                'value': ''
            },
            {
                'label': 'Time Value of Money Interest Rate',
                'value': ''
            },
            {
                'label': 'Spouse Monthly Benefit at Full Retirement Age',
                'value': '$ 0.00'
            },
            {
                'label': 'Time until Full Retirement Age',
                'value': ''
            },
            {
                'label': 'Full Retirement Age',
                'value': ''
            },
        ];

        const SpouseRetirementEarningsData = [
            {
                'label': 'Enter date you would like to begin receiving benefits',
                'value': ''
            },
            {
                'label': 'Monthly decrease in benefit',
                'value': '$ 0.00'
            },
            {
                'label': 'Your estimated earnings',
                'value': '$ 0.00'
            },
            {
                'label': 'Monthly decrease in benefit',
                'value': '$ 0.00'
            },
        ];

        const lifetimeBenefitsData = [
            {
                'label': 'Lifetime Benefits At Age 62',
                'value': '$ 0.00'
            },
            {
                'label': 'Lifetime Benefits At Full Retirement Age',
                'value': '$ 0.00'
            },
            {
                'label': 'Lifetime Benefits At 70',
                'value': '$ 0.00'
            },
        ];

        return (
            <React.Fragment>      
                {
                    !this.state.dbLoaded && 
                    <LoadDBDataHook 
                        dbLoaded={this.state.dbLoaded}
                        dbID={this.state.dbID}
                        cbLoadDBData={this.loadDBData}
                    />
                }          
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
                <PageTitle title="Social Security Report" />
                <div className="top-btns-container">
                    {
                        this.props.user.role != ROLES.VIEW_ONLY &&
                        <Button type="primary" onClick={() => this.fnToggleModal()}>Edit Client/Spouse Information</Button>
                    }
                </div>                
                {
                    !this.state.dbLoaded && <div>Loading...</div>
                }
                {
                    this.state.dbLoaded && 
                    <React.Fragment>
                        <div className="pageContent">
                            <InfoList title="Client Information - General" data={clientInfoGeneralData} />
                            <InfoList title="Client Information - Retirement Earnings" data={retirementEarningsData} />
                            <InfoList className="overall-info" data={lifetimeBenefitsData} notes="These values consider a COLA of 0% per year. Click HERE for information on COLA from the Social Security Administration." layout="vertical" column={3} />
                            <InfoList title="Spouse/Partner Information - General" data={spouseInfoGeneralData} />
                            <InfoList title="Spouse/Partner Information - Retirement Earnings" data={SpouseRetirementEarningsData} />
                            <InfoList className="overall-info" data={lifetimeBenefitsData} notes="These values consider a COLA of 0% per year. Click HERE for information on COLA from the Social Security Administration." layout="vertical" column={3} />
                        </div>
                        <Row gutter={16}>
                            <Col span={12}>
                                <ClientInformationTable 
                                    dbData={this.state.dbData}
                                />
                            </Col>
                            <Col span={12}>
                                <SpouseInformationTable 
                                    dbData={this.state.dbData}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <BenefitsTable 
                                dbData={this.state.dbData}
                            ></BenefitsTable>
                        </Row>
                        <Row>
                            <SocialSecurityReport 
                                cbToggle={(toggle) => this.setState({isOpen_SocialSecurity: toggle})}    
                            ></SocialSecurityReport>
                        </Row>
                    </React.Fragment>
                }
                
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.rootReducer.loginUser.loginUserData

    }
}
export default connect(mapStateToProps, null)(SocialSecurityModule);