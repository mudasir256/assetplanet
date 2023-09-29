import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Input, Select, Form, Icon } from 'antd';
import { useSelector } from 'react-redux';
const { Option } = Select;
const FirstStep = () => {
    const fields = useSelector((state) => state.rootReducer.loginUser.stepsFields);
    const [steps, setSteps] = useState();
    const formID = 'MainSubForm';

    console.log("props", fields);
    useEffect(() => {
        const Step1Fields = fields.filter(function (el) {
            return el.priority === 1
        })
        console.log("Step1Fields", Step1Fields);
        setSteps(Step1Fields);
    }, []);
    const Step1Fields = fields.filter(function (el) {
        return el.priority === 1
    })

    console.log("Step1Fields", steps);

   const handleFormInputChange=(name, value)=>{
        
        let formData = this.state.formData;
        formData[name] = value;

        let newState = {
            formData: formData
        };

        if(formData['name'] != '' && formData['liabilityType'] != '' && formData['owner'] != ''){
            newState['enableNext'] = true;
        }
        else{
            newState['enableNext'] = false;
        }

        this.setState(newState);
    }

   const handleInputChange=(event)=>{
        event.preventDefault();
        const {name, value} = event.target;
        handleFormInputChange(name, value);
    }

   const handleSelectChange=(name, value)=>{
        handleFormInputChange(name, value);
    }

    const goPreviousForm = () => {
        // this.props.cbGoSubForm("LiabilityCreditTypeSubForm");
        this.props.cbGoPrev(formID);
    }


    return (
        <div>
            <React.Fragment>
                <div className="info-form-block">
                    { }
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">{"Name And Owner"}</h2>
                        </Col>
                    </Row>
                    <React.Fragment  >
                        {Step1Fields.map((item, index) => {

                            if (item.dataType === "int")
                                return (
                                    <Row key={index} gutter={16} type="flex" justify="center">
                                        <Col span={16}>
                                            <Form.Item label={item.name}>
                                                <Input size={'large'} name="name"
                                                //  onChange={(event) => this.handleInputChange(event)}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                )
                            else if (item.type === "String")
                                return (
                                    <Row key={index} gutter={16} type="flex" justify="center">
                                        <Col span={16}>
                                            <Form.Item label={item.name}>
                                                <Input size={'large'} name="name"
                                                //  onChange={(event) => this.handleInputChange(event)}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                )
                            else if (item.type === "select")
                                return (
                                    <Row key={index} gutter={16} type="flex" justify="center">
                                        <Col span={16}>
                                            <Form.Item label={item.name}>
                                                <Select
                                                    showSearch
                                                    placeholder="-Select-"
                                                    // value={""}
                                                    // onChange={(value) => this.handleSelectChange("owner", value)}
                                                    size={'large'}
                                                >
                                                    {
                                                        <Option key={1} value={"Client"}>Client</Option>
                                                    }
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                )
                        })}
                    </React.Fragment>
                </div>
                <div className="row justify-content-between">
                    <div className="col-8">
                        <Button type="primary" size={'large'}
                        onClick={() =>goPreviousForm()}
                        >
                            <Icon type="left" />
                            Previous
                        </Button>
                    </div>
                    <div className="col-4 d-flex justify-content-end">
                        <Button type="primary" size={'large'}
                        // onClick={() => this.goNextForm()}
                        >
                            Next
                            <Icon type="right" />
                        </Button>
                    </div>
                </div>
            </React.Fragment>
        </div>
    )
}

export default FirstStep
