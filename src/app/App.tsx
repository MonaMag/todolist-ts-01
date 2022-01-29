import React, {useCallback, useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {Todolists} from "../features/Todolists/Todolists";
import {ErrorSnackbars} from "../components/ErrorSnackbar/ErrirSnackbar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {Redirect, Route, Switch} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {logoutTC} from "../features/Login/auth-reducer";

type PropsType = {
    demo?: boolean
}
const App = ({demo = false}: PropsType) => {
    console.log('AppWithUserState is called')
    console.log('CHECK')

    const dispatch = useDispatch()

    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isAppInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isAppInitialized)
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth)


    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [dispatch])

    if (!isAppInitialized) return <div style={{position: 'fixed', top: '40%', left: '50%'}}>
        <CircularProgress style={{width: '100px'}}/>
    </div>

    //UI:
    return (
            <div className="App">
                <ErrorSnackbars/>
                <AppBar position={'static'}>
<div>TEST</div>
                    <Toolbar style={{justifyContent: 'space-between'}}>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>

                        <Typography variant="h6">
                            TodoLists
                        </Typography>
                        {isAuth ? <Button color="inherit"
                                          onClick={() => logoutHandler()}>Log out</Button>
                            : <span>&#128269;</span>}
                    </Toolbar>
                </AppBar>

                {status === 'loading' && <LinearProgress/>}

                <Container fixed>
                    <Switch>
                        <Route exact path={'/'} render={() => <Todolists demo={demo}/>}/>
                        <Route path={'/login'} render={() => <Login/>}/>
                        <Route path={'/404'} render={() => <h1>404: PAGE NOT FOUND</h1>}/>
                        <Redirect from={'*'} to={'/404'}/>
                    </Switch>
                </Container>
            </div>
    )
}


export default App;