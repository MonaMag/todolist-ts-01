import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from "./app-reducer";

let startState: InitialStateType

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null,
    }
})

test('correct error message should be set', () => {
    const endState = appReducer(startState, setAppErrorAC('some error'))

    expect(endState.error).toBe('some error');
    expect(endState.error).not.toBe(null)
});

test('correct status message should be set', () => {
    const endState = appReducer(startState, setAppStatusAC('loading'))

    expect(endState.status).toBe('loading');
    expect(endState.status).not.toBe('idle')
});