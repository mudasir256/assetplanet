import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import dashboard1 from "../assets/images/sidebar/clientinfo.png";
import { Icon } from "antd";
import { useHistory, useLocation } from "react-router-dom";
const SidebarSubMenu = ({ item }) => {
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
                to={item.path}
                onClick={() => {
                    item.subNav && showSubnav()
                }}
            >
                <div className={
                    location.pathname == item.path
                        ? `side-menu-block1-active`
                        : `side-menu-block1`
                }
                    onMouseLeave={() => setWhite("")}
                    onMouseOver={() => {
                        setWhite("white")
                    }}>

                    <div >
                        <img src={white === "white" || item.path == location.pathname ? item.whiteImage : item.image} className='img-icon' />

                        {/*  <img src={item.image} className="img-icon" /> */}
                        <span style={{ paddingLeft: "8px" }} className="" >
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
        </>
    )
}

export default SidebarSubMenu
