const Reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return {
                ...state,
                uid: action.payload.uid,
                username: action.payload.username
            };
        default:
            return state;
    }
};

export default Reducer;