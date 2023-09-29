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
const formID = "CharityInformationSubForm";
class CharityInformationSubForm extends Component {
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
          name: newFormData["fields"][0]["value"],
          contactNumber: newFormData["fields"][1]["value"],
          website: newFormData["fields"][2]["value"],
          emailAddress: newFormData["fields"][3]["value"],
          contactPersonFirstName: newFormData["fields"][4]["value"],
          contactPersonLastName: newFormData["fields"][5]["value"],
          notes: newFormData["fields"][6]["value"],
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

    this.state.rows["formName"] = "CharityForm"
    
    this.props.handleClientInfoObject(this.state.rows)


    if (formChanged) {
      let newFormData = [];
      let depindex = 0;
      let rows = [];
      formDataa = [];
      for (var index = 0; index < formData.length; index++) {
        rows = this.state.rows;
        newFormData.push({
          name: formData[index]["name"],
          contactNumber: formData[index]["contactNumber"],
          website: formData[index]["website"],
          emailAddress: formData[index]["emailAddress"],
          contactPersonFirstName: formData[index]["contactPersonFirstName"],
          contactPersonLastName: formData[index]["contactPersonLastName"],
          notes: formData[index]["notes"],
        });

        depindex = index + 1;
        formDataa.push({
          title: "Charity " + depindex + " Information",
          uuid: rows[index]["uuid"],
          key: rows[index]["key"],
          fields: [
            {
              id: "name",
              title: "Name",
              value: newFormData[index]["name"],
            },
            {
              id: "contactNumber",
              title: "Contact Number",
              value: newFormData[index]["contactNumber"],
            },
            {
              id: "website",
              title: "Website",
              value: formData[index]["website"],
            },
            {
              id: "emailAddress",
              title: " Email Address",
              value: newFormData[index]["emailAddress"],
            },
            {
              id: "contactPersonFirstName",
              title: "Contact Person First Name",
              value: newFormData[index]["contactPersonFirstName"],
            },
            {
              id: "contactPersonLastName",
              title: "Contact Person Last Name",
              value: formData[index]["contactPersonLastName"],
            },
            {
              id: "notes",
              title: " Notes",
              value: newFormData[index]["notes"],
            },
          ],
        });
        this.props.cbUpdateSubForm(formID + "" + index, formDataa[index]);
      }
    }

    this.props.cbGoSubForm("QuestionFinanciallyOthersSubForm");
  }

  goPreviousForm() {
    this.props.cbGoSubForm("QuestionCorporationSubForm");
  }

  formChange(rows) {
    formChanged = true;
    formData = rows;
  }

  render() {
    const colsFormat = [
      {
        title: "Name of Charity",
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
        title: "Phone Number",
        dataIndex: "contactNumber",
        key: "contactNumber",
        fields: [
          {
            type: "PhoneNumber",
            name: "contactNumber",
          },
        ],
      },
      {
        title: "Web Address",
        dataIndex: "website",
        key: "website",
        fields: [
          {
            type: "WebAddress",
            name: "website",
          },
        ],
      },
      {
        title: "Email",
        dataIndex: "emailAddress",
        key: "emailAddress",
        fields: [
          {
            type: "Email",
            name: "emailAddress",
          },
        ],
      },
      {
        title: "Contact Person",
        dataIndex: "contactPersonFirstName",
        key: "contactPersonFirstName",
        fields: [
          {
            type: "Input",
            name: "contactPersonFirstName",
            placeholder: "First Name",
          },
          {
            type: "Input",
            name: "contactPersonLastName",
            placeholder: "Last Name",
          },
        ],
      },
      {
        title: "Notes",
        dataIndex: "notes",
        key: "notes",
        fields: [
          {
            type: "TextArea",
            name: "notes",
            placeholder: "notes",
          },
        ],
      },
    ];

    return (
      <React.Fragment>
        <SubFormTable
          title="Charity Information"
          rows={this.state.rows}
          colsFormat={colsFormat}
          addNewButton={true}
          cbFormChange={this.formChange}
          tableWidth="90rem"

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

export default connect(mapStateToProps,mapDispatchToProps)(CharityInformationSubForm);
