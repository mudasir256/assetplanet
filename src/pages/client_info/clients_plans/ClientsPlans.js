import React from 'react';
import { Row, Col } from 'antd';
import ClientInformationTable from './ClientInformationTable';

const ClientsPlans = () => {
    return (
        <>           
            <Row>
                <Col>
                    <ClientInformationTable></ClientInformationTable>
                </Col>
            </Row>

        </>
    )
}

export default ClientsPlans;