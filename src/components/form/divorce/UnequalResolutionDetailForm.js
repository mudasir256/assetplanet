import React, { Component } from "react";
import SubFormTable from "../../SubFormTable";
import { Button, Icon, Row, Col, Form, Input } from "antd";

import Header from "../components/header";
import Footer from "../components/footer";
import Add from "../components/add";
import AddModal from "../components/addmodal";
import adjustable from "../../../assets/images/latest/Adjustable.png";

const formName = "childCustody";

class UnequalResolutionDetailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      custody_rows: [],
      formData: {},
      isVisible: false,
    };
  }

  componentDidMount() {
    if (
      this.props.divorceObject.childCustody &&
      this.props.divorceObject.childCustody.hasOwnProperty("child_custody")
    )
      this.setState({
        custody_rows: this.props.divorceObject.childCustody.child_custody,
      });
  }

  handleFormChange(key, rows) {
    let formData = this.state.formData;

    formData[key] = rows;
    this.setState({
      formData: formData,
    });
  }

  getRow = (index) => {
    return (
      <Row type="flex" className="custom-sub-container">
        <Col span={2}>
          <div className="custom-sub-index">
            <span className="custom-index-format">{index}</span>
          </div>
        </Col>

        <Col span={7}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Name of Asset:</span>
              <span className="custom-field-value-style"> House</span>
            </div>

            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Account Owner:</span>
              <span className="custom-field-value-style"> Adam</span>
            </div>
          </div>
        </Col>
        <Col span={7}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Account Type:</span>
              <span className="custom-field-value-style"> Joint</span>
            </div>

            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Account Value:</span>
              <span className="custom-field-value-style"> $33,000</span>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">
                {" "}
                Value as of Date:{" "}
              </span>
              <span className="custom-field-value-style"> DD/MM/YYYY</span>
            </div>
          </div>
        </Col>
        <Col span={1}>
          <div className="custom-field-alignments-icons">
            <Button
              type="link"
              style={{ fontSize: "21px" }}
              icon="edit"
            ></Button>
          </div>
        </Col>
        <Col span={1}>
          <div className="custom-field-alignments-icons">
            <Button
              type="link"
              style={{ fontSize: "21px" }}
              icon="delete"
            ></Button>
          </div>
        </Col>
      </Row>
    );
  };

  setVisible = () => {
    if (this.state.isVisible) this.setState({ isVisible: false });
    else this.setState({ isVisible: true });
  };

  render() {
    const childCustody = [
      {
        title: "Child Name",
        dataIndex: "childName",
        key: "childName",
        fields: [
          {
            type: "Input",
            name: "child_name",
          },
        ],
      },
      {
        title: "Legal Custody",
        dataIndex: "legalCustody",
        key: "legalCustody",
        fields: [
          {
            type: "Select",
            name: "legal_custody",
            placeholder: "-Select-",
            values: ["Joint", "Party 1", "Party 2"],
          },
        ],
      },
      {
        title: "Physical Custody",
        dataIndex: "physicalCustody",
        key: "physicalCustody",
        fields: [
          {
            type: "Select",
            name: "physical_custody",
            placeholder: "-Select-",
            values: ["Joint", "Party 1", "Party 2"],
          },
        ],
      },
    ];

    const fields = [
      {
        title: "Asset Name",
        type: "input",
      },
      {
        title: "Account Owner",
        type: "input",
      },
      {
        title: "Account Value",
        type: "input",
      },
      {
        title: "Account Type",
        type: "select",
        options: ["Joint", "Party 1", "Party 2"],
      },
      {
        title: "Value as of Date",
        type: "date",
      },
    ];

  

    const suffix = (
      <div>
        <span style={{ fontSize: 20 }}>$</span>
      </div>
    );


        // store all modal data in formData state
        const setFormData = (value) => {
          this.setState({
            formData: {
              ...this.state.formData,
              ...value,
            },
          });
        };
    
        const {
          currentForm,
          handleInputChange,
          divorceObject,
          handleDatePickerChange,
          handleSelectChange,
          handleFormInputChange,
          handleToggleCustomChange,
        } = this.props;

    return (
      <React.Fragment>
        <Header image={adjustable} title={"Unequal Resolution Details"} />

        <React.Fragment>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "10%",
              }}
            >
              <h2 className="text-center font-weight-bold">
                Any payment required to satisfy unequal division of community property ?
              </h2>
              <div
                style={{
                  marginLeft: "10%",
                  display: "flex",
                  flexDirection: "row",
                  width: "20%",
                }}
              >
                <div style={{ marginRight: "3%" }}>
                  <Button
                    type="primary"
                    size={"large"}
                    style={{
                      background: "#39b54a",
                      borderRadius: "100px",
                      width: "100px",
                    }}
                    onClick={() => {
                      this.props.history.push("/budget");
                    }}
                  >
                    <span className="custom-footer-text">Yes</span>
                  </Button>
                </div>
                <div>
                  <Button
                    type="primary"
                    size={"large"}
                    style={{
                      background: "white",
                      borderRadius: "100px",
                      width: "100px",
                    }}
                  >
                    <span
                      className="custom-footer-text"
                      style={{ color: "black" }}
                    >
                      No
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </React.Fragment>


        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Party 1 Payment" style={{ fontSize: 17 }}>
              <Input
                placeholder="Enter Amount"
                type={"number"}
                suffix={suffix}
                size={"large"}
                name="payment_party_1"
                onChange={(val) => {
                  handleInputChange(val, currentForm);
                  setFormData({
                    [val.target.name]: val.target.value,
                  });
                }}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Party 2 Payment" style={{ fontSize: 17 }}>
              <Input
                placeholder="Enter Amount"
                type={"number"}
                suffix={suffix}
                size={"large"}
                name="payment_party_2"
                onChange={(val) => {
                  handleInputChange(val, currentForm);
                  setFormData({
                    [val.target.name]: val.target.value,
                  });
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Footer cbPrev={this.props.previousForm} cbNext={this.props.nextForm} />
      </React.Fragment>
    );
  }
}

export default UnequalResolutionDetailForm;
