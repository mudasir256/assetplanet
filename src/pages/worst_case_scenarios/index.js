import React, { Component } from 'react';
import { connect } from 'react-redux';

import { BlockLink } from '../../components/Animations';

class ClientInfo extends Component {
    render() {
        
        return (            
            <div className="module-blocks">
                <BlockLink className="module-block-link" link="/executor_trustee_start" title="Executor / Trustee Start Here" />
                <BlockLink className="module-block-link" link="/audio_video_message" title="Audio/Video Message" />
                <BlockLink className="module-block-link" link="/check_list" title="Check List" />
                <BlockLink className="module-block-link" link="/contact_list" title="Contact List" />
                <BlockLink className="module-block-link" link="/emails_to_send" title="Email Templates" />
                <BlockLink className="module-block-link" link="/important_documents" title="Important Documents" />
                <BlockLink className="module-block-link" link="/personal_instructions" title="Personal Instructions" />
                <BlockLink className="module-block-link" link="/list_of_large_bills" title="List of Large Bills" />
                <BlockLink className="module-block-link" link="/litigation_lists" title="Litigation Lists" />
                <BlockLink className="module-block-link" link="/location_of_personal_items" title="Location of personal items" />
                <BlockLink className="module-block-link" link="/list_of_passwords" title="List of passwords Report" />
                <BlockLink className="module-block-link" link="/prepaid_burial_expenses" title="Prepaid Burial Expenses Report" />
                <BlockLink className="module-block-link" link="/progress_statuses" title="Programming Status - User" />
            </div>
        )
    }
}


export default connect()(ClientInfo);