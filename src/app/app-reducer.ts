export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type ErrorType = null | string;
export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>;
export type SetAppStatusAT = ReturnType<typeof setAppStatusAC>;
export type AppActionsType = SetAppErrorAT | SetAppStatusAT;
export type InitialStateType = typeof initialState;

const initialState = {
    //происходит ли сейчас взаимодействие с сервером
    status: 'idle' as RequestStatusType,
    //если ошибка какая-то глобальная произойдет - мы запишем текст ошибки сюда
    error: null as ErrorType,
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppErrorAC = (error: ErrorType) => ({type: 'APP/SET-ERROR', error}) as const;
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status}) as const;