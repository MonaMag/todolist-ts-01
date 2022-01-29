import {authAPI} from "../api/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {setIsAuthAC} from "../features/Login/auth-reducer";
import {AppThunkType} from "./store";



//type ------------------------------------------------------------------->
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type ErrorType = null | string;

export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>;
export type SetAppStatusAT = ReturnType<typeof setAppStatusAC>;
export type SetAppInitializedAT = ReturnType<typeof setAppInitializedAC>;

export type AppReducerActionsType = SetAppErrorAT | SetAppStatusAT | SetAppInitializedAT;
export type AppReducerStateType = typeof initialState;


//reducer ----------------------------------------------------------------->
const initialState = {
    //происходит ли сейчас взаимодействие с сервером
    status: 'idle' as RequestStatusType,
    //если ошибка какая-то глобальная произойдет - мы запишем текст ошибки сюда
    error: null as ErrorType,
    //true когда приложение проинициализировалось (проверили пользователя, настройки получили и тд)
    isAppInitialized: false,
}

export const appReducer = (state: AppReducerStateType = initialState, action: AppReducerActionsType): AppReducerStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-APP-INITIALIZED':
            return {...state, isAppInitialized: action.isAppInitialized}
        default:
            return state
    }
}

//actions ---------------------------------------------------------------->
export const setAppErrorAC = (error: ErrorType) => ({type: 'APP/SET-ERROR', error}) as const;
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status}) as const;
export const setAppInitializedAC = (isAppInitialized: boolean) => ({type: 'APP/SET-APP-INITIALIZED', isAppInitialized} as const)


//thunks ----------------------------------------------------------------->

export const initializeAppTC = ():AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    authAPI.authMe()
        .then(data => {
            if(data.resultCode === 0) {
                dispatch(setIsAuthAC(true))
                dispatch(setAppInitializedAC(true))
                dispatch(setIsAuthAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(data, dispatch)
                dispatch(setAppInitializedAC(true))
                dispatch(setIsAuthAC(false))
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
        .finally( ()=> {
            dispatch(setAppStatusAC('succeeded'))
            })
}