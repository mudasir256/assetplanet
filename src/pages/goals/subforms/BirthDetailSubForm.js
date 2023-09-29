import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Button, Checkbox, Icon, Col, Row, Slider  } from 'antd';

let checklistData = [
    {
        id: 'birth',
        title: 'Birth',
        total: 0,
        fields: [
            {
                id: 'vaginal_birth_insured',
                field_title: 'Vaginal birth with health insurance',
                values: [4884, 10681]
            },
            {
                id: 'csection_birth_insured',
                field_title: 'C-section birth with health insurance',
                values: [7404, 14927]
            },
            {
                id: 'vaginal_birth',
                field_title: 'Vaginal birth without health insurance',
                values: [9013, 19775]
            },
            {
                id: 'csection_birth',
                field_title: 'C-section birth without health insurance',
                values: [12593, 28491]
            },
            {
                id: 'home_birth',
                field_title: 'Home birth',
                values: [2908]
            },
            {
                id: 'birth_center',
                field_title: 'Birth center',
                values: [3000, 4000]
            },
            {
                id: 'year_expense',
                field_title: 'One-Time Expenses For The First Year',
                values: [0,0,0]
            },
            {
                id: 'total_birth_costs',
                field_title: 'Total Birth Costs'
            }
        ]
    },
    {
        id: 'nursery',
        title: 'Nursery',
        total: 0,
        fields: [
            {
                id: 'crib_matress',
                field_title: 'Crib and matress',
                values: [180, 1000]
            },
            {
                id: 'bassinet',
                field_title: 'Bassinet',
                values: [50, 260]
            },
            {
                id: 'changing_table',
                field_title: 'Changing table',
                values: [80, 250]
            },
            {
                id: 'bedding_blankets',
                field_title: 'Bedding and blankets',
                values: [24, 190]
            },
            {
                id: 'baby_monitor',
                field_title: 'Baby monitor',
                values: [40, 60]
            },
            {
                id: 'glider_rock',
                field_title: 'Glider or rocker',
                values: [189, 600]
            },
            {
                id: 'dresser',
                field_title: 'Dresser',
                values: [80, 500]
            },
            {
                id: 'decorations_misc',
                field_title: 'Decorations and other misc.',
                values: [10, 150]
            },
            {
                id: 'total_nursery',
                field_title: 'Total Nursery'
            }

        ]
    }
]

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});


const formID = "BirthDetailSubForm";

class BirthDetailSubForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            enableNext: false,
            indeterminate: false,
            checkAll: false,
            formData: {
            }
        }
        this.goNextForm = this.goNextForm.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormInputChange = this.handleFormInputChange.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    componentDidMount() {
        this.updateFormData(this.props.subFormData);
    }

    updateFormData(newFormData){
        let formData = this.state.formData;
        if(newFormData.hasOwnProperty('fields')){
            for(var findex = 0; findex < newFormData.fields.length; findex++){
               
            }
    
            let enableNext = false;

            this.setState({
                formData: formData,
                enableNext: enableNext
            })
        }
        
    }

    handleInputChange(event, id, index){
        const {name, value} = event.target;
        let inputValue = parseInt(value);
        if(isNaN(inputValue)) {
            inputValue = 0;
        }

        if(this.state[`${id}_cbx`]){
            if(this.state.formData[`${id}_input`]){
                checklistData[index].total = checklistData[index].total -= this.state.formData[`${id}_input`];
            }
            checklistData[index].total = checklistData[index].total += inputValue;
            this.handleFormInputChange(name, inputValue);
            this.handleFormInputChange(index, `${formatter.format(checklistData[index].total)}`)
        } else {
            this.handleFormInputChange(name, inputValue);
        }
    }

    handleOnChange = (value, id, index) => {
        let formData = this.state.formData;
        
        if(this.state[`${id}_cbx`]){
            if(this.state.formData[`${id}_input`]){
                checklistData[index].total = checklistData[index].total -= this.state.formData[`${id}_input`];
            }
            checklistData[index].total = checklistData[index].total += value;
            this.handleFormInputChange(`${id}_input`, value);
            this.handleFormInputChange(index, `${formatter.format(checklistData[index].total)}`)
        } else {
            this.handleFormInputChange(`${id}_input`, value);
        }
    };

    handleCheckboxOnCheck(event, values, index){
        if(event.target.checked) {
            this.setState({
                [`${event.target.name}_cbx`]:true
            });
            if(values.length == 2){
                const inputValue = parseInt(this.state.formData[`${event.target.name}_input`]);
                checklistData[index].total = checklistData[index].total += inputValue;
            } else if(values.length == 1) {
                checklistData[index].total = checklistData[index].total += values[0];
            } else if(values.length == 3) {
                const inputValue = parseInt(this.state.formData[`${event.target.name}_input`]);
                checklistData[index].total = checklistData[index].total += inputValue;
            }
        } else {
            this.setState({
                [`${event.target.name}_cbx`]:false
            });
            if(values.length == 2){
                const inputValue = parseInt(this.state.formData[`${event.target.name}_input`]);
                checklistData[index].total = checklistData[index].total -= inputValue;
            } else if(values.length == 1) {
                checklistData[index].total = checklistData[index].total -= values[0];
            } else if(values.length == 3) {
                const inputValue = this.state.formData[`${event.target.name}_input`];
                checklistData[index].total = checklistData[index].total -= inputValue;
            }
        }

        this.handleFormInputChange(index, `${formatter.format(checklistData[index].total)}`)
    }

    handleFormInputChange(name, value){
        
        let formData = this.state.formData;
        formData[name] = value;

        let newState = {
            formData: formData
        };
        this.setState(newState);
    }

    getFormValue(name){
        if(this.state.formData.length){
            return this.state.formData[name];
        }
        else{
            return null;
        }
        
    }


    goNextForm(){
        this.props.cbGoSubForm("BreastFeedingFormulaSubForm");
    }

    formatter(value) {
        return `${formatter.format(value)}`;
    }

    createTable = () => {
        let table = [];

        checklistData.map((data, index) => {
            let children = [];

            data.fields.map((field) => {
                let field_element = '';
                if(field.values) {
                    if(field.values.length == 2){
                       field_element =  <Row key={field.id}>
                                            <Col span={16}>
                                                <Checkbox
                                                    name={field.id}
                                                    onChange={(event) => this.handleCheckboxOnCheck(event, field.values, index)}
                                                    disabled={!this.state.formData[`${field.id}_input`]}
                                                >
                                                    {`${field.field_title}:`}
                                                </Checkbox>
                                            </Col>
                                            <Col span={8}>
                                                <p>{this.state[`${field.id}_cbx`]}</p>
                                                <Slider
                                                    min={field.values[0]}
                                                    max={field.values[1]}
                                                    tipFormatter={this.formatter}
                                                    tooltipVisible={this.state.formData[`${field.id}_input`] ? 1:0}
                                                    marks={{[field.values[0]]:`${formatter.format(field.values[0])}`, [field.values[1]]:`${formatter.format(field.values[1])}`}}
                                                    onChange={(value) => this.handleOnChange(value, field.id, index)}
                                                />
                                            </Col>
                                        </Row>;
                    } else if(field.values.length == 1) {
                        field_element = <Row key={field.id}>
                                            <Col span={16}>
                                                <Checkbox
                                                    name={field.id}
                                                    onChange={(event) => this.handleCheckboxOnCheck(event, field.values, index)}
                                                >
                                                    {`${field.field_title}:`}
                                                </Checkbox>
                                            </Col>
                                            <Col span={8}>
                                                {` ${formatter.format(field.values[0])}`}
                                            </Col>
                                        </Row>;
                    } else if(field.values.length == 3) {
                        field_element = <Row key={field.id}>
                                            <Col span={16}>
                                            <Checkbox 
                                                name={field.id}
                                                onChange={(event) => this.handleCheckboxOnCheck(event, field.values, index)}
                                                disabled={!this.state.formData[`${field.id}_input`]}
                                            >{`${field.field_title}:`}</Checkbox>
                                            </Col>
                                            <Col span={3} className="mr-2">
                                                <Slider
                                                    onChange={this.onChange}
                                                    tipFormatter={this.formatter}
                                                    min={0}
                                                    max={this.state.formData[`${field.id}_input`]}
                                                    value={this.state.formData[`${field.id}_input`]}
                                                />
                                            </Col>
                                            <Col span={4}>
                                                <Input
                                                    addonBefore="$"
                                                    type="number"
                                                    value={this.state.formData[`${field.id}_input`]}
                                                    name={`${field.id}_input`}
                                                    size="large"
                                                    onChange={(event) => this.handleInputChange(event, field.id, index)}
                                                />
                                            </Col>

                                        </Row>;
                    }
                } else {
                    field_element = <Row key={field.id} className="mt-3">
                                        <Col span={16}>
                                            <label>{`${field.field_title} : `}</label>
                                        </Col>
                                        <Col span={8}>
                                            {this.state.formData[index]}
                                        </Col>
                                    </Row>;
                }

                children.push(field_element)
            })

            //Create the parent and add the children
            table.push(<div className="mb-3" key={index}>
                            <label>{data.title}</label>
                            {children}
                        </div>)
        })
        return table;
    }


    render() {
        
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <h2 className="text-center font-weight-bold mb-4">Birth and Nursery Details</h2>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            {this.createTable()}
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


export default connect()(BirthDetailSubForm);