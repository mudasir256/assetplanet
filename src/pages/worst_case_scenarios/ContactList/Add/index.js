import React, { Component } from 'react';

/**
 * Custom Components
 */
import PageTitle from '../../../../components/layout/PageTitle';
import AddContactListForm from './modals/Form';

class AddContactList extends Component {

    render() {
        return ( 
            <div className="pageWrapper">
                <PageTitle title="Contact" />
                <AddContactListForm />
            </div>
        )
    }
}


export default AddContactList;