const INIT_STATE = {
  inventories: [],
  collection: null,
};

const Inventory = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "SET_INVENTORY":
      return {
        ...state,
        inventories: action.payload,
      };
    case "SET_COLLECTION":
      return {
        ...state,
        collection: action.payload,
      };
    default:
      return { ...state };
  }
};

export default Inventory;
