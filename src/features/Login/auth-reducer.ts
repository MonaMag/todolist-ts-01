import {AppReducerActionsType, setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {authAPI, LoginParamsType} from "../../api/auth-api";
import {AppThunkType} from "../../app/store";


//type ------------------------------------------------------------------->
export type AuthReducerActionsType = ReturnType<typeof setIsAuthAC>
export type AuthStateType   = typeof initialState
export type ThunkDispatchType = AuthReducerActionsType | AppReducerActionsType;


//reducer ----------------------------------------------------------------->
const initialState = {
    isAuth: false
};
export const authReducer = (state = initialState, action: AuthReducerActionsType): AuthStateType => {
    switch (action.type) {
        case 'login/SET_IS_AUTH':
            return {...state, isAuth: action.isAuth}
        default:
            return state;
    }
}

//actions ---------------------------------------------------------------->
export const setIsAuthAC = (isAuth: boolean) =>
    ({type: 'login/SET_IS_AUTH', isAuth} as const)

//thunks ----------------------------------------------------------------->


export const loginTC = (data: LoginParamsType): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsAuthAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

export const logoutTC = (): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(data => {
            if(data.resultCode === 0) {
                dispatch(setIsAuthAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}