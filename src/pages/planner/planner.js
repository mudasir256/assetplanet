import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ROLES from 'constants/roles';
import { BlockLink } from '../../components/Animations';
import PageTitle from 'components/layout/PageTitle';
import debt from '../../assets/images/debt.png';
import ss from '../../assets/images/social_security.png';
import goals from '../../assets/images/goal.png';

class Planner extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const block_links = [
      {
        href: '/debt/create',
        title: 'Debt Payoff',
        visible: true,
        img: debt,
      },

      {
        href: '/social/',
        title: 'Social Security',
        // visible: (this.props.user.role == ROLES.FREE_APP_SUITE) ? false : true,
        visible: true,
        img: ss,
      },

      {
        href: '/goals',
        title: 'Goals',
        visible: true,
        img: goals,
      },
    ];

    return (
      <React.Fragment>
        <div className='page-nav-history'>
          <div style={{ marginBottom: '5em' }}>
            <PageTitle title='Planner' />
          </div>
        </div>
        <div className='module-blocks'>
          {block_links.map((blocklink, bindex) => {
            if (blocklink.visible) {
              return (
                <BlockLink
                  key={bindex}
                  img={blocklink.img}
                  className='module-block-link'
                  link={blocklink.href}
                  title={blocklink.title}
                />
              );
            } else {
              return <React.Fragment></React.Fragment>;
            }
          })}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.rootReducer.loginUser.loginUserData

  };
};
export default connect(mapStateToProps, null)(Planner);
