import React, { Component } from "react";
import { connect } from "react-redux";
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Form, Button, Row, Col, Input, Icon } from "antd";
import Percent from "components/form/Percent";

const formID = "MyTrustInformationSubForm";
class MyTrustInformationSubForm extends Component {
  static FnCreateFormData(data) {
    let formData = {
      title: "Trust Information",
      fields: [
        {
          id: "trustName",
          title: "Trust Name",
          value: data["trustName"],
        },
        {
          id: "beneficiariesFirstName",
          title: "Beneficiaries - First Name",
          value: data["beneficiariesFirstName"],
        },
        {
          id: "beneficiariesLastName",
          title: "Beneficiaries - Last Name",
          value: data["beneficiariesLastName"],
        },
        {
          id: "percent",
          title: "Percent",
          value: data["percent"],
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
        clientFirstName: "",
        clientLastName: "",
        clientBirthdate: "",
        clientGender: "",
      },
    };

    this.goNextForm = this.goNextForm.bind(this);
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
        if (newFormData.fields[findex]["id"] == "trustName") {
          formData["trustName"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "beneficiariesFirstName") {
          formData["beneficiariesFirstName"] =
            newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "beneficiariesLastName") {
          formData["beneficiariesLastName"] =
            newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "percent") {
          formData["percent"] = newFormData.fields[findex]["value"];
        }
      }

      let enableNext = false;
      // if(formData['insuranceProduct'] != ''){
      //     enableNext = true;
      // }

      enableNext = true;

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

    if (formData["insuranceProduct"] != "") {
      newState["enableNext"] = true;
    } else {
      newState["enableNext"] = false;
    }

    newState["enableNext"] = true;

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

  goNextForm() {
    if (!this.state.enableNext) {
      return;
    }

    let formData = MyTrustInformationSubForm.FnCreateFormData({
      trustName: this.state.formData["trustName"],
      beneficiariesFirstName: this.state.formData["beneficiariesFirstName"],
      beneficiariesLastName: this.state.formData["beneficiariesLastName"],
      percent: this.state.formData["percent"],
    });

    this.props.cbUpdateSubForm(formID, formData);

    this.props.cbGoSubForm("QuestionTrustSubForm");
  }
  goPreviousForm() {
    this.props.cbGoSubForm("MyDependentInformationSubForm");
  }

  render() {
    return (
      <React.Fragment>
        <div className="info-form-block pl-5 pr-5">
          <Row gutter={16}>
            <Col span={24}>
              <h2 className="text-center font-weight-bold mb-4">
                Trust Information
              </h2>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Trust First Name">
                <Input
                  value={this.state.formData.trustName}
                  name="trustName"
                  size={"large"}
                  onChange={(event) => this.handleInputChange(event)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Beneficiaries Last Name">
                <Input
                  value={this.state.formData.beneficiariesFirstName}
                  name="beneficiariesFirstName"
                  size={"large"}
                  onChange={(event) => this.handleInputChange(event)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Beneficiaries Last Name">
                <Input
                  value={this.state.formData.beneficiariesLastName}
                  name="beneficiariesLastName"
                  size={"large"}
                  onChange={(event) => this.handleInputChange(event)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Percent">
                <Percent
                  name="percent"
                  value={this.state.formData.percent}
                  onChange={(event) => this.handleInputChange(event)}
                />
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

export default connect()(MyTrustInformationSubForm);
