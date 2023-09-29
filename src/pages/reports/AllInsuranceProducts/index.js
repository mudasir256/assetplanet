import React, { Component } from 'react';
import { connect } from 'react-redux';
/* *** Antd Components *** */

/* *** Custom Components *** */
import PageTitle from '../../../components/layout/PageTitle';
import Synopsis from '../../../components/layout/Synopsis/Synopsis';
import AllInsuranceProductsReport from './modals/AllInsuranceProductsReport';

class AllInsuranceProducts extends Component {
    render() {
        return (
            <div className="pageWrapper">
                <PageTitle title="All Insurance Products Report" />
                <Synopsis content="Detailed listing of All Insurance Products" />
                <AllInsuranceProductsReport />
            </div>
        )
    }
}


export default connect()(AllInsuranceProducts);