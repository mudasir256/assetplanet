import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ROLES from 'constants/roles';
import { BlockLink } from '../../components/Animations';
import assets from '../../assets/images/asset.png';
import liabilities from '../../assets/images/debt.png';
import insurance from '../../assets/images/insurance.png';
import income from '../../assets/images/contributions.png';
import assistance from '../../assets/images/savings.png';
import budget from '../../assets/images/calculator.png';
import PageTitle from 'components/layout/PageTitle';
import { Row } from 'antd';
import moment from "moment";

class Modules extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() { }

  render() {
    const block_links = [
      {
        href: '/assets',
        title: 'Assets',
        visible: this.props.user.role == ROLES.FREE_APP_SUITE ? false : true,
        img: assets,
      },
      {
        href: '/liabilities_credit',
        title: 'Liabilities and Credit',
        visible: this.props.user.role == ROLES.FREE_APP_SUITE ? false : true,
        img: liabilities,
      },

      {
        href: '/insurance',
        title: 'Insurance Products',
        visible: this.props.user.role == ROLES.FREE_APP_SUITE ? false : true,
        img: insurance,
      },
      {
        href: '/income',
        title: 'Income',
        visible: true,
        img: income,
      },
      {
        href: '/assistance/create',
        title: 'Assistance',
        visible: this.props.user.role == ROLES.FREE_APP_SUITE ? false : true,
        img: assistance,
      },
      {
        // href: '/budget',
        href: '/budget',
        title: 'Budget',
        visible: this.props.user.role == ROLES.FREE_APP_SUITE ? false : true,
        img: budget,
      },
      //            {
      //                href: '/social_security',
      //                title: 'Social Security',
      //                visible: (this.props.user.role == ROLES.FREE_APP_SUITE) ? false : true
      //            }
    ];

    return (
      <React.Fragment>
        {/* <div className='page-title'>
          <div style={{ marginBottom: '5em' }}>
            <PageTitle title='Organizer' />
          </div>
        </div> */}
        <div className="asset-heading">
          <Row style={{ textAlign: "center" }}>
            <div>
              <h2
                style={{ color: "white" }}
                className=" font-weight"
              >
                ORGANIZER
              </h2>
            </div>
          </Row>
          <Row justify="center" style={{ display: "flex", justifyContent: "space-between" }}>

            <div>
              <h5
                style={{ color: "white" }}
                className=" font-weight"
              >
                Client Name:{localStorage.getItem("User") ? localStorage.getItem("User") : <React.Fragment></React.Fragment>}
              </h5>
            </div>
            <div>
              <h5
                style={{ color: "white" }}
                className=" font-weight"
              >
                Plan: Plan One
              </h5>
            </div>

            <div>
              <h5
                style={{ color: "white" }}
                className=" font-weight"
              >
                Today's Date: {moment().format("MM/DD/YYYY")}
              </h5>
            </div>
          </Row>
        </div>
        <div className='module-blocks2'>

          {block_links.map((blocklink, bindex) => {
            if (blocklink.visible) {
              return (
                <BlockLink
                  key={bindex}
                  img={blocklink.img}
                  className='module-block-link2'
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
export default connect(mapStateToProps, null)(Modules);
