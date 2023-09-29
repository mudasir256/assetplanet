import React, { Component } from "react";
import SubFormTable from "../../SubFormTable";
import { Button, Icon, Col, Row } from "antd";
import Header from "../components/header";
import Add from "../components/add";
import Footer from "../components/footer";
import AddModal from "../components/addmodal";

const formName = "HotelMealAndRelatedExpensesForm";

class HotelMealAndRelatedExpensesForm extends Component {
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
      this.props.disasterObject.HotelMealAndRelatedExpensesForm &&
      this.props.disasterObject.HotelMealAndRelatedExpensesForm.hasOwnProperty(
        "hotel_meal_expenses"
      )
    )
      this.setState({
        insurance_rows:
          this.props.disasterObject.HotelMealAndRelatedExpensesForm
            .hotel_meal_expenses,
      });
  }

  setVisible = () => {
    if (this.state.isVisible) this.setState({ isVisible: false });
    else this.setState({ isVisible: true });
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
              <span className="custom-field-heading-style">Hotel Name:</span>
              <span className="custom-field-value-style"> Name</span>
            </div>
          </div>
        </Col>
        <Col span={7}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Cost of Visit:</span>
              <span className="custom-field-value-style"> $100</span>
            </div>
          </div>
        </Col>

        <Col span={5}>
          <div className="custom-field-alignments"></div>
        </Col>

        <Col span={1}>
          <div className="custom-field-alignments-icons">
            <Button
              type="link"
              style={{ fontSize: "21px" }}
              icon="eye"
            ></Button>
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

  render() {
    const HotelMealAndRelatedExpensesForm = [
      {
        title: "Name of Hotel, Resturant, Related Expense",
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
        title: "Cost of Visit",
        dataIndex: "cost_of_visit",
        key: "cost_of_visit",
        fields: [
          {
            type: "Currency",
            name: "cost_of_visit",
          },
        ],
      },
      {
        title: "Upload Recipt",
        dataIndex: "upload_recipt",
        key: "upload_recipt",
        fields: [
          {
            type: "FileUpload",
            name: "upload_recipt",
          },
        ],
      },
    ];

    const fields = [
      {
        title: "Hotel/Restaurant/Related Expense",
        type: "currency",
      },
      {
        title: "Cost of Visit",
        type: "currency",
      },
      {
        title: "Upload Reciept",
        type: "document",
      },
    ];

    return (
      <React.Fragment>
        <AddModal
          title={"Add New Detail"}
          fields={fields}
          isVisible={this.state.isVisible}
          cbClose={this.setVisible}
        />

        <Header title={"Hotel, Meal & Related Expenses"} />
        <Add
          title={"Details"}
          button={"Add New Expense"}
          cbAdd={this.setVisible}
        />

        {this.getRow({ index: 1 })}
        {this.getRow({ index: 2 })}

        <Footer cbPrev={this.props.previousForm} cbNext={this.props.nextForm} />
      </React.Fragment>
    );
  }
}

export default HotelMealAndRelatedExpensesForm;
