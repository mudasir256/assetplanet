import React, { Component } from 'react';

/**
 * Custom Components
 */
import PageTitle from '../../../../components/layout/PageTitle';
import AddAudioVideoMessageForm from './modals/Form';

class AddAudioVideoMessage extends Component {

    render() {
        return ( 
            <div className="pageWrapper">
                <PageTitle title="Audio/Video Message" />
                <AddAudioVideoMessageForm />
            </div>
        )
    }
}


export default AddAudioVideoMessage;