import React, { Component } from 'react';

/**
 * Custom Components
 */
import PageTitle from '../../../../components/layout/PageTitle';
import AddProgressStatusesForm from './modals/Form';

class AddProgressStatuses extends Component {

    render() {
        return ( 
            <div className="pageWrapper">
                <PageTitle title="Progress Statuses" />
                <AddProgressStatusesForm />
            </div>
        )
    }
}


export default AddProgressStatuses;