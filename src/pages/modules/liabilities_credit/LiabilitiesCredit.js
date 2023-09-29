import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, Button, Row, Col } from "antd";
import ROLES from "constants/roles";
import moment from 'moment';
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  QL_LIABILITIES_CREDIT_LIST,
  QL_LIABILITIES_CREDIT_DELETE,
} from "../../../constants/queries";

import Report from "../../../components/Report";
import PageTitle from "components/layout/PageTitle";
import SubTitle from "components/layout/SubTitle";
import ReportInfoRow from "components/shared/ReportInfo";
import Synopsis from "components/layout/Synopsis/Synopsis";
import TableReport from "components/layout/TableReport";
import { HorizontalBar, Bar } from "react-chartjs-2";
import FETCH from "../../../utils/fetch";
import Loader from "../../../components/styled-components/loader/loader"
import { float2Currency } from "helpers/Utils";

var fnMutationLiabilitiesCreditDelete = null;
var dataMutationLiabilitiesCreditDelete = null;

function HiddenHook() {
  [
    fnMutationLiabilitiesCreditDelete,
    { dataMutationLiabilitiesCreditDelete },
  ] = useMutation(QL_LIABILITIES_CREDIT_DELETE);

  return <React.Fragment></React.Fragment>;
}

function LoadDBDataHook(props) {
  const { data, loading, error, refetch, networkStatus } = useQuery(
    QL_LIABILITIES_CREDIT_LIST,
    {
      notifyOnNetworkStatusChange: true,
    }
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

class LiabilitiesCredit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isOpenDelete: false,
      loading: false,
      reload: true,
      rows_overall: [
        {
          key: "1",
          title: "Credit Cards and Lines of Credit",
          active_accounts: "",
          current_payments: "",
          total_credit_available: "",
          current_debts: "",
        },
        {
          key: "2",
          title: "Loans",
          active_accounts: "",
          current_payments: "",
          total_credit_available: "",
          current_debts: "",
        },
        {
          key: "3",
          title: "Total",
          active_accounts: "",
          current_payments: "",
          total_credit_available: "",
          current_debts: "",
        },
      ],
      dbLoaded: false,
      dbLoading: false,
      rows_credit: [],
      rows_liabilities: [],
      dbReload: false,
      networkStatus: 0,
      liabilities_credit: [],
      credit_rows: [],
    };

    this.fnAdd = this.fnAdd.bind(this);
    this.fnEdit = this.fnEdit.bind(this);
    this.fnView = this.fnView.bind(this);
    this.loadDBData = this.loadDBData.bind(this);
    this.updateNetworkStatus = this.updateNetworkStatus.bind(this);
  }
  componentDidMount() {
    try {
      (async () => {
        this.setState({
          loading: true,
        });
        let datares = await FETCH.post({
          url: "client-module/list",
          id: `?module=Liabilities and Credit&page=1&limit=100`,
          body: {},
        });
        this.setState({
          loading: false,
        });
        console.log("Account Asset and libalities...", datares.records)
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
            // return {
            //   ...item,
            //   LiabilityName: item['Nickname of Liabilities'],
            //   InitialLoan: item['Initial Loan Amount'],
            //   MonthlyPayment: item['Monthly Payment'],
            //   MaturityDate: item['Maturity Date']
            // }
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
      this.setState({
        loading: false,
      });
    }


  }
  fnAdd() {
    this.props.history.push("/liabilities_credit_new");
  }

  fnEdit(record) {
    this.props.history.push("/liabilities_credit_edit/" + record.id);
  }

  fnView(record) {
    this.props.history.push("/liabilities_credit_view/" + record.id);
  }

  fnDelete(record) {
    window.localStorage.setItem("liabilities_credit_delete_id", record.id);
    this.setState({
      isOpenDelete: !this.state.isOpenDelete,
    });
  }

  confirmDelete = (e) => {
    let dbID = window.localStorage.getItem("liabilities_credit_delete_id");
    if (dbID != null && dbID != "") {
      fnMutationLiabilitiesCreditDelete({ variables: { id: dbID } });
      this.setState({
        // dbLoaded: true,
        dbReload: false,
        isOpenDelete: false,
      });

      var instance = this;

      setTimeout(function () {
        instance.setState({
          // dbLoaded: false,
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

  loadDBData(networkStatus, data) {
    console.log("loadDBData:", data);
    if (this.state.networkStatus == networkStatus) {
      return;
    }

    var liabilitiesAndCredits = data["liabilitiesAndCredits"];

    var credit_active_accounts = 0;
    var credit_current_payments = 0;
    var credit_total_credit_available = 0;
    var credit_current_debts = 0;

    var loan_active_accounts = 0;
    var loan_current_payments = 0;
    var loan_total_credit_available = 0;
    var loan_current_debts = 0;

    var total_active_accounts = 0;
    var total_current_payments = 0;
    var total_total_credit_available = 0;
    var total_current_debts = 0;

    var rows_credit = [];
    var rows_liabilities = [];
    for (var index = 0; index < liabilitiesAndCredits.length; index++) {
      switch (liabilitiesAndCredits[index]["liabilityType"]) {
        case "Credit - HELOC":
        case "Credit Card - Buxiness":
        case "Credit Card - Peresonal":
          credit_active_accounts++;
          var total_credit_available =
            liabilitiesAndCredits[index]["additionalCreditCardInformation"][
              "totalCreditAvailable"
            ] != null
              ? parseFloat(
                liabilitiesAndCredits[index][
                "additionalCreditCardInformation"
                ]["totalCreditAvailable"]
              )
              : 0;
          credit_total_credit_available += total_credit_available;

          var current_payments = 0;
          credit_current_payments += current_payments;

          var current_debts =
            liabilitiesAndCredits[index]["additionalCreditCardInformation"][
              "creditBalance"
            ] != null
              ? parseFloat(
                liabilitiesAndCredits[index][
                "additionalCreditCardInformation"
                ]["creditBalance"]
              )
              : 0;
          credit_current_debts += current_debts;

          rows_credit.push({
            key: index,
            id: data["liabilitiesAndCredits"][index]["id"],
            credit_description:
              data["liabilitiesAndCredits"][index]["liabilityType"],
            owner: data["liabilitiesAndCredits"][index]["owner"],
            bank: "",
            monthly_payment: float2Currency(
              data["liabilitiesAndCredits"][index]["monthlyPayment"]
            ),
            credit_balance: float2Currency(
              data["liabilitiesAndCredits"][index][
              "additionalCreditCardInformation"
              ]["creditBalance"]
            ),
            credit_limit: float2Currency(
              data["liabilitiesAndCredits"][index][
              "additionalCreditCardInformation"
              ]["creditLimit"]
            ),
          });

          break;
        default:
          loan_active_accounts++;

          var current_payments =
            liabilitiesAndCredits[index]["monthlyPayment"] != null
              ? parseFloat(liabilitiesAndCredits[index]["monthlyPayment"])
              : 0;
          loan_current_payments += current_payments;

          var total_credit_available = 0;
          loan_total_credit_available += total_credit_available;

          var loan_amount =
            liabilitiesAndCredits[index]["initialLoanAmount"] != null
              ? parseFloat(liabilitiesAndCredits[index]["initialLoanAmount"])
              : 0;
          var months = 1;
          var current_debts = loan_amount - current_payments * months;

          loan_current_debts += loan_current_debts;

          rows_liabilities.push({
            key: index,
            id: data["liabilitiesAndCredits"][index]["id"],
            owner: data["liabilitiesAndCredits"][index]["owner"],
            liability_name:
              data["liabilitiesAndCredits"][index]["nameOfLiability"],
            initial_loan_amount: float2Currency(
              data["liabilitiesAndCredits"][index]["initialLoanAmount"]
            ),
            credit_balance: float2Currency(
              data["liabilitiesAndCredits"][index][
              "additionalCreditCardInformation"
              ]["creditBalance"]
            ),
            monthly_payment: float2Currency(
              data["liabilitiesAndCredits"][index]["monthlyPayment"]
            ),
            interest_rate: float2Currency(
              data["liabilitiesAndCredits"][index]["interestRate"]
            ),
            maturity_date: data["liabilitiesAndCredits"][index]["maturityDate"],
            liability_type:
              data["liabilitiesAndCredits"][index]["liabilityType"],
          });

          break;
      }
    }

    total_active_accounts = credit_active_accounts + loan_active_accounts;
    total_current_payments = credit_current_payments + loan_current_payments;
    total_total_credit_available =
      credit_total_credit_available + loan_total_credit_available;
    total_current_debts = credit_current_debts + loan_current_debts;

    var rows_overall = this.state.rows_overall;
    rows_overall[0]["active_accounts"] = credit_active_accounts;
    rows_overall[0]["current_payments"] = float2Currency(
      credit_current_payments
    );
    rows_overall[0]["total_credit_available"] = float2Currency(
      credit_total_credit_available
    );
    rows_overall[0]["current_debts"] = float2Currency(credit_current_debts);

    rows_overall[1]["active_accounts"] = loan_active_accounts;
    rows_overall[1]["current_payments"] = float2Currency(loan_current_payments);
    rows_overall[1]["total_credit_available"] = float2Currency(
      loan_total_credit_available
    );
    rows_overall[1]["current_debts"] = float2Currency(loan_current_debts);

    rows_overall[2]["active_accounts"] = total_active_accounts;
    rows_overall[2]["current_payments"] = float2Currency(
      total_current_payments
    );
    rows_overall[2]["total_credit_available"] = float2Currency(
      total_total_credit_available
    );
    rows_overall[2]["current_debts"] = float2Currency(total_current_debts);

    var instance = this;
    setTimeout(function () {
      instance.setState({
        rows_overall: rows_overall,
        rows_credit: rows_credit,
        rows_liabilities: rows_liabilities,
        dbLoading: false,
        dbLoaded: true,
        dbReload: false,
      });
    }, 500);
  }

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
  render() {
    console.log("this.state.credit-rows", this.state.credit_rows)
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
        // {
        //     title: 'Add',
        //     fnClick: this.fnAdd
        // }
      ];
    }

    const report_cols_credit = [
      {
        title: "Name of Liability",
        dataIndex: "Nickname of Liabilities",
        key: "Nickname of Liabilities",
        render: (record) => (record ? record : "N/A"),

      },
      {
        title: "Owner",
        dataIndex: "Owner",
        key: "Owner",
        render: (record) => (record ? record : "N/A"),

      },
      {
        title: "Financial Institute",
        dataIndex: "Name of Financial Institution",
        key: "Name of Financial Institution",
        render: (record) => (record ? record : "N/A"),

      },
      {
        title: "Monthly Payment",
        dataIndex: "Monthly Payment",
        key: "Monthly Payment",
        render: (record) => (record ? record : "N/A"),

      },
      {
        title: "Interest Rate",
        dataIndex: "Interest Rate",
        key: "Interest Rate",
        render: (record) => (record ? record : "N/A"),

      },
      {
        title: "Maturity Date",
        dataIndex: "Maturity Date",
        key: "Maturity Date",
        render: (record) => (record ? moment(record).format('DD-MM-YYYY') : "N/A"),

      },
      {
        title: "Loan Balance",
        dataIndex: "Initial Loan Amount",
        key: "Initial Loan Amount",
        render: (record) => (record ? record : "N/A"),

      },
      {/*
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
    */}
    ];

    const report_cols_liabilities = [
      {
        title: "Name of Credit ",
        dataIndex: "Nickname of Credit",
        key: "Nickname of Credit",
        render: (record) => (record ? record : "N/A"),

      },
      {
        title: "Owner ",
        dataIndex: "Owner",
        key: "Owner",
        render: (record) => (record ? record : "N/A"),

      },

      // {
      //   title: "Initial Loan Amount",
      //   dataIndex: "Initial Loan Amount",
      //   key: "Initial Loan Amount",
      // },
      {
        title: "Bank",
        dataIndex: "Bank",
        key: "Bank",
        render: (record) => (record ? record : "N/A"),

      },
      {
        title: "Credit Limit",
        dataIndex: "Credit Limit",
        key: "Credit Limit",
        render: (record) => (record ? record : "N/A"),

      },
      {
        title: "Monthly Payment",
        dataIndex: "Monthly Payment",
        key: "Monthly Payment",
        render: (record) => (record ? record : "N/A"),

      },
      {
        title: "Interest Rate(or APR%)",
        dataIndex: "Interest Rate (or APR%)",
        key: "Interest Rate (or APR%)",
        render: (record) => (record ? record : "N/A"),

      },
      {
        title: "Credit Balance",
        dataIndex: "Credit Balance",
        key: "Credit Balance",
        render: (record) => (record ? record : "N/A"),

      },
      // {
      //   title: "Maturity Date",
      //   dataIndex: "Maturity Date",
      //   key: "Maturity Date",
      // },
      // {
      //   title: "Liability Type",
      //   dataIndex: "subType",
      //   key: "subType",
      // },
      {/*
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
    */}
    ];

    const barData2 = {
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

    const cols_overall = [
      {
        title: "",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Active Accounts",
        dataIndex: "active_accounts",
        key: "active_accounts",
      },
      {
        title: "Current Payments",
        dataIndex: "current_payments",
        key: "current_payments",
      },
      {
        title: "Total Credit Available",
        dataIndex: "total_credit_available",
        key: "total_credit_available",
      },
      {
        title: "Current Debts",
        dataIndex: "current_debts",
        key: "current_debts",
      },
    ];

    const barData = {
      labels: ["John's House", "Asset to sell"],
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: [65, 59, 80],
        },
      ],
    };

    return (
      <React.Fragment>
        <HiddenHook />
        {
          // !this.state.dbReload &&
          <LoadDBDataHook
            dbLoaded={this.state.dbLoaded}
            dbReload={this.state.dbReload}
            cbLoadDBData={this.loadDBData}
            cbUpdateNetworkStatus={this.updateNetworkStatus}
          />
        }
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
            <Button type="primary"  style={{
              background: "#39b54a",
              // borderRadius: "16px",
              color: "white",
              // padding: "5px",
              width: "auto",
              border: "none",
              marginRight:"1rem",
              fontSize:"16px",
            }} className="float-right" onClick={this.fnAdd}>
              Add
            </Button>
          </div>
        )}
        <PageTitle title="Liabilities and Credit Report" />

        <Row justify="center">
          <div>
            <h5
              style={{ color: "black" }}
              className="text-center font-weight-bold"
            >
              Synopsis: Anything with a current debt or potential debt using
              bank credit line or credit card caps
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

        <PageTitle title="Credit Line Information" level={4} />
        {this.state.dbLoading && <p>Loading...</p>}
        {!this.state.dbLoading && (
          <Row
            type="flex"
            justify="center"
            style={{
              margin: "12px 0 40px",
              padding: "16px",
              border: "1px solid #ddd",
              backgroundColor: "rgba(237, 237, 237, 0.40)",
            }}
          >
            {/* <Bar
              data={barData2}
              //   options={{
              //     maintainAspectRatio: false,
              //   }}
            /> */}
            <Bar
              data={{
                labels: ["1", "2", "3", "4", "5", "6"],
                datasets: [
                  {
                    label: "# of Blue Votes",
                    data: [2, 3, 20, 5, 1, 4],
                    backgroundColor: "rgb(54, 162, 235)",
                  },
                  {
                    label: "# of Green Votes",
                    data: [3, 10, 13, 15, 22, 30],
                    backgroundColor: "rgb(75, 192, 192)",
                  },
                ],
              }}
              options={{
                scales: {
                  yAxes: [
                    {
                      stacked: true,
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                  xAxes: [
                    {
                      stacked: true,
                    },
                  ],
                },
              }}
            ></Bar>
          </Row>
        )}

        <Row
          type="flex"
          gutter={[20, 0]}
          style={{ margin: "30px 0 40px" }}
          justify="center"
        >
          <Col span={20}>
            {this.state.dbLoading && <p>Loading...</p>}
            {!this.state.dbLoading && (
              <TableReport rows={this.state.rows_overall} cols={cols_overall} />
            )}
          </Col>
        </Row>
        <PageTitle title="Debt Information" level={4} />
        {this.state.dbLoading && <p>Loading...</p>}
        {!this.state.dbLoading && (
          <Row
            type="flex"
            justify="center"
            style={{
              margin: "12px 0 40px",
              padding: "16px",
              border: "1px solid #ddd",
              backgroundColor: "rgba(237, 237, 237, 0.40)",
            }}
          >
            <HorizontalBar
              data={barData}
              options={{
                maintainAspectRatio: false,
              }}
            />
          </Row>
        )}
        <div className="fragment-assitance-received">
          <PageTitle title={"Loans (Not Credit Cards)"} level={4} />
          {/* <SubTitle
            subTitle={
              "Final Expense, Guaranteed Issue, Automobile, Long Term Care, Long Term Disability, Term, Umbrella, Homeowners, Fire, Flood, Earthquake"
            }
          /> */}
          <Report
            loading={this.state.dbLoading}
            cols={report_cols_credit}
            // rows={this.state.credit_rows}
            rows={this.state.liabilities_credit}

          ></Report>
          <PageTitle title={"Credit Line (Bank or Credit Cards)"} level={4} />
          <Report
            loading={this.state.dbLoading}
            cols={report_cols_liabilities}
            // rows={this.state.liabilities_credit}
            rows={this.state.credit_rows}

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
        <Loader isLoading={this.state.loading}></Loader>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.rootReducer.loginUser.loginUserData

  };
};
export default connect(mapStateToProps, null)(LiabilitiesCredit);
