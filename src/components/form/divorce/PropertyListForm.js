import React, { Component } from "react";
import SubFormTable from "../../SubFormTable";
import { Button, Icon, Row, Col } from "antd";

import Header from "../components/header";
import Footer from "../components/footer";
import Add from "../components/add";
import AddModal from "../components/addmodal";
import property from "../../../assets/images/latest/Principal-House.png";
import UpdateModal from "../components/updatemodal";

const formName = "propertyList";

class PropertyListForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      separate_rows: [
        {
          AssetName: "Cars",
          OwnerName: "Asad",
          AssetValue: "5000000",
          TypeOfAccount: "Party1",
          CostBasisDate: "04/2/2022",
        },
      ],
      community_rows: [
        {
          CAssetName: "Bike",
          CAssetValue: "5000000",
          CCostBasisDate: "04/2/2022",
        },
      ],
      formData: {},
      isSeparateVisible: false,
      isCommunityVisible: false,
      isSeparateUpdateModalVisible: false,
      isCommunityUpdateModalVisible: false,
      updateObject: null,
      selectedIndex:null

    };
  }

  componentDidMount() {
    if (
      this.props.divorceObject.propertyList &&
      this.props.divorceObject.propertyList.hasOwnProperty("seprate_property")
    )
      this.setState({
        seprate_rows: this.props.divorceObject.propertyList.seprate_property,
      });

    if (
      this.props.divorceObject.propertyList &&
      this.props.divorceObject.propertyList.hasOwnProperty("community_property")
    )
      this.setState({
        community_rows:
          this.props.divorceObject.propertyList.community_property,
      });
  }

  handleFormChange(key, rows) {
    let formData = this.state.formData;

    formData[key] = rows;
    this.setState({
      formData: formData,
    });
  }

  // to handle hide and show for Separate Property add modal
  setSeparateVisible = () => {
    if (this.state.isSeparateVisible)
      this.setState({ isSeparateVisible: false });
    else this.setState({ isSeparateVisible: true });
  };

  // to handle hide and show for Coummunity Property add modal
  setCommunityVisible = () => {
    if (this.state.isCommunityVisible)
      this.setState({ isCommunityVisible: false });
    else this.setState({ isCommunityVisible: true });
  };

  // to handle hide and show for Seprate Property update modal
  setSeparateUpdateModal = () => {
    if (this.state.isSeparateUpdateModalVisible)
      this.setState({ isSeparateUpdateModalVisible: false });
    else this.setState({ isSeparateUpdateModalVisible: true });
  };

  // to handle hide and show for Community Property update modal
  setCommunityUpdateModal = () => {
    if (this.state.isCommunityUpdateModalVisible)
      this.setState({ isCommunityUpdateModalVisible: false });
    else this.setState({ isCommunityUpdateModalVisible: true });
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
  
      if (name == "separate_property") {
        this.setState({
          separate_rows: updatedRows,
        });
      } else {
        this.setState({
          community_rows: updatedRows,
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

  //  function to update a specific separate property row
  updateSeparateRow = () => {
    let obj = {
      ...this.state.updateObject,
    };

    let { separate_rows, selectedIndex } = this.state;
    let index = selectedIndex - 1;

    separate_rows = [...this.state.separate_rows]; // important to create a copy, otherwise you'll modify state outside of setState call
    separate_rows[index] = obj; // replace current updated object in separate_rows based on index
    this.setState({ separate_rows });
  };


    //  function to update a specific community prooperty row
    updateCommunityRow = () => {
      let obj = {
        ...this.state.updateObject,
      };
  
      let { community_rows, selectedIndex } = this.state;
      let index = selectedIndex - 1;
  
      community_rows = [...this.state.community_rows]; // important to create a copy, otherwise you'll modify state outside of setState call
      community_rows[index] = obj; // replace current updated object in community_rows based on index
      this.setState({ community_rows });
    };


  // function to create separate property row (data)
  createSeparateProperty = (currentFormData) => {

    // checxk if already formData contains some data then initialize it with empty
    if (Object.keys(this.state.formData).length > 0) {
      this.setState({
        formData: {},
      });
    }

    // add current form data in separate_rows list with keeping old data
    this.setState({
      separate_rows: [...this.state.separate_rows, currentFormData.formData],
    });
  };

  // function to create community property row (data)
  createCummunityProperty = (currentFormData) => {

    // checxk if already formData contains some data then initialize it with empty
    if (Object.keys(this.state.formData).length > 0) {
      this.setState({
        formData: {},
      });
    }

    // add current form data in community_rows list with keeping old data
    this.setState({
      community_rows: [...this.state.community_rows, currentFormData.formData],
    });
  };



  getSeprateRow = ({ data, index }) => {
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
              <span className="custom-field-heading-style">Asset Name:</span>
              <span className="custom-field-value-style">
                {" "}
                {data.AssetName}
              </span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Asset Value:</span>
              <span className="custom-field-value-style">
                {" "}
                {data.AssetValue}
              </span>
            </div>
          </div>
        </Col>
        <Col span={7}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Owner:</span>
              <span className="custom-field-value-style">
                {" "}
                {data.OwnerName}
              </span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">
                Type of Account:
              </span>
              <span className="custom-field-value-style">
                {" "}
                {data.TypeOfAccount}
              </span>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">
                {" "}
                Cost Basiss Date:{" "}
              </span>
              <span className="custom-field-value-style">
                {" "}
                {data.CodeBasisDate}
              </span>
            </div>
          </div>
        </Col>
        <Col span={1}>
          <div className="custom-field-alignments-icons">
            <Button
              type="link"
              style={{ fontSize: "21px" }}
              icon="edit"
              onClick={() => {
                const { separate_rows } = this.state;
                this.getSelectedRow(index, separate_rows);

                this.setSeparateUpdateModal();
              }}
            ></Button>
          </div>
        </Col>
        <Col span={1}>
          <div className="custom-field-alignments-icons">
            <Button
              type="link"
              style={{ fontSize: "21px" }}
              icon="delete"
              onClick={() => {
                const { separate_rows } = this.state;
                const name = "separate_property";
                this.deleteSelectedRow(index, separate_rows, name);
              }}
            ></Button>
          </div>
        </Col>
      </Row>
    );
  };

  getCommunityRow = ({ data, index }) => {
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
              <span className="custom-field-heading-style">Asset Name:</span>
              <span className="custom-field-value-style">
                {" "}
                {data.CAssetName}
              </span>
            </div>
          </div>
        </Col>
        <Col span={7}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Asset value:</span>
              <span className="custom-field-value-style">
                {" "}
                {data.CAssetValue}
              </span>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">
                {" "}
                Code Basis Date:{" "}
              </span>
              <span className="custom-field-value-style">
                {" "}
                {data.CCostBasisDate}
              </span>
            </div>
          </div>
        </Col>
        <Col span={1}>
          <div className="custom-field-alignments-icons">
            <Button
              type="link"
              style={{ fontSize: "21px" }}
              icon="edit"
              onClick={() => {
                const { community_rows } = this.state;

                this.getSelectedRow(index, community_rows);

                this.setCommunityUpdateModal();
              }}
            ></Button>
          </div>
        </Col>
        <Col span={1}>
          <div className="custom-field-alignments-icons">
            <Button
              type="link"
              style={{ fontSize: "21px" }}
              icon="delete"
              onClick={() => {
                const { community_rows } = this.state;
                const name = "community_property";
                this.deleteSelectedRow(index, community_rows, name);
              }}
            ></Button>
          </div>
        </Col>
      </Row>
    );
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

  render() {
    console.log("in property form");
    const seprateProperty = [
      {
        title: "Asset Name",
        dataIndex: "assetName",
        key: "assetName",
        fields: [
          {
            type: "Input",
            name: "asset_name",
          },
        ],
      },
      {
        title: "Asset Value",
        dataIndex: "assetValue",
        key: "assetValue",
        fields: [
          {
            type: "Currency",
            name: "asset_value",
          },
        ],
      },
      {
        title: "Cost Basis Date",
        dataIndex: "costBasis",
        key: "costBasis",
        fields: [
          {
            type: "DatePicker",
            name: "cost_basis",
          },
        ],
      },
      {
        title: "Owner",
        dataIndex: "owner",
        key: "owner",
        fields: [
          {
            type: "Input",
            name: "owner",
          },
        ],
      },
      {
        title: "Type of Account",
        dataIndex: "accountType",
        key: "accountType",
        fields: [
          {
            type: "Select",
            name: "account_type",
            placeholder: "-Select-",
            values: ["Retirement", "Education", "Regular"],
          },
        ],
      },
    ];

    const communityProperty = [
      {
        title: "Asset Name",
        dataIndex: "assetName",
        key: "assetName",
        fields: [
          {
            type: "Input",
            name: "asset_name",
          },
        ],
      },
      {
        title: "Asset Value",
        dataIndex: "assetValue",
        key: "assetValue",
        fields: [
          {
            type: "Currency",
            name: "asset_value",
          },
        ],
      },
      {
        title: "Cost Basis Date",
        dataIndex: "costBasis",
        key: "costBasis",
        fields: [
          {
            type: "DatePicker",
            name: "cost_basis",
          },
        ],
      },
    ];

    const separateFields = [
      {
        title: "Asset Name",
        type: "input",
        index: "AssetName",
      },
      {
        title: "Owner Name",
        type: "input",
        index: "OwnerName",
      },
      {
        title: "Asset Value",
        type: "input",
        index: "AssetValue",
      },
      {
        title: "Type Of Account",
        type: "select",
        options: ["Joint", "Party 1", "Party 2"],
        index: "TypeOfAccount",
      },
      {
        title: "Cost Basis Date",
        type: "date",
        index: "CostBasisDate",
      },
    ];

    const separateFields_update = [
      {
        title: "Asset Name",
        type: "input",
        index: "AssetName",
      },
      {
        title: "Owner Name",
        type: "input",
        index: "OwnerName",
      },
      {
        title: "Asset Value",
        type: "input",
        index: "AssetValue",
      },
      {
        title: "Type Of Account",
        type: "select",
        options: ["Joint", "Party 1", "Party 2"],
        index: "TypeOfAccount",
      },
      {
        title: "Cost Basis Date",
        type: "date",
        index: "CostBasisDate",
      },
    ];

    const communityFields = [
      {
        title: "Asset Name",
        type: "input",
        index:"CAssetName"
      },
      {
        title: "Asset Value",
        type: "input",
        index:"CAssetValue"
      },
      {
        title: "Cost Basis Date",
        type: "date",
        index:"CCostBasisDate"
      },
    ];

    const communityFields_update = [
      {
        title: "Asset Name",
        type: "input",
        index: "CAssetName",
      },
      {
        title: "Asset Value",
        type: "input",
        index: "CAssetValue",
      },
      {
        title: "Cost Basis Date",
        type: "date",
        index: "CCostBasisDate",
      },
    ];

    const {
      currentForm,
      handleInputChange,
      divorceObject,
      handleDatePickerChange,
      handleSelectChange,
      handleFormInputChange,
      handleCurrencyChange
    } = this.props;

    return (
      <React.Fragment>
        <AddModal
          title={"Add New Seperate Property"}
          fields={separateFields}
          isVisible={this.state.isSeparateVisible}
          cbClose={this.setSeparateVisible}
          handleFormInputChange={handleFormInputChange}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleDatePickerChange={handleDatePickerChange}
          currentForm={currentForm}
          setFormData={this.setFormData}
          formData={this.state.formData}
          create={this.createSeparateProperty}
        />

        <UpdateModal
          title={"Update Separate Property"}
          fields={separateFields_update}
          isVisible={this.state.isSeparateUpdateModalVisible}
          cbClose={this.setSeparateUpdateModal}
          cbUpdate={this.updateSeparateRow}
          // onLoad={this.get}
          obj={this.state.updateObject}
          onUpdateChange={this.onUpdateChange}
          handleDateChange={this.handleDateChange}

          // onConstraints={this.onConstraints}
        />

        <AddModal
          title={"Add New Community Property"}
          fields={communityFields}
          isVisible={this.state.isCommunityVisible}
          cbClose={this.setCommunityVisible}
          handleFormInputChange={handleFormInputChange}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleDatePickerChange={handleDatePickerChange}
          setFormData={this.setFormData}
          formData={this.state.formData}
          create={this.createCummunityProperty}
          currentForm={currentForm}
        />

        <UpdateModal
          title={"Update Community Property"}
          fields={communityFields_update}
          isVisible={this.state.isCommunityUpdateModalVisible}
          cbClose={this.setCommunityUpdateModal}
          cbUpdate={this.updateCommunityRow}
          // onLoad={this.get}
          obj={this.state.updateObject}
          onUpdateChange={this.onUpdateChange}
          handleDateChange={this.handleDateChange}

          // onConstraints={this.onConstraints}
        />

        <Header image={property} title={"Property List"} />

        <Add
          title={"Seperate Properties"}
          button={"Add New Property"}
          cbAdd={this.setSeparateVisible}
        />


        {this.state.separate_rows.map((data, index) =>
          this.getSeprateRow({ data, index: index + 1 })
        )}

        <Add
          title={"Community Properties"}
          button={"Add New Property"}
          cbAdd={this.setCommunityVisible}
        />

        {this.state.community_rows.map((data, index) =>
          this.getCommunityRow({ data, index: index + 1 })
        )}


        <Footer cbPrev={this.props.previousForm} cbNext={this.props.nextForm} />
      </React.Fragment>
    );
  }
}

export default PropertyListForm;
