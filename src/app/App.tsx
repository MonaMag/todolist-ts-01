import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {Todolists} from "../features/Todolists/Todolists";
import {ErrorSnackbars} from "../components/ErrorSnackbar/ErrirSnackbar";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {RequestStatusType} from "./app-reducer";

type PropsType = {
    demo?: boolean
}
const App = ({demo = false}: PropsType) => {
    console.log('AppWithUserState is called')
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)

    //UI:
    return (
        <div className="App">
            <ErrorSnackbars/>
            <AppBar position={'static'}>
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoLists
                    </Typography>
                    <Button
                        variant={'outlined'}
                        color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>

            <Container fixed>
                <Todolists demo={demo}/>
            </Container>
        </div>
    )
}


export default App;