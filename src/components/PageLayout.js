import React, { Component, Suspense, useState, useEffect } from "react";
import { Container } from "reactstrap";
import { connect } from "react-redux";
import { Icon, Row, Col, Button, Select } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setActivated } from '../redux/slices/loginSlice';

import { Link, withRouter } from "react-router-dom";
import { isUserAuthenticated } from "../helpers/authUtils";
import profilePic from "../assets/images/users/user-1.jpg";
import logo from "../assets/images/asset-planet-background.png";
import dashboard from "../assets/images/dashboard.png";
import modules from "../assets/images/modules.png";
import goals from "../assets/images/goals-question.png";
import client from "../assets/images/client.png";
import menu from "../assets/images/menu-icon3.png";
import reports from "../assets/images/reports.png";
import dead from "../assets/images/dead.png";
import performace from "../assets/images/performance.png";
import schedule from "../assets/images/schedule.png";
import organizer from "../assets/images/organized-Bliss.png";
import form from "../assets/images/form.png";
import insurance from "../assets/images/insurance.png";
import { isMobile } from "react-device-detect";
import { MODULE_API } from "../apis";
import { setCollection } from "../redux/inventory/actions";
import backButton from "../assets/SVGs/back-button.png";
// import assets from '../../assets/images/asset.png';
import assets from "../assets/images/asset.png";
import liabilities from "../assets/images/debt.png";
import income from '../assets/images/contributions.png';
import assistance from '../assets/images/savings.png';
import budget from '../assets/images/calculator.png';


import ROLES from "constants/roles";
import Sidebar from "./Sidebar";

// code splitting and lazy loading
// https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const Topbar = React.lazy(() => import("./Topbar"));
const Navbar = React.lazy(() => import("./Navbar"));
const RightSidebar = React.lazy(() => import("./RightSidebar"));
const Footer = React.lazy(() => import("./Footer"));
const loading = () => <div className="text-center"></div>;
const { Option } = Select;

const RightSidebarContent = (props) => {
  return (
    <div className="user-box">
      <div className="user-img">
        <img
          src={profilePic}
          alt="user-img"
          title="Nik Patel"
          className="rounded-circle img-fluid"
        />
        <a href="/" className="user-edit">
          <i className="mdi mdi-pencil"></i>
        </a>
      </div>

      <h5>{props.user && <a href="/">{props.user.username}</a>}</h5>
      <p className="text-muted mb-0">
        <small>Founder</small>
      </p>
    </div>
  );
};


const BackButton = (props) => {
  const history = useHistory();
  function navigateBack() {
    // history.goBack();
    history.goBack();
  }
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: " #39b54a",
        width: "2rem",
        height: "2rem",
        borderRadius: "11px",
        justifyContent: "center",
        cursor: "pointer",
        marginLeft: "5px",
        alignItems: "center",
      }}
      onClick={navigateBack}
    >
      <img height="100%" width="100%" src={backButton} alt="assset plant back button" />
    </div>
  );
};


function ClientInfo() {
  const [state, setState] = useState();
  return (
    <div className="right-menu" style={{ rowGap: "0.6rem", display: "grid", zIndex: "2" }}>
      <div className="side-menu-block3">
        <span className="side-menu-title" style={{ textAlign: "center" }}>
          Change Client
        </span>
      </div>

      <div style={{ display: "flex", columnGap: "0.2rem", alignItems: "center", textAlign: "justify" }}>
        <div className="side-menu-block3">
          <span className="side-menu-title">
            Frank Jones
          </span>
        </div>
        <Icon className="icon-organizer" type="right" />
      </div>

      <div className="side-menu-block3">
        <span className="side-menu-title" style={{ textAlign: "center" }}>
          Change Plan
        </span>
      </div>

      <div style={{ display: "flex", columnGap: "0.2rem", alignItems: "center", textAlign: "justify" }}>
        <div className="side-menu-block3">
          <span className="side-menu-title">
            Plan One
          </span>
        </div>
        <Icon className="icon-organizer" type="right" />
      </div>

      <div className="side-menu-block3">
        <span className="side-menu-title" >
          Recent Modules
        </span>
      </div>

      <div className="side-menu-block3">
        <span className="side-menu-title" style={{ textAlign: "center" }}>
          Inventory
        </span>
      </div>

      <div className="side-menu-block3">
        <span className="side-menu-title" style={{ textAlign: "center" }}>
          Divorce
        </span>
      </div>

      <div className="side-menu-block3">
        <span className="side-menu-title" style={{ textAlign: "center" }}>
          Budget
        </span>
      </div>
    </div>
  );
}

const PageLayout = (props) => {
  console.log(props)
  const children = [props.children]
  // this.toggleRightSidebar = this.toggleRightSidebar.bind(this);
  // this.toggleMenu = this.toggleMenu.bind(this);
  const [isMenuOpened, setisMenuOpened] = useState(true)
  const [modules, setmodules] = useState([])
  const dispatch = useDispatch();

  const [accessableUsers, setaccessableUsers] = useState([])

  const [isDropdownOpen, setisDropdownOpen] = useState(false)

  const [isDropdownOpen1, setisDropdownOpen1] = useState(false)
  const [wrapperClass, setwrapperClass] = useState("")
  const [defaultValueName, setDefaultValueName] = useState("Me")

  const [accessId, setAccessId] = useState("");
  const activated = useSelector((state) => state.rootReducer.loginUser.activated);

  // this.state = {
  //   isMenuOpened: true,
  //   modules: [],
  //   accessableUsers: [],
  //   isDropdownOpen: false,
  //   isDropdownOpen1: false,
  //   // menuItems: ['Asset' , 'Liablities' , 'Insuarance' , 'Income' , 'Assistance' , 'Budget']
  // }

  let wrapperClassName = "";
  let userRole = null;
  let users = null;
  useEffect(() => {
    let isAuthTokenValid = true;

    if (isMobile) {
      // this.setState({ isMenuOpened: !this.state.isMenuOpened });
      setisMenuOpened(!isMenuOpened)
    }

    // userRole = JSON.parse(localStorage.getItem("role") || null)
    // users = JSON.parse(localStorage.getItem("delegateUsers") || null)


    // get the child view which we would like to render

    if (isMenuOpened) {
      setwrapperClass("left-sidebar--opened")
    } else {
      setwrapperClass("left-sidebar--collapsed")
    }

    isAuthTokenValid = true;

    if (
      [
        "Login",
        "Logout",
        "Forget Password",
        "Register",
        "Confirm",
        "Signup",
        "Otp",
        "TrusteeLogin",
        "AcceptInvitation",
        "Page Not Found"
      ].some((item) => item == props.route.name)
    ) {
      setwrapperClass("left-side--hidden")
      // wrapperClassName = wrapperClassName + " left-side--hidden";
    }
  }

  );

  const [userRoles, setUserRoles] = useState("");
  const [userss, setUserss] = useState("");
  const history = useHistory()


  useEffect(() => {
    // Perform localStorage action
    // setAccessId(localStorage.getItem("accessId") && localStorage.getItem("accessId"))
    let userRole1 = '';
    let users1 = '';
    try {
      userRole1 = localStorage.getItem("role") != 'undefined' && JSON.parse(localStorage.getItem("role") || null)
      users1 = localStorage.getItem("delegateUsers") != 'undefined' && JSON.parse(localStorage.getItem("delegateUsers") || null)
      console.log("here in try")
      setUserRoles(userRole1);
      setUserss(users1);
      const defaultValue = users1 && users1.filter(item => (item.id == localStorage.getItem("accessId")))
      // console.log("defaultValue", defaultValue[0])
      if (defaultValue && defaultValue[0] && defaultValue[0].userName) {

        setDefaultValueName(defaultValue[0].userName)
      }
    }
    catch (error) {
      console.log("error", error)
    }
    console.log("props.route.name", props.route.name)
    if (props.route.name !== "Login" && props.route.name !== "Otp" && props.route.name !== "Logout" && props.route.name !== "Forget Password" && props.route.name !== "Confirm" && props.route.name !== "Signup" && props.route.name !== "TrusteeLogin" && props.route.name !== "AcceptInvitation") {
      if (!userRole1 || userRole1 == null) {
        console.log("nullllllll");
        localStorage.setItem("userLoginToken", "")
        history.push("/login")
      }

    }
    else {
      setUserRoles(userRole1);
      setUserss(users1);
      // const result = users1.filter((user) => user.id == localStorage.getItem("accessId"))
      // console.log("result", result)
    }
    if (isMenuOpened) {
      setwrapperClass("left-sidebar--opened")
    } else {
      setwrapperClass("left-sidebar--collapsed")
    }

  }, [])

  useEffect(() => {
    // Perform localStorage action
    let userRole1 = '';
    let users1 = '';
    console.log("accessId", accessId)
    try {
      userRole1 = localStorage.getItem("role") != 'undefined' && JSON.parse(localStorage.getItem("role") || null)
      users1 = localStorage.getItem("delegateUsers") != 'undefined' && JSON.parse(localStorage.getItem("delegateUsers") || null)
      setUserRoles(userRole1);
      setUserss(users1);
      if (localStorage.getItem("accessId")) {
        console.log("here in access id")
        const defaultValue = users1 && users1.filter(item => (item.id == localStorage.getItem("accessId")))
        console.log("defaultValue", defaultValue[0].userName)
        setDefaultValueName(defaultValue[0].userName)
      }
      else {
        setDefaultValueName("Me")
        console.log("here in else me")
      }
    }
    catch (error) {
      console.log("error", error)
    }

  }, [activated, accessId])

  const get = async (name) => {
    try {
      const { dispatch } = props;
      let attributes = await MODULE_API.fetchAttributes(`${name}_item`);
      if (attributes) {
        dispatch(setCollection(attributes));
      }
    } catch (error) {
      console.log("e ", error);
    }
  };

  const signOut = (e) => {
    // e.preventDefault();
    localStorage.removeItem("userLoginToken");
    localStorage.removeItem("role");
    localStorage.removeItem("delegateUsers");
    localStorage.removeItem("otp");
    localStorage.removeItem("User");
    localStorage.removeItem("fields");
    localStorage.removeItem("accessId");
    localStorage.removeItem("duplicateRole");



  }

  /**
   * toggle Menu
   */
  const toggleMenu = (e) => {
    e.preventDefault();
    // this.setState({ isMenuOpened: !this.state.isMenuOpened });
    setisMenuOpened(!isMenuOpened)
  };

  /**
   * Toggle right side bar
   */
  const toggleRightSidebar = () => {
    document.body.classList.toggle("right-bar-enabled");
  };
  const isUserData = () => {
    if (!userRole || !users) {
      const history = useHistory()
      history.push("/login")
      return false
    }
    return true
  }

  return (
    <React.Fragment>
      {(
        <React.Fragment>
          <div id="wrapper" className={wrapperClass}>
            <div
              style={{
                height: "80px",
                background: "#FFF",
              }}
            >
              {/* <Row
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "calc(100% - 240px)",
                    paddingLeft: "240px",

                    '@media (max-width: 567px)': {
                      width: "100%",
                      paddingLeft: "0"
                    },
                  }}
                >
                
                  <Col
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <img src={logo} height="40px" alt="asset-planet-logo" />
                  </Col>
                </Row> */}

              <Row
                className="content-page"
                style={{
                  minHeight: "80px",
                  padding: isMobile ? "0 12px" : "0 20px",
                  background: "#FFF"
                }}

                type="flex" align="middle" justify="center"
              >

                <Col xs={24}>
                  <Row type="flex" align="middle" >
                    {props.route.name === "Login" ?
                      <Col xs={8}>
                        <React.Fragment></React.Fragment>
                      </Col>
                      :

                      <Col xs={8}>
                        <BackButton />
                      </Col>
                    }
                    <Col xs={8}>
                      <Row type="flex" justify="center">
                        <img src={logo} height={isMobile ? "30px" : "40px"} alt="asset-planet-logo" />
                      </Row>
                    </Col>
                    <Col xs={8}>
                      {userRoles && userss && userss.length > 0 &&
                        // (userRoles == "trustee" || userRoles == "protrustee") &&
                        <div className="selectBox">
                          <Select
                            style={{
                              width: "12rem",
                              marginLeft: "auto",
                              float: "right",
                            }}
                            // defaultValue={defaultValueName}
                            showSearch
                            value={isNaN(localStorage.getItem("User")) ? defaultValueName : (defaultValueName === "Me" ? "" : defaultValueName)}
                            // value={localStorage.getItem("accessId")}
                            placeholder="-Select Client-"
                            onChange={
                              (val, id) => {
                                try {
                                  (async () => {

                                    console.log("value", id)
                                    if (val === "Me") {
                                      setDefaultValueName("Me")
                                      localStorage.removeItem("accessId");
                                      localStorage.setItem("role", localStorage.getItem("duplicateRole"))
                                      dispatch(setActivated(!activated))
                                      // getClientList();
                                      // setAccessId(val)
                                      console.log("here in me")

                                    }
                                    else {
                                      console.log("id.props.id", id.props.value)
                                      const findUserRole = userss && userss.filter(item => (item.id == id.props.value))
                                      console.log("FindUserRole", findUserRole[0].role.name)
                                      localStorage.setItem("duplicateRole", localStorage.getItem("role"))
                                      localStorage.setItem("role", JSON.stringify(findUserRole[0].role.name))

                                      dispatch(setActivated(!activated))
                                      setAccessId(val)
                                      localStorage.setItem("accessId", val)
                                    }
                                  })()
                                } catch (error) {

                                  console.log(error)
                                }

                              }
                            }
                          >
                            {userss && userss.map((item, index) => (

                              <Option key={index} value={item.id}>{item.userName}</Option>

                            ))}
                            {isNaN(localStorage.getItem("User")) &&
                              <Option value={"Me"}>{"Me"}</Option>
                            }
                          </Select>
                        </div>
                      }

                    </Col>
                  </Row>
                </Col>
              </Row>

            </div>
            {isNaN(localStorage.getItem("User")) && props.route.name === "DivorceCreate" && defaultValueName !== "Me" &&
              <div
                style={{
                  height: "60px",
                  background: "#FFF",
                }}
              >
                <Row
                  className="content-page"
                  style={{
                    minHeight: "60px",
                    padding: isMobile ? "0 12px" : "0 20px",
                    // background: "#FFF",
                    color: "white",
                    backgroundImage: "linear-gradient(to right bottom, #39b54a, #0d723b)",

                  }}

                  type="flex" align="middle" justify="center"
                >

                  <Col xs={24}>
                    <Row type="flex" align="middle" >
                      <Col xs={20}>
                        <span style={{ fontSize: "24px" }}>  {localStorage.getItem("User") && localStorage.getItem("User")} is logged in as {defaultValueName}</span>
                      </Col>
                      <Col xs={4}>
                        <Button type="danger" style={{
                          fontSize: "14px", cursor: "pointer", color: "white", borderRadius: "6px",
                          // padding: "5px",
                          width: "auto",
                        }} onClick={() => {
                          setDefaultValueName("Me")
                          localStorage.removeItem("accessId");
                          localStorage.setItem("role", localStorage.getItem("duplicateRole"))
                          dispatch(setActivated(!activated));
                          history.push("/protector");
                          console.log("here in me")
                        }} >
                          <span className="custom-footer-text">Cancel Access <Icon type="close-circle" style={{ marginBottom: "3px", fontWeight: "800", fontSize: "18px" }} /> </span></Button>
                      </Col>
                    </Row>
                  </Col>

                </Row>

              </div>
            }

            <Sidebar />

          {/*  <div className="left-side-menu">
              <div
                style={{
                  height: "70px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  className="left-side-collapse-icon-custom"
                  onClick={toggleMenu}
                >
                  <i className="fe-menu"></i>
                </span>
               
              </div>
              <div id="sidebar-menu" className="active">
                <div
                  style={{
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    // justifyContent: "center",
                  }}
                >
                  <Icon
                    type="user"
                    style={{
                      paddingLeft: "25px",
                      fontSize: "24px",
                      color: "black",
                    }}
                  />
                  {localStorage.getItem("User") ? <span className="side-menu-title ml-2">{localStorage.getItem("User")}</span> : <React.Fragment></React.Fragment>}
                </div>
               
                <ul className="metismenu in nav" id="side-menu">
                  <li>
                    {userRoles && userss && userss.length > 0 &&
                      // (userRoles == "trustee" || userRoles == "protrustee") &&
                      <Link
                        to="/delgateAccess"
                        className="side-nav-link-re nav-link"
                      >
                        <div className="side-menu-block">
                          <div className="side-menu-image-background">
                            <img src={dashboard} className="img-icon" />
                          </div>
                          <span className="side-menu-title ml-2">
                            Delegate Access
                          </span>
                        </div>
                      </Link>
                    }
                    <Link
                      to="/dashboard"
                      className="side-nav-link-re nav-link"
                    >
                      <div className="side-menu-block">
                        <div className="side-menu-image-background">
                          <img src={dashboard} className="img-icon" />
                        </div>
                        <span className="side-menu-title ml-2">
                          Dashboard
                        </span>
                      </div>
                    </Link>

                    <Link to="/client_info" className="side-nav-link-ref">
                      <div className="side-menu-block">
                        <div className="side-menu-image-background">
                          <img src={client} className="img-icon" />
                        </div>
                        <span className="side-menu-title ml-2">
                          Client Information
                        </span>
                      </div>
                    </Link>


                    <div style={{ paddingLeft: "0.2rem" }}>
                      <Link to="/organizer" className="side-nav-link-ref" style={{ display: "inline-block", padding: "1rem 1rem", paddingRight: "5rem", verticalAlign: "middle" }}>
                        <div className="side-menu-block2">
                          <div className="side-menu-image-background">
                            <img src={organizer} className="img-icon" />
                          </div>
                          <span className="side-menu-title ml-2">
                            Organizer
                          </span>
                          <span className="icon-hover" style={{ marginLeft: "1rem" }} >
                            <Icon style={{ strokeWidth: "10rem", stroke: "rgb(210, 210, 210)" }} className={` icon-organizer ${isDropdownOpen ? 'icon-open' : 'icon-close'} `} type="right" onClick={() => setisDropdownOpen(isDropdownOpen)} />

                          </span>
                        </div>
                      </Link>
                    </div>







                    <div className="side-nav-link-ref" style={{ paddingLeft: "1.7rem" }}>
                      {isDropdownOpen && (
                        <div className="dropdown-organiser">
                          <Link to="/assets" className="side-menu-block side-menu-title dropdown-organiser"><img style={{ height: "30px", width: "30px", backgroundColor: "white", margin: "0.5rem 0.5rem" }} src={assets} />      Asset</Link>
                          <Link to="/liabilities_credit" className="side-menu-block side-menu-title dropdown-organiser"><img style={{ height: "30px", width: "30px", backgroundColor: "white", margin: "0.5rem 0.5rem" }} src={liabilities} /> Liabilities</Link>
                          <Link to="/insurance" className="side-menu-block side-menu-title dropdown-organiser"><img style={{ height: "30px", width: "30px", backgroundColor: "white", margin: "0.5rem 0.5rem" }} src={insurance} />   Insurance</Link>
                          <Link to="/income" className="side-menu-block side-menu-title dropdown-organiser"><img style={{ height: "30px", width: "30px", backgroundColor: "white", margin: "0.5rem 0.5rem" }} src={income} />      Income</Link>
                          <Link to="/assistance/create" className="side-menu-block side-menu-title dropdown-organiser"><img style={{ height: "30px", width: "30px", backgroundColor: "white", margin: "0.5rem 0.5rem" }} src={assistance} />  Assistance</Link>
                          <Link to="/budget" className="side-menu-block side-menu-title dropdown-organiser"><img style={{ height: "30px", width: "30px", backgroundColor: "white", margin: "0.5rem 0.5rem" }} src={budget} />      Budget</Link>
                        </div>
                      )}
                    </div>

                    <Link to="/planner" className="side-nav-link-ref">
                      <div className="side-menu-block">
                        <div className="side-menu-image-background">
                          <img src={form} className="img-icon" />
                        </div>
                        <span className="side-menu-title ml-2">Planner</span>
                      </div>
                    </Link>

                    <Link to="/protector" className="side-nav-link-ref">
                      <div className="side-menu-block">
                        <div className="side-menu-image-background">
                          <img src={insurance} className="img-icon" />
                        </div>
                        <span className="side-menu-title ml-2">
                          Protector
                        </span>
                      </div>
                    </Link>

                    <Link to="/schedules" className="side-nav-link-ref">
                      <div className="side-menu-block">
                        <div className="side-menu-image-background">
                          <img src={reports} className="img-icon" />
                        </div>
                        <span className="side-menu-title ml-2">
                          Reports / Schedules
                        </span>
                      </div>
                    </Link>

                    <Link to="/inventory" className="side-nav-link-ref">
                      <div className="side-menu-block">
                        <div className="side-menu-image-background">
                          <img src={dashboard} className="img-icon" />
                        </div>
                        <span className="side-menu-title ml-2">
                          Inventory
                        </span>
                      </div>
                    </Link>

                    <Link
                      onClick={signOut}
                      to="/login"
                      className="side-nav-link-ref"
                    >
                      <div className="side-menu-block">
                        <div className="side-menu-image-background">
                          <img src={dashboard} className="img-icon" />
                        </div>
                        <span className="side-menu-title ml-2">Logout</span>
                      </div>
                    </Link>


                   
                  </li>
                </ul>
              </div>
                      </div>*/}


            {/* <div className="right-buttonDropdown">
              <Icon style={{strokeWidth: "10rem" , stroke: "white"}} className={` icon-organizer ${this.state.isDropdownOpen1 ? 'icon-open' :'icon-close' } ` } type="right" onClick={() => this.setState({ isDropdownOpen1: !this.state.isDropdownOpen1 })} />
              </div>

              {this.state.isDropdownOpen1 && (
              <ClientInfo/>
              )} */}



            <div className="content-page">
              <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom justify-content-between d-none">
                <span
                  className="left-side-collapse-icon"
                  onClick={toggleMenu}
                >
                  <i className="fe-menu"></i>
                  {/* <img src={logo} className="bg-logo" /> */}
                </span>
              </nav>
              <div className="content">
                {/* <Container fluid> */}

                <Suspense fallback={loading()}>{children}</Suspense>
                {/* </Container> */}
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}


const mapStateToProps = (state) => {
  return {
    user: state.rootReducer.loginUser.loginUserData,
    inventory: state.rootReducer.inventory.inventories,

    // inventory: state.Inventory.inventories,
  };
};
export default connect(mapStateToProps, null)(PageLayout);