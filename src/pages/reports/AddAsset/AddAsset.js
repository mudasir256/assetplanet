import React, { Component } from 'react';
import { connect } from 'react-redux';

/* *** Antd Components *** */
import { Row } from 'antd';

/* *** Custom Components *** */
import PageTitle from '../../../components/layout/PageTitle';
import AddAssetForm from './modals/AddAssetForm';

class AssetReport extends Component {
    render() {
        return (
            <div className="pageWrapper">
                <PageTitle title="Add Asset" />
                <AddAssetForm />
            </div>
        )
    }
}


export default connect()(AssetReport);