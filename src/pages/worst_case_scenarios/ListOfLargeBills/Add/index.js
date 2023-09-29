import React, { Component } from 'react';

/**
 * Custom Components
 */
import PageTitle from '../../../../components/layout/PageTitle';
import AddListOfLargeBillsForm from './modals/Form';

class AddListOfLargeBills extends Component {

    render() {
        return ( 
            <div className="pageWrapper">
                <PageTitle title="List of large bills" />
                <AddListOfLargeBillsForm />
            </div>
        )
    }
}


export default AddListOfLargeBills;