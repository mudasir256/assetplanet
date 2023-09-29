import React, { Component } from "react";
import { Row, Col, Form, Radio, Input, DatePicker, Button, Icon } from "antd";
import Header from "../components/header";
import Add from "../components/add";
import Footer from "../components/footer";
import AddModal from "../components/addmodal";
import moment from "moment";

const dateFormat = "MM/DD/YYYY";
const formName = "InventoryForm";

class InventoryForm extends Component {
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
              <h2 className="text-center font-weight-bold mb-4">Inventory</h2>
            </Col>
            <Col span={24}>
              <h4 className="text-center mb-4">
                Check items that need to be replacement
              </h4>
            </Col>
          </Row>

          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Total potential loss equals">
                <Input
                  defaultValue={disasterObject[formName].total_potential}
                  size={"large"}
                  addonBefore="$"
                  name="total_potential"
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

export default InventoryForm;
