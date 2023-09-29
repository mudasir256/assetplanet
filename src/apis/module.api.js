import FETCH from "../utils/fetch";
import ROUTES from "../config/routes";
import axios from "axios";

const fetchAll = async (params) => {
  const { history, pageNum, limit } = params;

  // console.log("params", params);

  let res = await FETCH.get({
    url: ROUTES.FETCH_ALL_MODULES,
    id: `?pageNum=${pageNum}&limit=${limit}`,
    history: history,
  });
  return res;
};

const fetchFaq = async () => {
  let res = await FETCH.get({
    url: ROUTES.FETCH_FAQ,
  });
  return res;
};

const addProperty = async (params) => {
  const { moduleName, pageNum, limit, body, id } = params;

  console.log("params", params, body);

  let res = await FETCH.post({
    url: ROUTES.CRETE_CLIENT_ITEM,
    id: `?module=${moduleName}`,
    body,
  });
  return res;
};

const fetchRooms = async (params) => {
  const { moduleName, pageNum, limit, id, body } = params;
  let res = await FETCH.get({
    url: ROUTES.FETCH_ALL_ROOMS,
    id: `?recordId=${id}`,
    body,
  });
  return res;
};

const fetchDetails = async (id) => {
  let res = await FETCH.get({
    url: ROUTES.FETCH_ALL_ROOMS,
    id: `?recordId=${id}`,
  });
  return res;
};

const fetchItems = async (params) => {
  const { moduleName, pageNum, limit, body } = params;
  // console.log("params", params);
  let res = await FETCH.post({
    url: ROUTES.FETCH_ALL_ITEMS,
    id: `?module=${moduleName}&pageNum=${pageNum}&limit=${limit}`,
    body,
  });
  return res;
};

const create = async (body) => {
  let res = await FETCH.post({
    url: `${ROUTES.CREATE_MODULE}?clientId=1`,
    body,
  });
  return res;
};

const update = async (id, body) => {
  let res = await FETCH.put({
    url: ROUTES.UPDATE_MODULE,
    body,
    id,
  });
  return res;
};

const fetchAttributes = async (module) => {
  let res = await FETCH.post({
    url: `${ROUTES.MODULE_ATTRIBUTES}?module=${module}`,
    body: {},
  });
  return res;
};

const createClientItem = async (module, body) => {
  let res = await FETCH.post({
    url: `${ROUTES.CRETE_CLIENT_ITEM}?module=${module}`,
    body,
  });
  return res;
};

const updateClientItem = async (recordId, body) => {
  let res = await FETCH.put({
    url: `${ROUTES.UPDATE_CLIENT_ITEM}?recordId=` + recordId,
    body,
  });
  return res;
};

const getRecordTotal = async (recordId, body) => {
  let res = await FETCH.post({
    url: `${ROUTES.RECORD_TOTAL}?recordId=${recordId}`,
    body,
  });
  return res;
};

const deleteItem = async (body) => {
  let res = await FETCH.deletee({
    url: `${ROUTES.DELETE_ITEM}`,
    body,
  });
  return res;
};

const removeModuleAttribute = async (body) => {
  let res = await FETCH.post({
    url: `${ROUTES.REMOVE_MODULE_ATTRIBUTES}?clientId=1`,
    body,
  });
  return res;
};

const uploadImage = async (form) => {
  let res = await FETCH.post({
    url: `${ROUTES.IMAGE_UPLOAD}`,
    body: form,
    isFormData: true,
  });
  return res;
};
const uploadFile = async (form) => {
  console.log("form>>>",form);
  let res = await FETCH.post({
    url: `${ROUTES.POST_VIDEO}`,
    body: JSON.stringify(form),
    isFormData: true,
  });
  return res;
};
const uploadURL = async (url, body,header) => {
  console.log("url",url);
  console.log("body",body);
  let res = await FETCH.put1({
    url,
    body,
    header
    // isFormData: true,
  });
  return res;
};
const swapCollectibles = async (body) => {
  let res = await FETCH.post({
    url: `${ROUTES.SWAP_COLLECTIBLES}`,
    body,
  });
  return res;
};

const removeClientModule = async (body) => {
  let res = await FETCH.deletee({
    url: `${ROUTES.DELETE_ITEM}`,
    body,
  });
  return res;
};

const updateClientModule = async (recordId, body) => {
  try {
    let res = await FETCH.put2({
      url: `${ROUTES.UPDATE_CLIENT_ITEM}?recordId=` + recordId,
      body,
    });
    return res;
  } catch (error) {
    console.log("error in axios put");
  }
};
const assetFiledDetails = async (assetName) => {
  try {
    let res = await FETCH.post({
      url: `${ROUTES.ASSET_FIELDS}?module=${assetName}`,
    });
    return res;
  } catch (error) {
    console.log("error in axios put");
  }
};

const addAsset = async (module, body) => {
  try {
    let res = await FETCH.post({
      url: `${ROUTES.CRETE_CLIENT_ITEM}?module=${module}`,
      body,
    });
    return res;
  } catch (error) {
    console.log("error in axios addAsset", error);
  }
};

const assetAllocation = async () => {
  try {
    let res = await FETCH.get({
      url: `${ROUTES.FETCH_ALL_ASSET_ALLOCATION}`,
    });
    return res;
  } catch (error) {
    console.log("error in axios put");
  }
};
const insuraceAllocation = async (name) => {
  try {
    let res = await FETCH.get({
      // url: `${ROUTES.FETCH_ALL_ASSET_ALLOCATION}`,
      url: `${ROUTES.FETCH_ALL_ASSET_ALLOCATION}?module=${name}`,
    });
    return res;
  } catch (error) {
    console.log("error in axios put");
  }
};

const MODULE_API = {
  addProperty,
  fetchAll,
  fetchItems,
  create,
  update,
  fetchAttributes,
  removeModuleAttribute,
  uploadImage,
  swapCollectibles,
  fetchFaq,
  fetchRooms,
  removeClientModule,
  createClientItem,
  updateClientItem,
  updateClientModule,
  getRecordTotal,
  deleteItem,
  assetFiledDetails,
  addAsset,
  assetAllocation,
  uploadFile,
  uploadURL,
  fetchDetails,
  insuraceAllocation,
};

export default MODULE_API;
