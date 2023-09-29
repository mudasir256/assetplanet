import React, { Component } from 'react';
import { Button } from 'antd';
import BreadCrumb from '../../../components/BreadCrumb';

class Divorce extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <BreadCrumb />
        <div className='top-btns-container'>
          <Button
            type='primary'
            onClick={() => this.props.history.push('/disaster/create')}
          >
            Add Disaster
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default Divorce;
