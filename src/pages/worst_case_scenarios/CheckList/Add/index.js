import React, { Component } from 'react';

/**
 * Custom Components
 */
import PageTitle from '../../../../components/layout/PageTitle';
import AddCheckListForm from './modals/Form';

class AddCheckList extends Component {

    render() {
        return ( 
            <div className="pageWrapper">
                <PageTitle title="Check List" />
                <AddCheckListForm />
            </div>
        )
    }
}


export default AddCheckList;