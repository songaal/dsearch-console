import React, {Component, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {connect, useDispatch, useSelector} from "react-redux";
import styled, {withTheme} from "styled-components";
import {darken} from "polished";

import {
    AppBar as MuiAppBar,
    ButtonBase,
    Grid,
    Hidden,
    IconButton as MuiIconButton,
    InputBase,
    Menu,
    MenuItem,
    Toolbar
} from "@material-ui/core";

import {ArrowDropDown, Menu as MenuIcon} from "@material-ui/icons";

import {Home, Search as SearchIcon} from "react-feather";
import {setReferenceResultAll, setReferenceSearchKeyword} from "../redux/actions/referenceSearchActions";
import {setFastcatxAuthUser, setFastcatxSignOut} from "../redux/actions/fastcatxActions";
import {SET_FASTCATX_AUTH_USER} from "../redux/constants";

const AppBar = styled(MuiAppBar)`
  background: ${props => props.theme.header.background};
  color: ${props => props.theme.header.color};
  box-shadow: ${props => props.theme.shadows[1]};
`;

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const Search = styled.div`
  border-radius: 2px;
  background-color: ${props => props.theme.header.background};
  display: none;
  position: relative;
  width: 100%;

  &:hover {
    background-color: ${props => darken(0.05, props.theme.header.background)};
  }

  ${props => props.theme.breakpoints.up("md")} {
    display: block;
  }
`;

const SearchIconWrapper = styled.div`
  width: 50px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 22px;
    height: 22px;
  }
`;

const Input = styled(InputBase)`
  color: inherit;
  width: 100%;

  > input {
    color: ${props => props.theme.header.search.color};
    padding-top: ${props => props.theme.spacing(2.5)}px;
    padding-right: ${props => props.theme.spacing(2.5)}px;
    padding-bottom: ${props => props.theme.spacing(2.5)}px;
    padding-left: ${props => props.theme.spacing(12)}px;
    width: 160px;
  }
`;

const Button = styled(ButtonBase)`
  color: ${props => props.theme.header.search.color};
  padding-left: ${props => props.theme.spacing(2)}px;
  padding-right: ${props => props.theme.spacing(2)}px;
`

class ClusterMenu extends Component {
    state = {
        anchorMenu: null
    };

    toggleMenu = event => {
        this.setState({anchorMenu: event.currentTarget});
    };

    closeMenu = () => {
        this.setState({anchorMenu: null});
    };

    render() {
        const {anchorMenu} = this.state;
        const open = Boolean(anchorMenu);
        return (
            <React.Fragment>
                <Button aria-owns={open ? "menu-appbar" : undefined}
                        aria-haspopup="true"
                        onClick={this.toggleMenu}
                        variant={"outlined"}
                >
                    운영클러스터
                    <ArrowDropDown/>
                </Button>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorMenu}
                    open={open}
                    onClose={this.closeMenu}
                >
                    <MenuItem
                        onClick={() => {
                            this.closeMenu();
                        }}
                    >
                        운영클러스터
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            this.closeMenu();
                        }}
                    >
                        개발클러스터
                    </MenuItem>
                </Menu>
            </React.Fragment>
        );
    }
}

function UserMenu() {
    const dispatch = useDispatch()
    const authUser = useSelector(store => store.fastcatxReducers.authUser)
    const [anchorMenu, setAnchorMenu] = useState(null)
    const open = Boolean(anchorMenu);

    function toggleMenu(event) {
        setAnchorMenu(event.currentTarget)
    }

    function closeMenu() {
        setAnchorMenu(null)
    }

    function signOut() {
        localStorage.removeItem(SET_FASTCATX_AUTH_USER)
        dispatch(setFastcatxSignOut())
    }

    return (
        <React.Fragment>
            <Button aria-owns={open ? "menu-appbar" : undefined}
                    aria-haspopup="true"
                    onClick={toggleMenu}
                    variant={"outlined"}
            >
                {/*{(authUser['userManagement'] || {})['username']}*/}
                {(authUser['user'] || {})['email']}
                <ArrowDropDown/>
            </Button>

            <Menu
                id="menu-appbar"
                anchorEl={anchorMenu}
                open={open}
                onClose={closeMenu}
            >
                <MenuItem
                    component={Link}
                    to={"/my"}
                >
                    정보수정
                </MenuItem>
                <MenuItem
                    component={Link}
                    onClick={signOut}
                    to={"/"}
                >
                    로그아웃
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}


const MainHeader = ({theme, onDrawerToggle}) => (
    <React.Fragment>
        <AppBar position="sticky" elevation={0}>
            <Toolbar>
                <Grid container alignItems="center">
                    <Hidden mdUp>
                        <Grid item>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={onDrawerToggle}
                            >
                                <MenuIcon/>
                            </IconButton>
                        </Grid>
                    </Hidden>
                    <Grid item/>
                    <Grid item xs/>

                    <Grid item>
                        {/*<ClusterMenu theme={theme}/>*/}
                        <UserMenu theme={theme}/>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    </React.Fragment>)

const DashBoardHeader = ({theme, onDrawerToggle}) => {
    const references = useSelector(store => ({...store.referenceSearchReducers}))
    const [keyword, setKeyword] = useState(references.keyword)
    const qs = new URLSearchParams(location.search)
    const dispatch = useDispatch()
    const history = useHistory()

    function handleSearch() {
        dispatch(setReferenceSearchKeyword(keyword))
        dispatch(setReferenceResultAll(keyword))
        history.push("/search")
    }

    function handleKeyEvent(event) {
        if (event.keyCode === 13) {
            handleSearch()
        }
    }

    if (qs.get("keyword") !== null && qs.get("keyword") !== keyword) {
        setKeyword(qs.get("keyword"))
        handleSearch()
    }

    return (
        <React.Fragment>
            <AppBar position="sticky" elevation={0}>
                <Toolbar>
                    <Grid container alignItems="center">
                        <Hidden mdUp>
                            <Grid item>
                                <IconButton
                                    color="inherit"
                                    aria-label="Open drawer"
                                    onClick={onDrawerToggle}
                                >
                                    <MenuIcon/>
                                </IconButton>
                            </Grid>
                        </Hidden>
                        <Grid item>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon/>
                                </SearchIconWrapper>
                                <Input placeholder="검색 (Enter 입력)"
                                       onKeyUp={handleKeyEvent}
                                       value={keyword}
                                       onChange={event => setKeyword(event.target.value)}
                                />
                            </Search>
                        </Grid>
                        <Grid item xs/>

                        <Grid item>
                            <IconButton color="inherit"
                                        onClick={() => location.href = "/"}>
                                <Home/>
                            </IconButton>
                            <ClusterMenu theme={theme}/>
                            <UserMenu theme={theme}/>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}


const Header = ({theme, layout, onDrawerToggle}) => {
    return layout === "main" ?
        <MainHeader theme={theme} onDrawerToggle={onDrawerToggle}/>
        :
        <DashBoardHeader theme={theme} onDrawerToggle={onDrawerToggle}/>
}

export default connect()(withTheme(Header));
