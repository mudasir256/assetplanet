import React, { Component } from 'react';

/**
 * Custom Components
 */
import PageTitle from '../../../../components/layout/PageTitle';
import AddLitigationListsForm from './modals/Form';

class AddLitigationLists extends Component {

    render() {
        return ( 
            <div className="pageWrapper">
                <PageTitle title="Litigation list" />
                <AddLitigationListsForm />
            </div>
        )
    }
}


export default AddLitigationLists;