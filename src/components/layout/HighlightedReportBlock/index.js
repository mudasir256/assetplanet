import React from 'react';

/* *** Antd Components *** */
import { Row, Col, Typography } from 'antd';

/* *** Custom Components *** */

/* *** Styles *** */
import './HighlightedReportBlock.css';

const { Text, Title } = Typography;

const HighlightedReportBlock = ({ title, value, children }) => {
    return (
        <Row type="flex" justify="center">
            <Col span={24} className="highlighted-report-block">
                {children}
                <Row type="flex" justify="center" align="middle" style={{ flexDirection: 'column' }}>
                    <Text>{title}</Text>
                    <Title level={4}>{value}</Title>
                </Row>
            </Col>
        </Row>
    );
}

export default HighlightedReportBlock;
