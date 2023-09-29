import React, { Component } from "react";
import { connect } from "react-redux";
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import {
  Button,
  Row,
  Col,
  Input,
  Select,
  Form,
  Collapse,
  Icon,
  Radio,
} from "antd";
import SubFormTable from "../../../../components/SubFormTable";
import {
  HELD_WHERES,
  ACCOUNT_TYPES,
  OWNERS,
  ASSET_STATUSES,
} from "constants/types";
import Collectibles from "../../../../components/organizer/assets/collectibles/collectibles";

const { Option } = Select;
const { Panel } = Collapse;
var formChanged = false;
let formDataa = [];
const formID = "AssetInformationSubForm";
class AssetInformationSubForm extends Component {
  static FnCreateFormData(data) {
    let formData = {
      title: "Asset Information",
      fields: [
        {
          id: "name",
          title: "Name of Asset",
          value: data["name"],
        },
        {
          id: "accountType",
          title: "Account Type/Titled",
          value: data["accountType"],
        },
        {
          id: "owner",
          title: "Owner",
          value: data["owner"],
        },
        {
          id: "assetLoan",
          title: "Asset Loan",
          value: data["assetLoan"],
        },
        {
          id: "assetIncome",
          title: "Asset Income",
          value: data["assetIncome"],
        },
        {
          id: "heldWhere",
          title: "Held Where",
          value: data["heldWhere"],
        },
        {
          id: "accountDigits",
          title: "Account Number",
          value: data["accountDigits"],
        },
        {
          id: "assetStatus",
          title: "Status of Asset",
          value: data["assetStatus"],
        },
      ],

      BeneficiaryAssignment: {
        tittle: "Asset Beneficiary Assignment",
        rows: data.rows,
      },
    };

    return formData;
  }

  constructor(props) {
    super(props);

    this.state = {
      enableNext: false,
      formData: {
        name: "",
        accountType: "",
        assetIncome: "",
        assetLoan: "",
        owner: "",
        heldWhere: "",
        accountDigits: "",
        assetStatus: "Owned",
      },
      rows: [],
      size: "large",
    };

    this.goNextForm = this.goNextForm.bind(this);
    // this.showCollectibleItems = this.showCollectibleItems.bind(this);
    this.goPreviousForm = this.goPreviousForm.bind(this);
    this.updateFormData = this.updateFormData.bind(this);
    this.formChange = this.formChange.bind(this);
    this.handleFormInputChange = this.handleFormInputChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    this.updateFormData(this.props.subFormData);
  }

  updateFormData(newFormData) {
    let formData = this.state.formData;
    if (
      newFormData.BeneficiaryAssignment &&
      newFormData.BeneficiaryAssignment.rows
    )
      this.setState({ rows: newFormData.BeneficiaryAssignment.rows });
    if (newFormData.hasOwnProperty("fields")) {
      for (var findex = 0; findex < newFormData.fields.length; findex++) {
        if (newFormData.fields[findex]["id"] == "name") {
          formData["name"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "accountType") {
          formData["accountType"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "assetLoan") {
          formData["assetLoan"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "assetIncome") {
          formData["assetIncome"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "owner") {
          formData["owner"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "heldWhere") {
          formData["heldWhere"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "accountDigits") {
          formData["accountDigits"] = newFormData.fields[findex]["value"];
        }
        if (
          newFormData.fields[findex]["id"] == "assetStatus" &&
          newFormData.fields[findex]["value"] != ""
        ) {
          formData["assetStatus"] = newFormData.fields[findex]["value"];
        }
      }

      let enableNext = false;
      if (
        formData["name"] != "" &&
        formData["accountType"] != "" &&
        formData["owner"] != ""
      ) {
        enableNext = true;
      }

      this.setState({
        formData: formData,
        enableNext: enableNext,
      });
    }
  }

  handleFormInputChange(name, value) {
    let formData = this.state.formData;
    formData[name] = value;

    let newState = {
      formData: formData,
    };

    if (
      formData["name"] != "" &&
      formData["accountType"] != "" &&
      formData["owner"] != ""
    ) {
      newState["enableNext"] = true;
    } else {
      newState["enableNext"] = false;
    }

    this.setState(newState);
  }

  handleInputChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    this.handleFormInputChange(name, value);
  }

  handleSelectChange(name, value) {
    this.handleFormInputChange(name, value);
  }

  goNextForm(bEnd = false) {

    if (!this.state.enableNext) {
      return;
    }
    let newFormDataa = [];
    let depindex = 0;
    let rows = [];
    formDataa = [];
    let total = 0;
    rows = this.state.rows;
    let formData = AssetInformationSubForm.FnCreateFormData({
      name: this.state.formData["name"],
      accountType: this.state.formData["accountType"],
      owner: this.state.formData["owner"],
      assetLoan: this.state.formData["assetLoan"],
      assetIncome: this.state.formData["assetIncome"],
      heldWhere: this.state.formData["heldWhere"],
      accountDigits: this.state.formData["accountDigits"],
      assetStatus: this.state.formData["assetStatus"],
      rows: this.state.rows,

      // asLoad: this.state.formData["hasLoan"],
      // producesIncome: this.state.formData["producesIncome"],
      // BeneficiaryAssignment: this.state.formData["BeneficiaryAssignment"],
    });

    this.props.cbUpdateSubForm(formID, formData, true, bEnd);

    // for (var index = 0; index < rows.length; index++) {
    //   newFormDataa.push({
    //     name: rows[index]["beneficiariesName"],
    //     percentage:
    //       rows[index]["percent"] != "" ? parseInt(rows[index]["percent"]) : 0,
    //   });
    //   depindex = index + 1;
    //   formDataa.push({
    //     title: "New " + depindex + " Information",
    //     uuid: rows[index]["uuid"],
    //     key: rows[index]["key"],
    //     fields: [
    //       {
    //         id: "beneficiariesName",
    //         title: "Trust Name",
    //         value: newFormDataa[index]["name"],
    //       },

    //       {
    //         id: "percent",
    //         title: "Beneficiaries Percentage",
    //         value: newFormDataa[index]["percentage"],
    //       },
    //     ],
    //   });
    //   console.log(formDataa[index]);
    //   this.props.cbUpdateSubForm(
    //     formID + "" + index,
    //     formDataa[index],
    //     true,
    //     bEnd
    //   );
    // }

    // if (!bEnd) {
    //   this.props.cbGoNext(formID);
    // }
  }

  goPreviousForm() {
    // this.props.cbGoSubForm("AssetAllocationSubForm");
    this.props.cbGoPrev(formID);
    // console.log("Output", this.state.formData);
  }

 

  formChange(rows) {
    formChanged = true;
    this.setState({ rows: rows });
    // formData = rows;
  }

  render() {

    const showCollectibleItems = ()=>{
      console.log("in showCollectibleItems");
      this.props.cbGoNext(formID);
  
    }
    const { size } = this.state;
    const colsFormat = [
      {
        title: "Beneficiaries",
        dataIndex: "beneficiariesName",
        key: "beneficiariesName",
        fields: [
          {
            type: "Select",
            name: "beneficiariesName",
            placeholder: "-Select Name-",
            values: ["Name 1", "Name 2"],
          },
        ],
      },
      {
        title: "Percent",
        dataIndex: "percent",
        key: "percent",
        fields: [
          {
            type: "Percent",
            name: "percent",
            placeholder: "Percentage",
          },
        ],
      },
    ];

    return (
      <React.Fragment>
        {this.props.selectedTitle === "Collectibles" ? (
          <Collectibles showCollectibleItems={showCollectibleItems}/>
        ) : (
          <div>
            <div className="info-form-block pl-5 pr-5">
              <Row gutter={16}>
                <Col span={24}>
                  <h2 className="text-center font-weight-bold mb-4">
                    {this.props.selectedTitle
                      ? this.props.selectedTitle
                      : "Asset Information"}
                  </h2>
                </Col>
              </Row>
              <Row gutter={16} type="flex" justify="center">
                <Col span={16}>
                  <Col>
                    <Form.Item label="Name of Asset">
                      <Input
                        value={this.state.formData.name}
                        name="name"
                        size={size}
                        onChange={(event) => this.handleInputChange(event)}
                      />
                    </Form.Item>
                  </Col>
                </Col>
              </Row>
              <Row gutter={16} type="flex" justify="center">
                <Col span={16}>
                  <Col>
                    <Form.Item label="Account Type/Titled">
                      <Select
                        showSearch
                        placeholder="-Select-"
                        value={this.state.formData.accountType}
                        onChange={(value) =>
                          this.handleSelectChange("accountType", value)
                        }
                        size={size}
                      >
                        {ACCOUNT_TYPES.map((account_type, index) => (
                          <Option key={index} value={account_type}>
                            {account_type}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Col>
              </Row>
              <Row gutter={16} type="flex" justify="center">
                <Col span={16}>
                  <Col>
                    <Form.Item label="Owner">
                      <Select
                        showSearch
                        placeholder="-Select-"
                        value={this.state.formData.owner}
                        onChange={(value) =>
                          this.handleSelectChange("owner", value)
                        }
                        size={size}
                      >
                        {OWNERS.map((owner, index) => (
                          <Option key={index} value={owner}>
                            {owner}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Col>
              </Row>
              <Row gutter={16} type="flex" justify="center">
                <Col span={16}>
                  <Form.Item label="This Asset has a Loan">
                    <Radio.Group
                      name="assetLoan"
                      size={"large"}
                      onChange={(event) => this.handleInputChange(event)}
                      value={this.state.formData.assetLoan}
                    >
                      <Radio.Button value="Yes">Yes</Radio.Button>
                      <Radio.Button value="No">No</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={16} type="flex" justify="center">
                  <Form.Item label="This Asset produces Income">
                    <Radio.Group
                      name="assetIncome"
                      size={"large"}
                      onChange={(event) => this.handleInputChange(event)}
                      value={this.state.formData.assetIncome}
                    >
                      <Radio.Button value="Yes">Yes</Radio.Button>
                      <Radio.Button value="No">No</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24} type="flex" justify="center">
                <SubFormTable
                  title="Asset Beneficiary Assignment"
                  rows={this.state.rows}
                  colsFormat={colsFormat}
                  addNewButtonben={true}
                  cbFormChange={this.formChange}
                ></SubFormTable>
              </Row>
              <Row gutter={16} type="flex" justify="center">
                <Col span={16}>
                  <Col>
                    <Collapse accordion>
                      <Panel header="Advanced Information" key="1">
                        <Row gutter={16}>
                          <Col>
                            <Form.Item label="Held Where">
                              <Select
                                showSearch
                                placeholder="-Select-"
                                value={this.state.formData.heldWhere}
                                onChange={(value) =>
                                  this.handleSelectChange("heldWhere", value)
                                }
                                size={size}
                              >
                                {HELD_WHERES.map((heldWhere, index) => (
                                  <Option key={index} value={heldWhere}>
                                    {heldWhere}
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          <Col>
                            <Form.Item label="Account Number">
                              <Input
                                value={this.state.formData.accountDigits}
                                name="accountDigits"
                                size={size}
                                onChange={(event) =>
                                  this.handleInputChange(event)
                                }
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          <Col>
                            <Form.Item label="Status of Asset">
                              <Select
                                showSearch
                                size={size}
                                placeholder="-Select-"
                                value={this.state.formData.assetStatus}
                                onChange={(value) =>
                                  this.handleSelectChange("assetStatus", value)
                                }
                              >
                                {ASSET_STATUSES.map((assetStatus, index) => (
                                  <Option key={index} value={assetStatus}>
                                    {assetStatus}
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </Col>
                        </Row>
                      </Panel>
                    </Collapse>
                  </Col>
                </Col>
              </Row>
            </div>
            <div className="row justify-content-between">
              <div className="col-8">
                <Button
                  type="primary"
                  size={"large"}
                  onClick={() => this.goPreviousForm()}
                >
                  <Icon type="left" />
                  Previous
                </Button>
              </div>
              <div className="col-4 d-flex justify-content-end">
                {this.props.dataID != null && (
                  <Button
                    type="primary"
                    size={"large"}
                    style={{ marginRight: "10px" }}
                    onClick={() => this.goNextForm(true)}
                  >
                    Update
                  </Button>
                )}
                <Button
                  type="primary"
                  disabled={!this.state.enableNext}
                  size={"large"}
                  onClick={() => this.goNextForm()}
                >
                  Next
                  <Icon type="right" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default connect()(AssetInformationSubForm);
