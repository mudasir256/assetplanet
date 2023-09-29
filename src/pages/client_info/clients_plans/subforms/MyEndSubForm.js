import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Button } from 'antd';

const formID = 'MyEndSubForm';
class MyEndSubForm extends Component {

    constructor(props) {
        super(props);

        this.goList = this.goList.bind(this);
    }

    goList(){
        this.props.history.push("/welcome");
    }

    render() {

        return (
            <React.Fragment>
                <div className="info-form-block">
                    <p>Your Data has been Saved!</p>
                </div>
                <div>
                    <Button type="primary" onClick={this.goList}>OK</Button>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.rootReducer.loginUser.loginUserData

    }
}
export default connect(mapStateToProps, null)(MyEndSubForm);