import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ROLES from 'constants/roles';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
    QL_RATES_OF_RETURN_GET
} from '../../../constants/queries';

import { Button, Row, Col } from 'antd';
import StaticTable from './StaticTable';
import ProfessionalPredictionTable from './ProfessionalPredictionTable';
import UserDefinedReturnReport from './UserDefinedReturnReport';
import SimulationReport from './SimulationReport';

function LoadDBDataHook(props){
    if(props.dbID != null && props.dbID != ''){
        const {data, loading, error} = useQuery(QL_RATES_OF_RETURN_GET, { variables: { id: props.dbID} });
        if(data){
            console.log('call..');
            props.cbLoadDBData(data['ratesOfReturn']);
        }
    }
    
    return (
        <React.Fragment></React.Fragment>
    )
}

class ReturnRates extends Component {

    constructor(props) {
        super(props);

        let dbID = null;
        let dbLoaded = true;      

        const ratesOfReturnID = '1';        

        if( ratesOfReturnID ){
            dbID = ratesOfReturnID;
            dbLoaded = false;
        }

        this.state = {
            dataID: dbID,
            formData: {},
            dbLoaded: dbLoaded,
            dbID: dbID
        }

        this.fnToggleModal = this.fnToggleModal.bind(this);

        this.loadDBData = this.loadDBData.bind(this);
    }

    componentDidMount() {
    }

    fnToggleModal(modal){
        
        this.props.history.push('/rates_of_return_edit/1');
    }

    loadDBData(formData){
        console.log('formData:', formData);

        var instance = this;
        setTimeout(function(){
            instance.setState({ 
                dbLoaded: true,
                formData: formData
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
                href: '/client_info',
                title: 'Client Info'
            }
        ]

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
                <div className="top-btns-container">
                {
                    this.props.user.role != ROLES.VIEW_ONLY &&   
                    <Button type="primary" onClick={() => this.fnToggleModal()}>Edit</Button>
                }
                </div>
                {
                    !this.state.dbLoaded && <div>Loading...</div>
                }
                {
                    this.state.dbLoaded && 
                    <div>
                        <Row gutter={16}>
                            <Col span={12}>
                                <StaticTable
                                    data={this.state.formData['ratesOfReturn']}
                                />
                                <ProfessionalPredictionTable
                                    data={this.state.formData['ratesOfReturn']}
                                />
                            </Col>
                            <Col span={12}>
                                <UserDefinedReturnReport
                                    data={this.state.formData['userDefinedRateOfReturns']}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <SimulationReport
                                    data={this.state.formData['monteCarloRateOfReturns']}
                                />
                            </Col>
                        </Row>
                    </div>
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
export default connect(mapStateToProps, null)(ReturnRates);