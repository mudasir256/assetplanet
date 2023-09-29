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
        window.location.href = "/rates_of_return";
    }

    render() {

        return (
            <React.Fragment>
                <div className="info-form-block">
                    <p>Your Data has been Saved!</p>
                </div>
                <div>
                    <Button type="primary" onClick={() => this.goList()}>OK</Button>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(EndSubForm);