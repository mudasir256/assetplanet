import React, { Component } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  Button,
  Icon,
  TimePicker,
} from "antd";
import moment from "moment";
import Header from "../components/header";
import Add from "../components/add";
import Footer from "../components/footer";
import AddModal from "../components/addmodal";

const dateFormat = "MM/DD/YYYY";
const formName = "DisasterBasiscsForm";

class DisasterBasiscsForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      handleInputChange,
      disasterObject,
      handleDatePickerChange,
      handleSelectChange,
    } = this.props;

    return (
      <React.Fragment>
        <div className="info-form-block">
          <Row gutter={16}>
            <Col span={24}>
              <h2 className="text-center font-weight-bold mb-4">
                Disaster Information
              </h2>
            </Col>
          </Row>

          <Row gutter={16} type="flex" justify="center">
            <Col span={8}>
              <Form.Item label="Date of Disaster">
                <DatePicker
                  defaultValue={
                    disasterObject[formName].date_of_disaster
                      ? moment(
                          disasterObject[formName].date_of_disaster,
                          dateFormat
                        )
                      : ""
                  }
                  style={{ width: "100%" }}
                  format={dateFormat}
                  size={"large"}
                  onChange={(date, dateString) =>
                    handleDatePickerChange(
                      "date_of_disaster",
                      date,
                      dateString,
                      formName
                    )
                  }
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Time of Disaster">
                <TimePicker
                  defaultValue={
                    disasterObject[formName].time_of_disaster
                      ? moment(
                          disasterObject[formName].time_of_disaster,
                          dateFormat
                        )
                      : ""
                  }
                  style={{ width: "100%" }}
                  // format={dateFormat}
                  use12Hours
                  format="h:mm:ss A"
                  size={"large"}
                  onChange={(date, dateString) =>
                    handleDatePickerChange(
                      "time_of_disaster",
                      date,
                      dateString,
                      formName
                    )
                  }
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Location">
                <Input
                  defaultValue={disasterObject[formName].location}
                  size={"large"}
                  name="location"
                  onChange={(event) => handleInputChange(event, formName)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16} type="flex" justify="center">
            <Col span={24}>
              <Form.Item label="Notes">
                <Input
                  defaultValue={disasterObject[formName].notes}
                  size={"large"}
                  name="notes"
                  onChange={(event) => handleInputChange(event, formName)}
                />
              </Form.Item>
            </Col>
          </Row>
        </div>
        <Footer cbPrev={this.props.previousForm} cbNext={this.props.nextForm} />
      </React.Fragment>
    );
  }
}

export default DisasterBasiscsForm;
