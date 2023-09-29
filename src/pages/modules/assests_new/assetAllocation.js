import React, { useEffect, Fragment, useState } from "react";
import { Row, Col } from "reactstrap";
import { MODULE_API } from "../../../apis";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Loader from "../../../components/styled-components/loader/loader";
import { Link } from "react-router-dom";

const AssetAllocation = () => {
  const [data, setData] = useState();
  const [loading, setIsLoading] = useState(true);
  const history = useHistory();

  async function getAllAssets() {
    // setIsLoading(true);
    await MODULE_API.assetAllocation()
      .then((data) => setData(data))
      .catch((error) => console.log("error found", error));
    setIsLoading(false);
  }

  function handleAssetSelect(name) {
    switch (name) {
      case "Inventory":
        history.push("/inventory_new");
        break;

      case "Collectibles":
        // history.push("/inventory_new")
        history.push({
          pathname: `/collectibles_new`,
        });
        // alert("null");
        break;
        // case "Cash/CD's T-Bills":
        //   // history.push("/inventory_new")
        //   // history.push({
        //   //   pathname: `/collectibles_new`,
        //   // });
        //   alert("null");
        //   break;

      default:
        // value(name);
        history.push({
          pathname: `/assets_new/${name}`,
          //   search: name,
          // state: { detail: response.data }
        });
        break;
    }
  }

  useEffect(() => {
    getAllAssets();
  }, []);

  return (
    <Fragment>
      <div className="info-form-block">
        <Row gutter={16}>
          <Col span={24}>
            <h2 className="text-center font-weight-bold mb-4">
              Asset Allocation
            </h2>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <h2 className="text-center font-weight-bold mb-4">Physical</h2>
            <div className="buttons-container">
              {data &&
                data.physical.map((item, index) => (
                  <Fragment key={index}>
                    {/* <Link to="/assets_new/" params={{ testvalue: "hello" }}> */}
                    <div
                      className="button-wrap"
                      onClick={() => {
                        handleAssetSelect(item.name);
                      }}
                    >
                      <div style={{ flexDirection: "column" }}>
                        <div className="col-12 mt-2">
                          <img src={item.image} height="40px" width="40px" />
                        </div>
                        <div className="col-12 mb-2 mt-2">{item.name}</div>
                      </div>
                    </div>
                    {/* </Link> */}
                  </Fragment>
                ))}
            </div>
          </Col>
          <Col span={12}>
            <h2 className="text-center font-weight-bold mb-4">Investment</h2>

            <div className="buttons-container">
              {data &&
                data.investment.map((item, index) => (
                  <Fragment key={index}>
                    <div
                      className="button-wrap"
                      onClick={() => {
                        handleAssetSelect(item.name);
                      }}
                    >
                      <div style={{ flexDirection: "column" }}>
                        <div className="col-12 mt-2">
                          <img src={item.image} height="40px" width="40px" />
                        </div>
                        <div className="col-12 mb-2 mt-2">{item.name}</div>
                      </div>
                    </div>
                  </Fragment>
                ))}
            </div>
          </Col>
        </Row>
      </div>
      <Loader isLoading={loading} />
    </Fragment>
  );
};

export default AssetAllocation;
