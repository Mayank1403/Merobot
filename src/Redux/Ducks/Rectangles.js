const SET_RECTANGLES = 'set_rectangles';
// const REMOVE_RECTANGLES = 'remove_rectangles';
// const ADD_LINES = 'add_lines';

const initState = {
    rect: []
};

export const setRectangles = (data) => {
    return{
        type: SET_RECTANGLES,
        data,
    }
}

// export const removeRectangles = (key) => {
//     return{
//         type: ADD_LINES,
//         key,
//     }
// }
// case REMOVE_RECTANGLES:
//             return{...state.filter(i=> i.key !== action.key)}

const Rectangles = (state = initState, action) => {
    switch (action.type){
        case SET_RECTANGLES:
            return{...state, rect: action.data};
        default:
            return state;
    }
};

export default Rectangles;