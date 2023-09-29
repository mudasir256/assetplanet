import React, { Component } from 'react';

/**
 * Custom Components
 */
import PageTitle from '../../../../components/layout/PageTitle';
import AddEmailsToSendForm from './modals/Form';

class AddEmailsToSend extends Component {

    render() {
        return ( 
            <div className="pageWrapper">
                <PageTitle title="Email Templates" />
                <AddEmailsToSendForm />
            </div>
        )
    }
}


export default AddEmailsToSend;