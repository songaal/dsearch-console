import React from "react";
import {createGlobalStyle, ThemeProvider} from "styled-components";

import {CssBaseline} from "@material-ui/core";
import maTheme from "../theme";
import {ThemeProvider as MuiThemeProvider} from "@material-ui/styles";
import Footer from "../components/Footer";

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    background: ${props => props.theme.body.background};
  }
`;

function Landing({children}) {

    return (
        <MuiThemeProvider theme={maTheme[0]}>
            <ThemeProvider theme={maTheme[0]}>
                <React.Fragment>
                    <CssBaseline/>
                    <GlobalStyle/>
                    {children}
                    <Footer />
                </React.Fragment>
            </ThemeProvider>
        </MuiThemeProvider>
    );
}

export default Landing;
