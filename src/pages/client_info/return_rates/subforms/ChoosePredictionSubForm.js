import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Form, Button, Row, Col, Select, Upload, message, Icon } from 'antd';

// const icons = {  UploadOutlined  };

const { Option } = Select;

const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
    
        if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};
    





const predictions = [
    "Asset Planet Investment Committee", "Christopher Antoniou Pissarides", "William Forsyth Sharpe"
]
const formID = "ChoosePredictionSubForm";
class ChoosePredictionSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Choose Professional Prediction',
            fields: [
                {
                    id: 'prediction',
                    title: 'Professional Prediction',
                    value: data['prediction']
                }
            ]
        }

        return formData
    }

    constructor(props) {
        super(props);

        this.state = {
            enableNext: false,
            enablePrev: true,
            formData: {
                prediction: '',
            }
        }

        this.goNextForm = this.goNextForm.bind(this);
        this.updateFormData = this.updateFormData.bind(this);

        this.handleFormInputChange = this.handleFormInputChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);

    }

    componentDidMount() {
        this.updateFormData(this.props.subFormData);
    }

    updateFormData(newFormData){
        let formData = this.state.formData;
        if(newFormData.hasOwnProperty('fields')){
            for(var findex = 0; findex < newFormData.fields.length; findex++){
                if(newFormData.fields[findex]['id'] == 'prediction'){
                    formData['prediction'] = newFormData.fields[findex]['value'];
                }
            }
    
            let enableNext = false;
            if(formData['prediction'] != ''){
                enableNext = true;
            }

            this.setState({
                formData: formData,
                enableNext: enableNext
            })
        }
        
    }

    handleFormInputChange(name, value){
        
        let formData = this.state.formData;
        formData[name] = value;

        let newState = {
            formData: formData
        };

        if(formData['prediction'] != ''){
            newState['enableNext'] = true;
        }
        else{
            newState['enableNext'] = false;
        }

        this.setState(newState);
    }

    handleInputChange(event){
        event.preventDefault();
        const {name, value} = event.target;
        this.handleFormInputChange(name, value);
    }

    handleSelectChange(name, value){
        this.handleFormInputChange(name, value);
    }

    handleDatePickerChange(name, date, dateString){
        this.handleFormInputChange(name, dateString);
    }


    goNextForm(){
        if(!this.state.enableNext){
            return;
        }

        let formData = ChoosePredictionSubForm.FnCreateFormData({
            prediction: this.state.formData['prediction']
        })

        this.props.cbUpdateSubForm(formID, formData);

        this.props.cbGoSubForm("UserDefinedSubForm");
               
    }
    
          
    goPrevForm(){
        if(!this.state.enablePrev){
            return;
        }

        let formData = ChoosePredictionSubForm.FnCreateFormData({
            prediction: this.state.formData['prediction']
        })

        this.props.cbUpdateSubForm(formID, formData);

        this.props.cbGoSubForm("StaticSubForm");
               
    }

    goPreviousForm(){
        this.props.cbGoSubForm("StaticSubForm");
    }

    render() {
        
        return (
            <React.Fragment>
                <div className="info-form-block pl-5 pr-5">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Choose Professional Prediction</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={8}>
                            <Form.Item label="Professional Prediction">
                                <Select
                                    showSearch
                                    placeholder="-Select-"
                                    size={'large'}
                                    value={this.state.formData.prediction}
                                    onChange={(value) => this.handleSelectChange("prediction", value)}
                                >
                                {
                                    predictions.map((prediction, index) => <Option key={index} value={prediction}>{prediction}</Option>)
                                }
                                </Select>
                            </Form.Item>
                       
                            <div className="uploader">
                            <label>Upload your own prediction</label>
                               <Upload {...props}>
                                <Button>
                                    Click to Upload
                                </Button>
                                </Upload>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="row justify-content-between">
                    <div className="col-8">
                        <Button type="primary" size={'large'} onClick={() => this.goPreviousForm()}>
                            <Icon type="left" />
                            Previous
                        </Button>
                    </div>
                    <div className="col-4 d-flex justify-content-end">
                        {
                            this.props.dataID != null && 
                            <Button type="primary" size={'large'} style={{marginRight: '10px'}} onClick={() => this.goNextForm(true)}>
                                Update
                            </Button>
                        }
                        <Button type="primary" disabled={ !this.state.enableNext } size={'large'} onClick={() => this.goNextForm()}>
                            Next
                            <Icon type="right" />
                        </Button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(ChoosePredictionSubForm);