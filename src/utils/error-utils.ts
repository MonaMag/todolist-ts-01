import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/tasks-api";
import {ThunkDispatchType} from "../features/Todolists/tasks-reducer";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<ThunkDispatchType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]));
    } else {
        dispatch(setAppErrorAC('Some error occurred'));
    }
    dispatch(setAppStatusAC('failed'));
}


export const handleServerNetworkError = (error: {message: string}, dispatch: Dispatch<ThunkDispatchType>) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'));
}

