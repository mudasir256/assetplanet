import React, { Component } from 'react';

/**
 * Custom Components
 */
import PageTitle from '../../../../components/layout/PageTitle';
import AddLocationOfPersonalItemForm from './modals/Form';

class AddLocationOfPersonalItem extends Component {

    render() {
        return ( 
            <div className="pageWrapper">
                <PageTitle title="Location of personal items" />
                <AddLocationOfPersonalItemForm />
            </div>
        )
    }
}


export default AddLocationOfPersonalItem;