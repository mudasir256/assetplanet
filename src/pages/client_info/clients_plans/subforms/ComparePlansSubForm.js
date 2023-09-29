import React, {useEffect, useState} from 'react';
import moment from "moment";
import { Row, Col, Form, Input, Button, DatePicker, Select} from 'antd';
import 'antd/dist/antd.css';
import { StyledForm } from "../../../../components/new-styled-components/FormStyling"

const { Option } = Select;

const ComparePlansSubForm = () =>  {
  const dateFormat = "MM/DD/YYYY";
  const [state, setState] = React.useState({
    plan1: "",
    plan2: 0,
    age: "",
    year: moment(),
    selectedOption: true, // true="age selected", false="calendar selected"
    loading: true,
  })

  const plans = [ '3', '4', '5', '6', '7', '8', '9', '10']

  const handleSelectChange = (name, value) => {
    setState({
      ...state,
      [name] : value
    });
  }

  const datePickerHandle = (date, dateString) => {
    setState({...state, year : date})
  }

  
  const chooseBtnHandle = (e) => {
    let isAge = e.target.value;
    isAge = isAge === "age" ? true : false
    
    setState({
      ...state,
      selectedOption: isAge
    });
  }


  const fetchData = () => {
    fetch(`http://localhost:3100/mockData/allClients.json`, {
      "Content-Type": "application/json",
      "Accept": "application/json"
    })
      .then((res) => res.json())
      .then(results => {
        console.log(results)
        setState({...state, loading: false});
      });
  };

  useEffect(() => {
    // fetchData();
    setState({...state, loading: false});
  }, []);


  useEffect(() => {
    window.addEventListener("click", chooseBtnHandle)
    return (
      window.removeEventListener("click", chooseBtnHandle)
    )
  }, [state.age, state.year, state.selectedOption, state.loading])


  return (
    <>
      <StyledForm>
          <Row gutter={[{ xs: 24, sm:32, md: 40 }, {xs: 24, sm:32, md: 40}]} type="flex">
              {/* Form Title */}
              <Col xs={24}>
                <h2>Compare Client Plans</h2>
              </Col>
          </Row>

          <Form 
            name="basic"
            initialValues={{
                remember: true,
            }}
            autoComplete="off"
          >
            <Row gutter={[{ xs: 24, sm:32, md: 40 }, {xs: 24, sm:32, md: 40}]} type="flex">
              {/* Select Plan 1 */}
              <Col xs={24} md={12}>
                <Form.Item label="Select Plan 1:">
                    <Select
                        placeholder="Select Plan Number..."
                        defaultValue={state.plan2}
                        onChange={(e) => {handleSelectChange("plan1", e)}}
                        name="plan1"
                    >
                        <Option key={0} value={0} disabled>Select Plan Number...</Option>
                        {
                            plans.map((plan, index) => (<Option key={index + 1} value={plan}>{plan}</Option>))
                        }
                    </Select>
                </Form.Item>
              </Col>

              {/* Select Plan 2*/}
              <Col xs={24} md={12}>
                <Form.Item label="Select Plan 2:">
                    <Select
                    placeholder="Select Plan Number..."
                    defaultValue={state.plan2}
                    onChange={(e) => {handleSelectChange("plan2", e)}}
                    name="plan2"
                    >
                    <Option key={0} value={0} disabled>Select Plan Number...</Option>
                    {
                        plans.map((plan, index) => (<Option key={index + 1} value={plan}>{plan}</Option>))
                    }
                    </Select>
                </Form.Item>
              </Col>

              {/* Yes or no button */}
              <Col xs={24} md={12}>
                <Form.Item className="button-items lg-btns" label="Choose Age or Year:">
                    <Button className={state.selectedOption ? "btn-green" : "btn-gray secondary"} value="age" onClick={(e)=>{chooseBtnHandle(e)}}>Age</Button>
                    <Button className={state.selectedOption ? "btn-gray secondary" : "btn-green"} value="year" onClick={(e)=>{chooseBtnHandle(e)}}>Year</Button>
                </Form.Item>
              </Col>

              {/* Choose date or year */}
              <Col xs={24} md={12}>
                <Form.Item label={state.selectedOption ? "Enter Age" : "Choose Year"}>
                    {
                    state.selectedOption 
                    ?  <Input
                        type="number"
                        placeholder="Select Age..."
                        onChange={(e) => {handleSelectChange("age", e.target.value)}}
                        defaultValue={state.age}
                        size={"large"}
                        name="age"
                        />
                    :  <DatePicker
                            // mode="year"
                            placeholder="Select Year..."
                            style={{ width: "100%" }}
                            // format={dateFormat}
                            format="YYYY"
                            onChange={datePickerHandle}
                            defaultValue={ state.year }
                            size={"large"}
                            name="year"
                        />
                    }
                </Form.Item>
              </Col>
            </Row>

            <Row className="button-items-wrap" type="flex" align='middle' justify='end'>
              <Col>
                <div className='button-items'>
                  <Button
                    className='btn-blue submit'
                      type="submit"
                      // disabled={}
                      size={"large"}
                  >
                    Compare
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
      </StyledForm>
    </>
  )
}


export default ComparePlansSubForm;