import React, { Component } from 'react';

/**
 * Custom Components
 */
import PageTitle from '../../../../components/layout/PageTitle';
import AddPrepaidBurialExpensesForm from './modals/Form';

class AddPrepaidBurialExpenses extends Component {

    render() {
        return ( 
            <div className="pageWrapper">
                <PageTitle title="Prepaid Burial Expenses" />
                <AddPrepaidBurialExpensesForm />
            </div>
        )
    }
}


export default AddPrepaidBurialExpenses;