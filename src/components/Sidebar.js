import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import logo from "../assets/images/asset-planet-background.png";
import dashboard1 from "../assets/images/sidebar/clientinfo.png";
import dashboard2 from "../assets/images/sidebar/clientinfowhite.png";
import { sideItemsClient } from './SidebarConstants';
import SidebarMenu from './SidebarMenu';
import SidebarSubMenu from './SidebarSubMenu';

const Sidebar = () => {
    const [isMenuOpened, setisMenuOpened] = useState(true)
    const [accessId, setAccessId] = useState("");
    const activated = useSelector((state) => state.rootReducer.loginUser.activated);
    const [defaultValueName, setDefaultValueName] = useState("Me")
    const [userRoles, setUserRoles] = useState("");
    const [userss, setUserss] = useState("");
    const [active, setActive] = useState();
    const location = useLocation();

    const history = useHistory();

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

    const toggleMenu = (e) => {
        e.preventDefault();
        // this.setState({ isMenuOpened: !this.state.isMenuOpened });
        setisMenuOpened(!isMenuOpened)
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


    return (
        <div className="left-side-menu" style={{ background: "white" }} >
            <div
                style={{
                    height: "70px",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <span
                    className="left-side-collapse-icon-custom"
                // onClick={toggleMenu}
                >
                    {/*<i className="fe-menu"></i>*/}
                    <img src={logo} className="bg-logo" style={{ width: "85%", height: "32.4px" }} />
                </span>
            </div>
            <div id="sidebar-menu" className="active">

                <ul className="metismenu in nav" id="nav">

                    <li>
                        {userRoles && userss && userss.length > 0 &&
                            <Link
                                to="/delgateAccess"
                                className=""
                            >
                                <div className={
                                    location.pathname == "/delgateAccess"
                                        ? `side-menu-block1-active`
                                        : `side-menu-block1`
                                }>
                                    <div>
                                        <img src={location.pathname == "/delgateAccess" ? dashboard2 : dashboard1} className="img-icon" />
                                        <span style={{ paddingLeft: "10px" }} className="" >
                                            Delegate Access
                                        </span>
                                    </div>


                                </div>

                            </Link>
                        }
                    </li>


                    {sideItemsClient.map((item, index) => (

                        <li key={index}
                            style={{ display: "flex", flexDirection: "row" }}
                        >
                            <SidebarMenu item={item} />
                            {item.subNav &&
                                <ul style={{ padding: "10px" }}>
                                    {item.subNav.map((item, index) => (
                                        <li key={index} style={{}}>
                                            <SidebarSubMenu item={item} />

                                        </li>
                                    ))}
                                </ul>
                            }
                        </li>

                    ))}

                    <li>
                        <Link
                            onClick={signOut}
                            to="/login"
                        >
                            <div className="side-menu-block1">
                                <div >
                                    <img src={dashboard1} className="img-icon" />
                                    <span style={{ paddingLeft: "10px" }} className="" >
                                        Logout
                                    </span>
                                </div>

                            </div>

                        </Link>
                    </li>


                </ul>
            </div>
        </div >
    )
}

export default Sidebar
