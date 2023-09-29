// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { Modal, Button, Row, Col } from 'antd';
// import Plaid from './Plaid';
// import { BlockLink } from 'components/Animations';

// class Budget extends Component {

//     constructor(props) {
//         super(props);

//         this.state = {

//         }

//     }

//     componentDidMount() {

//     }

//     render() {
//         const navlinks = [
//             {
//                 href: '/',
//                 title: 'Home'
//             },
//             {
//                 href: '/modules',
//                 title: 'Modules'
//             }
//         ]
//         return (
//             <React.Fragment>
//                 {/* <Plaid />            */}
//                 <div className="page-nav-history">
//                     {/* {
//                         navlinks.map((navlink, index) => {
//                             return (
//                                 <span key={index}>
//                                     <Link key={index} to={navlink.href} className="page-nav-link">
//                                         {navlink.title}
//                                     </Link>
//                                     {index != (navlinks.length - 1) ? "/" : null}
//                                 </span>

//                             )
//                         })
//                     } */}
//                 </div>
//                 <div className="module-blocks">
//                     <BlockLink className="module-block-link" link="/budget_account_add" title="Add Account" />
//                     <BlockLink className="module-block-link" link="/budget_account_list" title="Accounts Page" />
//                 </div>
//             </React.Fragment>
//         )
//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         user: state.login.loginData
//     }
// }
// export default connect(mapStateToProps, null)(Budget);
// // /budget/create

import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, Button, Row, Col } from "antd";
import ROLES from "constants/roles";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { QL_INCOME_LIST, QL_INCOME_DELETE } from "../../../constants/queries";

import Report from "../../../components/Report";
// import IncomeModal from './IncomeModal';

import PageTitle from "components/layout/PageTitle";
import HighlightedReportBlock from "components/layout/HighlightedReportBlock";
import TableReport from "components/layout/TableReport";
import InfoList from "components/InfoList";

import { Bar, HorizontalBar } from "react-chartjs-2";
import highlightedIcon from "assets/images/contributions.png";
import Income_Tax2 from "assets/images/latest/Income-Tax2.png";

import { float2Currency } from "helpers/Utils";
import "./budget.css";

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

const datanew = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

// const optionsnew = {
//   indexAxis: "y",
//   // Elements options apply to all of the options unless overridden in a dataset
//   // In this case, we are setting the border of each horizontal bar to be 2px wide
//   elements: {
//     bar: {
//       borderWidth: 2,
//     },
//   },
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "right",
//     },
//     title: {
//       display: true,
//       text: "Chart.js Horizontal Bar Chart",
//     },
//   },
// };

class Budget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      isOpenDelete: false,
      reload: true,

      overall_income: [
        {
          label: "Expenses",
          value: "$5,340",
        },
        {
          label: "Goals/Savings",
          value: "$257",
        },
        {
          label: "Monthly Budget Total",
          value: "$5,597",
        },
      ],
      overall_adj_income: [
        {
          label: "All Income",
          value: "$23,152",
        },
        {
          label: "All Budget",
          value: "$5,597",
        },
        {
          label: "Savings Potential",
          value: "$17,555",
        },
      ],
      dbLoaded: false,
      dbLoading: true,
      report_rows: [
        {
          expense_budget: "title-Charity",
        },
        {
          expense_budget: "aaa",
          assigned_to: "Tracy Jones",
          year: "$53,111",
        },
        {
          expense_budget: "bbb",
          assigned_to: "Joint",
          year: "$532,111",
        },
        {
          expense_budget: "title-Child and Family Care",
        },
        {
          expense_budget: "aaa",
          assigned_to: "Tracy Jones",
          year: "$53,111",
        },
        {
          expense_budget: "bbb",
          assigned_to: "Joint",
          year: "$532,111",
        },
      ],
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
    this.props.history.push("/budget/create");
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

    const report_columns = [
      {
        title: "Expense/Budget",
        dataIndex: "expense_budget",
        key: "expense_budget",
        render: (text) => {
          let data = text.split("-");
          if (data.length > 1)
            return <h5 style={{ color: "red" }}>{data[1]}</h5>;
          else return text;
        },
      },
      {
        title: "Assigned To",
        dataIndex: "assigned_to",
        key: "assigned_to",
      },
      {
        title: "2021",
        dataIndex: "year",
        key: "year",
      },
    ];

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
        title: "Annual Amount",
        dataIndex: "est_amt_remaining_first_year",
        key: "est_amt_remaining_first_year",
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

    const barData = {
      labels: [
        "Transportation",
        "Pets",
        "Insurance",
        "Goal",
        "Debt Payments",
        "Charity",
      ],
      datasets: [
        {
          label: "",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: [20000, 50000, 100000, 150000, 0, 50000],
        },
      ],
    };

    return (
      <React.Fragment>
        {/* <HiddenHook />
                <LoadDBDataHook 
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
        {this.props.user.role != ROLES.VIEW_ONLY && (
          <React.Fragment>
            <div style={{ marginBottom: "40px" }}>
              <div style={{ display: "flex", float: "right" }}>
                <div style={{ marginRight: "30px" }}>
                  <Button type="primary">Import SpreadSheet</Button>
                </div>
                <div>
                  <Button type="primary" onClick={this.fnAdd}>
                    Add
                  </Button>
                </div>
              </div>
            </div>
            {/* <div className="top-btn-area">
              <Button
                type="primary"
                // className="float-right"
                onClick={this.fnAdd}
              >
                Add
              </Button>
              <div style={{marginRight: "20px"}}></div>
              <Button
                type="primary"
                // className="float-right"
                onClick={this.fnAdd}
              >
                Add
              </Button>
            </div> */}
          </React.Fragment>
        )}
        <PageTitle title="Budget Report" />

        <Row justify="center">
          <Col className="asset-title" span={24}>
            <div>
              <h4
                style={{ color: "black" }}
                className="text-center font-weight-bold"
              >
                Sypnosis: All Expenses and Goal Savings
              </h4>
            </div>
          </Col>
        </Row>

        <Row justify="center">
          <Col className="asset-title" span={12}>
            <div>
              <h5
                style={{ color: "black" }}
                className="text-center font-weight"
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
                className="text-center font-weight"
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

        <Row justify="center">
          {/* <Col span={24}>
            <div className="asset-title">
              <img src={Income_Tax2} height="50px" width="50px" />
            </div>
          </Col> */}
        </Row>

        <Row type="flex" gutter={[20, 0]} style={{ margin: "20px 0" }}>
          <Col span={7} style={{ paddingTop: "20px" }}>
            <InfoList
              column={1}
              title="Monthly Budget Total"
              data={this.state.overall_income}
            />
          </Col>
          <Col span={10}>
            <HighlightedReportBlock
              title="Monthly Budget Total"
              value={this.state.overall_income[2]["value"]}
            >
              <img src={highlightedIcon} alt="" style={{ height: "100px" }} />
            </HighlightedReportBlock>
          </Col>
          <Col span={7} style={{ paddingTop: "20px" }}>
            <InfoList
              column={1}
              title="Savings Potential"
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
          {/* <Bar
            data={barData}
            // data={datanew}
            height={300}
            options={{
              maintainAspectRatio: false,
            }}
            // options={optionsnew}
          /> */}
          <HorizontalBar data={barData}></HorizontalBar>
        </Row>
        <div className="fragment-assitance-received">
          <PageTitle title={"All Monthly Budget Items"} level={4} />
          <Report
            loading={false}
            cols={report_columns}
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
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.rootReducer.loginUser.loginUserData

  };
};
export default connect(mapStateToProps, null)(Budget);
