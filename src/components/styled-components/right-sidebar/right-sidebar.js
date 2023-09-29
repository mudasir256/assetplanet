import React from "react";
import { Collapse, Timeline } from "antd";
const { Panel } = Collapse;

function RightSidebar({ data }) {
  return (
    <>
      {data &&
        Object.values(data).map((item, index) => (
          <Collapse expandIconPosition="right" key={index}>
            <Panel header={item.title}>
              {item.isMulti
                ? item.data && item.data.map((subItem, index) => {
                    return (
                      <Collapse defaultActiveKey="1" key={index}>
                        <Panel header={index + 1}>
                          {Object.keys(subItem).map((key, index) => (
                            <Timeline key={index}>
                              <Timeline.Item>
                                {key} : {subItem[key]}
                              </Timeline.Item>
                            </Timeline>
                          ))}
                        </Panel>
                      </Collapse>
                    );
                  })
                : item.data && item.data.map((subItem, index) =>
                    Object.keys(subItem).map((key, index) => (
                      <Timeline key={index}>
                        <Timeline.Item>
                          {key} : {subItem[key]}
                        </Timeline.Item>
                      </Timeline>
                    ))
                  )}
            </Panel>
          </Collapse>
        ))}
    </>
  );
}

export default RightSidebar;
