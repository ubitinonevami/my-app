import { authAPI } from "../api/api";
const SET_USER_DATA = 'SET_USER_DATA';

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        default:
            return state;
    }
}

export const setUserData = (userId, email, login) => ({ type: SET_USER_DATA, data:{userId, login, email}  });
export const authThunk = () => {
    return (dispatch) => {
        authAPI.getMe().then(data => {
                if (data.resultCode === 0) {
                    let { id, email, login } = data.data
                    dispatch(setUserData(id, email, login));
                }
    });
    }
        
}

export default authReducer;