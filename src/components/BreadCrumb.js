import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BreadCrumb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav: [
        {
          name: 'Protector',
          link: '/protector',
        },
        {
          name: 'Divorce',
          link: '/divorce',
        },
      ],
    };
  }

  render() {
    return (
      <div className='page-nav-history'>
        {/* {this.state.nav
          ? this.state.nav.map((bread, index) => {
              return (
                <React.Fragment key={index}>
                  <Link to={`${bread.link}`} className='page-nav-link'>
                    {bread.name}
                  </Link>
                  /
                </React.Fragment>
              );
            })
          : ''} */}
      </div>
    );
  }
}

export default BreadCrumb;
