import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ROLES from 'constants/roles';
import { BlockLink } from '../../components/Animations';
import disability from '../../assets/images/doctor.png';
import divorce from '../../assets/images/latest/Divorce.png';
import destruction from '../../assets/images/calculator.png';
import death from '../../assets/images/casket.png';
import disaster from '../../assets/images/latest/Disaster.png';
import PageTitle from 'components/layout/PageTitle';

class Protector extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const block_links = [
      {
        href: '/disability',
        title: 'Disability',
        visible: this.props.user.role == ROLES.FREE_APP_SUITE ? false : true,
        img: disability,
      },
      {
        href: '/divorce',
        title: 'Divorce',
        visible: this.props.user.role == ROLES.FREE_APP_SUITE ? false : true,
        img: divorce,
      },
      // {
      //     href: '/destruction',
      //     title: 'Destruction',
      //     visible: (this.props.user.role == ROLES.FREE_APP_SUITE) ? false : true,
      //     img: destruction
      // },
      {
        href: '/death/create',
        title: 'Death',
        visible: true,
        img: death,
      },
      {
        href: '/disaster',
        title: 'Disaster',
        visible: true,
        img: disaster,
      },
    ];

    return (
      <React.Fragment>
        <div className='page-nav-history'>
          <div style={{ marginBottom: '5em' }}>
            <PageTitle title='Protector' />
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
export default connect(mapStateToProps, null)(Protector);
