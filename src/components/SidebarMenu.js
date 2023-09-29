import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import dashboard1 from "../assets/images/sidebar/clientinfo.png";
import { Icon } from "antd";
import { useHistory, useLocation } from "react-router-dom";
const SidebarMenu = ({ item }) => {
    const [subnav, setSubnav] = useState(false);
    const [white, setWhite] = useState();
    const [subwhite, setSubWhite] = useState();

    const location = useLocation();
    // const pathname = location;
    console.log("pathname", location.pathname)
    const showSubnav = () => { console.log("show subnav", subnav); setSubnav(!subnav) };

    return (
        <>

            <Link
                to={item.href}
                // className="side-nav-link-re nav-link"
                // style={{ width: "100%" }}
                onClick={() => {
                    item.subNav && showSubnav()
                }}


            >
                <div className={
                    location.pathname == item.href
                        ? `side-menu-block1-active`
                        : `side-menu-block1`
                }
                    // onClick={() => {
                    //     item.subNav && showSubnav()
                    // }}
                    onMouseLeave={() => setWhite("")}
                    onMouseOver={() => {
                        setWhite("white")
                    }}>

                    <div >
                        <img src={white === "white" || item.href == location.pathname ? item.whiteImage : item.image} className='img-icon' />

                        {/*  <img src={item.image} className="img-icon" /> */}
                        <span style={{ paddingLeft: "10px" }} className="" >
                            {item.title}
                        </span>
                    </div>
                    {item.subNav &&
                        <div className="">
                            <Icon type="right" color={white} />

                        </div>
                    }

                </div>

            </Link>
            {/*item.subNav &&
                <ul style={{ position: "absolute", right: "0px" }}>
                    {item.subNav && item.subNav.map((item, index) => (
                        <li key={index}>

                            <div className="dropdown-organise1">
                                <Link to={item.path} className="side-menu-block-submenu "><img style={{ height: "30px", width: "30px", margin: "0.5rem 0.5rem", }} src={item.icon} />{item.title}</Link>
                            </div>
                        </li>
                    ))}
                </ul>
                    */}
            {/*<div className="side-nav-link-ref" style={{ paddingLeft: "1.7rem" }}>
                {subnav && item.subNav && item.subNav.map((item, index) => {
                    console.log("show sidenav")
                    return (

                        <div className="dropdown-organise1"
                        // onMouseLeave={() => setSubWhite("")}
                        // onMouseOver={() => {
                        //     console.log("here on mosue");
                        //     setSubWhite("white")
                        // }}
                        >
                            <Link to={item.path} className="side-menu-block-submenu "><img style={{ height: "30px", width: "30px", margin: "0.5rem 0.5rem", }} src={item.icon} />      {item.title}</Link>
                        </div>

                    );
                })}
            </div>*/}
        </>
    )
}

export default SidebarMenu
