import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';

import './PageTitle.css';
const { Title } = Typography;

const FormTitle = ({ level, title, className }) => {
  return (
    <div className={`page-title ${className}`}>
      <Title level={level}>{title}</Title>
    </div>
  );
};

FormTitle.defaultProps = {
  level: 2,
  className: ''
}

FormTitle.propTypes = {
  title: PropTypes.string.isRequired,
  level: PropTypes.number,
  className: PropTypes.string,
};

export default FormTitle;
