import React, { useState } from "react";
import { Form,Input,Button, Row, Col, Select, Radio, Icon } from "antd";
import PhoneNumber from "../../../form/PhoneNumber";
import Country from "../../../form/Country";
import Email from "../../../form/Email";
import TextArea from "antd/lib/input/TextArea";
import swal from "sweetalert";


function ContactInfo({ handleDemoObject }) {

  const contactInfoObj = {
    firstName: "",
    lastName: "",
    company: "",
    addressLine1: "",
    addressLine2: "",
    cityDistrict: "",
    stateProvince: "",
    postalCode: "",
    country: "",
    phone: "",
    alternatePhone: "",
    relationship: "",
    profession: "",
    partTeam: "",
    email: "",
    notes: "",
  };
  const [contactInfo, setContactInfo] = useState(contactInfoObj);


  const { Option } = Select;

  const professions = [
    "Bookkeeper",
    "CPA",
    "Financial Advisor",
    "Insurance Agent",
    "Lawyer - Corporate",
  ];



  const relationships = ["Family", "Friend", "Professional"];

  const handleContactInfo = (name, value) => {
    setContactInfo({
      ...contactInfo,
      [name]: value,
    });
  };

  const getData = () => {
    handleDemoObject(contactInfo);

    swal("Success!", "You data has been saved!", "success").then(() =>
      clearContactInfoState()
    );
  };

  const clearContactInfoState = () => {
    setContactInfo({ ...contactInfoObj });
  };

  console.log("contactInfo", contactInfo);

  return (
    <div>
      <h2 className="text-center font-weight-bold mb-4">Contact Information</h2>
      
      <Row gutter={16} type="flex" justify="center">
        <Col span={16}>
          <Form.Item label="First Name">
            <Input
              placeholder="First Name"
              value={contactInfo.firstName}
              name="firstName"
              size={"large"}
              onChange={(event) =>
                handleContactInfo(event.target.name, event.target.value)
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16} type="flex" justify="center">
        <Col span={16}>
          <Form.Item label="Last Name">
            <Input
              placeholder="Last Name"
              value={contactInfo.lastName}
              name="lastName"
              size={"large"}
              onChange={(event) =>
                handleContactInfo(event.target.name, event.target.value)
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16} type="flex" justify="center">
        <Col span={16}>
          <Form.Item label="Company">
            <Input
              value={contactInfo.company}
              name="company"
              size={"large"}
              onChange={(event) =>
                handleContactInfo(event.target.name, event.target.value)
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16} type="flex" justify="center">
        <Col span={16}>
          <Form.Item label="Address">
            <Row>
              <Col>
                <Input
                  placeholder="Address Line 1"
                  value={contactInfo.addressLine1}
                  name="addressLine1"
                  size={"large"}
                  onChange={(event) =>
                    handleContactInfo(event.target.name, event.target.value)
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Input
                  placeholder="Address Line 2"
                  value={contactInfo.addressLine2}
                  name="addressLine2"
                  size={"large"}
                  onChange={(event) =>
                    handleContactInfo(event.target.name, event.target.value)
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Input
                  placeholder="City / District"
                  value={contactInfo.cityDistrict}
                  name="cityDistrict"
                  size={"large"}
                  onChange={(event) =>
                    handleContactInfo(event.target.name, event.target.value)
                  }
                />
              </Col>
              <Col>
                <Input
                  placeholder="State / Province"
                  value={contactInfo.stateProvince}
                  name="stateProvince"
                  size={"large"}
                  onChange={(event) =>
                    handleContactInfo(event.target.name, event.target.value)
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Input
                  placeholder="Postal Code"
                  value={contactInfo.postalCode}
                  name="postalCode"
                  size={"large"}
                  onChange={(event) =>
                    handleContactInfo(event.target.name, event.target.value)
                  }
                />
              </Col>
              <Col>
                <Country
                  value={contactInfo.country}
                  onChange={(value) => handleContactInfo("country", value)}
                ></Country>
              </Col>
            </Row>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16} type="flex" justify="center">
        <Col span={16}>
          <Form.Item label="Phone">
            <PhoneNumber
              value={contactInfo.phone}
              name="phone"
              size={"large"}
              onChange={(event) =>
                handleContactInfo(event.target.name, event.target.value)
              }
            ></PhoneNumber>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16} type="flex" justify="center">
        <Col span={16}>
          <Form.Item label="Alternate Phone">
            <PhoneNumber
              value={contactInfo.alternatePhone}
              name="alternatePhone"
              size={"large"}
              onChange={(event) =>
                handleContactInfo(event.target.name, event.target.value)
              }
            ></PhoneNumber>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16} type="flex" justify="center">
        <Col span={16}>
          <Form.Item label="Relationship">
            <Radio.Group
              name="relationship"
              size={"large"}
              onChange={(event) =>
                handleContactInfo(event.target.name, event.target.value)
              }
              value={contactInfo.relationship}
            >
              {relationships.map((relationship, index) => (
                <Radio key={index} value={relationship}>
                  {relationship}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16} type="flex" justify="center">
        <Col span={16}>
          <Form.Item label="Profession">
            <Select
              showSearch
              placeholder="-Select-"
              value={contactInfo.profession}
              onChange={(value) => handleContactInfo("profession", value)}
            >
              {professions.map((profession, index) => (
                <Option key={index} value={profession}>
                  {profession}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16} type="flex" justify="center">
        <Col span={16}>
          <Form.Item label="Part of My Professional Team">
            <Radio.Group
              name="partTeam"
              size={"large"}
              onChange={(event) =>
                handleContactInfo(event.target.name, event.target.value)
              }
              value={contactInfo.partTeam}
            >
              <Radio value="Yes">Yes</Radio>
              <Radio value="No">No</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16} type="flex" justify="center">
        <Col span={16}>
          <Form.Item label="Email">
            <Email
              value={contactInfo.email}
              name="email"
              size={"large"}
              onChange={(event) =>
                handleContactInfo(event.target.name, event.target.value)
              }
            ></Email>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16} type="flex" justify="center">
        <Col span={16}>
          <Form.Item label="Notes">
            <TextArea
              value={contactInfo.notes}
              name="notes"
              size={"large"}
              onChange={(event) =>
                handleContactInfo(event.target.name, event.target.value)
              }
            ></TextArea>
          </Form.Item>
        </Col>
      </Row>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <Button
          type="primary"
          size={"large"}
          onClick={() => {
            getData();
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default ContactInfo;
