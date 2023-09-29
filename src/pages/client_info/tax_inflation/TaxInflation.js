import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ROLES from 'constants/roles';
import { Button, Row, Col } from 'antd';
import TaxInflationModal from './TaxInflationModal';
import TaxInflationTable from './TaxInflationTable';

class TaxInflation extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }

        this.fnToggleModal = this.fnToggleModal.bind(this);
    }

    componentDidMount() {
    }

    fnToggleModal(modal){
        this.props.history.push('/tax_inflation_edit/1');
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
                <Row gutter={16}>
                    <Col span={10}>
                        <TaxInflationTable></TaxInflationTable>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.rootReducer.loginUser.loginUserData

    }
}

export default connect(mapStateToProps, null)(TaxInflation);