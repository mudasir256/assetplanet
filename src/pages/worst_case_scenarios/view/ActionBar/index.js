import React from 'react'
import PropTypes from 'prop-types';

/* *** Antd Components *** */
import { Row, Button, Col } from 'antd';
import { Link } from 'react-router-dom';

const ActionBar = ({next, prev}) => {
  return (
    <Row type="flex" justify="space-between">
      <Col>
        {prev !== '' && (
          <Link to={prev}>
            <Button type="primary">Prev</Button>
          </Link>
        )}
      </Col>
      <Col>
        {next !== '' && (
          <Link to={next}>
            <Button type="primary">Next</Button>
          </Link>
        )}
      </Col>
  </Row>
  )
}

ActionBar.defaultProps = {
  prev: '',
  next: ''
}

ActionBar.propTypes = {
  prev: PropTypes.string,
  next: PropTypes.string,
}

export default ActionBar
