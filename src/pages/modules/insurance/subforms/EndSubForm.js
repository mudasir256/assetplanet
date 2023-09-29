import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Button } from 'antd';

const formID = 'EndSubForm';
class EndSubForm extends Component {

    constructor(props) {
        super(props);

        this.goList = this.goList.bind(this);
    }

    goList(){
        window.location.href = "/insurance";
    }

    render() {

        return (
            <React.Fragment>
                <div className="info-form-block d-flex align-items-center justify-content-center">
                    <h2>Your Data has been Saved!</h2>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                    <Button className="pl-4 pr-4" size="large" type="primary" onClick={() => this.goList()}>OK</Button>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(EndSubForm);