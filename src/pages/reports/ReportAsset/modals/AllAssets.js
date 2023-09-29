import React from 'react';
import { useHistory } from "react-router-dom";

/* *** Antd Components *** */
import { Row, Col, Typography } from 'antd';
/* *** Custom Components *** */
import { Button } from '../../../../components/styled-components/button';

/* *** Styles *** */
import './AllAssets.css';

/* *** Images *** */
import allAssetLogo from '../../../../assets/images/asset.png';

const { Text, Title } = Typography;

const AllAssets = ({ allAssetsValue }) => {
    const history = useHistory();

    return (
        <div style={{ margin: '20px 0' }}>
            <Row type="flex" justify="center">
                <Col span={10} className="all-assets-block">
                    <img src={allAssetLogo} alt="" style={{ height: '130px' }} />
                    <Row type="flex" justify="center" align="middle" style={{ flexDirection: 'column' }}>
                        <Text>All Assets</Text>
                        <Title level={4}>{allAssetsValue}</Title>
                    </Row>
                </Col>
                <div style={{ display: "flex", marginLeft:"40px", flexDirection: 'column', alignItems: "center", alignContent: "center", justifyContent: "center", justifyItems: "center" }}>

                    <Button style={{ width: "auto", marginLeft: "auto" }} onClick={() => {
                        history.push("/asset_allocation")

                    }}> Add New Asset</Button>
                </div>
            </Row>
        </div>
    );
}

export default AllAssets;
