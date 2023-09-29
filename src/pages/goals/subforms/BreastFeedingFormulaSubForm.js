import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Button, Checkbox, Icon, Col, Row, Slider  } from 'antd';

let checklistData = [
    {
        id: 'breastfeeding',
        title: 'Breastfeeding',
        total: 0,
        fields: [
            {
                id: 'electric_breast_pump',
                field_title: 'Electric breast pump',
                values: [30, 325]
            },
            {
                id: 'manual_breast_pump',
                field_title: 'Manual breast pump',
                values: [12, 39]
            },
            {
                id: 'nursing_pillows',
                field_title: 'Nursing pillows',
                values: [10, 40]
            },
            {
                id: 'total_breastfeeding',
                field_title: 'Total Breastfeeding'
            }
        ]
    },
    {
        id: 'feeding',
        title: 'Feeding',
        total: 0,
        fields: [
            {
                id: 'bottles_nipples',
                field_title: 'Bottles and nipples',
                values: [6, 60]
            },
            {
                id: 'high_chair',
                field_title: 'Highchair',
                values: [60, 250]
            },
            {
                id: 'sterilizer',
                field_title: 'Sterilizer',
                values: [38, 250]
            },
            {
                id: 'other_misc',
                field_title: 'Plates, spoons, and bowls and other misc.',
                values: [10]
            },
            {
                id: 'total_feeding',
                field_title: 'Total Feeding'
            }
        ]
    },
    {
        id: 'formula',
        title: 'Formula',
        total: 0,
        fields: [
            {
                id: 'plan_breastfeed',
                field_title: 'I plan to breastfeed',
                values: [0, 0, 0]
            },
            {
                id: 'formula_feeding',
                field_title: 'Formula feeding',
                values: [1800]
            },
            {
                id: 'custom',
                field_title: 'Custom',
                values: [4884, 10681]
            },
            {
                id: 'total_formula',
                field_title: 'Total Formula'
            }
        ]
    }
]

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});


const formID = "BreastFeedingFormulaSubForm";

class BreastFeedingFormulaSubForm extends Component {

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
        this.props.cbGoSubForm("GroomingSubForm");
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
                    <h2 className="text-center font-weight-bold mb-4">Breast Feeding \ Formula</h2>
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


export default connect()(BreastFeedingFormulaSubForm);