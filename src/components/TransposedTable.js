import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';

class TransposedTable extends Component {

    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <React.Fragment>
                <Table columns={this.props.cols} dataSource={this.props.rows} pagination={{position: 'top'}} className="transposed-table" />
            </React.Fragment>
        )
    }
}


export default connect()(TransposedTable);