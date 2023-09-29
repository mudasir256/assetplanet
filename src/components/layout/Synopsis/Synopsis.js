import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';
import './Synopsis.css';

const { Text } = Typography;

const PageTitle = ({ content }) => {
  return (
    <div className="synopsis-wrapper">
      <Text>Synopsis: {content}</Text>
    </div>
  );
};


PageTitle.propTypes = {
  content: PropTypes.string.isRequired
};


export default PageTitle;
