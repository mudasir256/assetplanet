import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';

import './style.css';
const { Title } = Typography;

const MainTitle = ({ level, title }) => {
  return (
    <div className="main-title">
      <Title level={level}>{title}</Title>
    </div>
  );
};

MainTitle.defaultProps = {
  level: 2
}

MainTitle.propTypes = {
  title: PropTypes.string.isRequired,
  level: PropTypes.number
};

export default MainTitle;
