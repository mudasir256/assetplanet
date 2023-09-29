import React, { Component } from 'react';
import { Button } from 'antd';
import BreadCrumb from '../../../components/BreadCrumb';

class Disability extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        {/* <BreadCrumb /> */}
        <div className='top-btns-container'>
          <Button
            type='primary'
            onClick={() => this.props.history.push('/disability/create')}
          >
            Add Disability
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default Disability;
