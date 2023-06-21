import {
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REGISTER_USER_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    CLEAR_ERRORS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILURE,
    LOGOUT_USER_FAILURE,
    LOGOUT_USER_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_RESET,
    UPDATE_PASSWORD_FAILURE,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_RESET,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE,
    ADD_NEW_ADDRESS,
    ADD_ADDRESS_SUCCESS,
    ADD_ADDRESS_FAILURE,
} from "../constants/userConstant"
export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated:false,
            }
        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user:action.payload
            }
        case LOGOUT_USER_SUCCESS:
            return {
                loading: false,
                isAuthenticated:false,
                user: null,
            }
        case LOGIN_FAILURE:
        case REGISTER_USER_FAILURE:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error:action.payload
            }
        case LOAD_USER_FAILURE:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error:action.payload  
            }
        case LOGOUT_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null,
            }
        default:
            return state;
    }
}

export const profileReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
            case UPDATE_PASSWORD_REQUEST:
            return {
                loading: true,
                isAuthenticated:false,
            }
        case UPDATE_PROFILE_SUCCESS:
            case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated:action.payload,
            }
        case UPDATE_PROFILE_FAILURE:
            case UPDATE_PASSWORD_FAILURE:
            return {
                ...state,
                loading: false,
                error:action.payload
            }
        case UPDATE_PROFILE_RESET:
            case UPDATE_PASSWORD_RESET:
            return {
                ...state,
                isUpdated:false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null,
            }
        default:
            return state;
    }
}

export const forgotPasswordReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
                error:null,
            }
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message:action.payload,
            }
        case FORGOT_PASSWORD_FAILURE:
            return {
                ...state,
                loading: false,
                error:action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null,
            }
        default:
            return state;
    }
}

export const resetPasswordReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case RESET_PASSWORD_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
                error:null,
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                success:action.payload,
            }
        case RESET_PASSWORD_FAILURE:
            return {
                ...state,
                loading: false,
                error:action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null,
            }
        default:
            return state;
    }
}

export const addNewAddressReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case ADD_NEW_ADDRESS:
            return {
                loading: true,
                isAuthenticated: false,
                error: null,
            }
        case ADD_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload,
            }
        case ADD_ADDRESS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
}