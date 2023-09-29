import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';

const formID = 'EndSubForm';
class EndSubForm extends Component {
  constructor(props) {
    super(props);

    this.goList = this.goList.bind(this);
  }

  goList() {
    window.location.href = '/goals';
  }

  render() {
    return (
      <React.Fragment>
        <div className='info-form-block d-flex align-items-center justify-content-center'>
          <h2>Your Data has been Saved!</h2>
        </div>
        <div className='d-flex align-items-center justify-content-center'>
          <Button
            className='pl-4 pr-4'
            size='large'
            type='primary'
            onClick={() => {
              this.props.history.push('/goals');
            }}
          >
            OK
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(connect()(EndSubForm));
