import React from "react";
import styled, {createGlobalStyle, ThemeProvider} from "styled-components";

import {CssBaseline} from "@material-ui/core";
import maTheme from "../theme";
import {ThemeProvider as MuiThemeProvider} from "@material-ui/styles";

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

const Root = styled.div`
  max-width: 520px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 100%;
`;

function Auth({children}) {
    return (
        <MuiThemeProvider theme={maTheme[0]}>
            <ThemeProvider theme={maTheme[0]}>
                <Root>
                    <CssBaseline/>
                    <GlobalStyle/>
                    {children}
                </Root>
            </ThemeProvider>
        </MuiThemeProvider>
    );
}

export default Auth;
