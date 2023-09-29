import React, { Component } from "react";
import { connect } from "react-redux";
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Row, Col, Select } from "antd";
import airplane from "../../../../assets/images/latest/airplane.png";
import { Route, withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";

import {
  ALLOCATIONS,
  ALLOCATIONS_Physical,
  ALLOCATIONS_Physical_Images,
  ALLOCATIONS_Images,
} from "constants/types";
const formID = "AssetAllocationSubForm";
class AssetAllocationSubForm extends Component {
  static FnCreateFormData(data) {
    let formData = {
      title: "Asset Allocation",
      fields: [
        {
          id: "assetsAllocation",
          title: "Asset Allocation",
          value: data["value"],
        },
      ],
    };

    return formData;
  }

  constructor(props) {
    super(props);

    this.state = {
      formData: {
        assetsAllocation: "",
      },
    };
    this.fnAdd = this.fnAdd.bind(this);

    this.handleFormInputChange = this.handleFormInputChange.bind(this);
    this.updateFormData = this.updateFormData.bind(this);
  }
  fnAdd() {
    console.log("in fnadd");
    this.props.history.push("/collectibles_new");
  }
  componentDidMount() {
    this.updateFormData(this.props.subFormData);
  }

  updateFormData(newFormData) {
    console.log("updateformdata:", newFormData);
    if (newFormData.hasOwnProperty("fields")) {
      this.setState({
        formData: {
          assetsAllocation: newFormData["fields"][0]["value"],
        },
      });
    }
  }

  handleFormInputChange(name, value) {
    console.log("value:", value);
    if (value === "Inventory") {
      this.props.history.push("/inventory_new");
    } else
      this.setState({
        formData: {
          assetsAllocation: value,
        },
      });

    let formData = AssetAllocationSubForm.FnCreateFormData({
      value: value,
    });

    this.props.cbUpdateSubForm(formID, formData);

    let nextSubFormID = "";
    switch (value) {
      case "Airplane":
      case "Auto - non-collectible":
      case "Boat":
      case "General Household":
      case "Motorcycles":
        nextSubFormID = "SellingAssetCostsSubForm";
        break;
      // case "Inventory":
      //   nextSubFormID = "InventorySubForm";
      //   break;
      case "Indexes, ETF's and Mutual Funds":
      case "Bonds - Int  Long Term":
      case "Business Interest":
      case "Cash/CD's T-Bills":
      case "Club Membership":
        nextSubFormID = "AssetPerformanceSubForm";
        break;
      case "Collectibles":
        nextSubFormID = "CollectiblesSubForm";
        break;
      case "Livestock":
        nextSubFormID = "LiveStockSubForm";
        break;
      case "Private Placement & VC":
        nextSubFormID = "VCSubForm";
        break;
      case "Real Estate":
        nextSubFormID = "PrimaryResidenceSubForm";
        break;
      case "Stocks - Individual":
        nextSubFormID = "StockSubForm";
        break;
      case "User Defined Portfolio Allocation":
      default:
        nextSubFormID = "UserPortfolioSubForm";
        break;
    }
    nextSubFormID = "AssetInformationSubForm";
    // this.props.cbGoSubForm(nextSubFormID);
    this.props.cbGoNext(formID);
  }

  render() {
    return (
      <React.Fragment>
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
                {ALLOCATIONS_Physical.map((allocation, index) => {
                  let className = "button-wrap";
                  if (this.state.formData["assetsAllocation"] == allocation) {
                    className = className + " selected";
                  }
                  return (
                    <React.Fragment>
                      <div
                        key={index}
                        className={className}
                        onClick={() =>
                          this.handleFormInputChange(
                            "assetsAllocation",
                            allocation
                          )
                        }
                        // onClick={this.fnAdd}
                      >
                        <div style={{ flexDirection: "column" }}>
                          <div className="col-12 mt-2">
                            <img
                              src={ALLOCATIONS_Physical_Images[index]}
                              height="40px"
                              width="40px"
                            />
                          </div>
                          <div className="col-12 mb-2 mt-2">{allocation}</div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </Col>
            <Col span={12}>
              <h2 className="text-center font-weight-bold mb-4">Investment</h2>
              <div className="buttons-container">
                {ALLOCATIONS.map((allocation, index) => {
                  let className = "button-wrap";
                  if (this.state.formData["assetsAllocation"] == allocation) {
                    className = className + " selected";
                  }
                  return (
                    <div
                      key={index}
                      className={className}
                      onClick={() =>
                        this.handleFormInputChange(
                          "assetsAllocation",
                          allocation
                        )
                      }
                    >
                      <div style={{ flexDirection: "column" }}>
                        <div className="col-12 mt-2">
                          <img
                            src={ALLOCATIONS_Images[index]}
                            height="40px"
                            width="40px"
                          />
                        </div>
                        <div className="col-12 mb-2 mt-2">{allocation}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

// export default connect()(AssetAllocationSubForm);
export default withRouter(AssetAllocationSubForm);
