import React, { Component } from "react";
import { connect } from "react-redux";
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Button, Icon } from "antd";

import SubFormTable from "../../../../components/SubFormTable";
import { setClientInfoObject } from "../../../../redux/slices/clientInfoSlice";

const relations = ["Child", "Parent", "Grandparent", "GrandChild"];

var formChanged = false;
var formData = [];
let formDataa = [];
const formID = "OthersImpactedSubForm";
class OthersImpactedSubForm extends Component {
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

  // updateFormData(newFormData){
  //     console.log('updateformdata:', newFormData);
  //     if(newFormData.hasOwnProperty('data')){
  //         let newRows = [];
  //         for(var index = 0; index < newFormData['data'].length; index++){
  //             newRows.push({
  //                 key: newFormData['data'][index]['id'],
  //                 uuid: newFormData['data'][index]['id'],
  //                 id: newFormData['data'][index]['id'],
  //                 relationship: newFormData['data'][index]['relationship'],
  //                 firstName: newFormData['data'][index]['firstName'],
  //                 lastName: newFormData['data'][index]['lastName'],
  //                 contactNumber: newFormData['data'][index]['contactNumber'],
  //                 emailAddress: newFormData['data'][index]['emailAddress'],
  //                 contactPersonFirstName: newFormData['data'][index]['contactPersonFirstName'],
  //                 contactPersonLastName: newFormData['data'][index]['contactPersonLastName'],
  //                 notes: newFormData['data'][index]['notes']
  //             })
  //         }

  //         this.setState({
  //             rows: newRows
  //         })
  //     }
  // }

  updateFormData(newFormData) {
    newFormData = formDataa;
    let newRows = [];
    if (formDataa.length > 0) {
      formDataa.map((newFormData) => {
        newRows.push({
          uuid: newFormData["uuid"],
          key: newFormData["key"],
          relationship: newFormData["fields"][0]["value"],
          firstName: newFormData["fields"][1]["value"],
          lastName: newFormData["fields"][2]["value"],
          contactNumber: newFormData["fields"][3]["value"],
          emailAddress: newFormData["fields"][4]["value"],
          contactPersonFirstName: newFormData["fields"][5]["value"],
          contactPersonLastName: newFormData["fields"][6]["value"],
          notes: newFormData["fields"][7]["value"],
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

    this.state.rows["formName"] = "OthersFinanciallyImpactedForm"
    
    this.props.handleClientInfoObject(this.state.rows)

    if (formChanged) {
      let newFormData = [];
      let depindex = 0;
      let rows = [];
      formDataa = [];
      for (var index = 0; index < formData.length; index++) {
        rows = this.state.rows;
        newFormData.push({
          relationship: formData[index]["relationship"],
          firstName: formData[index]["firstName"],
          lastName: formData[index]["lastName"],
          contactNumber: formData[index]["contactNumber"],
          emailAddress: formData[index]["emailAddress"],
          contactPersonFirstName: formData[index]["contactPersonFirstName"],
          contactPersonLastName: formData[index]["contactPersonLastName"],
          notes: formData[index]["notes"],
        });

        depindex = index + 1;
        formDataa.push({
          title: "Others Impacted " + depindex + " Information",
          uuid: rows[index]["uuid"],
          key: rows[index]["key"],
          fields: [
            {
              id: "relationship",
              title: "Relationship",
              value: newFormData[index]["relationship"],
            },
            {
              id: "firstName",
              title: "First Name",
              value: formData[index]["firstName"],
            },
            {
              id: "lastName",
              title: "Last Name",
              value: formData[index]["lastName"],
            },
            {
              id: "contactNumber",
              title: "Contact Number",
              value: newFormData[index]["contactNumber"],
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
      this.props.cbUpdateSubForm(formID, newFormData, false);
    }

    this.props.cbGoSubForm("EndSubForm");
  }

  goPreviousForm() {
    this.props.cbGoSubForm("QuestionCharitySubForm");
  }

  formChange(rows) {
    formChanged = true;
    formData = rows;
  }

  render() {
    const colsFormat = [
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
        title: "Name",
        dataIndex: "name",
        key: "name",
        fields: [
          {
            type: "Input",
            name: "firstName",
            placeholder: "First Name",
          },
          {
            type: "Input",
            name: "lastName",
            placeholder: "Last Name",
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
        dataIndex: "contact_person",
        key: "contact_person",
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
          },
        ],
      },
    ];

    return (
      <React.Fragment>
        <SubFormTable
          title="Others Financially Impacted"
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

export default connect(mapStateToProps,mapDispatchToProps)(OthersImpactedSubForm);
