import React from "react";

import Helmet from 'react-helmet';

import DateFnsUtils from "@date-io/date-fns";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import {StylesProvider} from "@material-ui/styles";

import Routes from "./routes/Routes";

function App() {
    return (
        <React.Fragment>
            <Helmet
                titleTemplate="%s | FastcatX Console"
                defaultTitle="FastcatX Console"
            />
            <StylesProvider injectFirst>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Routes/>
                </MuiPickersUtilsProvider>
            </StylesProvider>
        </React.Fragment>
    );
}

export default App;
