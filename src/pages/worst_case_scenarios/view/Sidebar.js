import React from 'react'
import SidebarLink from '../../../components/SidebarLink';

const Sidebar = () => {
  return (
    <div className="view-right-side-menu">
      <SidebarLink link="/asset_planet_message" title="Asset Planet Message" />
      <SidebarLink link="/summary" title="Summary" />
      <SidebarLink link="/audio_video_message_view" title="Audio/Video Message" />
      <SidebarLink link="/emails_to_send_view" title="Email to Send" />
      <SidebarLink link="/contact_list_view" title="Contact List" />
      <SidebarLink link="/important_documents_view" title="Important Documents" />
      <SidebarLink link="/personal_instructions_view" title="Personal Instructions" />
      <SidebarLink link="/list_of_large_bills_view" title="List of Large Bills" />
      <SidebarLink link="/litigation_lists_view" title="Litigation Lists" />
      <SidebarLink link="/list_of_passwords_view" title="List of Passwords" />
      <SidebarLink link="/location_of_personal_items_view" title="Location of Personal Items" />
      <SidebarLink link="/prepaid_burial_expenses_view" title="Prepaid Burial Expenses" />
  </div>
  )
}

export default Sidebar
