import React, { Component } from "react";
import { connect } from "react-redux";
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Button, Icon } from "antd";

import SubFormTable from "../../../../components/SubFormTable";
import { CORPORATE_TYPES, STATES } from "constants/types";
import { setClientInfoObject } from "../../../../redux/slices/clientInfoSlice";

var formChanged = false;
var formData = [];
let formDataa = [];
const formID = "CorporateInformationSubForm";
class CorporateInformationSubForm extends Component {
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
          corporateName: newFormData["fields"][0]["value"],
          corporateType: newFormData["fields"][1]["value"],
          creationDate: newFormData["fields"][2]["value"],
          stateIncorporated: newFormData["fields"][3]["value"],
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


    this.state.rows["formName"] = "CorporateForm"
    
    this.props.handleClientInfoObject(this.state.rows)

    if (formChanged) {
      let newFormData = [];
      let depindex = 0;
      let rows = [];
      formDataa = [];
      for (var index = 0; index < formData.length; index++) {
        rows = this.state.rows;
        newFormData.push({
          name: formData[index]["corporateName"],
          corporateType: formData[index]["corporateType"],
          creationDate: formData[index]["creationDate"],
          stateIncorporated: formData[index]["stateIncorporated"],
        });
        depindex = index + 1;
        formDataa.push({
          title: "Corporate " + depindex + " Information",
          uuid: rows[index]["uuid"],
          key: rows[index]["key"],
          fields: [
            {
              id: "corporateName",
              title: "Corporate Name",
              value: newFormData[index]["name"],
            },
            {
              id: "corporateType",
              title: "Corporate Type",
              value: newFormData[index]["corporateType"],
            },
            {
              id: "creationDate",
              title: "Creation Date",
              value: formData[index]["creationDate"],
            },
            {
              id: "stateIncorporated",
              title: " State Incorporated",
              value: newFormData[index]["stateIncorporated"],
            },
          ],
        });
        this.props.cbUpdateSubForm(formID + "" + index, formDataa[index]);
      }
    }

    this.props.cbGoSubForm("QuestionCharitySubForm");
  }
  goPreviousForm() {
    this.props.cbGoSubForm("QuestionTrustSubForm");
  }
  formChange(rows) {
    formChanged = true;
    formData = rows;
  }

  render() {
    const colsFormat = [
      {
        title: "Corporate Name",
        dataIndex: "corporateName",
        key: "corporateName",
        fields: [
          {
            type: "Input",
            name: "corporateName",
          },
        ],
      },
      {
        title: "Corporate Type",
        dataIndex: "corporateType",
        key: "corporateType",
        fields: [
          {
            type: "Select",
            name: "corporateType",
            placeholder: "-Select-",
            values: CORPORATE_TYPES,
          },
        ],
      },
      {
        title: "Date Created",
        dataIndex: "creationDate",
        key: "creationDate",
        fields: [
          {
            type: "DatePicker",
            name: "creationDate",
          },
        ],
      },
      {
        title: "State Incorporated",
        dataIndex: "stateIncorporated",
        key: "stateIncorporated",
        fields: [
          {
            type: "Select",
            name: "stateIncorporated",
            placeholder: "-Select-",
            values: STATES,
          },
        ],
      },
    ];

    return (
      <React.Fragment>
        <SubFormTable
          title="Corporate Information"
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

export default connect(mapStateToProps,mapDispatchToProps)(CorporateInformationSubForm);
