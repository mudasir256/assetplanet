import React, { Component } from "react";
import { Row, Col, Button, Form, Input, Icon, DatePicker, Select } from "antd";
import Header from "../components/header";
import Footer from "../components/footer";
import Add from "../components/add";
import divorce from "../../../assets/images/latest/Divorce.png";
import "./divorce.css";
import ToggleCustom from "../../ToggleCustom";

const { Option } = Select;

const formName = "taxReturn";

class DivorceDetailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      separationDate: "separationDate",
      marriageDate: "marriageDate",
      countryOfPetition: "countryOfPetition",
      pregnant:"pregnant",
      petitioner:"petitioner",
      county_Petition_list:[
        "Alameda County",
        "Alpine County",
        "Amador County",
        "Butte County",
        "Calaveras County",
        "Colusa County",
        "Contra Costa County",
        "Del Norte County",
        "El Dorado County",
        "Fresno County",
        "Glenn County",
        "Humboldt County",
        "Imperial County",
        "Inyo County",
        "Kern County",
        "Kings County",
        "Lake County",
        "Lassen County",
        "Los Angeles County",
        "Madera County",
        "Marin County",
        "Mariposa County",
        "Mendocino County",
        "Merced County",
        "Modoc County",
        "Mono County",
        "Monterey County",
        "Napa County",
        "Nevada County",
        "Orange County",
        "Placer County",
        "Plumas County",
        "Riverside County",
        "Sacramento County",
        "San Benito County",
        "San Bernardino County",
        "San Diego County",
        "San Francisco County",
        "San Joaquin County",
        "San Luis Obispo County",
        "San Mateo County",
        "Santa Barbara County",
        "Santa Clara County",
        "Santa Cruz County",
        "Shasta County",
        "Sierra County",
        "Siskiyou County",
        "Solano County",
        "Sonoma County",
        "Stanislaus County",
        "Sutter County",
        "Tehama County",
        "Trinity County",
        "Tulare County",
        "Tuolumne County",
        "Ventura County",
        "Yolo CountyYuba County",
        
        
        
      ]
    };
  }

  getRow = () => {
    const suffix = (
      <div>
        <span style={{ fontSize: 20 }}>%</span>
      </div>
    );

    // store all modal data in formData state
    const setFormData = (value) => {
      this.setState({
        formData: {
          ...this.state.formData,
          ...value,
        },
      });
    };

    const {
      currentForm,
      handleInputChange,
      divorceObject,
      handleDatePickerChange,
      handleSelectChange,
      handleFormInputChange,
      handleToggleCustomChange,
    } = this.props;
    return (
      <Row gutter={16}>
        <Col span={24}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Party1" style={{ fontSize: 17 }}>
                <Input
                  placeholder="Enter Party Name"
                  type={"text"}
                  // suffix={suffix}
                  size={"large"}
                  name="percent_party_1"
                  onChange={(val) => {
                    handleInputChange(val, currentForm);
                    setFormData({
                      [val.target.name]: val.target.value,
                    });
                  }}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Party2" style={{ fontSize: 17 }}>
                <Input
                  placeholder="Enter Party Name"
                  type={"text"}
                  // suffix={suffix}
                  size={"large"}
                  name="percent_party_2"
                  onChange={(val) => {
                    handleInputChange(val, currentForm);
                    setFormData({
                      [val.target.name]: val.target.value,
                    });
                  }}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Children" style={{ fontSize: 17 }}>
                <Input
                  placeholder="Enter Children Name"
                  type={"text"}
                  // suffix={suffix}
                  size={"large"}
                  name="children"
                  onChange={(val) => {
                    handleInputChange(val, currentForm);
                    setFormData({
                      [val.target.name]: val.target.value,
                    });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Sepration Date" style={{ fontSize: 17 }}>
                <DatePicker
                  size="large"
                  // style={{ width: "100%" }}
                  format={"MM/DD/YYYY"}
                  onChange={(date, dateString) => {
                    handleDatePickerChange(
                      this.state.separationDate,
                      date,
                      dateString,
                      currentForm
                    );
                    setFormData({
                      [this.state.separationDate]: dateString,
                    });
                  }}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="MarriageDate" style={{ fontSize: 17 }}>
                <DatePicker
                  size="large"
                  // style={{ width: "100%" }}
                  format={"MM/DD/YYYY"}
                  onChange={(date, dateString) => {
                    handleDatePickerChange(
                      this.state.marriageDate,
                      date,
                      dateString,
                      currentForm
                    );
                    setFormData({
                      [this.state.marriageDate]: dateString,
                    });
                  }}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Pregnant" style={{ fontSize: 17 }}>
                <ToggleCustom
                  values={["Yes", "No"]}
                  handleToggleCustomChange={handleToggleCustomChange}
                  currentForm={currentForm}
                  name={this.state.pregnant}
                  // onClick={(val) => {
                  //   console.log("in toggle custom on click");
                  //   handleToggleCustomChange(
                  //     this.state.pregnant,
                  //     val,
                  //     currentForm
                  //   );
                  //   setFormData({
                  //     [this.state.pregnant]: val,
                  //   });
                  // }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Add title="If in California" />

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="County of Petition" style={{ fontSize: 17 }}>
                {/* <Input
                  placeholder="Enter Country"
                  type={"number"}
                  suffix={suffix}
                  size={"large"}
                  name="percent_party_1"
                /> */}
                <Select
                  showSearch
                  size={"large"}
                  placeholder="-Select-"
                  name="countryOfPetition"
                  // onChange={(value) => this.handleSelectChange('client_investmentKnowledge', value)}
                  onChange={(value) => {
                    handleSelectChange(
                      this.state.countryOfPetition,
                      value,
                      currentForm
                    );
                    setFormData({
                      [this.state.countryOfPetition]: value,
                    });
                  }}
                >

                  {this.state.county_Petition_list.map((data,index)=>(
                  <Option value={data}>{data}</Option>


                  ))}
                  {/* <Option value="Highly Experienced">Highly Experienced</Option>
                  <Option value="Enthusiast">Enthusiast</Option>
                  <Option value="Some Experience/General">
                    Some Experience/General
                  </Option>
                  <Option value="Novice/Beginner">Novice/Beginner</Option> */}
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Case Number" style={{ fontSize: 17 }}>
                <Input
                  placeholder="Enter Case Number"
                  type={"number"}
                  // suffix={suffix}
                  size={"large"}
                  name="caseNumber"
                  onChange={(val) => {
                    handleInputChange(val, currentForm);
                    setFormData({
                      [val.target.name]: val.target.value,
                    });
                  }}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Petitioner in the Case"
                style={{ fontSize: 17 }}
              >
                <ToggleCustom 
                values={["Party 1", "Party 2"]} 
                handleToggleCustomChange={handleToggleCustomChange}
                currentForm={currentForm}
                name={this.state.petitioner}
                
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };

  render() {
    // const { divorceObject, handleInputChange } = this.props;
    const {
      currentForm,
      handleInputChange,
      divorceObject,
      handleDatePickerChange,
      handleSelectChange,
      handleFormInputChange,
    } = this.props;

    return (
      <React.Fragment>
        <Header image={divorce} title={"Divorce Details"} />

        {this.getRow()}

        <div style={{ marginTop: "10%" }}>
          <Footer cbNext={this.props.nextForm} />
        </div>
      </React.Fragment>
    );
  }
}

export default DivorceDetailForm;
