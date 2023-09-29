import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Button, Menu, Dropdown, Icon, Spin } from 'antd';
import { CaretUpOutlined, CaretDownOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { StyledComponent, SearchAddClientWrap, SearchAddClient, DropdownWrap, DropdownLabel, MenuItemStyle, PaginatedTable, TLine, TWrap, StyledTable, TRow, THead, TextIcon, TBody, TCol, TTitle, TSortCaretArrow, TSortCaretArrowUp, TSortCaretArrowDown, BtnWrap, TitlePagination, PageTitle, StyledPagination, Pager, SpinnerWrap, Actions } from "./ClientInformationTableStyling.js"
import OpenInWindow from '../../../assets/images/page_icons/external-link.svg'
import ClientEditModal from './modals/ClientEditModal.js';
import PlanChangeModal from './modals/PlanChangeModal.js';
import PlanCompareModal from './modals/PlanCompareModal.js';


const ClientInformationTable = () => {
  const routeParams = useParams()
  let pageSize = 10
  const [data, setData] = useState();
  const [showData, setShowData] = useState();
  const [loading, setLoading] = useState(true);
  const refElements = useRef([]);
  const [isDisableAll, setIsDisableAll] = useState(false); // disable all functionalities
  const [isDisable, setIsDisable] = useState(false); // true = (next button disabled, prev button active), false = (prev button disabled, next button active)
  const [totalItems, setTotalItems] = useState(10);
  const [pageNumber, setPageNumber] = useState(1); // initially 1 page is set
  const [itemsPerPage, setItemsPerPage] = useState(pageSize); //page size, number of items per page
  const [totalPages, setTotalPages] = useState(10);
  const [renderFromSort, setRenderFromSort] = useState(false);
  const [compare, setCompare] = useState(false);
  const [addNewPlan, setAddNewPlan] = useState(false);
  const [addNewClient, setAddNewClient] = useState(true);
  const [isOpenPlanChange, setIsOpenPlanChange] = useState(false);
  const [isOpenPlanCompare, setIsOpenPlanCompare] = useState(false);
  const [isOpenClientEdit, setIsOpenClientEdit] = useState(false);

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

  const selectedClient = (client) => {
    if (client.toLowerCase() === "all") { //to show all clients
      setPageNumber(1)
      setTotalPages(Math.ceil(data.length / pageSize))
      setTotalItems(data.length)
      setItemsPerPage(pageSize)
      setIsDisable(false)
      setIsDisableAll(false)
      setShowData(data)
    } else {
      for (let item of data) {
        if (item.client_name.toLowerCase() === client.toLowerCase()) {
          setPageNumber(1)
          setTotalPages(1)
          setTotalItems(1)
          setItemsPerPage(1)
          setIsDisable(false)
          setIsDisableAll(true)
          setShowData([item]) //convert object to array of object because we use map iteration
          break
        }
      }
    }
  }


  const btnEnableDisableHandle = () => {
    if (pageNumber && pageNumber === 1) {
      setIsDisable(false)
    }

    if (pageNumber && pageNumber === totalPages) {
      setIsDisable(true)
    }
  }

  const prevPageHandle = () => {
    if (0 < pageNumber - 1) {
      setPageNumber(prevNum => prevNum - 1)
    }
  }

  const nextPageHandle = () => {
    if (pageNumber + 1 <= totalPages) {
      setPageNumber(prevNum => prevNum + 1)
    }
  }

  const checkSortDataType = (colTitle, dataType) => { // Check data type of the column value
    switch (dataType) {
      case "number":
        return colTitle
      default:
        return colTitle.toLowerCase()
    }
  }

  const sortAscending = (colTitle, dataType) => { // Sort ascending
    return data.sort((a, b) => checkSortDataType(a[colTitle], dataType) < checkSortDataType(b[colTitle], dataType) ? 1 : -1)
  }

  const sortDescending = (colTitle, dataType) => { // Sort descending
    return data.sort((a, b) => checkSortDataType(a[colTitle], dataType) > checkSortDataType(b[colTitle], dataType) ? 1 : -1)
  }


  const sortCol = (e, refIndex, colTitle, dataType) => {
    /*
      refIndex - reference to the column title html
      colTitle - column title text
      dataType - column title data type

      We are referecing the column title and setting a custom attribute "data-ascend" which keeps 
      the track of the click to make sure whether we have to ascend or descend the column 
    */

    e.preventDefault()

    if (isDisableAll) return

    let isAcend = refElements.current[refIndex].getAttribute("data-ascend");
    try {
      isAcend
        ? refElements.current[refIndex].setAttribute("data-ascend", "")
        : refElements.current[refIndex].setAttribute("data-ascend", true)
    } catch (err) {
      refElements.current[refIndex].setAttribute("data-ascend", true)
    }


    isAcend
      ? setShowData(sortAscending(colTitle, dataType))
      : setShowData(sortDescending(colTitle, dataType))

    setRenderFromSort(!renderFromSort)
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
        setTotalItems(results.length)
        setTotalPages(Math.ceil(results.length / pageSize));
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
    setTotalItems(results.length)
    setTotalPages(Math.ceil(results.length / pageSize));
    setLoading(false);
  }, [JSON.stringify(results)]);


  useEffect(() => {
    if (data && !isDisableAll) {
      pageNumber * itemsPerPage > totalItems
        ? setShowData(data.slice(pageNumber * itemsPerPage - itemsPerPage, ((pageNumber * itemsPerPage) - ((pageNumber * itemsPerPage) - totalItems))))
        : setShowData(data.slice(pageNumber * itemsPerPage - itemsPerPage, pageNumber * itemsPerPage))
    }

    btnEnableDisableHandle()
  }, [pageNumber, isDisableAll, loading, renderFromSort]);

  useEffect(() => {
  }, [itemsPerPage, totalItems])


  useEffect(() => {
    window.addEventListener("click", btnEnableDisableHandle);

    // cleanup the listener when component unmout
    return () => window.removeEventListener("click", btnEnableDisableHandle);
  }, [isDisable])


  useEffect(() => {
  }, [isOpenPlanChange, isOpenPlanCompare, isOpenClientEdit])

  const menu = (
    <Menu>
      <Menu.Item key={0} onClick={() => selectedClient("all")}>
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
                                        && <Link className="ant-btn btn-green" to={`/clients/plans/compare`}>Compare Plan</Link>
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
                                          && <Link className="ant-btn btn-gray" to="#">Add New Plan</Link>
                                        )
                                    }

                                    {
                                      addNewClient
                                        ? <Link className="ant-btn btn-blue secondary" to={`/client_new`}>Add New Client</Link>
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

                <PaginatedTable>
                  <Row>
                    <Col>
                      <TitlePagination>
                        <PageTitle> All Clients </PageTitle>

                        <StyledPagination>
                          <BtnWrap onClick={() => prevPageHandle()} >
                            <Button
                              className={isDisableAll ? "" : (isDisable ? "active" : "")}
                              disabled={isDisableAll ? true : (isDisable ? false : true)}>
                              <Icon type="left" />
                            </Button>
                          </BtnWrap>

                          <Pager>
                            {
                              isDisableAll
                                ? <span>{pageNumber}-{itemsPerPage} out of {totalItems}</span>
                                : (
                                  pageNumber * itemsPerPage > totalItems
                                    ? <span>{pageNumber * itemsPerPage - itemsPerPage + 1}-{(pageNumber * itemsPerPage) - ((pageNumber * itemsPerPage) - totalItems)} out of {totalItems}</span>
                                    : <span>{pageNumber * itemsPerPage - itemsPerPage + 1}-{pageNumber * itemsPerPage} out of {totalItems}</span>
                                )
                            }
                          </Pager>

                          <BtnWrap onClick={() => nextPageHandle()}>
                            <Button
                              className={isDisableAll ? "" : (isDisable ? "" : "active")}
                              disabled={isDisableAll ? true : (isDisable ? true : false)} >
                              <Icon type="right" />
                            </Button>
                          </BtnWrap>
                        </StyledPagination>
                      </TitlePagination>

                      <TLine />

                      <TWrap>
                        <StyledTable>
                          <thead>
                            <TRow>
                              <THead className='sort-col' ref={el => refElements.current[0] = el} onClick={(e) => sortCol(e, 0, "client_name", "string")}>
                                <TextIcon>
                                  <TTitle> Client Name </TTitle>

                                  <TSortCaretArrow>
                                    <TSortCaretArrowUp><CaretUpOutlined /></TSortCaretArrowUp>
                                    <TSortCaretArrowDown><CaretDownOutlined /></TSortCaretArrowDown>
                                  </TSortCaretArrow>
                                </TextIcon>
                              </THead>

                              <THead className='sort-col' ref={el => refElements.current[1] = el} onClick={(e) => sortCol(e, 1, "existing_plan_number", "string")}>
                                <TextIcon>
                                  <TTitle> Existing Plan Number </TTitle>
                                  <TSortCaretArrow>
                                    <TSortCaretArrowUp><CaretUpOutlined /></TSortCaretArrowUp>
                                    <TSortCaretArrowDown><CaretDownOutlined /></TSortCaretArrowDown>
                                  </TSortCaretArrow>
                                </TextIcon>
                              </THead>

                              <THead>
                                <TextIcon>
                                  <TTitle> Plan Nickname </TTitle>
                                </TextIcon>
                              </THead>

                              <THead>
                                <TextIcon>
                                  <TTitle> Client Spouse Name </TTitle>
                                </TextIcon>
                              </THead>

                              <THead className='sort-col' ref={el => refElements.current[2] = el} onClick={(e) => sortCol(e, 2, "data_plan_created", "number")}>
                                <TextIcon>
                                  <TTitle> Data Plan Created </TTitle>
                                  <TSortCaretArrow>
                                    <TSortCaretArrowUp><CaretUpOutlined /></TSortCaretArrowUp>
                                    <TSortCaretArrowDown><CaretDownOutlined /></TSortCaretArrowDown>
                                  </TSortCaretArrow>
                                </TextIcon>
                              </THead>

                              <THead>
                                <TextIcon>
                                  <TTitle> Plan Notes </TTitle>
                                </TextIcon>
                              </THead>

                              <THead>
                                <TextIcon>
                                  <TTitle> Action </TTitle>
                                </TextIcon>
                              </THead>
                            </TRow>
                          </thead>
                          <TBody>
                            {
                              loading
                                ? <SpinnerWrap><Spin /></SpinnerWrap>
                                : showData.map((item, index) => {
                                  return (
                                    <TRow key={index} className='table-body-row'>
                                      <TCol>
                                        <TextIcon>
                                          <span>{item.client_name}</span>
                                          <Link rel="noopener noreferrer" to={`/clients/${index}/plans`}>
                                            <img src={OpenInWindow} alt="asset plant icon open in new window" />
                                          </Link>
                                        </TextIcon>
                                      </TCol>
                                      <TCol>
                                        <span>{item.existing_plan_number}</span>
                                      </TCol>
                                      <TCol>
                                        <span>{item.plan_nickname}</span>
                                      </TCol>
                                      <TCol>
                                        <span>{item.client_spouse_name}</span>
                                      </TCol>
                                      <TCol>
                                        <span>{item.data_plan_created}</span>
                                      </TCol>
                                      <TCol>
                                        <span>{item.plan_notes}</span>
                                      </TCol>
                                      <TCol>
                                        <Actions>
                                          <Link rel="noopener noreferrer" to={`/clients/${index}/plans`}>
                                            <span><EyeOutlined /></span>
                                          </Link>
                                          <Link rel="noopener noreferrer" to={`/clients/${index}/edit/plans`}>
                                            <span><EditOutlined /></span>
                                          </Link>
                                          <Link rel="noopener noreferrer" to={``}>
                                            <span><DeleteOutlined /></span>
                                          </Link>
                                        </Actions>
                                      </TCol>
                                    </TRow>
                                  )
                                })
                            }
                          </TBody>
                        </StyledTable>
                      </TWrap>
                    </Col>
                  </Row>
                </PaginatedTable>
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