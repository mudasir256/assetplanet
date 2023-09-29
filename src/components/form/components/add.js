import React from "react";
import { Row, Col, Dropdown, Menu, Icon } from "antd";
import "../../custom/CustomSubFormTable.css";

const Add = (props) => {
  const { button = null, title, cbAdd, list, isDisabled = false } = props;
  return (
    <Row >
      <Col span={12}>
        <div>
          <h2 className="font-weight-bold mb-4">{title}</h2>
        </div>
      </Col>
      <Col
        span={12}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        {button && !isDisabled ? (
          <React.Fragment>
            <span className="custom-field-value-style"> {button}</span>
            {list ? (
              <Dropdown
                overlay={() => {
                  return (
                    <Menu>
                      <Menu.Item>
                        <a onClick={cbAdd}>
                          Add <Icon type="plus"></Icon>{" "}
                        </a>
                      </Menu.Item>
                      {list.map((item) => {
                        if (item.option === "Upload Password Sheet") {
                          return (
                            <Menu.Item>
                              <a onClick={item.cb ? item.cb : null}>
                                {item.option} <Icon type="upload"></Icon>
                              </a>
                            </Menu.Item>
                          );
                        }
                        if (item.option === "Download Password Sheet") {
                          return (
                            <Menu.Item>
                              <a onClick={item.cb ? item.cb : null}>
                                {item.option} <Icon type="download"></Icon>
                              </a>
                            </Menu.Item>
                          );
                        }

                        return (
                          <Menu.Item>
                            <a onClick={item.cb ? item.cb : null}>
                              {item.option}
                            </a>
                          </Menu.Item>
                        );
                      })}
                    </Menu>
                  );
                }}
              >
                <div className="custom-add-new-format">
                  <span className="custom-plus-sign">+</span>
                </div>
              </Dropdown>
            ) : (
              <div className="custom-add-new-format" onClick={cbAdd}>
                <span className="custom-plus-sign">+</span>
              </div>
            )}
          </React.Fragment>
        ) : null}
      </Col>
    </Row>
  );
};

export default Add;
