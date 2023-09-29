import React, { useEffect, useState } from 'react'
import { Row, Col } from "antd";
import { Button } from "../../components/button/Button";
import Loader from '../../components/styled-components/loader/loader';
import DEATH_API from "../../apis/death.api";
import { useDispatch, useSelector } from "react-redux";
import { setActivated } from '../../redux/slices/loginSlice';
import swal from "sweetalert";
import axios from 'axios';
import ROUTES from '../../config/routes';

const DelegateAccess = () => {
    const activated = useSelector((state) => state.rootReducer.loginUser.activated);
    console.log("activated", activated)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [trusteeList, setTrusteeList] = useState([]);

    useEffect(() => {
        getClientList();

    }, []);
    const getClientList = async () => {
        try {
            (async () => {
                setLoading(true)
                let responseData = await DEATH_API.fetchClientList();
                let newData = [];
                if (responseData.data[0] && responseData.data[0].users) {
                    newData = responseData.data[0].users
                    // console.log("newData",newData)
                    newData.map((item, index) => (
                        item['Status'] = false
                    ))
                }

                console.log("newData", newData)
                localStorage.setItem("delegateUsers", JSON.stringify(newData))
                setLoading(false)
                if (isNaN(localStorage.getItem("User"))) {
                    console.log("not a number in username")
                    getContactList();
                }
            })()
        } catch (error) {
            setLoading(false)
            console.log("error")
        }
    }
    const getContactList = async () => {
        setLoading(true)
        let responseData = await DEATH_API.fetchTrusteeList();
        // console.log("client contacts", responseData.data[0].clients_contact_lists)
        if (responseData.data[0].clients_contact_lists) {

            setTrusteeList(responseData.data[0].clients_contact_lists)
        }
        setLoading(false)
    }
    const [accessableUsers, setAccessableUsers] = useState([]);
    const users =localStorage.getItem("delegateUsers")!=="undefined" && JSON.parse(localStorage.getItem("delegateUsers"))

    // console.log("users", users)
    useEffect(() => {
        // Perform localStorage action
        // const users = JSON.parse(localStorage.getItem("delegateUsers"))
        // console.log("users", users)
        getClientList();
        const users = localStorage.getItem("delegateUsers")!=="undefined" && JSON.parse(localStorage.getItem("delegateUsers"))
        console.log("useEffect activated", activated)
        setAccessableUsers(users);
    }, [activated])

    const handleClick = (id) => {
        console.log("id", id)
        users.map((item, index) => {
            if (id == item.id) {
                console.log("here")
                item['Status'] = true
                localStorage.setItem("delegateUsers", JSON.stringify(users))
            }
            else {
                item['Status'] = false
            }
        })
        // console.log("accessableUsers", accessableUsers)
        // dispatch(setActivated(!activated))
    }
    const handleAccess = (id) => {
        console.log("edit id", id)
    }
    const ClinetAccess = [
        // {
        //     clientName: "Zahid",
        // },
        // {
        //     clientName: "Ahsan",
        // },

    ];
    const TrusteeAccess = [
        // {
        //     clientName: "Zahid",
        // },
        // {
        //     clientName: "Ahsan",
        // },

    ];

    return (
        <div>
            <div className="asset-heading">
                <Row style={{ textAlign: "center" }}>
                    <div>
                        <h2
                            style={{ color: "white" }}
                            className=" font-weight"
                        >
                            Delegate Access
                        </h2>
                    </div>
                </Row>

            </div>
            <Row style={{ textAlign: "center" }}>
                {isNaN(localStorage.getItem("User")) &&
                    <Button style={{ width: "30%" }}
                        onClick={() => {
                            console.log("My account")
                            localStorage.removeItem("accessId");
                            localStorage.setItem("role", localStorage.getItem("duplicateRole"))
                            getClientList();
                            dispatch(setActivated(!activated))

                        }}
                    >
                        My Account
                    </Button>
                }
                {/*  <div>
                    <h2
                        style={{ color: "black" }}
                        className=" font-weight"
                    >
                        Account I have Access to
                    </h2>
                </div>*/}
            </Row>
            {/*
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>

                {trusteeList && trusteeList.map((item, index) => (
                    <Col key={index} style={{ width: "30%" }} className='DelegateCard' >
                        <div
                            className='DelegateClientSection'
                        >
                            <p className='DelegateHeading'>{item.firstName} + {item.lastName}</p>
                        </div>
                        <div
                            className='DelegateClientSection'
                        >
                            <p className='DelegateHeading'>Module I Can Access</p>
                        </div>
                        <p className='DelegateSubHeading'>Asset</p>
                        <p className='DelegateSubHeading'>Liabilities</p>
                        <p className='DelegateSubHeading'>If I Die</p>
                        <div
                            className='DelegateClientSection'
                        >
                            <Button style={{ width: "80%" }}>Edit Access</Button>
                        </div>
                    </Col>

                ))}
            </div>
        */}
            <Row
                gutter={[16, 16]}
                className='RowContainer'
            >
                {/* LEFT BOX */}
                <Col
                    xs={24}
                    sm={12}
                    lg={12}
                    xl={12}
                    style={{ display: "flex" }}
                >
                    <Row
                        className='DelegateSection'

                    >
                        <Col style={{ height: "auto" }}>
                            <p className="left-black">People With Access to My Account</p>
                        </Col>
                        {trusteeList && trusteeList.map((item, index) => (
                            item.isTrusted &&
                            <Col key={index} className='DelegateCard' >
                                <div
                                    className='DelegateClientSection'
                                >
                                    <p className='DelegateHeading'>{item.firstName} {item.lastName}</p>
                                </div>
                                <div
                                    className='DelegateClientSection'
                                >
                                    <p className='DelegateHeading'>Module I have Granted Access</p>
                                </div>
                                <p className='DelegateSubHeading'>Asset</p>
                                <p className='DelegateSubHeading'>Liabilities</p>
                                <p className='DelegateSubHeading'>If I Die</p>
                                <div
                                    style={{ marginTop: "8px" }}
                                    className='DelegateClientSection'
                                >
                                <p style={{ fontWeight: "500", fontSize: "18px", color: "green" }}></p>
                        {/* <Button style={{ width: "30%" }} onClick={() => { handleAccess(item.id); }}>Edit Now</Button>*/}
                                </div>
                            </Col>

                        ))}


                    </Row>
                </Col>

                {/* RIGHT BOX */}
                <Col
                    xs={24}
                    sm={12}
                    lg={12}
                    xl={12}
                    style={{ display: "flex" }}
                >
                    <Row
                        className='DelegateSection'

                    >
                        <Col style={{ height: "auto" }}>
                            <p className="left-black">Account I have Access to</p>
                        </Col>
                        {users && users.map((item, index) => (
                            <Col key={index} className='DelegateCard' >
                                <div
                                    className='DelegateClientSection'
                                >
                                    <p className='DelegateHeading'>{item.userName}</p>
                                </div>
                                <div
                                    className='DelegateClientSection'
                                >
                                    <p className='DelegateHeading'>Module I can Access</p>
                                </div>
                                <p className='DelegateSubHeading'>Asset</p>
                                <p className='DelegateSubHeading'>Liabilities</p>
                                <p className='DelegateSubHeading'>If I Die</p>
                                <div
                                    className='DelegateClientSection'
                                    style={{ marginTop: "8px" }}
                                >

                                    {!item.Status ?

                                        (item.id == localStorage.getItem("accessId") ?
                                            <p style={{ fontWeight: "500", fontSize: "18px", color: "green" }}>Activated</p>
                                            :
                                            <Button style={{ width: "30%" }}
                                                onClick={() => {
                                                    console.log("client id", item.role.name)
                                                    handleClick(item.id)
                                                    localStorage.setItem("accessId", item.id)
                                                    if (JSON.parse(localStorage.getItem("role")) == "test111") {
                                                        console.log("here in client side")
                                                        localStorage.setItem("duplicateRole", localStorage.getItem("role"))
                                                        console.log("item.role", item.role.name)
                                                        localStorage.setItem("role", JSON.stringify(item.role.name))

                                                    }

                                                    dispatch(setActivated(!activated))
                                                    getClientList();
                                                }}
                                            >
                                                Access Now
                                            </Button>)
                                        : <p style={{ fontWeight: "500", fontSize: "18px", color: "green" }}>Activated</p>
                                    }
                                </div>

                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
            <Loader isLoading={loading} />
        </div>
    )
}

export default DelegateAccess
