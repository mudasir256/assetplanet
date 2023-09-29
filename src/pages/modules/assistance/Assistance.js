import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { BlockLink } from '../../../components/Animations';

class Assistance extends Component {

    constructor(props) {
        super(props);
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
                href: '/assistance',
                title: 'Assistance'
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
                <div className="module-blocks">
                    <BlockLink className="module-block-link" link="/assistance_in_new" title="Assistance In" />
                    <BlockLink className="module-block-link" link="/assistance_out_new" title="Assistance Out" />
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(Assistance);