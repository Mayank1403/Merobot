const ADD_RECTANGLES = 'add_rectangles';
// const REMOVE_RECTANGLES = 'remove_rectangles';
// const ADD_LINES = 'add_lines';

const initState = {
    rect: []
};

export const addRectangles = (data) => {
    return{
        type: ADD_RECTANGLES,
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
        case ADD_RECTANGLES:
            return{...state, rect: action.data};
        default:
            return state;
    }
};

export default Rectangles;