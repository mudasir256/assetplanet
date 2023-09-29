import React,{useState} from 'react'
import ContactInfo from './sub-components/contact-info';
import FormHeader from '../../styled-components/form-header/form-header';
import RightSidebar from '../../styled-components/right-sidebar/right-sidebar';
function ClientContacts() {
    const [rightToggleClass, setRightToggleClass] = useState(false);

  const [activeTabData, setActiveTabData] = useState({
    name: "ContactInformation",
    title: "Contact Information",
    unique: "firstName",
    isMulti: false,
    component: ContactInfo,
  });
  const ActiveComponent = activeTabData.component;

  const demoData = {
    ContactInformation: {
      name: "ContactInformation",
      title: "Contact Information",
      unique: "firstName",
      isMulti: false,
      component: ContactInfo,
      ContactInformation: {},
    },
  };

  const [allFormsData, setAllFormsData] = useState(demoData);


 

  const handleDemoObject = (pageData) => {
    setAllFormsData((formData) => {
      console.log("pagedattaa", activeTabData);
      return {
        ...formData,
        [activeTabData.name]: {
          ...formData[activeTabData.name],
          [activeTabData.name]: activeTabData.isMulti
            ? {
                ...formData[activeTabData.name][activeTabData.name],
                [pageData[activeTabData.unique]]: pageData,
              }
            : { [pageData[activeTabData.unique]]: pageData },
        },
      };
    });
  };

  const handleRightToggleClass = () => {
    setRightToggleClass(!rightToggleClass);
  };
  return (
    <>
    <div
      className={
        rightToggleClass
          ? "form-page-container-wrap right-side--opend"
          : "form-page-container-wrap right-side--collapsed"
      }
    >
      <FormHeader headerData={demoData} activeTabData={activeTabData} setActiveTabData={setActiveTabData} />
      <ActiveComponent
        handleDemoObject={handleDemoObject}
        data={allFormsData}
    
        activeTabData={activeTabData}
      />
      <div className="form-page--right-side custom">
        <span
          className="right-side-collapse-icon"
          onClick={handleRightToggleClass}
        >
          <i className="fe-menu"></i>
        </span>
        <div className="form-page--right-side-wrap">
          <RightSidebar data={allFormsData} />
        </div>
      </div>
    </div>
  </>
  )
}

export default ClientContacts