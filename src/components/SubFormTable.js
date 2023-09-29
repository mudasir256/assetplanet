import React, { Component } from "react";
import { connect } from "react-redux";
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import {
  Table,
  DatePicker,
  Button,
  Select,
  Row,
  Col,
  Input,
  Radio,
  Checkbox,
  Modal,
  Icon,
  Divider,
} from "antd";
import uuidv1 from "uuid/v1";
import Percent from "./form/Percent";
import PhoneNumber from "./form/PhoneNumber";
import WebAddress from "./form/WebAddress";
import Email from "./form/Email";
import TextArea from "antd/lib/input/TextArea";
import Currency from "./form/Currency";
import moment from "moment";
import "./SubFormTable.css";
import { WebcamStreamCapture } from "../helpers/Recorder";

const { Option } = Select;
// const customWidth = 150;
const dateFormat = "MM/DD/YYYY";

class SubFormTable extends Component {
  constructor(props) {
    super(props);

    var cols = [];
    var rows = [];
    let rowsCount = null;
    // let currentRowCount = 0;

    if (props.colsFormat) {
      cols = this.generateCols(props.colsFormat);
    }

    if (props.noOfRows) {
      rowsCount = props.noOfRows;
    }

    if (props.rows) {
      rows = props.rows;
    }

    this.state = {
      rows: rows,
      cols: cols,
      show_model: null,
      delete_modal: false,
      currentUuid: null,
      currentRecord: null,
      // tableWidth:props.tableWidth
    };

    this.deleteRow = this.deleteRow.bind(this);
    this.addNewRow = this.addNewRow.bind(this);
    this.updateRow = this.updateRow.bind(this);

    this.handleFormInputChange = this.handleFormInputChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);

    // if (props.colsFormat) {
    //   cols = this.generateCols(props.colsFormat);
    // }

    // if (props.rows) {
    //   rows = props.rows;
    // }

    // this.state = {
    //   rows: rows,
    //   cols: cols,
    // };

    // this.deleteRow = this.deleteRow.bind(this);
    // this.addNewRow = this.addNewRow.bind(this);
    // this.updateRow = this.updateRow.bind(this);

    // this.handleFormInputChange = this.handleFormInputChange.bind(this);
    // this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
    // this.handleSelectChange = this.handleSelectChange.bind(this);
    this.regeNumber = this.regeNumber.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      rows: nextProps.rows,
    });
  }

  deleteModal = () => {
    return (
      <Modal
        closable={false}
        width="40vw"
        centered
        visible={this.state.delete_modal}
        title={"Are you sure you want to remove ?"}
        footer={false}
        style={{ textAlign: "center" }}
      >
        <Row key={(Math.random() + 1).toString(36).substring(2)}>
          <Col key={(Math.random() + 1).toString(36).substring(2)} span={6}></Col>
          <Col key={(Math.random() + 1).toString(36).substring(2)} span={6}>
            <Button
              style={{ background: "#1cb2f5" }}
              type="primary"
              size={3}
              onClick={() => {
                if (this.state.currentUuid && this.state.currentRecord)
                  this.deleteRow(
                    this.state.currentUuid,
                    this.state.currentRecord
                  );
              }}
            >
              <span style={{ fontSize: "18px" }}>Yes</span>
            </Button>
          </Col>
          <Col key={(Math.random() + 1).toString(36).substring(2)} span={6}>
            <Button
              style={{ background: "#ea5252" }}
              type="primary"
              size={3}
              onClick={() => {
                this.setState({ delete_modal: false });
              }}
            >
              <span style={{ fontSize: "18px" }}>No</span>
            </Button>
          </Col>
          <Col span={6}></Col>
        </Row>
      </Modal>
    );
  };

  generateCols(colsFormat = []) {
    var cols = [];

    // cols.push({
    //   title: "",
    //   dataIndex: "uuid",
    //   key: "uuid",
    //   render: (uuid, record) => (
    //     <Button
    //       type="link"
    //       icon="close"
    //       onClick={() => this.deleteRow(uuid, record)}
    //     ></Button>
    //   ),
    // });

    colsFormat.forEach((colFormat) => {
      const { title, dataIndex, key, fields } = colFormat;
      const { customWidth } = this.props;

      let newCol = {
        title,
        dataIndex,
        key,
        render: (text, record) => {
          let col_span = parseInt(24 / colFormat["fields"].length);

          return (
            <Row gutter={8}>
              {fields.map((field, index) => {
                const { type, name } = field;

                switch (type) {
                  case "Input":
                    return (
                      <Col span={col_span} key={(Math.random() + 1).toString(36).substring(2)}>
                        <Input
                          // style={customWidth ? { width: customWidth } : null}
                          // style={{width:"10rem"}}

                          placeholder={field.placeholder}
                          disabled={field.disabled}
                          name={name}
                          value={record[name]}
                          onChange={(event) =>
                            this.handleInputChange(event, text, record)
                          }
                        />
                      </Col>
                    );

                  case "Percent":
                    return (
                      <Col span={col_span} key={(Math.random() + 1).toString(36).substring(2)}>
                        <Percent
                          style={customWidth ? { width: customWidth } : null}
                          placeholder={field.placeholder}
                          disabled={field.disabled}
                          name={name}
                          value={record[name]}
                          onChange={(event) =>
                            this.handleInputChange(event, text, record)
                          }
                        />
                      </Col>
                    );

                  case "PhoneNumber":
                    return (
                      <Col span={col_span} key={(Math.random() + 1).toString(36).substring(2)}>
                        <PhoneNumber
                          style={customWidth ? { width: customWidth } : null}
                          placeholder={field.placeholder}
                          disabled={field.disabled}
                          name={field.name}
                          value={record[field.name]}
                          onChange={(event) =>
                            this.regeNumber(event, text, record)
                          }
                        />
                      </Col>
                    );

                  case "WebAddress":
                    return (
                      <Col span={col_span} key={(Math.random() + 1).toString(36).substring(2)}>
                        <WebAddress
                          style={customWidth ? { width: customWidth } : null}
                          placeholder={field.placeholder}
                          disabled={field.disabled}
                          name={field.name}
                          value={record[field.name]}
                          onChange={(event) =>
                            this.handleInputChange(event, text, record)
                          }
                        />
                      </Col>
                    );

                  case "Email":
                    return (
                      <Col span={col_span} key={(Math.random() + 1).toString(36).substring(2)}>
                        <Email
                          style={customWidth ? { width: customWidth } : null}
                          placeholder={field.placeholder}
                          disabled={field.disabled}
                          name={field.name}
                          value={record[field.name]}
                          onChange={(event) =>
                            this.handleInputChange(event, text, record)
                          }
                        />
                      </Col>
                    );

                  case "Currency":
                    return (
                      <Col span={col_span} key={(Math.random() + 1).toString(36).substring(2)}>
                        <Currency
                          style={
                            this.props.customWidth
                              ? { width: customWidth }
                              : null
                          }
                          placeholder={field.placeholder}
                          disabled={field.disabled}
                          name={field.name}
                          value={
                            typeof record[field.name] == "undefined"
                              ? ""
                              : record[field.name]
                          }
                          onChange={(event) =>
                            this.handleInputChange(event, text, record)
                          }
                        />
                      </Col>
                    );

                  case "TextArea":
                    return (
                      <Col span={col_span} key={(Math.random() + 1).toString(36).substring(2)}>
                        <TextArea
                          style={customWidth ? { width: customWidth } : null}
                          placeholder={field.placeholder}
                          disabled={field.disabled}
                          name={field.name}
                          value={record[field.name]}
                          onChange={(event) =>
                            this.handleInputChange(event, text, record)
                          }
                        />
                      </Col>
                    );

                  case "Checkbox":
                    return (
                      <Col span={col_span} key={(Math.random() + 1).toString(36).substring(2)}>
                        <Checkbox
                          placeholder={field.placeholder}
                          disabled={field.disabled}
                          name={field.name}
                          value={record[field.name]}
                        />
                      </Col>
                    );

                  case "Select":
                    return (
                      <Col span={col_span} key={(Math.random() + 1).toString(36).substring(2)}>
                        <Select
                          mode="multiple"
                          showSearch
                          // style={customWidth ? { width: customWidth } : null}
                          style={{ width: "10rem" }}
                          className="select-custom"
                          placeholder={field.placeholder}
                          onChange={(value) =>
                            this.handleSelectChange(
                              field.name,
                              value,
                              text,
                              record
                            )
                          }
                          disabled={field.disabled}
                          value={record[field.name]}
                        >
                          {field.values.map((value, vindex) => (
                            <Option key={vindex} value={value}>
                              {value}
                            </Option>
                          ))}
                        </Select>
                      </Col>
                    );

                  case "Radio":
                    return (
                      <Col span={col_span} key={(Math.random() + 1).toString(36).substring(2)}>
                        <Radio.Group
                          onChange={(value) =>
                            this.handleSelectChange(field.name, value)
                          }
                          disabled={field.disabled}
                          value={record[field.name]}
                        >
                          {field.values.map((value, vindex) => (
                            <Radio key={vindex} value={value}>
                              {value}
                            </Radio>
                          ))}
                        </Radio.Group>
                      </Col>
                    );

                  case "DatePicker":
                    return (
                      <Col span={col_span} key={(Math.random() + 1).toString(36).substring(2)}>
                        <DatePicker
                          style={
                            customWidth
                              ? { width: customWidth }
                              : { width: "100%" }
                          }
                          format={dateFormat}
                          onChange={(date, dateString) =>
                            this.handleDatePickerChange(
                              field.name,
                              date,
                              dateString,
                              text,
                              record
                            )
                          }
                          disabled={field.disabled}
                          value={
                            typeof record[field.name] == "undefined" ||
                              record[field.name] == "" ||
                              record[field.name] == null
                              ? null
                              : moment(record[field.name], dateFormat)
                          }
                        />
                      </Col>
                    );

                  case "Document":
                    return (
                      <Col span={col_span} key={(Math.random() + 1).toString(36).substring(2)}>
                        <div className="doc-upload">
                          <input
                            id="file-input"
                            type="file"
                          // style={{ width: "100%" }}
                          // onChange={(date, dateString) => this.handleDatePickerChange(field.name, date, dateString, text, record)}
                          // value={typeof record[field.name] == 'undefined' || record[field.name] == '' || record[field.name] == null ? null : moment(record[field.name], dateFormat)}
                          />
                          <label for="file-input">
                            <Icon
                              className="mt-2 ml-2"
                              style={{ fontSize: "23px" }}
                              type="upload"
                            ></Icon>
                          </label>
                        </div>
                      </Col>
                    );

                  case "Video":
                    return (
                      <React.Fragment key={(Math.random() + 1).toString(36).substring(2)}>
                        {this.state.show_model === field.name ? (
                          <Modal
                            closable={false}
                            width="53vw"
                            centered
                            visible={true}
                            title={"Record Video"}
                            footer={false}
                          >
                            <WebcamStreamCapture
                              onCancel={this.closeModal}
                            ></WebcamStreamCapture>
                          </Modal>
                        ) : (
                          ""
                        )}
                        <Col
                          span={col_span}
                          key={index}
                          style={{
                            flexDirection: "column",
                          }}
                        >
                          <Button
                            style={{
                              // width: "100%",
                              marginBottom: "5px",
                            }}
                            name={field.name}
                            onClick={(e) => {
                              this.setState({ show_model: e.target.name });
                            }}
                          >
                            <Icon
                              style={{ fontSize: "23px" }}
                              type="camera"
                            ></Icon>
                            {field.title}
                          </Button>
                        </Col>
                      </React.Fragment>
                    );
                }
              })}
            </Row>
          );
        },
      };

      cols.push(newCol);
    });

    // for (var cindex = 0; cindex < colsFormat.length; cindex++) {
    //   let colFormat = colsFormat[cindex];

    //   var newCol = {
    //     title: colFormat["title"],
    //     dataIndex: colFormat["dataIndex"],
    //     key: colFormat["key"],
    //     render: (text, record) => {
    //       var col_span = parseInt(24 / colFormat["fields"].length);
    //       return (
    //         <Row gutter={8}>
    //           {colFormat["fields"].map((field, index) => {
    //             if (field.type == "Input") {
    //               return (
    //                 <Col span={col_span} key={index}>
    //                   <Input
    //                     style={
    //                       this.props.customWidth ? { width: customWidth } : null
    //                     }
    //                     placeholder={field.placeholder}
    //                     disabled={field.disabled}
    //                     name={field.name}
    //                     value={record[field.name]}
    //                     onChange={(event) =>
    //                       this.handleInputChange(event, text, record)
    //                     }
    //                   />
    //                 </Col>
    //               );
    //             } else if (field.type == "Percent") {
    //               return (
    //                 <Col span={col_span} key={index}>
    //                   <Percent
    //                     placeholder={field.placeholder}
    //                     disabled={field.disabled}
    //                     name={field.name}
    //                     value={record[field.name]}
    //                     onChange={(event) =>
    //                       this.handleInputChange(event, text, record)
    //                     }
    //                   />
    //                 </Col>
    //               );
    //             } else if (field.type == "PhoneNumber") {
    //               return (
    //                 <Col span={col_span} key={index}>
    //                   <PhoneNumber
    //                     placeholder={field.placeholder}
    //                     disabled={field.disabled}
    //                     name={field.name}
    //                     value={record[field.name]}
    //                     onChange={(event) =>
    //                       this.regeNumber(event, text, record)
    //                     }
    //                   />
    //                 </Col>
    //               );
    //             } else if (field.type == "WebAddress") {
    //               return (
    //                 <Col span={col_span} key={index}>
    //                   <WebAddress
    //                     placeholder={field.placeholder}
    //                     disabled={field.disabled}
    //                     name={field.name}
    //                     value={record[field.name]}
    //                     onChange={(event) =>
    //                       this.handleInputChange(event, text, record)
    //                     }
    //                   />
    //                 </Col>
    //               );
    //             } else if (field.type == "Email") {
    //               return (
    //                 <Col span={col_span} key={index}>
    //                   <Email
    //                     placeholder={field.placeholder}
    //                     disabled={field.disabled}
    //                     name={field.name}
    //                     value={record[field.name]}
    //                     onChange={(event) =>
    //                       this.handleInputChange(event, text, record)
    //                     }
    //                   />
    //                 </Col>
    //               );
    //             } else if (field.type == "Currency") {
    //               return (
    //                 <Col span={col_span} key={index}>
    //                   <Currency
    //                     style={
    //                       this.props.customWidth ? { width: customWidth } : null
    //                     }
    //                     placeholder={field.placeholder}
    //                     disabled={field.disabled}
    //                     name={field.name}
    //                     value={
    //                       typeof record[field.name] == "undefined"
    //                         ? ""
    //                         : record[field.name]
    //                     }
    //                     onChange={(event) =>
    //                       this.handleInputChange(event, text, record)
    //                     }
    //                   />
    //                 </Col>
    //               );
    //             } else if (field.type == "TextArea") {
    //               return (
    //                 <Col span={col_span} key={index}>
    //                   <TextArea
    //                     placeholder={field.placeholder}
    //                     disabled={field.disabled}
    //                     name={field.name}
    //                     value={record[field.name]}
    //                     onChange={(event) =>
    //                       this.handleInputChange(event, text, record)
    //                     }
    //                   />
    //                 </Col>
    //               );
    //             } else if (field.type == "Checkbox") {
    //               return (
    //                 <Col span={col_span} key={index}>
    //                   <Checkbox
    //                     placeholder={field.placeholder}
    //                     disabled={field.disabled}
    //                     name={field.name}
    //                     value={record[field.name]}
    //                   />
    //                 </Col>
    //               );
    //             } else if (field.type == "Select") {
    //               return (
    //                 <Col span={col_span} key={index}>
    //                   <Select
    //                     showSearch
    //                     style={
    //                       this.props.customWidth ? { width: customWidth } : null
    //                     }
    //                     placeholder={field.placeholder}
    //                     onChange={(value) =>
    //                       this.handleSelectChange(
    //                         field.name,
    //                         value,
    //                         text,
    //                         record
    //                       )
    //                     }
    //                     disabled={field.disabled}
    //                     value={record[field.name]}
    //                   >
    //                     {field.values.map((value, vindex) => (
    //                       <Option key={vindex} value={value}>
    //                         {value}
    //                       </Option>
    //                     ))}
    //                   </Select>
    //                 </Col>
    //               );
    //             } else if (field.type == "Radio") {
    //               return (
    //                 <Col span={col_span} key={index}>
    //                   <Radio.Group
    //                     onChange={(value) =>
    //                       this.handleSelectChange(field.name, value)
    //                     }
    //                     disabled={field.disabled}
    //                     value={record[field.name]}
    //                   >
    //                     {field.values.map((value, vindex) => (
    //                       <Radio key={vindex} value={value}>
    //                         {value}
    //                       </Radio>
    //                     ))}
    //                   </Radio.Group>
    //                 </Col>
    //               );
    //             } else if (field.type == "DatePicker") {
    //               return (
    //                 <Col span={col_span} key={index}>
    //                   <DatePicker
    //                     style={
    //                       this.props.customWidth
    //                         ? { width: customWidth }
    //                         : { width: "100%" }
    //                     }
    //                     format={dateFormat}
    //                     onChange={(date, dateString) =>
    //                       this.handleDatePickerChange(
    //                         field.name,
    //                         date,
    //                         dateString,
    //                         text,
    //                         record
    //                       )
    //                     }
    //                     disabled={field.disabled}
    //                     value={
    //                       typeof record[field.name] == "undefined" ||
    //                       record[field.name] == "" ||
    //                       record[field.name] == null
    //                         ? null
    //                         : moment(record[field.name], dateFormat)
    //                     }
    //                   />
    //                 </Col>
    //               );
    //             }
    //           })}
    //         </Row>
    //       );
    //     },
    //   };
    //   cols.push(newCol);
    // }

    cols.push({
      title: "",
      dataIndex: "uuid",
      key: "uuid",
      render: (uuid, record) => (
        <Button
          type="link"
          style={{ fontSize: "21px" }}
          icon="edit"
          onClick={() => this.updateRow(uuid, record)}
        ></Button>
      ),
    });

    cols.push({
      title: "",
      dataIndex: "uuid",
      key: "uuid",
      render: (uuid, record) => (
        <Button
          type="link"
          style={{ fontSize: "21px" }}
          icon="delete"
          // onClick={() => this.deleteRow(uuid, record)}
          onClick={() => {
            this.setState({
              delete_modal: true,
              currentUuid: uuid,
              currentRecord: record,
            });
          }}
        ></Button>
      ),
    });

    return cols;
  }

  updateRow(uuid, key, value) {
    // alert("in update")
    let rows = this.state.rows;
    for (var rindex = 0; rindex < rows.length; rindex++) {
      if (rows[rindex].uuid == uuid) {
        rows[rindex][key] = value;
        break;
      }
    }

    this.setState({
      rows: rows,
    });

    this.props.cbFormChange(rows);
  }

  handleFormInputChange(uuid, name, value) {
    this.updateRow(uuid, name, value);
  }

  closeModal = () => {
    this.setState({ show_model: null });
  };

  handleInputChange(event, text, record) {
    event.preventDefault();
    const { name, value } = event.target;

    this.handleFormInputChange(record.uuid, name, value);
  }
  regeNumber(event, text, record) {
    event.preventDefault();
    const { name, value } = event.target;
    const re = /^[0-9\b]+$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      this.handleFormInputChange(record.uuid, name, value);
    }
  }
  handleDatePickerChange(name, date, dateString, text, record) {
    this.handleFormInputChange(record.uuid, name, dateString);
  }

  handleSelectChange(name, value, text, record) {
    this.handleFormInputChange(record.uuid, name, value);
  }

  deleteRow(uuid, record) {
    let rows = this.state.rows;
    for (var rindex = 0; rindex < rows.length; rindex++) {
      if (rows[rindex].uuid == uuid) {
        rows.splice(rindex, 1);
        break;
      }
    }

    this.setState({
      rows: rows,
      currentUuid: null,
      currentRecord: null,
      delete_modal: false,
    });

    this.props.cbFormChange(rows);
  }

  addNewRow() {
    let rows = this.state.rows;

    rows.push({
      uuid: uuidv1(),
      key: uuidv1(),
    });

    this.setState({
      rows: rows,
    });
  }


  render() {
    //generate cols based on cols format
    // if(this.props.colsFormat){
    //     let cols = this.generateCols(this.props.colsFormat);
    // }
    console.log("rows count", this.state.rows);
    const { addNewButton, image } = this.props;
    return (
      <div>
        {this.deleteModal()}
        <div className="subform-parent">
          <h2 className="text-center font-weight-bold mb-4">
            {image ? (
              <img
                src={image}
                height={85}
                width={85}
                style={{ marginRight: "10px" }}
              ></img>
            ) : null}
            {this.props.title}
          </h2>
          <div className="subform-desc text-center">
            {this.props.description}
          </div>
          <div style={{ width: this.state.rows.length > 0 ? this.props.tableWidth : "100%" }}>
            <Table
              pagination={false}
              dataSource={this.state.rows}
              columns={this.state.cols}
              scroll={{ x: this.props.scroll }}
              locale={{ emptyText: "There is no data" }}
            />
          </div>
        </div>
        {addNewButton && (
          <div style={{ textAlign: "center" }}>
            <Button type="link" onClick={this.addNewRow}>
              Add New
            </Button>
          </div>
        )}
        {this.props.addNewButtonben && (
          <div style={{ marginBottom: "30px", textAlign: "center" }}>
            <Button type="link" onClick={this.addNewRow}>
              Add Another Beneficiary
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default connect()(SubFormTable);
