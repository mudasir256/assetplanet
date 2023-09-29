import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, Button, Row, Col } from "antd";
import ROLES from "constants/roles";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { QL_INCOME_LIST, QL_INCOME_DELETE } from "../../../constants/queries";
import { MODULE_API } from "../../../apis";
import moment from "moment";
import FETCH from "../../../utils/fetch";
import Loader from "../../../components/styled-components/loader/loader";

import Report from "../../../components/Report";
import IncomeModal from "./IncomeModal";

import PageTitle from "components/layout/PageTitle";
import HighlightedReportBlock from "components/layout/HighlightedReportBlock";
import TableReport from "components/layout/TableReport";
import InfoList from "components/InfoList";

import { Bar } from "react-chartjs-2";
import highlightedIcon from "assets/images/contributions.png";

import { float2Currency } from "helpers/Utils";
import "./income.css";

var fnMutationIncomeDelete = null;
var dataMutationIncomeDelete = null;

function HiddenHook() {
  [fnMutationIncomeDelete, { dataMutationIncomeDelete }] = useMutation(
    QL_INCOME_DELETE
  );

  return <React.Fragment></React.Fragment>;
}

function LoadDBDataHook(props) {
  const {
    data,
    loading,
    error,
    refetch,
    networkStatus,
  } = useQuery(QL_INCOME_LIST, { notifyOnNetworkStatusChange: true });

  if (props.dbReload) {
    console.log("reload..");
    refetch();
  }

  props.cbUpdateNetworkStatus(networkStatus);
  console.log("networkStatus:", networkStatus);
  if (data) {
    props.cbLoadDBData(networkStatus, data);
  }

  return <React.Fragment></React.Fragment>;
}

class Income extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      isOpenDelete: false,
      reload: true,
      isLoading: false,

      overall_income: [
        {
          label: "Passive Income",
          value: "$50,000",
        },
        {
          label: "Earned Income",
          value: "$12,000",
        },
        {
          label: "Gross Income Total",
          value: "$62,000",
        },
      ],
      overall_adj_income: [
        {
          label: "Gross Income",
          value: "$50,000",
        },
        {
          label: "Adjusted Growth Income (AGI)",
          value: "$12,000",
        },
      ],
      dbLoaded: false,
      dbLoading: true,
      report_rows: [],
      dbReload: false,
      networkStatus: 0,
    };

    this.fnAdd = this.fnAdd.bind(this);
    this.fnEdit = this.fnEdit.bind(this);
    this.fnView = this.fnView.bind(this);

    this.loadDBData = this.loadDBData.bind(this);
    this.updateNetworkStatus = this.updateNetworkStatus.bind(this);
  }

  componentDidMount() {
    console.log("")
    this.showIncomeData();

  }
  showIncomeData = async () => {
    try {
      this.setState({ isLoading: true })
      let res = await FETCH.post({
        url: "client-module/list",
        id: `?module=Income&page=1&limit=100`,
        body: {},
      });
      if (res && res.records) {

        console.log("res of data", res);
        this.setState({
          report_rows: res.records,
        });
      }
      this.setState({ isLoading: false })
    } catch (e) {
      this.setState({ isLoading: false })
      console.log("e", e);
    }

  };

  fnAdd() {
    this.props.history.push("/income_new");
  }

  fnEdit(record) {
    this.props.history.push("/income_edit/" + record.id);
  }

  fnView(record) {
    this.props.history.push("/income_view/" + record.id);
  }

  fnDelete(record) {
    window.localStorage.setItem("income_delete_id", record.id);
    this.setState({
      isOpenDelete: !this.state.isOpenDelete,
    });
  }

  confirmDelete = (e) => {
    let dbID = window.localStorage.getItem("income_delete_id");
    if (dbID != null && dbID != "") {
      fnMutationIncomeDelete({ variables: { id: dbID } });
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
      }, 100);
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

  loadDBData(networkStatusIn, data) {
    console.log("loadDBData:", data);

    if (this.state.networkStatusIn == networkStatusIn) {
      return;
    }

    var rows = [];
    var total_passive_income = 0;
    var total_earned_income = 0;
    var total_income = 0;

    var total_gross_income = 0;
    var total_a_gross_income = 0;

    for (var index = 0; index < data["incomes"].length; index++) {
      var gross_income = 0;
      gross_income =
        data["incomes"][index]["grossWages"] != null
          ? parseFloat(data["incomes"][index]["grossWages"])
          : 0;

      switch (data["incomes"][index]["incomeType"]) {
        case "Bonus from Work":
        case "Sales Commision from Work":
        case "Earned Income From Work":
          // earned income
          total_passive_income += gross_income;
          break;
        default:
          // passive income
          total_earned_income += gross_income;
          break;
      }

      var a_gross_income = 0;
      a_gross_income =
        data["incomes"][index]["incomeTaxation"]["adjustedGrossIncome"] != null
          ? parseFloat(
            data["incomes"][index]["incomeTaxation"]["adjustedGrossIncome"]
          )
          : 0;
      console.log("a_gross_income:", a_gross_income);
      // total_a_gross_income += a_gross_income;
      rows.push({
        key: index,
        id: data["incomes"][index]["id"],
        income_type: data["incomes"][index]["incomeType"],
        nickname_income: data["incomes"][index]["nicknameIncome"],
        owner: data["incomes"][index]["owner"],
        est_amt_remaining_first_year: float2Currency(
          data["incomes"][index]["estimatedAmountRemainingFirstYear"]
        ),
        feterdal_taxation_type:
          data["incomes"][index]["incomeTaxation"]["federalTaxationType"],
        passive: data["incomes"][index]["incomeTaxation"]["passiveOrEarned"],
        income_ends_at: float2Currency(data["incomes"][index]["incomeEndsAt"]),
      });
    }

    var overall_income = this.state.overall_income;
    overall_income[0]["value"] = float2Currency(total_passive_income);
    overall_income[1]["value"] = float2Currency(total_earned_income);
    overall_income[2]["value"] = float2Currency(
      total_passive_income + total_earned_income
    );

    var overall_adj_income = this.state.overall_adj_income;
    overall_adj_income[0]["value"] = float2Currency(total_gross_income);
    overall_adj_income[1]["value"] = float2Currency(total_a_gross_income);

    var instance = this;
    setTimeout(function () {
      instance.setState({
        overall_income: overall_income,
        overall_adj_income: overall_adj_income,
        report_rows: rows,
        dbLoading: false,
        dbLoaded: true,
        dbReload: false,
      });
    }, 500);
  }

  updateNetworkStatus(networkStatusIn) {
    if (this.state.networkStatusIn != networkStatusIn) {
      var instance = this;
      setTimeout(function () {
        instance.setState({
          networkStatusIn: networkStatusIn,
        });
      }, 1000);
    }
  }

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

    const report_cols = [
      {
        title: "Income Type",
        dataIndex: "subType",
        key: "subType",
        render: (record) => (record ? record : "N/A"),
      },
      {
        title: "Nickname Income",
        dataIndex: "Nickname Income",
        key: "Nickname Income",
        render: (record) => (record ? record : "N/A"),
      },
      {
        title: "Owner",
        dataIndex: "Owner",
        key: "Owner",
        render: (record) => (record ? record : "N/A"),
      },
      {
        title: "Estimated Amount Per",
        dataIndex: "estimated_amount_per",
        key: "estimated_amount_per",
        render: (record) => (record ? record : "N/A"),
      },
      {
        title: "Federal Taxation Type",
        dataIndex: "Federal Taxation Type",
        key: "Federal Taxation Type",
        render: (record) => (record ? record : "N/A"),
      },
      {
        title: "Passive/Earned",
        dataIndex: "Passive or Earned",
        key: "Passive or Earned",
        render: (record) => (record ? record : "N/A"),
      },
      {
        title: "Income Ends At",
        dataIndex: "Date Income Ends",
        key: "Date Income Ends",
        render: (record) => (record ? moment(record).format('DD-MM-YYYY') : "N/A"),
      },
      // {
      //   title: "",
      //   key: "id",
      //   render: (record) => {
      //     if (this.props.user.role != ROLES.VIEW_ONLY) {
      //       return (
      //         <span>
      //           <a
      //             className="report-action-btn report-action-btn--view"
      //             onClick={() => this.fnView(record)}
      //           >
      //             View
      //           </a>
      //           <a
      //             className="report-action-btn report-action-btn--edit"
      //             onClick={() => this.fnEdit(record)}
      //           >
      //             Edit
      //           </a>
      //           <a
      //             className="report-action-btn report-action-btn--delete"
      //             onClick={() => this.fnDelete(record)}
      //           >
      //             Delete
      //           </a>
      //         </span>
      //       );
      //     } else {
      //       return (
      //         <span>
      //           <a
      //             className="report-action-btn report-action-btn--view"
      //             onClick={() => this.fnView(record)}
      //           >
      //             View
      //           </a>
      //         </span>
      //       );
      //     }
      //   },
      // },
    ];

    const reportInfoData = [
      {
        title: "Client Name",
        value: "Bill Client",
      },
      {
        title: "Plan Nickname",
        value: "First Plan",
      },
      {
        title: "Spouse Name",
        value: "Peggy Client",
      },
      {
        title: "Today's Date",
        value: "11/20/2019",
      },
    ];

    // const barData = {
    //     labels: ['1. Testing Multiple dist to income', 'Dist', 'Adam\'s Dist', 'Brand New Rental', 'Dist Two', 'Early WD', 'Frank\'s Annuity'],
    //     datasets: [
    //       {
    //         label: '',
    //         backgroundColor: 'rgba(255,99,132,0.2)',
    //         borderColor: 'rgba(255,99,132,1)',
    //         borderWidth: 1,
    //         hoverBackgroundColor: 'rgba(255,99,132,0.4)',
    //         hoverBorderColor: 'rgba(255,99,132,1)',
    //         data: [0, 50000, 100000, 150000, 0, 50000, 100000]
    //       }
    //     ]
    // };

    const barData = {
      labels: [
        "Sun America",
        "Yeild Basket",
        "AT&T",
        "Stylish Income",
        "Beach House",
        "Schwab Muni",
      ],
      datasets: [
        {
          label: "All Income",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(54, 162, 235, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: [
            "rgba(54, 162, 235, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(54, 162, 235, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    return (
      <React.Fragment>
        {/*  <HiddenHook />

        <LoadDBDataHook
          dbLoaded={this.state.dbLoaded}
          dbReload={this.state.dbReload}
          cbLoadDBData={this.loadDBData}
          cbUpdateNetworkStatus={this.updateNetworkStatus}
        />
        */}
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
        {this.props.user.role != ROLES.VIEW_ONLY && (
          <div className="top-btn-area">
            <Button type="primary" className="float-right" onClick={this.fnAdd}>
              Add
            </Button>
          </div>
        )}
        <PageTitle title="Income Report" />

        <Row justify="center">
          <div>
            <h5
              style={{ color: "black" }}
              className="text-center font-weight-bold"
            >
              Synopsis: Gross Income, Adjusted Gross Income, Modified Adjusted Gross Income, Passive or Earned
            </h5>
          </div>
        </Row>

        <Row justify="center">
          <Col className="asset-title" span={12}>
            <div>
              <h5
                style={{ color: "black" }}
                className="text-center font-weight mb-3 mt-2"
              >
                Client Name: {localStorage.getItem("User") ? localStorage.getItem("User") : <React.Fragment></React.Fragment>}
              </h5>
              <h5
                style={{ color: "black" }}
                className="text-center font-weight"
              >
                Plan Nickname: First Plan
              </h5>
            </div>
          </Col>

          <Col className="asset-title" span={12}>
            <div>
              <h5
                style={{ color: "black" }}
                className="text-center font-weight mb-3 mt-2"
              >
                Spouse Name: Tracy Jones
              </h5>
              <h5
                style={{ color: "black" }}
                className="text-center font-weight"
              >
                Today's Date: {moment().format("MM/DD/YYYY")}
              </h5>
            </div>
          </Col>
        </Row>

        <Row type="flex" gutter={[20, 0]} style={{ margin: "20px 0" }}>
          <Col span={7} style={{ paddingTop: "20px" }}>
            <InfoList
              column={1}
              title="Gross Income"
              data={this.state.overall_income}
            />
          </Col>
          <Col span={10}>
            <HighlightedReportBlock
              title="Total Gross Income"
              value={this.state.overall_income[2]["value"]}
            >
              <img src={highlightedIcon} alt="" style={{ height: "100px" }} />
            </HighlightedReportBlock>
          </Col>
          <Col span={7} style={{ paddingTop: "20px" }}>
            <InfoList
              column={1}
              title="Adjusted Gross Income"
              data={this.state.overall_adj_income}
            />
          </Col>
        </Row>
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
        <div className="fragment-assitance-received">
          <PageTitle title={"All Income"} level={4} />
          <Report
            // loading={this.state.dbLoading}
            cols={report_cols}
            rows={this.state.report_rows}
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
        <Loader isLoading={this.state.isLoading}></Loader>

      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.rootReducer.loginUser.loginUserData

  };
};
export default connect(mapStateToProps, null)(Income);
