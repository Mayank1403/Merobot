const initState={}

export const getServerdata = (data) => {
    return {
        type: "GET_SERVERDATA",
        data,
    }
}

const serverdataReducer = (state = initState, action) => {
    switch (action.type) {
        case "GET_SERVERDATA":
            return {
                ...state,
                data: action.data,
            }
        default:
            return state
    }
}

export default serverdataReducer