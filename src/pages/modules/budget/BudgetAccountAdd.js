import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, Button, Row, Col } from 'antd';
import Plaid from './Plaid';

class BudgetAccountAdd extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
        }

    }

    componentDidMount() {
        
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
            },
            {
                href: '/budget',
                title: 'Budget'
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
                <Plaid />           
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.rootReducer.loginUser.loginUserData

    }
}
export default connect(mapStateToProps, null)(BudgetAccountAdd);