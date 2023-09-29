import React, { Component } from "react";
import { connect } from "react-redux";
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Button, Row, Col } from "antd";

import QuestionContributionDistributionSubForm from "./QuestionContributionDistributionSubForm";

const formID = "QuestionShowFieldsAirplane";
class QuestionShowFieldsAirplane extends Component {
  static FnCreateFormData(data) {
    let formData = {
      title:
        "Asset Planet has created this section so the user can detail what the sale of an asset that does not have the ability for partial sale looks like.Do you want to complete this information now?",
      fields: [
        {
          id: "isShowfield",
          title:
            "Asset Planet has created this section so the user can detail what the sale of an asset that does not have the ability for partial sale looks like.Do you want to complete this information now?",
          value: data["value"],
        },
      ],
    };

    return formData;
  }

  constructor(props) {
    super(props);

    this.state = {
      formData: {
        isShowfield: "",
      },
    };
    this.handleFormInputChange = this.handleFormInputChange.bind(this);
  }

  handleFormInputChange(name, value) {
    this.setState({
      formData: {
        isShowfield: value,
      },
    });

    let formData = QuestionShowFieldsAirplane.FnCreateFormData({
      value: value,
    });

    this.props.cbUpdateSubForm(formID, formData);

    var field = this.props.cbGetSubFormField(
      "AssetInformationSubForm",
      "accountType"
    );

    console.log("field:", field);
    // if(field != null){
    //     if(field['value'] == 'IRA Inherited'){
    //         this.props.cbGoSubForm("InheritedIRASubForm");
    //         return;
    //     }
    // }
    // this.props.cbGoSubForm("QuestionContributionDistributionSubForm");
    this.props.cbGoNext(formID);
  }

  render() {
    return (
      <React.Fragment>
        <div className="info-form-block">
          <Row gutter={16}>
            <Col span={24}>
              <h2
                className="text-center font-weight-bold mb-4"
                style={{ fontSize: "21px" }}
              >
                Asset Planet has created this section so the user can detail
                what the sale of an asset that does not have the ability for
                partial sale looks like.Do you want to complete this information
                now?
              </h2>
            </Col>
            <Col
              span={12}
              className="d-flex align-items-center justify-content-end"
            >
              <Button
                className="pl-4 pr-4"
                type="primary"
                size={"large"}
                onClick={() => this.handleFormInputChange("isShowfield", "Yes")}
              >
                Yes
              </Button>
            </Col>
            <Col span={12}>
              <Button
                className="pl-4 pr-4"
                type="primary"
                size={"large"}
                onClick={() => this.handleFormInputChange("isShowfield", "No")}
              >
                No
              </Button>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default connect()(QuestionShowFieldsAirplane);
