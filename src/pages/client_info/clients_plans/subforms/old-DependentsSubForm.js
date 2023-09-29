import React, { Component } from "react";
import { connect } from "react-redux";
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import {
  Form,
  Table,
  Divider,
  Tag,
  Button,
  Row,
  Col,
  Input,
  DatePicker,
  Select,
  Radio,
  Icon,
} from "antd";

import SubFormTable from "../../../../components/SubFormTable";
import Currency from "../../../../components/form/Currency";
import moment from "moment";
import { setClientInfoObject } from "../../../../redux/slices/clientInfoSlice";

const dateFormat = "MM/DD/YYYY";

const relations = ["Child", "Parent", "Grandparent", "GrandChild"];

const child_tax_credits_end_ats = [
  "17 (lives at home - Child Credit)",
  "24 (Goes to College - Child Credit)",
  "Over 17 (Qualifies as Dependent Deduction)",
];

var formChanged = false;
var formData = [];
let formDataa = [];
const formID = "DependentsSubForm";
class DependentsSubForm extends Component {
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
          dependentFirstName: newFormData["fields"][0]["value"],
          dependentLastName: newFormData["fields"][1]["value"],
          birthDate: newFormData["fields"][2]["value"],
          relationship: newFormData["fields"][3]["value"],

          gender: newFormData["fields"][4]["value"],
          disability: newFormData["fields"][5]["value"],

          childTaxCreditsEndAt: newFormData["fields"][6]["value"],
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


    console.log("dependents sub form ",this.state.rows);
    this.state.rows["formName"] = "DependentsForm"

    this.props.handleClientInfoObject(this.state.rows)


    if (formChanged) {
      let newFormData = [];
      let depindex = 0;
      let rows = [];
      formDataa = [];
      for (let index = 0; index < formData.length; index++) {
        rows = this.state.rows;
        newFormData.push({
          firstName: formData[index]["dependentFirstName"],
          lastName: formData[index]["dependentLastName"],
          birthdate: formData[index]["birthDate"],
          relationship: formData[index]["relationship"],
          gender: formData[index]["gender"],
          disability: formData[index]["disability"],
          childTaxCreditEndAt: formData[index]["childTaxCreditsEndAt"],
        });

        depindex = index + 1;
        formDataa.push({
          title: "Dependents " + depindex + " Information",
          uuid: rows[index]["uuid"],
          key: rows[index]["key"],
          fields: [
            {
              id: "dependentFirstName",
              title: "Dependent First Name",
              value: newFormData[index]["firstName"],
            },
            {
              id: "dependentLastName",
              title: "Dependent Last Name",
              value: newFormData[index]["lastName"],
            },
            {
              id: "birthDate",
              title: "Dependent Date of Birth",
              value: formData[index]["birthDate"],
            },
            {
              id: "relationship",
              title: " Dependent Relationship",
              value: newFormData[index]["relationship"],
            },
            {
              id: "gender",
              title: "Dependent Gender",
              value: newFormData[index]["gender"],
            },
            {
              id: "disability",
              title: "Dependent Disability",
              value: newFormData[index]["disability"],
            },
            {
              id: "childTaxCreditsEndAt",
              title: "Dependent Child Tax Credits End At",
              value: newFormData[index]["childTaxCreditEndAt"],
            },
          ],
        });
        this.props.cbUpdateSubForm(formID + "" + index, formDataa[index]);
      }
    }

    this.props.cbGoSubForm("QuestionTrustSubForm");
  }
  goPreviousForm() {
    this.props.cbGoSubForm("QuestionSpousePartnerHasSubForm");
  }
  formChange(rows) {
    formChanged = true;
    formData = rows;
  }

  render() {
    const colsFormat = [
      {
        title: "Dependent Name",
        dataIndex: "dependentName",
        key: "dependentName",
        fields: [
          {
            type: "Input",
            name: "dependentFirstName",
            placeholder: "First Name",
          },
          {
            type: "Input",
            name: "dependentLastName",
            placeholder: "Last Name",
          },
        ],
      },
      {
        title: "Date of Birth",
        dataIndex: "birthDate",
        key: "birthDate",
        fields: [
          {
            type: "DatePicker",
            name: "birthDate",
          },
        ],
      },
      {
        title: "Relationship",
        dataIndex: "relationship",
        key: "relationship",
        fields: [
          {
            type: "Select",
            name: "relationship",
            placeholder: "-Select-",
            values: relations,
          },
        ],
      },
      {
        title: "Gender",
        dataIndex: "gender",
        key: "gender",
        fields: [
          {
            type: "Select",
            name: "gender",
            placeholder: "-Select-",
            values: ["Male", "Female"],
          },
        ],
      },
      {
        title: "Disability?",
        dataIndex: "disability",
        key: "disability",
        fields: [
          {
            type: "Select",
            name: "disability",
            placeholder: "-Select-",
            values: ["Yes", "No"],
          },
        ],
      },
      {
        title: "Child Tax Credits End At",
        dataIndex: "childTaxCreditsEndAt",
        key: "childTaxCreditsEndAt",
        fields: [
          {
            type: "Select",
            name: "childTaxCreditsEndAt",
            placeholder: "-Select-",
            values: child_tax_credits_end_ats,
          },
        ],
      },
    ];

    return (
      <React.Fragment>
        <SubFormTable
          title="Dependent Information"
          rows={this.state.rows}
          colsFormat={colsFormat}
          addNewButton={true}
          cbFormChange={this.formChange}
          tableWidth="85rem"
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

export default connect(mapStateToProps,mapDispatchToProps)(DependentsSubForm);
