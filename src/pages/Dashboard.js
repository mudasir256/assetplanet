import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Progress, Menu, Dropdown, Icon, Select } from "antd";

import { getLoggedInUser } from "../helpers/authUtils";
// import Income_Tax2 from "../assets/images/latest/Income-Tax2.png";
import logo from "../assets/images/asset-planet-background1.jpeg";
import Asset from "../assets/images/latest/Asset.png";
import Contributions from "../assets/images/latest/Contributions.png";
import contributionsIncome from "../assets/images/Contributions-income.png";
// import Distributions from "../assets/images/latest/Distributions.png";
import Budget from "../assets/images/latest/Budget.png";
import Savings from "../assets/images/latest/Savings.png";
import Debt from "../assets/images/latest/Debt.png";
import Networth3 from "../assets/images/latest/Networth3.png";
import Stock from "../assets/images/latest/Stock.png";
import realworld from "../assets/images/latest/Real-World.png";
import bell from "../assets/images/latest/bell.png";
import del from "../assets/images/latest/del.png";
// import refresh from "../assets/images/refresh.png";
import { Doughnut, Bar } from "react-chartjs-2";
import networth_without_house from "../assets/images/latest/networth_without_house.png";

import "./dashboard.css";
import ViewUpdateModal from "../components/dashboard/modals/view-update-modal/view-update-modal";
const { Option } = Select;

const menu = (
  <Menu>
    <Menu.Item>
      <a>Steve and Sally Smith</a>
    </Menu.Item>
    <Menu.Item>
      <a>Lisa and Anthony May</a>
    </Menu.Item>
    <Menu.Item>
      <a>Bill and Peggy Thompson</a>
    </Menu.Item>
  </Menu>
);

const plans = (
  <Menu>
    <Menu.Item>
      <a>Retire Here</a>
    </Menu.Item>
    <Menu.Item>
      <a>With Grandkids</a>
    </Menu.Item>
    <Menu.Item>
      <a>Living in Florida</a>
    </Menu.Item>
  </Menu>
);

const notifications = [
  "Franks Term Insurance Policy is Nearing Policy End Date has been updated.",
  "Update Inflation Projection",
  "Franks Rental House Generates Income",
  "Franks Rental House has a Loan",
  "There is a New Client being shared with you",
];
const updates = [
  "Franks Term Insurance Policy is Nearing Policy End Date.",
  "Update Inflation Projection",
  "Franks Rental House Generates Income",
  "Franks Rental House has a Loan",
  "There is a New Client being shared with you",
];

const data = {
  labels: [
    "Getting Married",
    "Hosting Party",
    "Moving to Texas",
    "Plastic Surgery",
    "Sending Junior to College",
    "Preparing for Grandson",
  ],
  datasets: [
    {
      label: "$",
      data: [58, 7, 22, 78, 78, 78],
      backgroundColor: [
        "rgba(255, 99, 132, 0.8)",
        "rgba(54, 162, 235, 0.8)",
        "rgba(255, 206, 86, 0.8)",
        "rgba(75, 192, 192, 0.8)",
        "rgba(153, 102, 255, 0.8)",
        "rgba(255, 159, 64, 0.8)",
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

const vertical = {
  labels: [
    "Getting Married",
    "Starting Business",
    "John's College",
    "Buying Vacation Home",
    "Retirement",
  ],
  datasets: [
    {
      label: "",
      data: [12036, 18500, 97500, 149500, 120000],
      backgroundColor: [
        "rgb(37, 122, 61)",
        "rgba(80, 236, 144)",
        "rgb(37, 122, 61)",
        "rgba(80, 236, 144)",
        "rgb(37, 122, 61)",
      ],
      borderColor: [
        "rgb(37, 122, 61)",
        "rgba(80, 236, 144)",
        "rgb(37, 122, 61)",
        "rgba(80, 236, 144)",
        "rgb(37, 122, 61)",
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  legend: {
    display: false,
  },
  scales: {
    yAxes: [
      {
        scaleLabel: {
          fontColor: "red",
          fontSize: 15,
          display: true,
          // labelString: "$",
        },
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const dataStacked = {
  labels: ["All Income Split by Expenses and Savings"],
  datasets: [
    {
      label: "Expenses",
      data: [12975],
      backgroundColor: "rgba(80, 236, 144)",
    },
    {
      label: "Savings",
      data: [1295],
      backgroundColor: "rgb(251, 226, 0)",
    },
  ],
};

const optionsStacked = {
  scales: {
    yAxes: [
      {
        scaleLabel: {
          fontColor: "red",
          fontSize: 15,
          display: true,
          // labelString: "$",
        },
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
};

class DefaultDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollClass: false,
      statsVisible: "expanded",
      budgetRowVisible: "expanded",
      notificationRowVisible: "expanded",
      observationRowVisible: "expanded",
      liquidityRowVisible: "expanded",
      savingsRowVisible: "expanded",
      cardsRowVisible: "expanded",
      accessableUsers: [],
      showViewUpdateModal: false,
      results: [
        {
          image: Asset,
          title: "Assets",
          price: "3,364,832",
        },
        {
          image: Contributions,
          title: "Income",
          price: "282,832",
        },
        {
          image: Savings,
          title: "Monthly Savings",
          price: "837,367",
        },
        {
          image: Budget,
          title: "Budget Expenses",
          price: "7,367",
        },
        {
          image: Debt,
          title: "Debt Lt",
          price: "4,537,367",
        },
        {
          image: Networth3,
          title: "Net Worth",
          price: "837,367",
        },
      ],

      liquidity: [
        {
          title: "Taxable",
          data: [
            { title: "Taxes", price: 12431 },
            { title: "Net Liquidity", price: 412431 },
          ],
        },

        {
          title: "Tax Deferred",
          data: [
            { title: "Taxes", price: 12431 },
            { title: "Net Liquidity", price: 412431 },
            { title: "Penalties", price: 412431 },
          ],
        },

        {
          title: "Total Liquidity",
          data: [
            { title: "Taxes", price: 12431 },
            { title: "Net Liquidity", price: 412431 },
            { title: "Penalties", price: 412431 },
          ],
        },
      ],

      goals: [
        {
          title: "1",
          percent: 58,
          need: 34780,
          have: 20144,
          color: "rgb(37, 122, 61)",
        },
        {
          title: "2",
          percent: 7,
          need: 34780,
          have: 20144,
          color: "rgba(80, 236, 144)",
        },
        {
          title: "3",
          percent: 22,
          need: 34780,
          have: 20144,
          color: "rgb(37, 122, 61)",
        },
        {
          title: "4",
          percent: 78,
          need: 34780,
          have: 20144,
          color: "rgba(80, 236, 144)",
        },
        {
          title: "5",
          percent: 78,
          need: 34780,
          have: 20144,
          color: "rgb(37, 122, 61)",
        },
        {
          title: "6",
          percent: 78,
          need: 34780,
          have: 20144,
          color: "rgba(80, 236, 144)",
        },
      ],
      user: getLoggedInUser(),
    };
  }

  componentDidMount() {
    // window.addEventListener("scroll", () => {
    //   if (window.scrollY > 300) this.setState({ scrollClass: true });
    //   else this.setState({ scrollClass: false });
    // });
    // const users = JSON.parse(localStorage.getItem("delegateUsers"))
    // console.log("users", users)
    // this.setState({ accessableUsers: users });
  }

  closeModal = () => {
    this.setState({ showViewUpdateModal: false });
  };

  getBlock = (item = null) => {
    return (
      <Col span={4} style={{ padding: "3px" }}>
        {item.title === "Net Worth" || item.title === "Budget Expenses" ? (
          <>
            <div className="flip-box">
              <div className=" flip-box-inner dashboard-block-main">
                <div className="  flow">
                  <div className="flip-box-front mt-1">
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img src={item.image} height="50px" width="50px" />
                    </div>
                    <h5 className="text-center  font-weight mb-1">
                      {item.title}{" "}
                      {item.title === "Budget Expenses" ? "(Monthly)" : ""}
                    </h5>
                    <h5 className="text-center  font-weight-bold mb-1">
                      ${item.price}
                    </h5>
                  </div>

                  <div className="flip-box-back">
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src={
                          item.title === "Budget Expenses"
                            ? item.image
                            : networth_without_house
                        }
                        height="50px"
                        width="50px"
                      />
                    </div>
                    <h5 className="text-center">
                      {item.title === "Budget Expenses"
                        ? "Budget Expenses (Annual)"
                        : "Net Worth (without Principal Residence)"}
                    </h5>
                    {item.title === "Budget Expenses" ? (
                      <h5 className="text-center  font-weight-bold mb-2">
                        ${item.price}
                      </h5>
                    ) : null}
                  </div>

                  {/* <span className="flip-box-back">
                    <img src={item.image} height="50px" width="50px" />
                    <h5>Being Net Worth without Principal Residence.</h5>
                  </span> */}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="dashboard-block-main">
            <div className="flow">
              <div className="mt-1">
                <img src={item.image} height="50px" width="50px" />
              </div>
              <h5 className="text-center font-weight mb-1">{item.title}</h5>
              <h5 className="text-center font-weight-bold mb-1">
                ${item.price}
              </h5>
            </div>
          </div>
        )}
      </Col>
    );
  };

  progressBar = (items = null) => {
    return (
      <React.Fragment>
        <div className="progress" style={{ height: "20px" }}>
          {items.map((item, index) => {
            return (
              <div
                className={`progress-bar bg-${index === 0 ? "info" : index === 1 ? "success" : "danger"
                  } progress-bar`}
                role="progressbar"
                aria-valuenow={100 / items.length}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: `${100 / items.length}%`, height: "20px" }}
              >
                {/* {item.title}: ${item.price} */}
              </div>
            );
          })}
        </div>
        <Row className="progress-title ml-3">
          {items.map((item, index) => {
            return (
              <Col span={6}>
                <Row className="progress-title">
                  <Col>
                    <div
                      className={`progress-box mr-2  bg-${index === 0
                        ? "info"
                        : index === 1
                          ? "success"
                          : "danger"
                        } `}
                    ></div>
                  </Col>
                  <Col>
                    <h6 className="text-center mt-1 ">
                      {item.title}: ${item.price}
                    </h6>
                  </Col>
                </Row>
              </Col>
            );
          })}
        </Row>
      </React.Fragment>
    );
  };

  budgetBlock = () => {
    return (
      <div
        className="dashboard-budget-block-new"
        style={{ background: "white" }}
      >
        {/* <u>
          <h5
            style={{ color: "green" }}
            className="text-center font-weight-bold"
          >
            SAVINGS AND GOALS
          </h5>
        </u> */}
        <Row className="budget-col-chart">
          <Col xs={24} sm={12} lg={12} xl={12}>
            <div className="budget-col">
              <Bar data={dataStacked} options={optionsStacked} />
              {/* <div>
                <h5 style={{ color: "black" }} className="text-center  mt-2">
                  Currently Monthly Saving Capacity
                </h5>
              </div> */}
            </div>
          </Col>
          <Col xs={24} sm={12} lg={12} xl={12}>
            <div className="budget-col">
              <Bar data={vertical} options={options} />
              {/* <div>
                <h5 style={{ color: "black" }} className="text-center  mt-2">
                  Current Monthly Saved For Goal
                </h5>
              </div> */}
            </div>
          </Col>
        </Row>
      </div>
    );
  };

  getSecBlock = (item = null, index = 0) => {
    return (
      <Col className="dashboard-block-again-goals" span={6}>
        <div className="flow">
          <h5
            className="text-center font-weight-bold mb-1 mt-1"
            style={{ color: `${item.color}` }}
          >
            Goal {index + 1}
          </h5>
          <h5
            className="text-center font-weight-bold mb-1 mt-1"
            style={{ color: `${item.color}` }}
          >
            {item.title}
          </h5>

          <div className="mt-1">
            <Progress
              type="circle"
              percent={item.percent}
              width={60}
              strokeColor={item.color}
              strokeWidth={10}
            />
          </div>

          <h5
            className="text-center font-weight mb-1 mt-1"
            style={{ color: `${item.color}` }}
          >
            Need: $23,232
          </h5>
          <h5
            className="text-center font-weight mb-1"
            style={{ color: `${item.color}` }}
          >
            Have: $999,232
          </h5>
        </div>
      </Col>
    );
  };

  observationRow = (index, msg) => {
    return (
      <div className="flow-observation-row ml-1">
        <div className="mr-1">
          <img
            src={bell}
            height="13px"
            width="13px"
            style={{ marginBottom: "5px" }}
          />
        </div>
        <div className="mr-1">
          <img
            src={del}
            height="13px"
            width="13px"
            style={{ marginBottom: "5px" }}
          />
        </div>
        <h6
          className="text-center font-weight-bold mr-1"
          style={{ color: "green" }}
        >
          {index}.
        </h6>
        <h6
          className="text-center font-weight-bold mr-1"
          style={{
            color: "blue",
          }}
        >
          {msg}
        </h6>
      </div>
    );
  };

  notificationRow = (index, msg) => {
    return (
      <Row className="notification-item-row">
        <Col className="mr-1">
          <img
            src={bell}
            height="13px"
            width="13px"
            style={{ marginBottom: "10px" }}
          />
        </Col>
        <Col className="mr-1">
          <img
            src={del}
            height="13px"
            width="13px"
            style={{ marginBottom: "10px" }}
          />
        </Col>
        <Col className="mr-2">
          <div>
            <h6 style={{ color: "green" }}>{index}</h6>
          </div>
        </Col>
        {/* <Col span={3}>
          <Row className="ntrrow">
            <Col>
              <img
                src={bell}
                height="13px"
                width="13px"
                style={{ marginBottom: "10px" }}
              />
            </Col>
            <Col>
              <img
                src={del}
                height="13px"
                width="13px"
                style={{ marginBottom: "10px" }}
              />
            </Col>
            <Col>
              <h6
                className="text-center mr-1"
                style={{ color: "green", marginBottom: "10px" }}
              >
                {index}.
              </h6>
            </Col>
          </Row>
        </Col> */}
        <Col>
          <div>
            <h6
              className="mr-1"
              style={{
                color: "blue",
              }}
            >
              {msg}
            </h6>
          </div>
        </Col>
      </Row>
    );
    // return (
    //   <Row className="ntrrow">
    //     <Col span={1}>
    //       <img
    //         src={bell}
    //         height="13px"
    //         width="13px"
    //         style={{ marginBottom: "10px" }}
    //       />
    //     </Col>
    //     <Col span={1}>
    //       <img
    //         src={del}
    //         height="13px"
    //         width="13px"
    //         style={{ marginBottom: "10px" }}
    //       />
    //     </Col>
    //     <Col span={1}>
    //       <h6 className="text-center mr-1" style={{ color: "green" }}>
    //         {index}.
    //       </h6>
    //     </Col>
    //     <Col span={20}>
    //       <h6
    //         className="text-center mr-1"
    //         style={{
    //           color: "blue",
    //         }}
    //       >
    //         {msg}
    //       </h6>
    //     </Col>
    //   </Row>
    // );
    // return (
    //   <div className="flow-observation-row ml-1">
    //     <div className="mr-1">
    //       <img src={bell} height="13px" width="13px" />
    //     </div>
    //     <div className="mr-1">
    //       <img src={del} height="13px" width="13px" />
    //     </div>
    //     <h6 className="text-center mr-1" style={{ color: "green" }}>
    //       {index}.
    //     </h6>
    //     <h6
    //       className="text-center mr-1"
    //       style={{
    //         color: "blue",
    //       }}
    //     >
    //       {msg}
    //     </h6>
    //   </div>
    // );
  };

  observationBlock = () => {
    return (
      <Col className="dashboard-observation-block-updated" span={6}>
        <div className="flow">
          <br></br>
          <u>
            <h5
              className="text-center font-weight-bold"
              style={{ color: "green" }}
            >
              OBSERVATIONS
            </h5>
          </u>
        </div>
        <div className="flow-observation mt-2">
          {this.observationRow(
            1,
            "Based on your Net Worth, consider an Umbrella Insurance Policy. You have $34,343 in networth with $0 Umbrella policy."
          )}
          {this.observationRow(
            2,
            "Based on the loan rate on Frank and Tracy Rental, consider refinance. Your loan is $0 at 4.000% Current rates are 3.50%. Consider a refinance."
          )}
          {this.observationRow(
            3,
            "There is no Power of Attorney listed in your plan. Consult with an attorney to determine strategy to create a Power of Attorney."
          )}
          {this.observationRow(
            4,
            "There is no Will listed in your plan. Consult with an attorney to determine strategy to create a Will."
          )}
          {this.observationRow(
            5,
            "There is no Advance Healthcare Directive listed in your plan. Consult with an attorney to determine strategy to create an Advance Healthcare Directive."
          )}
          {this.observationRow(
            6,
            "There is no Life Insurance listed in your plan. Consult with an insurance or financial professional to determine what is best for your needs."
          )}
        </div>
        <div className="mb-2"></div>
      </Col>
    );
  };

  notificationBar = (title = "", data = []) => {
    return (
      <Col style={{ padding: "5px" }} span={12}>
        <div className="dashboard-observation-block-notification">
          <div className="flow">
            <h5
              className="text-center font-weight mb-1 mt-1"
              style={{ color: "red" }}
            >
              {title}
            </h5>
          </div>
          {data.map((text, index) => {
            return (
              <div className="flow-observation mt-1 ml-1 mb-1" key={index}>
                {this.notificationRow(index + 1, text)}
              </div>
            );
          })}
          <div className="flow-observation mt-1 ml-1 mb-1">
            {this.notificationRow(
              1,
              "Frank's Term Insurance Policy is Nearing Policy End Date."
            )}
          </div>
        </div>
      </Col>
    );
  };

  budgetProgressBar = () => {
    return (
      <div className="dashboard-budget-block" style={{ background: "white" }}>
        <div className="mt-2">
          <Row>
            <Col span={24}>
              <u>
                <h5
                  style={{ color: "green" }}
                  className="text-center font-weight-bold"
                >
                  LIQUIDITY
                </h5>
              </u>
            </Col>
          </Row>
        </div>
        <Row>
          <Col className="budget-col-progress-bar mt-1" span={4}>
            {this.state.liquidity.map((item) => {
              return <div> {item.title}</div>;
            })}
          </Col>
          <Col className="budget-col-progress" span={18}>
            {this.state.liquidity.map((item) => {
              return <div> {this.progressBar(item.data)}</div>;
            })}
          </Col>
        </Row>
      </div>
    );
  };

  mainTop = () => {
    return (
      <Col className="budget-top" span={24}>
        {/* <div>
          <h2
            style={{ color: "green" }}
            className="text-center font-weight-bold"
          >
            DASHBOARD REPORT
          </h2>
        </div> */}
        <div>
          {/* <Dropdown overlay={menu} placement="bottomCenter"> */}
          <h5
            style={{ color: "black", paddingRight: "200px" }}
            className="dropdown-text font-weight-bold"
          >
            Frank Jones and Tracy Jones
            {/* <a className="ant-dropdown-link">
                <Icon type="down" />
              </a> */}
          </h5>
          {/* </Dropdown> */}
        </div>
        <div>
          {/* <Dropdown overlay={plans} placement="bottomCenter"> */}
          <h6
            style={{ color: "black", paddingRight: "200px" }}
            className="notification-text"
          >
            First Plan
            {/* <a className="ant-dropdown-link">
                <Icon type="down" />
              </a> */}
          </h6>
          {/* </Dropdown> */}
        </div>
      </Col>
    );
  };

  // My Function

  statsCard = ({ cardName = "", price = 0, image = "" }) => {
    return (
      <Col xs={12} sm={8} lg={8} xl={6} style={{ display: "flex" }}>
        <div className="card-block">
          <Row style={{ height: "100%", marginBottom: "20%" }} gutter={[0, 10]}>
            <Col
              span={24}
              style={{
                display: "flex",
                height: "65%",
              }}
            >
              <div className="item1">
                <span class="left">{cardName}</span>
              </div>
              <div className="item2">
                <img src={image} height="95%" width="95%" />
              </div>
            </Col>
            <Col span={24} style={{ display: "flex", height: "30%" }}>
              <div className="item3">
                <span className="left">$</span>
              </div>
              <div className="item4">
                <span className="right">{price}</span>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
    );
  };

  notificationRowFilled = (text = "Update Inflation Projection") => {
    return (
      <Row className="notification-row-new">
        <Col
          span={20}
          style={{
            display: "flex",
            alignItems: "center",
            minHeight: "30px",
          }}
        >
          <p className="notification-text">{text}</p>
        </Col>
        <Col span={2}>
          <Icon type="eye" className="icon-style"></Icon>
        </Col>
        <Col span={2}>
          <Icon type="close" className="icon-style"></Icon>
        </Col>
      </Row>
    );
  };

  notificationRowUpdated = (text = "Update Inflation Projection") => {
    return (
      <Row className="notification-row-nocolor-new">
        <Col
          span={20}
          style={{
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            minHeight: "35px",
          }}
        >
          <p className="notification-text">{text}</p>
        </Col>
        <Col span={2}>
          <Icon type="eye" className="icon-style"></Icon>
        </Col>
        <Col span={2}>
          <Icon type="close" className="icon-style"></Icon>
        </Col>
      </Row>
    );
  };

  notificationRowViewAll = () => (
    <Row className="notification-row-nocolor">
      <Col span={20}></Col>
      <Col span={1}></Col>
      <Col span={3}>
        <a>
          <p
            className="text-center mr-1"
            onClick={() => this.setState({ showViewUpdateModal: true })}
          >
            View All
          </p>
        </a>
      </Col>
    </Row>
  );

  getLiquidityRow = (
    title = "",
    pc1 = 0,
    pc2 = 0,
    pc3 = 0,
    opt1 = "",
    opt2 = "",
    opt3 = ""
  ) => {
    return (
      <Col style={{ height: "33%" }} span={24}>
        <Row style={{ height: "40%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "10px",
            }}
          >
            <p className="liquidity-sub-header-text">{title}</p>
          </div>
        </Row>
        <Row style={{ height: "40%" }}>
          <Col
            xs={24}
            sm={14}
            lg={14}
            xl={14}
            style={{
              display: "flex",
              // width: "100%",
              paddingRight: "10px",
              paddingLeft: "10px",
              height: "70%",
            }}
          >
            <div className="cust">
              <div
                className="green-gradient"
                style={{
                  marginTop: "6px",
                  marginBottom: "6px",
                  width: `${pc1}%`,
                  // background: "#0d723b",
                  borderRadius: "20px",
                }}
              ></div>
              <div
                className="green-blue-gradient"
                style={{
                  marginTop: "6px",
                  marginBottom: "6px",
                  width: `${pc2}%`,
                  // background: "cyan",
                  borderRadius: "20px",
                }}
              ></div>
              <div
                style={{
                  marginTop: "6px",
                  marginBottom: "6px",
                  width: `${pc3}%`,
                  background: "red",
                  borderRadius: "20px",
                }}
              ></div>
            </div>
          </Col>
          <Col
            xs={24}
            sm={9}
            lg={9}
            xl={9}
            style={{
              display: "flex",
              height: "70%",
              marginLeft: "3%",
            }}
          >
            <div
              style={{
                width: `33.3%`,
                display: "flex",
              }}
            >
              <div className="custom-circle-style-green"></div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "5px",
                }}
              >
                <p className="notify-left-black-sm">{opt1}</p>
              </div>
            </div>

            <div
              style={{
                width: `33.3%`,
                display: "flex",
              }}
            >
              <div className="custom-circle-style-cayn"></div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "5px",
                }}
              >
                <p className="notify-left-black-sm">{opt2}</p>
              </div>
            </div>

            <div
              style={{
                width: `33.3%`,
                display: "flex",
              }}
            >
              <div className="custom-circle-style-red"></div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "5px",
                }}
              >
                <p className="notify-left-black-sm">{opt3}</p>
              </div>
            </div>
          </Col>
        </Row>
      </Col>
    );
  };

  percentCard = (
    name = "",
    percentage = 0,
    need = "",
    have = "",
    days = ""
  ) => {
    return (
      <Col xs={24} sm={12} lg={8} xl={6}>
        <div className="flip-box">
          <div className="flow flip-box-inner">
            {/* <div className="flow"> */}
            <div className="percentage-card-container flip-box-front">
              <div
                style={{
                  height: "20%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p className="percentage-header-text-custom">{name}</p>
              </div>
              <div
                style={{
                  height: "80%",
                  background: "white",
                  borderRadius: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="percent-background-circle">
                  <Progress
                    type="circle"
                    percent={percentage}
                    width={180}
                    strokeColor={"white"}
                    strokeWidth={2}
                    trailColor="#ffffff00"
                    format={() => {
                      return (
                        <span className="percentage-text-custom">
                          {percentage}%
                        </span>
                      );
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="percentage-card-container flip-box-back">
              <div
                style={{
                  height: "20%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p className="percentage-header-text-custom">{name}</p>
              </div>
              <div
                style={{
                  height: "80%",
                  background: "white",
                  borderRadius: "30px",
                }}
              >
                <Row style={{ height: "100%" }}>
                  <Col
                    span={24}
                    style={{
                      height: "30%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: " center",
                      justifyContent: "center",
                    }}
                  >
                    <div style={{ width: "70%" }}>
                      <span className="getting-married-text">Need :</span>
                    </div>
                    <div
                      style={{ display: "flex", height: "40%", width: "80%" }}
                    >
                      <div className="item3">
                        <span className="left">$</span>
                      </div>
                      <div className="item4">
                        <span className="right">{need}</span>
                      </div>
                    </div>
                  </Col>
                  <Col
                    span={24}
                    style={{
                      height: "30%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: " center",
                      justifyContent: "center",
                    }}
                  >
                    <div style={{ width: "70%" }}>
                      <span className="getting-married-text">Have :</span>
                    </div>
                    <div
                      style={{ display: "flex", height: "40%", width: "80%" }}
                    >
                      <div className="item3">
                        <span className="left">$</span>
                      </div>
                      <div className="item4">
                        <span className="right">{have}</span>
                      </div>
                    </div>
                  </Col>
                  <Col
                    span={24}
                    style={{
                      height: "30%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: " center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "70%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <span className="getting-married-text">
                        Achievement Due in:{" "}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        height: "40%",
                        width: "70%",
                        justifyContent: "center",
                      }}
                    >
                      <div className="item4">
                        <span className="right">{days} Days </span>
                      </div>
                      {/*<div style={{ marginLeft: "25px" }}>
                        <span className="date-text">:</span>
                      </div>
                      <div className="item3-date">
                        <span className="date-text">mm</span>
                      </div>
                      <div style={{ marginLeft: "25px" }}>
                        <span className="date-text">:</span>
                      </div>
                      <div className="item3-date">
                        <span className="date-text">ss</span>
                    </div>*/}
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </Col>
    );
  };

  gettingMarriedCard = (name = "") => {
    return (
      <Col xs={24} sm={12} lg={8} xl={6}>
        <div className="percentage-card-container">
          <div
            style={{
              height: "20%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p className="percentage-header-text-custom">{name}</p>
          </div>
          <div
            style={{
              height: "80%",
              background: "white",
              borderRadius: "30px",
            }}
          >
            <Row style={{ height: "100%" }}>
              <Col
                span={24}
                style={{
                  height: "30%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: " center",
                  justifyContent: "center",
                }}
              >
                <div style={{ width: "70%" }}>
                  <span className="getting-married-text">Need :</span>
                </div>
                <div style={{ display: "flex", height: "40%", width: "80%" }}>
                  <div className="item3">
                    <span className="left">$</span>
                  </div>
                  <div className="item4">
                    <span className="right">{`1,233,456`}</span>
                  </div>
                </div>
              </Col>
              <Col
                span={24}
                style={{
                  height: "30%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: " center",
                  justifyContent: "center",
                }}
              >
                <div style={{ width: "70%" }}>
                  <span className="getting-married-text">Have :</span>
                </div>
                <div style={{ display: "flex", height: "40%", width: "80%" }}>
                  <div className="item3">
                    <span className="left">$</span>
                  </div>
                  <div className="item4">
                    <span className="right">{`1,233,456`}</span>
                  </div>
                </div>
              </Col>
              <Col
                span={24}
                style={{
                  height: "30%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: " center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "70%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <span className="getting-married-text">
                    Achievement Due in:{" "}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    height: "40%",
                    width: "70%",
                  }}
                >
                  <div className="item3-date">
                    <span className="date-text">hh</span>
                  </div>
                  <div style={{ marginLeft: "25px" }}>
                    <span className="date-text">:</span>
                  </div>
                  <div className="item3-date">
                    <span className="date-text">mm</span>
                  </div>
                  <div style={{ marginLeft: "25px" }}>
                    <span className="date-text">:</span>
                  </div>
                  <div className="item3-date">
                    <span className="date-text">ss</span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Col>
    );
  };

  getCollapsableRow = (attribute = "", title = "") => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingTop: "12px",
        }}
      >
        <div class="border-collapsable">
          {this.state[attribute] === "collapsed" ? (
            <span
              className="left-side-collapse-icon"
              onClick={() => {
                console.log("sdfedrgerfg");
                this.setState({ [attribute]: "expanded" });
              }}
            >
              <i className="fe-plus blue-plus"></i>
            </span>
          ) : (
            <span
              className="left-side-collapse-icon"
              onClick={() => {
                console.log("sdfedrgerfg");
                this.setState({ [attribute]: "collapsed" });
              }}
            >
              <i className="fe-minus red-minus"></i>
            </span>
          )}
        </div>
        <span className="saving-goals-text">{title}</span>
      </div>
    );
  };

  render() {
    const userRole = localStorage.getItem("role") != 'undefined' && JSON.parse(localStorage.getItem("role"))
    const users = localStorage.getItem("delegateUsers") != 'undefined' && JSON.parse(localStorage.getItem("delegateUsers"))
    console.log("users", users)
    return (
      <React.Fragment>
        {/* Top Fixed Header Section */}

        {/* <div style={{width:"100%",overflow:"visible"}}>
          <div
            style={{
              background: "white",
              width:"100%",
              padding: "20px",
              position: "fixed",
              top: "0",
              
              
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div></div>

              <div>
                <img src={logo} height="45px" />
              </div>
              <div>
                <Icon
                  type="check-circle"
                  style={{
                    padding: "5px",
                    fontSize: "22px",
                    color: "green",
                  }}
                />
                <Icon
                  type="bell"
                  style={{ padding: "5px", fontSize: "22px" }}
                />
                <Icon
                  type="user"
                  style={{ padding: "5px", fontSize: "22px" }}
                />
              </div>
            </div>
          </div>
        </div> */}

        <div className="c-header ">
          {/* <div className={`mb-4 fixed-header fixed-header-container`}>
            {true ? (
              <Row
                className="mt-2 c-dum"
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Col
                  span={14}
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row-reverse",
                    // position: "fixed",
                    // top: "0",
                    // left: "50",
                  }}
                >
                  <img src={logo} height="45px" />
                </Col>
                {userRole && (userRole === "trustee" || userRole === "protrustee") ?
                  <Col
                    xs={6}
                    span={7}
                  >
                    <div className="selectBox">
                      <Select
                        style={{
                          width: "12rem",
                          marginLeft: "auto",
                          float: "right",
                        }}
                        showSearch
                        // value={obj ? obj[index] : ""}
                        placeholder="-Select Client-"
                        onChange={
                          (val, id) => {
                            try {
                              (async () => {
                                // this.setState({loading:true})
                                // const data = await DEATH_API.fetchEmailTemplates(id.key)
                                // this.setState({loading:false})
                                // if (data && data.data.template) {

                                //   this.setState({
                                //     ["Template"]: data.data.template,
                                //   });
                                //   this.setState({
                                //     templateState:
                                //       data.data.template,
                                //   })
                                // }
                                console.log("value", val)
                                localStorage.setItem("accessId", val)

                              })()
                            } catch (error) {

                              console.log(error)
                            }

                          }
                        }
                      >
                        {users && users.map((item, index) => (

                          <Option key={index} value={item.id}>{item.userName}</Option>

                        ))}

                      </Select>
                    </div>
                  </Col>
                  :
                  <Col
                    span={9}
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row-reverse",
                    }}
                  >
                    <div style={{ marginRight: "30px" }}>
                      <Icon
                        type="check-circle"
                        style={{
                          padding: "5px",
                          fontSize: "22px",
                          color: "green",
                        }}
                      />
                      <Icon
                        type="bell"
                        style={{ padding: "5px", fontSize: "22px" }}
                      />
                      <Icon
                        type="user"
                        style={{ padding: "5px", fontSize: "22px" }}
                      />
                    </div>
                  </Col>
                }

              </Row>
            ) : null}

            <div className="mt-2">
              <Row justify="center" style={{ marginLeft: "10px" }}>
                {this.mainTop()}
              </Row>
            </div>

            <Row style={{ padding: "20px" }}>
              <Col
                xs={24}
                sm={6}
                lg={6}
                xl={6}
                style={{ height: "100%", marginBottom: "10px" }}
              >
                <div className="top-dropdown-style">
                  <span className="dropdown-text">Client Name: {localStorage.getItem("User") ? localStorage.getItem("User") : ""}</span>
                  <Dropdown overlay={menu} placement="bottomCenter">
                    <a className="ant-dropdown-link">
                      <span className="dropdown-text">Client Name</span>
                      <Icon type="down" />
                    </a>
              </Dropdown>
                </div>
              </Col>
              <Col xs={24} sm={6} lg={6} xl={6} style={{ height: "100%" }}>
                <div className="top-dropdown-style">
                  <Dropdown overlay={menu} placement="bottomCenter">
                    <a className="ant-dropdown-link">
                      <span className="dropdown-text">Plan Name</span>
                      <Icon type="down" />
                    </a>
                  </Dropdown>
                </div>
              </Col>
            </Row>
          </div> */}

          {/* fixed header container section end */}

          <div className={`mb-5`}>
            <div className="mt-2">
              <Row justify="center" style={{ marginLeft: "10px" }}></Row>
            </div>

            <Row style={{ padding: "20px" }}>
              <Col
                xs={24}
                sm={6}
                lg={6}
                xl={6}
                style={{ height: "100%", marginBottom: "10px" }}
              >
                <div className="top-dropdown-style">
                  <Dropdown overlay={menu} placement="bottomCenter">
                    <a className="ant-dropdown-link">
                      <span className="dropdown-text">{localStorage.getItem("User") ? localStorage.getItem("User") : ""}</span>
                      {/* <Icon type="down" /> */}
                    </a>
                  </Dropdown>
                </div>
              </Col>
              <Col xs={24} sm={6} lg={6} xl={6} style={{ height: "100%" }}>
                <div className="top-dropdown-style">
                  <Dropdown overlay={menu} placement="bottomCenter">
                    <a className="ant-dropdown-link">
                      <span className="dropdown-text">Plan Name</span>
                      <Icon type="down" />
                    </a>
                  </Dropdown>
                </div>
              </Col>
            </Row>
          </div>
        </div>

        {/* General Tiles Section */}

        <div style={{ background: "#F9F9F9", paddingTop: "35px" }}>
          {this.getCollapsableRow("statsVisible", "General Tiles")}

          <div id="expand-container">
            <div id="expand-contract" class={`${this.state.statsVisible}`}>
              <Row gutter={16}>
                {this.statsCard({
                  cardName: "Assets",
                  price: "1,144,000",
                  image: Asset,
                })}

                {this.statsCard({
                  cardName: "Income",
                  price: "232,551",
                  image: contributionsIncome,
                })}

                {this.statsCard({
                  cardName: "Monthly Savings",
                  price: "1,295",
                  image: Savings,
                })}

                {this.statsCard({
                  cardName: "Debt",
                  price: "823,045",
                  image: Debt,
                })}
              </Row>
            </div>
          </div>

          {/* 
          <div className={`${this.state.statsVisible}`}>
            <Row  gutter={16}>
              {this.statsCard({
                cardName: "Assets",
                price: "1,234,567",
                image: Asset,
              })}

              {this.statsCard({
                cardName: "Income",
                price: "1,234,567",
                image: Distributions,
              })}

              {this.statsCard({
                cardName: "Monthly Savings",
                price: "1,234,567",
                image: Savings,
              })}

              {this.statsCard({
                cardName: "Debit Limit",
                price: "1,234,567",
                image: Debt,
              })}
            </Row>
          </div> */}

          {/* Budget and Net Worth Section */}

          {this.getCollapsableRow("budgetRowVisible", "Budget and Net Worth")}

          <div id="expand-container">
            <div id="expand-contract" class={`${this.state.budgetRowVisible}`}>
              <Row
                gutter={[16, 16]}
                style={{
                  padding: "20px",
                  display: "flex",
                  marginBottom: "12px",
                }}
              >
                {/* LEFT BOX */}
                <Col
                  xs={24}
                  sm={12}
                  lg={12}
                  xl={12}
                  style={{ display: "flex" }}
                >
                  <div className="main-dashboard-card">
                    <Row
                      style={{
                        height: "100%",
                        marginBottom: "25%",
                        paddingBottom: "2%",
                      }}
                    >
                      <Col
                        span={24}
                        style={{ height: "20%", marginTop: "1.5%" }}
                      >
                        <p className="left" style={{ paddingTop: "8px" }}>
                          Budget Expenses
                        </p>
                      </Col>
                      <Col span={24} style={{ height: "80%" }}>
                        <Row style={{ height: "100%" }}>
                          <Col span={12} style={{ height: "100%" }}>
                            <Row style={{ height: "100%" }}>
                              <Col span={24} style={{ height: "15%" }}>
                                <p className="left-white">Monthly</p>
                              </Col>
                              <Col
                                span={24}
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  height: "35%",
                                }}
                              >
                                <div className="item3-custom">
                                  <p className="left">$</p>
                                </div>
                                <div className="item4-custom">
                                  <p className="right">18,084</p>
                                </div>
                              </Col>
                              <Col span={24} style={{ height: "15%" }}>
                                <p className="left-white">Annually</p>
                              </Col>
                              <Col
                                span={24}
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  height: "35%",
                                }}
                              >
                                <div className="item3-custom">
                                  <p className="left">$</p>
                                </div>
                                <div className="item4-custom">
                                  <p className="right">217,008</p>
                                </div>
                              </Col>
                            </Row>
                          </Col>

                          <Col
                            span={12}
                            style={{
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <div className="image-display">
                              <img src={Budget} height="75%" width="55%" />
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </Col>

                {/* RIGHT BOX */}
                <Col
                  xs={24}
                  sm={12}
                  lg={12}
                  xl={12}
                  style={{ display: "flex" }}
                >
                  <div className="main-dashboard-card-white">
                    <Row
                      style={{
                        height: "100%",
                        marginBottom: "15.5%",
                        paddingBottom: "1%",
                      }}
                    >
                      <Col span={24} style={{ height: "20%" }}>
                        <p className="left-black">Net Worth</p>
                      </Col>
                      <Col span={24} style={{ height: "80%" }}>
                        <Row style={{ height: "100%" }}>
                          <Col span={12} style={{ height: "100%" }}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "50%",
                              }}
                            >
                              <img src={Networth3} height="95%" width="40%" />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "15%",
                              }}
                            >
                              <p className="left-black-sm">
                                With Primary Residence
                              </p>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "35%",
                              }}
                            >
                              <div className="item3-custom">
                                <p className="left">$</p>
                              </div>
                              <div className="item4-custom-border">
                                <p className="right">1,144,000</p>
                              </div>
                            </div>
                          </Col>
                          <Col span={12} style={{ height: "100%" }}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "50%",
                              }}
                            >
                              <img
                                src={networth_without_house}
                                height="95%"
                                width="40%"
                              />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "15%",
                              }}
                            >
                              <p className="left-black-sm">
                                Without Primary Residence
                              </p>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "35%",
                              }}
                            >
                              <div className="item3-custom">
                                <p className="left">$</p>
                              </div>
                              <div className="item4-custom-border">
                                <p className="right">320,955</p>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          </div>

          {/* Updates and Notification Section */}

          {this.getCollapsableRow(
            "notificationRowVisible",
            "Updates and Notifications"
          )}

          <div id="expand-container">
            <div
              id="expand-contract"
              class={`${this.state.notificationRowVisible}`}
            >
              <Row justify="center" gutter={16} style={{ padding: "20px" }}>
                <Col xs={24} sm={12} lg={12} xl={12}>
                  <div className="notification-card-new">
                    <Row style={{ height: "100%" }}>
                      <Col
                        span={24}
                        style={{ minHeight: "55px", background: "white" }}
                      >
                        <p className="notification-header-text">Updates</p>
                      </Col>

                      <Col
                        span={24}
                        style={{ background: "white", minHeight: "280px" }}
                      >
                        {/* {this.notificationRowFilled()} */}
                        {this.notificationRowUpdated(
                          "Asset Planet has added new Asset to the list"
                        )}
                        {this.notificationRowUpdated(
                          "Asset Planet has developed a new category in the Inventory App"
                        )}
                        {this.notificationRowUpdated(
                          "Remember, Monday is a bank holiday. Enjoy the day off!"
                        )}
                        {this.notificationRowUpdated(
                          "Asset Planet has gifted another free month to you. Thank you for the referral!"
                        )}
                        {this.notificationRowUpdated()}
                        {this.notificationRowUpdated()}
                        {this.notificationRowViewAll()}
                      </Col>
                    </Row>
                  </div>
                </Col>

                <Col xs={24} sm={12} lg={12} xl={12}>
                  <div className="notification-card-new">
                    <Row style={{ height: "100%", background: "white" }}>
                      <Col span={24} style={{ minHeight: "50px" }}>
                        <p className="notification-header-text">
                          Notifications
                        </p>
                      </Col>

                      <Col
                        span={24}
                        style={{ background: "white", minHeight: "280px" }}
                      >
                        {/* {this.notificationRowFilled()} */}
                        {this.notificationRowUpdated(
                          "Your Inventory App Sync is complete"
                        )}
                        {this.notificationRowUpdated(
                          "Your Life Insurance policy will expire in 90 days"
                        )}
                        {this.notificationRowUpdated(
                          "Your Retirement Goal date is within 90 days"
                        )}
                        {this.notificationRowUpdated(
                          "Your Ford F150 has a loan payment due within 10 days"
                        )}
                        {this.notificationRowUpdated(
                          "There is a New Client being shared with you"
                        )}
                        {this.notificationRowUpdated(
                          "Your Inflation input has not been udpated in over 1 year"
                        )}
                        {this.notificationRowViewAll()}
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          </div>

          {/* Observation Section */}

          {this.getCollapsableRow("observationRowVisible", "Observations")}

          <div id="expand-container">
            <div
              id="expand-contract"
              class={`${this.state.observationRowVisible}`}
            >
              <Row justify="center" gutter={16} style={{ padding: "20px" }}>
                {/* Observation Row */}
                <Col span={24}>
                  <div className="observation-card-new">
                    <Row style={{ height: "100%", background: "white" }}>
                      <Col span={24} style={{ minHeight: "50px" }}>
                        <p className="notification-header-text">Observations</p>
                      </Col>

                      <Col span={24} style={{ background: "white" }}>
                        {this.notificationRowUpdated(
                          "Based on your Net Worth, consider an Umbrella Insurance Policy. You have $34,343 in networth with $0 Umbrella policy."
                        )}
                        {this.notificationRowUpdated(
                          "There is no Power of Attorney listed in your plan. Consult with an attorney to determine strategy to create a Power of Attorney."
                        )}
                        {this.notificationRowUpdated(
                          "There is no Will listed in your plan. Consult with an attorney to determine strategy to create a Will."
                        )}
                        {this.notificationRowUpdated(
                          "There is no Life Insurance listed in your plan. Consult with an insurance or financial professional to determine what is best for your needs."
                        )}
                        {this.notificationRowUpdated(
                          "Based on the loan rate on Frank and Tracy Rental, consider refinance. Your loan is $0 at 4.000% Current rates are 3.50%. Consider a refinance."
                        )}
                        {this.notificationRowUpdated(
                          "There is no Advance Healthcare Directive listed in your plan. Consult with an attorney to determine strategy to create an Advance Healthcare Directive."
                        )}
                        <div style={{ marginBottom: "10px" }}></div>
                        {this.notificationRowViewAll()}
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>{" "}
          </div>

          {/* liquidity section */}

          {this.getCollapsableRow("liquidityRowVisible", "Liquidity")}

          <div id="expand-container">
            <div
              id="expand-contract"
              class={`${this.state.liquidityRowVisible}`}
            >
              <Row
                justify="center"
                style={{ padding: "20px", display: "flex" }}
              >
                {/* Liquidity Row  */}
                <div className="liquidity-container">
                  <Col
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                      height: "20%",
                    }}
                    span={24}
                  >
                    <p className="liquidity-header-text">Liquidity</p>
                  </Col>

                  <Col style={{ height: "80%", marginBottom: "14%" }} span={24}>
                    <Row style={{ height: "100%" }}>
                      {this.getLiquidityRow(
                        "Taxable",
                        65,
                        35,
                        0,
                        "Net Liquidity: $450,450",
                        "Taxes: $242,550",
                        "Penalties: $0"
                      )}
                      {this.getLiquidityRow(
                        "Tax Deferred",
                        90,
                        0,
                        10,
                        "Net Liquidity: $405,900",
                        "Taxes: $0",
                        "Penalties: $45,100"
                      )}
                      {this.getLiquidityRow(
                        "Total",
                        67,
                        28,
                        5,
                        "Net Liquidity: $856,350",
                        "Taxes: $242,550",
                        "Penalties: $45,100"
                      )}
                    </Row>
                  </Col>
                </div>
              </Row>
            </div>
          </div>

          {/* Saving Section */}

          {this.getCollapsableRow("savingsRowVisible", "Savings")}

          <div id="expand-container">
            <div id="expand-contract" class={`${this.state.savingsRowVisible}`}>
              <Row style={{ height: "50px" }}>
                <Col
                  span={24}
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span className="saving-goals-text">Savings & Goals</span>
                </Col>
              </Row>

              <Row style={{ height: "50px", marginTop: "10px" }}>
                <Col
                  span={24}
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div className="saving-box-style">
                    <span className="saving-goals-text-header">
                      Savings $ 1,295
                    </span>
                  </div>
                </Col>
              </Row>

              {/* Budget Row */}
              <div className="mt-2">
                <Row
                  justify="center"
                  style={{ padding: "20px", marginBottom: "25px" }}
                >
                  {this.budgetBlock()}
                </Row>
              </div>
            </div>
          </div>

          {/* Goals Section */}

          {this.getCollapsableRow("cardsRowVisible", "Goals")}

          <div id="expand-container">
            <div id="expand-contract" class={`${this.state.cardsRowVisible}`}>
              <Row gutter={[20, 16]} style={{ padding: "20px" }}>
                {/* {this.gettingMarriedCard("Getting Married")} */}
                {this.percentCard(
                  "Getting Married",
                  89,
                  "13,524",
                  "12,036.36",
                  "126"
                )}
                {this.percentCard(
                  "Starting Business",
                  74,
                  "25,000",
                  "18,500",
                  "547"
                )}
                {this.percentCard(
                  "John's College",
                  65,
                  "150,000",
                  "97,500",
                  "3,650"
                )}
                {this.percentCard(
                  "Buying Vacation Home",
                  46,
                  "325,000",
                  "149,500",
                  "5,475"
                )}
                {this.percentCard(
                  "Retirement",
                  3,
                  "4,000,000",
                  "120,000",
                  "8,395"
                )}
              </Row>
            </div>
          </div>

          <Row style={{ paddingTop: "20px" }}>
            <Col xs={24} sm={12} lg={8} xl={8} style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <img src={Stock} height="80%" width="60%" />
                <p className="notification-header-text-bottom-sec">
                  Portfolio Tracker
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <img src={realworld} height="80%" width="60%" />
                <p className="notification-header-text-bottom-sec">
                  Personalized News
                </p>
              </div>
            </Col>
          </Row>

          <ViewUpdateModal
            show={this.state.showViewUpdateModal}
            close={this.closeModal}
          />

          {/* <Row style={{ marginLeft: "10px" }}>
          {this.state.results.map((data) => {
            return this.getBlock(data);
          })}
        </Row> */}

          {/* <div className="mt-2">
          <Row
            justify="center"
            style={{ marginLeft: "10px" }}
            style={{ flexDirection: "row" }}
          >
            {this.notificationBar("NOTIFICATIONS", notifications)}
            {this.notificationBar("UPDATES", updates)}
          </Row>
        </div> */}

          {/* <div className="mt-2">
          <Row justify="center" style={{ marginLeft: "10px" }}>
            {this.budgetProgressBar()}
          </Row>
        </div> */}

          {/* <div className="mt-2">
          <Row justify="center" style={{ marginLeft: "10px" }}>
            {this.budgetBlock()}
          </Row>
        </div> */}

          {/* <div className="mt-2">
          <Row justify="center" style={{ marginLeft: "10px" }}>
            {this.state.goals.map((item, index) => {
              return this.getSecBlock(item, index);
            })}
          </Row>
        </div> */}

          {/* <div className="mt-2">
          <Row justify="center" style={{ marginLeft: "10px" }}>
            {this.observationBlock()}
          </Row>
        </div> */}
        </div>
      </React.Fragment>
      //   <React.Fragment>
      //     <div className="">
      //       {/* preloader */}
      //       {this.props.loading && <Loader />}

      //       <Row>
      //         <Col lg={12}>
      //           <Card>
      //             <CardBody>
      //               <p>Hello this is dashboard content</p>
      //               <p>
      //                 <strong>User ID:</strong> {this.props.user.id}
      //               </p>
      //               <p>
      //                 <strong>User Role:</strong> {this.props.user.role}
      //               </p>
      //               <p>
      //                 <strong>Username:</strong> {this.props.user.username}
      //               </p>
      //               <p>
      //                 <strong>Token:</strong> {this.props.user.token}
      //               </p>
      //             </CardBody>
      //           </Card>
      //         </Col>
      //       </Row>
      //     </div>
      //   </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.rootReducer.loginUser.loginUserData,
  };
};
export default connect(mapStateToProps, null)(DefaultDashboard);
