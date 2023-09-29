import React, { Component } from "react";
import SubFormTable from "../../SubFormTable";
import { Button, Icon, Col, Row, Form, Input } from "antd";
import Footer from "../components/footer";
import AddModal from "../components/addmodal";
import Header from "../components/header";
import Add from "../components/add";

const formName = "InsuranceCoverageForm";

class InsuranceCoverageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      insurance_rows: [],
      formData: {},
    };
  }

  componentDidMount() {
    if (
      this.props.disasterObject.InsuranceCoverageForm &&
      this.props.disasterObject.InsuranceCoverageForm.hasOwnProperty(
        "insurance_coverage"
      )
    )
      this.setState({
        insurance_rows:
          this.props.disasterObject.InsuranceCoverageForm.insurance_coverage,
      });
  }

  handleFormChange(key, rows) {
    let formData = this.state.formData;

    formData[key] = rows;
    this.setState({
      formData: formData,
    });
  }

  getRow = () => {
    return (
      <Row type="flex" className="custom-sub-container">
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Type of Coverage</span>
            <span className="custom-table-value-text">Adam Meyers</span>
            <span className="custom-table-value-text">Adam Meyers</span>
            <span className="custom-table-value-text">Adam Meyers</span>
            <span className="custom-table-value-text">Adam Meyers</span>
            <span className="custom-table-value-text">Adam Meyers</span>
            <span className="custom-table-value-text">Adam Meyers</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Policy Number</span>
            <span className="custom-table-value-text">Nicole</span>
            <span className="custom-table-value-text">Nicole</span>
            <span className="custom-table-value-text">Nicole</span>
            <span className="custom-table-value-text">Nicole</span>
            <span className="custom-table-value-text">Nicole</span>
            <span className="custom-table-value-text">Nicole</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Agent Name</span>
            <span className="custom-table-value-text">Nicole</span>
            <span className="custom-table-value-text">Nicole</span>
            <span className="custom-table-value-text">Nicole</span>
            <span className="custom-table-value-text">Nicole</span>
            <span className="custom-table-value-text">Nicole</span>
            <span className="custom-table-value-text">Nicole</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Agend Phone</span>
            <span className="custom-table-value-text">+1-234-5678</span>
            <span className="custom-table-value-text">+1-234-5678</span>
            <span className="custom-table-value-text">+1-234-5678</span>
            <span className="custom-table-value-text">+1-234-5678</span>
            <span className="custom-table-value-text">+1-234-5678</span>
            <span className="custom-table-value-text">+1-234-5678</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Coverages</span>
            <span className="custom-table-value-text">Note will Come here</span>
            <span className="custom-table-value-text">Note will Come here</span>
            <span className="custom-table-value-text">Note will Come here</span>
            <span className="custom-table-value-text">Note will Come here</span>
            <span className="custom-table-value-text">Note will Come here</span>
            <span className="custom-table-value-text">Note will Come here</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Deductible</span>
            <span className="custom-table-value-text">Note will come here</span>
            <span className="custom-table-value-text">Note will come here</span>
            <span className="custom-table-value-text">Note will come here</span>
            <span className="custom-table-value-text">Note will come here</span>
            <span className="custom-table-value-text">Note will come here</span>
            <span className="custom-table-value-text">Note will come here</span>
          </div>
        </Col>
      </Row>
    );
  };

  render() {
    const InsuranceCoverageForm = [
      {
        title: "",
        dataIndex: "policy_number",
        key: "policy_number",
        fields: [
          {
            type: "Input",
            name: "policy_number",
          },
        ],
      },
      {
        title: "Policy Number",
        dataIndex: "policy_number",
        key: "policy_number",
        fields: [
          {
            type: "Input",
            name: "policy_number",
          },
        ],
      },
      {
        title: "Agent Name",
        dataIndex: "agent_name",
        key: "agent_name",
        fields: [
          {
            type: "Input",
            name: "agent_name",
          },
        ],
      },
      {
        title: "Agent Phone Number",
        dataIndex: "agent_phone_number",
        key: "agent_phone_number",
        fields: [
          {
            type: "Input",
            name: "agent_phone_number",
          },
        ],
      },
      {
        title: "Coverages",
        dataIndex: "coverages",
        key: "coverages",
        fields: [
          {
            type: "Input",
            name: "coverages",
          },
        ],
      },
      {
        title: "Deductible",
        dataIndex: "deductible",
        key: "deductible",
        fields: [
          {
            type: "Input",
            name: "deductible",
          },
        ],
      },
    ];

    const {
      handleInputChange,
      disasterObject,
      handleDatePickerChange,
      handleSelectChange,
      handleFormInputChange,
    } = this.props;

    return (
      <React.Fragment>
        <Header title={"Policies Owned"} />
        <Row gutter={16}>
          <Col
            span={24}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <h4 className="text-center mb-4">
              Do you want to import policies from Insurance Module ?
            </h4>
            <Button
              type="primary"
              size={"medium"}
              style={{ background: "#39b54a", width: "10%", marginLeft: '20px' }}
            >
              <span className="custom-footer-text">Import</span>
            </Button>
          </Col>
        </Row>

        {this.getRow()}

        <Row
          gutter={16}
          type="flex"
          justify="center"
          style={{ marginTop: "50px" }}
        >
          <Col span={16}>
            <Form.Item label="Based on your coverage amounts, you are over/under insured by:">
              <Input
                defaultValue={disasterObject[formName].location}
                size={"large"}
                addonBefore="$"
                name="location"
                onChange={(event) => handleInputChange(event, formName)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Footer cbPrev={this.props.previousForm} />
      </React.Fragment>
    );
  }
}

export default InsuranceCoverageForm;
