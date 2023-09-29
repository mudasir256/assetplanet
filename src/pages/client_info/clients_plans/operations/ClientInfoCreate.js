import React, { useState } from "react";
import ClientInfoSideDisplay from "./ClientInfoSideDisplay";

function ClientInfoCreate() {
  const [clientInfo, setClientInfo] = useState({
    ClientInfoForm: {},
    SpousePartnerForm: {},
    DependentsForm: {},
    TrustForm: {},
    CorporateForm: {},
    CharityForm: {},
    OthersFinanciallyImpactedForm: {},
  });

  const handleClientInfoObject = (formName, pageData) => {
    let formData = clientInfo;

    formData[formName] = pageData;

    setClientInfo(formData);
  };
  return (
    <div>
      <ClientInfoSideDisplay></ClientInfoSideDisplay>
    </div>
  );
}

export default ClientInfoCreate;
