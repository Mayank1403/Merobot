const initState = [];

export const storeImages = (images) => {
  return {
    type: "ADD_IMAGE",
    images,
  };
};

export const setReduxProcess = (process) => {
  return {
    type: "SET_PROCESS",
    process,
  };
};

export const setReduxAddPart = (add_part) => {
  return {
    type: "SET_ADD_PART",
    add_part,
  };
};

const Images = (state = initState, action) => {
  switch (action.type) {
    case "ADD_IMAGE":
      let img1 = action.images[0];
      let img2 = action.images[1];
      let img3 = action.images[2];
      return {
        ...state,
        img1,
        img2,
        img3,
      };
    case "SET_PROCESS":
      return {
        ...state,
        process: action.process,
      };
    case "SET_ADD_PART":
      return {
        ...state,
        add_part: action.add_part,
      };
    default:
      return state;
  }
};

export default Images;
