import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Button, Menu, Dropdown, Icon, Spin } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { SearchAddClientWrap, SearchAddClient, DropdownWrap, DropdownLabel, MenuItemStyle, StyledCollapse, StyledPanel, StyledPanelHead, StyledPanelBody, StyledComponent } from "./ClientInformationStyling.js"
import ClientEditModal from './modals/ClientEditModal.js';
import PlanChangeModal from './modals/PlanChangeModal.js';
import PlanCompareModal from './modals/PlanCompareModal.js';

const ClientInformationTable = () => {
  const routeParams = useParams();
  const [data, setData] = useState();
  const [showData, setShowData] = useState();
  const [loading, setLoading] = useState(true);
  const refCollapseElements = useRef([]);
  const [compare, setCompare] = useState(true);
  const [addNewPlan, setAddNewPlan] = useState(true);
  const [addNewClient, setAddNewClient] = useState(false);
  const [isOpenPlanChange, setIsOpenPlanChange] = useState(false);
  const [isOpenPlanCompare, setIsOpenPlanCompare] = useState(false);
  const [isOpenClientEdit, setIsOpenClientEdit] = useState(false);

  const selectedClient = (client) => {
    if (client.toLowerCase() === "all") { //to show all clients
      setShowData(data)
    } else {
      for (let item of data) {
        if (item.client_name.toLowerCase() === client.toLowerCase()) {
          setShowData([item]) //convert object to array of object because we use map iteration
          break
        }
      }
    }
  }

  const clickedPanelHandle = (refIndex) => {
    for (let i = 0; i < refCollapseElements.current.length; i++) {
      let collapseStatus = refCollapseElements.current[i].style
      i === refIndex
        ? collapseStatus.display = collapseStatus.display === "block" ? "none" : "block"
        : collapseStatus.display = "none"
    }
  }

  const MODAL = {
    CLIENT_EDIT: 'client_edit',
    PLAN_CHANGE: 'plan_change',
    PLAN_COMPARE: 'plan_compare',
  }

  const fnToggleModal = (modal) => {
    if (modal === MODAL.CLIENT_EDIT) {
      setIsOpenClientEdit(!isOpenClientEdit)
    }
    else if (modal === MODAL.PLAN_CHANGE) {
      setIsOpenPlanChange(!isOpenPlanChange)
    }
    else if (modal === MODAL.PLAN_COMPARE) {
      setIsOpenPlanCompare(!isOpenPlanCompare)
    }
  }


  const fetchData = () => {
    setLoading(true);
    fetch(`http://localhost:3100/mockData/allClients.json`, {
      "Content-Type": "application/json",
      "Accept": "application/json"
    })
      .then((res) => res.json())
      .then(results => {
        console.log(results)
        setData(results);
        setShowData(results);
        setLoading(false);
      });
  };

  const results = [
    {
      "key": 1,
      "client_name": "Junaid Rasheed",
      "existing_plan_number": "1a1",
      "plan_nickname": "1a1",
      "client_spouse_name": "Junaid Rasheed",
      "data_plan_created": 1,
      "plan_notes": "Notes",
      "action": ""
    },
    {
      "key": 2,
      "client_name": "Mohsin Shahzad",
      "existing_plan_number": "2b2",
      "plan_nickname": "2b2",
      "client_spouse_name": "Mohsin Shahzad",
      "data_plan_created": 5,
      "plan_notes": "Notes",
      "action": ""
    },
    {
      "key": 3,
      "client_name": "Mr Habib",
      "existing_plan_number": "3c3",
      "plan_nickname": "3c3",
      "client_spouse_name": "Mr Habib",
      "data_plan_created": 10,
      "plan_notes": "Notes",
      "action": ""
    },
    {
      "key": 4,
      "client_name": "Babar Azam",
      "existing_plan_number": "4d4",
      "plan_nickname": "4d4",
      "client_spouse_name": "Babar Azam",
      "data_plan_created": 15,
      "plan_notes": "Notes",
      "action": ""
    },
    {
      "key": 5,
      "client_name": "Waseem Akram",
      "existing_plan_number": "5e5",
      "plan_nickname": "5e5",
      "client_spouse_name": "Waseem Akram",
      "data_plan_created": 20,
      "plan_notes": "Notes",
      "action": ""
    },
    {
      "key": 6,
      "client_name": "Shoaib Akhter",
      "existing_plan_number": "6f6",
      "plan_nickname": "6f6",
      "client_spouse_name": "Shoaib Akhter",
      "data_plan_created": 25,
      "plan_notes": "Notes",
      "action": ""
    },
    {
      "key": 7,
      "client_name": "Shaheen Afridi",
      "existing_plan_number": "7g7",
      "plan_nickname": "7g7",
      "client_spouse_name": "Shaheen Afridi",
      "data_plan_created": 25,
      "plan_notes": "Notes",
      "action": ""
    },
    {
      "key": 8,
      "client_name": "Rizwan Khan",
      "existing_plan_number": "8h8",
      "plan_nickname": "8h8",
      "client_spouse_name": "Rizwan Khan",
      "data_plan_created": 30,
      "plan_notes": "Notes",
      "action": ""
    },
    {
      "key": 9,
      "client_name": "Naseem Shah",
      "existing_plan_number": "9i9",
      "plan_nickname": "9i9",
      "client_spouse_name": "Naseem Shah",
      "data_plan_created": 35,
      "plan_notes": "Notes",
      "action": ""
    },
    {
      "key": 10,
      "client_name": "Haris Rauf",
      "existing_plan_number": "1j1",
      "plan_nickname": "1j1",
      "client_spouse_name": "Haris Rauf",
      "data_plan_created": 40,
      "plan_notes": "Notes",
      "action": ""
    },
    {
      "key": 11,
      "client_name": "Moeen Akhtar",
      "existing_plan_number": "1k1",
      "plan_nickname": "1k1",
      "client_spouse_name": "Moeen Akhtar",
      "data_plan_created": 45,
      "plan_notes": "Notes",
      "action": ""
    },
    {
      "key": 12,
      "client_name": "Majid Khan",
      "existing_plan_number": "1l1",
      "plan_nickname": "1l1",
      "client_spouse_name": "Majid Khan",
      "data_plan_created": 50,
      "plan_notes": "Notes",
      "action": ""
    },
    {
      "key": 13,
      "client_name": "Zaheer Abbas",
      "existing_plan_number": "1m1",
      "plan_nickname": "1m1",
      "client_spouse_name": "Zaheer Abbas",
      "data_plan_created": 55,
      "plan_notes": "Notes",
      "action": ""
    },
    {
      "key": 14,
      "client_name": "Javed Miandad",
      "existing_plan_number": "1n1",
      "plan_nickname": "1n1",
      "client_spouse_name": "Javed Miandad",
      "data_plan_created": 60,
      "plan_notes": "Notes",
      "action": ""
    },
    {
      "key": 15,
      "client_name": "Ijaz Ahmed",
      "existing_plan_number": "1o1",
      "plan_nickname": "1o1",
      "client_spouse_name": "Ijaz Ahmed",
      "data_plan_created": 65,
      "plan_notes": "Notes",
      "action": ""
    },
    {
      "key": 16,
      "client_name": "Ijaz Ahmed",
      "existing_plan_number": "1p1",
      "plan_nickname": "1p1",
      "client_spouse_name": "Ijaz Ahmed",
      "data_plan_created": 70,
      "plan_notes": "Notes",
      "action": ""
    },
    {
      "key": 17,
      "client_name": "Aaqib Javed",
      "existing_plan_number": "1q1",
      "plan_nickname": "1q1",
      "client_spouse_name": "Aaqib Javed",
      "data_plan_created": 70,
      "plan_notes": "Notes",
      "action": ""
    },
    {
      "key": 18,
      "client_name": "Waqar Younis",
      "existing_plan_number": "1r1",
      "plan_nickname": "1r1",
      "client_spouse_name": "Waqar Younis",
      "data_plan_created": 75,
      "plan_notes": "Notes",
      "action": ""
    },
    {
      "key": 19,
      "client_name": "Basit Ali",
      "existing_plan_number": "1s1",
      "plan_nickname": "1s1",
      "client_spouse_name": "Basit Ali",
      "data_plan_created": 80,
      "plan_notes": "Notes",
      "action": ""
    },
    {
      "key": 20,
      "client_name": "Shahid Afridi",
      "existing_plan_number": "1t1",
      "plan_nickname": "1t1",
      "client_spouse_name": "Shahid Afridi",
      "data_plan_created": 85,
      "plan_notes": "Notes",
      "action": ""
    },
    {
      "key": 21,
      "client_name": "Azam Khan",
      "existing_plan_number": "1u1",
      "plan_nickname": "1u1",
      "client_spouse_name": "Azam Khan",
      "data_plan_created": 90,
      "plan_notes": "Notes",
      "action": ""
    }
  ]

  useEffect(() => {
    // fetchData();
    setData(results);
    setShowData(results);
    setLoading(false);
    clickedPanelHandle(0)
  }, []);


  useEffect(() => {
  }, [loading])

  useEffect(() => {
  }, [isOpenPlanChange, isOpenPlanCompare, isOpenClientEdit])



  const menu = (
    <Menu>
      <Menu.Item key={0} onClick={() => selectedClient("all")} disabled={true}>
        <MenuItemStyle>
          All
        </MenuItemStyle>
      </Menu.Item>
      {
        data
          ?
          data.map((item, index) => {
            return (
              <Menu.Item key={index + 1} onClick={() => selectedClient(item.client_name)}>
                <MenuItemStyle>
                  {item.client_name}
                </MenuItemStyle>
              </Menu.Item>
            )
          })
          : <Spin />
      }
    </Menu>
  );


  return (
    <>
      <StyledComponent>
        <Row>
          <Col>
            <Row type="flex" justify="center">
              <Col span={23}>
                <div>
                  <Row>
                    <Col>
                      <SearchAddClientWrap>
                        <SearchAddClient>
                          <Row style={{ width: "100%" }}>
                            <Col span={24}>
                              <Row type="flex" align="middle">
                                <Col xs={24} sm={12}>
                                  <div className='header-btns-wrap btns-left'>
                                    <Row className="list-and-compare" type="flex" align="bottom">
                                      <DropdownWrap>
                                        <DropdownLabel>
                                          Search Client:
                                        </DropdownLabel>
                                        <Dropdown overlay={menu} trigger={['click']} overlayStyle={{ "max-height": "300px", "overflowY": "auto" }} >
                                          <Link className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                            Select Client... <Icon type="down" />
                                          </Link>
                                        </Dropdown>
                                      </DropdownWrap>

                                      {
                                        compare
                                          ? <Link className="ant-btn btn-green" to={`/clients/plans/compare`}>Compare Plan</Link>
                                          : <></>
                                      }
                                    </Row>
                                  </div>
                                </Col>

                                <Col xs={24} sm={12}>
                                  <div className='header-btns-wrap btns-right'>
                                    {
                                      compare
                                        ? <Button className="ant-btn btn-gray" onClick={() => fnToggleModal(MODAL.PLAN_CHANGE)}>Change Plan</Button>
                                        : (
                                          addNewPlan
                                            ? <Link className="ant-btn btn-gray" to="#">Add New Plan</Link>
                                            : <></>
                                        )
                                    }

                                    {
                                      addNewClient
                                        ? <Link className="ant-btn btn-blue secondary" to={`/clients/create/plans`}>Add New Client</Link>
                                        : <Link className="ant-btn btn-blue secondary" to={`/clients/${routeParams.id}/edit/plans`}>Edit Client</Link>
                                    }

                                  </div>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </SearchAddClient>
                      </SearchAddClientWrap>
                    </Col>
                  </Row>
                </div>

                <Row>
                  <Col span={24}>
                    <StyledCollapse className="styled-collapse">
                      <StyledPanel className="styled-panel" onClick={(e) => { clickedPanelHandle(0) }}>
                        <StyledPanelHead>
                          <Row type="flex" align="middle" justify="space-between">
                            <Col>clients information:</Col>
                            <Col><DownOutlined /></Col>
                          </Row>
                        </StyledPanelHead>
                        <StyledPanelBody ref={el => refCollapseElements.current[0] = el}>
                          <Row>
                            <Col xs={24} md={8}>name:</Col>
                            <Col>junaid rasheed</Col>
                          </Row>
                          <Row>
                            <Col xs={24} md={8}>DOB:</Col>
                            <Col>01-01-1980</Col>
                          </Row>
                          <Row>
                            <Col xs={24} md={8}>primary phone number:</Col>
                            <Col>+1 123 456 778</Col>
                          </Row>
                          <Row>
                            <Col xs={24} md={8}>primary email:</Col>
                            <Col>hideinplainsight@gmail.com</Col>
                          </Row>
                          <Row>
                            <Col xs={24} md={8}>address:</Col>
                            <Col>123 main St, Anytown, California, 00010, United States</Col>
                          </Row>
                        </StyledPanelBody>
                      </StyledPanel>

                      <StyledPanel className="styled-panel" onClick={(e) => { clickedPanelHandle(1) }}>
                        <StyledPanelHead>
                          <Row type="flex" align="middle" justify="space-between">
                            <Col>spouse information:</Col>
                            <Col><DownOutlined /></Col>
                          </Row>
                        </StyledPanelHead>
                        <StyledPanelBody ref={el => refCollapseElements.current[1] = el}>
                          <Row>
                            <Col xs={24} md={8}>name:</Col>
                            <Col>tracy johnes</Col>
                          </Row>
                          <Row>
                            <Col xs={24} md={8}>DOB:</Col>
                            <Col>01-01-1980</Col>
                          </Row>
                          <Row>
                            <Col xs={24} md={8}>primary phone number:</Col>
                            <Col>+1 123 456 778</Col>
                          </Row>
                          <Row>
                            <Col xs={24} md={8}>primary email:</Col>
                            <Col>hideinplainsight@gmail.com</Col>
                          </Row>
                        </StyledPanelBody>
                      </StyledPanel>

                      <StyledPanel className="styled-panel" onClick={(e) => { clickedPanelHandle(2) }}>
                        <StyledPanelHead>
                          <Row type="flex" align="middle" justify="space-between">
                            <Col>others information:</Col>
                            <Col><DownOutlined /></Col>
                          </Row>
                        </StyledPanelHead>
                        <StyledPanelBody ref={el => refCollapseElements.current[2] = el}>
                          <Row>
                            <Col xs={24} md={8}>children and other dependents:</Col>
                            <Col>ava johnes</Col>
                          </Row>
                          <Row>
                            <Col xs={24} md={8}>general notes:</Col>
                            <Col>01-01-1980</Col>
                          </Row>
                          <Row>
                            <Col xs={24} md={8}>trusts associated with client:</Col>
                            <Col>Frank and Tracy Truest - 01-01-1980</Col>
                          </Row>
                          <Row>
                            <Col xs={24} md={8}>corporations associated with client:</Col>
                            <Col>Johnes, LLC</Col>
                          </Row>
                          <Row>
                            <Col xs={24} md={8}>charities associated with client:</Col>
                            <Col>Audobon Society</Col>
                          </Row>
                          <Row>
                            <Col xs={24} md={8}>others financially effected by this plan:</Col>
                            <Col>Joe Friend</Col>
                          </Row>
                        </StyledPanelBody>
                      </StyledPanel>
                    </StyledCollapse>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </StyledComponent>


      <ClientEditModal
        isOpen={isOpenClientEdit}
        cbToggle={setIsOpenClientEdit}
      ></ClientEditModal>
      <PlanChangeModal
        isOpen={isOpenPlanChange}
        cbToggle={setIsOpenPlanChange}
      ></PlanChangeModal>
      <PlanCompareModal
        isOpen={isOpenPlanCompare}
        cbToggle={setIsOpenPlanCompare}
      ></PlanCompareModal>
    </>
  )
}


export default ClientInformationTable;