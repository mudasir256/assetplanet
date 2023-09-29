import React, { Component } from "react";
import { connect } from "react-redux";
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Form, Table, Divider, Tag, Button, Icon } from "antd";

import SubFormTable from "../../../../components/SubFormTable";
import Currency from "../../../../components/form/Currency";
import moment from "moment";
import { setClientInfoObject } from "../../../../redux/slices/clientInfoSlice";

const dateFormat = "MM/DD/YYYY";

const otherTaxCredits = [
  "Adoption Credit",
  "American Opportunity Credit and Lifetime Learning Credit",
  "Child and Dependent Care Credit",
  "Child Tax Credit",
  "Credit for Tax on Undistributed Capital Gain",
  "Credit for the Elderly or Disabled",
  "Credit to Holders of Tax Credit Bonds",
  "Earned Income Tax Credit",
  "Excess Social Security and RRTA Tax Withheld",
  "Foreign Tax Credit",
  "Health Coverage Tax Credit",
  "Low-Income Housing Credit (for Owners)",
  "Nonbusiness Energy Property Credit",
  "Nonrefundable Credit for Prior Year Minimum Tax",
  "Premium Tax Credit (Affordable Care Act)",
  "Residential Energy Efficient Property Credit",
  "Saver's Credit",
];

var formChanged = false;
var formData = [];
let formDataa = [];
const formID = "TrustInformationSubForm";
class TrustInformationSubForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      enableNext: true,
      formData: {},
      rows: [],
    };

    this.goNextForm = this.goNextForm.bind(this);
    this.formChange = this.formChange.bind(this);

    this.updateFormData = this.updateFormData.bind(this);
  }

  componentDidMount() {
    this.updateFormData(this.props.subFormData);
  }

  updateFormData(newFormData) {
    newFormData = formDataa;

    let newRows = [];
    if (formDataa.length > 0) {
      formDataa.map((newFormData) => {
        newRows.push({
          uuid: newFormData["uuid"],
          key: newFormData["key"],
          trustName: newFormData["fields"][0]["value"],
          beneficiariesFirstName: newFormData["fields"][1]["value"],
          beneficiariesLastName: newFormData["fields"][2]["value"],
          percent: newFormData["fields"][3]["value"],
        });
      });
      this.setState(
        {
          rows: newRows,
        },
        () => {
          console.log("rows pushed", this.state.rows);
        }
      );
    }
  }

  goNextForm() {
    if (!this.state.enableNext) {
      return;
    }

    this.state.rows["formName"] = "TrustForm"
    
    this.props.handleClientInfoObject(this.state.rows)

    if (formChanged) {
      let newFormData = [];
      let depindex = 0;
      let rows = [];
      formDataa = [];
      let total = 0;
      for (var index = 0; index < formData.length; index++) {
        total = parseInt(total) + parseInt(formData[index]["percent"]);
        if (parseInt(total) > 100) {
          // formDataa = [];
          // this.props.cbUpdateSubForm(formID, formDataa);
          alert("Overall Total should be 100%");
          return;
        } else {
          rows = this.state.rows;

          newFormData.push({
            name: formData[index]["trustName"],
            firstName: formData[index]["beneficiariesFirstName"],
            lastName: formData[index]["beneficiariesLastName"],
            percentage:
              formData[index]["percent"] != ""
                ? parseInt(formData[index]["percent"])
                : 0,
          });
          depindex = index + 1;
          formDataa.push({
            title: "Trust " + depindex + " Information",
            uuid: rows[index]["uuid"],
            key: rows[index]["key"],
            fields: [
              {
                id: "trustName",
                title: "Trust Name",
                value: newFormData[index]["name"],
              },
              {
                id: "beneficiariesFirstName",
                title: "Beneficiaries First Name",
                value: newFormData[index]["firstName"],
              },
              {
                id: "beneficiariesLastName",
                title: "Beneficiaries Last Name",
                value: newFormData[index]["lastName"],
              },
              {
                id: "percent",
                title: "Beneficiaries Percentage",
                value: formData[index]["percent"],
              },
            ],
          });
          this.props.cbUpdateSubForm(formID + "" + index, formDataa[index]);
        }
      }
    }

    this.props.cbGoSubForm("QuestionCorporationSubForm");
  }
  goPreviousForm() {
    this.props.cbGoSubForm("QuestionDependentSubForm");
  }
  formChange(rows) {
    formChanged = true;
    formData = rows;
  }

  render() {
    const colsFormat = [
      {
        title: "Trust Name",
        dataIndex: "trustName",
        key: "trustName",
        fields: [
          {
            type: "Input",
            name: "trustName",
            placeholder: "Trust Name",
          },
        ],
      },
      {
        title: "Beneficiaries",
        dataIndex: "beneficiaries",
        key: "beneficiaries",
        fields: [
          {
            type: "Input",
            name: "beneficiariesFirstName",
            placeholder: "First Name",
          },
          {
            type: "Input",
            name: "beneficiariesLastName",
            placeholder: "Last Name",
          },
        ],
      },
      {
        title: "Percent",
        dataIndex: "percent",
        key: "percent",
        fields: [
          {
            type: "Percent",
            name: "percent",
            placeholder: "Percentage",
          },
        ],
      },
    ];

    return (
      <React.Fragment>
        <SubFormTable
          title="Trust Information"
          rows={this.state.rows}
          colsFormat={colsFormat}
          addNewButton={true}
          cbFormChange={this.formChange}
        ></SubFormTable>
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
            <Button
              type="primary"
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


const mapDispatchToProps = (dispatch) => {
  // console.log("all inventries",state.rootReducer.clientInfo.clientInfoObject);

  console.log("in map siaptach to props");

  return {
       // dispatching plain actions
      handleClientInfoObject: (data) =>{
        console.log("in map siaptach tssjjshio props");
        dispatch(setClientInfoObject({...data}))},
  };
};

const mapStateToProps = (state) => {
  // console.log("all inventries",state.rootReducer.clientInfo.clientInfoObject);

  return {
    clientInfoObject: state.rootReducer.clientInfo.clientInfoObject
  };
};


export default connect(mapStateToProps,mapDispatchToProps)(TrustInformationSubForm);
