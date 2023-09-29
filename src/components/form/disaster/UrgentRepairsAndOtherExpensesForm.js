import React, { Component } from "react";
import SubFormTable from "../../SubFormTable";
import { Button, Icon, Col, Row } from "antd";
import Header from "../components/header";
import Add from "../components/add";
import Footer from "../components/footer";
import AddModal from "../components/addmodal";

const formName = "UrgentRepairsAndOtherExpensesForm";

class UrgentRepairsAndOtherExpensesForm extends Component {
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
      this.props.disasterObject.UrgentRepairsAndOtherExpensesForm &&
      this.props.disasterObject.UrgentRepairsAndOtherExpensesForm.hasOwnProperty(
        "urgent_repair_expenses"
      )
    )
      this.setState({
        insurance_rows:
          this.props.disasterObject.UrgentRepairsAndOtherExpensesForm
            .urgent_repair_expenses,
      });
  }

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
              <span className="custom-field-heading-style">Repair Mode:</span>
              <span className="custom-field-value-style"> Repair Mode</span>
            </div>
          </div>
        </Col>
        <Col span={7}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Cost:</span>
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

  setVisible = () => {
    if (this.state.isVisible) this.setState({ isVisible: false });
    else this.setState({ isVisible: true });
  };

  render() {
    const fields = [
      {
        title: "Enter Repair Mode",
        type: "input",
      },
      {
        title: "Cost of Repair",
        type: "currency",
      },
      {
        title: "Upload Reciept",
        type: "document",
      },
    ];

    const UrgentRepairsAndOtherExpensesForm = [
      {
        title: "Repair Made",
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
        title: "Cost of Repair",
        dataIndex: "cost_of_repair",
        key: "cost_of_repair",
        fields: [
          {
            type: "Currency",
            name: "cost_of_repair",
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

    return (
      <React.Fragment>
        <AddModal
          title={"Add New Detail"}
          fields={fields}
          isVisible={this.state.isVisible}
          cbClose={this.setVisible}
        />
        <Header title={"Urgent Repairs and Other Expenses"} />

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

export default UrgentRepairsAndOtherExpensesForm;
