import React, { Component } from "react";
import SubFormTable from "../../SubFormTable";
import { Button, Icon, Row, Col, Input } from "antd";
import { states } from "../../../constants/moving_states";
import Footer from "../components/footer";
import AddModal from "../components/addmodal";
import Header from "../components/header";
import Add from "../components/add";
import "../../custom/CustomSubFormTable.css";
import support from "../../../assets/images/latest/support.png";
import UpdateModal from "../components/updatemodal";

const formName = "contactListForm";

class ContactListForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact_list: [
        {Name:"Contact Name",LastName:"Last Name",Phone:"+1-345",Email:"contact@gmail.com",TypeOfRelation:"Test",Notes:"Notes"}
      ],
      team_list:[
        {Name:"Team Name",LastName:"Last Name",Phone:"+1-345",Email:"team@gmail.com",TypeOfRelation:"Test",Notes:"Notes"}

      ],
      search: [],
      results: [],
      formData: {},

      isContactAddModalVisible: false,
      isTeamAddModalVisible: false,
      isContactUpdateModalVisible: false,
      isTeamUpdateModalVisible: false,
      updateObject: null,
      selectedIndex:null
    };
  }

  componentDidMount() {
    if (
      this.props.checklistObject.contactListForm &&
      this.props.checklistObject.contactListForm.hasOwnProperty("contact_list")
    )
      this.setState({
        contact_list: this.props.checklistObject.contactListForm.contact_list,
      });

      if (
        this.props.checklistObject.contactListForm &&
        this.props.checklistObject.contactListForm.hasOwnProperty("team_list")
      )
        this.setState({
          contact_list: this.props.checklistObject.contactListForm.team_list,
        });
      this.props.handleChecklistObject(this.props.currentForm,this.state.contact_list)
      this.props.handleChecklistObject(this.props.currentForm,this.state.team_list)

  }

  handleFormChange(key, rows) {
    let formData = this.state.formData;

    formData[key] = rows;
    this.setState({
      formData: formData,
    });
  }

// to handle hide and show for contact add modal
setContactAddModalVisible = () => {
  if (this.state.isContactAddModalVisible)
    this.setState({ isContactAddModalVisible: false });
  else this.setState({ isContactAddModalVisible: true });
};

// to handle hide and show for team  add modal
setTeamAddModalVisible = () => {
  if (this.state.isTeamAddModalVisible)
    this.setState({ isTeamAddModalVisible: false });
  else this.setState({ isTeamAddModalVisible: true });
};

// to handle hide and show for contact update modal
setContactUpdateModalVisible = () => {
  if (this.state.isContactUpdateModalVisible)
    this.setState({ isContactUpdateModalVisible: false });
  else this.setState({ isContactUpdateModalVisible: true });
};

// to handle hide and show for team update modal
setTeamUpdateModalVisible = () => {
  if (this.state.isTeamUpdateModalVisible)
    this.setState({ isTeamUpdateModalVisible: false });
  else this.setState({ isTeamUpdateModalVisible: true });
};

  // function to store updated values of all fields in updateObject
  onUpdateChange = (val, index) => {
    this.setState({
      updateObject: {
        ...this.state.updateObject,
        [index]: val,
      },
    });
  };

  // capture date change of datepicker of update modal
  handleDateChange = (date, dateString, index) => {
    this.onUpdateChange(dateString, index);
  };

        // Function to delete selected row
        deleteSelectedRow = (idx, all_rows, name) => {
          const updatedRows = all_rows.filter((row, index) => {
            return index != idx - 1;
          });
      
          if (name == "contact") {
            this.setState({
              contact_list: updatedRows,
            },()=>{
      this.props.handleChecklistObject(this.props.currentForm,this.state.contact_list)
              
            });
          } else {
            this.setState({
              team_list: updatedRows,
            },()=>{
      this.props.handleChecklistObject(this.props.currentForm,this.state.team_list)

            });
          }
        };
    
    
      // Function to get selected  array (row)
      getSelectedRow = (idx, rows, name) => {
        this.setState({
          selectedIndex: idx,
        });
    
        // get selected row (this will return array of object)
        let selectedRow = rows.filter((row, index) => {
          return index == idx - 1;
        });
    
        // get first and only element from list and store it in update object
        this.setState({
          updateObject: { ...this.state.updateObject, ...selectedRow[0] },
        });
      };
  
  
  //  function to update a specific contact row
  updateContactRow = () => {
    let obj = {
      ...this.state.updateObject,
    };
  
    let { contact_list, selectedIndex } = this.state;
    let index = selectedIndex - 1;
  
    contact_list = [...this.state.contact_list]; // important to create a copy, otherwise you'll modify state outside of setState call
    contact_list[index] = obj; // replace current updated object in contact_list based on index
    this.setState({ contact_list },()=>{
      this.props.handleChecklistObject(this.props.currentForm,this.state.contact_list)

    });
  };
  
  
    //  function to update a specific team row
    updateTeamRow = () => {
      let obj = {
        ...this.state.updateObject,
      };
  
      let { team_list, selectedIndex } = this.state;
      let index = selectedIndex - 1;
  
      team_list = [...this.state.team_list]; // important to create a copy, otherwise you'll modify state outside of setState call
      team_list[index] = obj; // replace current updated object in team_list based on index
      this.setState({ team_list },()=>{
      this.props.handleChecklistObject(this.props.currentForm,this.state.team_list)
        
      });
    };
  
  
  // function to create contact row (data)
  createContact = (currentFormData) => {
  
    // checxk if already formData contains some data then initialize it with empty
    if (Object.keys(this.state.formData).length > 0) {
      this.setState({
        formData: {},
      });
    }
  
    // add current form data in contact_list list with keeping old data
    this.setState({
      contact_list: [...this.state.contact_list, currentFormData.formData],
    },()=>{
      this.props.handleChecklistObject(this.props.currentForm,this.state.contact_list)
      
    });
  };
  
  // function to create team row(data)
  createTeam = (currentFormData) => {
  
    // checxk if already formData contains some data then initialize it with empty
    if (Object.keys(this.state.formData).length > 0) {
      this.setState({
        formData: {},
      });
    }
  
    // add current form data in team_list list with keeping old data
    this.setState({
      team_list: [...this.state.team_list, currentFormData.formData],
    },()=>{
      this.props.handleChecklistObject(this.props.currentForm,this.state.team_list)

    });
  };
  
  
  
    // store all modal data in formData state
    setFormData = (value) => {
      this.setState({
        formData: {
          ...this.state.formData,
          ...value,
        },
      });
    };
  


  getContactRow = ({data,index}) => {
    return (
      <Row type="flex" className="custom-sub-container">
        <Col span={3}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">First Name</span>
            <span className="custom-table-value-text">{data.Name}</span>
            {/* <span className="custom-table-value-text">Adam Meyers</span>
            <span className="custom-table-value-text">Adam Meyers</span>
            <span className="custom-table-value-text">Adam Meyers</span>
            <span className="custom-table-value-text">Adam Meyers</span>
            <span className="custom-table-value-text">Adam Meyers</span> */}
          </div>
        </Col>
        <Col span={3}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Last Name</span>
            <span className="custom-table-value-text">{data.LastName}</span>
            {/* <span className="custom-table-value-text">Nicole</span>
            <span className="custom-table-value-text">Nicole</span>
            <span className="custom-table-value-text">Nicole</span>
            <span className="custom-table-value-text">Nicole</span>
            <span className="custom-table-value-text">Nicole</span> */}
          </div>
        </Col>
        <Col span={3}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Phone</span>
            <span className="custom-table-value-text">{data.Phone}</span>
            {/* <span className="custom-table-value-text">+1-234-5678</span>
            <span className="custom-table-value-text">+1-234-5678</span>
            <span className="custom-table-value-text">+1-234-5678</span>
            <span className="custom-table-value-text">+1-234-5678</span>
            <span className="custom-table-value-text">+1-234-5678</span> */}
          </div>
        </Col>
        <Col span={3}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Email</span>
            <span className="custom-table-value-text">{data.Email}</span>
            {/* <span className="custom-table-value-text">danish@google.com</span>
            <span className="custom-table-value-text">danish@google.com</span>
            <span className="custom-table-value-text">danish@google.com</span>
            <span className="custom-table-value-text">danish@google.com</span>
            <span className="custom-table-value-text">danish@google.com</span> */}
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Relationship</span>
            <span className="custom-table-value-text">{data.TypeOfRelation}</span>
            {/* <span className="custom-table-value-text">Brother</span>
            <span className="custom-table-value-text">Brother</span>
            <span className="custom-table-value-text">Brother</span>
            <span className="custom-table-value-text">Brother</span>
            <span className="custom-table-value-text">Brother</span> */}
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Notes</span>
            <span className="custom-table-value-text">{data.Notes}</span>
            {/* <span className="custom-table-value-text">Note will come here</span>
            <span className="custom-table-value-text">Note will come here</span>
            <span className="custom-table-value-text">Note will come here</span>
            <span className="custom-table-value-text">Note will come here</span>
            <span className="custom-table-value-text">Note will come here</span> */}
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Actions</span>
            <div className="custom-table-icon-align">
              <Icon style={{ fontSize: "20px" }} 
              type="edit"
              onClick={() => {
                const { contact_list } = this.state;
                this.getSelectedRow(index, contact_list);

                this.setContactUpdateModalVisible();
              }}
              >
              
              </Icon>
              <Icon style={{ fontSize: "20px" }}
               type="delete"
               onClick={() => {
                const { contact_list } = this.state;
                const name = "contact";
                this.deleteSelectedRow(index, contact_list, name);
              }}
               >
               
               </Icon>
              <Icon style={{ fontSize: "20px" }} type="save"></Icon>
              <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
            </div>
            {/* <div className="custom-table-icon-align">
              <Icon style={{ fontSize: "20px" }} type="edit"></Icon>
              <Icon style={{ fontSize: "20px" }} type="delete"></Icon>
              <Icon style={{ fontSize: "20px" }} type="save"></Icon>
              <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
            </div>
            <div className="custom-table-icon-align">
              <Icon style={{ fontSize: "20px" }} type="edit"></Icon>
              <Icon style={{ fontSize: "20px" }} type="delete"></Icon>
              <Icon style={{ fontSize: "20px" }} type="save"></Icon>
              <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
            </div>
            <div className="custom-table-icon-align">
              <Icon style={{ fontSize: "20px" }} type="edit"></Icon>
              <Icon style={{ fontSize: "20px" }} type="delete"></Icon>
              <Icon style={{ fontSize: "20px" }} type="save"></Icon>
              <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
            </div>
            <div className="custom-table-icon-align">
              <Icon style={{ fontSize: "20px" }} type="edit"></Icon>
              <Icon style={{ fontSize: "20px" }} type="delete"></Icon>
              <Icon style={{ fontSize: "20px" }} type="save"></Icon>
              <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
            </div>
            <div className="custom-table-icon-align">
              <Icon style={{ fontSize: "20px" }} type="edit"></Icon>
              <Icon style={{ fontSize: "20px" }} type="delete"></Icon>
              <Icon style={{ fontSize: "20px" }} type="save"></Icon>
              <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
            </div> */}
          </div>
        </Col>
      </Row>
    );
  };



  getTeamRow = ({data,index}) => {
    return (
      <Row type="flex" className="custom-sub-container">
        <Col span={3}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">First Name</span>
            <span className="custom-table-value-text">{data.Name}</span>
            {/* <span className="custom-table-value-text">Adam Meyers</span>
            <span className="custom-table-value-text">Adam Meyers</span>
            <span className="custom-table-value-text">Adam Meyers</span>
            <span className="custom-table-value-text">Adam Meyers</span>
            <span className="custom-table-value-text">Adam Meyers</span> */}
          </div>
        </Col>
        <Col span={3}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Last Name</span>
            <span className="custom-table-value-text">{data.LastName}</span>
            {/* <span className="custom-table-value-text">Nicole</span>
            <span className="custom-table-value-text">Nicole</span>
            <span className="custom-table-value-text">Nicole</span>
            <span className="custom-table-value-text">Nicole</span>
            <span className="custom-table-value-text">Nicole</span> */}
          </div>
        </Col>
        <Col span={3}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Phone</span>
            <span className="custom-table-value-text">{data.Phone}</span>
            {/* <span className="custom-table-value-text">+1-234-5678</span>
            <span className="custom-table-value-text">+1-234-5678</span>
            <span className="custom-table-value-text">+1-234-5678</span>
            <span className="custom-table-value-text">+1-234-5678</span>
            <span className="custom-table-value-text">+1-234-5678</span> */}
          </div>
        </Col>
        <Col span={3}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Email</span>
            <span className="custom-table-value-text">{data.Email}</span>
            {/* <span className="custom-table-value-text">danish@google.com</span>
            <span className="custom-table-value-text">danish@google.com</span>
            <span className="custom-table-value-text">danish@google.com</span>
            <span className="custom-table-value-text">danish@google.com</span>
            <span className="custom-table-value-text">danish@google.com</span> */}
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Relationship</span>
            <span className="custom-table-value-text">{data.TypeOfRelation}</span>
            {/* <span className="custom-table-value-text">Brother</span>
            <span className="custom-table-value-text">Brother</span>
            <span className="custom-table-value-text">Brother</span>
            <span className="custom-table-value-text">Brother</span>
            <span className="custom-table-value-text">Brother</span> */}
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Notes</span>
            <span className="custom-table-value-text">{data.Notes}</span>
            {/* <span className="custom-table-value-text">Note will come here</span>
            <span className="custom-table-value-text">Note will come here</span>
            <span className="custom-table-value-text">Note will come here</span>
            <span className="custom-table-value-text">Note will come here</span>
            <span className="custom-table-value-text">Note will come here</span> */}
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Actions</span>
            <div className="custom-table-icon-align">
              <Icon style={{ fontSize: "20px" }} 
              type="edit"
              onClick={() => {
                const { team_list } = this.state;
                this.getSelectedRow(index, team_list);

                this.setTeamtUpdateModalVisible();
              }}
              >
              
              </Icon>
              <Icon style={{ fontSize: "20px" }}
               type="delete"
               onClick={() => {
                const { team_list } = this.state;
                const name = "team";
                this.deleteSelectedRow(index, team_list, name);
              }}
               >
               
               </Icon>
              <Icon style={{ fontSize: "20px" }} type="save"></Icon>
              <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
            </div>
            {/* <div className="custom-table-icon-align">
              <Icon style={{ fontSize: "20px" }} type="edit"></Icon>
              <Icon style={{ fontSize: "20px" }} type="delete"></Icon>
              <Icon style={{ fontSize: "20px" }} type="save"></Icon>
              <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
            </div>
            <div className="custom-table-icon-align">
              <Icon style={{ fontSize: "20px" }} type="edit"></Icon>
              <Icon style={{ fontSize: "20px" }} type="delete"></Icon>
              <Icon style={{ fontSize: "20px" }} type="save"></Icon>
              <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
            </div>
            <div className="custom-table-icon-align">
              <Icon style={{ fontSize: "20px" }} type="edit"></Icon>
              <Icon style={{ fontSize: "20px" }} type="delete"></Icon>
              <Icon style={{ fontSize: "20px" }} type="save"></Icon>
              <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
            </div>
            <div className="custom-table-icon-align">
              <Icon style={{ fontSize: "20px" }} type="edit"></Icon>
              <Icon style={{ fontSize: "20px" }} type="delete"></Icon>
              <Icon style={{ fontSize: "20px" }} type="save"></Icon>
              <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
            </div>
            <div className="custom-table-icon-align">
              <Icon style={{ fontSize: "20px" }} type="edit"></Icon>
              <Icon style={{ fontSize: "20px" }} type="delete"></Icon>
              <Icon style={{ fontSize: "20px" }} type="save"></Icon>
              <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
            </div> */}
          </div>
        </Col>
      </Row>
    );
  };

  render() {
    const largeBills = [
      {
        title: "Name",
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
        title: "Company",
        dataIndex: "company",
        key: "company",
        fields: [
          {
            type: "Input",
            name: "company",
          },
        ],
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        fields: [
          {
            type: "Input",
            name: "address",
          },
        ],
      },
      {
        title: "City",
        dataIndex: "city",
        key: "city",
        fields: [
          {
            type: "Input",
            name: "city",
          },
        ],
      },
      {
        title: "State",
        dataIndex: "state",
        key: "state",
        fields: [
          {
            type: "Select",
            name: "state",
            placeholder: "-Select-",
            values: states,
          },
        ],
      },
      {
        title: "Zip Code",
        dataIndex: "zip_code",
        key: "zip_code",
        fields: [
          {
            type: "Input",
            name: "zip_code",
          },
        ],
      },
      {
        title: "Country",
        dataIndex: "country",
        key: "country",
        fields: [
          {
            type: "Input",
            name: "country",
          },
        ],
      },
      {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
        fields: [
          {
            type: "PhoneNumber",
            name: "phone",
          },
        ],
      },
      {
        title: "Alternate Phone",
        dataIndex: "alternate_phone",
        key: "alternate_phone",
        fields: [
          {
            type: "PhoneNumber",
            name: "alternate_phone",
          },
        ],
      },
    ];

    const Search = [
      {
        title: "First Name",
        dataIndex: "first_name",
        key: "first_name",
        fields: [
          {
            type: "Input",
            name: "first_name",
          },
        ],
      },
      {
        title: "LAst Name",
        dataIndex: "last_name",
        key: "last_name",
        fields: [
          {
            type: "Input",
            name: "last_name",
          },
        ],
      },
      {
        title: "Company",
        dataIndex: "company",
        key: "company",
        fields: [
          {
            type: "Input",
            name: "company",
          },
        ],
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        fields: [
          {
            type: "Input",
            name: "address",
          },
        ],
      },
      {
        title: "City",
        dataIndex: "city",
        key: "city",
        fields: [
          {
            type: "Input",
            name: "city",
          },
        ],
      },
      {
        title: "State",
        dataIndex: "state",
        key: "state",
        fields: [
          {
            type: "Input",
            name: "state",
          },
        ],
      },
      {
        title: "Zip Code",
        dataIndex: "zip_code",
        key: "zip_code",
        fields: [
          {
            type: "Input",
            name: "zip_code",
          },
        ],
      },
      {
        title: "Country",
        dataIndex: "country",
        key: "country",
        fields: [
          {
            type: "Input",
            name: "country",
          },
        ],
      },
      {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
        fields: [
          {
            type: "Input",
            name: "phone",
          },
        ],
      },
      {
        title: "Alt Phone",
        dataIndex: "alt_phone",
        key: "alt_phone",
        fields: [
          {
            type: "Input",
            name: "alt_phone",
          },
        ],
      },
      {
        title: "Relationship",
        dataIndex: "relationship",
        key: "relationship",
        fields: [
          {
            type: "Input",
            name: "relationship",
          },
        ],
      },
      {
        title: "Profession",
        dataIndex: "profession",
        key: "profession",
        fields: [
          {
            type: "Input",
            name: "profession",
          },
        ],
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        fields: [
          {
            type: "Input",
            name: "email",
          },
        ],
      },
      {
        title: "Notes",
        dataIndex: "notes",
        key: "notes",
        fields: [
          {
            type: "Input",
            name: "notes",
          },
        ],
      },
    ];

    const contactFields = [
      {
        title: "Name",
        type: "input",
        index:"Name"
      },
      {
        title: "Last Name",
        type: "input",
        index:"LastName"
      },
      {
        title: "Address",
        type: "input",
        index:"Address"
      },
      {
        title: "City",
        type: "input",
        index:"City"
      },
      {
        title: "State",
        type: "input",
        index:"State"
      },
      {
        title: "Country",
        type: "input",
        index:"Country"
      },
      {
        title: "Zip Code",
        type: "input",
        index:"ZipCode"
      },
      {
        title: "Phone",
        type: "phone",
        index:"Phone"
      },
      {
        title: "Alternate Phone",
        type: "phone",
        index:"AlternatePhone"
      },
      {
        title: "Part Of My Professional Team",
        type: "radio",
        index:"PartOfMyProfessionalTeam"
      },
      {
        title: "Email",
        type: "email",
        index:"Email"
      },
      {
        title: "Company",
        type: "input",
        index:"Company"
      },
      {
        title: "Type Of Relation",
        type: "select",
        options: ["Abc", "Def"],
        index:"TypeOfRelation"
      },
      {
        title: "Notes",
        type: "textarea",
        index:"Notes"
      },
    ];


    const UpdateContactFields = [
      {
        title: "Name",
        type: "input",
        index:"Name"
      },
      {
        title: "Last Name",
        type: "input",
        index:"LastName"
      },
      {
        title: "Address",
        type: "input",
        index:"Address"
      },
      {
        title: "City",
        type: "input",
        index:"City"
      },
      {
        title: "State",
        type: "input",
        index:"State"
      },
      {
        title: "Country",
        type: "input",
        index:"Country"
      },
      {
        title: "Zip Code",
        type: "input",
        index:"ZipCode"
      },
      {
        title: "Phone",
        type: "phone",
        index:"Phone"
      },
      {
        title: "Alternate Phone",
        type: "phone",
        index:"AlternatePhone"
      },
      {
        title: "Part Of My Professional Team",
        type: "radio",
        index:"PartOfMyProfessionalTeam"
      },
      {
        title: "Email",
        type: "email",
        index:"Email"
      },
      {
        title: "Company",
        type: "input",
        index:"Company"
      },
      {
        title: "Type Of Relation",
        type: "select",
        options: ["Abc", "Def"],
        index:"TypeOfRelation"
      },
      {
        title: "Notes",
        type: "textarea",
        index:"Notes"
      },
    ];


    const teamFields = [
      {
        title: "Name",
        type: "input",
        index:"tName"
      },
      {
        title: "Last Name",
        type: "input",
        index:"tLastName"
      },
      {
        title: "Address",
        type: "input",
        index:"tAddress"
      },
      {
        title: "City",
        type: "input",
        index:"tCity"
      },
      {
        title: "State",
        type: "input",
        index:"tState"
      },
      {
        title: "Country",
        type: "input",
        index:"tCountry"
      },
      {
        title: "Zip Code",
        type: "input",
        index:"tZipCode"
      },
      {
        title: "Phone",
        type: "phone",
        index:"tPhone"
      },
      {
        title: "Alternate Phone",
        type: "phone",
        index:"tAlternatePhone"
      },
      {
        title: "Part Of My Professional Team",
        type: "radio",
        index:"tPartOfMyProfessionalTeam"
      },
      {
        title: "Email",
        type: "email",
        index:"tEmail"
      },
      {
        title: "Company",
        type: "input",
        index:"tCompany"
      },
      {
        title: "Type Of Relation",
        type: "select",
        options: ["Abc", "Def"],
        index:"tTypeOfRelation"
      },
      {
        title: "Notes",
        type: "textarea",
        index:"tNotes"
      },
    ];


    const UpdateTeamFields = [
      {
        title: "Name",
        type: "input",
        index:"tName"
      },
      {
        title: "Last Name",
        type: "input",
        index:"tLastName"
      },
      {
        title: "Address",
        type: "input",
        index:"tAddress"
      },
      {
        title: "City",
        type: "input",
        index:"tCity"
      },
      {
        title: "State",
        type: "input",
        index:"tState"
      },
      {
        title: "Country",
        type: "input",
        index:"tCountry"
      },
      {
        title: "Zip Code",
        type: "input",
        index:"tZipCode"
      },
      {
        title: "Phone",
        type: "phone",
        index:"tPhone"
      },
      {
        title: "Alternate Phone",
        type: "phone",
        index:"tAlternatePhone"
      },
      {
        title: "Part Of My Professional Team",
        type: "radio",
        index:"tPartOfMyProfessionalTeam"
      },
      {
        title: "Email",
        type: "email",
        index:"tEmail"
      },
      {
        title: "Company",
        type: "input",
        index:"tCompany"
      },
      {
        title: "Type Of Relation",
        type: "select",
        options: ["Abc", "Def"],
        index:"tTypeOfRelation"
      },
      {
        title: "Notes",
        type: "textarea",
        index:"tNotes"
      },
    ];

    // const { handleFormInputChange, role } = this.props;
    const {
      currentForm,
      handleInputChange,
      divorceObject,
      handleDatePickerChange,
      handleSelectChange,
      handleFormInputChange,
      handleCurrencyChange,
      handleDocumentChange,
      handlePhoneChange,
      role
    } = this.props;

    return (
      <React.Fragment>
        <AddModal
          title={"Add New Contact"}
          fields={contactFields}
          isVisible={this.state.isContactAddModalVisible}
          cbClose={this.setContactAddModalVisible}
          handleFormInputChange={handleFormInputChange}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleDatePickerChange={handleDatePickerChange}
          handleCurrencyChange={handleCurrencyChange}
          handleDocumentChange={handleDocumentChange}
          handlePhoneChange={handlePhoneChange}
          currentForm={currentForm}
          setFormData={this.setFormData}
          formData={this.state.formData}
          create={this.createContact}
        />

        <AddModal
          title={"Add New Team"}
          fields={teamFields}
          isVisible={this.state.isTeamAddModalVisible}
          cbClose={this.setTeamAddModalVisible}
          handleFormInputChange={handleFormInputChange}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleDatePickerChange={handleDatePickerChange}
          handleCurrencyChange={handleCurrencyChange}
          handleDocumentChange={handleDocumentChange}
          currentForm={currentForm}
          setFormData={this.setFormData}
          formData={this.state.formData}
          create={this.createTeam}
        />


        <UpdateModal
          title={"Update Contact"}
          fields={UpdateContactFields}
          isVisible={this.state.isContactUpdateModalVisible}
          cbClose={this.setContactUpdateModalVisible}
          cbUpdate={this.updateContactRow}
          // onLoad={this.get}
          obj={this.state.updateObject}
          onUpdateChange={this.onUpdateChange}
          handleDateChange={this.handleDateChange}

          // onConstraints={this.onConstraints}
        />


          <UpdateModal
          title={"Update Team"}
          fields={UpdateTeamFields}
          isVisible={this.state.isTeamUpdateModalVisible}
          cbClose={this.setTeamUpdateModalVisible}
          cbUpdate={this.updateTeamRow}
          // onLoad={this.get}
          obj={this.state.updateObject}
          onUpdateChange={this.onUpdateChange}
          handleDateChange={this.handleDateChange}

          // onConstraints={this.onConstraints}
        />

        <Header image={support} title={"Contact List"} />

        <Add
          title={"Has Access To Death Module"}
          button={"Add New Contact"}
          cbAdd={this.setContactAddModalVisible}
        />

        {/* get contact row */}
        {this.state.contact_list.map((data, index) =>
          this.getContactRow({ data, index: index + 1 })
        )}

        <Add
          title={"Professional Team"}
          button={"Add New Professional Team"}
          cbAdd={this.setTeamAddModalVisible}
        />

   

 

          {/* get team row */}
          {this.state.team_list.map((data, index) =>
          this.getTeamRow({ data, index: index + 1 })
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "5%",
            marginBottom: "5%",
          }}
        >
          <Input
            addonAfter={
              <Icon
                type="search"
                style={{
                  position: "relative",
                  top: "-3px",
                  marginRight: "5px",
                  fontSize: "20px",
                }}
              />
            }
            style={{ width: "50%", height: "30%" }}
            size={"large"}
            placeholder="Search Contacts"
          />
        </div>

        <Add title={"Search Results"} />
        {/* {this.getRow()} */}

        {role === "ROLE" ? (
          <Footer cbPrev={this.props.previousForm} />
        ) : (
          <Footer
            cbPrev={this.props.previousForm}
            cbNext={this.props.nextForm}
          />
        )}
      </React.Fragment>
    );
  }
}

export default ContactListForm;
