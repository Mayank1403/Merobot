const initState = [];

export const storeImages = (images) => {
    return {
        type: 'ADD_IMAGE',
        images,
    }
}

const Images = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_IMAGE':
            let img1= action.images[0];
            let img2= action.images[1];
            let img3= action.images[2];
            return {
                ...state,
                img1,
                img2,
                img3
            };
        default:
            return state;
    }
}

export default Images;