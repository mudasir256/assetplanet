import React, { Component } from "react";
import { Row, Col, Form, Radio, Input, DatePicker, Button, Icon } from "antd";
import moment from "moment";
import SubFormTable from "../../SubFormTable";
import { Collapse, Timeline } from "antd";
import Header from "../components/header";
import Add from "../components/add";
import Footer from "../components/footer";
import AddModal from "../components/addmodal";

const dateFormat = "MM/DD/YYYY";
const formName = "PoliceReportInformationForm";

const { Panel } = Collapse;

class PoliceReportInformationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      police_report_rows: [],
      formData: {},
      isVisible: false,
    };
  }

  componentDidMount() {
    if (
      this.props.disasterObject.PoliceReportInformationForm &&
      this.props.disasterObject.PoliceReportInformationForm.hasOwnProperty(
        "police_report"
      )
    )
      this.setState({
        police_report_rows:
          this.props.disasterObject.PoliceReportInformationForm.police_report,
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

        <Col span={10}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">
                Date Report File:
              </span>
              <span className="custom-field-value-style"> DD-MM-YYYY</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">
                Name of Person:
              </span>
              <span className="custom-field-value-style"> Name</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Notes:</span>
              <span className="custom-field-value-style">
                {" "}
                The Notes to be Placed Here
              </span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">
                Date of Follow Up:
              </span>
              <span className="custom-field-value-style"> DD-MM-YYYY</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">
                Follow-Up Notes:
              </span>
              <span className="custom-field-value-style">
                {" "}
                The Notes to be Placed Here
              </span>
            </div>
          </div>
        </Col>
        <Col span={9}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Report Type:</span>
              <span className="custom-field-value-style"> In Person</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Deoartment:</span>
              <span className="custom-field-value-style"> Department Name</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Phone Number:</span>
              <span className="custom-field-value-style"> +1-952-656998</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">
                Person Spoke With:
              </span>
              <span className="custom-field-value-style"> Person Name</span>
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
    const fields = [
      {
        title: "Date Report Filed",
        type: "date",
      },
      {
        title: "Select Report Type",
        type: "select",
        options: ["Abc", "Def"],
      },
      {
        title: "Name of Person",
        type: "input",
      },
      {
        title: "Phone Number",
        type: "phone",
      },
      {
        title: "Enter Department",
        type: "input",
      },
      {
        title: "Notes",
        type: "textarea",
      },

      {
        title: "Date of Follow-Up",
        type: "date",
      },
      {
        title: "Person Spoke With",
        type: "input",
      },
      {
        title: "Follow-Up Notes",
        type: "textarea",
      },
    ];

    return (
      <React.Fragment>
        <AddModal
          title={"Add New Report"}
          fields={fields}
          isVisible={this.state.isVisible}
          cbClose={this.setVisible}
        />

        <Header title={"Police Report Information"} />

        <Add
          title={"Reports"}
          button={"Add New Report"}
          cbAdd={this.setVisible}
        />

        {this.getRow({ index: 1 })}
        {this.getRow({ index: 2 })}

        <Footer cbPrev={this.props.previousForm} cbNext={this.props.nextForm} />
      </React.Fragment>
    );
  }
}

export default PoliceReportInformationForm;
