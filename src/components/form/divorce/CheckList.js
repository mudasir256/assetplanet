import React, { Component } from "react";
import { Row, Col, Checkbox, Button, Icon } from "antd";

class CheckList extends Component {
  render() {
    const {
      currentForm,
      handleInputChange,
      divorceObject,
      handleDatePickerChange,
      handleSelectChange,
      handleFormInputChange,
      handleToggleCustomChange,
      handleChecklistChange,
    } = this.props;
    return (
      <React.Fragment>
        <div className="info-form-block">
          <Row gutter={16}>
            <Col span={24}>
              <h2 className="text-center font-weight-bold mb-4">Check List</h2>
            </Col>
          </Row>

          <Row
            gutter={16}
            type="flex"
            justify="center"
            style={{ marginBottom: "30px" }}
          >
            <Col span={16}>
              <Checkbox
                   onChange={(e) => {
                    if(e.target.checked){
                      const val= "true"
                    handleChecklistChange(e.target.name, val, currentForm);
  
                    }
                    else{
                    handleChecklistChange(e.target.name, "false", currentForm);
                    }
                  }}
                size={"large"}
                name="beneficiary"
              >
                Beneficiary changes should be done now
              </Checkbox>
            </Col>
          </Row>

          <Row
            gutter={16}
            type="flex"
            justify="center"
            style={{ marginBottom: "30px" }}
          >
            <Col span={16}>
              <Checkbox
                onChange={(e) => {
                  if(e.target.checked){
                    const val= "true"
                  handleChecklistChange(e.target.name, val, currentForm);

                  }
                  else{
                  handleChecklistChange(e.target.name, "false", currentForm);
                  }
                }}
                size={"large"}
                name="trust"
              >
                
                Will / Trust changes should be done now{" "}
              </Checkbox>
            </Col>
          </Row>

          <Row
            gutter={16}
            type="flex"
            justify="center"
            style={{ marginBottom: "30px" }}
          >
            <Col span={16}>
              <Checkbox
                  onChange={(e) => {
                    if(e.target.checked){
                      const val= "true"
                    handleChecklistChange(e.target.name, val, currentForm);
  
                    }
                    else{
                    handleChecklistChange(e.target.name, "false", currentForm);
                    }
                  }}
                size={"large"}
                name="retitling"
              >
         
                Ensure retitling of assets done now{" "}
              </Checkbox>
            </Col>
          </Row>
        </div>

        <div className="row justify-content-between">
          <div className="col-8">
            <Button
              type="primary"
              size={"large"}
              onClick={() => this.props.previousForm()}
            >
              <Icon type="left" />
              Previous
            </Button>
          </div>
          <div className="col-4 d-flex justify-content-end">
            <Button
              type="primary"
              size={"large"}
              onClick={() => {
                console.log("FORM DATA ", this.props.divorceObject);
                this.props.navigate("/divorce");
              }}
            >
              Finish
              <Icon type="right" />
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CheckList;
