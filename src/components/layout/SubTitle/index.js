import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';

import './SubTitle.css';
const { Text } = Typography;

const SubTitle = ({ subTitle }) => {
  return (
    <div className="sub-title">
      <Text>{subTitle}</Text>
    </div>
  );
};

SubTitle.defaultProps = {
  subTitle: ''
}

SubTitle.propTypes = {
  subTitle: PropTypes.string,
};

export default SubTitle;
