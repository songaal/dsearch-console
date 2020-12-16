import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import styled, {createGlobalStyle, ThemeProvider} from "styled-components";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {spacing} from "@material-ui/system";
import {CssBaseline, Hidden, Paper as MuiPaper, withWidth} from "@material-ui/core";

import {isWidthUp} from "@material-ui/core/withWidth";
import maTheme from "../theme";
import {ThemeProvider as MuiThemeProvider} from "@material-ui/styles";
import {setDsearchAuthUser} from "../redux/actions/dsearchActions";
import Footer from "../components/Footer";

const drawerWidth = 260;


const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    background: ${props => props.theme.body.background};
  }

  .MuiCardHeader-action .MuiIconButton-root {
    padding: 4px;
    width: 28px;
    height: 28px;
  }
`;

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Drawer = styled.div`
  ${props => props.theme.breakpoints.up("md")} {
    width: ${drawerWidth}px;
    flex-shrink: 0;
  }
`;

const AppContent = styled.div`
      flex: 1;
      display: flex;
      flex-direction: column;
      width: calc(100% - ${drawerWidth}px);
      min-height: 100vh;
    `;

const Paper = styled(MuiPaper)(spacing);

const MainContent = styled(Paper)`
  flex: 1;
  background: ${props => props.theme.body.background};

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`;


function Main({dispatch,authUser, children, routes, width}) {
  const history = useHistory();
    const [mobileOpen, setMobileOpen] = useState(false)

    if (!authUser['token']) {
        dispatch(setDsearchAuthUser()).catch(() => history.location.replace("/"))
        return null
    }

    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen)
    };

    return (
        // maTheme: /src/theme/variants.js 파일참조
        <MuiThemeProvider theme={maTheme[1]}>
            <ThemeProvider theme={maTheme[1]}>
                <Root>
                    <CssBaseline/>
                    <GlobalStyle/>
                    <Drawer>
                        <Hidden mdUp implementation="js">
                            <Sidebar
                                routes={routes}
                                PaperProps={{style: {width: drawerWidth}}}
                                variant="temporary"
                                open={mobileOpen}
                                onClose={handleDrawerToggle}
                                layout={"intro"}
                            />
                        </Hidden>
                        <Hidden smDown implementation="css">
                            <Sidebar
                                routes={routes}
                                PaperProps={{style: {width: drawerWidth}}}
                                layout={"intro"}
                            />
                        </Hidden>
                    </Drawer>
                    <AppContent>
                        <Header layout={"main"} onDrawerToggle={handleDrawerToggle}/>
                        <MainContent p={isWidthUp("lg", width) ? 10 : 5}>
                            {children}
                        </MainContent>
                        <Footer/>
                    </AppContent>
                    {/*<Settings/>*/}
                </Root>
            </ThemeProvider>
        </MuiThemeProvider>
    );
}

export default connect(store => ({...store.dsearchReducers}))(withWidth()(Main));
