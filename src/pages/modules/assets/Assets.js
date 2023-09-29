import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, Button, Row, Col } from "antd";
import ROLES from "constants/roles";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { QL_ASSETS_LIST, QL_ASSETS_DELETE } from "../../../constants/queries";
import { MODULE_API } from "../../../apis";
import Report from "../../../components/Report";
import PageTitle from "components/layout/PageTitle";
import AssetDetails from "pages/reports/ReportAsset/modals/AssetDetails";
import AllAssets from "pages/reports/ReportAsset/modals/AllAssets";
import Income_Tax2 from "../../../assets/images/latest/Income-Tax2.png";
import { float2Currency } from "helpers/Utils";
import { Bar } from "react-chartjs-2";
import "./assets.css";
import FETCH from "../../../utils/fetch";
import Loader from "../../../components/styled-components/loader/loader";
import swal from "sweetalert";
import moment from "moment";
var fnMutationAssetsDelete = null;
var dataMutationAssetsDelete = null;

// function HiddenHook() {
//   [fnMutationAssetsDelete, { dataMutationAssetsDelete }] = useMutation(
//     QL_ASSETS_DELETE
//   );

//   return <React.Fragment></React.Fragment>;
// }

// function LoadDBDataHook(props) {
//   const {
//     data,
//     loading,
//     error,
//     refetch,
//     networkStatus,
//   } = useQuery(QL_ASSETS_LIST, { notifyOnNetworkStatusChange: true });

//   if (props.dbReload) {
//     console.log("reload..");
//     refetch();
//   }

//   props.cbUpdateNetworkStatus(networkStatus);
//   console.log("networkStatus:", networkStatus);
//   if (data) {
//     props.cbLoadDBData(networkStatus, data);
//   }

//   return <React.Fragment></React.Fragment>;
// }

class Assets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isOpenDelete: false,
      reload: true,
      total_assets: 0,
      dbLoaded: false,
      dbLoading: true,
      report_rows: [],
      dbReload: false,
      networkStatus: 0,
      sortedInfo: null,
      isLoading: false,
      monetoryValues: [],
      AssetNames: [],
    };

    this.fnAdd = this.fnAdd.bind(this);
    this.fnEdit = this.fnEdit.bind(this);
    this.fnView = this.fnView.bind(this);

    // this.loadDBData = this.loadDBData.bind(this);
    this.updateNetworkStatus = this.updateNetworkStatus.bind(this);
  }
  async fetchAssets() {
    this.setState({ isLoading: true });

    let res = await FETCH.post({
      url: "client-module/list",
      id: `?module=Asset&page=1&limit=100`,
      body: {},
    });
    this.setState({ isLoading: false });

    if (res && res.records) {
      this.setState({ report_rows: res.records });
      res.records.map((item) => {
        // this.setState(prevState, props{
        //   total_assets: item["Monetary Value"]
        // })
        this.setState((prevState, props) => ({ total_assets: item["Monetary Value"] + prevState.total_assets }))
        // this.setState((prevState, props) => ({ monetoryValues: item["Monetary Value"], ...prevState.monetoryValues }))
        // this.setState((prevState, props) => ({ AssetNames: item["Name of Asset"], ...prevState.AssetNames }))
        this.setState({
          monetoryValues: [
            ...this.state.monetoryValues, item["Monetary Value"]
          ],
        });
        this.setState({
          AssetNames: [
            ...this.state.AssetNames, item["Name of Asset"]
          ],
        });


      })
    }
    console.log("monetoryValues", this.state.monetoryValues, this.state.AssetNames)

  }

  async deletePost(id) {
    console.log(id);
    swal({
      title: "Are you sure?",
      text: "You want to delete this message.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(async (result) => {
        if (result === true) {
          this.setState({ isLoading: true });
          try {
            const res = await MODULE_API.removeClientModule({
              clientModules: [id],
            });
            return res;
          } catch (error) {
            this.setState({ isLoading: false });
          }
        }
      })
      .then((res) => {
        if (res && res.status == 200) this.fetchAssets();
      });
  }

  componentDidMount() {
    this.fetchAssets();
  }

  fnAdd() {
    this.props.history.push("/asset_allocation");
  }

  fnEdit(record) {
    console.log("record", record.module);
    this.props.history.push(`/assets_new/attributes/${record.module}/${record.id}`);
    // this.props.history.push(`/assets_new/attributes/${module}` + record.id);
  }

  fnView(record) {
    this.props.history.push("/assets_view/" + record.id);
  }

  fnDelete(record) {
    window.localStorage.setItem("assets_delete_id", record.id);
    this.setState({
      isOpenDelete: !this.state.isOpenDelete,
    });
  }

  confirmDelete = (e) => {
    let dbID = window.localStorage.getItem("assets_delete_id");
    if (dbID != null && dbID != "") {
      fnMutationAssetsDelete({ variables: { id: dbID } });
      this.setState({
        dbReload: false,
        isOpenDelete: false,
      });

      var instance = this;
      setTimeout(function () {
        instance.setState({
          dbReload: true,
          dbLoading: true,
        });
      }, 1000);
    } else {
      this.setState({
        isOpenDelete: false,
      });
    }
  };

  handleCancel = (e) => {
    this.setState({
      isOpenDelete: false,
    });
  };

  // loadDBData(networkStatus, data) {
  //   console.log("loadDBData:", data);

  //   if (this.state.networkStatus == networkStatus) {
  //     return;
  //   }

  //   var report_rows = [];
  //   var total_assets = 0;

  //   for (var index = 0; index < data["assets"].length; index++) {
  //     var monetary_value = 0;
  //     if (data["assets"][index]["assetPerformance"] != null) {
  //       monetary_value =
  //         data["assets"][index]["assetPerformance"]["monetaryValue"] != null
  //           ? parseFloat(
  //               data["assets"][index]["assetPerformance"]["monetaryValue"]
  //             )
  //           : 0;
  //     }

  //     total_assets += monetary_value;
  //     report_rows.push({
  //       key: index,
  //       id: data["assets"][index]["id"],
  //       owner: data["assets"][index]["owner"],
  //       asset_name: data["assets"][index]["name"],
  //       account_type: data["assets"][index]["accountType"],
  //       held_where: data["assets"][index]["heldWhere"],
  //       monetary_value: float2Currency(monetary_value),
  //     });
  //   }

  //   var instance = this;
  //   setTimeout(function () {
  //     instance.setState({
  //       report_rows: report_rows,
  //       total_assets: total_assets,
  //       dbLoading: false,
  //       dbLoaded: true,
  //       dbReload: false,
  //     });
  //   }, 500);
  // }

  updateNetworkStatus(networkStatus) {
    if (this.state.networkStatus != networkStatus) {
      var instance = this;
      setTimeout(function () {
        instance.setState({
          networkStatus: networkStatus,
        });
      }, 1000);
    }
  }

  handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      sortedInfo: sorter,
    });
  };

  render() {
    const navlinks = [
      {
        href: "/",
        title: "Home",
      },
      {
        href: "/modules",
        title: "Modules",
      },
    ];

    var report_actions = [];
    if (this.props.user.role != ROLES.VIEW_ONLY) {
      report_actions = [
        {
          title: "Add",
          fnClick: this.fnAdd,
        },
      ];
    }

    // const report_cols = [
    //     {
    //         title: 'Owner',
    //         dataIndex: 'owner',
    //         key: 'owner'
    //     },
    //     {
    //       title: 'Name of Asset ',
    //       dataIndex: 'asset_name',
    //       key: 'asset_name'
    //     },
    //     {
    //       title: 'Account Type',
    //       dataIndex: 'account_type',
    //       key: 'account_type',
    //     },
    //     {
    //         title: 'Held Where',
    //         dataIndex: 'held_where',
    //         key: 'held_where',
    //       },
    //     {
    //       title: 'Monetary Value',
    //       dataIndex: 'monetary_value',
    //       key: 'monetary_value',
    //     },
    //     {
    //         title: '',
    //         key: 'id',
    //         render: (record) => {
    //             if(true){
    //                 return(
    //                     <span>
    //                         <a className="report-action-btn report-action-btn--view" onClick={() => this.fnView(record)}>View</a>
    //                         <a className="report-action-btn report-action-btn--edit" onClick={() => this.fnEdit(record)}>Edit</a>
    //                         <a className="report-action-btn report-action-btn--delete" onClick={() => this.fnDelete(record)}>Delete</a>
    //                     </span>
    //                 )
    //             }
    //             else{
    //                 return (
    //                     <span>
    //                         <a className="report-action-btn report-action-btn--view" onClick={() => this.fnView(record)}>View</a>
    //                     </span>
    //                 )
    //             }
    //         }
    //     },
    // ];

    const report_cols = [
      {
        title: "Asset Type",
        dataIndex: "module",
        sorter: (a, b) =>
          a.module > b.module ? 1 : a.module === b.module ? 0 : -1,
        render: (record) => (record ? record : "--------"),
      },
      {
        title: "Name of Asset",
        dataIndex: "Name of Asset",
        sorter: (a, b) => a["Name of Asset"] > b["Name of Asset"],
        render: (record) => (record ? record : "--------"),
      },
      {
        title: "Account Type",
        dataIndex: "Account Type/Titled",
        key: "account",
        sorter: (a, b) =>
          a["Account Type/Titled"] > b["Account Type/Titled"] ? 1 : a["Account Type/Titled"] === b["Account Type/Titled"] ? 0 : -1,
        render: (record) => (record ? record : "--------"),
      },
      {
        title: "Held Where",
        dataIndex: "Held Where",
        key: "held_where",
        render: (record) => (record ? record : "N/A"),
      },
      {
        title: "Monetary Value",
        dataIndex: "Monetary Value",
        key: "value",
        defaultSortOrder: "descend",
        sorter: (a, b) => a["Monetary Value"] - b["Monetary Value"],

        render: (record) =>
          record ? `$ ${record.toLocaleString("en-US")}` : "--------",
      },
      {
        title: "Value as of Date",
        dataIndex: "Value as of Date",
        key: "value_date",
        render: (record) =>
          record && record ? moment(record).format("DD-MM-YYYY") : "N/A",
      },
      // {
      //   title: "This Asset is Liquid",
      //   dataIndex: "This Asset is Liquid",
      //   key: "liquid_asset",
      //   render: (record) => (record ? "false" : "true"),
      // },
      // {
      //   title: "Taxability",
      //   dataIndex: "This Asset has a Loan",
      //   key: "taxability",
      //   render: (record) => (record == true ? "True" : "False"),
      // },
      // {
      //   title: "Taxability on distribution",
      //   dataIndex: "This Asset produces Income",
      //   key: "taxability_distribution",
      //   render: (record) => {
      //     return record == true ? "True" : "False";
      //   },
      // },
      {
        title: "Action",
        render: (record) => {
          return (
            <>
              <Button
                type="link"
                style={{ fontSize: "21px" }}
                icon="edit"
                onClick={() => {
                  this.fnEdit(record)
                }}
              ></Button>
              <Button
                type="link"
                style={{ fontSize: "21px" }}
                icon="delete"
                onClick={() => {
                  // console.log("record==>",record)
                  this.deletePost(record.id);
                }}
              ></Button>
            </>
          );
        },
      },
    ];

    const barData = {
      labels: this.state.AssetNames && this.state.AssetNames,
      datasets: [
        {
          label: "",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: this.state.monetoryValues && this.state.monetoryValues,
        },
      ],
    };

    return (
      <React.Fragment>
        {/* <HiddenHook /> */}
        {/* <LoadDBDataHook 
                    dbLoaded={this.state.dbLoaded}
                    dbReload={this.state.dbReload}
                    cbLoadDBData={this.loadDBData}
                    cbUpdateNetworkStatus={this.updateNetworkStatus}
                /> */}
        <div className="page-nav-history">
          {/* { 
                        navlinks.map((navlink, index) => {
                            return (
                                <span key={index}>
                                    <Link key={index} to={navlink.href} className="page-nav-link">
                                        {navlink.title}
                                    </Link>
                                    {index != (navlinks.length - 1) ? "/" : null}
                                </span>
                                
                            )                            
                        }) 
                    } */}
        </div>
        <div className="asset-heading">
          <Row style={{ textAlign: "center" }}>
            <div>
              <h2 style={{ color: "white" }} className=" font-weight">
                Assets
              </h2>
            </div>
          </Row>
          <Row
            justify="center"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <h5 style={{ color: "white" }} className=" font-weight">
                Client Name: {localStorage.getItem("User") ? localStorage.getItem("User") : <React.Fragment></React.Fragment>}

              </h5>
            </div>
            <div>
              <h5 style={{ color: "white" }} className=" font-weight">
                Plan: Plan One
              </h5>
            </div>

            <div>
              <h5 style={{ color: "white" }} className=" font-weight">
                Today's Date: {moment().format("MM/DD/YYYY")}
              </h5>
            </div>
          </Row>
        </div>

        {/*  {this.props.user.role != ROLES.VIEW_ONLY && (
          <div className="top-btn-area">
            <Button type="primary" onClick={this.fnAdd}>
              Add
            </Button>
          </div>
        )}
      */}
        <AllAssets allAssetsValue={float2Currency(this.state.total_assets)} />
        <Row
          type="flex"
          justify="center"
          style={{
            margin: "12px 0",
            padding: "16px",
            border: "1px solid #ddd",
            backgroundColor: "rgba(237, 237, 237, 0.40)",
          }}
        >
          <Bar
            data={barData}
            height={300}
            options={{
              maintainAspectRatio: false,
            }}
          />
        </Row>
        <div className="fragment-assitance-received" style={{ marginTop: 20 }}>
          <PageTitle title="Asset Details" level={4} />
          <Report
            // loading={this.state.report_rows ? false : true}
            loading={
              this.state.report_rows ? this.state.report_rows <= 0 : false
            }
            cols={report_cols}
            rows={this.state.report_rows}
            onChange={this.handleChange}
          ></Report>
        </div>
        <Modal
          title="Alert"
          visible={this.state.isOpenDelete}
          onOk={this.confirmDelete}
          onCancel={this.handleCancel}
        >
          <p>Are you sure to delete?</p>
        </Modal>
        <Loader isLoading={this.state.isLoading} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.rootReducer.loginUser.loginUserData,
  };
};
export default connect(mapStateToProps, null)(Assets);
