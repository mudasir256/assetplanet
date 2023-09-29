import React from 'react'
import PropTypes from 'prop-types';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
const { Text } = Typography;

const CheckList = ({ link, title, complete, inComplete }) => {
  return (
    <div className='check-list'>
      <Link to={link}>
        <Text style={{ color: 'white', fontSize: 16 }}>{title}</Text>
      </Link>
      <ul>
        <li>
          <div className={`indicator ${inComplete && 'active'}`} /> Incomplete
        </li>
        <li>
          <div className={`indicator ${complete && 'active'}`} /> Complete
        </li>
      </ul>
    </div>
  );
};

CheckList.defaultProps = {
  complete: false,
  inComplete: false,
  link: ''
};

CheckList.propTypes = {
  title: PropTypes.string.isRequired,
  complete: PropTypes.bool,
  inComplete: PropTypes.bool,
  link: PropTypes.string
};

export default CheckList
