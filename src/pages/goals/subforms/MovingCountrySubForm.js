import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Form,
    Select,
    Row,
    Col,
    Button,
    Icon
} from 'antd';
import Currency from '../../../components/form/Currency';

const { Option } = Select;


const formID = "MovingCountrySubForm";
class MovingCountrySubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Moving Country Information',
            fields: [
                {
                    id: 'state',
                    title: 'Country Moving To',
                    value: data['country']
                },
                {
                    id: 'moving_costs',
                    title: 'One-time Moving Costs',
                    value: data['moving_costs']
                }
            ]
        }
    
        return formData;
    }

    constructor(props) {
        super(props);

        this.state = {
            enableNext: true,
            formData: {
                moving_costs: ''
            },
            size: 'large'
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

    updateFormData(newFormData) {
        let formData = this.state.formData;
        if (newFormData.hasOwnProperty('fields')) {
            for (var findex = 0; findex < newFormData.fields.length; findex++) {
                if (newFormData.fields[findex]['id'] == 'country') {
                    formData['country'] = newFormData.fields[findex]['value'];
                }
                if (newFormData.fields[findex]['id'] == 'moving_costs') {
                    formData['moving_costs'] = newFormData.fields[findex]['value'];
                }
            }

            let enableNext = false;

            this.setState({
                formData: formData,
                enableNext: enableNext
            })
        }

    }

    handleFormInputChange(name, value) {

        let formData = this.state.formData;
        formData[name] = value;

        let newState = {
            formData: formData
        };
        this.setState(newState);
    }

    handleInputChange(event) {
        event.preventDefault();
        const { name, value } = event.target;
        this.handleFormInputChange(name, value);
    }

    handleSelectChange(name, value) {
        this.handleFormInputChange(name, value);
    }

    handleDatePickerChange(name, date, dateString) {
        this.handleFormInputChange(name, dateString);
    }


    goNextForm() {

        let formData = MovingCountrySubForm.FnCreateFormData({
            country: this.state.formData['country'],
            moving_costs: this.state.formData['moving_costs']
        })

        this.props.cbUpdateSubForm(formID, formData);


        this.props.cbGoSubForm("GoalFinancingInformationSubForm");
    }

    render() {
        const { size } = this.state;
        const countries = [
            'Afghanistan', 'Albania', 'Algeria'
        ]
        return (
            <React.Fragment>
                    <h2 className="text-center font-weight-bold mb-4">Moving Country Information</h2>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Col>
                                <Form.Item label="Country Moving To">
                                <Select
                                    showSearch
                                    placeholder="-Select-"
                                    style={{width: '100%'}}
                                    value={this.state.formData.country}
                                    size={size}
                                    onChange={(value) => this.handleSelectChange("country", value)}
                                >
                                {
                                    countries.map((country, index) => <Option key={index} value={country}>{country}</Option>)
                                }
                                </Select>
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item  label="One-time Moving Costs">
                                    <Currency 
                                        value={this.state.formData.moving_costs}
                                        name="moving_costs"
                                        onChange={(event) => this.handleInputChange(event)}
                                    />
                                </Form.Item>
                            </Col>
                        </Col>
                    </Row>
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


export default connect()(MovingCountrySubForm);