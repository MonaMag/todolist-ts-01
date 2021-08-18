import {authReducer, setIsAuthAC, AuthStateType} from './auth-reducer';

let startState:AuthStateType
beforeEach(() => {
    startState = {
        isAuth: false,
    }
})

test('should change isAuth prop', () => {
    const endState = authReducer(startState, setIsAuthAC(true))

    expect(endState.isAuth).toBeTruthy()
    expect(startState.isAuth).toBeFalsy()
})