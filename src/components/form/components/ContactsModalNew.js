import React, { useState } from "react";
import {
    Row,
    Col,
    Modal,
    Form,
    Input,
    Select,
    DatePicker,
    Radio,
    Icon,
    Button,
} from "antd";
import "../../custom/CustomSubFormTable.css";
import PhoneNumber from "../PhoneNumber";
import swal from "sweetalert";
import PhoneNum from "./Countrycode";
import Currency from "../Currency";
import TextArea from "antd/lib/input/TextArea";
import WebAddress from "../WebAddress";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const { Option } = Select;

const ContactModal = (props) => {
    console.log("props in contact modal", props);

    //   constructor(props) {
    //     super(props);
    //     this.state = {
    //       form: {},
    //       isError: false,
    //       errorMessage: "",
    //       textField: false,
    //       selectListCustomtext: {},
    //       buttonDisabled: true,

    //     };
    //     this.formRef = React.createRef();
    //   }
    const [Form] = Form.useForm();

    const [form, setForm] = useState({});
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [textField, setTextField] = useState(false);
    const [selectListCustomtext, setSelectListCustomtext] = useState({});
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const onSubmit = async () => {
        try {
            const { cbClose, create, formData } = this.props;

            console.log("pressed", this.formRef);
            create({
                formData,
            });
            cbClose();
        } catch (error) { }

        try {
            const { cbCreate, cbClose, onLoad, onConstraints } = this.props;

            if (onConstraints) {
                console.log("ok clicked");


                console.log(this.state.form);
                let cons = onConstraints(this.state.form);
                if (cons) {
                    this.setState({ isError: true, errorMessage: cons });
                    return null;
                }
            }

            let module = await cbCreate(this.state.form);
            if (module.status === 200) {
                await onLoad();
                this.setState({ isError: false, errorMessage: "", form: {} });
                cbClose();
            }
        } catch (error) { }
    };


    // render() {
    //     const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } =
    //         this.props.form;
    //     const usernameError = getFieldError("username");
    //     const {
    //         setFormData,
    //         formData,
    //         title,
    //         isVisible = false,
    //         fields = [1],
    //         cbClose,
    //         handleCurrencyChange,
    //         handleSelectChange,
    //         handleRadioChange,
    //         handleInputChange,
    //         handleDatePickerChange,
    //         handlePhoneChange,
    //         handleDocumentChange,
    //         handleWebChange,
    //         handleRichTextChange,
    //         currentForm,
    //     } = this.props;

        return (
            <Modal
                title={<span className="custom-modal-header-title" >{title}</span>}
                footer={[
                    <div style={{ display: "flex" }}>
                        <span style={{ display: "block", color: "#39b54a", width: "70%", textAlign: "initial" }}>If Trusted Individual is selected yes, pressing OK here will send an email to this person with details about their responsibilities</span>,
                        <div style={{ width: "30%" }}>
                            <Button onClick={() => {
                                this.setState({ isError: false, errorMessage: "" }, () => {
                                    cbClose();
                                });
                            }}>Cancel</Button>,
                            <Button key="submit" style={{
                                background: "#39b54a",
                                // width: "10%",
                            }}
                                type="primary"
                                disabled={this.state.buttonDisabled}
                                onClick={(e) => {
                                    e.preventDefault()
                                    this.onSubmit();
                                }}>
                                OK
                            </Button>
                        </div>,
                    </div>

                ]
                }
                visible={isVisible}
                centered
                width="50%"
                onCancel={() => {
                    this.setState({ isError: false, errorMessage: "" }, () => {
                        cbClose();
                    });
                }}
                // onOk={this.onSubmit}
                onOk={(e) => {
                    console.log("REF ");
                    e.preventDefault()
                    // let isError = Object.values(this.props.form.getFieldsError()).some((e) => e.length > 0)
                    // console.log("isError", isError)
                    // if (isError) {
                    //   this.setState({ buttonDisabled: isError })
                    //   console.log("here in error")
                    //   return
                    // }
                    this.onSubmit();
                    // this.formRef.dispatchEvent(new Event("submit"));
                }}
                // okButtonProps={{disabled:true}}
                destroyOnClose={cbClose}
                okButtonProps={{
                    style: {
                        background: "#39b54a",
                        width: "10%",
                    },
                    disabled: this.state.buttonDisabled
                }}
            >
                <Form
                    ref={this.formRef.current}
                    onSubmit={(e) => {
                        e.preventDefault();
                        console.log("PRESSED", this.formRef.current);
                    }}
                    onChange={() => {
                        let object = this.props.form.getFieldsError()
                        let isError = Object.values(object).some((el) => el && el.length > 0)
                        console.log("isError onchnage", isError)
                        //  if (isError) {
                        this.setState({ buttonDisabled: isError })
                        // console.log("here in error")
                        // return
                        // }
                    }}
                    onFieldsChange={(e) => { console.log("fhgjkkjh"); }}
                    // onFieldsChange={() =>
                    //   // this.formRef.getFieldErrorw().some((field) => field.errors.length > 0)
                    //   console.log("flied error",this.formRef.getFieldError().some((field) => field.errors.length > 0))
                    //   // this.setState({
                    //   //   buttonDisabled: {
                    //   //     formRef.getFieldError().some((field) => field.errors.length > 0)
                    //   //   },
                    //   // })

                    // }
                    style={{ lineHeight: "0px" }}
                >
                    <Row gutter={16}>
                        {fields.map((item, idx) => {
                            const {
                                title,
                                type,
                                options = [],
                                index = null,
                                isRequired = false,
                                def = null,
                                isDisabled = false,
                            } = item;
                            switch (type) {
                                case "email1": return (
                                    <Col key={idx} span={8}>
                                        <Form.Item style={{ lineHeight: "0px" }} >
                                            <label htmlFor={title} className="label-style" >{title}</label>
                                            <Input
                                                className="custom-input"
                                                defaultValue={def}
                                                onChange={(val) => {
                                                    if (currentForm) {
                                                        handleInputChange(val, currentForm);
                                                        setFormData({
                                                            [index]: val.target.value,
                                                        });
                                                    } else {
                                                        this.setState({
                                                            form: {
                                                                ...this.state.form,
                                                                [index]: val.target.value,
                                                            },
                                                        });
                                                    }
                                                }}
                                                size="large"
                                                placeholder={`Enter ${title}`}
                                            // name="client_primaryContactNumber"
                                            ></Input>
                                        </Form.Item>
                                    </Col>
                                );
                                case "input":
                                    return (
                                        <Col key={idx} span={8}>
                                            {/* <Form.Item label={title} validateStatus={"error"}> */}
                                            <Form.Item style={{ lineHeight: "0px" }}>
                                                <label htmlFor={title} className="label-style" >{title}</label>
                                                <Input
                                                    className="custom-input"
                                                    rules={[{ required: true, message: "Enter Value" }]}
                                                    // required
                                                    defaultValue={def}
                                                    disabled={isDisabled}
                                                    name={index}
                                                    onChange={(val) => {
                                                        if (currentForm) {
                                                            handleInputChange(val, currentForm);
                                                            setFormData({
                                                                [index]: val.target.value,
                                                            });
                                                        } else {
                                                            this.setState({
                                                                form: {
                                                                    ...this.state.form,
                                                                    [index]: val.target.value,
                                                                },
                                                            });
                                                        }
                                                    }}
                                                    size="large"
                                                    placeholder={`Enter ${title}`}
                                                // name="client_primaryContactNumber"
                                                ></Input>
                                            </Form.Item>
                                        </Col>
                                    );
                                case "nameInput":
                                    return (
                                        <Col key={idx} span={8}>
                                            {/* <Form.Item label={title} validateStatus={"error"}> */}
                                            <Form.Item style={{ lineHeight: "0px" }} label={title} rules={[{ required: true, message: "Please select an option!" }]}>
                                                {getFieldDecorator(index, {
                                                    rules: [
                                                        {
                                                            required: true,
                                                        }
                                                    ]
                                                })(
                                                    <Input
                                                        className="custom-input"
                                                        rules={[{ required: true, message: "Enter Value" }]}
                                                        // required
                                                        defaultValue={def}
                                                        disabled={isDisabled}
                                                        name={index}
                                                        onChange={(val) => {
                                                            if (currentForm) {
                                                                handleInputChange(val, currentForm);
                                                                setFormData({
                                                                    [index]: val.target.value,
                                                                });
                                                            } else {
                                                                this.setState({
                                                                    form: {
                                                                        ...this.state.form,
                                                                        [index]: val.target.value,
                                                                    },
                                                                });
                                                            }
                                                        }}
                                                        size="large"
                                                        placeholder={`Enter ${title}`}
                                                    // name="client_primaryContactNumber"
                                                    ></Input>
                                                )}
                                            </Form.Item>
                                        </Col>
                                    );
                                case "email":
                                    return (
                                        <Col key={idx} span={8}>
                                            {/* <Form.Item label={title} validateStatus={"error"}> */}
                                            <Form.Item label={title} style={{ lineHeight: "0px" }}>
                                                {/*  <label htmlFor={title} className="label-style" >{title}</label> */}
                                                {getFieldDecorator("email", {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            type: "email",
                                                            message: "E-mail is not valid"
                                                        }
                                                    ]
                                                })(
                                                    <Input
                                                        className="custom-input"
                                                        defaultValue={def}
                                                        disabled={isDisabled}
                                                        name={index}
                                                        onChange={(val) => {
                                                            if (currentForm) {
                                                                handleInputChange(val, currentForm);
                                                                setFormData({
                                                                    [index]: val.target.value,
                                                                });
                                                            } else {
                                                                this.setState({
                                                                    form: {
                                                                        ...this.state.form,
                                                                        [index]: val.target.value,
                                                                    },
                                                                });
                                                            }
                                                        }}
                                                        size="large"
                                                        placeholder={`Enter ${title}`}
                                                    // name="client_primaryContactNumber"
                                                    ></Input>
                                                )}
                                            </Form.Item>

                                        </Col>
                                    );
                                case "audio":
                                    return (
                                        <Col span={12}>
                                            <Form.Item >
                                                <label htmlFor={title} className="label-style">{title}</label>
                                                <div className="custom-upload-style">
                                                    <input
                                                        id="file-input-audio"
                                                        type="file"
                                                        name={index}
                                                        accept="audio/*"
                                                        onChange={(event) => {
                                                            console.log("document size", event.target.files[0].size);
                                                            const fileSize = event.target.files[0].size / (1024 * 1000)// in MB
                                                            console.log("fileSize in mb", fileSize)
                                                            if (fileSize < 100) {

                                                                if (currentForm) {
                                                                    handleDocumentChange(
                                                                        index,
                                                                        event.target.files[0],
                                                                        currentForm
                                                                    );
                                                                    setFormData({
                                                                        [index]: event.target.files[0].name,
                                                                        audio: event.target.files[0]
                                                                    });
                                                                } else {
                                                                    this.setState({
                                                                        form: {
                                                                            ...this.state.form,
                                                                            [index]: event.target.files[0],
                                                                        },
                                                                    });
                                                                }
                                                            }
                                                            else {
                                                                swal("Oops!", "File size is large! (Max allowed 100MB)", "error");

                                                            }

                                                        }}
                                                    />
                                                    <label for="file-input-audio">
                                                        <Icon
                                                            className="mt-1"
                                                            style={{
                                                                fontSize: "23px",
                                                                background: "#39b54a",
                                                                padding: "8px",
                                                                borderRadius: "5px",
                                                                color: "white",
                                                            }}
                                                            type="upload"
                                                        ></Icon>
                                                    </label>
                                                </div>
                                            </Form.Item>
                                        </Col>
                                    );
                                case "video":
                                    return (
                                        <Col span={12}>
                                            <Form.Item >
                                                <label htmlFor={title} className="label-style">{title}</label>
                                                <div className="custom-upload-style">
                                                    <input
                                                        id="file-input-video"
                                                        type="file"
                                                        name={index}
                                                        accept="video/*"
                                                        onChange={(event) => {
                                                            // console.log("document", event.target.files[0]);
                                                            console.log("document size", event.target.files[0].size);
                                                            const fileSize = event.target.files[0].size / (1024 * 1000)// in MB
                                                            const name = event.target.files[0].name;
                                                            const lastDot = name.lastIndexOf('.');
                                                            const fileName = name.substring(0, lastDot);
                                                            const ext = name.substring(lastDot + 1);
                                                            console.log("extension", ext);
                                                            console.log("ext", event.target.files[0].type);

                                                            console.log("fileSize in mb", fileSize)
                                                            if (fileSize < 100) {
                                                                if (currentForm) {
                                                                    handleDocumentChange(
                                                                        index,
                                                                        event.target.files[0],
                                                                        currentForm
                                                                    );
                                                                    setFormData({
                                                                        [index]: event.target.files[0].name,
                                                                        video: event.target.files[0]
                                                                    });
                                                                } else {
                                                                    this.setState({
                                                                        form: {
                                                                            ...this.state.form,
                                                                            [index]: event.target.files[0],
                                                                        },
                                                                    });
                                                                }
                                                            }
                                                            else {
                                                                swal("Oops!", "File size is large! (Max allowed 100MB)", "error");
                                                            }
                                                        }}
                                                    />
                                                    <label for="file-input-video">
                                                        <Icon
                                                            className="mt-1"
                                                            style={{
                                                                fontSize: "23px",
                                                                background: "#39b54a",
                                                                padding: "8px",
                                                                borderRadius: "5px",
                                                                color: "white",
                                                            }}
                                                            type="upload"
                                                        ></Icon>
                                                    </label>
                                                </div>
                                            </Form.Item>
                                        </Col>
                                    );
                                case "phoneNumber":
                                    return (
                                        <Col key={idx} span={8}>
                                            {/* <Form.Item label={title} validateStatus={"error"}> */}
                                            <Form.Item label={title} style={{ lineHeight: "0px" }}>
                                                {/*  <label htmlFor={title} className="label-style" >{title}</label> */}
                                                {getFieldDecorator("phoneNumber", {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: "Number is required"
                                                        }
                                                    ]
                                                })(
                                                    <PhoneNum
                                                        defaultValue={def}
                                                        disabled={isDisabled}
                                                        name={index}
                                                        // required
                                                        // validationErrors={{
                                                        //   isDefaultRequiredValue: 'Field is required'
                                                        // }}
                                                        onChange={(val) => {
                                                            // console.log("phone with country code=>>", val.target.value)
                                                            if (currentForm) {
                                                                handleInputChange(val, currentForm);
                                                                // console.log("value phone..", val);
                                                                setFormData({
                                                                    [index]: val.target.value,
                                                                });
                                                            } else {
                                                                this.setState({
                                                                    form: {
                                                                        ...this.state.form,
                                                                        [index]: val.target.value,
                                                                    },
                                                                });
                                                            }
                                                        }}
                                                        size="large"
                                                        placeholder={`Enter ${title}`}
                                                    // name="client_primaryContactNumber"
                                                    ></PhoneNum>
                                                )}
                                            </Form.Item>
                                        </Col>
                                    );
                                case "phoneNumberA":
                                    return (
                                        <Col key={idx} span={8}>
                                            {/* <Form.Item label={title} validateStatus={"error"}> */}
                                            <Form.Item label={title} style={{ lineHeight: "0px" }}>
                                                {/*    <label htmlFor={title} className="label-style" >{title}</label> */}

                                                <PhoneNum
                                                    defaultValue={def}
                                                    disabled={isDisabled}
                                                    name={index}
                                                    onChange={(val) => {
                                                        // console.log("phone with country code=>>", val.target.value)
                                                        if (currentForm) {
                                                            handleInputChange(val, currentForm);
                                                            // console.log("value phone..", val);
                                                            setFormData({
                                                                [index]: val.target.value,
                                                            });
                                                        } else {
                                                            this.setState({
                                                                form: {
                                                                    ...this.state.form,
                                                                    [index]: val.target.value,
                                                                },
                                                            });
                                                        }
                                                    }}
                                                    size="large"
                                                    placeholder={`Enter ${title}`}
                                                // name="client_primaryContactNumber"
                                                ></PhoneNum>
                                            </Form.Item>
                                        </Col>
                                    );
                                case "multiple":
                                    return (
                                        <Col key={idx} span={8}>
                                            <Form.Item >
                                                <label htmlFor={title} className="label-style" >{title}</label>
                                                <Input
                                                    className="custom-input"
                                                    required={isRequired}
                                                    onChange={(val) =>
                                                        this.setState({
                                                            form: {
                                                                ...this.state.form,
                                                                [index]: val.target.value,
                                                            },
                                                        })
                                                    }
                                                    size="large"
                                                    placeholder={`Enter ${title}`}
                                                    name="client_primaryContactNumber"
                                                ></Input>
                                            </Form.Item>
                                        </Col>
                                    );

                                case "select":
                                    return (
                                        <Col key={idx} span={8}>
                                            <Form.Item id={index} >
                                                <label htmlFor={title} className="label-style" >{title}</label>
                                                <Select
                                                    className="custom-input"
                                                    showSearch
                                                    placeholder="-Select-"
                                                    name={title}
                                                    onChange={(value) => {
                                                        if (currentForm) {
                                                            handleSelectChange(index, value, currentForm);
                                                            if (value === "Others") {
                                                                // this.setState({textField:true});
                                                                this.setState({
                                                                    selectListCustomtext: { ...this.state.selectListCustomtext, [index]: true }
                                                                })
                                                                // console.log("other is selected..",this.state.textField);
                                                            }
                                                            else {
                                                                setFormData({
                                                                    [index]: value,
                                                                });
                                                            }
                                                        } else {
                                                            this.setState({
                                                                form: {
                                                                    ...this.state.form,
                                                                    [index]: value,
                                                                },
                                                            });
                                                        }
                                                    }}

                                                // onChange={(val) =>
                                                //   this.setState({
                                                //     form: {
                                                //       ...this.state.form,
                                                //       [index]: val,
                                                //     },
                                                //   })
                                                // }
                                                >

                                                    {options.length > 0 ? (
                                                        options.map((item, index) => {
                                                            return <Option key={index} value={item}>{item}</Option>;
                                                        })
                                                    ) : (
                                                        <React.Fragment>
                                                            <Option value="Head Stone">Head Stone</Option>
                                                            <Option value="Casket">Casket</Option>
                                                            <Option value="Urn">Urn</Option>
                                                            <Option value="Flowers">Flowers</Option>
                                                            <Option value="Others">Others</Option>
                                                        </React.Fragment>
                                                    )}

                                                </Select>
                                                {this.state.selectListCustomtext && this.state.selectListCustomtext[index] && <div className="custom-field-align">

                                                    <Input
                                                        className="custom-input"
                                                        id={`section${index}`}
                                                        name={title}
                                                        type="text"
                                                        placeholder={`Enter ${title}`}
                                                        size={"large"}
                                                        onChange={(e) => {
                                                            // console.log("value....", e.target.value)
                                                        }}
                                                    />
                                                    <Button
                                                        className="button-set"
                                                        onClick={() => {
                                                            const value = document.getElementById(`section${index}`).value;
                                                            setFormData({
                                                                [index]: value,
                                                            });
                                                            this.setState({
                                                                selectListCustomtext: { ...this.state.selectListCustomtext, [index]: false }
                                                            })
                                                        }

                                                        }
                                                    >
                                                        OK
                                                    </Button>{" "}
                                                </div>}
                                                {/*      {this.state.textField && <div className="custom-field-align">

                          <Input
                            // id="section"
                            id={`section${index}`}
                            // className="field-set"
                            name={title}
                            type="text"
                            placeholder={`Enter ${title}`}
                            size={"large"}
                            onChange={(e) => {
                              // console.log("value....", e.target.value)
                            }}
                          />
                          <Button
                            className="button-set"
                            onClick={() => {
                              const value = document.getElementById(`section${index}`).value;
                              console.log("value.. saved", value);
                              setFormData({
                                [index]: value,
                              });
                              this.setState({textField:false});
                            }

                            }
                          >
                            OK
                          </Button>{" "}
                          </div>}  */}
                                            </Form.Item>
                                        </Col>
                                    );

                                case "currency":
                                    return (
                                        <Col key={idx} span={8}>
                                            <label htmlFor={title} className="label-style" >{title}</label>
                                            <Form.Item >
                                                <Currency
                                                    className="custom-input"
                                                    id={index}
                                                    value={null}
                                                    placeholder={`Enter ${title}`}
                                                    name="client_primaryContactCurrency"
                                                    onChange={(event) => {
                                                        handleCurrencyChange(
                                                            index,
                                                            event.target.value,
                                                            currentForm
                                                        );
                                                        setFormData({
                                                            [index]: event.target.value,
                                                        });
                                                    }}
                                                ></Currency>
                                            </Form.Item>
                                        </Col>
                                    );

                                case "phone":
                                    return (
                                        <Col key={idx} span={8}>
                                            <Form.Item >
                                                <label htmlFor={title} className="label-style" >{title}</label>
                                                <Input
                                                    className="custom-input"
                                                    id={index}
                                                    value={formData[index] || null}
                                                    placeholder={`Enter ${title}`}

                                                    name="client_primaryContactNumber"
                                                    onChange={(event) => {
                                                        event.preventDefault()
                                                        // console.log(event.target.value)
                                                        handlePhoneChange(
                                                            index,
                                                            event.target.value,
                                                            currentForm
                                                        );
                                                        setFormData({
                                                            [index]: event.target.value,
                                                        });
                                                    }}
                                                    disabled={isDisabled}
                                                ></Input>
                                            </Form.Item>
                                        </Col>
                                    );

                                case "date":
                                    return (
                                        <Col key={idx} span={8}>
                                            <Form.Item >
                                                <label htmlFor={title} className="label-style" >{title}</label>
                                                <DatePicker
                                                    className="custom-input"
                                                    size="large"
                                                    // style={{ width: "100%" }}
                                                    format={"MM/DD/YYYY"}
                                                    onChange={(date, dateString) => {
                                                        handleDatePickerChange(
                                                            index,
                                                            date,
                                                            dateString,
                                                            currentForm
                                                        );
                                                        setFormData({
                                                            [index]: dateString,
                                                        });
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                    );

                                case "textarea":
                                    return (
                                        <Col key={idx} span={24}>
                                            <Form.Item >
                                                <label htmlFor={title} className="label-style" >{title}</label>
                                                <TextArea
                                                    className="custom-input"
                                                    id={index}
                                                    placeholder="Enter Notes"
                                                    name={index}
                                                    onChange={(e) => {
                                                        handleInputChange(e, currentForm);
                                                        setFormData({
                                                            [index]: e.target.value,
                                                        });
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                    );

                                case "richtext":
                                    return (
                                        <Col span={24}>
                                            <Form.Item >
                                                <label htmlFor={title} className="label-style">{title}</label>
                                                <ReactQuill
                                                    className="custom-input"
                                                    onChange={(e) => {
                                                        handleRichTextChange(index, e, currentForm);
                                                        setFormData({
                                                            [index]: e
                                                        });
                                                        // console.log('background', e);
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                    );

                                case "radio":
                                    return (
                                        <Col key={idx} span={8}>
                                            <Form.Item className="radio-center" label={title} rules={[{ required: true, message: "Please select an option!" }]}  >
                                                {getFieldDecorator(index, {
                                                    rules: [
                                                        {
                                                            required: true,
                                                        }
                                                    ]
                                                })(
                                                    <Radio.Group
                                                        style={{ display: "block" }}
                                                        onChange={(e) => {
                                                            if (currentForm) {
                                                                handleRadioChange(
                                                                    index,
                                                                    e.target.value,
                                                                    currentForm
                                                                );
                                                                // console.log("radio of trusted",index, e.target.value)
                                                                setFormData({
                                                                    [index]: e.target.value,
                                                                });
                                                            } else {
                                                                this.setState({
                                                                    form: {
                                                                        ...this.state.form,
                                                                        [index]:
                                                                            e.target.value === "Yes" ? true : false,
                                                                    },
                                                                });
                                                            }
                                                        }}
                                                    // onChange={(val) => {
                                                    //   this.setState({
                                                    //     form: {
                                                    //       ...this.state.form,
                                                    //       [index]:
                                                    //         val.target.value === "Yes" ? true : false,
                                                    //     },
                                                    //   });
                                                    // }}
                                                    >
                                                        {["Yes", "No"].map((value, vindex) => (
                                                            <Radio.Button className="radio-center" style={{ display: 'inline-block' }} key={vindex} value={value}>
                                                                {value}
                                                            </Radio.Button>
                                                        ))}
                                                    </Radio.Group>
                                                )}
                                            </Form.Item>
                                        </Col>
                                    );

                                case "web":
                                    return (
                                        <Col span={8}>
                                            <Form.Item >
                                                <label htmlFor={title} className="label-style">{title}</label>
                                                <WebAddress
                                                    className="custom-input"
                                                    placeholder={`Enter ${title}`}
                                                    onChange={(event) => {
                                                        // console.log("phone",event.target.name);
                                                        // handleWebChange(
                                                        //   index,
                                                        //   event.target.value,
                                                        //   currentForm
                                                        // );
                                                        setFormData({
                                                            [index]: event.target.value,
                                                        });
                                                    }}
                                                    disabled={isDisabled}

                                                />
                                            </Form.Item>
                                        </Col>
                                    );

                                case "document":
                                    return (
                                        <Col span={8}>
                                            <Form.Item >
                                                <label htmlFor={title} className="label-style">{title}</label>
                                                <div className="custom-upload-style">
                                                    <input
                                                        id="file-input"
                                                        type="file"
                                                        onChange={(event) => {
                                                            // console.log("document", event.target.files[0]);
                                                            if (currentForm) {
                                                                handleDocumentChange(
                                                                    index,
                                                                    event.target.files[0],
                                                                    currentForm
                                                                );
                                                                setFormData({
                                                                    [index]: event.target.files[0].name,
                                                                    file: event.target.files[0]
                                                                });
                                                            } else {
                                                                this.setState({
                                                                    form: {
                                                                        ...this.state.form,
                                                                        [index]: event.target.files[0],
                                                                    },
                                                                });
                                                            }
                                                        }}
                                                    />
                                                    <label for="file-input">
                                                        <Icon
                                                            className="mt-1"
                                                            style={{
                                                                fontSize: "23px",
                                                                background: "#39b54a",
                                                                padding: "8px",
                                                                borderRadius: "5px",
                                                                color: "white",
                                                            }}
                                                            type="upload"
                                                        ></Icon>
                                                    </label>
                                                </div>
                                            </Form.Item>
                                        </Col>
                                    );
                                case "file":
                                    return (
                                        <Col span={8}>
                                            <Form.Item >
                                                <label htmlFor={title} className="label-style">{title}</label>
                                                <div className="custom-upload-style">
                                                    <input
                                                        id="file-input"
                                                        type="file"
                                                        onChange={(event) => {
                                                            // console.log("document", event.target.files[0]);
                                                            if (currentForm) {
                                                                handleDocumentChange(
                                                                    index,
                                                                    event.target.files[0],
                                                                    currentForm
                                                                );
                                                                setFormData({
                                                                    [index]: event.target.files[0].name,
                                                                    file: event.target.files[0]
                                                                });
                                                            } else {
                                                                this.setState({
                                                                    form: {
                                                                        ...this.state.form,
                                                                        [index]: event.target.files[0],
                                                                    },
                                                                });
                                                            }
                                                        }}
                                                        accept="image/jpeg, .pdf, .xlsx, .doc"
                                                    />
                                                    <label for="file-input">
                                                        <Icon
                                                            className="mt-1"
                                                            style={{
                                                                fontSize: "23px",
                                                                background: "#39b54a",
                                                                padding: "8px",
                                                                borderRadius: "5px",
                                                                color: "white",
                                                            }}
                                                            type="upload"
                                                        ></Icon>
                                                    </label>
                                                </div>
                                            </Form.Item>
                                        </Col>
                                    );
                            }
                        })}
                    </Row>
                    {/* <Button type="primary" htmlType="submit">
            Submit
          </Button> */}
                </Form>

                {
                    this.state.isError ? (
                        <div>
                            {/* <p style={{ color: "red" }}>Can't create, constraints Failed</p> */}
                            <p style={{ color: "red" }}>{this.state.errorMessage}</p>
                        </div>
                    ) : null
                }
            </Modal >
        );
}

export default ContactModal;