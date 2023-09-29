import React, { Component } from 'react';

/**
 * Custom Components
 */
import PageTitle from '../../../../components/layout/PageTitle';
import AddImportantDocumentForm from './modals/Form';

class AddImportantDocument extends Component {

    render() {
        return ( 
            <div className="pageWrapper">
                <PageTitle title="Personal Instruction" />
                <AddImportantDocumentForm />
            </div>
        )
    }
}


export default AddImportantDocument;