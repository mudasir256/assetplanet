import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Row, Col, Icon } from 'antd';
import Currency from '../../../components/form/Currency';

const formID = "LoanSubForm";
class LoanSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Loan',
            fields: [
                {
                    id: 'total_loan',
                    title: 'Total Loan Assigned to Goal',
                    value: data['total_loan']
                }
            ]
        }
    
        return formData;
    }

    constructor(props) {
        super(props);

        this.state = {
            enableNext: false,
            formData: {
                total_loan: '',
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
                if(newFormData.fields[findex]['id'] === 'total_loan'){
                    formData['total_loan'] = newFormData.fields[findex]['value'];
                }                
            }
    
            let enableNext = false;
            if(formData['total_loan'] !== ''){
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

        if(formData['total_loan'] !== ''){
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
        let formData = LoanSubForm.FnCreateFormData({
            total_loan: this.state.formData['total_loan']
        })

        this.props.cbUpdateSubForm(formID, formData);

        this.props.cbGoSubForm("EndSubForm"); 
    }

    render() {
        
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <h2 className="text-center font-weight-bold mb-4">Loan</h2>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Col>
                                <Form.Item label="Total Loan Assigned to Goal">
                                    <Currency 
                                        value={this.state.formData.total_loan} 
                                        name="total_loan"
                                        onChange={(event) => this.handleInputChange(event)}
                                    />
                                </Form.Item>
                            </Col>
                        </Col>
                    </Row>
                </div>
                <div className="d-flex justify-content-end">
                    <Button type="primary" size={'large'} onClick={() => this.goNextForm()}>
                        Next
                        <Icon type="right" />
                    </Button>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(LoanSubForm);