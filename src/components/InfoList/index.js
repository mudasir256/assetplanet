import React from 'react';
import PropTypes from 'prop-types';
import { Row, Descriptions, Alert } from 'antd';

const InfoList = ({
  title, data, className, notes, column, span, ...rest
}) => (
  <Row style={{ marginBottom: '35px'}}>
    <Descriptions className={`info-list ${className}`} bordered title={title} size="small" column={column} {...rest}>
      {data.map((item,index) => <Descriptions.Item key={index} label={item.label} span={item.span ? item.span : 1}>{item.value !== '' ? item.value : '-'}</Descriptions.Item>)}
    </Descriptions>
    {notes !== '' && (
      <Alert type="success" message={notes} style={{ marginTop : '10px'}} />
    )}
  </Row>
);

InfoList.propTypes = {
  column: PropTypes.number,
  notes: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any))
};

InfoList.defaultProps = {
  column: 2,
  title: '',
  className: '',
  notes: '',
};

export default InfoList;
