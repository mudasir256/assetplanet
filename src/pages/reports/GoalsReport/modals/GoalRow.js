import React from 'react';

/* *** Antd Components *** */
import { Row, Col, Progress, Typography } from 'antd';

/* *** Custom Components *** */
import InfoList from '../../../../components/InfoList';

const { Title, Text } = Typography;

const TitleGoal = ({ color, ...rest}) => (
    <Title {...rest} style={{ fontSize: 26, color: color, marginBottom: 16, textAlign: 'center' }} />
);

const ProgressTitle = ({ color, ...rest}) => (
    <Text {...rest} style={{ fontSize: 20, fontWeight: 600, color: color, textAlign: 'center' }} />
);

const ChartText = ({ color, ...rest}) => (
    <Text {...rest} style={{ fontSize: 16, color: color }} />
);

const GoalRow = ({ data }) => {
    return (
        <Row align="middle" justify="space-around" type="flex" gutter={[100, 0]} style={{ margin: '20px 0 30px' }}>
            <Col span={24}>
                <TitleGoal color={data.color}>{data.title}</TitleGoal>
            </Col>
            <Col span={9} style={{ margin: '12px 0', padding: '16px', textAlign: 'center', border: '1px solid #ddd', backgroundColor: 'rgba(237, 237, 237, 0.40)', borderRadius: '10px' }}>
                <Row style={{ marginBottom: 16 }}>
                    <Col>
                        <ProgressTitle color={data.color}>Goal 1 Wedding</ProgressTitle>
                    </Col>
                </Row>
                <Progress type="circle" percent={75} width={150} strokeColor={data.color} />
                <Row style={{ marginTop: 20 }}>
                    <Col>
                        <ChartText color={data.color}>Need : ${data.need}</ChartText>
                    </Col>
                    <Col>
                        <ChartText color={data.color}>Have : ${data.have}</ChartText>
                    </Col>
                </Row>
            </Col>
            <Col span={15}>
                <InfoList column={1} data={data.dataSets} />
            </Col>                    
        </Row>
    );
}

export default GoalRow;
