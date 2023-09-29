import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Button, Icon } from 'antd';

import SubFormTable from '../../../../components/SubFormTable';

const otherTaxCredits = [
   'Carry Forward Loss', 'Adoption Credit', 'American Opportunity Credit and Lifetime Learning Credit', 'Child and Dependent Care Credit', 'Child Tax Credit', 'Credit for Tax on Undistributed Capital Gain', 'Credit for the Elderly or Disabled', 'Credit to Holders of Tax Credit Bonds', 'Earned Income Tax Credit', 'Excess Social Security and RRTA Tax Withheld', 'Foreign Tax Credit', 'Health Coverage Tax Credit', 'Low-Income Housing Credit (for Owners)', 'Nonbusiness Energy Property Credit', 'Nonrefundable Credit for Prior Year Minimum Tax', 'Premium Tax Credit (Affordable Care Act)', 'Residential Energy Efficient Property Credit', "Saver's Credit"
];

var formChanged = false;
var formData = [];

const formID = "NewTaxCreditSubForm";
class NewTaxCreditSubForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            enableNext: true,
            formData: {
                
            },
            rows:[]
        }

        this.goNextForm = this.goNextForm.bind(this);
        this.formChange = this.formChange.bind(this);

        this.updateFormData = this.updateFormData.bind(this);

    }

    componentDidMount() {
        this.updateFormData(this.props.subFormData);
    }

    updateFormData(newFormData){
        console.log('updateformdata:', newFormData);
        if(newFormData.hasOwnProperty('data')){
            let newRows = [];
            for(var index = 0; index < newFormData['data'].length; index++){
                newRows.push({
                    key: newFormData['data'][index]['id'],
                    uuid: newFormData['data'][index]['id'],
                    id: newFormData['data'][index]['id'],
                    creditAmount: newFormData['data'][index]['amountOfCredit'],
                    otherTaxCredit: newFormData['data'][index]['otherTaxCredit']
                })
            }

            this.setState({
                rows: newRows
            })
        }
    }

    goNextForm(){
        if(!this.state.enableNext){
            return;
        }

        if(formChanged){
            let newFormData = [];
            for(var index = 0; index < formData.length; index++){
                newFormData.push({
                    amountOfCredit: formData[index]['creditAmount'] != '' ? parseInt(formData[index]['creditAmount']) : 0,
                    otherTaxCredit: formData[index]['otherTaxCredit']
                })
            }
            this.props.cbUpdateSubForm(formID, newFormData, false);
        }     

        this.props.cbGoSubForm("CapitalGainsSubForm");
               
    }

    formChange(rows){
        formChanged = true;
        formData = rows;
    }
    goPreviousForm(){
        this.props.cbGoSubForm("TaxInformationSubForm");
    }

    render() {
        
        const colsFormat = [
            {
                title: 'Other Tax Credit',
                dataIndex: 'otherTaxCredit',
                key: 'otherTaxCredit',
                fields: [
                    {
                        type: 'Select',
                        name: 'otherTaxCredit',
                        placeholder: '-Select-',
                        values: otherTaxCredits
                    }
                ]
            },
            {
                title: 'Amount of Credit',
                dataIndex: 'creditAmount',
                key: 'creditAmount',
                fields: [
                    {
                        type: 'Currency',
                        name: 'creditAmount'
                    }
                ]
            },
            {
                title: 'Whose Credit',
                dataIndex: 'whoseCredit',
                key: 'whoseCredit',
                fields: [
                    {
                        type: 'Select',
                        name: 'whoseCredit',
                        placeholder: '-Select-',
                        values: otherTaxCredits
                    }
                ]
            },
        ];

        return (
            <React.Fragment>
                <SubFormTable 
                    title="New Tax Credit" 
                    rows={this.state.rows} 
                    colsFormat={colsFormat}
                    addNewButton={true}
                    cbFormChange={this.formChange}
                >
                </SubFormTable>
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


export default connect()(NewTaxCreditSubForm);