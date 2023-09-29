import FETCH from "../utils/fetch";
import ROUTES from "../config/routes";
const addPersonalInstructions = async (body) => {
  let res = await FETCH.post({
    url: ROUTES.PERSONAL_INSTRUCTIONS,
    body,
  });
  return res;
};
const updatePersonalInstructions = async (id, body) => {
  let res = await FETCH.put({
    url: ROUTES.PERSONAL_INSTRUCTIONS,
    id,
    body,
  });
  return res;
};

const fetchPersonalInstructions = async (id) => {
  const userRole = localStorage.getItem("role") != 'undefined' && JSON.parse(localStorage.getItem("role"))

  let res = await FETCH.get({
    // url: ROUTES.PERSONAL_INSTRUCTIONS,
    url: userRole === "protrustee" ? `${ROUTES.PERSONAL_INSTRUCTIONS}?id=${id}` : ROUTES.PERSONAL_INSTRUCTIONS,

  });
  return res;
};
const fetchContactList = async (id) => {
  const userRole = localStorage.getItem("role") != 'undefined' && JSON.parse(localStorage.getItem("role"))

  let res = await FETCH.get({
    // url: ROUTES.CONTACT_LIST,
    // url: `${ROUTES.CONTACT_LIST}?id=${id}`,
    url: userRole === "protrustee" ? `${ROUTES.CONTACT_LIST}?id=${id}` : ROUTES.CONTACT_LIST,
  });
  return res;
};
const fetchTrusteeList = async () => {
  let res = await FETCH.get({
    // url: ROUTES.CONTACT_LIST,
    // url: `${ROUTES.CONTACT_LIST}?id=${id}`,
    url: ROUTES.CONTACT_LIST,
  });
  return res;
};
const addContactList = async (body, id) => {
  const userRole = localStorage.getItem("role") != 'undefined' && JSON.parse(localStorage.getItem("role"))
  let res = await FETCH.post({
    url: userRole === "protrustee" ? `${ROUTES.CONTACT_LIST}?clientId=${id}` : ROUTES.CONTACT_LIST,
    body,
  });
  return res;
};
const addPasswords = async (body) => {
  let res = await FETCH.post({
    url: ROUTES.PASSWORDS,
    body,
  });
  return res;
};
const updatePasswords = async (id, body) => {
  let res = await FETCH.put({
    url: ROUTES.PASSWORDS,
    id,
    body,
  });
  return res;
};
const deletePersonalInstruction = async (id) => {
  let res = await FETCH.deletee({
    url: ROUTES.PERSONAL_INSTRUCTIONS,
    id,
  });
  return res;
};
const deleteContact = async (id) => {
  let res = await FETCH.deletee({
    url: ROUTES.CONTACT_LIST,
    id,
  });
  return res;
};
const fetchPasswords = async (value, id) => {
  const userRole = localStorage.getItem("role") != 'undefined' && JSON.parse(localStorage.getItem("role"))

  let res = await FETCH.get({
    // url: ROUTES.PASSWORDS,
    // url: `${ROUTES.PASSWORDS}?otp=${value}`,
    url: userRole === "protrustee" ? `${ROUTES.PASSWORDS}?otp=${value}&id=${id}` : `${ROUTES.PASSWORDS}?otp=${value}`,


  });
  return res;
};
const deletePassword = async (id) => {
  let res = await FETCH.deletee({
    url: ROUTES.PASSWORDS,
    id,
  });
  return res;
};
const fetchPrepaidBurial = async (id) => {
  const userRole = localStorage.getItem("role") != 'undefined' && JSON.parse(localStorage.getItem("role"))

  let res = await FETCH.get({
    // url: ROUTES.PREPAID_BURIAL,
    url: userRole === "protrustee" ? `${ROUTES.PREPAID_BURIAL}?id=${id}` : ROUTES.PREPAID_BURIAL,

  });
  return res;
};
const deletePrepaidBurial = async (id) => {
  let res = await FETCH.deletee({
    url: ROUTES.PREPAID_BURIAL,
    id,
  });
  return res;
};
const addPrepaidBurial = async (body) => {
  let res = await FETCH.post({
    url: ROUTES.PREPAID_BURIAL,
    body,
  });
  return res;
};
const fetchBills = async (id) => {
  const userRole = localStorage.getItem("role") != 'undefined' && JSON.parse(localStorage.getItem("role"))

  let res = await FETCH.get({
    // url: ROUTES.BILLS_TO_PAY,
    url: userRole === "protrustee" ? `${ROUTES.BILLS_TO_PAY}?id=${id}` : ROUTES.BILLS_TO_PAY,

  });
  return res;
};
const deleteBills = async (id) => {
  let res = await FETCH.deletee({
    url: ROUTES.BILLS_TO_PAY,
    id,
  });
  return res;
};
const addBills = async (body) => {
  let res = await FETCH.post({
    url: ROUTES.BILLS_TO_PAY,
    body,
  });
  return res;
};
const fetchLitigation = async (id) => {
  const userRole = localStorage.getItem("role") != 'undefined' && JSON.parse(localStorage.getItem("role"))

  let res = await FETCH.get({
    // url: ROUTES.LITIGATION,
    url: userRole === "protrustee" ? `${ROUTES.LITIGATION}?id=${id}` : ROUTES.LITIGATION,

  });
  return res;
};
const deleteLitigation = async (id) => {
  let res = await FETCH.deletee({
    url: ROUTES.LITIGATION,
    id,
  });
  return res;
};
const addLitigation = async (body) => {
  let res = await FETCH.post({
    url: ROUTES.LITIGATION,
    body,
  });
  return res;
};
const addAccountAsset = async (body) => {
  let res = await FETCH.post({
    url: ROUTES.ACCOUNT_ASSET,
    body,
  });
  return res;
};
const deleteAccountAsset = async (id) => {
  let res = await FETCH.deletee({
    url: ROUTES.ACCOUNT_ASSET,
    id,
  });
  return res;
};
const fetchAccountAsset = async () => {
  let res = await FETCH.get({
    url: ROUTES.ACCOUNT_ASSET,
  });
  return res;
};
const fetchAccountAssetLiabilities = async () => {
  let res = await FETCH.post({
    url: ROUTES.ACCOUNT_ASSET_Liabilities,
  });
  return res;
};
const addPersonalItemLocation = async (body) => {
  let res = await FETCH.post({
    url: ROUTES.PERSONAL_ITEM_LOCATION,
    body,
  });
  return res;
};
const deletePersonalItemLocation = async (id) => {
  let res = await FETCH.deletee({
    url: ROUTES.PERSONAL_ITEM_LOCATION,
    id,
  });
  return res;
};
const fetchPersonalItemLocation = async (id) => {
  const userRole = localStorage.getItem("role") != 'undefined' && JSON.parse(localStorage.getItem("role"))

  let res = await FETCH.get({
    // url: ROUTES.PERSONAL_ITEM_LOCATION,
    url: userRole === "protrustee" ? `${ROUTES.PERSONAL_ITEM_LOCATION}?id=${id}` : ROUTES.PERSONAL_ITEM_LOCATION,

  });
  return res;
};
const addPolicies = async (body) => {
  let res = await FETCH.post({
    url: ROUTES.CLIENTS_POLICIES,
    body,
  });
  return res;
};
const deletePolicy = async (id) => {
  let res = await FETCH.deletee({
    url: ROUTES.CLIENTS_POLICIES,
    id,
  });
  return res;
};
const fetchPolicy = async (value, id) => {
  const userRole = localStorage.getItem("role") != 'undefined' && JSON.parse(localStorage.getItem("role"))

  let res = await FETCH.get({
    // url: ROUTES.CLIENTS_POLICIES,
    // url: `${ROUTES.CLIENTS_POLICIES}?otp=${value}`,
    url: userRole === "protrustee" ? `${ROUTES.CLIENTS_POLICIES}?otp=${value}&id=${id}` : `${ROUTES.CLIENTS_POLICIES}?otp=${value}`,

  });
  return res;
};
const addDocuments = async (body) => {
  let res = await FETCH.post({
    url: ROUTES.CLIENTS_DOCUMENTS,
    body,
  });
  return res;
};
const deleteDocument = async (id) => {
  let res = await FETCH.deletee({
    url: ROUTES.CLIENTS_DOCUMENTS,
    id,
  });
  return res;
};
const fetchDocuments = async (value, id) => {
  const userRole = localStorage.getItem("role") != 'undefined' && JSON.parse(localStorage.getItem("role"))
  console.log("id", id)
  let res = await FETCH.get({
    // url: `${ROUTES.CLIENTS_DOCUMENTS}?otp=${value}`,
    url: userRole === "protrustee" ? `${ROUTES.CLIENTS_DOCUMENTS}?otp=${value}&id=${id}` : `${ROUTES.CLIENTS_DOCUMENTS}?otp=${value}`,

    // url: ROUTES.CLIENTS_DOCUMENTS
  });
  return res;
}
const upsertChecklist = async (body) => {
  const res = await FETCH.post({
    url: ROUTES.CHECKLIST,
    body
  });
  return res;
}
const fetchChecklist = async (id) => {
  const userRole = localStorage.getItem("role") != 'undefined' && JSON.parse(localStorage.getItem("role"))

  let res = await FETCH.get({
    // url: ROUTES.CHECKLIST,
    url: userRole === "protrustee" ? `${ROUTES.CHECKLIST}?id=${id}` : ROUTES.CHECKLIST,

  });
  return res;
};
const updateContact = async (id, body) => {
  let res = await FETCH.put({
    url: ROUTES.CONTACT_LIST,
    id,
    body,
  });
  return res;
};
const updatePrepaidBurial = async (id, body) => {
  let res = await FETCH.put({
    url: ROUTES.PREPAID_BURIAL,
    id,
    body,
  });
  return res;
};
const updateBills = async (id, body) => {
  let res = await FETCH.put({
    url: ROUTES.BILLS_TO_PAY,
    id,
    body,
  });
  return res;
};
const getSpouseDetails = async () => {
  let res = await FETCH.get({
    url: ROUTES.SPOUSEINFO
  });
  return res;
};
const getDependentDetails = async () => {
  let res = await FETCH.get({
    url: ROUTES.DEPENDENT_DETAILS
  });
  return res;
}
const getTrustInfo = async () => {
  let res = await FETCH.get({
    url: ROUTES.TRUST_INFO
  });
  return res;
}
const getCorporateInfo = async () => {
  let res = await FETCH.get({
    url: ROUTES.CORPORATE_INFO
  });
  return res;
}
const getCharityInfo = async () => {
  let res = await FETCH.get({
    url: ROUTES.CHARITY_INFO
  });
  return res;
}
const getOtherImpacts = async () => {
  let res = await FETCH.get({
    url: ROUTES.OTHER_IMPACTS
  });
  return res;
}
const addSpouseInfo = async (body) => {
  let res = await FETCH.post({
    url: ROUTES.CREATE_SPOUSE,
    body,
  });
  return res;
};
const addDependentInfo = async (body) => {
  let res = await FETCH.post({
    url: ROUTES.CREATE_DEPENDENT,
    body,
  });
  return res;
};
const addTrustInfo = async (body) => {
  let res = await FETCH.post({
    url: ROUTES.CREATE_TRUST_INFO,
    body,
  });
  return res;
};
const addCorporateInfo = async (body) => {
  let res = await FETCH.post({
    url: ROUTES.CREATE_CORPORATE_INFO,
    body,
  });
  return res;
};
const addCharityInfo = async (body) => {
  let res = await FETCH.post({
    url: ROUTES.CREATE_CHARITY_INFO,
    body,
  });
  return res;
};
const addOtherImpacts = async (body) => {
  let res = await FETCH.post({
    url: ROUTES.CREATE_OTHER_IMPACTS,
    body,
  });
  return res;
};
const updateSpouseInfo = async (id, body) => {
  let res = await FETCH.put({
    url: ROUTES.UPDATE_SPOUSE_INFO,
    id,
    body,
  });
  return res;
};
const updateDependentInfo = async (id, body) => {
  let res = await FETCH.put({
    url: ROUTES.UPDATE_DEPENDENT_INFO,
    id,
    body,
  });
  return res;
};
const updateTrustInfo = async (id, body) => {
  let res = await FETCH.put({
    url: ROUTES.UPDATE_TRUST_INFO,
    id,
    body,
  });
  return res;
};
const updateCorporateInfo = async (id, body) => {
  let res = await FETCH.put({
    url: ROUTES.UPDATE_CORPORATE_INFO,
    id,
    body,
  });
  return res;
};
const updateCharityInfo = async (id, body) => {
  let res = await FETCH.put({
    url: ROUTES.UPDATE_CHARITY_INFO,
    id,
    body,
  });
  return res;
};
const updateOtherImpacts = async (id, body) => {
  let res = await FETCH.put({
    url: ROUTES.UPDATE_OTHER_IMPACTS,
    id,
    body,
  });
  return res;
};
const deleteSpouseInfo = async (id) => {
  let res = await FETCH.deletee({
    url: `${ROUTES.DELETE_SPOUSE_INFO}?spouseId=${id}`,
  });
  return res;
};
const deleteDependentInfo = async (id) => {
  let res = await FETCH.deletee({
    url: `${ROUTES.DELETE_DEPENDENT_INFO}?dependentId=${id}`,
  });
  return res;
};
const searchContactList = async (body) => {
  console.log("search value in body", body)
  let res = await FETCH.get({
    url: `${ROUTES.CONTACT_LIST}?searchParam=${body}`,
  });
  return res;
};
const deleteTrustInfo = async (id) => {
  let res = await FETCH.deletee({
    url: `${ROUTES.DELETE_TRUST_INFO}?trustId=${id}`,
  });
  return res;
};
const deleteCorporateInfo = async (id) => {
  let res = await FETCH.deletee({
    url: `${ROUTES.DELETE_CORPORATE_INFO}?corporateId=${id}`,
  });
  return res;
};
const deleteCharityInfo = async (id) => {
  let res = await FETCH.deletee({
    url: `${ROUTES.DELETE_CHARITY_INFO}?charityId=${id}`,
  });
  return res;
};
const deleteOtherImpacts = async (id) => {
  let res = await FETCH.deletee({
    url: `${ROUTES.DELETE_OTHER_IMPACTS}?otherImpactId=${id}`,
  });
  return res;
};
const updateAccountAsset = async (id, body) => {
  let res = await FETCH.put({
    url: ROUTES.ACCOUNT_ASSET,
    id,
    body,
  });
  return res;
};
const revertDeath = async (id) => {
  const userRole = localStorage.getItem("role") != 'undefined' && JSON.parse(localStorage.getItem("role"))
  let res = await FETCH.put2({
    // url: ROUTES.REVERT_DEATH,
    url: userRole == "trustee" || userRole === "protrustee" ?
      `${ROUTES.REVERT_DEATH}?id=${id}`
      :
      `${ROUTES.REVERT_DEATH}`,
  });
  return res;
};
const updatePersonalItemLocation = async (id, body) => {
  let res = await FETCH.put({
    url: ROUTES.PERSONAL_ITEM_LOCATION,
    id,
    body,
  });
  return res;
};
const updateLitigation = async (id, body) => {
  let res = await FETCH.put({
    url: ROUTES.LITIGATION,
    id,
    body,
  });
  return res;
};
const updateDocument = async (id, body) => {
  let res = await FETCH.put({
    url: ROUTES.CLIENTS_DOCUMENTS,
    id,
    body,
  });
  return res;
};
const getDeathStatus = async (id) => {
  const userRole = localStorage.getItem("role") != 'undefined' && JSON.parse(localStorage.getItem("role"))
  console.log("id", id)
  console.log("userRole", userRole)
  let res = await FETCH.get({
    // url: ROUTES.DEATH_STATUS,
    url: userRole === "protrustee" || userRole === "trustee" ? `${ROUTES.DEATH_STATUS}?id=${id}` : `${ROUTES.DEATH_STATUS}`,

  });
  return res;
}
const updatePolicy = async (id, body) => {
  let res = await FETCH.put({
    url: ROUTES.CLIENTS_POLICIES,
    id,
    body,
  });
  return res;
};
const updateEmail = async (id, body) => {
  let res = await FETCH.put({
    url: ROUTES.EMAIL_TO_SEND,
    id,
    body,
  });
  return res;
};
const addEmail = async (body) => {
  let res = await FETCH.post({
    url: ROUTES.EMAIL_TO_SEND,
    body,
  });
  return res;
};
const deleteEmail = async (id) => {
  let res = await FETCH.deletee({
    url: ROUTES.EMAIL_TO_SEND,
    id,
  });
  return res;
};
const fetchEmail = async (id) => {
  const userRole = localStorage.getItem("role") != 'undefined' && JSON.parse(localStorage.getItem("role"))
  let res = await FETCH.get({
    // url: ROUTES.EMAIL_TO_SEND
    url: userRole === "protrustee" ? `${ROUTES.EMAIL_TO_SEND}?id=${id}` : ROUTES.EMAIL_TO_SEND,

  });
  return res;
}
const updateText = async (id, body) => {
  let res = await FETCH.put({
    url: ROUTES.TEXTS_TO_SEND,
    id,
    body,
  });
  return res;
};
const addText = async (body) => {
  let res = await FETCH.post({
    url: ROUTES.TEXTS_TO_SEND,
    body,
  });
  return res;
};
const deleteText = async (id) => {
  let res = await FETCH.deletee({
    url: ROUTES.TEXTS_TO_SEND,
    id,
  });
  return res;
};
const fetchText = async (id) => {
  const userRole = localStorage.getItem("role") != 'undefined' && JSON.parse(localStorage.getItem("role"))

  let res = await FETCH.get({
    // url: ROUTES.TEXTS_TO_SEND
    url: userRole === "protrustee" ? `${ROUTES.TEXTS_TO_SEND}?id=${id}` : ROUTES.TEXTS_TO_SEND,

  });
  return res;
}
const fetchTemplates = async (id, value) => {
  let res = await FETCH.get({
    url: `${ROUTES.EMAIL_TO_SEND}?templateName=${id}`,
  });
  return res;
};

const updateAudioVideo = async (body) => {
  let res = await FETCH.post({
    url: ROUTES.AUDIO_VIDEO,
    body,
  });
  return res;
}
const uploadPasswordSheet = async (body) => {
  let res = await FETCH.post({
    url: `${ROUTES.UPLOAD_DOCUMENT}?fileType=${"password"}`,
    body,
    isFormData: true,
  });
  return res;
}
const uploadDocumnet = async (body) => {
  let res = await FETCH.post({
    url: `${ROUTES.UPLOAD_DOCUMENT}?fileType=${"document"}`,
    body,
    isFormData: true,
  });
  return res;
}
const uploadPolicy = async (body) => {
  let res = await FETCH.post({
    url: `${ROUTES.UPLOAD_DOCUMENT}?fileType=${"policy"}`,
    body,
    isFormData: true,
  });
  return res;
}
const exportPasswordSheet = async (value) => {
  let res = await FETCH.get({
    url: `${ROUTES.EXPORT_DOCUMENT}?fileType=${value}&exportData=true`,
  });
  return res;
};
const exportDocumentSheet = async (value) => {
  let res = await FETCH.get({
    url: `${ROUTES.EXPORT_DOCUMENT}?fileType=${value}&exportData=true`,
  });
  return res;
};
const exportPolicySheet = async (value, id) => {
  const userRole = localStorage.getItem("role") != 'undefined' && JSON.parse(localStorage.getItem("role"))

  let res = await FETCH.get({
    url: userRole === "protrustee" ? `${ROUTES.EXPORT_DOCUMENT}?fileType=${value}&exportData=true&clientId=${id}` : `${ROUTES.EXPORT_DOCUMENT}?fileType=${value}&exportData=true`,
  });
  return res;
};
const exportContactsSheet = async (value) => {
  let res = await FETCH.get({
    url: `${ROUTES.EXPORT_DOCUMENT}?fileType=${value}&exportData=true`,
  });
  return res;
};
const getPasswordTemplates = async (value) => {
  let res = await FETCH.get({
    url: `${ROUTES.DOWNLOAD_TEMPLATE}?fileType=${value}`,
  });
  return res;
};
const getDocumentTemplates = async (value) => {
  let res = await FETCH.get({
    url: `${ROUTES.DOWNLOAD_TEMPLATE}?fileType=${value}`,
  });
  return res;
};
const getPolicyTemplates = async (value) => {
  let res = await FETCH.get({
    url: `${ROUTES.DOWNLOAD_TEMPLATE}?fileType=${value}`,
  });
  return res;
};
const configOtp = async (id) => {
  const userRole = localStorage.getItem("role") != 'undefined' && JSON.parse(localStorage.getItem("role"))
  let res = await FETCH.get({
    // url: ROUTES.OTP_CONFIG
    url: userRole === "protrustee" ? `${ROUTES.OTP_CONFIG}?id=${id}` : ROUTES.OTP_CONFIG

  });
  return res;
};
const confirmDeath = async (id) => {
  let res = await FETCH.post({
    url: ROUTES.CONFIRM_DEATH,
    body: {
      id: +id
    },
  });
  return res;
}
const postTemplate = async (body) => {
  let res = await FETCH.post({
    url: ROUTES.POST_TEMPLATE,
    body,
  });
  return res;
}
const getTemplate = async (value) => {
  let res = await FETCH.get({
    url: ROUTES.POST_TEMPLATE
  });
  return res;
};
const setRevertTime = async (value) => {
  console.log("value in api", value)
  let res = await FETCH.put2({
    url: `${ROUTES.TIMER}`,
    body: { deathStatusRevertTime: value },
  });
  return res;
};
const fetchEmailTemplates = async (id, value) => {
  let res = await FETCH.get({
    url: `${ROUTES.POST_TEMPLATE}?emailTemplateId=${id}`,
  });
  return res;
};
const verifyOtp = async (body, config) => {
  console.log("config data", config);
  let res = await FETCH.post({
    url: `${ROUTES.OTP_VERIFY}`,
    body,
    config
  });
  return res;
}
const fetchAudioVideo = async (id) => {
  const userRole = localStorage.getItem("role") != 'undefined' && JSON.parse(localStorage.getItem("role"))
  let res = await FETCH.get({
    // url: ROUTES.AUDIO_VIDEO,
    url: userRole === "protrustee" ? `${ROUTES.AUDIO_VIDEO}?id=${id}` : ROUTES.AUDIO_VIDEO,

  });
  return res;
}
const fetchClientList = async (token) => {
  let res = await FETCH.get({
    url: ROUTES.CLIENT_LIST,
  });
  return res;
}
const addAdvanceHealth = async (body) => {
  let res = await FETCH.post({
    url: ROUTES.ADVANCE_HEALTH,
    body,
  });
  return res;
};
const getAdvanceHealth = async (id) => {
  const userRole = localStorage.getItem("role") != 'undefined' && JSON.parse(localStorage.getItem("role"))
  let res = await FETCH.get({
    url: userRole === "protrustee" || userRole === "trustee" ? `${ROUTES.ADVANCE_HEALTH}?id=${id}` : ROUTES.ADVANCE_HEALTH,

  });
  return res;
};
const SendEmails = async (body) => {
  let res = await FETCH.post({
    url: `${ROUTES.SEND_EMAIL}`,
    body,
  });
  return res;
};
const PostDeathCertificate = async (body) => {
  // const userRole = localStorage.getItem("role") != 'undefined' && JSON.parse(localStorage.getItem("role"))
  let res = await FETCH.post({
    // url: userRole === "protrustee" || userRole === "trustee" ? `${ROUTES.DEATH_CERTIFICATE}?id=${id}` : ROUTES.DEATH_CERTIFICATE,
    url: `${ROUTES.DEATH_CERTIFICATE}`,
    body,
  });
  return res;
};
const getDeathCertificate = async (id) => {
  const userRole = localStorage.getItem("role") != 'undefined' && JSON.parse(localStorage.getItem("role"))
  let res = await FETCH.get({
    url: userRole === "protrustee" || userRole === "trustee" ? `${ROUTES.DEATH_CERTIFICATE}?id=${id}` : ROUTES.DEATH_CERTIFICATE,

  });
  return res;
};
const postTextTemplate = async (body) => {
  let res = await FETCH.post({
    url: ROUTES.TEXT_TEMPLATE,
    body,
  });
  return res;
}
const getTextTemplate = async (value) => {
  let res = await FETCH.get({
    url: ROUTES.TEXT_TEMPLATE
  });
  return res;
};
const fetchTextTemplates = async (id, value) => {
  let res = await FETCH.get({
    url: `${ROUTES.TEXT_TEMPLATE}?textTemplateId=${id}`,
  });
  return res;
};
const getSecondPasswordStatus = async (id, value) => {
  let res = await FETCH.get({
    url: `${ROUTES.SECOND_PASSWORD}`,
  });
  return res;
};
const postFuneralInfo = async (body) => {
  let res = await FETCH.post({
    url: ROUTES.CLIENT_FUNERAL,
    body,
  });
  return res;
}
const getFuneralInfo = async (id) => {
  let res = await FETCH.get({
    url: `${ROUTES.CLIENT_FUNERAL}?id=${id}`,

  });
  return res;
};
const getEmailHistory = async (email) => {
  let res = await FETCH.get({
    url: `${ROUTES.EMAIL_LOGS}?msgId=${email}`,

  });
  return res;
}
const getEmailCounts = async () => {
  let res = await FETCH.get({
    url: `${ROUTES.EMAIL_LOGS_COUNT}`,

  });
  return res;
}
export default {
  fetchPasswords,
  addPasswords,
  fetchContactList,
  addPersonalInstructions,
  updatePersonalInstructions,
  fetchPersonalInstructions,
  addContactList,
  deletePersonalInstruction,
  deleteContact,
  deletePassword,
  addPrepaidBurial,
  deletePrepaidBurial,
  fetchPrepaidBurial,
  addBills,
  deleteBills,
  fetchBills,
  fetchLitigation,
  deleteLitigation,
  addLitigation,
  fetchAccountAsset,
  deleteAccountAsset,
  addAccountAsset,
  updateAccountAsset,
  addPersonalItemLocation,
  deletePersonalItemLocation,
  fetchPersonalItemLocation,
  addPolicies,
  updatePersonalItemLocation,
  fetchPolicy,
  deletePolicy,
  addDocuments,
  deleteDocument,
  fetchDocuments,
  updatePasswords,
  upsertChecklist,
  fetchChecklist,
  updateContact,
  updatePrepaidBurial,
  updateBills,
  getSpouseDetails,
  getDependentDetails,
  updateLitigation,
  updateDocument,
  updatePolicy,
  getTrustInfo,
  getCorporateInfo,
  getCharityInfo,
  getOtherImpacts,
  addSpouseInfo,
  addDependentInfo,
  addTrustInfo,
  addCorporateInfo,
  addCharityInfo,
  addOtherImpacts,
  updateSpouseInfo,
  updateDependentInfo,
  updateTrustInfo,
  updateCorporateInfo,
  updateCharityInfo,
  updateOtherImpacts,
  addEmail,
  fetchEmail,
  deleteEmail,
  updateEmail,
  addText,
  fetchText,
  deleteText,
  updateText,
  fetchAudioVideo,
  updateAudioVideo,
  deleteSpouseInfo,
  deleteDependentInfo,
  deleteTrustInfo,
  deleteCorporateInfo,
  deleteCharityInfo,
  deleteOtherImpacts,
  fetchAccountAssetLiabilities,
  fetchTemplates,
  uploadPasswordSheet,
  uploadPolicy,
  uploadDocumnet,
  getPasswordTemplates,
  getDocumentTemplates,
  getPolicyTemplates,
  exportPasswordSheet,
  exportDocumentSheet,
  exportPolicySheet,
  exportContactsSheet,
  verifyOtp,
  searchContactList,
  configOtp,
  confirmDeath,
  getDeathStatus,
  revertDeath,
  postTemplate,
  getTemplate,
  fetchEmailTemplates,
  setRevertTime,
  fetchClientList,
  addAdvanceHealth,
  getAdvanceHealth,
  SendEmails,
  getDeathCertificate,
  PostDeathCertificate,
  postTextTemplate,
  getTextTemplate,
  fetchTextTemplates,
  getSecondPasswordStatus,
  postFuneralInfo,
  getFuneralInfo,
  fetchTrusteeList,
  getEmailHistory,
  getEmailCounts,
};
