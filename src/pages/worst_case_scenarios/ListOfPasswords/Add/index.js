import React, { Component } from 'react';

/**
 * Custom Components
 */
import PageTitle from '../../../../components/layout/PageTitle';
import AddListOfPasswordsForm from './modals/Form';

class AddListOfPasswords extends Component {

    render() {
        return ( 
            <div className="pageWrapper">
                <PageTitle title="List of passwords" />
                <AddListOfPasswordsForm />
            </div>
        )
    }
}


export default AddListOfPasswords;