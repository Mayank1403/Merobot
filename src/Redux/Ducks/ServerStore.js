const initialState = {};

export const setServerData = (data) => {
  return {
    type: "SET_SERVER_DATA",
    data,
  };
};

export const ServerStore = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SERVER_DATA":
      return {
        ...state,
        masked: action.data.masked,
        rectangle: action.data.rectangle,
        labels_used: action.data.labels_used,
        remaining_parts: action.data.remaining_parts,
      };
    default:
      return state;
  }
};
