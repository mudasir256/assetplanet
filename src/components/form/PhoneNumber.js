import React from "react";
import { Input, Select, Icon } from "antd";
const { Option } = Select;

const PhoneNumber = (props) => {
  return (
    <Input
      placeholder={props.placeholder}
      // prefix={
      //   <svg style={{ "color": "#707070", "height": "18px" }}
      //     xmlns="http://www.w3.org/2000/svg"
      //     width="24"
      //     height="24"
      //     viewBox="0 0 24 24"
      //   >
      //     <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2a19.79 19.79 0 0 1-8.63-3.07a19.5 19.5 0 0 1-6-6a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72a12.84 12.84 0 0 0 .7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45a12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      //   </svg>
      // }
      addonBefore={
        <svg style={{ "color": "#707070", "height": "18px" }}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2a19.79 19.79 0 0 1-8.63-3.07a19.5 19.5 0 0 1-6-6a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72a12.84 12.84 0 0 0 .7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45a12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        // <Icon
        //   type="phone"
        //   style={{ position: "relative", top: "-3px", marginRight: "5px" }}
        // />
      }
      // style = {props.style?  props.style :  { "borderLeft": "none", width: "100%" }}
      // style={props.style? {"borderLeft": "none"} :  { width: "100%" }}
      // style={{"paddingLeft": "20px", "width": "100%"}}
      style={props.style ? props.style : { "width": "100%" }}
      size={"large"}
      name={props.name}
      onChange={props.onChange}
      disabled={props.disabled}
      className={props.className}
      value={props.value}
    />
  )

}

export default PhoneNumber;
