import React, { Component } from "react";
import { Button } from "antd";

const selected = {
  background: "#39b54a",
  borderRadius: "100px",
  width: "100px",
};

const notSelected = {
  background: "white",
  borderRadius: "100px",
  width: "100px",
};

class ToggleCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "",
    };

  }




  render() {
    const { values = [],handleToggleCustomChange,currentForm,name } = this.props;
    if(this.state.current === '') this.setState({current: values[0]})
    return (
      <div
        style={{
          marginLeft: "10%",
          display: "flex",
          flexDirection: "row",
          width: "20%",
        //   marginBottom: '8%'
        }}
      >
        {values.map((item) => {
          return (
            <div style={{ marginRight: "5%" }}>
              <Button
                type="primary"
                size={"large"}
                style={this.state.current === item ? selected: notSelected}
                onClick={()  =>  {
                  const current_item = item
                  this.setState({ current: current_item },()=>{
                    handleToggleCustomChange(name,this.state.current,currentForm)

                  });
              

                }}
              >
                <span className="custom-footer-text" style={this.state.current === item ? {color: 'white'} : {color: 'black'}}>{item}</span>
              </Button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ToggleCustom;
