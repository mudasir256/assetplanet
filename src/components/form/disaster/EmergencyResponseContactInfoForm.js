import React, { Component } from "react";
import SubFormTable from "../../SubFormTable";
import { Button, Icon, Col, Row } from "antd";
import Header from "../components/header";
import Add from "../components/add";
import Footer from "../components/footer";
import AddModal from "../components/addmodal";

const formName = "EmergencyResponseContactInfoForm";

class EmergencyResponseContactInfoForm extends Component {
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
      this.props.disasterObject.EmergencyResponseContactInfoForm &&
      this.props.disasterObject.EmergencyResponseContactInfoForm.hasOwnProperty(
        "emergency_response_contact"
      )
    )
      this.setState({
        insurance_rows:
          this.props.disasterObject.EmergencyResponseContactInfoForm
            .emergency_response_contact,
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
              <span className="custom-field-value-style"> ADAM MAYERS</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Phone:</span>
              <span className="custom-field-value-style"> +1-900-78601</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Notes:</span>
              <span className="custom-field-value-style">
                Notes will be written here
              </span>
            </div>
          </div>
        </Col>
        <Col span={7}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Report Number:</span>
              <span className="custom-field-value-style"> 4</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">
                {" "}
                Date of Contract:{" "}
              </span>
              <span className="custom-field-value-style"> DD-MM-YYYY</span>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style"> Department: </span>
              <span className="custom-field-value-style"> Health</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">
                {" "}
                Was Police Report Filed:{" "}
              </span>
              <span className="custom-field-value-style"> Yes</span>
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

  handleFormChange(key, rows) {
    let formData = this.state.formData;

    formData[key] = rows;
    this.setState({
      formData: formData,
    });
  }

  setVisible = () => {
    if (this.state.isVisible) this.setState({ isVisible: false });
    else this.setState({ isVisible: true });
  };

  render() {
    const EmergencyResponseContactInfoForm = [
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
        title: "Date of Contact",
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
            type: "Select",
            name: "department",
            placeholder: "-Select-",
            values: ["Medical", "Fire Police", "HAZMAT", "Security", "Others"],
          },
        ],
      },
      {
        title: "Report Number",
        dataIndex: "report_number",
        key: "report_number",
        fields: [
          {
            type: "PhoneNumber",
            name: "report_number",
          },
        ],
      },
      {
        title: "Notes",
        dataIndex: "notes",
        key: "notes",
        fields: [
          {
            type: "TextArea",
            name: "notes",
          },
        ],
      },
      {
        title: "Was Police Report Fired ?",
        dataIndex: "police_report_fired",
        key: "police_report_fired",
        fields: [
          {
            type: "Select",
            name: "police_report_fired",
            placeholder: "-Select-",
            values: ["Yes", "No"],
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
        title: "Report Number",
        type: "input",
      },
      {
        title: "Date of Contract",
        type: "date",
      },
      {
        title: "Department",
        type: "select",
        options: ["Abc", "Def"],
      },
      {
        title: "Was Police Report Filed ?",
        type: "select",
        options: ["Abc", "Def"],
      },
      {
        title: "Phone Number",
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

        <Header title={"Emergency Response Contact"} />

        <Add
          title={"Contract Information"}
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

export default EmergencyResponseContactInfoForm;
