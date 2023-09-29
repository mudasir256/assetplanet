import React from 'react'
import { Typography } from 'antd';
import CheckList from './CheckList';

const { Title } = Typography;

const Sidebar = () => {
  return (
    <div className='right-side-menu' style={{ padding: '30px 20px' }}>
      <Title>Checklist</Title>
      <div style={{ marginTop: 20 }}>
        <CheckList title='Video Message' link='/audio_video_message' complete />
        <CheckList title='Emails to Send' link='/emails_to_send' inComplete />
        <CheckList title='Contact List' link='/contact_list' complete />
        <CheckList title='Important Documents' link='/important_documents' complete />
        <CheckList title='Personal Instructions' link='/personal_instructions' inComplete />
        <CheckList title='List of Large Bills' link='/list_of_large_bills' inComplete />
        <CheckList title='Litigation List' link='/litigation_lists' inComplete />
        <CheckList title='List of Passwords' link='/list_of_passwords' complete />
        <CheckList title='Location of Personal Items' link='/location_of_personal_items' complete />
        <CheckList title='Prepaid Burial Expenses' link='/prepaid_burial_expenses' inComplete />
      </div>
    </div>
  );
}

export default Sidebar
