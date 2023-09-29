import React from 'react';
import PropTypes from 'prop-types';

/* *** Antd Components *** */
import { Row, Col } from 'antd';

/* *** Styles *** */
import './ReportInfo.css';

const ReportInfoRow = props => (
    <div className="infoWrap">
        <div className="infoTitle">{props.title} : </div>
        <div className="infoValue">{props.value}</div>
    </div>
);

const ReportInfo = ({
    data, ...rest
}) => (
    <div className="asset-report-info-wrapper" {...rest}>
        <Row gutter={[40, 16]} style={{ width: '80%', margin: 'auto' }}>
            {data.map((info, index) => (
                <Col span={12} key={String(index)}>
                    <ReportInfoRow title={info.title} value={info.value === '' ? '-' : info.value} />
                </Col>
            ))}
        </Row>
    </div>
);

ReportInfo.propTypes = {
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired
};

ReportInfo.defaultProps = {

};

export default ReportInfo;
