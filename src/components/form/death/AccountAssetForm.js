import React, { Component } from "react";
import SubFormTable from "../../SubFormTable";
import { Button, Icon, Row, Col, Modal } from "antd";
import ReactPlayer from "react-player";
import Header from "../components/header";
import Add from "../components/add";
import Footer from "../components/footer";
import AddModal from "../components/addmodal";
import UpdateModal from "../components/updatemodal";
import NetWorth4 from "../../../assets/images/latest/Networth4.png";
import ViewModal from "../components/viewmodal";
import AssetList from "../../AssetList";
import moment from 'moment';
import DEATH_API from "../../../apis/death.api";
import FETCH from "../../../utils/fetch";
const formName = "accountAssetForm";

class AccountAssetForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account_asset: [],
      liabilities_credit: [],
      formData: {},
      isAddModalVisible: false,
      isUpdateModalVisible: false,
      isViewModalVisible: false,
      updateObject: null,
      newData: [],
      TooltipModal: false,
      credit_rows: [],

    };
  }

  componentDidMount() {
    if (
      this.props.checklistObject.accountAssetForm &&
      this.props.checklistObject.accountAssetForm.hasOwnProperty(
        "account_asset"
      )
    )
      this.setState({
        account_asset:
          this.props.checklistObject.accountAssetForm.account_asset,
      });
    try {
      (async () => {
        this.props.handleLoader();
        let data = await FETCH.post({
          url: "client-module/list",
          id: `?module=Asset&page=1&limit=100`,
          body: {},
        });
        this.props.handleLoader();
        // console.log("Account Asset and libalities...",data.records)
        if (data && data.records) {
          this.setState({
            account_asset:
              data.records.map(item => {
                return {
                  ...item,
                  AssetName: item['Name of Asset'],
                  AccountType: item['Account Type/Titled'],
                  HeldWhere: item['Held Where'],
                  MonetaryValue: item['Monetary Value']
                }
              })
          })
        }

        this.props.handleLoader();
        let datares = await FETCH.post({
          url: "client-module/list",
          id: `?module=Liabilities and Credit&page=1&limit=100`,
          body: {},
        });
        this.props.handleLoader();
        // console.log("Account Asset and libalities...",data.records)
        if (datares && datares.records) {

          datares.records.map(item => {
            if (item["subType"] === "Credit") {

              console.log("here in credit");
              this.setState(prevState => ({
                credit_rows: [...prevState.credit_rows, item]
              }))

            }
            else {
              console.log("here in liabilities");
              this.setState(prevState => ({
                liabilities_credit: [...prevState.liabilities_credit, item]
              }))

            }
          })


          // this.setState({
          //   liabilities_credit:
          //     datares.records.map(item => {
          //       return {
          //         ...item,
          //         LiabilityName: item['Nickname of Liabilities'],
          //         InitialLoan: item['Initial Loan Amount'],
          //         MonthlyPayment: item['Monthly Payment'],
          //         MaturityDate: item['Maturity Date']
          //       }
          //     })
          // })
        }

      })()
    } catch (error) {
      console.log(error)
      this.props.handleLoader()
    }
    // try {
    //   (async () => {
    //     this.props.handleLoader();
    //     let datares = await FETCH.post({
    //       url: "client-module/list",
    //       id: `?module=Liabilities and Credit&page=1&limit=100`,
    //       body: {},
    //     });
    //     this.props.handleLoader();
    //     // console.log("Account Asset and libalities...",data.records)
    //     if (datares && datares.records) {
    //       this.setState({
    //         liabilities_credit:
    //         datares.records.map(item => {
    //             return {
    //               ...item,
    //               AssetName: item['Name of Asset'],
    //               AccountType: item['Account Type/Titled'],
    //               HeldWhere: item['Held Where'],
    //               MonetaryValue: item['Monetary Value']
    //             }
    //           })
    //       })
    //     }
    //   })()
    // } catch (error) {
    //   console.log(error)
    //   this.props.handleLoader()
    // }
    this.props.handleChecklistObject(this.props.currentForm, this.state.account_asset)

  }
  showTooltipModal = async () => {
    this.setState({
      TooltipModal: true,
    });
  };

  handleTooltipCancel = () => {
    this.setState({
      TooltipModal: false,
    });
  };
  setVisible = () => this.setState({ isVisible: !this.state.isVisible })

  handleFormChange(key, rows) {
    let formData = this.state.formData;
    formData[key] = rows;
    this.setState({
      formData: formData,
    });
  }



  // to handle hide and show for  add modal
  setAddModalVisible = () => this.setState({ isAddModalVisible: !this.state.isAddModalVisible });

  // to handle hide and show for update modal
  setUpdateModalVisible = () => this.setState({ isUpdateModalVisible: !this.state.isUpdateModalVisible });

  // to handle hide and show for View modal
  setViewModalVisible = () => this.setState({ isViewModalVisible: !this.state.isViewModalVisible });

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
  handleDateChange = (date, dateString, index) => this.onUpdateChange(dateString, index)



  // Function to delete selected row
  deleteSelectedRow = async (idx) => {
    try {
      const {
        account_asset
      } = this.state

      this.props.handleLoader();
      await DEATH_API.deleteAccountAsset(idx)
      this.props.handleLoader();
      const updatedRows = account_asset.filter((row, index) => {
        return row.id != idx;
      });
      this.setState({
        account_asset: updatedRows,
      }, () => {
        this.props.handleChecklistObject(this.props.currentForm, this.state.account_asset)
      });

    } catch (error) {
      console.log("error in deleting Account asset form")
      console.log(error)
    }
  };


  // Function to get selected  array (row)
  getSelectedRow = (idx,) => {
    this.setState({
      selectedIndex: idx,
    });
    const { account_asset } = this.state
    // get selected row (this will return array of object)
    let selectedRow = account_asset.filter((row, index) => {
      return index == idx - 1;
    });
    // get first and only element from list and store it in update object
    this.setState({
      updateObject: { ...this.state.updateObject, ...selectedRow[0] },
    });
  };


  //  function to update a specific Account Asset row
  updateAccountAsset = async () => {
    try {
      this.props.handleLoader()
      let obj = {
        ...this.state.updateObject,
        name: this.state.updateObject.AssetName,
        accountType: this.state.updateObject.AccountType,
        heldWhere: this.state.updateObject.HeldWhere,
        monetaryValue: this.state.updateObject.MonetaryValue
      };
      await DEATH_API.updateAccountAsset(obj.id, obj)
      this.props.handleLoader()

      let { account_asset, selectedIndex } = this.state;
      let index = selectedIndex - 1;
      account_asset = [...this.state.account_asset]; // important to create a copy, otherwise you'll modify state outside of setState call
      account_asset[index] = obj; // replace current updated object in account_asset based on index
      this.setState({ account_asset }, () => {
        this.props.handleChecklistObject(this.props.currentForm, this.state.account_asset)
      });
    } catch (error) {
      this.props.handleLoader()
      console.log(error)
    }
  };


  // function to create account Asset (data)
  createAccountAsset = (currentFormData) => {

    // check if already formData contains some data then initialize it with empty
    if (Object.keys(this.state.formData).length > 0) {
      this.setState({
        newData: [currentFormData.formData, ...this.state.newData],
        formData: {},
      });
    }

    // add current form data in account_asset list with keeping old data
    this.setState({
      account_asset: [currentFormData.formData, ...this.state.account_asset],
    }, () => {
      this.props.handleChecklistObject(this.props.currentForm, this.state.account_asset)
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






  getRow = ({ data, index, id }) => {
    const { role } = this.props;
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
              <span className="custom-field-value-style"> {data.AssetName || 'N/A'}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Account type:</span>
              <span className="custom-field-value-style"> {data.AccountType || 'N/A'}</span>
            </div>
          </div>
        </Col>
        <Col span={7}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Held Where:</span>
              <span className="custom-field-value-style"> {data.HeldWhere || 'N/A'}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">
                Monetary Value:
              </span>
              <span className="custom-field-value-style"> {data.MonetaryValue || 'N/A'}</span>
            </div>
          </div>
        </Col>
        <Col span={5}>
          <div className="custom-field-alignments"></div>
        </Col>
        <Col span={1}>
          {role !== "protrustee" ? (
            <div className="custom-field-alignments-icons">
              <Button
                type="link"
                style={{ fontSize: "21px" }}
                icon="eye"
                onClick={() => {

                  this.getSelectedRow(index);

                  this.setViewModalVisible();
                }}
              ></Button>
            </div>
          ) : (
            ""
          )}
        </Col>

      </Row>
    );
  };

  render() {
    const fields = [
      {
        title: "Asset Name",
        type: "input",
        index: "Name of Asset"
      },
      {
        title: "Account Type",
        type: "select",
        options: ["Abc", "Def", "Others"],
        index: "Account Type/Titled"
      },
      {
        title: "Held Where",
        type: "input",
        index: "Held Where"
      },
      {
        title: "Monetary Value",
        type: "currency",
        index: "Monetary Value"
      },
    ];


    const update_fields = [
      {
        title: "Asset Name",
        type: "input",
        index: "AssetName"
      },
      {
        title: "Account Type",
        type: "select",
        options: ["Abc", "Def", "Others"],
        index: "AccountType"
      },
      {
        title: "Held Where",
        type: "input",
        index: "HeldWhere"
      },
      {
        title: "Monetary Value",
        type: "currency",
        index: "MonetaryValue"
      },
    ];
    const asset_cols = [
      {
        title: "Asset Type",
        dataIndex: "module",
        sorter: (a, b) => a["module"] > b["module"],
        render: (record) => (record ? record : "N/A"),
      },
      {
        title: "Name of Asset",
        dataIndex: "Name of Asset",
        sorter: (a, b) =>
          a["Name of Asset"] > b["Name of Asset"] ? 1 : a["Name of Asset"] === b["Name of Asset"] ? 0 : -1,
        render: (record) => (record ? record : "N/A"),
      },
      {
        title: "Account Type",
        dataIndex: "Account Type/Titled",
        sorter: (a, b) => a["Account Type/Titled"] > b["Account Type/Titled"],
        render: (record) => (record ? record : "N/A"),
      },
      {
        title: "Held Where",
        dataIndex: "Held Where",
        // sorter: (a, b) => a["Held Where"] > b["Held Where"],
        render: (record) => (record ? record : "N/A"),
      },
      {
        title: "Monetary Value",
        dataIndex: "Monetary Value",
        sorter: (a, b) => a["Monetary Value"] > b["Monetary Value"],
        render: (record) => (record ? `${"$" + record}` : "N/A"),
      },
      {
        title: "Value as of Date",
        dataIndex: "Value as of Date",
        sorter: (a, b) => a["Value as of Date"] > b["Value as of Date"],
        render: (record) => (record ? moment(record).format('DD-MM-YYYY') : "N/A"),
      },


    ];
    const loans_cols = [
      {
        title: "Credit Description",
        dataIndex: "module",
        // sorter: (a, b) => a["Credit Description"] > b["Credit Description"],
        render: (record) => (record ? record : "N/A"),
      },
      {
        title: "Owner",
        dataIndex: "Owner",
        // sorter: (a, b) =>
        //   a["Owner"] > b["Owner"] ? 1 : a["Owner"] === b["Owner"] ? 0 : -1,
        render: (record) => (record ? record : "N/A"),
      },
      {
        title: "Bank",
        dataIndex: "Bank",
        // sorter: (a, b) => a["Bank"] > b["Bank"],
        render: (record) => (record ? record : "N/A"),
      },
      {
        title: "Monthly Payment",
        dataIndex: "Monthly Payment",
        // sorter: (a, b) => a["Monthly Payment"] > b["Monthly Payment"],
        render: (record) => (record ? record : "N/A"),
      },
      {
        title: "Loan Balance",
        dataIndex: "Loan Balance",
        // sorter: (a, b) => a["Loan Balance"] > b["Loan Balance"],
        render: (record) => (record ? record : "N/A"),
      },
      {
        title: "Credit Limit",
        dataIndex: "Credit Limit",
        // sorter: (a, b) => a["Credit Limit"] > b["Credit Limit"],
        render: (record) => (record ? record : "N/A"),
      },

    ];
    const credit_cols = [
      {
        title: "Owner",
        dataIndex: "Owner",
        // sorter: (a, b) =>
        //   a["Owner"] > b["Owner"] ? 1 : a["Owner"] === b["Owner"] ? 0 : -1,
        render: (record) => (record ? record : "N/A"),
      },
      {
        title: "Name of Liability",
        dataIndex: "Nickname of Liabilities",
        // sorter: (a, b) => a["Nickname of Liabilities"] > b["Nickname of Liabilities"],
        render: (record) => (record ? record : "N/A"),
      },
      {
        title: "Initial Loan Amount",
        dataIndex: "Initial Loan Amount",
        // sorter: (a, b) => a["Initial Loan Amount"] > b["Initial Loan Amount"],
        render: (record) => (record ? record : "N/A"),
      },
      {
        title: "Credit Balance",
        dataIndex: "Credit Balance",
        // sorter: (a, b) => a["Credit Balance"] > b["Credit Balance"],
        render: (record) => (record ? record : "N/A"),
      },
      {
        title: "Monthly Payment",
        dataIndex: "Monthly Payment",
        // sorter: (a, b) => a["Monthly Payment"] > b["Monthly Payment"],
        render: (record) => (record ? record : "N/A"),
      },
      {
        title: "Interest Rate(or APR%)",
        dataIndex: "Interest Rate",
        // sorter: (a, b) => a["Interest Rate"] > b["Interest Rate"],
        render: (record) => (record ? record : "N/A"),
      },
      {
        title: "Maturity Date",
        dataIndex: "Maturity Date",
        // sorter: (a, b) => a["Maturity Date"] > b["Maturity Date"],
        render: (record) => (record ? moment(record).format('DD-MM-YYYY') : "N/A"),
      },
      {
        title: "Liability Type",
        dataIndex: "subType",
        // sorter: (a, b) => a["subType"] > b["subType"],
        render: (record) => (record ? record : "N/A"),
      },

    ];
    const account_asset = [
      {
        title: "Name of Asset",
        dataIndex: "asset_name",
        key: "asset_name",
        fields: [
          {
            type: "Input",
            name: "asset_name",
          },
        ],
      },
      {
        title: "Account Type",
        dataIndex: "account_type",
        key: "account_type",
        fields: [
          {
            type: "Select",
            name: "account_type",
            placeholder: "-Select-",
            values: ["Asset 1", "Asset 2"],
          },
        ],
      },
      {
        title: "Held Where",
        dataIndex: "held_where",
        key: "held_where",
        fields: [
          {
            type: "Input",
            name: "held_where",
          },
        ],
      },
      {
        title: "Monetary Value",
        dataIndex: "monetary_value",
        key: "monetary_value",
        fields: [
          {
            type: "Input",
            name: "monetary_value",
          },
        ],
      },
    ];


    const {
      currentForm,
      handleInputChange,
      handleDatePickerChange,
      handleSelectChange,
      handleFormInputChange,
      handleCurrencyChange,
      handlePhoneChange,
      role
    } = this.props;

    // const { handleFormInputChange, role } = this.props;

    return (
      <React.Fragment>
        <AddModal
          title={"Add New Account/Asset"}
          fields={fields}
          isVisible={this.state.isAddModalVisible}
          cbClose={this.setAddModalVisible}
          handleFormInputChange={handleFormInputChange}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleDatePickerChange={handleDatePickerChange}
          handleCurrencyChange={handleCurrencyChange}
          handlePhoneChange={handlePhoneChange}
          currentForm={currentForm}
          setFormData={this.setFormData}
          formData={this.state.formData}
          create={this.createAccountAsset}
        />


        <UpdateModal
          title={"Update Account/Asset"}
          fields={update_fields}
          isVisible={this.state.isUpdateModalVisible}
          cbClose={this.setUpdateModalVisible}
          cbUpdate={this.updateAccountAsset}
          // onLoad={this.get}
          obj={this.state.updateObject}
          onUpdateChange={this.onUpdateChange}
          handleDateChange={this.handleDateChange}

        // onConstraints={this.onConstraints}
        />
        <ViewModal
          title={"View Account/Asset"}
          fields={update_fields}
          isVisible={this.state.isViewModalVisible}
          cbClose={this.setViewModalVisible}
          obj={this.state.updateObject}

        />

        {/*  <Header image={NetWorth4} title={"Assets and Liabilities"} /> */}
        <Row gutter={16}>
          <Col span={24}>
            <h2 className="text-center font-weight-bold mb-4">
              <img
                src={NetWorth4}
                height={85}
                width={85}
                style={{ marginRight: "20px" }}
              ></img>
              Assets and Liabilities
              <Icon
                style={{
                  fontSize: "27px",
                  marginLeft: "1rem",
                  cursor: "pointer",
                  color: "#39b54a",
                }}
                onClick={async () => {
                  this.showTooltipModal()
                }}
                type="question-circle"
              ></Icon>
            </h2>
          </Col>
        </Row>
        <Modal title={<span style={{ textAlign: "center", display: "block" }} >Assets and Liabilities</span>} visible={this.state.TooltipModal} footer={null} onCancel={this.handleTooltipCancel} >
          <div style={{}}>
            <div className="">
              <h2 className="otp-heading">
                This program feature is pulling information found in Asset Planet the software for
                Organizing Planning and Protecting.  The death module is part of the 4 D’s of the Asset
                Planet program- the others being Disability, Disaster and Divorce.  The Death module is
                retrieving information found in Assets and Liabilities modules.
              </h2>

            </div>
          </div>
        </Modal>




        {role !== "protrustee" ? (
          <React.Fragment>
            {/*
          <Row style={{ marginBottom: "10%" }}>
            <Col span={12}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "20%",
                  marginRight: "6%",
                }}
              >
                <h3 className="text-center font-weight-bold">
                  Import List of Assets where your are the Owner ?
                </h3>
                <div
                  style={{
                    marginLeft: "10%",
                    display: "flex",
                    flexDirection: "row",
                    width: "50%",
                  }}
                >
                  <div style={{ marginRight: "3%" }}>
                    <Button
                      type="primary"
                      size={"large"}
                      style={{
                        background: "#39b54a",
                        borderRadius: "100px",
                        width: "100px",
                      }}
                    >
                      <span className="custom-footer-text">Yes</span>
                    </Button>
                  </div>
                  <div>
                    <Button
                      type="primary"
                      size={"large"}
                      style={{
                        background: "white",
                        borderRadius: "100px",
                        width: "100px",
                      }}
                    >
                      <span
                        className="custom-footer-text"
                        style={{ color: "black" }}
                      >
                        No
                      </span>
                    </Button> 
                  </div>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" />
            </Col>
          </Row>
                  */}
          </React.Fragment>
        ) : (
          ""
        )}
        {/* 
        <Add
          title={"Accounts & Assets"}
          button={"Add New Account / Asset"}
          cbAdd={this.setAddModalVisible}
          isDisabled={role === "ROLE" ? true : false}
        />
*/}
        <div className="heading-table">
          <h2 className="text-center font-weight-bold" style={{ color: "white" }}>
            Asset Details
          </h2>
        </div>
        <AssetList
          // loading={this.state.report_rows ? false : true}
          // loading={
          //   this.state.contact_list ? this.state.contact_list <= 0 : false
          // }
          cols={asset_cols}
          rows={this.state.account_asset}
        // onChange={this.handleChange}
        ></AssetList>
        <br />
        <div className="heading-table-libilities">
          <h2 className="text-center font-weight-bold" style={{ color: "white" }}>
            Liability Details
          </h2>
        </div>
        <div className="subheading-table-libilities">
          <h2 className="subheading-text">
            Existing Loans (Not Credit Cards)
          </h2>
        </div>
        <AssetList
          // loading={this.state.report_rows ? false : true}
          // loading={
          //   this.state.contact_list ? this.state.contact_list <= 0 : false
          // }
          cols={loans_cols}
          rows={this.state.credit_rows}
        // onChange={this.handleChange}
        ></AssetList>
        <br />
        <div className="subheading-table-libilities">
          <h2 className="subheading-text">
            Credit Line (Bank or Credit Cards)
          </h2>
        </div>
        <AssetList
          // loading={this.state.report_rows ? false : true}
          // loading={
          //   this.state.contact_list ? this.state.contact_list <= 0 : false
          // }
          cols={credit_cols}
          rows={this.state.liabilities_credit}
        // onChange={this.handleChange}
        ></AssetList>
        {/* get account and asset row
        {this.state.account_asset.map((data, index) =>
          this.getRow({ data, index: index + 1, id: data.id })
        )}
 */}
        <br /><br />
        <Footer cbPrev={this.props.previousForm} cbNext={this.props.nextForm
          //   this.props.nextForm(async () => {
          //   try {
          //     let data = this.state.newData
          //     if (Array.isArray(data) && data.length > 0) {
          //       let api_res = await DEATH_API.addAccountAsset({
          //         accountAssetForm: data.map(item => {
          //           return {
          //             name: item.AssetName,
          //             accountType: item.AccountType,
          //             heldWhere: item.HeldWhere,
          //             monetaryValue: item.MonetaryValue
          //           }
          //         })
          //       })
          //       return api_res
          //     }
          //   } catch (error) {
          //     console.log(error)
          //     throw new Error(error)
          //   }
          // })
        } />
      </React.Fragment>
    );
  }
}

export default AccountAssetForm;
