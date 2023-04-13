const initialState = {
    filters: [],
    activeFilter: '',
};

const filter = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_FILTER':
            return {
                ...state,
                filters: action.payload,
            };

        case 'ACTIVE_FILTER':
            return {
                ...state,
                activeFilter: action.payload,
            };

        default:
            return state;
    }
};

export default filter;
