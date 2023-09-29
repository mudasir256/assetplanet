import React, { Component } from "react";
import SubFormTable from "../../SubFormTable";
import { Button, Icon, Col, Row } from "antd";
import Header from "../components/header";
import Add from "../components/add";
import Footer from "../components/footer";
import AddModal from "../components/addmodal";

const formName = "InsuranceContactInfoForm";

class InsuranceContactInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      insurance_rows: [],
      formData: {},
      isVisible: false,
    };
  }

  componentDidMount() {
    if (
      this.props.disasterObject.InsuranceContactInfoForm &&
      this.props.disasterObject.InsuranceContactInfoForm.hasOwnProperty(
        "insurance_contact_info"
      )
    )
      this.setState({
        insurance_rows:
          this.props.disasterObject.InsuranceContactInfoForm
            .insurance_contact_info,
      });
  }

  check = () => {
    let isNo = false;
    if (
      this.props.disasterObject["EmergencyResponseContactInfoForm"] &&
      this.props.disasterObject["EmergencyResponseContactInfoForm"][
        "emergency_response_contact"
      ] &&
      this.props.disasterObject["EmergencyResponseContactInfoForm"][
        "emergency_response_contact"
      ].length > 0
    ) {
      this.props.disasterObject["EmergencyResponseContactInfoForm"][
        "emergency_response_contact"
      ].map((item) => {
        if (item["police_report_fired"] === "Yes") isNo = true;
      });
    }

    return isNo;
  };

  handleFormChange(key, rows) {
    let formData = this.state.formData;

    formData[key] = rows;
    this.setState({
      formData: formData,
    });
  }

  getRow = ({ index }) => {
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
              <span className="custom-field-heading-style">Name:</span>
              <span className="custom-field-value-style"> Danish Asim</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Department:</span>
              <span className="custom-field-value-style"> Electrical</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Notes:</span>
              <span className="custom-field-value-style">
                The Notes to be Placed Here
              </span>
            </div>
          </div>
        </Col>
        <Col span={7}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Phone Number:</span>
              <span className="custom-field-value-style"> +1-952-656998</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Claim Number:</span>
              <span className="custom-field-value-style"> 256DS6</span>
            </div>
          </div>
        </Col>

        <Col span={6}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">
                Date of Contract:
              </span>
              <span className="custom-field-value-style"> DD-MM-YYYY</span>
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
    const InsuranceContactInfoForm = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        fields: [
          {
            type: "Input",
            name: "name",
          },
        ],
      },
      {
        title: "Phone Number",
        dataIndex: "phone_number",
        key: "phone_number",
        fields: [
          {
            type: "PhoneNumber",
            name: "phone_number",
          },
        ],
      },
      {
        title: "Date Of Contact",
        dataIndex: "date_of_contact",
        key: "date_of_contact",
        fields: [
          {
            type: "DatePicker",
            name: "date_of_contact",
          },
        ],
      },
      {
        title: "Department",
        dataIndex: "department",
        key: "department",
        fields: [
          {
            type: "Input",
            name: "department",
          },
        ],
      },
      {
        title: "Claim Number",
        dataIndex: "claim_number",
        key: "claim_number",
        fields: [
          {
            type: "PhoneNumber",
            name: "claim_number",
          },
        ],
      },
      {
        title: "Notes",
        dataIndex: "notes",
        key: "notes",
        fields: [
          {
            type: "Input",
            name: "notes",
          },
        ],
      },
    ];

    const fields = [
      {
        title: "Name",
        type: "input",
      },
      {
        title: "Department",
        type: "input",
      },
      {
        title: "Claim Number",
        type: "input",
      },
      {
        title: "Date of Contract",
        type: "date",
      },
      {
        title: "Enter Phone No",
        type: "phone",
      },
      {
        title: "Notes",
        type: "textarea",
      },
    ];

    return (
      <React.Fragment>
        <AddModal
          title={"Add New Contract"}
          fields={fields}
          isVisible={this.state.isVisible}
          cbClose={this.setVisible}
        />

        <div className="info-form-block">
          <Row gutter={16}>
            <Col span={24}>
              <h2 className="text-center font-weight-bold mb-4">
                Insurance Contact
              </h2>
            </Col>
            <Col span={24}>
              <h2 className="text-center mb-4">
                Make sure to get answers to these questions:
              </h2>
            </Col>
            <Col span={24}>
              <h4 className="text-center mb-4">
                How long will it take to get claim paperwork?<br></br>
                How long do I have to complete paperwork?<br></br>
                Do I need to get estimates ?<br></br>
                When will Adjuster come to inspect damage?
              </h4>
            </Col>
          </Row>
        </div>

        <Add
          title={"Contracts"}
          button={"Add New Contract"}
          cbAdd={this.setVisible}
        />

        {this.getRow({ index: 1 })}
        {this.getRow({ index: 2 })}

        <Footer cbPrev={this.props.previousForm} cbNext={this.props.nextForm} />
      </React.Fragment>
    );
  }
}

export default InsuranceContactInfoForm;
