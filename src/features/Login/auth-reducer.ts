import {AppReducerActionsType, setAppStatusAC} from "../../app/app-reducer";
import {Dispatch} from "redux";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {authAPI, LoginParamsType} from "../../api/auth-api";
import {AppThunkActionType} from "../../app/store";



//type ------------------------------------------------------------------->
export type AuthActionsType = ReturnType<typeof  setIsAuthAC>

export type AuthStateType = { isAuth: boolean }

export type ThunkDispatchType = AuthActionsType | AppReducerActionsType;


//reducer ----------------------------------------------------------------->
const initialState: AuthStateType = {
    isAuth: false
};
export const authReducer = (state = initialState, action: AuthActionsType): AuthStateType => {
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


export const loginTC = (data: LoginParamsType): AppThunkActionType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if(res.data.resultCode === 0) {
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
