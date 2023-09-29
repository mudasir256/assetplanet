import React, { Component } from "react";
import { connect } from "react-redux";
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Form, Button, Row, Col, DatePicker, Radio, Icon } from "antd";
import moment from "moment";

const dateFormat = "MM/DD/YYYY";

const formID = "InheritedIRASubForm";
class InheritedIRASubForm extends Component {
  static FnCreateFormData(data) {
    let formData = {
      title: "Inherited IRA Information",
      fields: [
        {
          id: "birthDate",
          title: "Deceased IRA Owner's Date of Birth",
          value: data["birthDate"],
        },
        {
          id: "deathDate",
          title: "Deceased IRA Owner's Date of Death",
          value: data["deathDate"],
        },
        {
          id: "relationship",
          title: "Owner's Relationship to Deceased",
          value: data["relationship"],
        },
      ],
    };

    return formData;
  }

  constructor(props) {
    super(props);

    this.state = {
      enableNext: false,
      formData: {
        birthDate: "",
        deathDate: "",
        relationship: "",
      },
      size: "large",
    };

    this.goNextForm = this.goNextForm.bind(this);
    this.goPreviousForm = this.goPreviousForm.bind(this);
    this.updateFormData = this.updateFormData.bind(this);

    this.handleFormInputChange = this.handleFormInputChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    this.updateFormData(this.props.subFormData);
  }

  updateFormData(newFormData) {
    let formData = this.state.formData;
    if (newFormData.hasOwnProperty("fields")) {
      for (var findex = 0; findex < newFormData.fields.length; findex++) {
        if (newFormData.fields[findex]["id"] == "birthDate") {
          formData["birthDate"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "deathDate") {
          formData["deathDate"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "relationship") {
          formData["relationship"] = newFormData.fields[findex]["value"];
        }
      }

      let enableNext = false;
      if (
        formData["birthDate"] != "" &&
        formData["deathDate"] != "" &&
        formData["relationship"] != ""
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
      formData["birthDate"] != "" &&
      formData["deathDate"] != "" &&
      formData["relationship"] != ""
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

  handleDatePickerChange(name, date, dateString) {
    this.handleFormInputChange(name, dateString);
  }

  goNextForm(bEnd = false) {
    if (!this.state.enableNext) {
      return;
    }

    let formData = InheritedIRASubForm.FnCreateFormData({
      birthDate: this.state.formData["birthDate"],
      deathDate: this.state.formData["deathDate"],
      relationship: this.state.formData["relationship"],
    });

    this.props.cbUpdateSubForm(formID, formData, true, bEnd);

    if (!bEnd) {
      // this.props.cbGoSubForm("QuestionContributionDistributionSubForm");
      this.props.cbGoNext(formID);
    }
  }

  goPreviousForm() {
    // this.props.cbGoSubForm("QuestionRMDAdditionalSubForm");
    this.props.cbGoPrev(formID);
  }

  render() {
    const { size } = this.state;
    return (
      <React.Fragment>
        <div className="info-form-block">
          <h2 className="text-center font-weight-bold mb-4">
            Inherited IRA Information
          </h2>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Deceased IRA Owner's Date of Birth">
                <DatePicker
                  style={{ width: "100%" }}
                  format={dateFormat}
                  onChange={(date, dateString) =>
                    this.handleDatePickerChange("birthDate", date, dateString)
                  }
                  value={
                    this.state.formData.birthDate == ""
                      ? null
                      : moment(this.state.formData.birthDate, dateFormat)
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Deceased IRA Owner's Date of Death">
                <DatePicker
                  style={{ width: "100%" }}
                  format={dateFormat}
                  onChange={(date, dateString) =>
                    this.handleDatePickerChange("deathDate", date, dateString)
                  }
                  value={
                    this.state.formData.deathDate == ""
                      ? null
                      : moment(this.state.formData.deathDate, dateFormat)
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Owner's Relationship to Deceased">
                <Radio.Group
                  name="relationship"
                  onChange={(event) => this.handleInputChange(event)}
                  value={this.state.formData.relationship}
                >
                  <Radio.Button value="Spouse">Spouse</Radio.Button>
                  <Radio.Button value="Non - Spouse">Non - Spouse</Radio.Button>
                  <Radio.Button value="Charity, Estate or Trust">
                    Charity, Estate or Trust
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>
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
      </React.Fragment>
    );
  }
}

export default connect()(InheritedIRASubForm);
