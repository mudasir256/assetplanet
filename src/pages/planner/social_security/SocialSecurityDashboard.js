import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, Button, Row, Col } from "antd";
import ROLES from "constants/roles";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { QL_INCOME_LIST, QL_INCOME_DELETE } from "../../../constants/queries";

import Report from "../../../components/Report";
// import IncomeModal from "./IncomeModal";

import PageTitle from "components/layout/PageTitle";
import HighlightedReportBlock from "components/layout/HighlightedReportBlock";
import TableReport from "components/layout/TableReport";
import InfoList from "components/InfoList";

import { Bar } from "react-chartjs-2";
import highlightedIcon from "assets/images/contributions.png";

import { float2Currency } from "helpers/Utils";
import "./SocialSecurity.css";

// import "./income.css";

var fnMutationIncomeDelete = null;
var dataMutationIncomeDelete = null;

function HiddenHook() {
  [fnMutationIncomeDelete, { dataMutationIncomeDelete }] =
    useMutation(QL_INCOME_DELETE);

  return <React.Fragment></React.Fragment>;
}

function LoadDBDataHook(props) {
  const { data, loading, error, refetch, networkStatus } = useQuery(
    QL_INCOME_LIST,
    { notifyOnNetworkStatusChange: true }
  );

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

class SocialSecurityDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      isOpenDelete: false,
      reload: true,

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

  componentDidMount() {}

  fnAdd() {
    this.props.history.push("/social/create");
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

  getFinalResult = () => {
    return (
      <div
        className="social-securtiy-block mb-4"
        style={{ background: "white" }}
      >
        <Row className="budget-col-chart">
          <Col span={8}>
            <div className="budget-col">
              <div>
                <h4 className="heading-block font-weight-bold text-center  mt-2">
                  Lifetime Benefits At Age 62
                </h4>
              </div>
              <div>
                <h3
                  style={{ color: "black" }}
                  className="font-weight-bold text-center  mt-2"
                >
                  $942,000.48
                </h3>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className="budget-col">
              <div>
                <h4 className="heading-block font-weight-bold text-center  mt-2">
                  Lifetime Benefits At Full Retirement Age
                </h4>
              </div>
              <div>
                <h3
                  style={{ color: "black" }}
                  className="font-weight-bold  text-center  mt-2"
                >
                  $1,091,297.91
                </h3>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className="budget-col">
              <div>
                <h4 className="heading-block font-weight-bold text-center  mt-2">
                  Lifetime Benefits At Age 70
                </h4>
              </div>
              <div>
                <h3
                  style={{ color: "black" }}
                  className="font-weight-bold text-center  mt-2"
                >
                  $1,203,587.22
                </h3>
              </div>
            </div>
          </Col>
        </Row>
        <Row
          type="flex"
          justify="center"
          gutter={[20]}
          style={{ margin: "2px" }}
        >
          <Col span={24} className="background-color-social">
            <div>
              <h6
                style={{ color: "black" }}
                className="text-left ml-2 mt-1 mb-1"
              >
                These values consider a COLA of 1.25% per year. Click{" "}
                <a>HERE</a> for information on COLA from the Social Security
                Administration
              </h6>
            </div>
          </Col>
        </Row>
      </div>
    );
  };

  getClientNameandInfo = (title) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p className="row-title-info-social">{title}</p>
        <div className="client-info-name">
          <p className="right-top-text" style={{ margin: "3%" }}>
            Danish Asim
          </p>
        </div>
      </div>
    );
  };

  getAmntCard = ({ title = "", amount = "" }) => {
    return (
      <Col span={8}>
        <div className="percentage-card-container-social">
          <p className="percentage-header-text-custom">{title}</p>
          <div className="social-white-block">
            <div className="dollar-box">
              <p className="dollar-text ">$</p>
            </div>
            <div>
              <p className="right-text ">{amount}</p>
            </div>
          </div>
        </div>
      </Col>
    );
  };

  tableRowTypeOne = ({ title = "", value = "" }) => {
    return (
      <div className="table-row-1-social">
        <p className="row-title-width-social">{title}</p>
        <div className="table-price-border ">
          <p className="table-column-value-social">{value}</p>
        </div>
      </div>
    );
  };

  tableRowTypeTwo = ({ title = "", value = "" }) => {
    return (
      <div className="table-row-2-social">
        <p className="row-title-width-social">{title}</p>
        <div className="table-price-border ">
          <p className="table-column-value-social">{value}</p>
        </div>
      </div>
    );
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

    const report_cols = [
      {
        title: "Income Type",
        dataIndex: "income_type",
        key: "income_type",
      },
      {
        title: "Nickname Income",
        dataIndex: "nickname_income",
        key: "nickname_income",
      },
      {
        title: "Owner",
        dataIndex: "owner",
        key: "owner",
      },
      {
        title: "Estimated Amount Per",
        dataIndex: "estimated_amount_per",
        key: "estimated_amount_per",
      },
      {
        title: "Federal Taxation Type",
        dataIndex: "feterdal_taxation_type",
        key: "feterdal_taxation_type",
      },
      {
        title: "Passive/Earned",
        dataIndex: "passive",
        key: "passive",
      },
      {
        title: "Income Ends At",
        dataIndex: "income_ends_at",
        key: "income_ends_at",
      },
      {
        title: "",
        key: "id",
        render: (record) => {
          if (this.props.user.role != ROLES.VIEW_ONLY) {
            return (
              <span>
                <a
                  className="report-action-btn report-action-btn--view"
                  onClick={() => this.fnView(record)}
                >
                  View
                </a>
                <a
                  className="report-action-btn report-action-btn--edit"
                  onClick={() => this.fnEdit(record)}
                >
                  Edit
                </a>
                <a
                  className="report-action-btn report-action-btn--delete"
                  onClick={() => this.fnDelete(record)}
                >
                  Delete
                </a>
              </span>
            );
          } else {
            return (
              <span>
                <a
                  className="report-action-btn report-action-btn--view"
                  onClick={() => this.fnView(record)}
                >
                  View
                </a>
              </span>
            );
          }
        },
      },
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
          label: "# of Votes",
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
        <div className="social-main-container">
          <Row
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "3%",
            }}
          >
            <Col span={12}>
              <p className="social-security-title">Social Security Report</p>
            </Col>
            <Col span={12}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "50%",
                }}
              >
                <div>
                  <p className="social-security-title">Add New Client</p>
                </div>
                <div className="add-new-container" onClick={this.fnAdd}>
                  <p className="social-add-new-security-title">+</p>
                </div>
              </div>
            </Col>
          </Row>

          {/* Synopsis */}
          <Row>
            <Col span={24}>
              <div className="synopsis-container">
                <div className="synopsis-border">
                  <p className="row-title-info-social">Synopsis</p>
                </div>
                <div className="synopsis-value-border">
                  <p className="row-title-info-social-white">
                    Analysis of scenarios for optimum time for each person to
                    take benefit
                  </p>
                </div>
              </div>
            </Col>
          </Row>

          {/* Client Info  */}
          <Row gutter={16} style={{ marginBottom: "3%" }}>
            <Col span={6}>{this.getClientNameandInfo("Client Name")}</Col>
            <Col span={6}>{this.getClientNameandInfo("Spouse Name")}</Col>
            <Col span={6}>{this.getClientNameandInfo("Plan's NickName")}</Col>
            <Col span={6}>{this.getClientNameandInfo("Today's Date")}</Col>
          </Row>

          {/* Client Area */}
          <Row>
            <Col span={24}>
              <div
                style={{
                  marginTop: "3%",
                }}
              >
                <p className="social-title">Client's Area</p>
              </div>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginBottom: "3%" }}>
            <Col span={12}>
              <div className="client-area">
                <div className="general-bar-social">
                  <p className="general-item-socail">General</p>
                </div>
                <div className="table-container-social ">
                  <div style={{ marginTop: "2%" }}></div>
                  {this.tableRowTypeOne({
                    title: "Birthdate",
                    value: "20/03/2000",
                  })}
                  {this.tableRowTypeOne({
                    title: "Retirement Year",
                    value: "1999",
                  })}
                  {this.tableRowTypeOne({
                    title: "Monthly Benefits",
                    value: "$ 25000/-",
                  })}
                  {this.tableRowTypeOne({
                    title: "Full Retirement Age",
                    value: "99",
                  })}
                  {this.tableRowTypeOne({
                    title: "Living Cost Adjustment",
                    value: "1.25",
                  })}
                  {this.tableRowTypeOne({
                    title: "Time Value of Money Interest Rate",
                    value: "3.00",
                  })}
                  {this.tableRowTypeOne({
                    title: "Time Until Full Retirement Age",
                    value: "-",
                  })}
                </div>
              </div>
            </Col>

            <Col span={12}>
              <div className="client-area">
                <div className="general-bar-social">
                  <p className="general-item-socail">Retirement Earnings</p>
                </div>
                <div className="table-container-social table-container-social1 ">

                  {this.tableRowTypeTwo({
                    title: "Birthdate",
                    value: "20/03/2000",
                  })}
                  {this.tableRowTypeTwo({
                    title: "Retirement Year",
                    value: "1999",
                  })}
                  {this.tableRowTypeTwo({
                    title: "Monthly Benefits",
                    value: "$ 25000/-",
                  })}
                  {this.tableRowTypeTwo({
                    title: "Full Retirement Age",
                    value: "99",
                  })}
                </div>
              </div>
            </Col>
          </Row>

          {/* Life Benefit */}
          <div className="lifetime-border-social">
            <Row>
              <Col span={24}>
                <div
                  style={{
                    marginBottom: "2%",
                  }}
                >
                  <p className="social-benefit-title">Lifetime Benefit</p>
                </div>
              </Col>
            </Row>
            <Row gutter={16}>
              {this.getAmntCard({ title: "At Age 62", amount: "1,234,567" })}
              {this.getAmntCard({
                title: "At Full Retirement Age",
                amount: "1,234,567",
              })}
              {this.getAmntCard({ title: "At Age 70", amount: "1,234,567" })}
            </Row>
            <Row>
              <Col span={24}>
                <div className="lifetime-value-border">
                  <p className="row-title-info-social-white">
                    These values consider a COLA of 1.25% per year. Click here
                    for information on COLA from the Social Security
                    Administration``
                  </p>
                </div>
              </Col>
            </Row>
          </div>

          {/* Spouse Area */}
          <Row>
            <Col span={24}>
              <div
                style={{
                  marginTop: "3%",
                }}
              >
                <p className="social-title">Spouse's Area</p>
              </div>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginBottom: "3%" }}>
            <Col span={12}>
              <div className="client-area">
                <div className="general-bar-social">
                  <p className="general-item-socail">General</p>
                </div>
                <div className="table-container-social">
                  <div style={{ marginTop: "2%" }}></div>
                  {this.tableRowTypeOne({
                    title: "Birthdate",
                    value: "20/03/2000",
                  })}
                  {this.tableRowTypeOne({
                    title: "Retirement Year",
                    value: "1999",
                  })}
                  {this.tableRowTypeOne({
                    title: "Monthly Benefits",
                    value: "$ 25000/-",
                  })}
                  {this.tableRowTypeOne({
                    title: "Full Retirement Age",
                    value: "99",
                  })}
                  {this.tableRowTypeOne({
                    title: "Living Cost Adjustment",
                    value: "1.25",
                  })}
                  {this.tableRowTypeOne({
                    title: "Time Value of Money Interest Rate",
                    value: "3.00",
                  })}
                  {this.tableRowTypeOne({
                    title: "Time Until Full Retirement Age",
                    value: "-",
                  })}
                </div>
              </div>
            </Col>

            <Col span={12}>
              <div className="client-area">
                <div className="general-bar-social">
                  <p className="general-item-socail">Retirement Earnings</p>
                </div>
                <div className="table-container-social table-container-social1">
                  {this.tableRowTypeTwo({
                    title: "Birthdate",
                    value: "20/03/2000",
                  })}
                  {this.tableRowTypeTwo({
                    title: "Retirement Year",
                    value: "1999",
                  })}
                  {this.tableRowTypeTwo({
                    title: "Monthly Benefits",
                    value: "$ 25000/-",
                  })}
                  {this.tableRowTypeTwo({
                    title: "Full Retirement Age",
                    value: "99",
                  })}
                </div>
              </div>
            </Col>
          </Row>

          {/* Life Benefit */}
          <div className="lifetime-border-social">
            <Row>
              <Col span={24}>
                <div
                  style={{
                    marginBottom: "2%",
                  }}
                >
                  <p className="social-benefit-title">Lifetime Benefit</p>
                </div>
              </Col>
            </Row>
            <Row gutter={16}>
              {this.getAmntCard({ title: "At Age 62", amount: "1,234,567" })}
              {this.getAmntCard({
                title: "At Full Retirement Age",
                amount: "1,234,567",
              })}
              {this.getAmntCard({ title: "At Age 70", amount: "1,234,567" })}
            </Row>
            <Row>
              <Col span={24}>
                <div className="lifetime-value-border">
                  <p className="row-title-info-social-white">
                    These values consider a COLA of 1.25% per year. Click here
                    for information on COLA from the Social Security
                    Administration
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </div>

        {/* <HiddenHook /> */}
        {/* <LoadDBDataHook
          dbLoaded={this.state.dbLoaded}
          dbReload={this.state.dbReload}
          cbLoadDBData={this.loadDBData}
          cbUpdateNetworkStatus={this.updateNetworkStatus}
        /> */}
        {/* <div className="page-nav-history"></div>
        {this.props.user.role != ROLES.VIEW_ONLY && (
          <div className="top-btn-area">
            <Button type="primary" className="float-right" onClick={this.fnAdd}>
              Add
            </Button>
          </div>
        )}
        <PageTitle title="Social Security Report" />

        <Row justify="center">
          <div>
            <h5
              style={{ color: "black" }}
              className="text-center font-weight-bold"
            >
              Synopsis: Analysis of scenarios for optimum time for each person
              to take their benefits
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
                Client Name: Frank Jones
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
                Today's Date: 03/24/2021
              </h5>
            </div>
          </Col>
        </Row>

        <div>
          <div className="fragment-assitance-received">
            <PageTitle title={"Client Information - General"} level={4} />
          </div>

          <Row
            type="flex"
            justify="center"
            gutter={[20]}
            style={{ margin: "20px 0" }}
          >
            <Col span={10} style={{ paddingTop: "20px" }}>
              <InfoList
                column={1}
                //   title="Gross Income"
                data={[
                  {
                    label: "Client Birthdate",
                    value: "01/01/1995",
                  },
                  {
                    label: "Client Retirement Year",
                    value: "",
                  },
                  {
                    label: "Client Monthly Benefit",
                    value: "$2,500.00",
                  },
                  {
                    label: "Full Retirement Age",
                    value: "77",
                  },
                ]}
              />
            </Col>

            <Col span={10} style={{ paddingTop: "20px" }}>
              <InfoList
                column={1}
                //   title="Adjusted Gross Income"
                data={[
                  {
                    label: "Cost of Living Adjustment",
                    value: "1.25",
                  },
                  {
                    label: "Time Value of Money Interest Rate",
                    value: "3.00",
                  },
                  {
                    label: "Time Until Full Retirement Age",
                    value: "",
                  },
                ]}
              />
            </Col>
          </Row>
        </div>

        <div>
          <div className="fragment-assitance-received">
            <PageTitle
              title={"Client Information - Retirement Earnings"}
              level={4}
            />
          </div>

          <Row
            type="flex"
            justify="center"
            gutter={[20]}
            style={{ margin: "20px 0" }}
          >
            <Col span={10} style={{ paddingTop: "20px" }}>
              <InfoList
                column={1}
                data={[
                  {
                    label: "Enter date you would like to begin",
                    value: "",
                  },
                  {
                    label: "Your estimated earning",
                    value: "$0.00",
                  },
                ]}
              />
            </Col>

            <Col span={10} style={{ paddingTop: "20px" }}>
              <InfoList
                column={1}
                data={[
                  {
                    label: "Monthly decrease in benefit",
                    value: "$0.00",
                  },
                  {
                    label: "Monthly decrease in benefit",
                    value: "$0.00",
                  },
                ]}
              />
            </Col>
          </Row>
        </div>

        {this.getFinalResult()}

        <div>
          <div className="fragment-assitance-received">
            <PageTitle title={"Spouse Information - General"} level={4} />
          </div>

          <Row
            type="flex"
            justify="center"
            gutter={[20]}
            style={{ margin: "20px 0" }}
          >
            <Col span={10} style={{ paddingTop: "20px" }}>
              <InfoList
                column={1}
                //   title="Gross Income"
                data={[
                  {
                    label: "Spouse Birthdate",
                    value: "12/01/1960",
                  },
                  {
                    label: "Spouse Retirement Year",
                    value: "",
                  },
                  {
                    label: "Spouse Monthly Benefit",
                    value: "$1,600.00",
                  },
                  {
                    label: "Full Retirement Age",
                    value: "88",
                  },
                ]}
              />
            </Col>

            <Col span={10} style={{ paddingTop: "20px" }}>
              <InfoList
                column={1}
                data={[
                  {
                    label: "Monthly decrease in benefit",
                    value: "$0.00",
                  },
                  {
                    label: "Monthly decrease in benefit",
                    value: "$0.00",
                  },
                ]}
              />
            </Col>
          </Row>
        </div>

        <div>
          <div className="fragment-assitance-received">
            <PageTitle
              title={"Spouse Information - Retirement Ending"}
              level={4}
            />
          </div>

          <Row
            type="flex"
            justify="center"
            gutter={[20]}
            style={{ margin: "20px 0" }}
          >
            <Col span={10} style={{ paddingTop: "20px" }}>
              <InfoList
                column={1}
                data={[
                  {
                    label: "Enter date you would like to begin",
                    value: "",
                  },
                  {
                    label: "Your estimated earning",
                    value: "$0.00",
                  },
                ]}
              />
            </Col>

            <Col span={10} style={{ paddingTop: "20px" }}>
              <InfoList
                column={1}
                data={[
                  {
                    label: "Monthly decrease in benefit",
                    value: "$0.00",
                  },
                  {
                    label: "Monthly decrease in benefit",
                    value: "$0.00",
                  },
                ]}
              />
            </Col>
          </Row>
        </div> */}

        {/* {this.getFinalResult()} */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.rootReducer.loginUser.loginUserData

  };
};
export default connect(mapStateToProps, null)(SocialSecurityDashboard);
