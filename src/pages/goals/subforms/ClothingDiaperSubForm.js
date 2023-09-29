import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Button, Checkbox, Icon, Col, Row, Slider  } from 'antd';

let checklistData = [
    {
        id: 'clothing',
        title: 'Clothing',
        total: 0,
        fields: [
            {
                id: 'new_clothes',
                field_title: 'New clothes',
                values: [600]
            },
            {
                id: 1,
                field_title: 'Second-hand clothes',
                values: [200]
            },
            {
                id: 2,
                field_title: 'Custom',
                values: [0,0,0]
            },
            {
                id: 3,
                field_title: 'Total Clothing'
            }
        ]
    },
    {
        id: 'diapers',
        title: 'Diapers',
        total: 0,
        fields: [
            {
                id: 'disposable_diapers',
                field_title: 'Disposable diapers',
                values: [750]
            },
            {
                id: 'disposable_wipes',
                field_title: 'Disposable wipes',
                values: [240]
            },
            {
                id: 'cloth_diapers',
                field_title: 'Cloth diapers',
                values: [200]
            },
            {
                id: 'cloth_diaper_service',
                field_title: 'Cloth diaper service',
                values: [1200]
            },
            {
                id: 'custom',
                field_title: 'Custom',
                values: [0,0,0]
            },
            {
                id: 'total_diapers',
                field_title: 'Total Diapers'
            }
        ]
    }
]

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});


const formID = "ClothingDiaperSubForm";

class ClothingDiaperSubForm extends Component {

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
        this.props.cbGoSubForm("HealthEntertainmentSubForm");
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
                    <h2 className="text-center font-weight-bold mb-4">Clothing and Diapers</h2>
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


export default connect()(ClothingDiaperSubForm);