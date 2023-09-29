import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ROLES from 'constants/roles';
import { BlockLink } from '../../components/Animations';
import clients from '../../assets/images/clients.png';
// import myInformation from '../../assets/images/clients.png';
import mobile from '../../assets/images/apps.png';
import taxInflation from '../../assets/images/tax.png';
import rates from '../../assets/images/adjustable.png';
import contacts from '../../assets/images/clients.png';
import PageTitle from 'components/layout/PageTitle';

class ClientInfo extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const block_links = [
      {
        href: '/clients/plans', //new='/clients/plans' old='/clients_plans'
        title: 'Clients and Plans',
        visible:
          this.props.user.role == ROLES.CONSUMER ||
          this.props.user.role == ROLES.FREE_APP_SUITE
            ? false
            : true,
        img: clients,
      },
      {
        href: '/my_information',
        title: 'My Information',
        visible: this.props.user.role == ROLES.CONSUMER ? true : false,
        //  img: myInformation
      },
      {
        href: '/',
        title: 'Mobile Sync',
        visible: true,
        img: mobile,
      },
      {
        href: '/tax_inflation',
        title: 'Tax and Inflation',
        visible: this.props.user.role == ROLES.FREE_APP_SUITE ? false : true,
        img: taxInflation,
      },
      {
        href: '/rates_of_return',
        title: 'Rates of Return',
        visible: this.props.user.role == ROLES.FREE_APP_SUITE ? false : true,
        img: rates,
      },
      {
        href: '/client_contacts',
        title: 'Client Contacts',
        visible: true,
        img: contacts,
      },
      {
        href: '/custom_components',
        title: 'Custom Components',
        visible: true,
        img: contacts,
      },
    ];
    return (
      <React.Fragment>
        <div className='page-nav-history'>
          <div style={{ marginBottom: '5em' }}>
            <PageTitle title='Client Information' />
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
export default connect(mapStateToProps, null)(ClientInfo);
