import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import ROLES from 'constants/roles';
// import { BlockLink } from 'components/Animations';
import PageTitle from 'components/layout/PageTitle';
import { Timeline, Icon, Row, Col } from 'antd';

class Welcome extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {

        const welcome_links = [
            {
                href: '#',
                title: 'Connect Account',
                complete: false
            },
            {
                href: '/edit_information',
                title: 'Update Your Information',
                complete: false
            },
            {
                href: '#',
                title: 'Create a Budget',
                complete: false
            }
        ]

        return (
            <React.Fragment>
                <PageTitle title="Welcome to asset planet" />
                <Row gutter={16} justify="center" type="flex">
                    <Col span={8}>
                        <p>Let's get started by doing the following things:</p>
                        <Timeline>
                            {
                                welcome_links.map((welcome_link, index) => {
                                    let color = "red";
                                    let icon = "close";

                                    if (welcome_link.complete) {
                                        color = "blue";
                                        icon = "check";
                                    }
                                    return (
                                        <Timeline.Item key={index} dot={<Icon type={icon} />} color={color}><Link to={welcome_link.href}>{welcome_link.title}</Link></Timeline.Item>
                                    )
                                })
                            }
                        </Timeline>
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
export default connect(mapStateToProps, null)(Welcome);