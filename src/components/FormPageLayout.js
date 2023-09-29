import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    Radio,
    DatePicker,
    Icon,
    Button
} from 'antd';
import moment from 'moment';
import Percent from './form/Percent';
import PhoneNumber from './form/PhoneNumber';
import WebAddress from './form/WebAddress';
import Email from './form/Email';
import TextArea from 'antd/lib/input/TextArea';
import Uploader from './form/Uploader';
import Country from './form/Country';
import Currency from './form/Currency';
import State from './form/State';
import { FormPage } from './Animations';
import posed from 'react-pose';

const { Option } = Select;
const dateFormat = 'MM/DD/YYYY';

const FormPagePose = posed.div({
    visible: { 
        x: '0%', 
        // staggerChildren: 100 
        opacity: 1,
        transition: { 
            ease: 'linear'
        }
    },
    hidden: { 
        x: '-100%' ,
        opacity: 0
    }
})

class FormPageLayout extends Component {

    constructor(props){
        super(props);

        this.state = {
            formIndex: 0,
            formsData: [],
            formVisible: false
        }

        this.handleFormInputChange = this.handleFormInputChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);

        this.goNextForm = this.goNextForm.bind(this);
        this.goToForm = this.goToForm.bind(this);

        this.getFormValue = this.getFormValue.bind(this);
    }

    componentDidMount() {
        // setTimeout(() => {
        //     this.setState({ formVisible: true });
        // }, 300);
        this.goToForm(this.state.formIndex);
    }

    goToForm(newformIndex){
        let formsData = this.state.formsData;
        if(this.state.formIndex >= formsData.length){
            formsData.push({});
        }

        console.log('goToForm:', newformIndex, ', form length:', this.props.forms.length);
        this.setState({
            formVisible: false,
            formsData: formsData
        });

        setTimeout(() => {
            this.setState({ 
                formVisible: true,
                formIndex: newformIndex, 
            });
        }, 100);

    }
    goNextForm(){
        let newformIndex = this.state.formIndex;

        if(this.state.formIndex < this.props.forms.length){
            this.props.forms[this.state.formIndex].created = true;
        }

        newformIndex++;
        if(newformIndex >= this.props.forms.length){
            newformIndex = this.props.forms.length - 1;
        }

        this.goToForm(newformIndex);
        
    }

    handleFormInputChange(name, value){
        let formsData = this.state.formsData;
        if(this.state.formIndex >= formsData.length){
            formsData.push({});
        }

        console.log('formIndex', this.state.formIndex, ', formsData length:', formsData.length);
        
        formsData[this.state.formIndex][name] = value;

        console.log('formsData', formsData);
        
        this.setState({
            formsData: formsData
        });
        
    }

    handleInputChange(event){
        event.preventDefault();
        const {name, value} = event.target;
        
        this.handleFormInputChange(name, value);

    }

    handleDatePickerChange(name, date, dateString){
        this.handleFormInputChange(name, dateString);
    }

    handleSelectChange(name, value){
        this.handleFormInputChange(name, value);
    }

    getFormValue(name){
        if(this.state.formIndex < this.state.formsData.length){
            return this.state.formsData[this.state.formIndex][name];
        }
        else{
            return null;
        }
        
    }

    render() {
        
        if(this.state.formIndex >= this.props.forms.length){
            return (null);
        }

        const form = this.props.forms[this.state.formIndex];


        return (
            <React.Fragment>
                <div className="page-nav-history">
                    {/* { 
                        this.props.navlinks.map((navlink, index) => {
                            return (
                                <span key={index}>
                                    <Link key={index} to={navlink.href} className="page-nav-link">
                                        {navlink.title}
                                    </Link>
                                    {index != (this.props.navlinks.length - 1) ? "/" : null}
                                </span>
                                
                            )                            
                        }) 
                    } */}
                </div>
                <div className="form-page-container">
                    <div className="form-page--left-side">
                        <FormPagePose className="info-form-block" pose={this.state.formVisible ? 'visible' : 'hidden'}>
                            <h4 className="title">{form.title}</h4>
                            {
                                form.rows.map((row, rindex) => {
                                    return (
                                        <Row gutter={16} key={rindex}>
                                            {
                                                row.map((col, cindex) => {
                                                    return (
                                                        <Col span={col.span} key={cindex}>
                                                            {
                                                                col.fields.map((field, findex) => {
                                                                    if(field.type == 'Input'){
                                                                        return (
                                                                            <Form.Item label={field.label} key={findex}>
                                                                                <Input placeholder={field.placeholder} name={field.name} onChange={(event) => this.handleInputChange(event)} addonAfter={field.addonAfter} addonBefore={field.addonBefore} value={this.getFormValue(field.name)}/>
                                                                                {field.description ? <p className="form-desc">{field.description}</p>: null}
                                                                            </Form.Item>
                                                                        )
                                                                    }
                                                                    else if(field.type == 'Percent'){
                                                                        return (
                                                                            <Form.Item label={field.label} key={findex}>
                                                                                <Percent placeholder={field.placeholder} name={field.name} onChange={(event) => this.handleInputChange(event)} value={this.getFormValue(field.name)}/>
                                                                                {field.description ? <p className="form-desc">{field.description}</p>: null}
                                                                            </Form.Item>
                                                                        )
                                                                    }
                                                                    else if(field.type == 'PhoneNumber'){
                                                                        return (
                                                                            <Form.Item label={field.label} key={findex}>
                                                                                <PhoneNumber placeholder={field.placeholder} name={field.name} onChange={(event) => this.handleInputChange(event)} value={this.getFormValue(field.name)}/>
                                                                                {field.description ? <p className="form-desc">{field.description}</p>: null}
                                                                            </Form.Item>
                                                                        )
                                                                    }
                                                                    else if(field.type == 'Currency'){
                                                                        return (
                                                                            <Form.Item label={field.label} key={findex}>
                                                                                <Currency placeholder={field.placeholder} name={field.name} onChange={(event) => this.handleInputChange(event)} value={this.getFormValue(field.name)}/>
                                                                                {field.description ? <p className="form-desc">{field.description}</p>: null}
                                                                            </Form.Item>
                                                                        )
                                                                    }
                                                                    else if(field.type == 'WebAddress'){
                                                                        return (
                                                                            <Form.Item label={field.label} key={findex}>
                                                                                <WebAddress placeholder={field.placeholder} name={field.name} onChange={(event) => this.handleInputChange(event)} value={this.getFormValue(field.name)}/>
                                                                                {field.description ? <p className="form-desc">{field.description}</p>: null}
                                                                            </Form.Item>
                                                                        )
                                                                    }
                                                                    else if(field.type == 'Email'){
                                                                        return (
                                                                            <Form.Item label={field.label} key={findex}>
                                                                                <Email placeholder={field.placeholder} name={field.name} onChange={(event) => this.handleInputChange(event)} value={this.getFormValue(field.name)}/>
                                                                                {field.description ? <p className="form-desc">{field.description}</p>: null}
                                                                            </Form.Item>
                                                                        )
                                                                    }
                                                                    else if(field.type == 'TextArea'){
                                                                        return (
                                                                            <Form.Item label={field.label} key={findex}>
                                                                                <TextArea placeholder={field.placeholder} name={field.name} onChange={(event) => this.handleInputChange(event)} value={this.getFormValue(field.name)}/>
                                                                                {field.description ? <p className="form-desc">{field.description}</p>: null}
                                                                            </Form.Item>
                                                                        )
                                                                    }
                                                                    else if(field.type == 'Select'){
                                                                        return (
                                                                            <Form.Item label={field.label} key={findex}>
                                                                                <Select
                                                                                    showSearch
                                                                                    placeholder={field.placeholder}
                                                                                    onChange={(value) => this.handleSelectChange(field.name, value)}
                                                                                    value={this.getFormValue(field.name)}
                                                                                >
                                                                                {
                                                                                    field.values.map((value, vindex) => <Option key={vindex} value={value}>{value}</Option>)
                                                                                }
                                                                                </Select>
                                                                                {field.description ? <p className="form-desc">{field.description}</p>: null}
                                                                            </Form.Item>
                                                                        )
                                                                    }
                                                                    else if(field.type == 'Radio'){
                                                                        return (
                                                                            <Form.Item label={field.label} key={findex}>
                                                                                <Radio.Group
                                                                                    name={field.name}
                                                                                    onChange={(event) => this.handleInputChange(event)}
                                                                                    value={this.getFormValue(field.name)}
                                                                                >
                                                                                    {
                                                                                        field.values.map((value, vindex) => <Radio key={vindex} value={value}>{value}</Radio>)
                                                                                    }
                                                                                </Radio.Group>
                                                                                {field.description ? <p className="form-desc">{field.description}</p>: null}
                                                                            </Form.Item>
                                                                        )
                                                                    }
                                                                    else if(field.type == 'DatePicker'){
                                                                        return (
                                                                            <Form.Item label={field.label} key={findex}>
                                                                                <DatePicker 
                                                                                    style={{ width: '100%' }} 
                                                                                    format={dateFormat} 
                                                                                    onChange={(date, dateString) => this.handleDatePickerChange(field.name, date, dateString)}
                                                                                    defaultValue={this.getFormValue(field.name) == null ? '' : moment(this.getFormValue(field.name), dateFormat)}/>
                                                                                {field.description ? <p className="form-desc">{field.description}</p>: null}
                                                                            </Form.Item>
                                                                        )
                                                                    }
                                                                    else if(field.type == 'SubForm'){
                                                                        const SubForm = field.subform;
                                                                        return (
                                                                            <SubForm key={findex}/>
                                                                        )
                                                                    }
                                                                    else if(field.type == 'Uploader'){
                                                                        return (
                                                                            <Form.Item label={field.label} key={findex}>
                                                                                <Uploader></Uploader>
                                                                            </Form.Item>
                                                                        )
                                                                    }
                                                                    else if(field.type == 'Country'){
                                                                        return (
                                                                            <Form.Item label={field.label} key={findex}>
                                                                                <Country 
                                                                                    onChange={(value) => this.handleSelectChange(field.name, value)}
                                                                                    value={this.getFormValue(field.name)}
                                                                                />
                                                                            </Form.Item>
                                                                        )
                                                                    }
                                                                    else if(field.type == 'State'){
                                                                        return (
                                                                            <Form.Item label={field.label} key={findex}>
                                                                                <State 
                                                                                    onChange={(value) => this.handleSelectChange(field.name, value)}
                                                                                    value={this.getFormValue(field.name)}
                                                                                />
                                                                            </Form.Item>
                                                                        )
                                                                    }
                                                                })
                                                            }
                                                        </Col>
                                                    )
                                                })
                                            }
                                        </Row>
                                    )
                                })
                            }
                        </FormPagePose>
                        <div>
                            <Button type="primary" onClick={() => this.goNextForm()}>Next</Button>
                        </div>
                    </div>
                    <div className="form-page--right-side">
                        <div className="form-page--right-side-wrap">
                        {
                            this.props.forms.map((form, findex) => {
                                if(form.created){
                                    return (
                                        <div className="form-brief-block" key={findex}>
                                            <div className="form-brief-top">
                                                <h4 className="form-brief-title">{form.antiTitle ? form.antiTitle : form.title}</h4>
                                                <span className="form-brief-edit-btn" onClick={() => this.goToForm(findex)}><Icon type="edit"></Icon></span>
                                            </div>
                                            <div className="form-brief-content">
                                            {
                                                form.rows.map((row, rindex) => {
                                                    return(
                                                        <div key={rindex}>
                                                        {
                                                            row.map((col, cindex) => {
                                                                return (
                                                                    <div key={cindex}>
                                                                    {
                                                                        col.fields.map((field, ffindex) => {
                                                                            return(
                                                                                <div className="form-brief-item" key={ffindex}>
                                                                                    <p className="form-brief-item-title">{field.antiLabel ? field.antiLabel : field.label}: </p>
                                                                                    <p className="form-brief-item-value">
                                                                                    {
                                                                                        findex < this.state.formsData.length ? this.state.formsData[findex][field.name] : null
                                                                                    }
                                                                                    </p>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                        </div>
                                                    ) 
                                                })
                                            }
                                            </div>
                                        </div>
                                    )
                                }
                                else{
                                    return (<div key={findex}></div>)
                                }
                                
                            })
                        }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default FormPageLayout;